const db = require('../config/db');

const findAll = async () => {
  const result = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
  return result.rows;
};

const findById = async (id) => {
  const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (project) => {
  const { title, description, image_url, repo_url, live_url, technologies, is_featured } = project;
  const result = await db.query(
    `INSERT INTO projects (title, description, image_url, repo_url, live_url, technologies, is_featured, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
    [title, description, image_url, repo_url, live_url, technologies, is_featured]
  );
  return result.rows[0];
};

const update = async (id, project) => {
  const { title, description, image_url, repo_url, live_url, technologies, is_featured } = project;
  const result = await db.query(
    `UPDATE projects SET 
      title = $1, 
      description = $2, 
      image_url = $3, 
      repo_url = $4, 
      live_url = $5, 
      technologies = $6, 
      is_featured = $7,
      updated_at = NOW()
     WHERE id = $8 RETURNING *`,
    [title, description, image_url, repo_url, live_url, technologies, is_featured, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
