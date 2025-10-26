# 🔧 Setup Guide for Your TrustCard SMS Integration

## Your Twilio Information

You've provided:
- **User SID**: `US435c416791fdc59d1ed8da865247cdc4`
- **Messaging Service SID**: `MG61c48366b0c19303949accdb49083d43`
- **Phone Number**: `+15734225091`

## ⚠️ Important: What You Still Need

To complete the setup, you need to find these additional credentials:

### 1. Account SID (Required)
- This starts with **"AC"** (not "US")
- Find it at: https://console.twilio.com
- It's displayed prominently on your dashboard

### 2. Auth Token (Required)
- Found right below your Account SID on the dashboard
- Click "Show" to reveal it
- Keep this SECRET - it's like a password!

## 📝 Configuration Options

You have two ways to send messages with Twilio:

### Option A: Using Your Phone Number Directly (Simpler)
Use this if you want to send from your specific phone number.

**Required credentials:**
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx (find this!)
TWILIO_AUTH_TOKEN=your_auth_token_here (find this!)
TWILIO_PHONE_NUMBER=+15734225091
```

### Option B: Using Messaging Service (More Scalable)
Use this if you want to use Twilio's Messaging Service (better for multiple numbers).

**Required credentials:**
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxx (find this!)
TWILIO_AUTH_TOKEN=your_auth_token_here (find this!)
TWILIO_MESSAGING_SERVICE_SID=MG61c48366b0c19303949accdb49083d43
```

## 🎯 Quick Setup Steps

1. **Go to Twilio Console**: https://console.twilio.com
2. **Copy your Account SID** (starts with AC)
3. **Click "Show" next to Auth Token** and copy it
4. **Create your .env file** (see below)
5. **Configure the webhook** in Twilio

## 📋 Where to Find Each Credential

| Credential | Location | Format |
|------------|----------|--------|
| Account SID | Console home page, top section | `AC...` (34 chars) |
| Auth Token | Console home page, click "Show" | 32 characters |
| Phone Number | Phone Numbers → Manage → Active Numbers | `+1...` |
| Messaging Service SID | Messaging → Services | `MG...` (34 chars) |

## 🔐 Your .env File Template

Create a file named `.env` in your project folder with this content:

```env
# === TWILIO CONFIGURATION ===
# Get these from: https://console.twilio.com

# Your Account SID (starts with AC)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Your Auth Token (click "Show" to reveal)
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Your Twilio Phone Number
TWILIO_PHONE_NUMBER=+15734225091

# Optional: Use Messaging Service instead of phone number
# TWILIO_MESSAGING_SERVICE_SID=MG61c48366b0c19303949accdb49083d43


# === TRUSTCARD API CONFIGURATION ===
# Your TrustCard API endpoint URL
TRUSTCARD_API_URL=https://your-trustcard-api.com/api/analyze


# === SERVER CONFIGURATION ===
PORT=3000
NODE_ENV=development
```

## 🚀 After Configuration

Once you've filled in your `.env` file:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm run dev
   ```

3. **Test locally with ngrok**:
   ```bash
   ngrok http 3000
   ```

4. **Configure Twilio webhook**:
   - Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
   - Click on: +1 (573) 422-5091
   - Scroll to "Messaging Configuration"
   - Under "A MESSAGE COMES IN":
     - Webhook: `https://your-ngrok-url.com/sms`
     - HTTP Method: `POST`
   - Click "Save"

5. **Test it**: Send a text with an Instagram URL to +1 (573) 422-5091!

## 🆘 Need Help?

- Can't find Account SID? It's on https://console.twilio.com right when you log in
- Can't find Auth Token? It's right below the Account SID, click the "Show" button
- Webhook not working? Check ngrok is running and the URL is correct
- Messages not sending? Check your Twilio logs at https://console.twilio.com/us1/monitor/logs/sms

## 📞 What Users Will Experience

1. User texts: `https://www.instagram.com/p/ABC123/`
2. Gets instant reply: `✅ Analyzing your post... This may take a minute.`
3. After ~1 minute: `📊 Your TrustCard report is ready! [link]`

---

**Next Step**: Find your Account SID (AC...) and Auth Token from https://console.twilio.com

