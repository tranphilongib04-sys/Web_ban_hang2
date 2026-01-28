import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

/**
 * Database client using better-sqlite3 for local development
 * Uses file-based SQLite database
 */

let client: Database.Database | null = null;
let dbInstance: any = null;

function initializeDatabase() {
  if (client && dbInstance) return dbInstance;

  try {
    const dbDir = path.join(process.cwd(), 'data');
    const dbPath = process.env.TURSO_DATABASE_URL || path.join(dbDir, 'tpb-manage.db');

    // Create database directory if it doesn't exist
    if (!existsSync(dbDir) && !process.env.TURSO_DATABASE_URL) {
      mkdirSync(dbDir, { recursive: true });
    }

    // Create database connection
    client = new Database(dbPath);

    // Enable foreign keys
    client.pragma('foreign_keys = ON');

    // Create the database instance
    dbInstance = drizzle(client, { schema });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }

  return dbInstance;
}

// Initialize on first import
export const db = new Proxy({}, {
  get: (_target, prop) => {
    const instance = initializeDatabase();
    return instance[prop as keyof typeof instance];
  },
}) as any;
