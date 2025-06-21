import React from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import HomePost from '../components/HomePost'
import Footer from '../components/Footer'
import {URL} from '../url'
import { useEffect,useContext,useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'

  const Home = () => {
  const{search}=useLocation()
  const[post,setPost]=useState([])
  const[noResults,setNoresults]=useState(false)
  const[loader,setLoader]=useState(false)
  const{user}=useContext(UserContext)
  const[cat,serCat]=useState([])

  const fetchPosts = async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/posts/"+search)
    }
  }
  return (
    <div>Home</div>
  )
}

export default Home