import db from '../config/db.js';

const getAuthors = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM authors ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
};

const createAuthor = async (req, res) => {
  const { name, email, bio } = req.body;

if (!name || !email) {
  return res.status(400).json({ error: "Los campos 'name' y 'email' son obligatorios" });
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

    if (err.code === '23505') {
      return res.status(409).json({
        error: 'El correo electrónico ya está en uso',
      });
    }

    res.status(500).json({ error: 'Error al crear el autor' });
  }
};

const updateAuthor = async (req, res) => {
  const authorId = req.params.id;
  const { name, email, bio } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: "Los campos 'name' y 'email' son obligatorios" });
  }

  try {
    const queryText = `
      UPDATE authors
      SET name = $1, email = $2, bio = $3
      WHERE id = $4
      RETURNING *
    `;
    const values = [name, email, bio, authorId];
    const result = await db.query(queryText, values);

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    if (err.code === '23505') {
      return res.status(409).json({
        error: 'El correo electrónico ya está en uso',
      });
    }

    res.status(500).json({ error: 'Error al actualizar el autor' });
  }
};

const deleteAuthor = async (req, res) => {
  const authorId = req.params.id;

  try {
    const result = await db.query('DELETE FROM authors WHERE id = $1 RETURNING *', [authorId]);

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json({
      message: "Autor eliminado correctamente",
      author: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el autor" });
  }
};

const getAuthorById = async (req, res) => {
  const authorId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM authors WHERE id = $1', [authorId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el autor' });
  }
};

export {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};