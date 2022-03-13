class Unit {
  value;
  quantity;
  multiples;
  constructor(unit, quantity) {
    this.value = unit;
    this.quantity = quantity;
    let multiples = [];
    let amount = unit;
    for (let i = 1; i <= quantity && amount <= 5000; i++) {
      multiples.push(amount);
      amount += unit;
    }
    this.multiples = multiples;
  }
}
module.exports = { Unit };
