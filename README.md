# Noon–Sunsky Integration (Webhook-Based)

## 🌐 How It Works
- Noon sends orders to `/webhook`
- Webhook places order on Sunsky using your API key
- Price is adjusted with your custom profit margin
- Protected dashboard at `/dashboard`

## 🚀 Setup Steps

1. Clone repo and install dependencies
2. Create `.env` with your keys and config
3. Deploy to [Render](https://render.com):
   - Create new Web Service
   - Use `render.yaml` or manual setup
4. Set the webhook URL in Noon Seller Center

## 🛠 Example `.env`
```
SUNSKY_API_KEY=abcd1234yourkey
PROFIT_MARGIN=0.25
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=password123
```

## 🔐 Basic Auth for Dashboard
Access `/dashboard` with your credentials.

## 🧪 Testing Webhook
Use tools like Postman to POST mock order data to `/webhook`.
