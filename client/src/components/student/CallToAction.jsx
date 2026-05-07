import React from 'react'
import { useNavigate } from 'react-router-dom'

const CallToAction = () => {
  const navigate = useNavigate()

  return (
    <div className='py-20 md:px-40 px-8 text-center'>
      <h1 className='text-3xl md:text-4xl font-semibold text-gray-800'>
        Learn anything, anytime, anywhere
      </h1>
      <p className='text-sm md:text-base text-gray-500 mt-4 max-w-2xl mx-auto'>
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className='flex items-center justify-center gap-4 mt-8'>
        <button
          onClick={() => { navigate('/course-list'); scrollTo(0, 0); }}
          className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
        >
          Get started
        </button>
        <button
          onClick={() => { navigate('/course-list'); scrollTo(0, 0); }}
          className='text-gray-600 flex items-center gap-2 hover:text-gray-800 transition-colors'
        >
          Learn more
          <span className='text-lg'>→</span>
        </button>
      </div>
    </div>
  )
}

export default CallToAction
