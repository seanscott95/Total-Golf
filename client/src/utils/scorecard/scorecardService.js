import axios from 'axios';

const API_URL = '/api/scores/';

// Create scorecard
const createScorecard = async (scorecardData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    const response = await axios.post(API_URL, scorecardData, config);

    return response.data;
};

// Get ALL scorecards
const getAllScorecards = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    const response = await axios.get(API_URL, config);
    console.log(response.data);
    return response.data.scores;
};

const scorecardService = {
    createScorecard,
    getAllScorecards,
};

export default scorecardService;