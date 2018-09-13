select users.name, orders.cart_id, addresses.street, addresses.city, addresses.state, addresses.zip, products.title, products.price, products.image, orders.quantity from orders
join cart on cart.id = orders.cart_id
join users on users.id = cart.user_id
join addresses on addresses.addressid = orders.address
join products on products.id = orders.product_id
where orders.cart_id = $1