module.exports.sortByDiff = (a, b) => Math.abs(a.diff) - Math.abs(b.diff);
module.exports.sortByQuantity = (a, b) => a.quantity - b.quantity;
