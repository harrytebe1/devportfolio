const skillModel = require('../models/skillModel');

const getSkills = async (req, res, next) => {
  try {
    const skills = await skillModel.findAll();
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

const getSkillById = async (req, res, next) => {
  try {
    const skill = await skillModel.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.json({ success: true, data: skill });
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const newSkill = await skillModel.create(req.body);
    res.status(201).json({ success: true, data: newSkill });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const skill = await skillModel.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    const updatedSkill = await skillModel.update(req.params.id, req.body);
    res.json({ success: true, data: updatedSkill });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const skill = await skillModel.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    await skillModel.remove(req.params.id);
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};
