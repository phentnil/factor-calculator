module.exports = (target, units, sum) => {
  let r = {};
  r.target = parseInt(target) || 0;
  r.units = units || [];
  r.sum = parseInt(sum) || 0;
  r.diff = sum - target;
  r.dp = (sum / target) - 1;
  let count = 0;
  for (let i = 0, l = units.length; i < l; i++) {
    count += units[i].quantity;
  }
  r.vCount = count;
  if (sum - target === 0) {
    // If the sum matches the target
    // use the largest safe integer and divide it by the quantity of vials used
    r.score = (Math.pow(2, 53) - 1) / count;
  } else {
    // If the sum does not match the target,
    // divide the fraction of 1/count by the percentage difference from the target
    r.score = Math.abs((1 / count) / ((sum / target) - 1));
  }
  return r;
};
