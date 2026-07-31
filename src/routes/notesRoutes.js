
import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote
} from '../controllers/notesController.js';
import { createStudentSchema, studentIdParamSchema, updateStudentSchema, getStudentsSchema } from '../validations/studentsValidation.js';


const router = Router();

router.get('/notes', celebrate(getStudentsSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(studentIdParamSchema) , getNoteById);
router.post('/notes',celebrate(createStudentSchema) , createNote);
router.delete('/notes/:noteId' , celebrate(studentIdParamSchema) , deleteNote);
router.patch('/notes/:noteId',celebrate(updateStudentSchema) ,updateNote);

export default router;

