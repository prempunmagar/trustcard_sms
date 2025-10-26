# 🚀 Quick Deployment Guide - All Platforms

## 🎯 Recommended: Render

**Best for**: Beginners, free tier, ease of use

[See detailed guide: DEPLOY_RENDER.md](./DEPLOY_RENDER.md)

**Quick Steps**:
1. Push code to GitHub
2. Connect repo to Render
3. Add environment variables
4. Deploy!
5. Get URL: `https://trustcard-sms.onrender.com`

---

## 🚄 Alternative: Railway

**Best for**: Easy deployment, $5 free credit

### Quick Deploy

1. **Go to**: https://railway.app
2. **Click**: "New Project" → "Deploy from GitHub repo"
3. **Select** your repository
4. **Add Environment Variables**:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_PHONE_NUMBER=your_phone_number_here
   TRUSTCARD_API_URL=(add later)
   ```
5. **Generate Domain**: Settings → Generate Domain
6. **Get URL**: `https://your-app.railway.app`
7. **Configure Twilio**: Use `https://your-app.railway.app/sms`

**Cost**: $5 free credit, then ~$5/month

---

## ☁️ Alternative: Azure App Service

**Best for**: Keeping everything in one ecosystem with your TrustCard API

### Quick Deploy

```bash
# Install Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Create resource group (or use existing)
az group create --name trustcard-rg --location eastus

# Create app service plan
az appservice plan create --name trustcard-plan --resource-group trustcard-rg --sku FREE --is-linux

# Create web app
az webapp create --resource-group trustcard-rg --plan trustcard-plan --name trustcard-sms-integration --runtime "NODE|18-lts"

# Configure environment variables
az webapp config appsettings set --resource-group trustcard-rg --name trustcard-sms-integration --settings \
  TWILIO_ACCOUNT_SID="your_account_sid" \
  TWILIO_AUTH_TOKEN="your_auth_token" \
  TWILIO_PHONE_NUMBER="your_phone_number" \
  TRUSTCARD_API_URL="" \
  NODE_ENV="production"

# Deploy from GitHub
# (Configure in Azure Portal → Deployment Center)

# Or deploy with zip
npm install
zip -r app.zip .
az webapp deploy --resource-group trustcard-rg --name trustcard-sms-integration --src-path app.zip
```

**URL**: `https://trustcard-sms-integration.azurewebsites.net`

**Cost**: Free tier available, then ~$13/month

---

## 🎨 Alternative: Heroku

**Best for**: Reliability and ecosystem

⚠️ **Note**: Heroku eliminated free tier in 2022

### Quick Deploy

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create trustcard-sms

# Add environment variables
heroku config:set TWILIO_ACCOUNT_SID=your_account_sid
heroku config:set TWILIO_AUTH_TOKEN=your_auth_token
heroku config:set TWILIO_PHONE_NUMBER=your_phone_number
heroku config:set TRUSTCARD_API_URL=""
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Get URL
heroku open
```

**URL**: `https://trustcard-sms.herokuapp.com`

**Cost**: $7/month minimum

---

## 📊 Platform Comparison

| Platform | Free Tier | Sleep/Cold Start | Deploy Ease | Monthly Cost |
|----------|-----------|------------------|-------------|--------------|
| **Render** | ✅ Yes | 30s wake | ⭐⭐⭐⭐⭐ | Free → $7 |
| **Railway** | $5 credit | No sleep | ⭐⭐⭐⭐⭐ | ~$5 |
| **Azure** | ✅ Yes | No sleep | ⭐⭐⭐ | Free → $13 |
| **Heroku** | ❌ No | No sleep | ⭐⭐⭐⭐ | $7+ |

## 🎯 My Recommendation

**For You**: Use **Render** (easiest, free, good for testing)

### Why?
1. ✅ Free tier with no credit card required
2. ✅ Super easy GitHub integration
3. ✅ Environment variables in dashboard
4. ✅ Auto-deploy on push
5. ✅ Built-in HTTPS
6. ⚠️ Only downside: 30-second cold start (acceptable for SMS use case)

## 🔄 Deployment Workflow Summary

```
┌─────────────────────────────────────────────┐
│ 1. Push code to GitHub                      │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 2. Deploy to Render/Railway/Azure           │
│    → Get URL: https://your-app.com          │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 3. Configure Twilio Webhook                 │
│    → https://your-app.com/sms               │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 4. Test SMS (will fail without API URL)     │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 5. Deploy TrustCard API to Azure            │
│    → Get URL: https://api.azure.net         │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 6. Update TRUSTCARD_API_URL env variable    │
└─────────────────┬───────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│ 7. Test end-to-end! ✅                      │
└─────────────────────────────────────────────┘
```

## 📝 What You'll Give Me

After deployment, just provide:

1. **TrustCard API URL** (from Azure)
   - Example: `https://trustcard-api.azurewebsites.net/api/check-post`

That's it! I'll help you update the configuration.

## 🆘 Need Help?

Choose your platform and follow the detailed guide:
- **Render**: See `DEPLOY_RENDER.md` ⭐ Recommended
- **Railway**: Quick GitHub integration
- **Azure**: CLI commands above
- **Heroku**: CLI commands above

---

**Ready to deploy?** Start with Render - it's the easiest! 🚀

