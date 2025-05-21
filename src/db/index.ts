import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

const createWorkoutsTableQuery = `
    CREATE TABLE IF NOT EXISTS workouts (
        id TEXT PRIMARY KEY NOT NULL, 
        created_at TEXT NOT NULL, 
        finished_at TEXT
    );
`;

const createExercisesTableQuery = `
    CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY NOT NULL,
        workout_id TEXT NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (workout_id) REFERENCES workouts (id)
    );
`;

const createSetsTableQuery = `
    CREATE TABLE IF NOT EXISTS sets (
        id TEXT PRIMARY KEY NOT NULL,
        exercise_id TEXT NOT NULL,
        reps INTEGER,
        weight REAL,
        one_rm REAL,
        FOREIGN KEY (exercise_id) REFERENCES exercises (id)
    )
`;

export const getDb = async () => {
  if (db) return db;

  db = await SQLite.openDatabaseAsync("fitness.db");

  await db.withTransactionAsync(async () => {
    if (!db) return;

    await db.execAsync(createWorkoutsTableQuery);
    await db.execAsync(createExercisesTableQuery);
    await db.execAsync(createSetsTableQuery);
  });

  return db;
};
