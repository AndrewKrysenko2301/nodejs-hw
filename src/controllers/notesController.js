import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const pageNumber = parseInt(page, 10);
    const limit = parseInt(perPage, 10);

    let notesQuery = Note.find();
    let countQuery = Note.find();

    if (tag) {
      notesQuery = notesQuery.where('tag').equals(tag);
      countQuery = countQuery.where('tag').equals(tag);
    }

    if (search && search.trim() !== '') {
      const textFilter = { $text: { $search: search } };
      notesQuery = notesQuery.where(textFilter);
      countQuery = countQuery.where(textFilter);
    }

    const [notes, totalNotes] = await Promise.all([
      notesQuery.skip((pageNumber - 1) * limit).limit(limit),
      countQuery.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalNotes / limit);

    res.status(200).json({
      page: pageNumber,
      perPage: limit,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);
    if (!note) return next(createHttpError(404, 'Note not found'));

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findByIdAndUpdate(noteId, req.body, { new: true });
    if (!note) return next(createHttpError(404, 'Note not found'));

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findByIdAndDelete(noteId);
    if (!note) return next(createHttpError(404, 'Note not found'));

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
