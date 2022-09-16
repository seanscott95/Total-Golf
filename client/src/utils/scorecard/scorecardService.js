import axios from 'axios';

const API_URL = '/api/scores/';

// Create scorecard
const createScorecard = async (scorecardData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
    
        const response = await axios.post(API_URL, scorecardData.formData, config);
        return response.data;
    } catch (error) {
        return error.message;
    };
};

// Get ALL scorecards
const getAllScorecards = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
    
        const response = await axios.get(API_URL, config);
        return [...response.data];
    } catch (error) {
        return error.message;
    };
};

const scorecardService = {
    createScorecard,
    getAllScorecards,
};

export default scorecardService;