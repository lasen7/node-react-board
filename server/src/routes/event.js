import express from 'express';
import { event } from '../controllers';

const router = express.Router();

router.get('/:eventId', event.findAndCreateToken, event.getContent);
router.get('/:eventId/profile', event.findAndCreateToken, event.getProfile);
router.post('/:eventId', event.findToken, event.addContent);
router.put('/:eventId/like/:contentId', event.findToken, event.likeContent);
router.put('/:eventId/profile', event.findToken, event.editProfile);

export default router;