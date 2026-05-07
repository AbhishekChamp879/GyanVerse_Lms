import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Rating from '../../components/student/Rating'

const Player = () => {

  const { enrolledCourses, calcluateChapterTime, calculateRating, currentUserId, submitCourseRating } = useContext(AppContext)

  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({ 0: true })
  const [playerData, setPlayerData] = useState(null)
  const [completedLectures, setCompletedLectures] = useState({})
  const [userRating, setUserRating] = useState(0)

  const getCourseData = () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course)

        const firstChapter = course.courseContent?.[0]
        const firstLecture = firstChapter?.chapterContent?.[0]

        const playerLectureExistsInCourse = course.courseContent?.some((chapter) =>
          chapter.chapterContent?.some((lecture) => lecture.lectureId === playerData?.lectureId)
        )

        if (firstLecture && !playerLectureExistsInCourse) {
          setPlayerData({
            ...firstLecture,
            chapter: 1,
            lecture: 1,
          })
        }
      }
    })
  }

  const toggleSection = (index) => {
    setOpenSections((prev) => (
      {
        ...prev,
        [index]: !prev[index],
      }
    ))
  }

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
    return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null
  }

  const isSelectedLecture = (lectureId) => playerData?.lectureId === lectureId
  const isLectureCompleted = (lectureId) => Boolean(completedLectures[lectureId])

  const markLectureComplete = () => {
    if (!playerData?.lectureId) return
    setCompletedLectures((prev) => ({
      ...prev,
      [playerData.lectureId]: true,
    }))
  }

  const handleUserRating = (value) => {
    if (!courseData?._id) return
    setUserRating(value)
    submitCourseRating(courseData._id, value, currentUserId)
  }

  useEffect(() => {
    getCourseData()
  }, [enrolledCourses, courseId])

  useEffect(() => {
    if (!courseData?.courseRatings) {
      setUserRating(0)
      return
    }

    const existingUserRating = courseData.courseRatings.find((item) => item.userId === currentUserId)
    setUserRating(existingUserRating?.rating || 0)
  }, [courseData, currentUserId])

  const selectedVideoUrl = getYoutubeEmbedUrl(playerData?.lectureUrl)
  const courseRating = courseData ? calculateRating(courseData) : 0

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1180px] mx-auto items-start'>
        <div className='lg:col-span-5 order-2 lg:order-1'>
          <h2 className='text-base sm:text-lg font-semibold text-gray-800'>Course Structure</h2>
          <div className='pt-4'>
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={chapter.chapterId || index} className='border border-gray-300 bg-white mb-3 rounded-sm overflow-hidden'>
                <div className='flex items-center justify-between px-3 sm:px-4 py-2.5 cursor-pointer select-none bg-white' onClick={() => toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img
                      className={`w-2.5 transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      src={assets.down_arrow_icon}
                      alt='toggle chapter'
                    />
                    <p className='font-medium text-xs sm:text-sm text-gray-900'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-[11px] sm:text-xs text-gray-600'>
                    {chapter.chapterContent.length} lectures - {calcluateChapterTime(chapter)}
                  </p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                  <ul className='px-3 sm:px-4 py-2 text-gray-700 border-t border-gray-200'>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={lecture.lectureId || i} className='py-1.5'>
                        <div className='flex items-start justify-between gap-3'>
                          <div className='flex items-start gap-2 min-w-0'>
                            <img
                              src={isLectureCompleted(lecture.lectureId) ? assets.blue_tick_icon : assets.play_icon}
                              alt='lecture status'
                              className='mt-0.5 w-3.5 h-3.5 shrink-0'
                            />
                            <p className='text-[12px] sm:text-xs text-gray-800 truncate'>{lecture.lectureTitle}</p>
                          </div>
                          <div className='flex items-center gap-2 shrink-0 text-[11px] sm:text-xs'>
                            {lecture.lectureUrl && (
                              <button
                                onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })}
                                className={`cursor-pointer ${isSelectedLecture(lecture.lectureId) ? 'text-blue-700 font-medium' : 'text-blue-500'}`}
                              >
                                Watch
                              </button>
                            )}
                            <p className='text-gray-600 min-w-16 text-right'>
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <Rating
              rating={userRating}
              interactive
              onRate={handleUserRating}
              size='w-4 h-4'
              label='Rate this Course:'
              className='mt-7'
            />
          </div>
        </div>

        <div className='lg:col-span-7 order-1 lg:order-2'>
          <div className='rounded-sm overflow-hidden border border-gray-300 bg-black'>
            {selectedVideoUrl ? (
              <iframe
                className='w-full aspect-video'
                src={selectedVideoUrl}
                title={playerData?.lectureTitle || 'course player'}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              />
            ) : (
              <img
                src={courseData ? courseData.courseThumbnail : ''}
                alt={courseData?.courseTitle || 'course thumbnail'}
                className='w-full aspect-video object-cover'
              />
            )}
          </div>

          <div className='mt-1.5 px-0.5 flex items-center justify-between gap-3'>
            <p className='text-xs text-gray-700 truncate'>
              {playerData
                ? `${playerData.chapter}.${playerData.lecture} ${playerData.lectureTitle}`
                : (courseData?.courseTitle || 'Select a lecture to start')}
            </p>
            {playerData && (
              <button
                onClick={markLectureComplete}
                className={`text-xs whitespace-nowrap ${isLectureCompleted(playerData.lectureId) ? 'text-green-600 font-medium' : 'text-blue-500'}`}
              >
                {isLectureCompleted(playerData.lectureId) ? 'Completed' : 'Mark Complete'}
              </button>
            )}
          </div>

          <div className='mt-2 px-0.5 flex items-center gap-2'>
            <Rating
              rating={courseRating}
              showValue
              ratingCount={courseData?.courseRatings?.length || 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
