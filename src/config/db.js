import pkg from "pg";
const { Pool } = pkg;

const buildConnectionString = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const user = process.env.DB_USER || "postgres";
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || 5432;
  const database = process.env.DB_NAME || "miniblog";

  const auth = password ? `:${encodeURIComponent(password)}` : "";
  return `postgresql://${user}${auth}@${host}:${port}/${database}`;
};

const db = new Pool({
  connectionString: buildConnectionString(),
  ssl:
    process.env.DATABASE_URL || process.env.DB_HOST
      ? { rejectUnauthorized: false }
      : false,
});

export default db;