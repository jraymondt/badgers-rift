// init-db.mjs
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:db.sqlite',
});

async function main() {
  console.log('Creating table...');
  await client.execute(`
    CREATE TABLE IF NOT EXISTS Likes (
      slug TEXT PRIMARY KEY,
      count INTEGER DEFAULT 0
    );
  `);
  console.log('Done!');
}

main();
