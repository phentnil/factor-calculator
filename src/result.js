function result(target, units, sum) {
  var count = units.length;
  var difference = sum - target;
  var differencePercent = sum / target - 1;
  units = JSON.parse(JSON.stringify(units));
  var score =
    difference === 0
      ? (Math.pow(2, 53) - 1) / count
      : Math.abs(1 / count / differencePercent);
  return { count, difference, differencePercent, score, sum, target, units };
}
module.exports = { result };
