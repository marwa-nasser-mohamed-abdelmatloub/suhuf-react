import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000, // وقت انتظار 5 ثواني
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const fetchCourses = async () => {
    try {
        const response = await api.get('/courses/');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', {
            message: error.message,
            url: error.config.url,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
};

export const fetchCourseDetails = async (id) => {
    try {
        const response = await api.get(`/courses/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course details:', {
            message: error.message,
            url: error.config.url,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
};