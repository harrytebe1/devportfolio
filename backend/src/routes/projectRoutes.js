const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validationMiddleware');
const { verifyToken } = require('../middlewares/authMiddleware');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);

router.post(
  '/',
  verifyToken,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  validate,
  projectController.createProject
);

router.put(
  '/:id',
  verifyToken,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty')
  ],
  validate,
  projectController.updateProject
);

router.delete('/:id', verifyToken, projectController.deleteProject);

module.exports = router;
