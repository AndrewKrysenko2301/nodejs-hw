import { Router } from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

router.get('/', getNotes);
router.get('/:noteId', getNoteById);
router.post('/', createNote);
router.delete('/:noteId', deleteNote);
router.patch('/:noteId', updateNote);

export default router;
