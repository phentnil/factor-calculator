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

module.exports = {
  search: (target, units) => {
    // default target units to 1000 if valid input not provided
    target = target || 1000;
    // default units available to a few short options
    units = units || [{'unit':522},{'unit':533},{'unit':1023},{'unit':1024},{'unit':1024}];
    units.forEach(item => {
      item.diff = item.unit - target;
      item.dpnt = item.unit / target;
      item.ndif = (item.unit < 1000) ? item.dpnt * 2 : item.dpnt;
      item.pd = (item.dpnt < 1) ? 1 - item.dpnt : item.dpnt - 1;
    });
    units.sort((a,b) => a.pd - b.pd);
    //var elUnits = units.filter(item=>(item.dpnt > 0.9) && (item.dpnt < 1.1));
    //return JSON.stringify(units) + "\n" + JSON.stringify(elUnits);
    return units[0].unit;
  }
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
