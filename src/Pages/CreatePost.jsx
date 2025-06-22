import { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaPlus, FaTimes, FaPaperPlane, FaMoon, FaSun } from 'react-icons/fa';

const CreatePost = () => {
  // State management
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const fileInputRef = useRef(null);

  // Available categories
  const availableCategories = [
    'Technology',
    'Programming',
    'Web Development',
    'Artificial Intelligence',
    'Data Science'
  ];

  // Handle image preview
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Add category
  const addCategory = () => {
    if (selectedCategory && !categories.includes(selectedCategory)) {
      setCategories([...categories, selectedCategory]);
      setSelectedCategory('');
    }
  };

  // Remove category
  const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    const postData = {
      title,
      content,
      categories,
      username: 'currentUser', // Replace with actual user from context
      userId: '123' // Replace with actual user ID
    };

    try {
      // First upload the image if exists
      if (file) {
        const uploadResponse = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData
        });
        
        const uploadResult = await uploadResponse.json();
        postData.photo = uploadResult.filename;
      }
      
      // Then create the post
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      
      const result = await response.json();
      alert('Post created successfully!');
      // Redirect to the new post
      window.location.href = `/post/${result._id}`;
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating post');
    }
  };

  return (
    <div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              <FaPlus className="inline mr-2" /> Create New Post
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Post Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="postTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter a compelling title..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Image
              </label>
              <div className="flex items-center space-x-4">
                <label 
                  className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer transition hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden" 
                    accept="image/*"
                  />
                </label>
                {preview && (
                  <div className="w-32 h-32 rounded-md overflow-hidden border dark:border-gray-600">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </label>
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                >
                  <option value="" disabled>Select a category</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center"
                >
                  <FaPlus className="mr-1" /> Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(index)}
                      className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="postContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                required
                placeholder="Write your post content here..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => window.location.href = '/posts'}
                className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center"
              >
                <FaPaperPlane className="mr-2" /> Publish Post
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
