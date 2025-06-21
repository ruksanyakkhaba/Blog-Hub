import React, { useState } from 'react'
import api from '../api/apiProvider';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("")

  async function handleClick(){
    try{

    
    const res = await axios.post(api.login.url,{
      email,
      password
    })
    if(!res.status === 200 || res.status == 400){
        toast("Unable to login")
    }else{
      navigate("/")
    }
  }
    catch(err){
      console.log(err)
      toast(err.response.data.message)
    }

  }
 return (
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-white text-black">
      <section className="flex w-[28rem] flex-col space-y-8 p-8 rounded-xl bg-[#F9F9F9] shadow-lg">
        <div className="text-center text-3xl font-semibold text-black">Login</div>
          <ToastContainer />
        

        <div className="w-full transform border-b-[1px] border-gray-300 bg-transparent text-lg duration-300 focus-within:border-black">
          <input
            type="text"
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-500 text-lg focus:outline-none"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          
          />
        </div>

        <div className="w-full transform border-b-[1px] border-gray-300 bg-transparent text-lg duration-300 focus-within:border-black">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-500 text-lg focus:outline-none"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
        </div>

        <button className="transform rounded-md bg-black py-2 font-medium text-white duration-300 hover:bg-gray-800 hover:text-white border-[1px] border-black" onClick={handleClick}>
          Login
        </button>

        <a href="#" className="transform text-center font-medium text-gray-600 duration-300 hover:text-black">
          FORGOT PASSWORD?
        </a>

        <p className="text-center text-sm text-gray-500">
          No account?
          <a href="#" className="mx-2 font-medium text-black underline-offset-4 hover:underline">
            Create One
          </a>
        </p>
      </section>
    </main>
  )
}

export default Login





