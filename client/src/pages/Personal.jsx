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

  // Filters all scorecards and returns whole scorecard if the user is on it
  const usersScorecards = scores.filter(obj => {
    return obj.score.some(item => item.username === user.username);
  });

  // Sorts an array of scores by the total property (lower is better in golf)
  const orderScores = arr => arr.sort((a, b) => a.total - b.total);
  
  // Creates variable that contains only the first nine hole games
  const firstNineHoleGames = usersScorecards.filter(obj => {
    return obj.numberOfHoles === "1-9";
  });

  // Creates variable that contains only the last nine hole games
  const lastNineHoleGames = usersScorecards.filter(obj => {
    return obj.numberOfHoles === "10-18";
  });

  // Creates variable that contains only the one to eighteen hole games
  const bothNineHoleGames = usersScorecards.filter(obj => {
    return obj.numberOfHoles === "1-18";
  });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
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
      navigate('/signin');
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
        <h1>{user && user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s Scores</h1>
      </section>

      <section className="content">
        <div className="section-heading">
          <h3>QUEENS PARK</h3>
        </div>
      </section>

      <section className="content">
        <div className="section-heading">
          <div>
            <h3 className="section-heading">1-18</h3>
            <p>Played: {bothNineHoleGames.length > 0 ? bothNineHoleGames.length : 'N/A'}</p>
          </div>
          <div>
            <h3 className="section-heading">1-9</h3>
            <p>Played: {firstNineHoleGames.length > 0 ? firstNineHoleGames.length : 'N/A'}</p>
          </div>
          <div>
            <h3 className="section-heading">10-18</h3>
            <p>Played: {lastNineHoleGames.length > 0 ? lastNineHoleGames.length : 'N/A'}</p>
          </div>
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

            {orderScores([...personal]).length > 0 ? (
              <div className='scores'>
                {orderScores([...personal]).map((item) => (
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

            {usersScorecards.length > 0 ? (
              <div className='scores'>
                {usersScorecards.map((item) => (
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