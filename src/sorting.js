const sortByDiff = (a, b) => Math.abs(a.diff) - Math.abs(b.diff);
const sortByQuantity = (a, b) => a.quantity - b.quantity;

module.exports.sortByDiff = sortByDiff;
module.exports.sortByQuantity = sortByQuantity;
