const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'HospitalDB_24BDS1097'
});

db.connect(err => {
    if (err) return console.error("Connection error: " + err);
    console.log("Connected to HospitalDB_24BDS1097");
});

// Helper function to generate CRUD routes for a table
const generateCRUD = (tableName, idColumn) => {
    // 1. CREATE (Insert)
    app.post(`/api/${tableName}`, (req, res) => {
        const q = `INSERT INTO ${tableName} SET ?`;
        db.query(q, req.body, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Record added", id: result.insertId });
        });
    });

    // 2. READ (Retrieve All)
    app.get(`/api/${tableName}`, (req, res) => {
        const q = `SELECT * FROM ${tableName}`;
        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(data);
        });
    });

    // 3. UPDATE
    app.put(`/api/${tableName}/:id`, (req, res) => {
        const id = req.params.id;
        const q = `UPDATE ${tableName} SET ? WHERE ${idColumn} = ?`;
        db.query(q, [req.body, id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: "Record updated" });
        });
    });

    // 4. DELETE
    app.delete(`/api/${tableName}/:id`, (req, res) => {
        const id = req.params.id;
        const q = `DELETE FROM ${tableName} WHERE ${idColumn} = ?`;
        db.query(q, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: "Record deleted" });
        });
    });
};

// Generate Routes for all 8 Modules
generateCRUD('PATIENT_24BDS1097', 'Patient_ID');
generateCRUD('DOCTOR_24BDS1097', 'Doctor_ID');
generateCRUD('WARD_24BDS1097', 'Ward_ID');
generateCRUD('STAFF_24BDS1097', 'Staff_ID');
generateCRUD('ADMISSION_24BDS1097', 'Admission_ID');
generateCRUD('DIAGNOSIS_24BDS1097', 'Diagnosis_ID');
generateCRUD('TREATMENT_24BDS1097', 'Treatment_ID');
generateCRUD('MEDICATION_24BDS1097', 'Medication_ID');

// Special Route: Joined Admission Data (For a better Frontend View)
app.get('/api/admissions-detailed', (req, res) => {
    const q = `
        SELECT a.*, p.Name as Patient_Name, w.Ward_Name 
        FROM ADMISSION_24BDS1097 a
        JOIN PATIENT_24BDS1097 p ON a.Patient_ID = p.Patient_ID
        JOIN WARD_24BDS1097 w ON a.Ward_ID = w.Ward_ID`;
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(data);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});