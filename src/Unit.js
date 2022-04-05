const { MAX_UNIT_VALUE } = require("./constants");
class Unit {
  _unit;
  _quantity;
  _multiples;
  constructor(unit, quantity) {
    this._unit = unit;
    this._quantity = quantity;
    for (let i = 1, sum = unit; i <= quantity && sum <= MAX_UNIT_VALUE; i++) {
      this._multiples.push(sum);
      sum += unit;
    }
  }
  get unit() {
    return this._unit;
  }
  set unit(unit) {
    this._unit = unit;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(quantity) {
    this._quantity = quantity;
  }
  get multiples() {
    return this._multiples;
  }
  set multiples(multiples) {
    this._multiples = multiples;
  }
}
module.exports = { Unit };
