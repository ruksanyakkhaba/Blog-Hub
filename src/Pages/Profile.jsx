import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiPencil } from "react-icons/pi";
import api from "../api/apiProvider";
import { useAuth } from "../context/authProvider";

export const Profile = () => {
  const [user, setUser] = useState(true);
  const [posts, setPosts] = useState([]);
  const userDetails = useAuth();
  
  const [editable, setEditable] = useState({
    name: false,
    username: false,
    email: false,
  });
  const [saveBtn, setSaveBtn] = useState(false);

  const toggleInputField = (field) => {
    setSaveBtn(true);
    setEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userRes = await axios.get(api.getInfo.url, {
  //         withCredentials: true,
  //       });

  //       const postsRes = await axios.get(api.getUserPosts.url, {
  //         withCredentials: true,
  //       });

  //       setUser(userRes.data);
  //       setPosts(postsRes.data);
  //     } catch (err) {
  //       console.error("Failed to fetch user or posts:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black dark:text-white flex flex-col items-center py-10">
      <div className="w-[400px] rounded-xl shadow-md dark:shadow-white p-6 bg-white dark:bg-[#1c1c1c]">
        {/* User Fields */}
        {["name", "username", "email"].map((field) => (
          <div
            key={field}
            className="h-[40px] mt-4 flex items-center gap-3 px-2 py-1 rounded-xl bg-white dark:bg-[#19191a]"
          >
            <span className="capitalize w-[80px]">{field}:</span>
            <input
              type="text"
              value={user[field]}
              disabled={!editable[field]}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, [field]: e.target.value }))
              }
              className={`h-full w-full rounded-xl px-2 ${
                editable[field]
                  ? "border border-gray-400 dark:border-gray-600"
                  : "bg-transparent"
              }`}
            />
            {console.log("deat",userDetails)}
            <button onClick={() => toggleInputField(field)}>
              <PiPencil className="text-2xl" />
            </button>
          </div>
        ))}

        {saveBtn && (
          <div className="w-full mt-6 flex justify-center">
            <button className="h-[35px] w-[90px] bg-black text-white dark:bg-white dark:text-black rounded-2xl text-lg">
              Save
            </button>
          </div>
        )}
      </div>

      {/* User Posts Section */}
      <div className="w-full max-w-3xl mt-10 px-4">
        <h2 className="text-xl font-semibold mb-4">Posts by {user.username}</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post.id}
                className="p-4 bg-white dark:bg-[#1c1c1c] rounded-md shadow-md"
              >
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
