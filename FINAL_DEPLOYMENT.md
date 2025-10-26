# 🚀 Final Deployment Steps

## ✅ Your Configuration

- **Twilio Phone**: +1 (877) 419-1956
- **TrustCard API**: http://52.180.138.232:8000
- **GitHub Repo**: https://github.com/prempunmagar/trustcard_sms.git

## 📦 Step 1: Push to GitHub

Run these commands in your terminal:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - TrustCard SMS Integration"

# Add your GitHub repository
git remote add origin https://github.com/prempunmagar/trustcard_sms.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy on Render

1. **Go to Render**: https://dashboard.render.com/create

2. **Click**: "New Web Service"

3. **Connect GitHub**:
   - Authorize Render to access GitHub
   - Select repository: `prempunmagar/trustcard_sms`

4. **Configure Settings**:
   - **Name**: `trustcard-sms` (or any name you like)
   - **Region**: Choose closest to you (e.g., Ohio, Oregon)
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**

5. **Add Environment Variables** (click "Add Environment Variable"):

```
TWILIO_ACCOUNT_SID = your_twilio_account_sid
TWILIO_AUTH_TOKEN = your_twilio_auth_token
TWILIO_PHONE_NUMBER = your_twilio_phone_number
TRUSTCARD_API_URL = http://52.180.138.232:8000
NODE_ENV = production
PORT = 3000
```

6. **Click**: "Create Web Service"

7. **Wait** for deployment (2-3 minutes)

8. **Copy your URL**: Something like `https://trustcard-sms-xxxx.onrender.com`

## 📱 Step 3: Configure Twilio Webhook

1. **Go to**: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming

2. **Click** on your number: **+1 (877) 419-1956**

3. **Scroll to**: "Messaging Configuration"

4. **Under "A MESSAGE COMES IN"**:
   - **Webhook**: `https://your-render-url.onrender.com/sms`
   - **HTTP Method**: `POST`

5. **Click**: "Save"

## 🧪 Step 4: Test It!

Send a text message to **+1 (877) 419-1956** with an Instagram URL:

```
https://www.instagram.com/p/ABC123/
```

You should receive:
1. ✅ Immediate acknowledgment
2. 📊 Report link after ~1 minute

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Web service created on Render
- [ ] All 5 environment variables added
- [ ] Deployment successful
- [ ] Render URL copied
- [ ] Twilio webhook configured
- [ ] Test SMS sent
- [ ] Report link received

## 🆘 Troubleshooting

### If GitHub push fails:
```bash
# If repository already exists with content
git pull origin main --rebase
git push -u origin main
```

### If Render build fails:
- Check that `package.json` is in root directory
- View build logs in Render dashboard
- Verify all files were pushed to GitHub

### If webhook doesn't work:
- Make sure URL ends with `/sms`
- URL must be HTTPS (Render provides this)
- Check Twilio webhook logs for errors
- View Render logs for incoming requests

## 📊 Monitor Your App

- **Render Dashboard**: https://dashboard.render.com
- **Twilio SMS Logs**: https://console.twilio.com/us1/monitor/logs/sms
- **Health Check**: `https://your-app.onrender.com/health`

---

**Start with Step 1**: Push your code to GitHub! 🎯

