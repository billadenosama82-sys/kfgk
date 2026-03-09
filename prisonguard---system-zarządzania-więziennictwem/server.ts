import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('prison.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    employeeId TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT,
    department TEXT
  );

  CREATE TABLE IF NOT EXISTS inmates (
    id TEXT PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    inmateNumber TEXT UNIQUE,
    dateOfBirth TEXT,
    citizenship TEXT,
    sentence TEXT,
    sentenceLength TEXT,
    startDate TEXT,
    endDate TEXT,
    crimeType TEXT,
    cellNumber TEXT,
    wardId TEXT,
    securityLevel TEXT,
    status TEXT
  );

  CREATE TABLE IF NOT EXISTS incidents (
    id TEXT PRIMARY KEY,
    date TEXT,
    time TEXT,
    location TEXT,
    category TEXT,
    threatLevel TEXT,
    status TEXT,
    description TEXT
  );
`);

// Seed initial data if empty
const userCount = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };
if (userCount.count === 0) {
  db.prepare('INSERT INTO users (id, employeeId, password, name, role, department) VALUES (?, ?, ?, ?, ?, ?)')
    .run('1', 'ADMIN', 'admin123', 'Jan Kowalski', 'ADMIN', 'Administracja');
  db.prepare('INSERT INTO users (id, employeeId, password, name, role, department) VALUES (?, ?, ?, ?, ?, ?)')
    .run('2', 'GUARD', 'guard123', 'Adam Nowak', 'GUARD', 'Ochrona');
  db.prepare('INSERT INTO users (id, employeeId, password, name, role, department) VALUES (?, ?, ?, ?, ?, ?)')
    .run('3', 'MEDICAL', 'med123', 'Anna Wiśniewska', 'MEDICAL', 'Służba Zdrowia');
}

const inmateCount = db.prepare('SELECT count(*) as count FROM inmates').get() as { count: number };
if (inmateCount.count === 0) {
  db.prepare('INSERT INTO inmates (id, firstName, lastName, inmateNumber, cellNumber, wardId, securityLevel, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run('1', 'Jan', 'Kowalski', '2024/001', 'A-102', 'Oddział A', 'MEDIUM', 'ACTIVE');
  db.prepare('INSERT INTO inmates (id, firstName, lastName, inmateNumber, cellNumber, wardId, securityLevel, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run('2', 'Adam', 'Nowak', '2023/154', 'B-205', 'Oddział B', 'HIGH', 'ACTIVE');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.post('/api/login', (req, res) => {
    const { employeeId, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE employeeId = ? AND password = ?').get(employeeId, password) as any;
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
    }
  });

  app.get('/api/inmates', (req, res) => {
    const inmates = db.prepare('SELECT * FROM inmates').all();
    res.json(inmates);
  });

  app.get('/api/incidents', (req, res) => {
    const incidents = db.prepare('SELECT * FROM incidents').all();
    res.json(incidents);
  });

  app.get('/api/stats', (req, res) => {
    const inmatesCount = db.prepare('SELECT count(*) as count FROM inmates').get() as any;
    const staffCount = db.prepare('SELECT count(*) as count FROM users').get() as any;
    const incidentsToday = db.prepare('SELECT count(*) as count FROM incidents WHERE date = ?').get(new Date().toISOString().split('T')[0]) as any;
    
    res.json({
      inmates: inmatesCount.count,
      staff: staffCount.count,
      incidentsToday: incidentsToday.count,
      activeAlarms: 0
    });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
