const sorting = require('./sorting');

module.exports = (t, r) => {
  /**
   * @param {number} t     Target amount. An error is thrown if type is not number or if a number not between 500 and 5000 is given.
   * @param {number} [r=1] number of results requested
   * @return {Object|Array} If r is 1, an Object will be returned with the best-matching value. Otherwise, r number of Objects will be returned in an array.
   * @todo Find combinations that are quick to find, then implement deeper search algorithms...
   * @todo Import module that keeps track of units available?
   * @todo Possibly import multiples with individual scores?
   */
  if ("number" !== typeof t) {
    throw "Target not specified (must be a number)!";
  } else if ((t < 500) || (t > 5000)) {
    throw "Target out of range!";
  }
  r = ("number" !== typeof r || (r < 1)) ? 1 : r;
  const units = [{unit: 533, quantity: 4}, {unit: 535, quantity: 3}, {unit: 536, quantity: 1}, {unit: 540, quantity: 6}, {unit: 554, quantity: 1}, {unit: 565, quantity: 2}, {unit: 576, quantity: 2}, {unit: 1097, quantity: 4}, {unit: 1100, quantity: 4}, {unit: 1155, quantity: 2}];

  // starting out, we are going to pull the closest unit value to the target without considering combinations.
  let resultUnits = units.map(item => {
    item.diff = item.unit - t;
    item.dpnt = item.unit / t;
    item.pd = (item.dpnt < 1) ? 1 - item.dpnt : item.dpnt - 1;
    return item;
  });
  resultUnits.sort(sorting.byDiff);
  resultUnits = resultUnits.filter(item => item.dpnt < 1.1 && item.dpnt > 0.9);
  if (r === 1) {return resultUnits[0];}
  else {return resultUnits.slice(0, (r - 1));}
  // return (resultUnits.length > 0) ? resultUnits[0] : [];
};

/* All commented code below is just for reference. */
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
//const inventory = require("inventory");

/*
  kcUnits.forEach(function (item, index, array) {
    item.multiples = [];
    for (var i = 0; i <= item.quantity; i++) {item.multiples.push(i * item.unit);}
  });*/

/*
  getMatches(target, JSON.parse(JSON.stringify(kcUnits)));*/
