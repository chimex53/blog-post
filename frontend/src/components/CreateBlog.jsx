import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import styles from './CreateBlog.module.css';

const CreateBlog = ({ fetchBlogs }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Rich text editor configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.post('/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchBlogs();
      navigate('/');
    } catch (err) {
      console.error('Blog creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Title *</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Featured Image</label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            className={styles.fileInput}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Content *</label>
          <ReactQuill 
            value={content} 
            onChange={setContent} 
            modules={modules} 
            theme="snow" 
            className={styles.editor}
          />
        </div>
        
        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;