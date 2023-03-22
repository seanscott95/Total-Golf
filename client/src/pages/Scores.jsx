import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ScorecardCard from '../components/ScorecardCard/ScorecardCard';
import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';

function Scores() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { scores, isLoading, isError, message } = useSelector((state) => state.scores);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    };

    if (isError) {
      console.log(`Error: ${message}`);
    };

    if (user) {
      dispatch(getAllScorecards());
    };

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div className="page-container">
      {isLoading ? (
        <img src={spinner} alt='Loading' />
      ) : (
        <section className='content'>
          {scores.length > 0 ? (
            <div className='scores'>
              {scores.map((item) => (
                <ScorecardCard key={item._id} scorecard={item} />
              )).reverse()}
            </div>
          ) : (
            <h3>There are no scorecards!</h3>
          )}
        </section>
      )}
    </div>
  )
}

export default Scores