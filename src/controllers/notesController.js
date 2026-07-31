
import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// Отримати список усіх нотаток
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  const notesQuery = await Note.find();
  const [totalItems, notes]= await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage)
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, notes });
};

// Отримати одну нотатку за id
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404,'Note not found');
  }

  res.status(200).json(note);
};

//post controller

export const createNote = async (req, res) =>{
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

//delete controller
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

//patch controller

export const updateNote = async ( req, res ) =>{
  const {noteId} =req.params;
  const note=await Note.findOneAndUpdate(
    {_id: noteId},
    req.body,
    {returnDocument: "after"}
  );
  if(!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(note);
};
