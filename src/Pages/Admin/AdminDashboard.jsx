import React, { useState } from "react";
import { FaUser , FaUsers, FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons from react-icons

const AdminDashboard = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", content: "This is post 1" },
    { id: 2, title: "Post 2", content: "This is post 2" },
    { id: 3, title: "Post 3", content: "This is post 3" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "User  1" },
    { id: 2, name: "User  2" },
    { id: 3, name: "User  3" },
  ]);

  const [comments, setComments] = useState([
    { id: 1, postId: 1, text: "Great post!" },
    { id: 2, postId: 1, text: "Thanks for sharing!" },
    { id: 3, postId: 2, text: "Interesting read." },
  ]);

  const editPost = (id) => {
    const newContent = prompt("Edit post content:");
    setPosts(posts.map(post => post.id === id ? { ...post, content: newContent } : post));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    setComments(comments.filter(comment => comment.postId !== id)); // Delete comments associated with the post
  };

  const deleteUser  = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setPosts(posts.filter(post => post.userId !== id)); // Assuming posts have a userId field
    setComments(comments.filter(comment => comment.userId !== id)); // Assuming comments have a userId field
  };

  const deleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <div className="flex items-center mb-4">
            <FaUsers className="text-blue-500 mr-2" />
            <span className="text-lg">Total Users: {users.length}</span>
          </div>
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUser  className="text-gray-600 mr-2" />
                  {user.name}
                </div>
                <button onClick={() => deleteUser (user.id)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Posts Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Posts</h2>
          <div className="flex items-center mb-4">
            <FaUsers className="text-green-500 mr-2" />
            <span className="text-lg">Total Posts: {posts.length}</span>
          </div>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600">{post.content}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => editPost(post.id)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Comments Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="flex items-center mb-4">
            <FaUsers className="text-yellow-500 mr-2" />
            <span className="text-lg">Total Comments: {comments.length}</span>
          </div>
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => deleteComment(comment.id)} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
