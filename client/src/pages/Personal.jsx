import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ScoreCard from '../components/ScoreCard/ScoreCard';
import ScorecardCard from '../components/ScorecardCard/ScorecardCard';
import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';
import { getUserCheckExpiry } from '../utils/helper/getUserCheckExpiry';

const Personal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { scores, scoresIsLoading, scoresIsError, scoresMessage } = useSelector((state) => state.scores);

  // Filters all scorecards and returns whole scorecard if the user is on it
  const usersScorecards = scores.filter(obj => {
    return obj.score.some(item => item.username === user.username);
  });

  // Sorts the array depending on how many holes
  const sortHoles = (arr, str) => {
    return arr.filter(obj => {
      return obj.numberOfHoles === str;
    });
  };

  // Creates new variables and groups all the scores depending on holes played
  const firstNineHoleGames = sortHoles(scores, '1-9');
  const lastNineHoleGames = sortHoles(scores, '10-18');
  const bothNineHoleGames = sortHoles(scores, '1-18');

  // Filters through array of scores and returns all courseNames for the Local Course
  const findQPGames = (arr) => {
    return arr.filter((obj) => {
      return obj.courseName === process.env.REACT_APP_LOCAL_COURSE;
    });
  };

  // Creates new variables for the Local Course games
  const firstNineHoleGamesQP = findQPGames(firstNineHoleGames);
  const lastNineHoleGamesQP = findQPGames(lastNineHoleGames);
  const bothNineHoleGamesQP = findQPGames(bothNineHoleGames);

  // Creates new array of only the scores on the scorecard that belong to the user
  const getUsersScores = (scores) => scores.map(
    el => el.score.filter(item => item.username === user.username)
  ).flat().sort((a, b) => a.total - b.total); // Orders from low to high

  const usersScoresFirstNineQP = getUsersScores(firstNineHoleGamesQP);
  const usersScoresLastNineQP = getUsersScores(lastNineHoleGamesQP);
  const usersScoresBothNineQP = getUsersScores(bothNineHoleGamesQP);

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
      return +avg.toFixed(1);   // Converts avg to a string and to two deciaml places
    }, 0);
  };

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    };

    if (scoresIsError) {
      console.log(`Error: ${scoresMessage}`);
    };

    const isValid = getUserCheckExpiry(user);
    if (!isValid) {
      localStorage.removeItem('user');
      window.location.reload();
    };
    if (user) {
      dispatch(getAllScorecards());
    };

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, scoresIsError, scoresMessage, dispatch]);

  return (
    <div className='page-container'>
      <section className='content'>
        <div className='border-background-img'>
          <h1>{user && user.username.toUpperCase()}</h1>
          <span></span>
        </div>
      </section>

      <section className='content stats-section'>
        <div className='heading '>
          <h2>{process.env.REACT_APP_LOCAL_COURSE}</h2>
        </div>
        <div className='styledStatsCard'>
          <h4>1-18</h4>
          <div>
            <p>Played:</p>
            <p>{usersScoresBothNineQP.length > 0 ? usersScoresBothNineQP.length : 'N/A'}</p>
          </div>
          <div>
            <p>Best:</p>
            <p>{usersScoresBothNineQP.length > 0 ? usersScoresBothNineQP[0].total : 'N/A'}</p>
          </div>
          <div>
            <p>Avg:</p>
            <p>{findTotalAvg(bothNineHoleGamesQP) || 'N/A'}</p>
          </div>
          <div>
            <p>Worst:</p>
            <p>{usersScoresBothNineQP.length > 0 ? usersScoresBothNineQP[usersScoresBothNineQP.length - 1].total : 'N/A'}</p>
          </div>
        </div>
        <div className='styledStatsCard'>
          <h4 className='heading'>1-9</h4>
          <div>
            <p>Played:</p>
            <p>{usersScoresFirstNineQP.length > 0 ? usersScoresFirstNineQP.length : 'N/A'}</p>
          </div>
          <div>
            <p>Best:</p>
            <p>{usersScoresFirstNineQP.length > 0 ? usersScoresFirstNineQP[0].total : 'N/A'}</p>
          </div>
          <div>
            <p>Avg:</p>
            <p>{findTotalAvg(firstNineHoleGamesQP) || 'N/A'}</p>
          </div>
          <div>
            <p>Worst:</p>
            <p>{usersScoresFirstNineQP.length > 0 ? usersScoresFirstNineQP[usersScoresFirstNineQP.length - 1].total : 'N/A'}</p>
          </div>
        </div>
        <div className='styledStatsCard'>
          <h4 className='heading'>10-18</h4>
          <div>
            <p>Played:</p>
            <p>{usersScoresLastNineQP.length > 0 ? usersScoresLastNineQP.length : 'N/A'}</p>
          </div>
          <div>
            <p>Best:</p>
            <p>{usersScoresLastNineQP.length > 0 ? usersScoresLastNineQP[0].total : 'N/A'}</p>
          </div>
          <div>
            <p>Avg:</p>
            <p>{findTotalAvg(lastNineHoleGamesQP) || 'N/A'}</p>
          </div>
          <div>
            <p>Worst: </p>
            <p>{usersScoresLastNineQP.length > 0 ? usersScoresLastNineQP[usersScoresLastNineQP.length - 1].total : 'N/A'}</p>
          </div>
        </div>
      </section>

      {scoresIsLoading ? (
        <img src={spinner} alt='Loading' className='spinner' />
      ) : (
        <>
          <section className='content'>
            <div className='section-heading centered-heading'>
              <h3>1-18</h3>
              <p>Below are all of your 1-18 hole games for {process.env.REACT_APP_LOCAL_COURSE}</p>
            </div>

            {bothNineHoleGamesQP.length > 0 ? (
              <div className='position-medals'>
                <div className='scores'>
                  {getUsersScores(bothNineHoleGamesQP).map((item) => (
                    <ScoreCard key={item._id} score={item} />
                  ))}
                </div>
              </div>
            ) : (<h3>You have no scores!</h3>)}
          </section>

          <section className='content'>
            <div className='section-heading centered-heading'>
              <h3>1-9</h3>
              <p>Below are all of your 1-9 hole games for {process.env.REACT_APP_LOCAL_COURSE}</p>
            </div>

            {firstNineHoleGamesQP.length > 0 ? (
              <div className='position-medals'>

                <div className='scores'>
                  {getUsersScores(firstNineHoleGamesQP).map((item) => (
                    <ScoreCard key={item._id} score={item} />
                  ))}
                </div>
              </div>
            ) : (<h3>You have no scores!</h3>)}
          </section>

          <section className='content'>
            <div className='section-heading centered-heading'>
              <h3>10-18</h3>
              <p>Below are all of your 10-18 hole games for {process.env.REACT_APP_LOCAL_COURSE}</p>
            </div>

            {lastNineHoleGamesQP.length > 0 ? (
              <div className='position-medals'>
                <div className='scores'>
                  {getUsersScores(lastNineHoleGamesQP).map((item) => (
                    <ScoreCard key={item._id} score={item} />
                  ))}
                </div>
              </div>
            ) : (<h3>You have no scores!</h3>)}
          </section>
        </>
      )}

      {scoresIsLoading ? (
        <img src={spinner} alt='Loading' className='spinner' />
      ) : (
        <>
          <section className='content'>
            <div className='section-heading '>
              <h2>{user && user.username.toUpperCase()}'S GAMES</h2>
            </div>

            {usersScorecards.length > 0 ? (
              <div className='scores'>
                {usersScorecards.map((item) => (
                  <ScorecardCard key={item._id} scorecard={item} />
                ))}
              </div>
            ) : (
              <h3>You have no scores!</h3>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Personal;