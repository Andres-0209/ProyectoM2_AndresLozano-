import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";

// ==========================================
// SECCIÓN: AUTORES (AUTHORS)
// ==========================================

describe("GET /authors", () => {
  it("GET /authors debe retornar la lista completa de autores", async () => {
    const response = await request(app).get("/authors");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /authors/:id", () => {
  it("GET /authors/:id debe retornar un autor existente", async () => {
    const newAuthor = await request(app).post("/authors").send({
      name: "Autor Para Consulta",
      email: `get_by_id_${Date.now()}@example.com`,
      bio: "Bio temporal",
    });

    const authorId = newAuthor.body.id;

    const response = await request(app).get(`/authors/${authorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", authorId);
    expect(response.body).toHaveProperty("name", "Autor Para Consulta");
  });
});

describe("POST /authors - Validación de email faltante", () => {
  it("POST /authors sin email debe retornar 400", async () => {
    const response = await request(app)
      .post("/authors")
      .send({ name: "Sin Email" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /authors - Validación de email duplicado", () => {
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

describe("PUT /authors/:id - Actualización exitosa", () => {
  it("PUT /authors/:id debe actualizar los datos de un autor", async () => {
    const created = await request(app).post("/authors").send({
      name: "Autor Original",
      email: `put_author_${Date.now()}@example.com`,
      bio: "Bio original",
    });

    const authorId = created.body.id;

    const response = await request(app)
      .put(`/authors/${authorId}`)
      .send({
        name: "Autor Nombre Modificado",
        email: `put_author_updated_${Date.now()}@example.com`,
        bio: "Bio actualizada",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Autor Nombre Modificado");
  });
});

describe("PUT /authors/:id - Autor inexistente", () => {
  it("PUT /authors/:id debe retornar 404 si el autor no existe", async () => {
    const response = await request(app)
      .put("/authors/999999")
      .send({
        name: "No Existe",
        email: "noexiste@example.com",
        bio: "N/A",
      });

    expect(response.status).toBe(404);
  });
});

describe("DELETE /authors/:id - Eliminación en cascada", () => {
  it("Debe eliminar un autor y comprobar que sus publicaciones asociadas también se eliminan", async () => {
    const authorResponse = await request(app)
      .post("/authors")
      .send({
        name: "Autor Para Borrar",
        email: `delete_test_${Date.now()}@example.com`,
        bio: "Este autor será eliminado",
      });

    expect(authorResponse.status).toBe(201);
    const authorId = authorResponse.body.id;

    const postResponse = await request(app).post("/posts").send({
      title: "Post del Autor Eliminable",
      content: "Este contenido debería desaparecer junto con el autor",
      author_id: authorId,
    });

    expect(postResponse.status).toBe(201);
    const postId = postResponse.body.id;

    const deleteResponse = await request(app).delete(`/authors/${authorId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty("message");

    const getPostResponse = await request(app).get(`/posts/${postId}`);
    expect(getPostResponse.status).toBe(404);
    expect(getPostResponse.body).toHaveProperty("error");
  });
});

// ==========================================
// SECCIÓN: PUBLICACIONES (POSTS)
// ==========================================

describe("GET /posts", () => {
  it("GET /posts debe retornar una lista de publicaciones", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /posts/:id - Post inexistente", () => {
  it("GET /posts/:id con id inexistente debe retornar 404", async () => {
    const response = await request(app).get("/posts/999999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /posts - Campos obligatorios faltantes", () => {
  it("POST /posts sin campos obligatorios debe retornar 400", async () => {
    const response = await request(app)
      .post("/posts")
      .send({ title: "Solo título" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /posts - Autor inexistente", () => {
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

describe("PUT /posts/:id - Actualización exitosa", () => {
  it("PUT /posts/:id debe actualizar los datos de una publicación", async () => {
    const author = await request(app).post("/authors").send({
      name: "Autor de Post PUT",
      email: `put_post_author_${Date.now()}@example.com`,
      bio: "Bio",
    });

    const post = await request(app).post("/posts").send({
      title: "Título Original",
      content: "Contenido Original",
      author_id: author.body.id,
    });

    const postId = post.body.id;

    const response = await request(app)
      .put(`/posts/${postId}`)
      .send({
        title: "Título Editado",
        content: "Contenido Editado",
        published: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Título Editado");
    expect(response.body.published).toBe(true);
  });
});

describe("PUT /posts/:id - Campos obligatorios faltantes", () => {
  it("PUT /posts/:id sin campos obligatorios debe retornar 400", async () => {
    const author = await request(app).post("/authors").send({
      name: "Autor de Post PUT Inválido",
      email: `put_post_invalid_${Date.now()}@example.com`,
      bio: "Bio",
    });

    const post = await request(app).post("/posts").send({
      title: "Título Original",
      content: "Contenido Original",
      author_id: author.body.id,
    });

    const postId = post.body.id;

    const response = await request(app)
      .put(`/posts/${postId}`)
      .send({ title: "Solo título" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("DELETE /posts/:id - Eliminación directa", () => {
  it("DELETE /posts/:id debe eliminar una publicación directamente", async () => {
    const author = await request(app).post("/authors").send({
      name: "Autor Post Delete Directo",
      email: `delete_post_direct_${Date.now()}@example.com`,
      bio: "Bio",
    });

    const post = await request(app).post("/posts").send({
      title: "Post a borrar directamente",
      content: "Contenido a borrar",
      author_id: author.body.id,
    });

    const postId = post.body.id;

    const response = await request(app).delete(`/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("post");

    const getResponse = await request(app).get(`/posts/${postId}`);
    expect(getResponse.status).toBe(404);
  });
});

describe("GET /posts/author/:authorid - Autor existente", () => {
  it("GET /posts/author/:authorid con autor existente debe retornar 200", async () => {
    const response = await request(app).get("/posts/author/2");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /posts/author/:authorid - Autor inexistente", () => {
  it("GET /posts/author/:authorid con autor inexistente debe retornar 404", async () => {
    const response = await request(app).get("/posts/author/999999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});