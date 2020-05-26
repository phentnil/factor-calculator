const find = require("./getMatches");

function factorCalculator (target) {
  if ("number" !== typeof target) {target = 1000;}
  var kcUnits = [{unit: 533, quantity: 4}, {unit: 535, quantity: 3}, {unit: 536, quantity: 1}, {unit: 540, quantity: 6}, {unit: 554, quantity: 1}, {unit: 565, quantity: 2}, {unit: 576, quantity: 2}, {unit: 1097, quantity: 4}, {unit: 1100, quantity: 4}, {unit: 1155, quantity: 2}];
  kcUnits.forEach(function (item) {
    item.multiples = [];
    for (var i = 0; i <= item.quantity; i++) {item.multiples.push(i * item.unit);}
  });
  find.on('ready', () => {
  });
}
module.exports = {};
