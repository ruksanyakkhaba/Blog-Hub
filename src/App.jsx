import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CreatePost from './Pages/CreatePost'
import Postdetails from './Pages/PostDetails'
import EditPost from './Pages/EditPost'
import MyBlogs from './Pages/MyBlogs'
import Profile from './Pages/Profile'
import { Navbar } from './components/Navbar'
import { useAuth } from './context/authProvider'



const App = () => {
  const auth = useAuth();
  return (
   <>
   <Navbar />
 {console.log(auth)}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/write' element={<CreatePost/>} />
      <Route path='/post/post/:id' element={<Postdetails/>} />
      <Route path='/edit/:id' element={<EditPost/>} />
      <Route path='/myblogs/:id' element={<MyBlogs/>} />
      <Route path='/profile' element={<Profile/>} />
    
    </Routes>
   </>
  )
}

export default App