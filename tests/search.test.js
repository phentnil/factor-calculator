const search = require("../src/search");
test('The closest unit value to a target of 1000 should be 1097.', () => {
  const eObj1 = {"unit": 1097};
  expect(search(1000)).toEqual(expect.objectContaining(eObj1));
});
