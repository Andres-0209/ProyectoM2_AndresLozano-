import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import postsRoutes from "./src/routes/posts.routes.js";
import authorsRoutes from "./src/routes/authors.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;


const swaggerDocument = YAML.load("./openapi.yaml");


app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => {
  res.send("¡API de MiniBlog funcionando correctamente!");
});


app.use("/posts", postsRoutes);
app.use("/authors", authorsRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});


export default app;


if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}