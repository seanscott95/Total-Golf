import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';
import ScoreCard from '../components/ScoreCard/ScoreCard';
import { getUserCheckExpiry } from '../utils/helper/getUserCheckExpiry';
import LeaderboardPositionLayout from '../components/LeaderboardPositionLayout/LeaderboardPositionLayout';

const LeaderBoard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state => state.auth));
    const { scores, isLoading, isError, message } = useSelector((state) => state.scores);

    // // FUTURE DEV
    // // Finds the average of the users scorecard totals
    // const findTotalAvg = (arr) => {
    //     // Narrows and orders the scorecard to just the scores objects
    //     const scoresArr = arr.map(item => item.score).flat().sort((a, b) => a.total - b.total);
    //     const { length } = scoresArr;
    //     // Creates array of totals for each scorecard
    //     const arrTotal = scoresArr.map(item => item.total);
    //     // Reduces array of totals to a single average value
    //     return arrTotal.reduce((acc, val) => {
    //         let avg = acc + (val / length);
    //         return +avg.toFixed(1);   // Converts avg to a string and to two decimal places
    //     }, 0);
    // };

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        };
        if (isError) {
            console.log(`Error ${message}`);
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
            dispatch(reset);
        };
    }, [user, navigate, dispatch, isError, message]);

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

    // Filters through array of scores and returns all courseNames for Local Course
    const findQPGames = (arr) => {
        return arr.filter((obj) => {
            return obj.courseName === process.env.REACT_APP_LOCAL_COURSE;
        });
    };

    // Creates new variables for the Local Course games
    const firstNineHoleGamesQP = findQPGames(firstNineHoleGames);
    const lastNineHoleGamesQP = findQPGames(lastNineHoleGames);
    const bothNineHoleGamesQP = findQPGames(bothNineHoleGames);

    // Creates a new array with just the scores data from all the scorecards
    const getAllUsersScoresArr = (arr) => {
        return arr.map(item => item.score).flat().sort((a, b) => a.total - b.total);
    };

    const allScoresFirstNineQP = getAllUsersScoresArr(firstNineHoleGamesQP);
    const allScoresLastNineQP = getAllUsersScoresArr(lastNineHoleGamesQP);
    const allScoresBothNineQP = getAllUsersScoresArr(bothNineHoleGamesQP);

    return (
        <div className='page-container'>

            <section className='content'>
                <div className='border-background-img'>
                    <h1>LEADER BOARD</h1>
                    <span></span>
                </div>
            </section>
            <section className='content'>
                <div className='section-heading '>
                    <h2>{process.env.REACT_APP_LOCAL_COURSE}</h2>
                </div>
            </section>

            {isLoading ? (
                <img src={spinner} alt='Loading' className='spinner' />
            ) : (
                <>
                    <section className='content'>
                        <div className='section-heading centered-heading'>
                            <h3>1-18</h3>
                            <p>Top three for 1-18 hole games</p>
                        </div>

                        <div>
                            <LeaderboardPositionLayout
                                first={{
                                    name: allScoresBothNineQP.length > 0
                                        ? allScoresBothNineQP[0].username.charAt(0).toUpperCase() + allScoresBothNineQP[0].username.slice(1)
                                        : '-',
                                    score: allScoresBothNineQP.length > 0 ? allScoresBothNineQP[0].total : '-',
                                    id: allScoresBothNineQP.length > 0 ? allScoresBothNineQP[0]._id : 'N/A'
                                }}
                                second={{
                                    name: allScoresBothNineQP.length > 1
                                        ? allScoresBothNineQP[1].username.charAt(0).toUpperCase() + allScoresBothNineQP[1].username.slice(1)
                                        : '-',
                                    score: allScoresBothNineQP.length > 1 ? allScoresBothNineQP[1].total : '-',
                                    id: allScoresBothNineQP.length > 1 ? allScoresBothNineQP[1]._id : 'N/A'
                                }}
                                third={{
                                    name: allScoresBothNineQP.length > 2
                                        ? allScoresBothNineQP[2].username.charAt(0).toUpperCase() + allScoresBothNineQP[2].username.slice(1)
                                        : '-',
                                    score: allScoresBothNineQP.length > 2 ? allScoresBothNineQP[2].total : '-',
                                    id: allScoresBothNineQP.length > 2 ? allScoresBothNineQP[2]._id : 'N/A'
                                }}
                            />
                        </div>

                        {allScoresBothNineQP.length > 0 ? (
                            <div className='position-medals'>
                                <div className='scores'>
                                    {allScoresBothNineQP.slice(0, 3).map((item) => (
                                        <ScoreCard key={item._id} score={item} />
                                    ))}
                                </div>
                            </div>
                        ) : (<h3>There are no scores!</h3>)}
                    </section>

                    <section className='content'>
                        <div className='section-heading centered-heading'>
                            <h3>1-9</h3>
                            <p>Top three for 1-9 hole games</p>
                            
                        </div>

                        <div>
                            <LeaderboardPositionLayout
                                first={{
                                    name: allScoresFirstNineQP.length > 0
                                        ? allScoresFirstNineQP[0].username.charAt(0).toUpperCase() + allScoresFirstNineQP[0].username.slice(1)
                                        : '-',
                                    score: allScoresFirstNineQP.length > 0 ? allScoresFirstNineQP[0].total : '-',
                                    id: allScoresFirstNineQP.length > 0 ? allScoresFirstNineQP[0]._id : 'N/A'
                                }}
                                second={{
                                    name: allScoresFirstNineQP.length > 1
                                        ? allScoresFirstNineQP[1].username.charAt(0).toUpperCase() + allScoresFirstNineQP[1].username.slice(1)
                                        : '-',
                                    score: allScoresFirstNineQP.length > 1 ? allScoresFirstNineQP[1]?.total : '-',
                                    id: allScoresFirstNineQP.length > 1 ? allScoresFirstNineQP[1]?._id : 'N/A'
                                }}
                                third={{
                                    name: allScoresFirstNineQP.length > 2
                                        ? allScoresFirstNineQP[2].username.charAt(0).toUpperCase() + allScoresFirstNineQP[2].username.slice(1)
                                        : '-',
                                    score: allScoresFirstNineQP.length > 2 ? allScoresFirstNineQP[2].total : '-',
                                    id: allScoresFirstNineQP.length > 2 ? allScoresFirstNineQP[2]._id : 'N/A'
                                }}
                            />
                        </div>

                        {allScoresFirstNineQP.length > 0 ? (
                            <div className='position-medals'>
                                <div className='scores'>
                                    {allScoresFirstNineQP.slice(0, 3).map((item) => (
                                        <ScoreCard key={item._id} score={item} />
                                    ))}
                                </div>
                            </div>
                        ) : (<h3>There are no scores!</h3>)}
                    </section>

                    <section className='content'>
                        <div className='section-heading centered-heading'>
                            <h3>10-18</h3>
                            <p>Top three for 10-18 hole games</p>
                        </div>

                        <div>
                            <LeaderboardPositionLayout
                                first={{
                                    name: allScoresLastNineQP.length > 0
                                        ? allScoresLastNineQP[0].username.charAt(0).toUpperCase() + allScoresLastNineQP[0].username.slice(1)
                                        : '-',
                                    score: allScoresLastNineQP.length > 0 ? allScoresLastNineQP[0].total : '-',
                                    id: allScoresLastNineQP.length > 0 ? allScoresLastNineQP[0]._id : 'N/A'
                                }}
                                second={{
                                    name: allScoresLastNineQP.length > 1
                                        ? allScoresLastNineQP[1].username.charAt(0).toUpperCase() + allScoresLastNineQP[1].username.slice(1)
                                        : '-',
                                    score: allScoresLastNineQP.length > 1 ? allScoresLastNineQP[1].total : '-',
                                    id: allScoresLastNineQP.length > 1 ? allScoresLastNineQP[1]._id : 'N/A'
                                }}
                                third={{
                                    name: allScoresLastNineQP.length > 2
                                        ? allScoresLastNineQP[2].username.charAt(0).toUpperCase() + allScoresLastNineQP[2].username.slice(1)
                                        : '-',
                                    score: allScoresLastNineQP.length > 2 ? allScoresLastNineQP[2].total : '-',
                                    id: allScoresLastNineQP.length > 2 ? allScoresLastNineQP[2]._id : 'N/A'
                                }}
                            />
                        </div>

                        {allScoresLastNineQP.length > 0 ? (
                            <div className='position-medals'>
                                <div className='scores'>
                                    {allScoresLastNineQP.slice(0, 3).map((item) => (
                                        <ScoreCard key={item._id} score={item} />
                                    ))}
                                </div>
                            </div>
                        ) : (<h3>There are no scores!</h3>)}
                    </section>
                </>
            )}
            
            {/* FUTURE DEV */}
            {/* {isLoading ? (
                <img src={spinner} alt='Loading' className='spinner' />
            ) : (
                <section className='content stats-section'>
                    <div>
                        <h3>1-18</h3>
                        <p>Played: {allScoresBothNineQP.length > 0 ? allScoresBothNineQP.length : 'N/A'}</p>
                        <p>
                            Best: {allScoresBothNineQP.length > 0 ? allScoresBothNineQP[0].total : 'N/A'}
                            - {allScoresBothNineQP.length > 0
                                ? allScoresBothNineQP[0].username.charAt(0).toUpperCase() + allScoresBothNineQP[0].username.slice(1)
                                : 'N/A'}
                        </p>
                        <p>Average: {findTotalAvg(bothNineHoleGamesQP) || 'N/A'}</p>
                        <p>
                            Worst: {allScoresBothNineQP.length > 0 ? allScoresBothNineQP[allScoresBothNineQP.length - 1].total : 'N/A'}
                            - {allScoresBothNineQP.length > 0
                                ? allScoresBothNineQP[allScoresBothNineQP.length - 1].username.charAt(0).toUpperCase() + allScoresBothNineQP[allScoresBothNineQP.length - 1].username.slice(1)
                                : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3>1-9</h3>
                        <p>Played: {allScoresFirstNineQP.length > 0 ? allScoresFirstNineQP.length : 'N/A'}</p>
                        <p>
                            Best: {allScoresFirstNineQP.length > 0 ? allScoresFirstNineQP[0].total : 'N/A'}
                            - {allScoresFirstNineQP.length > 0
                                ? allScoresFirstNineQP[0].username.charAt(0).toUpperCase() + allScoresFirstNineQP[0].username.slice(1)
                                : 'N/A'}
                        </p>
                        <p>Average: {findTotalAvg(firstNineHoleGamesQP) || 'N/A'}</p>
                        <p>
                            Worst: {allScoresFirstNineQP.length > 0 ? allScoresFirstNineQP[allScoresFirstNineQP.length - 1].total : 'N/A'}
                            - {allScoresFirstNineQP.length > 0
                                ? allScoresFirstNineQP[allScoresFirstNineQP.length - 1].username.charAt(0).toUpperCase() + allScoresFirstNineQP[allScoresFirstNineQP.length - 1].username.slice(1)
                                : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3>10-18</h3>
                        <p>Played: {allScoresLastNineQP.length > 0 ? allScoresLastNineQP.length : 'N/A'}</p>
                        <p>
                            Best: {allScoresLastNineQP.length > 0 ? allScoresLastNineQP[0].total : 'N/A'}
                            - {allScoresLastNineQP.length > 0
                                ? allScoresLastNineQP[0].username.charAt(0).toUpperCase() + allScoresLastNineQP[0].username.slice(1)
                                : 'N/A'}
                        </p>
                        <p>Average: {findTotalAvg(lastNineHoleGamesQP) || 'N/A'}</p>
                        <p>
                            Worst: {allScoresLastNineQP.length > 0 ? allScoresLastNineQP[allScoresLastNineQP.length - 1].total : 'N/A'}
                            - {allScoresLastNineQP.length > 0
                                ? allScoresLastNineQP[allScoresLastNineQP.length - 1].username.charAt(0).toUpperCase() + allScoresLastNineQP[allScoresLastNineQP.length - 1].username.slice(1)
                                : 'N/A'}
                        </p>
                    </div>
                </section>
            )} */}
        </div>
    );
};

export default LeaderBoard;