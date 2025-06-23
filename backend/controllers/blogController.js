const Blog = require('../models/Blog');
const path = require('path');

// Create new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file ? path.join('uploads', req.file.filename) : '';
    
    const newBlog = new Blog({ title, content, image: imagePath });
    const savedBlog = await newBlog.save();
    
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateData = { title, content };
    
    if (req.file) {
      updateData.image = path.join('uploads', req.file.filename);
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};