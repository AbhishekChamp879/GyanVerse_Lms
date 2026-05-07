import React from 'react'
import { dummyTestimonial } from '../../assets/assets'
import Rating from './Rating'

const TestimonialSection = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 max-w-2xl mx-auto'>
        Hear from our learners as they share their journeys of transformation, success, and how our<br/> platform made a difference in their lives.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14'>
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className='text-left border border-gray-500/30 rounded-lg p-6 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300'>
            <div className='flex items-center gap-4 mb-4'>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className='w-12 h-12 rounded-full object-cover'
              />
              <div>
                <h4 className='font-semibold text-gray-800'>{testimonial.name}</h4>
                <p className='text-gray-500 text-sm'>{testimonial.role}</p>
              </div>
            </div>
            <Rating rating={testimonial.rating} />
            <p className='text-gray-500 mt-4 text-sm leading-relaxed'>
              {testimonial.feedback}
            </p>
            <a href='#' className='text-blue-600 text-sm mt-4 inline-block hover:underline'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
