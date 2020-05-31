/*
  console.log("Target:",target);
  printUnits(JSON.parse(JSON.stringify(kcUnits)));*/

module.exports = units => {// TODO: Incorporate this as some form of output into the main module
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
};
