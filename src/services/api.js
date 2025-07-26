import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // وقت انتظار 10 ثواني
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// [Rehab]:- Add request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // إضافة الـ token فقط إذا كان موجوداً وليس طلب للكورسات
        if (token && !config.url.includes('/courses/')) {
            config.headers.Authorization = `Token ${token}`;
        }
        console.log('Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// [Rehab]:- Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('Response error:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            data: error.response?.data,
            message: error.message
        });
        
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export const fetchCourses = async () => {
    try {
        console.log('Fetching courses...');
        const response = await api.get('/courses/');
        console.log('Courses fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', {
            message: error.message,
            url: error.config?.url,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        
        if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
            throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من تشغيل الباك إند.');
        }
        
        if (error.response?.status === 400) {
            throw new Error(`خطأ في البيانات: ${JSON.stringify(error.response.data)}`);
        }
        
        throw error;
    }
};

export const fetchCourseDetails = async (id) => {
    try {
        console.log('Fetching course details for ID:', id);
        const response = await api.get(`/courses/${id}/`);
        console.log('Course details fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching course details:', {
            message: error.message,
            url: error.config?.url,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        
        if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
            throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من تشغيل الباك إند.');
        }
        
        if (error.response?.status === 400) {
            throw new Error(`خطأ في البيانات: ${JSON.stringify(error.response.data)}`);
        }
        
        throw error;
    }
};

// [Rehab]:- Authentication API functions
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/accounts/login/', credentials);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/accounts/register/', userData);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await api.post('/accounts/users/logout/');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Logout error:', error);
        // Remove token anyway
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};