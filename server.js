const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const app = express();

const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static("./public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/", "notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  let noteDB = require("./db/db.json");
  const newNote = req.body;

  newNote.id = uniqid();

  noteDB.push(newNote);

  fs.writeFile("./db/db.json", JSON.stringify(noteDB), (err) => {
    if (err) throw err;
  });

  res.json(noteDB);
});

app.delete("/api/notes/:id", (req, res) => {
  let noteDB = require("./db/db.json");
  const noteId = req.params.id;

  for (let i = 0; i < noteDB.length; i++) {
    if (noteId === noteDB[i].id) {
      noteDB.splice(i, 1);
    }
  }

  fs.writeFile("./db/db.json", JSON.stringify(noteDB), (err) => {
    if (err) throw err;
  });

  res.json(noteDB);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
