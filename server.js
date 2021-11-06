const express = require("express")
const path = require("path")
const fs = require("fs");
const uuid = require("./helpers/uuid")
// const notes = require('./db/notes');

const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Create routes html 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})
// api routes
app.get("/api/notes", (req, res) => {
   const notes =readNote()
    res.status(200).json(notes);
});

app.post("/api/notes", (req, res) => {
    // console.log(req.body)
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }
        const notes =readNote()
        console.log(notes)


        notes.push(newNote)

        // Write updated note back to the file
        fs.writeFile(
            './db/notes.json',
            JSON.stringify(notes, null, 4),
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

function readNote(){
    return JSON.parse(fs.readFileSync("./db/notes.json", "utf-8"));
}

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`))
