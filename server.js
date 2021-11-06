const express = require("express")
const path = require ("path")
const fs = require("fs");
const uuid = require("./helpers/uuid")
const notes =require('./db/notes');

const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Create routes
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
})
app.get ("/notes",(req, res) =>{
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
//     function readNote(){
//         return JSON.parse(fs.readFileSync("./db/notes.json", "utf-8"));
//     }
//    const notes= readNote()
    res.status(200).json(notes);
  });
  
app.post("/api/notes", (req, res) => {
const {noteTitle, noteText}=req.body
if (noteTitle && noteText){
const newNote = {
    noteTitle,
    noteText,
    id: uuid(),
}
const parsedNotes = JSON.parse(notes);
parsedNotes.push(newNote)

// Write updated note back to the file
fs.writeFile(
    './db/notes.json',
    JSON.stringify(parsedNotes, null, 4),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Successfully updated notes!')
  );

const response = {
    status: "success",
    body: newNote,
}
console.log(response)
res.status(201).json(response);

} else {
    res.status(500).json('Error in posting review');
    }
  })

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`))
