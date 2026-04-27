const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

let students = [
    { id: 1, name: "Aydan", course: "IT" },
    { id: 2, name: "Ben", course: "Engineering" },
    { id: 3, name: "Chloe", course: "Business" }
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

app.post('/students', (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({ message: "Missing name or course" });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        course
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, course } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (name) student.name = name;
    if (course) student.course = course;

    res.json(student);
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deleted = students.splice(index, 1);

    res.json({ message: "Student deleted", student: deleted[0] });
})