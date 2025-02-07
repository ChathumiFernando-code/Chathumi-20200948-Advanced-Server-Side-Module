const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Error Handling Middleware
const handleErrors = (res, error) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
};

// @route  POST /api/students
// @desc   Add a new student
router.post("/", async (req, res) => {
    try {
        const { name, age, phone } = req.body;

        if (!name || !age || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newStudent = new Student({ name, age, phone });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        handleErrors(res, error);
    }
});

// @route  GET /api/students
// @desc   Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        handleErrors(res, error);
    }
});

// @route  PUT /api/students/:id
// @desc   Update student details
router.put("/:id", async (req, res) => {
    try {
        const { name, age, phone } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { name, age, phone },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        handleErrors(res, error);
    }
});

// @route  DELETE /api/students/:id
// @desc   Delete a student
router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        handleErrors(res, error);
    }
});

module.exports = router;
