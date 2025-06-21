import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import { IoMdMoon, IoMdSunny } from 'react-icons/io'; 
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/themeProvider';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
   const [darkMode,setDarkMode] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // var {darkMode}  = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-4 flex items-center justify-between">
    
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-xl">BlogLogo</span>
      </div>

      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
        <Link to="/posts" className="hover:text-gray-700 dark:hover:text-gray-300">Posts</Link>
        <Link to="/about" className="hover:text-gray-700 dark:hover:text-gray-300">About</Link>
        <Link to="/contact" className="hover:text-gray-700 dark:hover:text-gray-300">Contact</Link>
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="text-xl">
          {darkMode ? <IoMdSunny /> : <IoMdMoon />}
        </button>

        {!isLoggedIn ? (
          <>
            <button className="bg-black dark:bg-white text-white text-sm dark:text-black px-2 py-1 rounded hover:cursor-pointer hover:bg-[#1c0101] dark:hover:bg-[#b5b5b3]">Sign Up</button>
         <button className="bg-black dark:bg-white text-white text-sm dark:text-black px-2 py-1 rounded hover:cursor-pointer   hover:bg-[#1c0101] dark:hover:bg-[#b5b5b3]">Login</button>
   

          </>
        ) : (
          <div className="relative">
            {/* Profile Icon */}
            <button onClick={toggleDropdown}>
              <FaUserCircle className="text-2xl" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-md z-10">
                <a href="/profile" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">View Profile</a>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="block w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
