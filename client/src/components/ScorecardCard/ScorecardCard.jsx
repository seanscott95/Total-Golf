import './ScorecardCard.css';

import { useNavigate } from 'react-router-dom';
import { date_all } from '../../utils/helper/dateHelper';

import { FaRegEdit } from 'react-icons/fa';

function ScorecardCard({ scorecard, showEditBtn }) {
    const navigate = useNavigate();

    const isFirstNine = scorecard?.numberOfHoles === "1-9";
    const isLastNine = scorecard?.numberOfHoles === "10-18";
    const isBothNine = scorecard?.numberOfHoles === "1-18";

    const scorecardDate = scorecard?.datePlayed || "N/A";

    const handleScorecardClick = (e) => {
        e.preventDefault();
        const id = scorecard._id
        navigate(`/viewScorecard/${id}`);
    };

    const handleEdit = (e) => {
        e.stopPropagation()
        const id = scorecard._id
        navigate(`/editScorecard/${id}`);
    }

    return (
        <div className="scorecard" onClick={handleScorecardClick}>
            <div className='scorecard-header'>
                <p><span>Course:</span> {scorecard?.courseName}</p>
                <p><span>Date:</span> {date_all(scorecardDate)}</p>
                {showEditBtn ? 
                <button type='button' className="edit-btn" onClick={handleEdit}>
                    <FaRegEdit />
                </button>
                : <></>}
            </div>
            <div>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Hole</th>
                            {isFirstNine ?
                                <>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                </> : <></>
                            }
                            {isLastNine ?
                                <>
                                    <th>10</th>
                                    <th>11</th>
                                    <th>12</th>
                                    <th>13</th>
                                    <th>14</th>
                                    <th>15</th>
                                    <th>16</th>
                                    <th>17</th>
                                    <th>18</th>
                                </> : <></>
                            }
                            {isBothNine ?
                                <>
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
                                </> : <></>
                            }
                            <th>T</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scorecard?.score.map((item) => (
                            <tr key={item._id}>
                                <td>{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</td>
                                <td>&nbsp;</td>
                                {isFirstNine ?
                                    <>
                                        <td>{item.firstNine.hole1}</td>
                                        <td>{item.firstNine.hole2}</td>
                                        <td>{item.firstNine.hole3}</td>
                                        <td>{item.firstNine.hole4}</td>
                                        <td>{item.firstNine.hole5}</td>
                                        <td>{item.firstNine.hole6}</td>
                                        <td>{item.firstNine.hole7}</td>
                                        <td>{item.firstNine.hole8}</td>
                                        <td>{item.firstNine.hole9}</td>
                                    </> : <></>
                                }
                                {isLastNine ?
                                    <>
                                        <td>{item.lastNine.hole10}</td>
                                        <td>{item.lastNine.hole11}</td>
                                        <td>{item.lastNine.hole12}</td>
                                        <td>{item.lastNine.hole13}</td>
                                        <td>{item.lastNine.hole14}</td>
                                        <td>{item.lastNine.hole15}</td>
                                        <td>{item.lastNine.hole16}</td>
                                        <td>{item.lastNine.hole17}</td>
                                        <td>{item.lastNine.hole18}</td>
                                    </> : <></>
                                }
                                {isBothNine ?
                                    <>
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
                                    </> : <></>
                                }
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScorecardCard;