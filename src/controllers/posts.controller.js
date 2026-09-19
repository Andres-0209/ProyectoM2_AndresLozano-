import db from "../config/db.js";

const getPosts = async (req, res) => {
  try {
    const queryText = `
      SELECT posts.id, posts.title, posts.content, posts.published,
             posts.created_at, authors.name AS author_name
      FROM posts
      JOIN authors ON posts.author_id = authors.id
      ORDER BY posts.id ASC
    `;
    const result = await db.query(queryText);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
};

const getPostById = async (req, res) => {
  const postid = req.params.id;
  try {
    const queryText = `
      SELECT posts.id, posts.title, posts.content, posts.published,
             posts.created_at, authors.name AS author_name
      FROM posts
      JOIN authors ON posts.author_id = authors.id
      WHERE posts.id = $1
    `;
    const result = await db.query(queryText, [postid]);

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener la publicación" });
  }
};

const createPost = async (req, res) => {
  const { title, content, author_id } = req.body;
  if (!title || !content || !author_id) {
    return res.status(400).json({
      error: "Los campos 'title', 'content' y 'author_id' son obligatorios",
    });
  }
  try {
    const queryText =
      "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *";
    const result = await db.query(queryText, [title, content, author_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23503") {
      return res
        .status(400)
        .json({ error: "El ID del autor proporcionado no existe" });
    }
    console.error(err);
    res.status(500).json({ error: "Error al crear la publicación" });
  }
};

const updatePost = async (req, res) => {
  const postid = req.params.id;
  const { title, content, published } = req.body;
  if (!title || !content || published === undefined) {
    return res.status(400).json({
      error: "Los campos 'title', 'content' y 'published' son obligatorios",
    });
  }

  try {
    const queryText = `
      UPDATE posts
      SET title = $1, content = $2, published = $3
      WHERE id = $4
      RETURNING *
    `;

    const result = await db.query(queryText, [
      title,
      content,
      published,
      postid,
    ]);

    if (!result.rows[0]) {
      return res.status(404).json({
        error: "Publicación no encontrada",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    if (err.code === "23503") {
      return res.status(400).json({
        error: "El ID del autor proporcionado no existe",
      });
    }

    res.status(500).json({
      error: "Error al actualizar la publicación",
    });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    res.json({
      message: "Publicación eliminada correctamente",
      post: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getPostsByAuthor = async (req, res) => {
  const authorId = req.params.authorid;

  try {
    const authorCheck = await db.query("SELECT id FROM authors WHERE id = $1", [
      authorId,
    ]);

    if (authorCheck.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    const result = await db.query("SELECT * FROM posts WHERE author_id = $1", [
      authorId,
    ]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al obtener las publicaciones del autor" });
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
