import axios from 'axios';

const API_URL = '/api/users/';

// Signup user
const signup = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    };

    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    signup,
    logout,
};

export default authService