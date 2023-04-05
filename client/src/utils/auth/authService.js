import axios from 'axios';

const API_URL = '/api/users/';

// Signup user
const signup = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        // Removes user from local storage in 2 hours, same time as jwt expiry
        setTimeout(() => {
            localStorage.removeItem('user');
            window.location.reload();
        }, 7199999);
        
        // Adds an expiry to the data
        const now = new Date();
        response.data.expiry = now.getTime() + 7199999
        
        localStorage.setItem('user', JSON.stringify(response.data));
    };

    return response.data;
};

// Logout user
const logout = () => {
    console.log("authService, logout")
    localStorage.removeItem('user');
};

// Signin user
const signin = async (userData) => {
    const response = await axios.post(API_URL + 'signin', userData);

    if (response.data) {
        // Removes user from local storage in 2 hours, same time as jwt expiry
        setTimeout(() => {
            localStorage.removeItem('user');
            window.location.reload();
        }, 7199999);
        
        // Adds an expiry to the data
        const now = new Date();
        response.data.expiry = now.getTime() + 7199999

        localStorage.setItem('user', JSON.stringify(response.data));
    };



    return response.data;
};

const authService = {
    signup,
    logout,
    signin
};

export default authService