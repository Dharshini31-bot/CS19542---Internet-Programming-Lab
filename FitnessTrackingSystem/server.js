const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'deeksha@2004',
    database: 'fitness'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// API to create a new fitness plan
app.post('/api/plan', (req, res) => {
    const { planName, intensity, workoutType, goals, duration, milestone1, milestone2, reminderTime, notificationEnabled } = req.body;

    const query = `INSERT INTO fitness_plans (planName, intensity, workoutType, goals, duration, milestone1, milestone2, reminderTime, notificationEnabled)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                   db.execute(query, [planName, intensity, workoutType, goals.join(', '), duration, milestone1, milestone2, reminderTime, notificationEnabled],
                   (err, result) => {
                       if (err) {
                           console.error('Error inserting data:', err); // Log the error
                           return res.status(500).send(err);
                       }
                       res.send({ message: 'Plan created successfully!', planId: result.insertId });
                   }
               );
               
});

// Starting server
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);

});
