import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

/**
 * Database client using better-sqlite3 for local development
 * Uses file-based SQLite database
 */

const dbPath = process.env.TURSO_DATABASE_URL || path.join(process.cwd(), 'data', 'tpb-manage.db');

// Create database connection
const client = new Database(dbPath);

// Enable foreign keys
client.pragma('foreign_keys = ON');

// Export database instance with schema
export const db = drizzle(client, { schema });

// Export client for migrations
export { client };
