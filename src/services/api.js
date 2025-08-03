import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Token ${localStorage.getItem('authToken')}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// دوال الكورسات
export const fetchCourses = async (search = '', level = '') => {
    try {
        const response = await api.get('/courses/', {
            params: { search, level }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
            throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الشبكة.');
        }
        throw error;
    }
};

export const fetchCourseDetails = async (id) => {
    try {
        const response = await api.get(`/courses/${id}/`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error('الدورة غير موجودة');
        }
        throw error;
    }
};

export const createCourse = async (courseData) => {
    try {
        const response = await api.post('/courses/', courseData);
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            throw new Error('بيانات الكورس غير صالحة');
        }
        throw error;
    }
};

export const updateCourse = async (id, courseData) => {
    try {
        const response = await api.put(`/courses/${id}/`, courseData);
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            throw new Error('بيانات الكورس غير صالحة');
        }
        throw error;
    }
};

export const deleteCourse = async (id) => {
    try {
        await api.delete(`/courses/${id}/`);
    } catch (error) {
        throw error;
    }
};

// دوال المستخدمين
export const fetchUsers = async (search = '', userType = '') => {
    try {
        const response = await api.get('/accounts/users/', {
            params: { search, user_type: userType }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
            throw new Error('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الشبكة.');
        }
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await api.post('/accounts/users/', userData);
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            throw new Error('بيانات المستخدم غير صالحة');
        }
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/accounts/users/${id}/`, userData);
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            throw new Error('بيانات المستخدم غير صالحة');
        }
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await api.delete(`/accounts/users/${id}/`);
    } catch (error) {
        throw error;
    }
};

// دوال المصادقة
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/accounts/login/', credentials);
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            throw new Error('بيانات الدخول غير صحيحة');
        }
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/accounts/register/', userData);
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            const errorData = error.response.data;
            throw new Error(
                errorData.username?.[0] ||
                errorData.email?.[0] ||
                'بيانات التسجيل غير صالحة'
            );
        }
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await api.post('/accounts/logout/');
    } finally {
        localStorage.removeItem('authToken');
    }
};