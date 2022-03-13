class Result {
  count;
  difference;
  differencePercent;
  score;
  sum;
  target;
  units;
  /**
   *
   * @param {number} target The ordered target dose
   * @param {number[]} units Array of unit values in the Result
   */
  constructor(target, units) {
    this.target = target;
    this.units = JSON.parse(JSON.stringify(units));
    const sum = units.reduce((total, next) => total + next, 0);
    const count = units.length;
    const difference = sum - target;
    const differencePercent = sum / target - 1;
    this.sum = sum;
    this.count = count;
    this.difference = difference;
    this.differencePercent = differencePercent;
    this.score =
      difference === 0
        ? (Math.pow(2, 53) - 1) / units.length
        : Math.abs(1 / count / differencePercent);
  }
  simplePrint() {
    return `${this.sum}\t${this.difference}\t${this.units.join(", ")}`;
  }
  detailPrint() {
    return `${this.target}\t${this.sum}\t${this.difference}\t${String(
      this.differencePercent
    ).padEnd(22, " ")}\t${this.units[0]}\t${this.count}\t${this.score}`;
  }
}
module.exports = { Result };
