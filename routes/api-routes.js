const path = require("path");
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(path.resolve(__dirname, "../db/db.json"), "utf8", function (
      err,
      data
    ) {
      if (err) {
        console.error(err);
        return res.end();
      }
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    fs.readFile(path.resolve(__dirname, "../db/db.json"), "utf8", function (
      err,
      data
    ) {
      if (err) {
        console.error(err);
        return res.end();
      }
      const notes = JSON.parse(data);

      notes.push(newNote);
      fs.writeFileSync(
        path.resolve(__dirname, "../db/db.json"),
        JSON.stringify(notes),
        "utf8"
      );

      res.json(notes);
    });
  });
  app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id;
    fs.readFile(path.resolve(__dirname, "../db/db.json"), "utf8", function (
      err,
      data
    ) {
      if (err) {
        console.error(err);
        return res.end();
      }
      const notes = JSON.parse(data);

      notes.splice(id, 1);
      fs.writeFileSync(
        path.resolve(__dirname, "../db/db.json"),
        JSON.stringify(notes),
        "utf8"
      );

      res.json(notes);
    });
  });
};
