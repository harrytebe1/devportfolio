const messageModel = require('../models/messageModel');

const getMessages = async (req, res, next) => {
  try {
    const messages = await messageModel.findAll();
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};

const getMessageById = async (req, res, next) => {
  try {
    const message = await messageModel.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const newMessage = await messageModel.create(req.body);
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const message = await messageModel.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    await messageModel.remove(req.params.id);
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const message = await messageModel.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    const updatedMessage = await messageModel.markAsRead(req.params.id);
    res.json({ success: true, data: updatedMessage });
  } catch (error) {
    next(error);
  }
};

const markAsUnread = async (req, res, next) => {
  try {
    const message = await messageModel.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    const updatedMessage = await messageModel.markAsUnread(req.params.id);
    res.json({ success: true, data: updatedMessage });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
  getMessageById,
  createMessage,
  deleteMessage,
  markAsRead,
  markAsUnread
};
