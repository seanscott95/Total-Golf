import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createScorecard } from '../../utils/scorecard/scorecardSlice';
import { totalScore } from '../../utils/helper/totalScore';
import './ScorecardForm.css';

function ScorecardForm({ queensPark }) {
    const dispatch = useDispatch();

    // Sets the course name as Queens Park or blank depending if
    // the prop queensPark is truthy or not
    const setCourseName = queensPark ? 'Queens Park' : '';

    // Holds the number of holes
    const [holes, setHoles] = useState('1-18');

    // Holds the formData that is used to create a scorecard
    const [formData, setFormData] = useState({
        courseName: setCourseName,
        numberOfHoles: holes,
        score: [],
        datePlayed: ''
    });

    // Holds the scoreInputData of each player added to the scorecard
    const [scoresList, setScoresList] = useState([]);

    const INITIAL_SCORE_STATE = {
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
        total: '',
    };

    // Holds each individal players name, number of holes, firstNine and lastNine scores
    const [scoreInputData, setScoreInputData] = useState(INITIAL_SCORE_STATE);

    const { courseName, datePlayed } = formData;

    // Handles the form submit that creates the dispatch that creates the scorecard depending
    // on the formData variable, then resets the formData and the scoresList
    const handleFormSubmit = (e) => {
        e.preventDefault();

        dispatch(createScorecard({ formData }));

        setFormData({
            courseName: setCourseName,
            numberOfHoles: holes,
            score: [],
            datePlayed: ''
        });
        setScoresList([]);
    };

    // Handles the input for courseName and datePlayed
    const handleFormChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handles the name and score input for each players score
    const handlePlayerSubmit = (e) => {
        e.preventDefault();

        const list = scoresList;
        list.push(scoreInputData);
        setScoresList(list);

        setScoreInputData(INITIAL_SCORE_STATE);
    };

    // Handles the name change input
    const handleNameChange = (e) => {
        setScoreInputData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handles the first nine holes scores input
    const handleFirstNineChange = (e) => {
        setScoreInputData((prev) => ({
            ...prev,
            firstNine: {
                ...prev.firstNine, [e.target.name]: e.target.value
            },
        }));
    };

    // Handles the last nine holes scores input
    const handleLastNineChange = (e) => {
        setScoreInputData((prev) => ({
            ...prev,
            lastNine: {
                ...prev.lastNine, [e.target.name]: e.target.value
            },
        }));
    };

    // Sets how many holes the user wants
    const numberOfHoles = (e) => {
        setHoles(e.target.value);

        // Resets the form if the number of holes are changed
        setScoreInputData(INITIAL_SCORE_STATE);
    };

    // Sets the formData score and number of holes properties when either value is 
    // changed between rendering
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            numberOfHoles: holes,
            score: scoresList,
        }));
    }, [scoresList, holes]);

    // Sets the scoreInputData total property to be the total of the scoreInputData's 
    // lastNine and firstNine holes 
    useEffect(() => {
        let sum = totalScore(scoreInputData.firstNine, scoreInputData.lastNine)
        setScoreInputData((prev) => ({
            ...prev,
            total: JSON.stringify(sum)
        }));
    }, [scoreInputData.firstNine, scoreInputData.lastNine])

    return (
        <div>
            <section >
                <h1 className='section-heading'>SELECT HOW MANY HOLES</h1>
                <div className="btn-group">
                    <button
                        type='submit'
                        className='btn btn-block'
                        value='1-9'
                        onClick={numberOfHoles}
                    >1-9
                    </button>
                    <button
                        type='submit'
                        className='btn btn-block'
                        value='10-18'
                        onClick={numberOfHoles}
                    >10-18
                    </button>
                    <button
                        type='submit'
                        className='btn btn-block'
                        value='1-18'
                        onClick={numberOfHoles}
                    >1-18
                    </button>
                </div>

            </section>
            <section className="scorecard-form">
                <h1 className="section-heading">ENTER YOUR SCORECARD</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group course-date-group">
                        <label htmlFor="courseName">Course Name:</label>
                        <input
                            type="text"
                            name="courseName"
                            id="courseName"
                            value={courseName}
                            onChange={handleFormChange} />

                        <label htmlFor="datePlayed">Date Played:</label>
                        <input
                            type="date"
                            name="datePlayed"
                            id="datePlayed"
                            value={datePlayed}
                            onChange={handleFormChange} />
                    </div>
                    <div className="form-group">

                    </div>
                    <div className="form-group">
                        <table>
                            <thead>
                                <tr>
                                    <th className="name-header">Name</th>
                                    <th>Hole</th>
                                    {holes === '1-18' ?
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

                                    {holes === '1-9' ?
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

                                    {holes === '10-18' ?
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
                                        </> : <></>}
                                    <th></th>
                                    <th>T</th>
                                </tr>
                            </thead>
                            <tbody className="body-inputs">
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            name="username"
                                            id="name"
                                            value={scoreInputData.username}
                                            onChange={handleNameChange} />
                                    </td>
                                    <td></td>
                                    {holes === '1-9' ?
                                        <>
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
                                        </>
                                        : <></>}
                                    {holes === '10-18' ?
                                        <>
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
                                        </>
                                        : <></>}
                                    {holes === '1-18' ?
                                        <>
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
                                        </> : <></>
                                    }
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button type='submit' onClick={handlePlayerSubmit}>Add</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                {scoresList.map((item) => (
                                    <tr key={item.username}>
                                        <td>{item.username}</td>
                                        <td></td>
                                        {holes === '1-18' ?
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
                                        {holes === '1-9' ?
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
                                        {holes === '10-18' ?
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
                                        <td className='hide'></td>
                                        <td>{item.total}</td>
                                    </tr>
                                ))}
                            </tfoot>
                        </table>
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ScorecardForm;