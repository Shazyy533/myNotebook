const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middleWare/FetchUser");
const Notes = require("../models/Notes");

// Router 1: Get all the notes using Get "/api/notes/getNotes", Login is required
router.get("/getNotes", authMiddleware, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Router 2: Add a new note using Post "/api/notes/addNote", Login is required
router.post("/addNote",
  [
    authMiddleware,
    body("title", "Title is required").trim().notEmpty(),
    body("description", "Description is required").trim().notEmpty(),
    body("tag", "Tag is required").trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
      const newNote = new Notes({
        title,
        desc: description, // Changed to match the model schema
        tags: tag, // Changed to match the model schema
        user: req.user.id,
      });

      const note = await newNote.save();
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
