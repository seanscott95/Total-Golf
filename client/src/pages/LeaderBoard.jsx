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

    // Finds the average of the users scorecard totals
    const findTotalAvg = (arr) => {
        // Narrows and orders the scorecard to just the scores objects
        const scoresArr = arr.map(item => item.score).flat().sort((a, b) => a.total - b.total);
        const { length } = scoresArr;
        // Creates array of totals for each scorecard
        const arrTotal = scoresArr.map(item => item.total);
        // Reduces array of totals to a single average value
        return arrTotal.reduce((acc, val) => {
            let avg = acc + (val / length);
            return +avg.toFixed(1);   // Converts avg to a string and to two decimal places
        }, 0);
    };

    const getAllUsersScoresArr = (arr) => {
        return arr.map(item => item.score).flat().sort((a, b) => a.total - b.total);
    }

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        };
        if (isError) {
            console.log(`Error ${message}`);
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

    return (
        <div className="page-container">
            <section className="content">
                <div className="heading centered-heading">
                    <h3>LEADERBOARD</h3>
                </div>
            </section>

            {isLoading ? (
                <img src={spinner} alt='Loading' />
            ) : (
                <section className="content stats-section">
                    <div>
                        <h3>1-18</h3>
                        <p>Played: {bothNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(bothNineHoleGamesQP).length : 'N/A'}</p>
                        <p>Best: {bothNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(bothNineHoleGamesQP)[0].total : 'N/A'}</p>
                        <p>Average: {findTotalAvg(bothNineHoleGamesQP) || 'N/A'}</p>
                        <p>Worst: {bothNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(bothNineHoleGamesQP).reverse()[0].total : 'N/A'}</p>
                    </div>
                    <div>
                        <h3>1-9</h3>
                        <p>Played: {firstNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(firstNineHoleGamesQP).length : 'N/A'}</p>
                        <p>Best: {firstNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(firstNineHoleGamesQP)[0].total : 'N/A'}</p>
                        <p>Average: {findTotalAvg(firstNineHoleGamesQP) || 'N/A'}</p>
                        <p>Worst: {firstNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(firstNineHoleGamesQP).reverse()[0].total : 'N/A'}</p>
                    </div>
                    <div>
                        <h3>10-18</h3>
                        <p>Played: {lastNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(lastNineHoleGamesQP).length : 'N/A'}</p>
                        <p>Best: {lastNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(lastNineHoleGamesQP)[0].total : 'N/A'}</p>
                        <p>Average: {findTotalAvg(lastNineHoleGamesQP) || 'N/A'}</p>
                        <p>Worst: {lastNineHoleGamesQP.length > 0 ? getAllUsersScoresArr(lastNineHoleGamesQP).reverse()[0].total : 'N/A'}</p>
                    </div>
                </section>
            )}
        </div>
    );
};

export default LeaderBoard;