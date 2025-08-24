import React from 'react'


const Footer = () => {
  return (
    <div>Footer</div>

export const Footer = () => {
  return (
    <div>
        <div className='w-full bg-black px-8  md:px-[300px] flex md:flex-row flex-col space-x-6 md:space-y-0
         items-start justify-between sm:justify-center md:justify-between text-sm md:text-md py-8'>
            <div className='flex flex-col text-white'>
                <p>Featured Blogs</p>
                <p>Most view</p>
                <p>Readers Choice</p>
            </div>
            <div className='flex flex-col text-white'>
                <p>Featured Blogs</p>
                <p>Most view</p>
                <p>Readers Choice</p>
            </div>
            <div className='flex flex-col text-white'>
                <p>Customer Care</p>
                <p>About Us</p>
                <p>Privacy and policy</p>
            </div>
            </div>        
    </div>

  )
}

export default Footer