# Signup a new User :

```js
// Request

POST http://localhost:3000/auth/signup HTTP/1.1
content-type: application/json

{
    "username": "user1",
    "password": "Password1"
}

// Response
```

# Signin a User :

```js
// Request

POST http://localhost:3000/auth/signin HTTP/1.1
content-type: application/json

{
    "username": "user1",
    "password": "Password1"
}

// Response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTY4NTU0LCJleHAiOjE1OTk1NzIxNTR9.7G7EWIc_ceL-aIFc8Z40PkwP48Oo4-FfSD3617JmhPk"
}
```

# Testing - Log Incoming Req :

```js
// Request

GET http://localhost:3000/auth/test HTTP/1.1
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTY4NTU0LCJleHAiOjE1OTk1NzIxNTR9.7G7EWIc_ceL-aIFc8Z40PkwP48Oo4-FfSD3617JmhPk

// Response
```

# Testing - Extract User from Req and Log :

```js
// Request

GET http://localhost:3000/auth/test2 HTTP/1.1
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTY4NTU0LCJleHAiOjE1OTk1NzIxNTR9.7G7EWIc_ceL-aIFc8Z40PkwP48Oo4-FfSD3617JmhPk

// Response
```
