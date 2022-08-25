import axios from 'axios';

const API_URL = '/api/scores/';

const createScorecard = async (scorecardData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    const response = await axios.post(API_URL, scorecardData, config);

    return response.data;
};

const scorecardService = {
    createScorecard,
};

export default scorecardService;