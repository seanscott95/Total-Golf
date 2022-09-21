import './ScorecardCard.css'

import { useDispatch } from 'react-redux';
import { deleteScorecard } from '../../utils/scorecard/scorecardSlice';

function ScorecardCard({ scorecard }) {
    const dispatch = useDispatch();

    // Calculates the total score of the firstNine and lastNine holes values
    const totalScore = (firstNine, lastNine) => {
        let sum = 0;
        for (const value in firstNine) {
            sum += parseInt(firstNine[value]);
        };
        for (const value2 in lastNine) {
            return sum += parseInt(lastNine[value2]);
        };
    };

    return (
        <div className="scorecard">
            <div className='scorecard-header'>
                <p><span>Course:</span> {scorecard.courseName}</p>
                <p><span>Date:</span> {scorecard.datePlayed}</p>
            </div>
            <div>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Hole</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
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
                        </tr>
                    </thead>
                    <tbody>
                        {scorecard.score.map((item) => (
                            <tr key={item._id}>
                                <td>{item.username}</td>
                                <td>&nbsp;</td>
                                <td>{item.firstNine.hole1}</td>
                                <td>{item.firstNine.hole2}</td>
                                <td>{item.firstNine.hole3}</td>
                                <td>{item.firstNine.hole4}</td>
                                <td>{item.firstNine.hole5}</td>
                                <td>{item.firstNine.hole6}</td>
                                <td>{item.firstNine.hole7}</td>
                                <td>{item.firstNine.hole8}</td>
                                <td>{item.firstNine.hole9}</td>
                                <td>{item.lastNine.hole10}</td>
                                <td>{item.lastNine.hole11}</td>
                                <td>{item.lastNine.hole12}</td>
                                <td>{item.lastNine.hole13}</td>
                                <td>{item.lastNine.hole14}</td>
                                <td>{item.lastNine.hole15}</td>
                                <td>{item.lastNine.hole16}</td>
                                <td>{item.lastNine.hole17}</td>
                                <td>{item.lastNine.hole18}</td>
                                <td>{totalScore(item.firstNine, item.lastNine)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button type='submit' onClick={() => dispatch(deleteScorecard(scorecard._id))}>X</button>
            </div>
        </div>
    );
};

export default ScorecardCard;