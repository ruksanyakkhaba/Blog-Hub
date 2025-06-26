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
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Loader from "./components/Loader";
import ChangePassword from "./Pages/ChangePassword";


const App = () => {
  const [role, setRole] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.status) {
      setRole(auth.userData.role);
    }
  }, [auth.status, auth.userData]);

  if (auth.userData && role === null) {
    return <Loader />;
  }

  return (

    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:id" element={<ReadBlog />} />
        <Route path="/change-password/:id" element={<ChangePassword />} />
        {console.log("role auth", role)}
        {role == "Author" && (
          <>
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/write" element={<CreatePost />} />
          </>
        )}

        <Route
          path="/admin"
          element={role == "Author" ? <AdminDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );


  
}


export default App;
