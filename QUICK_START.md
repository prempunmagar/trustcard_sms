# 🎉 Quick Start - Your TrustCard SMS Integration

## ✅ Your Configuration is Ready!

Your Twilio credentials need to be configured in your .env file:
- **Account SID**: Use your Twilio Account SID
- **Phone Number**: Use your Twilio phone number
- **Auth Token**: Use your Twilio Auth Token

## 🚀 Start Using It NOW

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm run dev
```

You should see:
```
🚀 TrustCard SMS Integration server running on port 3000
📱 Twilio webhook endpoint: http://localhost:3000/sms
⚠️  WARNING: TrustCard API URL not configured!
```

### Step 3: Expose Your Local Server (For Testing)

Install and run ngrok:
```bash
# Install ngrok (if not already installed)
npm install -g ngrok

# In a NEW terminal window, run:
ngrok http 3000
```

You'll get a URL like: `https://abc123.ngrok.io`

### Step 4: Configure Twilio Webhook

1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
2. Click on your number: **+1 (573) 422-5091**
3. Scroll to **"Messaging Configuration"**
4. Under **"A MESSAGE COMES IN"**:
   - **Webhook**: `https://your-ngrok-url.com/sms` (replace with your ngrok URL)
   - **HTTP Method**: `POST`
5. Click **"Save"**

### Step 5: Test It!

Send a text to **+1 (573) 422-5091** with any Instagram URL:
```
https://www.instagram.com/p/ABC123/
```

You should get an immediate response! 🎉

## 📝 Current Status

✅ Twilio configured  
✅ Server ready to run  
⚠️ TrustCard API URL pending (waiting for Azure deployment)

## 🔄 Once Your API is on Azure

When your TrustCard API is deployed to Azure, update the `.env` file:

```env
TRUSTCARD_API_URL=https://your-app.azurewebsites.net/api/analyze
```

Then restart the server:
```bash
npm run dev
```

## 🧪 Testing Without TrustCard API

The app will work and receive SMS, but will fail when trying to call the TrustCard API. Users will get:
```
❌ Failed to analyze the post. Please check the URL and try again.
```

This is expected until you add your Azure API URL.

## 📊 Monitor Everything

- **Server Logs**: Watch your terminal where `npm run dev` is running
- **Twilio Logs**: https://console.twilio.com/us1/monitor/logs/sms
- **Test Health Check**: http://localhost:3000/health

## 🆘 Troubleshooting

### Server won't start?
- Make sure port 3000 is available
- Check that all dependencies are installed: `npm install`

### Not receiving SMS on your phone?
- Check Twilio webhook is configured correctly
- Make sure ngrok is running
- Check Twilio logs for errors

### "Cannot POST /sms" error?
- Check that your webhook URL ends with `/sms`
- Verify HTTP method is `POST` in Twilio settings

## 🔐 Security Reminder

⚠️ **Your .env file contains sensitive credentials!**
- Never commit `.env` to git (it's already in `.gitignore`)
- Never share your Auth Token publicly
- If compromised, regenerate it at: https://console.twilio.com

## 🎯 Next Steps

1. Run `npm install`
2. Run `npm run dev`
3. Run `ngrok http 3000` (in another terminal)
4. Configure Twilio webhook
5. Send a test SMS!
6. Deploy your TrustCard API to Azure
7. Update `TRUSTCARD_API_URL` in `.env`

---

**Ready to go?** Run `npm install` to get started! 🚀

