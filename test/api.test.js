import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";


describe("Casos de error - Authors", () => {
  it("POST /authors sin email debe retornar 400", async () => {
    const response = await request(app).post("/authors").send({ name: "Sin Email" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("POST /authors con email duplicado debe retornar 409", async () => {
    const duplicateAuthor = {
      name: "Duplicado",
      email: "duplicado_fijo@example.com",
      bio: "Test duplicado",
    };
    await request(app).post("/authors").send(duplicateAuthor);
    const response = await request(app).post("/authors").send(duplicateAuthor);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
  });
});

describe("GET /posts", () => {
  it("GET /posts debe retornar una lista de publicaciones", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /posts/:id", () => {
  it("GET /posts/:id con id inexistente debe retornar 404", async () => {
    const response = await request(app).get("/posts/999999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /posts", () => {
  it("POST /posts sin campos obligatorios debe retornar 400", async () => {
    const response = await request(app).post("/posts").send({ title: "Solo título" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("POST /posts con author_id inexistente debe retornar 400", async () => {
    const response = await request(app).post("/posts").send({
      title: "Post de prueba",
      content: "Contenido de prueba",
      author_id: 999999,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("GET /posts/author/:authorid", () => {
  it("GET /posts/author/:authorid con autor existente debe retornar 200", async () => {
    const response = await request(app).get("/posts/author/2");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /posts/author/:authorid con autor inexistente debe retornar 404", async () => {
    const response = await request(app).get("/posts/author/999999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
