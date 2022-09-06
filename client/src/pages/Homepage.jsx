import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ScorecardCard from '../components/ScorecardCard/ScorecardCard';
import ScorecardForm from '../components/ScorecardForm/ScorecardForm';
import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { scores, isLoading, isError, message } = useSelector((state) => state.scores);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    };

    if (isError) {
      console.log(`Error: ${message}`);
    };

    if (user) {
      dispatch(getAllScorecards());
    };

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>Scorecard Dashboard</h1>
        <p>Welcome {user && user.username} !</p>
      </section>

      <ScorecardForm />
      {isLoading ? (
        <img src={spinner} alt='Loading' />
      ) : (
        <section className='content'>
          {scores.length > 0 ? (
            <div className='scores'>
              {scores.map((item) => (
                <ScorecardCard key={item._id} scorecard={item} />
              ))}
            </div>
          ) : (
            <h3>There are no scorecards!</h3>
          )}
        </section>
      )}
    </>
  )
}

export default Homepage