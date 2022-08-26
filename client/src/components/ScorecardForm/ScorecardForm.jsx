import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createScorecard } from '../../utils/scorecard/scorecardSlice';

function ScorecardForm() {
    const [scoresList, setScoresList] = useState([]);

    const [formData, setFormData] = useState({
        courseName: '',
        score: [],
        datePlayed: ''
    });

    const [scoreInputData, setScoreInputData] = useState({
        username: '',
        firstNine: {
            hole1: '',
            hole2: '',
            hole3: '',
            hole4: '',
            hole5: '',
            hole6: '',
            hole7: '',
            hole8: '',
            hole9: '',
        },
        lastNine: {
            hole10: '',
            hole11: '',
            hole12: '',
            hole13: '',
            hole14: '',
            hole15: '',
            hole16: '',
            hole17: '',
            hole18: '',
        },
    });

    const { courseName, datePlayed } = formData;

    const dispatch = useDispatch();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        dispatch(createScorecard({ formData }));

        setFormData({
            courseName: '',
            datePlayed: ''
        });
        setScoresList([]);
    };

    const handleFormChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handlePlayerSubmit = (e) => {
        e.preventDefault();

        const list = scoresList;
        list.push(scoreInputData);
        setScoresList(list);

        setScoreInputData({
            username: '',
            firstNine: {
                hole1: '',
                hole2: '',
                hole3: '',
                hole4: '',
                hole5: '',
                hole6: '',
                hole7: '',
                hole8: '',
                hole9: '',
            },
            lastNine: {
                hole10: '',
                hole11: '',
                hole12: '',
                hole13: '',
                hole14: '',
                hole15: '',
                hole16: '',
                hole17: '',
                hole18: '',
            },
        });
    };


    const handleUsernameChange = (e) => {
        setScoreInputData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        console.log(e.target.name)

    };

    const handleFirstNineChange = (e) => {
        setScoreInputData((prev) => ({
            ...prev,
            firstNine: {
                ...prev.firstNine, [e.target.name]: e.target.value
            }
        }));
    };

    const handleLastNineChange = (e) => {
        setScoreInputData((prev) => ({
            ...prev,
            lastNine: {
                ...prev.lastNine, [e.target.name]: e.target.value
            }
        }));
    };

    useEffect(() => {
        const list = scoresList;
        setFormData((prev) => ({
            ...prev,
            score: list,
        }));
    }, [scoresList]);

    return (
        <section className="form">
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="courseName">Course Name:</label>
                    <input
                        type="text"
                        name="courseName"
                        id="courseName"
                        value={courseName}
                        onChange={handleFormChange} />
                </div>
                <div className="form-group">
                    <table>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={scoreInputData.username}
                                        onChange={handleUsernameChange} />
                                </td>
                                <td></td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole1"
                                        id="hole1"
                                        value={scoreInputData.firstNine.hole1}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole2"
                                        id="hole2"
                                        value={scoreInputData.firstNine.hole2}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole3"
                                        id="hole3"
                                        value={scoreInputData.firstNine.hole3}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole4"
                                        id="hole4"
                                        value={scoreInputData.firstNine.hole4}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole5"
                                        id="hole5"
                                        value={scoreInputData.firstNine.hole5}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole6"
                                        id="hole6"
                                        value={scoreInputData.firstNine.hole6}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole7"
                                        id="hole7"
                                        value={scoreInputData.firstNine.hole7}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole8"
                                        id="hole8"
                                        value={scoreInputData.firstNine.hole8}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole9"
                                        id="hole9"
                                        value={scoreInputData.firstNine.hole9}
                                        onChange={handleFirstNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole10"
                                        id="hole10"
                                        value={scoreInputData.lastNine.hole10}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole11"
                                        id="hole11"
                                        value={scoreInputData.lastNine.hole11}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole12"
                                        id="hole12"
                                        value={scoreInputData.lastNine.hole12}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole13"
                                        id="hole13"
                                        value={scoreInputData.lastNine.hole13}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole14"
                                        id="hole14"
                                        value={scoreInputData.lastNine.hole14}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole15"
                                        id="hole15"
                                        value={scoreInputData.lastNine.hole15}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole16"
                                        id="hole16"
                                        value={scoreInputData.lastNine.hole16}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole17"
                                        id="hole17"
                                        value={scoreInputData.lastNine.hole17}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="hole18"
                                        id="hole18"
                                        value={scoreInputData.lastNine.hole18}
                                        onChange={handleLastNineChange} />
                                </td>
                                <td>
                                    <button type='submit' onClick={handlePlayerSubmit}>Add</button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                                {scoresList.map((item) => (
                                    <tr>
                                        <td>{item.username}</td>
                                        <td></td>
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
                                    </tr>
                                ))}
                        </tfoot>
                    </table>
                </div>
                <div className="form-group">
                    <label htmlFor="datePlayed">Date Played:</label>
                    <input
                        type="date"
                        name="datePlayed"
                        id="datePlayed"
                        value={datePlayed}
                        onChange={handleFormChange} />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn'>Submit</button>
                </div>
            </form>
        </section>
    );
};

export default ScorecardForm;