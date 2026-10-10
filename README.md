# Student CRUD API (Backend Only)

Module 12 assignment: a Student backend API built with Node.js, Express.js and MongoDB (Mongoose).

## Student Fields
- name
- email
- age
- department

## Database
- Database: `studentDB`
- Collection: `students`

## API Endpoints

| Method | Route            | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/students`      | Add a new student    |
| GET    | `/students`      | Get all students     |
| GET    | `/students/:id`  | Get a single student |

## Run Locally

```bash
npm install
npm start
```

The server runs on `http://localhost:5000`. By default it connects to `mongodb://127.0.0.1:27017/studentDB`. To use another database (e.g. MongoDB Atlas), set the `MONGO_URI` environment variable.

## Example Request

`POST /students`

```json
{
  "name": "Rahim",
  "email": "rahim@gmail.com",
  "age": 22,
  "department": "CSE"
}
```
