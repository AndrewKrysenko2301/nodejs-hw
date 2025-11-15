import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const pageNumber = parseInt(page, 10);
    const limit = parseInt(perPage, 10);

    const filter = {};

    if (tag) {
      filter.tag = tag;
      }
      
    if (search && search.trim() !== '') {
      filter.$text = { $search: search };
    }

    const totalNotes = await Note.countDocuments(filter);

    const totalPages = Math.ceil(totalNotes / limit);

    const notes = await Note.find(filter)
      .skip((pageNumber - 1) * limit)
      .limit(limit);

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
