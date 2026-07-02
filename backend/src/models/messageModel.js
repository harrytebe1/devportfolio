const db = require('../config/db');

const findAll = async () => {
  const result = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
  return result.rows;
};

const findById = async (id) => {
  const result = await db.query('SELECT * FROM messages WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (messageData) => {
  const { name, email, message } = messageData;
  const result = await db.query(
    `INSERT INTO messages (name, email, message, is_read, created_at) 
     VALUES ($1, $2, $3, false, NOW()) RETURNING *`,
    [name, email, message]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

const markAsRead = async (id) => {
  const result = await db.query(
    'UPDATE messages SET is_read = true WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

const markAsUnread = async (id) => {
  const result = await db.query(
    'UPDATE messages SET is_read = false WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  remove,
  markAsRead,
  markAsUnread
};
