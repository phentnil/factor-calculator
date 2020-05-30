const index = require("../src/index");
test('', () => {
  expect(index.main(1000)).toBe(1024);
});
