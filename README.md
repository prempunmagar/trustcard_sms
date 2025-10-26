# TrustCard SMS Integration

A Twilio SMS integration that allows users to send Instagram post URLs via text message and receive fact-check reports back.

## 🌟 Features

- 📱 Receive Instagram post URLs via SMS
- 🔍 Automatically analyze posts using TrustCard API
- 📊 Send report links back to users
- ⚡ Asynchronous processing for better user experience
- 🛡️ Error handling and validation

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- A Twilio account with a phone number
- Your TrustCard API endpoint

### Installation

1. **Clone or navigate to this directory**

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Get these from https://console.twilio.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# Your TrustCard API endpoint
TRUSTCARD_API_URL=https://your-trustcard-api.com/api/analyze

# Server port (default: 3000)
PORT=3000
```

4. **Start the server**

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 🔧 Twilio Configuration

### Setting up the Webhook

1. Go to [Twilio Console](https://console.twilio.com)
2. Navigate to Phone Numbers → Manage → Active Numbers
3. Click on your phone number
4. Scroll to "Messaging Configuration"
5. Under "A MESSAGE COMES IN", set:
   - Webhook: `https://your-server-url.com/sms`
   - HTTP Method: `POST`
6. Save your changes

### Local Development with ngrok

For testing locally, use [ngrok](https://ngrok.com/) to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Run ngrok (in a separate terminal)
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
# Use this URL in Twilio webhook: https://abc123.ngrok.io/sms
```

## 📱 Usage

Once configured, users can:

1. **Send an Instagram URL** to your Twilio phone number:
   ```
   Hey, check this out: https://www.instagram.com/p/ABC123/
   ```

2. **Receive immediate acknowledgment**:
   ```
   ✅ Analyzing your post... This may take a minute. You will receive the report link shortly.
   ```

3. **Get the report link**:
   ```
   📊 Your TrustCard report is ready!
   
   https://trustcard.com/report/xyz789
   
   View it to see if the content is authentic or fake.
   ```

## 🏗️ API Endpoints

### POST /sms
Twilio webhook endpoint for incoming SMS messages.

**Expected Request** (from Twilio):
- `Body`: The SMS message text
- `From`: Sender's phone number

**Response**: TwiML XML with immediate acknowledgment

### GET /health
Health check endpoint to verify the server is running.

**Response**:
```json
{
  "status": "ok",
  "message": "TrustCard SMS Integration is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET /
Root endpoint with service information.

## 🔌 TrustCard API Integration

The application expects your TrustCard API to:

**Request Format**:
```json
POST /api/analyze
{
  "url": "https://www.instagram.com/p/ABC123/"
}
```

**Response Format** (any of these fields will work):
```json
{
  "reportUrl": "https://trustcard.com/report/xyz789"
  // OR
  "report_url": "https://trustcard.com/report/xyz789"
  // OR
  "link": "https://trustcard.com/report/xyz789"
  // OR
  "url": "https://trustcard.com/report/xyz789"
}
```

If your API has a different format, modify the `processUrlAndSendReport` function in `server.js`.

## 🔍 Error Handling

The app handles various error scenarios:

- ❌ No URL found in message
- ⚠️ Non-Instagram URLs
- ❌ API timeout (2 minute limit)
- ❌ API errors
- ❌ Network issues

Users receive clear error messages for each scenario.

## 📝 Logs

The server logs important events:

- Incoming SMS messages
- API calls to TrustCard
- Report deliveries
- Errors and warnings

## 🛠️ Customization

### Modifying URL Extraction

Edit the `extractUrl` function in `server.js`:

```javascript
function extractUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);
  return urls ? urls[0] : null;
}
```

### Adding More Platforms

Edit the `isInstagramUrl` function:

```javascript
function isInstagramUrl(url) {
  return url && (
    url.includes('instagram.com') || 
    url.includes('instagr.am') ||
    url.includes('facebook.com') || // Add more platforms
    url.includes('twitter.com')
  );
}
```

### Custom API Request Format

Modify the axios call in `processUrlAndSendReport`:

```javascript
const response = await axios.post(
  process.env.TRUSTCARD_API_URL,
  { 
    post_url: url,  // Change field name
    analyze_type: 'full'  // Add custom fields
  },
  { headers: { 'Content-Type': 'application/json' } }
);
```

## 🚀 Deployment

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set TWILIO_ACCOUNT_SID=your_sid
heroku config:set TWILIO_AUTH_TOKEN=your_token
heroku config:set TWILIO_PHONE_NUMBER=your_number
heroku config:set TRUSTCARD_API_URL=your_api_url
git push heroku main
```

### Deploy to Railway/Render/DigitalOcean

1. Create a new app
2. Connect your repository
3. Set environment variables
4. Deploy!

Your webhook URL will be: `https://your-app-url.com/sms`

## 📄 License

ISC

## 🤝 Support

For issues or questions:
- Check the logs for error messages
- Verify your environment variables
- Test the `/health` endpoint
- Check Twilio webhook logs in the console

## 🔐 Security Notes

- Never commit `.env` file to version control
- Keep your Twilio Auth Token secure
- Use HTTPS in production
- Validate and sanitize all inputs
- Consider rate limiting for production use

---

Built with ❤️ for TrustCard

