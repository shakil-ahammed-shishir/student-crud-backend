const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB";

app.use(express.json());

// Student schema -> collection name: "students" (database: studentDB)
const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 1 },
    department: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema, "students");

// POST /students -> add a new student
app.post("/students", async (req, res) => {
  try {
    const { name, email, age, department } = req.body;
    const student = await Student.create({ name, email, age, department });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /students -> get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /students/:id -> get a single student
app.get("/students/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid student id" });
    }
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected: studentDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
