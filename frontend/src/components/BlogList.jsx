import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogList.module.css';

const BlogList = ({ blogs, fetchBlogs }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blogs/${id}`);
      fetchBlogs(); // Refresh blog list
    } catch (err) {
      console.error('Error deleting blog:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Latest Posts</h2>
        <Link to="/create" className={styles.createButton}>Create New</Link>
      </div>
      
      <div className={styles.blogGrid}>
        {blogs.map(blog => (
          <div key={blog._id} className={styles.blogCard}>
            {blog.image && (
              <div className={styles.imageContainer}>
                <img 
                  src={`http://localhost:5000/${blog.image}`} 
                  alt={blog.title} 
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.content}>
              <h3 className={styles.title}>
                <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
              </h3>
              <p className={styles.date}>
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div className={styles.actions}>
                <Link 
                  to={`/blog/${blog._id}`} 
                  className={styles.readButton}
                >
                  Read
                </Link>
                <button 
                  onClick={() => handleDelete(blog._id)} 
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;