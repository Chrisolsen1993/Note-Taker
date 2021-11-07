//trying to work on the modularisation route

// const router = require("express").Router();

// router.get("/api/notes", (req, res) => {
//     const notes =readNote()
//      res.status(200).json(notes);
//  });
 
//  router.post("/api/notes", (req, res) => {
//      // console.log(req.body)
//      const { title, text } = req.body
//      if (title && text) {
//          const newNote = {
//              title,
//              text,
//              id: uuid(),
//          }
//          const notes =readNote()
//          console.log(notes)
 
 
//          notes.push(newNote)
 
//          // Write updated note back to the file
//          fs.writeFile(
//              './db/notes.json',
//              JSON.stringify(notes, null, 4),
//              (writeErr) =>
//                  writeErr
//                      ? console.error(writeErr)
//                      : console.info('Successfully updated notes!')
//          );
 
//          const response = {
//              status: "success",
//              body: newNote,
//          }
//          console.log(response)
//          res.status(201).json(response);
 
//      } else {
//          res.status(500).json('Error in posting review');
//      }
//  })
//  module.exports= router