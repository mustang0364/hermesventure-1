insert into users 
(name, email, auth0id)
values
(${name}, ${email}, ${auth0id})
returning *;