const { factorUnits } = require("./units");
const { Unit } = require("./Unit");
const { Result } = require("./Result");

/**
 *
 * @param {number} target
 * @param {Unit[]} units
 */
function search(target, units) {
  target = target <= 0 || target === undefined ? 500 : target;
  units =
    "object" === typeof units && units instanceof Array ? units : factorUnits;
  /**
   * @type {Result[]}
   */
  const multiples = [];
  units.forEach((unitObject) => {
    const mults = unitObject.multiples;
    const base = mults[0];
    mults.forEach((_ml, index) => {
      let q = index + 1;
      let mlUnits = Array.from({ length: q }, (_) => base);
      let res = new Result(target, mlUnits);
      multiples.push(res);
    });
  });

  // Sort results based on score
  multiples.sort((ma, mb) => mb.score - ma.score);

  console.log(`Target: ${target}`);
  console.log(multiples.map((mult) => mult.simplePrint()).join("\n"));
}
module.exports = { search };
