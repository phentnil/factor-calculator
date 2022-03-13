class Unit {
  value;
  quantity;
  multiples;
  constructor(unit, quantity) {
    this.value = unit;
    this.quantity = quantity;
    this.multiples = Array.from(
      { length: quantity },
      (_, index) => (index + 1) * unit
    ).filter((value) => value > 5000);
  }
}
module.exports = { Unit };
