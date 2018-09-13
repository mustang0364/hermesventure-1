create table users (
    id serial primary key,
    name text NOT NULL,
    email text NOT NULL
)

create table products (
    id serial primary key,
    title text,
    category text,
    price integer,
    image text,
    description text
)

create table cart  (
    id serial primary key,
    user_id int
)

create table quantity (
    id serial primary key,
    product_id int references products(id),
    quantity int,
    cart_id int references cart(id)
)

create table orders  (
    id serial primary key,
    product_id int references products(id),
    cart_id int references cart(id),
    quantity int
)

create table addresses (
    addressid serial primary key,
    userid int,
    street text,
    city text,
    state varchar(2),
    zip varchar(5),
    foreign key (userid) references users(id)
)
select * from addresses;
update addresses set street = 'asdf' where userid = 3;

insert into products 
(title, category, price, image, description, gender)
values
('Rain Jacket Black', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391720/black.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Rain Jacket Blue', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391720/blue.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Rain Jacket Red', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535389077/download.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Jacket Blue', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391720/blue.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Jacket Orange', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391754/red.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Jacket Sky Blue', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391755/skyblue.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Jacket Yellow', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391755/yellow.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Winter Jacket Blue', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391781/jacket-3blue.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Winter Jacket Green', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391781/jacket-3green.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Snow Jacket Black', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391810/jacket-2black.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Snow Jacket Red', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391810/jacket-2red.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Snow Jacket White', 'Tibet', 249.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391810/jacket-2white.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Snow Jacket Black', 'Tibet', 299.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391842/wjacket-1black.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Snow Jacket Pink', 'Tibet', 299.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391843/wjacket-1pink.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Snow Jacket Fur Pink', 'Tibet', 299.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391868/wjacket-2pink.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Snow Jacket Fur Green', 'Tibet', 299.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391869/wjacket-2green.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Snow Jacket Fur Purple', 'Tibet', 299.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391869/wjacket-2purple.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Light Jacket Red', 'Tibet', 149.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391886/wjacket-4red.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Light Jacket Rose', 'Tibet', 149.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535391887/wjacket-4rose.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Burton Snowboard', 'Tibet', 599.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561412/snowboard.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Snow Mask', 'Tibet', 39.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/snowmask.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Back Pack', 'Tibet', 79.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/backpack1.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('Red Tent', 'Tibet', 139.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/redTent.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'mens'),
('White Gloves', 'Tibet', 69.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/womenGloves1.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Red Cap', 'Tibet', 19.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/redCap.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Black Hat', 'Tibet', 39.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/backHat1.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Snowboard Boots', 'Tibet', 79.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/boots1.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens'),
('Blue Goggles', 'Tibet', 49.99, 'https://res.cloudinary.com/dvvwg1hp3/image/upload/v1535561411/blueGoogles1.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'womens')














