const db = require('../config/db');

const findAll = async () => {
  const result = await db.query('SELECT * FROM skills ORDER BY category, level DESC');
  return result.rows;
};

const findById = async (id) => {
  const result = await db.query('SELECT * FROM skills WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (skill) => {
  const { name, category, icon_name, level } = skill;
  const result = await db.query(
    `INSERT INTO skills (name, category, icon_name, level, created_at) 
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [name, category, icon_name, level]
  );
  return result.rows[0];
};

const update = async (id, skill) => {
  const { name, category, icon_name, level } = skill;
  const result = await db.query(
    `UPDATE skills SET 
      name = $1, 
      category = $2, 
      icon_name = $3, 
      level = $4
     WHERE id = $5 RETURNING *`,
    [name, category, icon_name, level, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
