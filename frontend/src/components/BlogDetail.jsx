import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './BlogDetail.module.css';

const BlogDetail = ({ fetchBlogs }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog post');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await axios.delete(`/api/blogs/${id}`);
        fetchBlogs();
        navigate('/');
      } catch (err) {
        console.error('Delete error:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!blog) return <div className={styles.notFound}>Blog post not found</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')} className={styles.backButton}>
        &larr; Back to Home
      </button>
      
      {blog.image && (
        <div className={styles.imageContainer}>
          <img 
            src={`http://localhost:5000/${blog.image}`} 
            alt={blog.title} 
            className={styles.image}
          />
        </div>
      )}
      
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.date}>
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      
      <div 
        className={styles.content} 
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />
      
      <div className={styles.actions}>
        <button 
          onClick={handleDelete} 
          className={styles.deleteButton}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Post'}
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;