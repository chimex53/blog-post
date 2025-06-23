import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import BlogList from './components/BlogList';
import CreateBlog from './components/CreateBlog';
import BlogDetail from './components/BlogDetail';
import './App.css'; 

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Router>
      <div className='app'>
        <header className='header'>
          <Link to="/" className='logoLink'>
            <h1>MERN Blog</h1>
          </Link>
          <nav>
            <Link to="/" className='navLink'>Home</Link>
            <Link to="/create" className='navLink'>New Post</Link>
          </nav>
        </header>
        
        <main className='mainContent'>
          <Routes>
            <Route path="/" element={<BlogList blogs={blogs} fetchBlogs={fetchBlogs} />} />
            <Route path="/create" element={<CreateBlog fetchBlogs={fetchBlogs} />} />
            <Route path="/blog/:id" element={<BlogDetail fetchBlogs={fetchBlogs} />} />
          </Routes>
        </main>
        
        <footer className='footer'>
          <p>© {new Date().getFullYear()} MERN Blog. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;