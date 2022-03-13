const { factorUnits } = require("./units");
const { Unit } = require("./Unit");
const { result } = require("./result");

/**
 *
 * @param {number} target
 * @param {Unit[]} units
 */
function search(target, units) {
  target = target <= 0 || target === undefined ? 500 : target;
  units =
    "object" === typeof units && units instanceof Array ? units : factorUnits;
  const results = units.map((unitObjects) => {
    let m = unitObjects.multiples;
  });
  return { target, units };
}
console.log(JSON.stringify(search(3300), null, 2));
