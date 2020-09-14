# Create a new Task :

```js
// Request 1

POST http://localhost:3000/tasks HTTP/1.1
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTc5Nzk0LCJleHAiOjE1OTk1ODMzOTR9.VM6ppzUZt4NGLT6Tqx7Tp4gi5y5c2jFzEdNLAaV79Bg

{
    "title": "FullStack",
    "description": "Complete Cloud ASAP"
}

// Response 1

HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 113
ETag: W/"71-UVIyX4tBWmXeMPdyQ5dAA81SBLk"
Date: Sun, 06 Sep 2020 09:45:52 GMT
Connection: close

{
  "id": "c0c084c0-f025-11ea-acdc-254cf87dfbe3",
  "title": "Cloud",
  "description": "Complete Cloud ASAP",
  "status": "OPEN"
}

// Request 2

POST http://localhost:3000/tasks HTTP/1.1
content-type: application/json

{}

// Reponse 2 (Request Validation Error)

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 114
ETag: W/"72-ix9K6qY3T25wKYf6FTbE5tYqI88"
Date: Sun, 06 Sep 2020 14:35:16 GMT
Connection: close

{
  "statusCode": 400,
  "message": [
    "title should not be empty",
    "description should not be empty"
  ],
  "error": "Bad Request"
}
```

# Get Tasks :

```js
// Request 1

GET http://localhost:3000/tasks HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTc5Nzk0LCJleHAiOjE1OTk1ODMzOTR9.VM6ppzUZt4NGLT6Tqx7Tp4gi5y5c2jFzEdNLAaV79Bg

// Response 1

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 237
ETag: W/"ed-3+QeeZZbeYML9X8BI0CMJPKfspE"
Date: Sun, 06 Sep 2020 09:50:49 GMT
Connection: close

[
  {
    "id": "93f9f6b0-f025-11ea-acdc-254cf87dfbe3",
    "title": "Fullstack",
    "description": "Complete Fullstack ASAP",
    "status": "OPEN"
  },
  {
    "id": "c0c084c0-f025-11ea-acdc-254cf87dfbe3",
    "title": "Cloud",
    "description": "Complete Cloud ASAP",
    "status": "OPEN"
  }
]

// Request 2

GET http://localhost:3000/tasks?status=IN_PROGRESS&search=Clo HTTP/1.1

// Response 2

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 122
ETag: W/"7a-imVO2QBYq4lAmUzfC9XBhDYNtyk"
Date: Sun, 06 Sep 2020 12:27:39 GMT
Connection: close

[
  {
    "id": "d83c7940-f03b-11ea-add6-3d55dabd784e",
    "title": "Cloud",
    "description": "Complete Cloud ASAP",
    "status": "IN_PROGRESS"
  }
]

// Request 3

GET http://localhost:3000/tasks?status=asas&search= HTTP/1.1

// Response 3 (Piping Error)

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 149
ETag: W/"95-3n0LdDQxfRCeYTt4G8/Aesg6gdk"
Date: Sun, 06 Sep 2020 16:43:10 GMT
Connection: close

{
  "statusCode": 400,
  "message": [
    "status must be one of the following values: OPEN,IN_PROGRESS,DONE",
    "search should not be empty"
  ],
  "error": "Bad Request"
}
```

# Get a Task by Id :

```js
// Request 1

GET http://localhost:3000/tasks/0a806880-f032-11ea-8c35-3b00f93edc03 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTc5Nzk0LCJleHAiOjE1OTk1ODMzOTR9.VM6ppzUZt4NGLT6Tqx7Tp4gi5y5c2jFzEdNLAaV79Bg

// Response 1

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 113
ETag: W/"71-Wd2pfLau14jzd8hoPF6CsmyFl1s"
Date: Sun, 06 Sep 2020 11:14:22 GMT
Connection: close

{
  "id": "0a806880-f032-11ea-8c35-3b00f93edc03",
  "title": "Cloud",
  "description": "Complete Cloud ASAP",
  "status": "OPEN"
}

// Request 2

GET http://localhost:3000/tasks/nonExistingId HTTP/1.1

// Response 2 (Database Error)

HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 114
ETag: W/"72-m4esEMxjexMStwjDa6torjxU25A"
Date: Sun, 06 Sep 2020 15:10:13 GMT
Connection: close

{
  "statusCode": 404,
  "message": "Task with ID \"0a806880-f032-11ea-8c35-3b00f93edc03\" not found",
  "error": "Not Found"
}
```

# Delete a Task by Id :

```js
// Request

DELETE http://localhost:3000/tasks/ab598dc0-f034-11ea-999a-f198f9cb02c4 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTc5Nzk0LCJleHAiOjE1OTk1ODMzOTR9.VM6ppzUZt4NGLT6Tqx7Tp4gi5y5c2jFzEdNLAaV79Bg

// Response

HTTP/1.1 200 OK
X-Powered-By: Express
Date: Sun, 06 Sep 2020 11:33:44 GMT
Connection: close
Content-Length: 0
```

# Patch a Task status by Id :

```js
// Request 1

PATCH http://localhost:3000/tasks/1a8a8530-f05a-11ea-a980-a1e40ce9339d/status HTTP/1.1
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTk5NTc5Nzk0LCJleHAiOjE1OTk1ODMzOTR9.VM6ppzUZt4NGLT6Tqx7Tp4gi5y5c2jFzEdNLAaV79Bg

{
    "status": "IN_PROGRESS"
}

// Response 1

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 124
ETag: W/"7c-jn16Af4yVmeui+w5voDgNtQn/W0"
Date: Sun, 06 Sep 2020 16:14:59 GMT
Connection: close

{
  "id": "1a8a8530-f05a-11ea-a980-a1e40ce9339d",
  "title": "FullStack",
  "description": "Complete Cloud ASAP",
  "status": "IN_PROGRESS"
}

// Request 2

PATCH http://localhost:3000/tasks/1a8a8530-f05a-11ea-a980-a1e40ce9339d/status HTTP/1.1
content-type: application/json

{
    "status": "invalid"
}

// Response 2 (Custom Piping Error)

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 86
ETag: W/"56-k6afKQjfWv3HXaBVwvaPFsjcVwI"
Date: Sun, 06 Sep 2020 16:16:41 GMT
Connection: close

{
  "statusCode": 400,
  "message": "\"INVALID\" is not a valid status",
  "error": "Bad Request"
}
```
