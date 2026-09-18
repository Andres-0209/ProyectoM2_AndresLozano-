import express from 'express';
import { getPosts, getPostsByAuthor, getPostById, createPost, updatePost, deletePost } from '../controllers/posts.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/author/:authorid', getPostsByAuthor);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;