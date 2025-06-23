import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiTrash } from "react-icons/pi";
import api from "../api/apiProvider";
import { useAuth } from "../context/authProvider";
import { toast, ToastContainer } from "react-toastify";

export const Profile = () => {
  const { auth } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("auth", auth);
      if (auth && auth.userData) {
        const { _id } = auth.userData;
        setUserDetails(auth.userData);

        fetchPosts(_id);
      } else {
        console.log("User not authenticated or userData not available.");
      }
    };

    const fetchPosts = async (userId) => {
      if (userId) {
        try {
          const response = await axios.get(
            api.getUserPosts.url + "/" + userId,
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            setPosts(response.data.posts);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchUserData();
  }, [auth]);

  const handleDelete = async (postId) => {
    try { 
      const response = await axios.delete(api.deletePost.url + "/" + postId, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Post deleted successfully");
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  };
  

  console.log("userDetails", userDetails);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black dark:text-white flex flex-col items-center py-10">
      <div className="w-[400px] rounded-xl shadow-md dark:shadow-white p-6 bg-white dark:bg-[#1c1c1c]">
        <ToastContainer />
        <div className="h-[40px] mt-4 flex items-center gap-3 px-2 py-1 rounded-xl bg-white dark:bg-[#19191a]">
          <span className="capitalize w-[80px]">Username</span>

          <p className="h-full w-full rounded-xl px-2 bg-transparent">
            {userDetails?.username}
          </p>
        </div>
        <div className="h-[40px] mt-4 flex items-center gap-3 px-2 py-1 rounded-xl bg-white dark:bg-[#19191a]">
          <span className="capitalize w-[80px]">Email</span>
          <p className="h-full w-full rounded-xl px-2 bg-transparent">
            {userDetails?.email}
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-10 px-4">
        <h2 className="text-xl font-semibold mb-4">
          Posts by {userDetails?.username}
        </h2>
        {posts.map((post) => (
          <li
            key={post._id}
            className="p-4 mt-3 h-[85px] bg-white dark:bg-[#1c1c1c] rounded-md shadow-md group relative list-none"
          >
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {post.description.length > 100
                ? post.description.slice(0, 100) + "..."
                : post.description}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <button
              className="absolute top-5 right-3 p-2 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 hover:cursor-pointer"
              onClick={() => handleDelete(post._id)}
            >
              <PiTrash className="text-lg" />
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Profile;
