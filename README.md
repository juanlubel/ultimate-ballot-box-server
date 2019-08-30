# Node Server - MongoDB

## Run servers

init MongoDB

$ mongod

init Node Server

$ ../node_db_server/yarn start

## ENDPOINTS

show all students

* get('/api/students')

add a Student

* post('/api/student')

Search student by ID

* get('/api/student/:id')

Update student

* put('/api/student/:id')

Increment by 1 student votes

* put('/api/student_plus/:id')

Decrement by 1 student votes

* put('/api/student_less/:id')

Delete student

* delete('/api/student/:id')

