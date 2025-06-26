// server.js
require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const sunsky = require('./sunsky');
const priceUtils = require('./priceUtils');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Webhook endpoint for Noon
app.post('/webhook', async (req, res) => {
  const orderData = req.body;

  try {
    const priceWithProfit = priceUtils.applyProfit(orderData.product_price);
    const result = await sunsky.placeOrder(orderData, priceWithProfit);

    console.log('Order sent to Sunsky:', result);
    res.status(200).send({ success: true, message: 'Order placed on Sunsky.' });
  } catch (err) {
    console.error('Error processing webhook:', err);
    res.status(500).send({ success: false, error: err.message });
  }
});

// Basic auth for dashboard
app.use(
  '/dashboard',
  basicAuth({
    users: { [process.env.DASHBOARD_USERNAME]: process.env.DASHBOARD_PASSWORD },
    challenge: true,
  })
);

// Dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
