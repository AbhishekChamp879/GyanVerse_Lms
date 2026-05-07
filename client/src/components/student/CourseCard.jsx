import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { dummyEducatorData } from '../../assets/assets';
import Rating from './Rating';

const CourseCard = ({ course }) => {
  const { currency, calculateRating, calculateNoOfLectures, calculateCourseDuration } = useContext(AppContext);

  const rating = calculateRating(course);
  const lectures = calculateNoOfLectures(course);
  const courseDuration = calculateCourseDuration(course);
  const educatorName =
    (course.educator && typeof course.educator === 'object' ? course.educator.name : 'GyaanVerse') ||
    course.educatorName ||
    dummyEducatorData.name;

  return (
    <Link
      to={'/course/' + course._id}
      onClick={() => scrollTo(0, 0)}
      className='border border-gray-500/30 rounded-lg overflow-hidden pb-3 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300'
    >
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className='w-full aspect-video object-cover'
      />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold line-clamp-2'>{course.courseTitle}</h3>
        <p className='text-sm text-gray-600 mt-1'>{course.educator.name}</p>

        <div className='flex items-center gap-1 mt-2'>
          <Rating rating={rating} />
          <p className='text-gray-500 text-sm'>
            ({course.courseRatings.length})
          </p>
        </div>

        <div className='flex items-center gap-2 mt-1'>
          <p className='text-sm text-gray-500'>{lectures} lectures</p>
          <span className='text-gray-400'>•</span>
          <p className='text-sm text-gray-500'>{courseDuration}</p>
        </div>

        <div className='flex items-center gap-2 mt-2'>
          <p className='text-base font-semibold text-gray-800'>
            {currency}{(course.coursePrice - (course.discount * course.coursePrice / 100)).toFixed(2)}
          </p>
          {course.discount > 0 && (
            <p className='text-gray-500 line-through text-sm'>
              {currency}{course.coursePrice}
            </p>
          )}
          {course.discount > 0 && (
            <span className='text-sm text-green-600'>{course.discount}% off</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
