import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { IoMdMoon, IoMdSunny } from 'react-icons/io'; // Import icons for dark/light mode
import { Menu } from './Menu';

export const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Load dark mode preference from local storage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  // Apply dark mode to body and store preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className={`flex items-center justify-between px-6 md:px-[200px] py-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h1 className='text-lg md:text-xl font-extrabold'>
        <Link to="/">BlogHub</Link>
      </h1>
      {path === "/" && (
        <div onChange={(e) => setPrompt(e.target.value)} className='flex justify-center items-center space-x-0'>
          <input className='outline-none rounded-l-xl px-3 text-black bg-white' placeholder='search a post' type='text' />
          <p onClick={() => (prompt ? navigate(`/?search=${prompt}`) : navigate("/"))} className='cursor-pointer p-1 bg-white text-black rounded-r-xl'>
            <BsSearch />
          </p>
        </div>
      )}
      <div className='hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
        {user ? (
          <h3><Link to='/write'>Write</Link></h3>
        ) : (
          <h3><Link to='/login'>Login</Link></h3>
        )}
        {user ?
          <div onClick={showMenu}>
            <p className='cursor-pointer relative'></p>
            <FaBars />
            
            {menu && <Menu />}
          </div>:<h3>
          <Link to='/register'>Register</Link></h3>
        }
      </div>
      <div onClick={showMenu} className='md:hidden text-lg'>
        <p className='cursor-pointer relative'>
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
      {/* Dark/Light Mode Toggle Icon */}
      <button onClick={toggleDarkMode} className='text-xl ml-4'>
        {darkMode ? <IoMdSunny /> : <IoMdMoon />}
      </button>
    </div>
  );
};

export default Navbar;
