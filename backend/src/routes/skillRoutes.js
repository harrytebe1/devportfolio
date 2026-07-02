const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const skillController = require('../controllers/skillController');

const router = express.Router();

router.get('/', skillController.getSkills);
router.get('/:id', skillController.getSkillById);

router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('level').optional().isInt({ min: 1, max: 5 }).withMessage('Level must be between 1 and 5')
  ],
  validate,
  skillController.createSkill
);

router.put(
  '/:id',
  verifyToken,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('level').optional().isInt({ min: 1, max: 5 }).withMessage('Level must be between 1 and 5')
  ],
  validate,
  skillController.updateSkill
);

router.delete('/:id', verifyToken, skillController.deleteSkill);

module.exports = router;
