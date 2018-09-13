insert into cart
(user_id)
values
($1)
returning id;