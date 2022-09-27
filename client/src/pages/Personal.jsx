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

  // Sorts the personal scores array by the total (lower is better in golf)
  const orderedPersonalScores = [...personal].sort((a, b) => a.total - b.total);

  // Creates an average score for the personal totals by getting the sum then dividing by the length
  const personalAverage = (arr) => {
    let sum = 0;
    arr.forEach((item) => {
      sum += item.total;
    });
    return sum / arr.length;
  };


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

      <section className='content'>
        <div className='section-heading'>
          <h3>STATS</h3>
          <p>Played: {personal.length > 0 ? personal.length : 'N/A'}</p>
          <p>Best: {orderedPersonalScores.length > 0 ? orderedPersonalScores[0].total : 'N/A'}</p>
          <p>Average: {personalAverage(personal) || 'N/A'}</p>
          <p>Worst: {orderedPersonalScores.length > 0 ? [...orderedPersonalScores].reverse()[0].total : 'N/A'}</p>
        </div>
      </section>

      {isLoading ? (
        <img src={spinner} alt='Loading' />
      ) : (
        <>
          <section className='content'>
            <div className='section-heading'>
              <h3>ALL</h3>
              <p>Below are all of your previous scores from best to worst</p>
            </div>

            {orderedPersonalScores.length > 0 ? (
              <div className='scores'>
                {orderedPersonalScores.map((item) => (
                  <ScoreCard key={item._id} score={item} />
                ))}
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
        </>
      )}
    </>
  )
}

export default Personal