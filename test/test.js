const index = require("../src/index");
test('', () => {
  expect(index(1000)).toBe(1024);
});
