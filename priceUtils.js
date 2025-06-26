// priceUtils.js
function applyProfit(basePrice) {
  const profitMargin = parseFloat(process.env.PROFIT_MARGIN || '0.2');
  return (basePrice * (1 + profitMargin)).toFixed(2);
}

module.exports = {
  applyProfit,
};
