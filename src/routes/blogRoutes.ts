import { Router } from 'express';
import {
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getCategories,
  getTags
} from '../controllers/blogController.js';

const router = Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/categories', getCategories);
router.get('/tags', getTags);

// Admin routes (can add auth middleware later)
router.post('/create', createBlog);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
