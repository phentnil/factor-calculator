const search = require("../src/search");
test('The closest unit value to a target of 1000 should be 1097.', () => {
  const eObj1 = {"unit": 1097};
  expect(search(1000,1)).toEqual(expect.objectContaining(eObj1));
});
test('The closest unit value to a target of 3000 should be return an empty array.', () => {
  const eArr1 = [];
  expect(search(3000,1)).toEqual(expect.arrayContaining(eArr1));
});
test('The closest unit value to a target of 500 should be 533.', () => {
  const eObj2 = {"unit": 533};
  expect(search(500,1)).toEqual(expect.objectContaining(eObj2));
});
test('', () => {
  const eArr2 = [];
  expect(search(1000,2)).toEqual(expect.arrayContaining(eArr2));
});
test('No target value given should throw an error.', () => {
  expect(() => {search();}).toThrow();
});
test('Target value > 5000 should throw an error.', () => {
  expect(() => {search(5999);}).toThrow();
});
test('Target value < 500 should throw an error.', () => {
  expect(() => {search(400);}).toThrow();
});
