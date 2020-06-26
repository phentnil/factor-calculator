module.exports = (results, target) => {
  if (!results.length) {return false;}
  var unitOut = "\nTarget dose: " + target + "\n|  Sum |  Difference  | Units \n|--------------------------------\n";
  for (var i = 0, l = results.length; i < l; i++) {
    let units = results[i].units, sum = results[i].sum;
    let diff = sum - target;
    let dp = (diff / target) * 100;
    unitOut += "| " + ((sum < 1000) ? " " : "") + sum + " ";
    unitOut += "| ";
    let sign = (diff < 0) ? "-" : "+";
    unitOut += sign + Math.abs(diff) + " (" + sign + Math.abs(dp.toFixed(1)) + "%) ";
    unitOut += "| ";
    for (let j = 0, m = units.length; j < m; j++) {
      unitOut += units[j].base + " x" + units[j].quantity;
      if (j + 1 < m) {
        unitOut += ", ";
      }
    }
    unitOut += "\n";
  }
  return unitOut;
};
