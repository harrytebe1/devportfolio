const bcrypt = require('bcrypt');
const db = require('../config/db');

const seedData = async () => {
  try {
    console.log('Starting DB Seed...');

    // 1. Clear existing data
    await db.query('DELETE FROM messages;');
    await db.query('DELETE FROM skills;');
    await db.query('DELETE FROM projects;');
    await db.query('DELETE FROM admins;');

    console.log('Cleared existing data.');

    // 2. Seed Admin
    const saltRounds = 10;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@devportfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    await db.query(
      `INSERT INTO admins (email, password_hash) VALUES ($1, $2)`,
      [adminEmail, hashedPassword]
    );

    console.log(`Admin created: ${adminEmail}`);

    // 3. Seed Projects
    const projects = [
      {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with payment gateway integration and admin dashboard.',
        image_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        repo_url: 'https://github.com/example/ecommerce',
        live_url: 'https://ecommerce.example.com',
        technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
        is_featured: true,
      },
      {
        title: 'Task Management API',
        description: 'A RESTful API for managing tasks and projects with role-based access control.',
        image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
        repo_url: 'https://github.com/example/task-api',
        live_url: '',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        is_featured: false,
      }
    ];

    for (const p of projects) {
      await db.query(
        `INSERT INTO projects (title, description, image_url, repo_url, live_url, technologies, is_featured) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [p.title, p.description, p.image_url, p.repo_url, p.live_url, p.technologies, p.is_featured]
      );
    }
    console.log(`Seeded ${projects.length} projects.`);

    // 4. Seed Skills
    const skills = [
      { name: 'React', category: 'Frontend', icon_name: 'react', level: 4 },
      { name: 'Tailwind CSS', category: 'Frontend', icon_name: 'wind', level: 5 },
      { name: 'Node.js', category: 'Backend', icon_name: 'server', level: 4 },
      { name: 'PostgreSQL', category: 'Database', icon_name: 'database', level: 3 },
    ];

    for (const s of skills) {
      await db.query(
        `INSERT INTO skills (name, category, icon_name, level) VALUES ($1, $2, $3, $4)`,
        [s.name, s.category, s.icon_name, s.level]
      );
    }
    console.log(`Seeded ${skills.length} skills.`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
