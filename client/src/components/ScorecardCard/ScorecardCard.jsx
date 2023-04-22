import './ScorecardCard.css';

import { useNavigate } from 'react-router-dom';
import { date_all } from '../../utils/helper/dateHelper';

import { FaRegEdit } from 'react-icons/fa';

const ScorecardCard = ({ scorecard, showEditBtn, setIsEditMode }) => {
    const navigate = useNavigate();

    const isFirstNine = scorecard?.numberOfHoles === '1-9';
    const isLastNine = scorecard?.numberOfHoles === '10-18';
    const isBothNine = scorecard?.numberOfHoles === '1-18';

    const scorecardDate = scorecard?.datePlayed || 'N/A';

    const handleScorecardClick = (e) => {
        e.preventDefault();
        const id = scorecard._id;
        navigate(`/viewScorecard/${id}`);
    };

    const splitBothNineScores = (arr) => {
        const res = arr.map((item) => ({
            firstNine: {
                name: item.username,
                score: item.firstNine,
            },
            lastNine: {
                name: item.username,
                score: item.lastNine,
            }
        }));

        const fNGrouped = res.map((item) => item.firstNine)
        const lNGrouped = res.map((item) => item.lastNine)
        const scores = [{
            fN: fNGrouped,
            lN: lNGrouped,
        }];
        return scores;
    };

    return (
        <div className='scorecard' onClick={handleScorecardClick}>
            <div className='scorecard-header'>
                <p><span>Course:</span> {scorecard?.courseName}</p>
                <p><span>Date:</span> {date_all(scorecardDate)}</p>
                {showEditBtn ?
                    <button type='button' className='edit-btn' onClick={setIsEditMode}>
                        <FaRegEdit />
                    </button>
                    : <></>}
            </div>

            {isBothNine ?
                <table className='styled-table hideIfBigScreen'>
                    <thead>
                        <tr>
                            {isBothNine ?
                                <>
                                    <th className='bigScreen'>Name</th>
                                    <th className='hideHole bigScreen'>Hole</th>
                                    <th className='bigScreen'>1</th>
                                    <th className='bigScreen'>2</th>
                                    <th className='bigScreen'>3</th>
                                    <th className='bigScreen'>4</th>
                                    <th className='bigScreen'>5</th>
                                    <th className='bigScreen'>6</th>
                                    <th className='bigScreen'>7</th>
                                    <th className='bigScreen'>8</th>
                                    <th className='bigScreen'>9</th>
                                    <th className='bigScreen'>10</th>
                                    <th className='bigScreen'>11</th>
                                    <th className='bigScreen'>12</th>
                                    <th className='bigScreen'>13</th>
                                    <th className='bigScreen'>14</th>
                                    <th className='bigScreen'>15</th>
                                    <th className='bigScreen'>16</th>
                                    <th className='bigScreen'>17</th>
                                    <th className='bigScreen'>18</th>
                                </> : <></>}
                        </tr>
                    </thead>
                    <tbody>
                        {scorecard?.score.map((item) => (
                            <tr key={item._id}>
                                {isBothNine ?
                                    <>
                                        <td className='bigScreen'>{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</td>
                                        <td className='hideHole bigScreen'>&nbsp;</td>
                                        <td className='bigScreen'>{item.firstNine.hole1}</td>
                                        <td className='bigScreen'>{item.firstNine.hole2}</td>
                                        <td className='bigScreen'>{item.firstNine.hole3}</td>
                                        <td className='bigScreen'>{item.firstNine.hole4}</td>
                                        <td className='bigScreen'>{item.firstNine.hole5}</td>
                                        <td className='bigScreen'>{item.firstNine.hole6}</td>
                                        <td className='bigScreen'>{item.firstNine.hole7}</td>
                                        <td className='bigScreen'>{item.firstNine.hole8}</td>
                                        <td className='bigScreen'>{item.firstNine.hole9}</td>
                                        <td className='bigScreen'>{item.lastNine.hole10}</td>
                                        <td className='bigScreen'>{item.lastNine.hole11}</td>
                                        <td className='bigScreen'>{item.lastNine.hole12}</td>
                                        <td className='bigScreen'>{item.lastNine.hole13}</td>
                                        <td className='bigScreen'>{item.lastNine.hole14}</td>
                                        <td className='bigScreen'>{item.lastNine.hole15}</td>
                                        <td className='bigScreen'>{item.lastNine.hole16}</td>
                                        <td className='bigScreen'>{item.lastNine.hole17}</td>
                                        <td className='bigScreen'>{item.lastNine.hole18}</td>
                                    </> : <></>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <table className='styled-table hideIfSmallScreen'>
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
                        {scorecard?.score.map((item) => (
                            <tr key={item._id}>
                                {isFirstNine ?
                                    <>
                                        <td>{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</td>
                                        <td className='hideHole'>&nbsp;</td>
                                        <td>{item.firstNine.hole1}</td>
                                        <td>{item.firstNine.hole2}</td>
                                        <td>{item.firstNine.hole3}</td>
                                        <td>{item.firstNine.hole4}</td>
                                        <td>{item.firstNine.hole5}</td>
                                        <td>{item.firstNine.hole6}</td>
                                        <td>{item.firstNine.hole7}</td>
                                        <td>{item.firstNine.hole8}</td>
                                        <td>{item.firstNine.hole9}</td>
                                        <td>{item.total}</td>
                                    </> : <></>
                                }
                                {isLastNine ?
                                    <>
                                        <td>{item.username.charAt(0).toUpperCase() + item.username.slice(1)}</td>
                                        <td className='hideHole'>&nbsp;</td>
                                        <td>{item.lastNine.hole10}</td>
                                        <td>{item.lastNine.hole11}</td>
                                        <td>{item.lastNine.hole12}</td>
                                        <td>{item.lastNine.hole13}</td>
                                        <td>{item.lastNine.hole14}</td>
                                        <td>{item.lastNine.hole15}</td>
                                        <td>{item.lastNine.hole16}</td>
                                        <td>{item.lastNine.hole17}</td>
                                        <td>{item.lastNine.hole18}</td>
                                        <td>{item.total}</td>
                                    </> : <></>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {isBothNine ?
                <>
                    {splitBothNineScores(scorecard?.score).map((item) => (
                        <div key={`${item._id} ${new Date().getTime()}`}>
                            <table className='styled-table smallScreen'>
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
                                <tbody >
                                    {item.fN.map((i) => (
                                        <tr key={i.name}>
                                            <td>{i.name.charAt(0).toUpperCase() + i.name.slice(1)}</td>
                                            <td className='hideHole'>&nbsp;</td>
                                            <td>{i.score.hole1}</td>
                                            <td>{i.score.hole2}</td>
                                            <td>{i.score.hole3}</td>
                                            <td>{i.score.hole4}</td>
                                            <td>{i.score.hole5}</td>
                                            <td>{i.score.hole6}</td>
                                            <td>{i.score.hole7}</td>
                                            <td>{i.score.hole8}</td>
                                            <td>{i.score.hole9}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <table className='styled-table smallScreen'>
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
                                <tbody >
                                    {item.lN.map((i) => (
                                        <tr key={i.name}>
                                            <td>{i.name.charAt(0).toUpperCase() + i.name.slice(1)}</td>
                                            <td className='hideHole'>&nbsp;</td>
                                            <td>{i.score.hole10}</td>
                                            <td>{i.score.hole11}</td>
                                            <td>{i.score.hole12}</td>
                                            <td>{i.score.hole13}</td>
                                            <td>{i.score.hole14}</td>
                                            <td>{i.score.hole15}</td>
                                            <td>{i.score.hole16}</td>
                                            <td>{i.score.hole17}</td>
                                            <td>{i.score.hole18}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </> : <></>}
        </div>
    );
};

export default ScorecardCard;