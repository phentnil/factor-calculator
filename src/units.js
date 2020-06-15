let units = [
{unit: 533, quantity: 4},
{unit: 535, quantity: 3},
{unit: 536, quantity: 1},
{unit: 540, quantity: 6},
{unit: 554, quantity: 1},
{unit: 565, quantity: 2},
{unit: 576, quantity: 2},
{unit: 1097, quantity: 4},
{unit: 1100, quantity: 4},
{unit: 1155, quantity: 2}
];
let multiples = [];
units.forEach(item=>{
  for (let u = item.unit, q = 1, maxQ = item.quantity; q <= maxQ; q++) {
    let mtp = {};
    mtp.base = u;
    mtp.quantity = q;
    mtp.total = u * q;
    multiples.push(mtp);
  }
});

module.exports = multiples;
