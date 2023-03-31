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

// Delete scorecards
const deleteScorecard = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };

        const response = await axios.delete(API_URL + id, config);
        return response.data;
    } catch (error) {
        return error.message;
    };
};

// Create scorecard
const updateScorecard = async (scorecardData, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        const id = scorecardData.formData.id;
        const response = await axios.put(`${API_URL}${id}`, scorecardData.formData, config);
        return response.data;
    } catch (error) {
        return error.message;
    };
};

const scorecardService = {
    createScorecard,
    getAllScorecards,
    deleteScorecard,
    updateScorecard,
};

export default scorecardService;