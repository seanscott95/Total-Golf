import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';

const LeaderBoard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state => state.auth));
    const { scores, isLoading, isError, message } = useSelector((state) => state.scores);

    useEffect(() => {
        if(!user) {
            navigate('/signin');
        };
        if(isError) {
            console.log(`Error ${message}`);
        };
        if(user) {
            dispatch(getAllScorecards());
        };

        return () => {
            dispatch(reset);
        };
    }, [user, navigate, dispatch, isError, message]);

  return (
    <div className="page-container">
        Leaderboard
    </div>
  )
}

export default LeaderBoard;