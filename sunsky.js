// sunsky.js
const axios = require('axios');

const SUNSKY_API_KEY = process.env.SUNSKY_API_KEY;
const SUNSKY_API_URL = 'https://www.sunsky-online.com/api/json.do';

async function placeOrder(orderData, adjustedPrice) {
  const payload = {
    method: 'order.create',
    app_key: SUNSKY_API_KEY,
    order: {
      customer: orderData.customer_name,
      items: [
        {
          sku: orderData.product_sku,
          quantity: orderData.quantity,
          price: adjustedPrice,
        },
      ],
      shipping_address: {
        name: orderData.shipping_name,
        address: orderData.shipping_address,
        city: orderData.city,
        zip: orderData.zip,
        phone: orderData.phone,
        country: 'SA',
      },
    },
  };

  const response = await axios.post(SUNSKY_API_URL, payload);
  return response.data;
}

module.exports = {
  placeOrder,
};
