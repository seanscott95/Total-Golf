import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ScoreCard from '../components/ScoreCard/ScoreCard';
import ScorecardCard from '../components/ScorecardCard/ScorecardCard';
import { getAllPersonal, resetPersonal } from '../utils/personal/personalSlice';
import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';

function Personal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { personal, isLoading, isError, message } = useSelector((state) => state.personal);
  const { scores, scoresIsLoading, scoresIsError, scoresMessage } = useSelector((state) => state.scores);

  // Filters the scores array and returns all objects if the user is on the scorecard
  const filteredScores = scores.filter(obj => {
    return obj.score.some(item => item.username === user.username);
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    };

    if (isError) {
      console.log(`Error: ${message}`);
    };

    if (user) {
      dispatch(getAllPersonal(user.username));
    };

    return () => {
      dispatch(resetPersonal());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    };

    if (scoresIsError) {
      console.log(`Error: ${scoresMessage}`);
    };

    if (user) {
      dispatch(getAllScorecards());
    };

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, scoresIsError, scoresMessage, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>Personal Scores</h1>
        <p>Welcome {user && user.username} !</p>
      </section>

      {isLoading ? (
        <img src={spinner} alt='Loading' />
      ) : (
        <>
          <section className='content'>
            <div className='section-heading'>
              <h3>ALL</h3>
              <p>Below are all of your previous scores</p>
            </div>

            {personal.length > 0 ? (
              <div className='scores'>
                {personal.map((item) => (
                  <ScoreCard key={item._id} score={item} />
                )).reverse()}
              </div>
            ) : (
              <h3>You have no scores!</h3>
            )}
          </section>
        </>
      )}

      {scoresIsLoading ? (
        <img src={spinner} alt='Loading' />
      ) : (
        <>
          <section className='content'>
            <div className='section-heading'>
              <h3>ALL GAMES</h3>
              <p>Here are all the games you've be in</p>
            </div>

            {filteredScores.length > 0 ? (
              <div className='scores'>
                {filteredScores.map((item) => (
                  <ScorecardCard key={item._id} scorecard={item} />
                )).reverse()}
              </div>
            ) : (
              <h3>You have no scores!</h3>
            )}
          </section>

          <section className='content'>
            <div className='section-heading'>
              <h3>BEST AND BLURST</h3>
              <p>Lets see your best and worst scores</p>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Personal