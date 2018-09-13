select orders.cart_id, products.image, products.title, products.price, products.id, products.category from orders
join cart on cart.id = orders.cart_id
join users on users.id = cart.user_id
join addresses on addresses.addressid = orders.address
join products on products.id = orders.product_id
where orders.cart_id = $1;