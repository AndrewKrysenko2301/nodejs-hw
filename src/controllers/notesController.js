import { Note } from '../models/note.js';

export const getNotes = async (req, res) => {
  const note = await Note.find();
  res.status(200).json(note);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note);
};
