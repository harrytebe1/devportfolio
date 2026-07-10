const express = require('express');
const router = express.Router();
const {
  getSettings,
  updateSettings,
} = require('../controllers/settingController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', getSettings);
router.post('/', verifyToken, updateSettings);

module.exports = router;
