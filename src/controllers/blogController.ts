import { Request, Response } from 'express';
import Blog from '../models/Blog.js';

// Get all published blogs
export async function getAllBlogs(req: Request, res: Response) {
  try {
    const { category, tag, search, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let query: any = { published: true };

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get single blog by slug
export async function getBlogBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, published: true });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get single blog by ID
export async function getBlogById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Create a new blog
export async function createBlog(req: Request, res: Response) {
  try {
    const { title, excerpt, content, author, category, tags, image, published } = req.body;

    const blog = new Blog({
      title,
      excerpt,
      content,
      author,
      category,
      tags: tags || [],
      image,
      published: published || false
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// Update a blog
export async function updateBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const blog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// Delete a blog
export async function deleteBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get blog categories
export async function getCategories(req: Request, res: Response) {
  try {
    const categories = ['AI', 'Technology', 'Business', 'Web Development', 'Tutorial', 'News'];
    res.status(200).json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get all tags
export async function getTags(req: Request, res: Response) {
  try {
    const tags = await Blog.distinct('tags', { published: true });
    res.status(200).json({ success: true, data: tags });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
