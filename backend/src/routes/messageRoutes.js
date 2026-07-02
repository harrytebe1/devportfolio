const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  validate,
  messageController.createMessage
);

router.get('/', verifyToken, messageController.getMessages);
router.get('/:id', verifyToken, messageController.getMessageById);
router.put('/:id/read', verifyToken, messageController.markAsRead);
router.put('/:id/unread', verifyToken, messageController.markAsUnread);
router.delete('/:id', verifyToken, messageController.deleteMessage);

module.exports = router;
