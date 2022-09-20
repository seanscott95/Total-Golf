import axios from 'axios';

const API_URL = '/api/personal/';

// Get ALL users scores
const getAllPersonal = async (name, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };

        const response = await axios.get(API_URL + name, config);
        return response.data;
    } catch (error) {
        return error.message;
    };
};

const personalService = {
    getAllPersonal,
};

export default personalService;