// TODO: start by finding combinations that are quick to find, then implement deeper search algorithms...
// TODO: import module that keeps track of units available?
// Possibly import multiples with individual scores?
//const inventory = require("inventory");

/*
  kcUnits.forEach(function (item, index, array) {
    item.multiples = [];
    for (var i = 0; i <= item.quantity; i++) {item.multiples.push(i * item.unit);}
  });*/

/*
  getMatches(target, JSON.parse(JSON.stringify(kcUnits)));*/

const sorting = require('./sorting');

module.exports = (target) => {
  if ("number" !== typeof target || (target < 500) || (target > 5000)) {
    let err = "Target out of range! (target: " + target + ")";
    throw err;
  }
  const units = [{unit: 533, quantity: 4}, {unit: 535, quantity: 3}, {unit: 536, quantity: 1}, {unit: 540, quantity: 6}, {unit: 554, quantity: 1}, {unit: 565, quantity: 2}, {unit: 576, quantity: 2}, {unit: 1097, quantity: 4}, {unit: 1100, quantity: 4}, {unit: 1155, quantity: 2}];

  // starting out, we are going to pull the closest unit value to the target without considering combinations.
  let singletonUnits = units.map(item => {
    item.diff = item.unit - target;
    item.dpnt = item.unit / target;
    item.pd = (item.dpnt < 1) ? 1 - item.dpnt : item.dpnt - 1;
    return item;
  });
  singletonUnits.sort(sorting.byDiff);
  singletonUnits = singletonUnits.filter(item => item.dpnt < 1.1 && item.dpnt > 0.9);
  return (singletonUnits.length > 0) ? singletonUnits[0] : [];
};

/*const getMatches = (target, inUnits) => {
  var i, l, j;
  target = target || 3000;
  inUnits = inUnits || [];
  if (inUnits.length < 1) {return null;}
  var units = JSON.parse(JSON.stringify(inUnits));
  var matches = [];
  var results = [];
  while (units.length) {
    var item = units.shift();
    var u = item.unit, m = item.multiples;
    for (i = 0, l = m.length; i < l; i++) {
      var v = m[i];
      var d = v - target;
      var b = 'janel';
      var combo = String(u) + "x" + String(i);
      if (Math.abs(d) < Math.floor(target * 0.1)) {matches.push({unit: u, quantity: i, value: v, diff: d});}
    }
  }
  matches.sort(sortByDiff);
  var matchesOut = "Unit | Qty | Value | Difference\n";
  for (i = 0, j = matches.length; i < j; i++) {
    if (matches[i].unit < 1000) {matchesOut += " ";}
    matchesOut += matches[i].unit;
    matchesOut += " |  ";
    if (matches[i].quantity < 10) {matchesOut += " ";}
    matchesOut += matches[i].quantity;
    matchesOut += " |  ";
    if (matches[i].value < 1000) {matchesOut += " ";}
    matchesOut += matches[i].value;
    matchesOut += " | ";
    if (matches[i].diff >= 0) {matchesOut += "+";}
    matchesOut += matches[i].diff;
    if ((i + 1) < j) {
      matchesOut += "\n";
    }
  }
  console.log(matchesOut);
};

module.exports.getMatches = getMatches;
*/
