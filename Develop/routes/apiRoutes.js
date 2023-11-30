const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'db.json'), 'utf-8'));
  res.json(notes);
});

router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'db.json'), 'utf-8'));
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, '../..', 'db.json'), JSON.stringify(notes));
  
  res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
  const idToDelete = req.params.id;
  
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'db.json'), 'utf-8'));
  const updatedNotes = notes.filter(note => note.id !== idToDelete);
  fs.writeFileSync(path.join(__dirname, '../..', 'db.json'), JSON.stringify(updatedNotes));
  
  res.sendStatus(200);
});

module.exports = router;
