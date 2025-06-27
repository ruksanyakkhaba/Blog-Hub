import axios from "axios";
import { useState } from "react";
import {
  FaCloudUploadAlt,
  FaPlus,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import api from "../api/apiProvider";
import { useAuth } from "../context/authProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postImage", image);
    formData.append("title", title);
    formData.append("description", description),
    formData.append("category",category)
      formData.append("author", auth?.userDetails?.id);

    try {
      const res = await axios.post(api.createPost.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials:true
      });

      if (res.status === 200) {
        toast("Post Created Successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log("error");
    }
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  function handleAddCategory(e) {
    const newCategory = e.target.value;

    setCategory((prev) => [...prev, newCategory]);
  }

  return (
    <div>CreatePost</div>
  )
}

export default CreatePost