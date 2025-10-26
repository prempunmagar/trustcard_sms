# 🚀 Deployment Guide - Render (Recommended)

## Why Render?
- ✅ **Free tier** available
- ✅ Auto-deploys from Git
- ✅ Built-in HTTPS
- ✅ Easy environment variables
- ✅ Auto-restart on crashes
- ✅ Always-on (with paid tier) or sleeps after 15 min (free tier)

## 📝 Prerequisites
- GitHub account
- Your code pushed to a GitHub repository
- Render account (free): https://render.com

## 🎯 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - TrustCard SMS Integration"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/trustcard-sms.git
git branch -M main
git push -u origin main
```

### Step 2: Create Web Service on Render

1. **Go to**: https://dashboard.render.com
2. **Click**: "New +" → "Web Service"
3. **Connect** your GitHub repository
4. **Configure**:
   - **Name**: `trustcard-sms` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables

In the "Environment" section, add these variables:

| Key | Value |
|-----|-------|
| `TWILIO_ACCOUNT_SID` | `AC2bae408bc44581a96bd7356be0c011b6` |
| `TWILIO_AUTH_TOKEN` | `51a625845d42f0863c37a03613136751` |
| `TWILIO_PHONE_NUMBER` | `+18774191956` |
| `TRUSTCARD_API_URL` | Leave blank for now, add later |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

### Step 4: Deploy!

1. Click **"Create Web Service"**
2. Wait for deployment (usually 2-3 minutes)
3. You'll get a URL like: `https://trustcard-sms.onrender.com`

### Step 5: Configure Twilio Webhook

1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
2. Click on: **+1 (877) 419-1956**
3. Under "A MESSAGE COMES IN":
   - **Webhook**: `https://trustcard-sms.onrender.com/sms`
   - **HTTP Method**: `POST`
4. Click **"Save"**

### Step 6: Test It!

Send a text to **+1 (877) 419-1956** with any Instagram URL.

You should get: "✅ Analyzing your post..."

(It will fail to get report until you add the TrustCard API URL - that's expected!)

### Step 7: Add TrustCard API URL (Later)

Once your TrustCard API is deployed to Azure:

1. Go to your Render dashboard
2. Click on your service
3. Go to "Environment" tab
4. Edit `TRUSTCARD_API_URL` variable
5. Add your Azure URL: `https://your-app.azurewebsites.net/api/analyze`
6. Click "Save Changes" (app will auto-restart)

## ⚡ Important Notes

### Free Tier Limitations
- App **sleeps after 15 minutes** of inactivity
- First request after sleep takes ~30 seconds to wake up
- **Solution**: Upgrade to paid tier ($7/month) for always-on

### Keeping Free Tier Awake (Optional Workaround)
Use a service like UptimeRobot to ping your app every 10 minutes:
- URL to ping: `https://trustcard-sms.onrender.com/health`
- Free tier: https://uptimerobot.com

### Logs and Monitoring
- **View Logs**: Dashboard → Your Service → "Logs" tab
- **Monitor**: Dashboard → Your Service → "Events" tab

### Updating Your App
Just push to GitHub:
```bash
git add .
git commit -m "Update configuration"
git push
```
Render will automatically redeploy!

## 🔧 Your Final URLs

After deployment, you'll have:

| Service | URL | Purpose |
|---------|-----|---------|
| SMS Integration | `https://trustcard-sms.onrender.com` | Main app |
| Webhook Endpoint | `https://trustcard-sms.onrender.com/sms` | For Twilio |
| Health Check | `https://trustcard-sms.onrender.com/health` | Monitor status |
| TrustCard API | `https://[your-app].azurewebsites.net` | Your API |

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Web service created on Render
- [ ] Environment variables added
- [ ] App deployed successfully
- [ ] Twilio webhook configured with Render URL
- [ ] Test SMS sent and received
- [ ] TrustCard API URL added (after Azure deployment)
- [ ] End-to-end test completed

## 🆘 Troubleshooting

### Build Failed
- Check Node.js version compatibility
- Verify `package.json` is in root directory
- Check build logs for specific errors

### App Crashes on Start
- Check environment variables are set correctly
- View logs in Render dashboard
- Verify all dependencies are in `package.json`

### Webhook Not Working
- Verify webhook URL ends with `/sms`
- Check URL is HTTPS (not HTTP)
- View Twilio webhook logs for errors
- Check Render logs for incoming requests

### App Sleeping (Free Tier)
- This is normal behavior
- First request wakes it up (~30 seconds)
- Upgrade to paid tier for always-on
- Or use UptimeRobot to keep it awake

## 💰 Cost

**Free Tier**: $0/month
- 750 hours/month (enough for one service)
- Sleeps after 15 min inactivity
- Shared CPU/RAM

**Starter**: $7/month
- Always on
- Better performance
- No cold starts

---

**Next Step**: Push your code to GitHub and create a Render account!

