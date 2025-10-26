require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Helper function to extract URLs from text
function extractUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);
  return urls ? urls[0] : null;
}

// Helper function to check if URL is an Instagram post
function isInstagramUrl(url) {
  return url && (url.includes('instagram.com') || url.includes('instagr.am'));
}

// Main webhook endpoint for incoming SMS
app.post('/sms', async (req, res) => {
  const incomingMessage = req.body.Body;
  const fromNumber = req.body.From;
  const twiml = new twilio.twiml.MessagingResponse();

  console.log(`Received SMS from ${fromNumber}: ${incomingMessage}`);

  try {
    // Extract URL from the message
    const url = extractUrl(incomingMessage);

    if (!url) {
      twiml.message('❌ No URL found in your message. Please send a valid Instagram post link.');
      res.type('text/xml').send(twiml.toString());
      return;
    }

    // Check if it's an Instagram URL
    if (!isInstagramUrl(url)) {
      twiml.message('⚠️ Please send an Instagram post URL. Other platforms are not supported yet.');
      res.type('text/xml').send(twiml.toString());
      return;
    }

    // Send immediate acknowledgment
    twiml.message('✅ Analyzing your post... This may take a minute. You will receive the report link shortly.');
    res.type('text/xml').send(twiml.toString());

    // Process the URL asynchronously
    processUrlAndSendReport(url, fromNumber);

  } catch (error) {
    console.error('Error processing SMS:', error);
    twiml.message('❌ An error occurred while processing your request. Please try again later.');
    res.type('text/xml').send(twiml.toString());
  }
});

// Async function to process URL and send report
async function processUrlAndSendReport(url, toNumber) {
  try {
    console.log(`Sending URL to TrustCard API: ${url}`);

    // Call TrustCard API
    const response = await axios.post(
      process.env.TRUSTCARD_API_URL,
      { url: url },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 120000 // 2 minute timeout
      }
    );

    // Extract report link from response
    const reportLink = response.data.reportUrl || response.data.report_url || response.data.link || response.data.url;

    if (reportLink) {
      // Send report link back to user
      await twilioClient.messages.create({
        body: `📊 Your TrustCard report is ready!\n\n${reportLink}\n\nView it to see if the content is authentic or fake.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toNumber
      });
      console.log(`Report sent to ${toNumber}: ${reportLink}`);
    } else {
      // If no report link found in expected fields, send the entire response
      await twilioClient.messages.create({
        body: `✅ Analysis complete!\n\nResponse: ${JSON.stringify(response.data).substring(0, 300)}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toNumber
      });
      console.log(`Response sent to ${toNumber}, but no report link found in expected format`);
    }

  } catch (error) {
    console.error('Error calling TrustCard API:', error.message);
    
    // Send error message to user
    let errorMessage = '❌ Failed to analyze the post. ';
    
    if (error.response) {
      errorMessage += `API Error: ${error.response.status}. Please try again or contact support.`;
    } else if (error.code === 'ECONNABORTED') {
      errorMessage += 'The analysis took too long. Please try again.';
    } else {
      errorMessage += 'Please check the URL and try again.';
    }

    try {
      await twilioClient.messages.create({
        body: errorMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toNumber
      });
    } catch (twilioError) {
      console.error('Error sending error message via Twilio:', twilioError);
    }
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'TrustCard SMS Integration is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'TrustCard SMS Integration',
    version: '1.0.0',
    endpoints: {
      sms: '/sms - Twilio webhook for incoming SMS',
      health: '/health - Health check endpoint'
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 TrustCard SMS Integration server running on port ${port}`);
  console.log(`📱 Twilio webhook endpoint: http://localhost:${port}/sms`);
  console.log(`🔍 TrustCard API URL: ${process.env.TRUSTCARD_API_URL}`);
  
  // Validate configuration
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn('⚠️  WARNING: Twilio credentials not configured! Please set them in .env file');
  }
  if (!process.env.TRUSTCARD_API_URL) {
    console.warn('⚠️  WARNING: TrustCard API URL not configured! Please set it in .env file');
  }
});

module.exports = app;

