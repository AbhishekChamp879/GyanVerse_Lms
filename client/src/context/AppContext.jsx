import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import axios from 'axios';
import { toast } from "react-toastify";
import { getToken, useAuth, useUser } from "@clerk/react";


export const AppContext = createContext();



export const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const currency = import.meta.env.VITE_CURRENCY || '$';
    const navigate = useNavigate();
    const{getToken} = useAuth;
    const{user} = useUser();

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [UserData, setUserData] = useState([null]);


    // Fetch all courses
    const fetchAllCourses = async () => {
        try{
            const {data} = await axios.get(backendurl + '/api/course/all');
            if(data.success){
                setAllCourses(data.course)
            }
            else{
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(data.message);
        }
        
    };

    // Fetch user data
    const fetchUserData = async()=>{

        if(user.publicMetadata.role === 'educator'){
            setIsEducator(true);
        }

        try{
            const token = await getToken();
            const {data} = await axios.get(backendurl + '/api/user/data', {headers: {Authorization: `Bearer ${token}`}});

            if(data.success){
                setUserData(data.user);
            }else {
                toast.error(data.message);
            }
        }

        catch{
            toast.error(data.message);
        }
    };

    // Function to calculate average rating of a course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
        return Math.floor(totalRating / course.courseRatings.length);
    };

    //Function to calculate Course Chapter time
    const calcluateChapterTime = (chapter)=> {
        let time = 0;
        chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
    }

    //Function to calculate Course total time
    const calculateCourseDuration = (course)=> {
        let time = 0
        course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration))
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})

    }

    //Function calculate to No of lectures in the course
    const calculateNoOfLectures = (course)=> {
        let totalLectures = 0;
        course.courseContent.map((chapter)=> {
            if(Array.isArray(chapter.chapterContent)){
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }


    // Fetch user enrolled courses
    const fetchUserEnrolledCourses = async () => {
        try{

            const token = await getToken();
            const {data} = await axios.get(backendurl + '/api/user/enrolled-courses', {headers: {Authorization: `Bearer ${token}`}})

            if(data.success){
            setEnrolledCourses(data.enrolledCourses.reverse())
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            toast.error(data.message);
        }
    };

    // Add or update current user's rating on a course.
    const submitCourseRating = (courseId, rating, userId = currentUserId) => {
        const normalizedRating = Math.max(1, Math.min(5, Number(rating)));
        if (!courseId || Number.isNaN(normalizedRating)) return;

        const updateCourseRating = (course) => {
            if (course._id !== courseId) return course;

            const existingIndex = course.courseRatings.findIndex((item) => item.userId === userId);
            const updatedRatings = [...course.courseRatings];

            if (existingIndex >= 0) {
                updatedRatings[existingIndex] = {
                    ...updatedRatings[existingIndex],
                    rating: normalizedRating,
                };
            } else {
                updatedRatings.push({
                    userId,
                    rating: normalizedRating,
                    _id: `rating_${Date.now()}`,
                });
            }

            return {
                ...course,
                courseRatings: updatedRatings,
            };
        };

        setAllCourses((prev) => prev.map(updateCourseRating));
        setEnrolledCourses((prev) => prev.map(updateCourseRating));
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    useEffect(() => {
        if(user){
            fetchUserData()
            fetchUserEnrolledCourses()
        }
    }, [user]);

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator, setIsEducator,
        calculateNoOfLectures,
        calculateCourseDuration,
        calcluateChapterTime,
        enrolledCourses,
        fetchUserEnrolledCourses,
        backendurl, UserData, setUserData, getToken, fetchAllCourses
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
