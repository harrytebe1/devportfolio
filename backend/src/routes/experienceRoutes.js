const express = require('express');
const router = express.Router();
const {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Protected routes (Admin only)
router.post('/', verifyToken, createExperience);
router.put('/:id', verifyToken, updateExperience);
router.delete('/:id', verifyToken, deleteExperience);

module.exports = router;
