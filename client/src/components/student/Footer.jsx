import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>

        <div className='flex flex-col md:items-start items-center w-full md:w-1/3'>
          <img src={assets.logo_dark} alt='Logo' className='w-32 lg:w-40' style={{filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.8))'}} />
          <p className='mt-4 text-sm text-white/80'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        <div className='flex flex-col md:items-start items-center w-full md:w-auto'>
          <h3 className='text-white font-semibold mb-4'>Company</h3>
          <ul className='flex flex-col md:items-start items-center gap-2 text-sm text-white/80'>
            <li><a href='#' className='hover:text-white transition-colors'>Home</a></li>
            <li><a href='#' className='hover:text-white transition-colors'>About us</a></li>
            <li><a href='#' className='hover:text-white transition-colors'>Contact us</a></li>
            <li><a href='#' className='hover:text-white transition-colors'>Privacy policy</a></li>
          </ul>
        </div>

        <div className='flex flex-col md:items-start items-center w-full md:w-1/3'>
          <h3 className='text-white font-semibold mb-4'>Subscribe to our newsletter</h3>
          <p className='text-sm text-white/80'>
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className='flex items-center gap-2 mt-4 w-full max-w-sm'>
            <input
              type='email'
              placeholder='Enter your email'
              className='bg-gray-800 border border-gray-700 text-white text-sm rounded px-4 py-2.5 flex-1 outline-none focus:border-blue-500 transition-colors'
            />
            <button className='bg-blue-600 text-white text-sm px-6 py-2.5 rounded hover:bg-blue-700 transition-colors'>
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <p className='py-4 text-center text-xs md:text-sm text-white/60'>
        Copyright 2026 © GyaanVerse. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer
