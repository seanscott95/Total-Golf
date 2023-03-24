import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ScoreCard from '../components/ScoreCard/ScoreCard';
import ScorecardCard from '../components/ScorecardCard/ScorecardCard';
import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';

function Personal() {
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
  const firstNineHoleGames = sortHoles(scores, "1-9");
  const lastNineHoleGames = sortHoles(scores, "10-18");
  const bothNineHoleGames = sortHoles(scores, "1-18");

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
      return +avg.toFixed(2);   // Converts avg to a string and to two deciaml places
    }, 0);
  };

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
    <div className="page-container">
      <section className="content">
        <div className="heading centered-heading">
          <h3>QUEENS PARK - {user && user.username.toUpperCase()}</h3>
        </div>
      </section>

      <section className="content stats-section">
        <div>
          <h3>1-18</h3>
          <p>Played: {usersScoresBothNineQP.length > 0 ? usersScoresBothNineQP.length : 'N/A'}</p>
          <p>Best: {usersScoresBothNineQP.length > 0 ? usersScoresBothNineQP[0].total : 'N/A'}</p>
          <p>Average: {findTotalAvg(bothNineHoleGamesQP) || 'N/A'}</p>
          <p>Worst: {usersScoresBothNineQP.length > 0 ? usersScoresBothNineQP[usersScoresBothNineQP.length - 1].total : 'N/A'}</p>
        </div>
        <div>
          <h3>1-9</h3>
          <p>Played: {usersScoresFirstNineQP.length > 0 ? usersScoresFirstNineQP.length : 'N/A'}</p>
          <p>Best: {usersScoresFirstNineQP.length > 0 ? usersScoresFirstNineQP[0].total : 'N/A'}</p>
          <p>Average: {findTotalAvg(firstNineHoleGamesQP) || 'N/A'}</p>
          <p>Worst: {usersScoresFirstNineQP.length > 0 ? usersScoresFirstNineQP[usersScoresFirstNineQP.length - 1].total : 'N/A'}</p>
        </div>
        <div>
          <h3>10-18</h3>
          <p>Played: {usersScoresLastNineQP.length > 0 ? usersScoresLastNineQP.length : 'N/A'}</p>
          <p>Best: {usersScoresLastNineQP.length > 0 ? usersScoresLastNineQP[0].total : 'N/A'}</p>
          <p>Average: {findTotalAvg(lastNineHoleGamesQP) || 'N/A'}</p>
          <p>Worst: {usersScoresLastNineQP.length > 0 ? usersScoresLastNineQP[usersScoresLastNineQP.length - 1].total : 'N/A'}</p>
        </div>
      </section>

      {scoresIsLoading ? (
        <img src={spinner} alt='Loading' className="spinner" />
      ) : (
        <>
          <section className='content'>
            <div className='section-heading centered-heading'>
              <h3>1-18</h3>
              <p>Below are all of your 1-18 hole games for Queens Park</p>
            </div>

            {bothNineHoleGamesQP.length > 0 ? (
              <div className="position-medals">
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
              <p>Below are all of your 1-9 hole games for Queens Park</p>
            </div>

            {firstNineHoleGamesQP.length > 0 ? (
              <div className="position-medals">

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
              <p>Below are all of your 10-18 hole games for Queens Park</p>
            </div>

            {lastNineHoleGamesQP.length > 0 ? (
              <div className="position-medals">
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
        <img src={spinner} alt='Loading' className="spinner" />
      ) : (
        <>
          <section className='content '>
            <div className='centered-heading'>
              <h3 className="heading ">ALL GAMES</h3>
              <p>Here are all the games you're in</p>
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