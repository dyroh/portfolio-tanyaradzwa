require("dotenv").config();
const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ===== HOME ROUTE ===== */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===== DATABASE CONNECTION ===== */
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "portfolio_db"
});

db.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

/* ===== CONTACT ROUTE ===== */
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    console.log("Incoming data:", req.body);

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.json({ success: false });
        }

        console.log("Inserted ID:", result.insertId);
        const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Portfolio Message",
    text: `
New message received:

Name: ${name}
Email: ${email}
Message: ${message}
    `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Email error:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        res.json({ success: true });
    });
});

/* ===== IMAGE ROUTE (AUTO LOAD CAROUSEL) ===== */
app.get("/api/activity-images", (req, res) => {
    const dirPath = path.join(__dirname, "public", "images", "activities");

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error("Image read error:", err);
            return res.json([]);
        }

        const images = files.filter(f =>
            /\.(jpg|jpeg|png|gif|webp)$/i.test(f)
        );

        const paths = images.map(f => `images/activities/${f}`);

        res.json(paths);
    });
});

/* ===== START SERVER ===== */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});

/*=====ADMIN ROUTE========== */
app.get("/messages", (req, res) => {

    if (req.query.key !== "admin123") {

        return res.send("Unauthorized");

    }
    const sql = "SELECT * FROM messages ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.send("Error fetching messages");
        }

        let html = `
        <html>
        <head>
            <title>Admin Messages</title>
            <style>
                body {
                    font-family: Arial;
                    background: #000033;
                    color: white;
                    padding: 40px;
                }

                h1 {
                    text-align: center;
                    color: #4c7dff;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 30px;
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 10px;
                    overflow: hidden;
                }

                th, td {
                    padding: 12px;
                    text-align: left;
                }

                th {
                    background: rgba(255,255,255,0.1);
                }

                tr:nth-child(even) {
                    background: rgba(255,255,255,0.03);
                }

                tr:hover {
                    background: rgba(76,125,255,0.2);
                }
            </style>
        </head>
        <body>
            <h1>📩 Messages</h1>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Time</th>
                </tr>
        `;

        results.forEach(row => {
            html += `
                <tr>
                    <td>${row.name}</td>
                    <td>${row.email}</td>
                    <td>${row.message}</td>
                    <td>${row.created_at}</td>
                </tr>
            `;
        });

        html += `
            </table>
        </body>
        </html>
        `;

        res.send(html);
    });
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});