import React, { useState, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import { IoMdMoon, IoMdSunny,IoMdSearch } from 'react-icons/io'; 
import { Link,useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/themeProvider';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate=useNavigate();
  
  var {darkMode,toggleDarkMode} = useContext(ThemeContext);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 

   
  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-4 flex items-center justify-between">
    
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-xl">
          <Link onClick={'/'}>BlogHub</Link>
          </span>
      </div>
    {console.log(toggleDarkMode)}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
        <Link to="/posts" className="hover:text-gray-700 dark:hover:text-gray-300">Posts</Link>
      </div>
      <div className="h-[40px] w-[150px] px-2 rounded-xl flex items-center border-1 transition-all duration-300">
  <input
    type="text"
    placeholder="Search ....."
    className="w-full h-full text-xl border-none outline-none focus:outline-none"
  />
  <IoMdSearch className="text-3xl" />
</div>

      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="text-xl">
          {darkMode ? <IoMdSunny /> : <IoMdMoon />}
        </button>

        {!isLoggedIn ? (
          <>
            <button 
              onClick={() => navigate('/register')}
              className="bg-black dark:bg-white text-white text-sm dark:text-black px-2 py-1 rounded hover:cursor-pointer hover:bg-[#1c0101] dark:hover:bg-[#b5b5b3]" >
              Sign Up
            </button>
            <button className="bg-black dark:bg-white text-white text-sm dark:text-black px-2 py-1 
            rounded hover:cursor-pointer   hover:bg-[#1c0101] dark:hover:bg-[#b5b5b3]" onClick={()=>{
              navigate('/login')
            }}>Login</button>
   

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
