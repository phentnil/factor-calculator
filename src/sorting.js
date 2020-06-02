module.exports.byDiff = (a, b) => Math.abs(a.diff) - Math.abs(b.diff);
module.exports.byQuantity = (a, b) => a.quantity - b.quantity;
