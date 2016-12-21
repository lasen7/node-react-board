import express from 'express';
import account from './account';
import events from './events';
import event from './event';

const router = express.Router();

router.use('/account', account);
router.use('/events', events);
router.use('/event', event);

export default router;