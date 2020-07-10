function Result (target, units, sum) {
  this.target = parseInt(target) || 0;
  this.units = units || [];
  this.sum = parseInt(sum) || 0;
  this.diff = sum - target;
  this.dp = (sum / target) - 1;
  let count = 0;
  for (let i = 0, l = units.length; i < l; i++) {
    count += units[i].quantity;
  }
  this.vCount = count;
  if (sum - target === 0) {
    // If the sum matches the target
    // use the largest safe integer and divide it by the quantity of vials used
    this.score = (Math.pow(2, 53) - 1) / count;
  } else {
    // If the sum does not match the target,
    // divide the fraction of 1/count by the percentage difference from the target
    this.score = Math.abs((1 / count) / ((sum / target) - 1));
  }
}
module.exports = Result;
