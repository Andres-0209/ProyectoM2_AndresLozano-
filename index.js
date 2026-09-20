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