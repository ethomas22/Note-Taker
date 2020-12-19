// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fS = require("fs")
var db = require("./db/db.json");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 2291;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) { // https://ethomas-notetaker.herokuapp.com/
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
  
  app.get("/notes", function(req, res) { // https://ethomas-notetaker.herokuapp.com/notes
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });

  app.get("/assets/css/styles.css", function(req, res) { // https://ethomas-notetaker.herokuapp.com/assets/css/styls.css
    res.sendFile(path.join(__dirname, "public", "assets", "css", "styles.css"));
  });

  app.get("/assets/js/index.js", function(req, res) { // https://ethomas-notetaker.herokuapp.com/assets/js/index.js
    res.sendFile(path.join(__dirname, "public", "assets", "js", "index.js"));
  });

  app.get("/api/notes", function(req, res) { // https://ethomas-notetaker.herokuapp.com/api/notes
    res.sendFile(path.join(__dirname, "db", "db.json"));
  });

  app.post("/api/notes", function(req, res) { // https://ethomas-notetaker.herokuapp.com/api/notes
    db.push(req.body)
    fS.promises.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(db)).then(() => {
      res.end();
    }).catch(console.error);
  });

  app.delete("/api/notes/:id", function(req, res) {
      db.splice(db.findIndex(function (note) {
        return req.params.id === note.id
      }),1);
      fS.promises.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(db)).then(() => {
        res.end();
      }).catch(console.error);
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
