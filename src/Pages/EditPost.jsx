import React, { useState, useEffect } from 'react';
import { IF } from '../url';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    desc: '',
    photo: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${IF}/api/posts/${id}`);
        setPost({
          title: res.data.title,
          desc: res.data.desc,
          photo: res.data.photo
        });
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({...post, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('desc', post.desc);
      if (file) {
        formData.append('photo', file);
      }

      const res = await axios.put(`${IF}/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 200) {
        navigate(`/post/${id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
      console.error("Error updating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={post.desc}
            onChange={handleChange}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Current Image
          </label>
          {post.photo && (
            <img 
              src={IF + post.photo} 
              alt="Current post" 
              className="h-40 w-auto object-cover rounded-md mb-2"
            />
          )}
          <label className="block text-sm font-medium text-gray-700">
            Upload New Image (optional)
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
