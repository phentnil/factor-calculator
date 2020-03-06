/*jshint esversion: 6*/
/* Unit | Qty | Multiples */
const getMatches = (target=500,units=[]) => {
  if (units.length < 1) {return null;}
  var matches = [];
  while (units.length) {
    let item = units.shift();
    let u = item.unit;
    let m = item.multiples;
    for (let i = 0, l = m.length; i < l; i++) {
      let v = m[i];
      let d = v - target;
      if (Math.abs(d) < Math.floor(target * 0.1)) {matches.push({unit: u, quantity: i, value: v, diff: d});}
    }
  }
  matches.sort(sortByDiff);
  for (let i = 0, j = matches.length; i < j; i++) {

  }
  console.log(matches);
};

const sortByDiff = (a, b) => Math.abs(a.diff) - Math.abs(b.diff);

const sortByQuantity = (a, b) => a.quantity - b.quantity;

const printUnits = (units=[]) => {
  if (units.length < 1) {return false;}
  let unitOut = "Unit | Qty | Multiples\n";
  for (let i = 0, l = units.length; i < l; i++) {
    unitOut += units[i].unit;
    if (units[i].unit < 1000) {unitOut += " ";}
    unitOut += " | ";
    if (units[i].quantity < 10) {unitOut += " ";}
    unitOut += units[i].quantity;
    unitOut += "  | ";
    let multis = units[i].multiples;
    for (let m = 1, n = multis.length; m < n; m++) {
      unitOut += multis[m];
      if ((m + 1) < multis.length) {unitOut += ", ";}
    }
    if ((i + 1) < units.length) {unitOut += "\n";}
  }
  console.log(unitOut);
};

window.onload = () => {
  const kcUnits = [{unit: 533, quantity: 4}, {unit: 535, quantity: 3}, {unit: 536, quantity: 1}, {unit: 540, quantity: 6}, {unit: 554, quantity: 1}, {unit: 565, quantity: 2}, {unit: 576, quantity: 2}, {unit: 1097, quantity: 4}, {unit: 1100, quantity: 4}, {unit: 1155, quantity: 2}];
  kcUnits.forEach((item, index, array) => {
    item.multiples = [];
    for (let i = 0; i <= item.quantity; i++) {item.multiples.push(i * item.unit);}
  });
  const target = 3000;
  console.log("Target:",target);
  printUnits(JSON.parse(JSON.stringify(kcUnits)));
  getMatches(target, JSON.parse(JSON.stringify(kcUnits)));
};
