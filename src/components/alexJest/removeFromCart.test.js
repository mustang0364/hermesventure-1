const remove = require('../alexJest/removeFromCart')

test('Should have removed an Item', () => {
  
  expect(remove(1).length).toBe(2);
});