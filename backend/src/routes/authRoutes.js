const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validationMiddleware');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

module.exports = router;
