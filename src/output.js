module.exports = results => {
  if (!results.length) {return false;}
  var unitOut = "\nTarget dose: " + results[0].target + "\n| Unit | Qty | Total | Difference\n|--------------------------------\n";
  for (var i = 0, l = results.length; i < l; i++) {
    let rbase = results[i].base, rquan = results[i].quantity, rtota = results[i].total, rdiff = results[i].diff, rdpc = (results[i].dpnt * 100).toFixed(1);
    unitOut += "| " + ((rbase < 1000) ? " " : "") + rbase + " ";
    unitOut += "| " + ((rquan < 10) ? " " : "") + rquan + "  ";
    unitOut += "|  " + ((rtota < 1000) ? " " : "") + rtota + " ";
    unitOut += "| " + ((rdiff < 0) ? "-" : "+") + Math.abs(rdiff) + " (" + ((rdpc < 0) ? "-" : "+") + Math.abs(rdpc) + "%)";
    unitOut += "\n";
  }
  return unitOut;
};
