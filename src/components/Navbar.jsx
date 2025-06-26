import React, { useState, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import { IoMdMoon, IoMdSunny,IoMdSearch } from 'react-icons/io'; 
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/themeProvider';
import { useAuth } from '../context/authProvider';
import api from '../api/apiProvider';
import axios from 'axios';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  
  var {darkMode,toggleDarkMode} = useContext(ThemeContext);
  
  const {auth} = useAuth();
  useEffect(()=>{
    if(auth.status){
      setIsLoggedIn(true)
    }
  },[auth.status]) 
  
   const handleLogOut = async() =>{
     const res =  await axios.get(api.logout.url,{
      withCredentials:true
     })

     if(res.status ==200 ){
      window.location.href = "/"
     }
   }
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 

   
  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-15 py-4 flex items-center justify-between  border-b-2 border-gray-200 dark:border-gray-700">
    
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-xl">BlogLogo</span>
      </div>
    {console.log(toggleDarkMode)}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
        <Link to="/posts" className="hover:text-gray-700 dark:hover:text-gray-300">Posts</Link>
        <Link to="/about" className="hover:text-gray-700 dark:hover:text-gray-300">About</Link>
        <Link to="/contact" className="hover:text-gray-700 dark:hover:text-gray-300">Contact</Link>
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
            <button className="bg-black dark:bg-white text-white text-sm dark:text-black px-2 py-1 rounded hover:cursor-pointer hover:bg-[#1c0101] dark:hover:bg-[#b5b5b3]">Sign Up</button>
         <button className="bg-black dark:bg-white text-white text-sm dark:text-black px-2 py-1 rounded hover:cursor-pointer   hover:bg-[#1c0101] dark:hover:bg-[#b5b5b3]">Login</button>
   

          </>
        ) : (
          <div className="relative">
           
            <button onClick={toggleDropdown}>
              <FaUserCircle className="text-2xl" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-md z-10">

                <Link to="/profile" className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">View Profile</Link>
                <button
                  onClick={() =>handleLogOut()}
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
