import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-900 w-full mt-10'>
      {/* Main footer content */}
      <div className='max-w-7xl mx-auto px-8 lg:px-16 pt-14 pb-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 text-left'>

          {/* Brand column */}
          <div className='lg:col-span-1'>
            <img
              src={assets.logo_dark}
              alt='GyaanVerse Logo'
              className='w-36 lg:w-40'
              style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.8))' }}
            />
            <p className='mt-4 text-sm text-white/70 leading-relaxed'>
              Empowering learners worldwide with expert-led courses in technology, business, and creative skills. Start your learning journey with GyaanVerse today.
            </p>
            {/* Social icons */}
            <div className='flex items-center gap-3 mt-6'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-blue-600 transition-colors'>
                <img src={assets.facebook_icon} alt='Facebook' className='w-4 h-4 brightness-0 invert' />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-sky-500 transition-colors'>
                <img src={assets.twitter_icon} alt='Twitter' className='w-4 h-4 brightness-0 invert' />
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-pink-600 transition-colors'>
                <img src={assets.instagram_icon} alt='Instagram' className='w-4 h-4 brightness-0 invert' />
              </a>
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-5'>Quick Links</h3>
            <ul className='flex flex-col gap-3 text-sm text-white/70'>
              <li><Link to='/' className='hover:text-white transition-colors'>Home</Link></li>
              <li><Link to='/course-list' className='hover:text-white transition-colors'>All Courses</Link></li>
              <li><Link to='/my-enrollments' className='hover:text-white transition-colors'>My Enrollments</Link></li>
              <li><a href='#' className='hover:text-white transition-colors'>About Us</a></li>
              <li><a href='#' className='hover:text-white transition-colors'>Contact Us</a></li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-5'>Resources</h3>
            <ul className='flex flex-col gap-3 text-sm text-white/70'>
              <li><a href='#' className='hover:text-white transition-colors'>Help Center</a></li>
              <li><a href='#' className='hover:text-white transition-colors'>Terms of Service</a></li>
              <li><a href='#' className='hover:text-white transition-colors'>Privacy Policy</a></li>
              <li><a href='#' className='hover:text-white transition-colors'>Refund Policy</a></li>
              <li><a href='#' className='hover:text-white transition-colors'>Become an Educator</a></li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-5'>Stay Updated</h3>
            <p className='text-sm text-white/70 leading-relaxed'>
              Subscribe to get the latest courses, tips, and learning resources delivered to your inbox.
            </p>
            <div className='flex items-center mt-4 w-full'>
              <input
                type='email'
                placeholder='Enter your email'
                className='bg-white/10 border border-white/20 text-white text-sm rounded-l-lg px-4 py-2.5 flex-1 outline-none focus:border-blue-500 transition-colors placeholder:text-white/40'
              />
              <button className='bg-blue-600 text-white text-sm px-5 py-2.5 rounded-r-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap'>
                Subscribe
              </button>
            </div>
            <p className='text-xs text-white/40 mt-3'>
              No spam, unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-left'>
          <p className='text-xs text-white/50'>
            © {new Date().getFullYear()} GyaanVerse. All rights reserved.
          </p>
          <div className='flex items-center gap-6 text-xs text-white/50'>
            <a href='#' className='hover:text-white/80 transition-colors'>Terms</a>
            <a href='#' className='hover:text-white/80 transition-colors'>Privacy</a>
            <a href='#' className='hover:text-white/80 transition-colors'>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
