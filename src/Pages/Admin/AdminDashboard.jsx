import React, { useState } from "react";
import { FaUser, FaUsers, FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons from react-icons

const AdminDashboard = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", content: "This is post 1" },
    { id: 2, title: "Post 2", content: "This is post 2" },
    { id: 3, title: "Post 3", content: "This is post 3" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);

  const editPost = (id) => {
    const newContent = prompt("Edit post content:");
    setPosts(posts.map(post => post.id === id ? { ...post, content: newContent } : post));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-[90vh] py-6 px-15 dark:bg-black text-white">
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
              <li key={user.id} className="flex items-center">
                <FaUser className="text-gray-600 mr-2" />
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    <div className="h-[150px] mr-10 w-[250px] rounded-2xl bg-red-500">
        <div className="text-2xl text-center py-2 border-b-1">
            Total Posts
        </div>
        <div className="text-4xl text-center py-2 ">
          {post.length}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
