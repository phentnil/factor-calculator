/*jshint esversion: 6*/
function getMatches (target, inUnits) {
  var i;
  target = target || 3000;
  inUnits = inUnits || [];
  if (inUnits.length < 1) {return null;}
  var units = JSON.parse(JSON.stringify(inUnits));
  var matches = [];
  var results = [];
  while (units.length) {
    var item = units.shift();
    var u = item.unit;
    var m = item.multiples;
    for (i = 0, l = m.length; i < l; i++) {
      var v = m[i];
      var d = v - target;
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
}
function printUnits (units) {// TODO: Incorporate this as some form of output into the main module
  units = units || [];
  if (units.length < 1) {return false;}
  var unitOut = "Unit | Qty | Multiples\n";
  for (var i = 0, l = units.length; i < l; i++) {
    unitOut += units[i].unit;
    if (units[i].unit < 1000) {unitOut += " ";}
    unitOut += " | ";
    if (units[i].quantity < 10) {unitOut += " ";}
    unitOut += units[i].quantity;
    unitOut += "  | ";
    var multis = units[i].multiples;
    for (var m = 1, n = multis.length; m < n; m++) {
      unitOut += multis[m];
      if ((m + 1) < multis.length) {unitOut += ", ";}
    }
    if ((i + 1) < units.length) {unitOut += "\n";}
  }
  console.log(unitOut);
}
function sortByDiff (a, b) {return Math.abs(a.diff) - Math.abs(b.diff);}
function sortByQuantity (a, b) {return a.quantity - b.quantity;}
function main (target) {
  if ("number" !== typeof target) {target = 3000;}
  var kcUnits = [{unit: 533, quantity: 4}, {unit: 535, quantity: 3}, {unit: 536, quantity: 1}, {unit: 540, quantity: 6}, {unit: 554, quantity: 1}, {unit: 565, quantity: 2}, {unit: 576, quantity: 2}, {unit: 1097, quantity: 4}, {unit: 1100, quantity: 4}, {unit: 1155, quantity: 2}];
  kcUnits.forEach(function (item, index, array) {
    item.multiples = [];
    for (var i = 0; i <= item.quantity; i++) {item.multiples.push(i * item.unit);}
  });
  console.log("Target:",target);
  printUnits(JSON.parse(JSON.stringify(kcUnits)));
  getMatches(target, JSON.parse(JSON.stringify(kcUnits)));
}
//window.onload = main;
