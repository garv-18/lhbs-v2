import 'dotenv/config';
import pg from 'pg';

async function test() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URI });
  const res = await pool.query("SELECT * FROM media WHERE id = 35");
  console.log(res.rows);
  process.exit(0);
}
test();
