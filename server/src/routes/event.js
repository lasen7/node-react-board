import express from 'express';
import { event } from '../controllers';

const router = express.Router();

router.post('/:eventId', event.addContent);
router.get('/:eventId', event.getContent);
router.put('/:eventId/like/:contentId', event.likeContent);
router.put('/:eventId/profile', event.editProfile);

export default router;