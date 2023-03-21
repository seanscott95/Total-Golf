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
  
  // Sorts an array of scores by the total property (lower is better in golf)
  const orderScores = arr => arr.sort((a, b) => a.total - b.total);
  
  // Filters all scorecards and returns whole scorecard if the user is on it
  const usersScorecards = scores.filter(obj => {
    return obj.score.some(item => item.username === user.username);
  });


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

  // Creates new array of only the scores on the scorecard that belong to the user
  const getUsersScores = (scores) => scores.map(
    el => el.score.filter(item => item.username === user.username)
  ).flat().sort((a, b) => a.total - b.total); // Orders from low to high

  // Finds the average of the users scorecard totals
  const findTotalAvg = (arr) => {
    // Narrows the scorecard to just the scores that are the users
    const scoreArr = getUsersScores(arr);
    const { length } = scoreArr;
    // Creates array of totals for each scorecard
    let arrTotal = scoreArr.map(item => item.total);
    // Reduces array of totals to a single average value
    return arrTotal.reduce((acc, val) => {
      let avg = acc + (val / length);
      return +avg.toFixed(2);   // Converts avg to a string and to two deciaml places
    }, 0);
  };

  // Filters through array of scores and returns all courseNames for Queens Park
  const findQPGames = (arr) => {
    return arr.filter((obj) => {
      return obj.courseName === "Queens Park";
    });
  };

  // Creates new variables for the Queens Park games
  const firstNineHoleGamesQP = findQPGames(firstNineHoleGames);
  const lastNineHoleGamesQP = findQPGames(lastNineHoleGames);
  const bothNineHoleGamesQP = findQPGames(bothNineHoleGames);

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

      <section className="content stats-section">
        <div>
          <h3>1-18</h3>
          <p>Played: {bothNineHoleGamesQP.length > 0 ? bothNineHoleGamesQP.length : 'N/A'}</p>
          <p>Best: {bothNineHoleGamesQP.length > 0 ? getUsersScores(bothNineHoleGamesQP)[0].total : 'N/A'}</p>
          <p>Average: {findTotalAvg(bothNineHoleGamesQP) || 'N/A'}</p>
          <p>Worst: {bothNineHoleGamesQP.length > 0 ? getUsersScores(bothNineHoleGamesQP).reverse()[0].total : 'N/A'}</p>
        </div>
        <div>
          <h3>1-9</h3>
          <p>Played: {firstNineHoleGamesQP.length > 0 ? firstNineHoleGamesQP.length : 'N/A'}</p>
          <p>Best: {firstNineHoleGamesQP.length > 0 ? getUsersScores(firstNineHoleGamesQP)[0].total : 'N/A'}</p>
          <p>Average: {findTotalAvg(firstNineHoleGamesQP) || 'N/A'}</p>
          <p>Worst: {firstNineHoleGamesQP.length > 0 ? getUsersScores(firstNineHoleGamesQP).reverse()[0].total : 'N/A'}</p>
        </div>
        <div>
          <h3>10-18</h3>
          <p>Played: {lastNineHoleGamesQP.length > 0 ? lastNineHoleGamesQP.length : 'N/A'}</p>
          <p>Best: {lastNineHoleGamesQP.length > 0 ? getUsersScores(lastNineHoleGamesQP)[0].total : 'N/A'}</p>
          <p>Average: {findTotalAvg(lastNineHoleGamesQP) || 'N/A'}</p>
          <p>Worst: {lastNineHoleGamesQP.length > 0 ? getUsersScores(lastNineHoleGamesQP).reverse()[0].total : 'N/A'}</p>
        </div>
      </section>

      {isLoading ? (
        <img src={spinner} alt='Loading' />
      ) : (
        <>
          <section className='content'>
            <div className='section-heading centered-heading'>
              <h3>1-18</h3>
              <p>Below are all of your 1-18 hole games for Queens Park</p>
            </div>

            {bothNineHoleGamesQP.length > 0 ? (
              <div className='scores'>
                {getUsersScores(bothNineHoleGamesQP).map((item) => (
                  <ScoreCard key={item._id} score={item} />
                ))}
              </div>
            ) : (<h3>You have no scores!</h3>)}
          </section>

          <section className='content'>
            <div className='section-heading centered-heading'>
              <h3>1-9</h3>
              <p>Below are all of your 1-9 hole games for Queens Park</p>
            </div>

            {firstNineHoleGamesQP.length > 0 ? (
              <div className='scores'>
                {getUsersScores(firstNineHoleGamesQP).map((item) => (
                  <ScoreCard key={item._id} score={item} />
                ))}
              </div>
            ) : (<h3>You have no scores!</h3>)}
          </section>

          <section className='content'>
            <div className='section-heading centered-heading'>
              <h3>10-18</h3>
              <p>Below are all of your 10-18 hole games for Queens Park</p>
            </div>

            {lastNineHoleGamesQP.length > 0 ? (
              <div className='scores'>
                {getUsersScores(lastNineHoleGamesQP).map((item) => (
                  <ScoreCard key={item._id} score={item} />
                ))}
              </div>
            ) : (<h3>You have no scores!</h3>)}
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
              <p>Here are all the games you're in</p>
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
  );
};

export default Personal;