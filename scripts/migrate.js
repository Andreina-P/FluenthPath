require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL is not set en tu archivo .env o en las variables de entorno.');
  process.exit(1);
}

// Configurar SSL si es producción o si es supabase (Supabase requiere SSL)
// Para facilitar las cosas de forma local, siempre intentamos usar SSL si falla verificamos.
// En Render, NODE_ENV será 'production'
const client = new Client({
  connectionString,
  ssl: connectionString.includes('supabase.co') || process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false,
});

const migrationsDir = path.join(__dirname, '..', 'database', 'migrations');
const seedsDir = path.join(__dirname, '..', 'database', 'seeds');

async function initHistoryTable() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS script_history (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function hasRun(filename) {
  const { rows } = await client.query('SELECT id FROM script_history WHERE filename = $1', [filename]);
  return rows.length > 0;
}

async function markAsRun(filename) {
  await client.query('INSERT INTO script_history (filename) VALUES ($1)', [filename]);
}

async function runSqlFile(filePath) {
  const filename = path.basename(filePath);
  if (await hasRun(filename)) {
    console.log(`- Saltando ${filename} (ya fue ejecutado anteriormente)`);
    return;
  }
  
  console.log(`Ejecutando ${filename}...`);
  const sql = fs.readFileSync(filePath, 'utf8');
  await client.query(sql);
  await markAsRun(filename);
  console.log(`✓ ${filename} ejecutado exitosamente.`);
}

async function run() {
  try {
    await client.connect();
    console.log(`Conectado a la base de datos PostgreSQL`);

    await initHistoryTable();

    // Ejecutar Migraciones
    if (fs.existsSync(migrationsDir)) {
      const migrations = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
      console.log('\n--- Ejecutando Migraciones (Estructura de la base de datos) ---');
      for (const file of migrations) {
        await runSqlFile(path.join(migrationsDir, file));
      }
    }

    // Ejecutar Seeds (Semillas) solo si se pasa la bandera --seed
    if (process.argv.includes('--seed')) {
      if (fs.existsSync(seedsDir)) {
        const seeds = fs.readdirSync(seedsDir).filter(f => f.endsWith('.sql')).sort();
        console.log('\n--- Ejecutando Seeds (Datos iniciales) ---');
        for (const file of seeds) {
          await runSqlFile(path.join(seedsDir, file));
        }
      }
    } else {
      console.log('\n(Seeds omitidos. Si deseas cargar los datos de prueba, ejecuta: npm run db:seed)');
    }

    console.log('\n¡La base de datos está sincronizada y lista!');
  } catch (error) {
    console.error('Error al ejecutar el script de base de datos:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
