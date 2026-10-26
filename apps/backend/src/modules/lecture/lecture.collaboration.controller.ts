import { Request, Response } from 'express';
import { LectureNote } from '../../models/LectureNote';
import { LectureBookmark } from '../../models/LectureBookmark';
import { LectureService } from './lecture.service';
import { asyncHandler } from '../../utils/asyncHandler';

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  const userId = req.user!.id;
  await LectureService.validateAccessByLectureId(lectureId, userId, req.user!.role);

  const notes = await LectureNote.find({ lectureId, userId }).sort({ timestamp: 1 });
  
  res.json({ success: true, data: notes });
});

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  const userId = req.user!.id;
  await LectureService.validateAccessByLectureId(lectureId, userId, req.user!.role);
  const { timestamp, content, chunkId } = req.body;

  const note = await LectureNote.create({
    lectureId,
    userId,
    timestamp,
    content,
    chunkId
  });

  res.status(201).json({ success: true, data: note });
});

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const { noteId } = req.params;
  const userId = req.user!.id;

  await LectureNote.findOneAndDelete({ _id: noteId, userId });
  
  res.json({ success: true, data: null });
});

export const getBookmarks = asyncHandler(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  const userId = req.user!.id;
  await LectureService.validateAccessByLectureId(lectureId, userId, req.user!.role);

  const bookmarks = await LectureBookmark.find({ lectureId, userId }).sort({ timestamp: 1 });
  
  res.json({ success: true, data: bookmarks });
});

export const createBookmark = asyncHandler(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  const userId = req.user!.id;
  await LectureService.validateAccessByLectureId(lectureId, userId, req.user!.role);
  const { timestamp, title, chunkId } = req.body;

  const bookmark = await LectureBookmark.create({
    lectureId,
    userId,
    timestamp,
    title,
    chunkId
  });

  res.status(201).json({ success: true, data: bookmark });
});

export const deleteBookmark = asyncHandler(async (req: Request, res: Response) => {
  const { bookmarkId } = req.params;
  const userId = req.user!.id;

  await LectureBookmark.findOneAndDelete({ _id: bookmarkId, userId });
  
  res.json({ success: true, data: null });
});
