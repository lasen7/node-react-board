import express from 'express';
import { events, account } from '../controllers';

const router = express.Router();

router.post('/', account.isAuthenticated, events.addEvents);
router.get('/', account.isAuthenticated, events.getEvents);
router.get('/search', account.isAuthenticated, events.findEvents);
router.delete('/', account.isAuthenticated, events.deleteEvents);

export default router;