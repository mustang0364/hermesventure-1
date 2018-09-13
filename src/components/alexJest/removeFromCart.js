const cart = [
    {id: 1, title: 'Shoes'},
    {id: 2, title: 'Jacket'},
    {id: 3, title: 'Gear'},
]

function remove(id) {
    let updateCart = cart.filter((item) => {
        return item.id !== id
    })
    return updateCart
  }
  module.exports = remove;