import { Request, Response } from 'express';
import { LectureQuiz } from '../../models/LectureQuiz';
import { LectureFlashcard } from '../../models/LectureFlashcard';
import { LectureService } from './lecture.service';
import { asyncHandler } from '../../utils/asyncHandler';

export const getLectureQuiz = asyncHandler(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  await LectureService.validateAccessByLectureId(lectureId, req.user!.id, req.user!.role);
  const quiz = await LectureQuiz.findOne({ lectureId });
    if (!quiz) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }
  res.json({ success: true, data: quiz });
});

export const getLectureFlashcards = asyncHandler(async (req: Request, res: Response) => {
  const { lectureId } = req.params;
  await LectureService.validateAccessByLectureId(lectureId, req.user!.id, req.user!.role);
  const flashcards = await LectureFlashcard.findOne({ lectureId });
    if (!flashcards) {
      return res.status(404).json({ success: false, error: 'Flashcards not found' });
    }
  res.json({ success: true, data: flashcards });
});
