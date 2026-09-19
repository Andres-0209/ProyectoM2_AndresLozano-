/*import express from "express";
import db from "./src/config/db.js";
import postsRoutes from "./src/routes/posts.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡API de MiniBlog funcionando correctamente!");
});

// Rutas de Autores
app.get("/authors", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM authors ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al obtener los autores",
    });
  }
});

app.post("/authors", async (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "El nombre y el correo electrónico son obligatorios",
    });
  }

  try {
    const queryText = `
      INSERT INTO authors (name, email, bio)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [name, email, bio];
    const result = await db.query(queryText, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(400).json({
        error: "El correo electrónico ya está en uso",
      });
    }

    res.status(500).json({
      error: "Error al crear el autor",
    });
  }
});

app.use("/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
*/
import "dotenv/config";
import express from "express";
import postsRoutes from "./src/routes/posts.routes.js";
import authorsRoutes from "./src/routes/authors.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares principales
app.use(express.json());

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("¡API de MiniBlog funcionando correctamente!");
});

// Rutas de la API
app.use("/posts", postsRoutes);
app.use("/authors", authorsRoutes);

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Exportar app para las pruebas automatizadas con Supertest
export default app;

// Iniciar servidor solo si no estamos ejecutando las pruebas
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}