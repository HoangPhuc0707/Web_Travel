import 'dotenv/config';
import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }

  const client = createClient({
    url,
    authToken,
  });

  const sqlPath = path.join(process.cwd(), 'baseline.sql');
  let sql = '';
  try {
    sql = fs.readFileSync(sqlPath, 'utf16le');
  } catch(e) {
    sql = fs.readFileSync(sqlPath, 'utf8');
  }
  sql = sql.replace(/^\uFEFF/, '');

  // Split SQL commands
  const commands = sql
    .split(';')
    .map(c => c.trim())
    .filter(c => c.length > 0);

  console.log(`Applying ${commands.length} statements to Turso...`);

  for (const cmd of commands) {
    try {
      await client.execute(cmd);
      console.log('✅ Executed:', cmd.slice(0, 50) + '...');
    } catch (e) {
      console.error('❌ Failed:', cmd.slice(0, 50) + '...');
      console.error(e);
    }
  }

  console.log('Database push to Turso complete!');
}

main().catch(console.error);
