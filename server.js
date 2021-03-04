const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/", "index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/", "notes.html"));
});
app.get("/assets/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/assets/css/", "styles.css"));
});
app.get("/assets/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/assets/js/", "index.js"));
});
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/", "db.json"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
