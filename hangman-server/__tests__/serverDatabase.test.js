// database.test.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'test-database.sqlite');

const setupDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
      }
    });

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )`);

      // Insert sample data
      const stmt = db.prepare("INSERT INTO players (name) VALUES (?)");
      stmt.run("Alice");
      stmt.run("Bob");
      stmt.finalize();
      resolve(db);
    });
  });
};
const cleanupDatabase = (db) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("DROP TABLE IF EXISTS players", (err) => {
        if (err) {
          reject(err);
        } else {
          db.close(resolve);
        }
      });
    });
  });
};


describe('Database Tests', () => {
  let db;

  beforeAll(async () => {
    db = await setupDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase(db);
  });

  test('should insert a player into the database', (done) => {
    const playerName = "Charlie";

    db.run("INSERT INTO players (name) VALUES (?)", playerName, function (err) {
      expect(err).toBeNull();
      expect(this.changes).toBe(1); 
      done();
    });
  });

});
