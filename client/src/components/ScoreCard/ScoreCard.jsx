import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../ScorecardCard/ScorecardCard.css';

const ScoreCard = ({ score }) => {
    const navigate = useNavigate();

    const { scores } = useSelector((state) => state.scores);

    const firstNine = score.firstNine;
    const lastNine = score.lastNine;

    const isFirstNine = firstNine.hole1 !== null && lastNine.hole10 === null;
    const isLastNine = firstNine.hole1 === null && lastNine.hole10 !== null;
    const isBothNine = firstNine.hole1 !== null && lastNine.hole10 !== null;

    const handleScorecardClick = (e) => {
        e.preventDefault();

        // Returns full scorecard the score was on
        const scorecard = scores.filter(obj => {
            return obj.score.some(item => item._id === score._id);
        })[0];

        const id = scorecard._id;
        navigate(`/viewScorecard/${id}`);
    };

    return (
        <div className='scorecard' onClick={handleScorecardClick}>
            <div>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            {isFirstNine ?
                                <>
                                    <th>Name</th>
                                    <th className='hideHole'>Hole</th>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>T</th>
                                </> : <></>
                            }
                            {isLastNine ?
                                <>
                                    <th>Name</th>
                                    <th className='hideHole'>Hole</th>
                                    <th>10</th>
                                    <th>11</th>
                                    <th>12</th>
                                    <th>13</th>
                                    <th>14</th>
                                    <th>15</th>
                                    <th>16</th>
                                    <th>17</th>
                                    <th>18</th>
                                    <th>T</th>
                                </> : <></>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={score._id}>

                            {isFirstNine ?
                                <>
                                    <td>{score.username.charAt(0).toUpperCase() + score.username.slice(1)}</td>
                                    <td className='hideHole'>&nbsp;</td>
                                    <td>{score.firstNine.hole1}</td>
                                    <td>{score.firstNine.hole2}</td>
                                    <td>{score.firstNine.hole3}</td>
                                    <td>{score.firstNine.hole4}</td>
                                    <td>{score.firstNine.hole5}</td>
                                    <td>{score.firstNine.hole6}</td>
                                    <td>{score.firstNine.hole7}</td>
                                    <td>{score.firstNine.hole8}</td>
                                    <td>{score.firstNine.hole9}</td>
                                    <td>{score.total}</td>
                                </> : <></>
                            }
                            {isLastNine ?
                                <>
                                    <td>{score.username.charAt(0).toUpperCase() + score.username.slice(1)}</td>
                                    <td className='hideHole'>&nbsp;</td>
                                    <td>{score.lastNine.hole10}</td>
                                    <td>{score.lastNine.hole11}</td>
                                    <td>{score.lastNine.hole12}</td>
                                    <td>{score.lastNine.hole13}</td>
                                    <td>{score.lastNine.hole14}</td>
                                    <td>{score.lastNine.hole15}</td>
                                    <td>{score.lastNine.hole16}</td>
                                    <td>{score.lastNine.hole17}</td>
                                    <td>{score.lastNine.hole18}</td>
                                    <td>{score.total}</td>
                                </> : <></>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            {isBothNine ?
                <>
                    <table className='styled-table bigTable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className='hideHole'>Hole</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{score.username.charAt(0).toUpperCase() + score.username.slice(1)}</td>
                                <td className='hideHole'>&nbsp;</td>
                                <td>{score.firstNine.hole1}</td>
                                <td>{score.firstNine.hole2}</td>
                                <td>{score.firstNine.hole3}</td>
                                <td>{score.firstNine.hole4}</td>
                                <td>{score.firstNine.hole5}</td>
                                <td>{score.firstNine.hole6}</td>
                                <td>{score.firstNine.hole7}</td>
                                <td>{score.firstNine.hole8}</td>
                                <td>{score.firstNine.hole9}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className='styled-table bigTable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className='hideHole'>Hole</th>
                                <th>10</th>
                                <th>11</th>
                                <th>12</th>
                                <th>13</th>
                                <th>14</th>
                                <th>15</th>
                                <th>16</th>
                                <th>17</th>
                                <th>18</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{score.username.charAt(0).toUpperCase() + score.username.slice(1)}</td>
                                <td className='hideHole'>&nbsp;</td>
                                <td>{score.lastNine.hole10}</td>
                                <td>{score.lastNine.hole11}</td>
                                <td>{score.lastNine.hole12}</td>
                                <td>{score.lastNine.hole13}</td>
                                <td>{score.lastNine.hole14}</td>
                                <td>{score.lastNine.hole15}</td>
                                <td>{score.lastNine.hole16}</td>
                                <td>{score.lastNine.hole17}</td>
                                <td>{score.lastNine.hole18}</td>
                            </tr>
                        </tbody>
                    </table>
                </> : <></>}
        </div>
    );
};

export default ScoreCard;