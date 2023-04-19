import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDeleteForever } from 'react-icons/md';

import { createScorecard } from '../../utils/scorecard/scorecardSlice';
import { totalScore } from '../../utils/helper/totalScore';
import FormInputs from '../FormInputs/FormInputs';
import './ScorecardForm.css';

const ScorecardForm = ({ queensPark }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        if (scoresList.length === 0) {
            toast.error('Please add a score');
            return;
        };

        dispatch(createScorecard({ formData }));

        setFormData({
            courseName: setCourseName,
            numberOfHoles: holes,
            score: [],
            datePlayed: ''
        });
        setScoresList([]);
        navigate('/scores');
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

        const isFieldEmpty = (obj, obj2) => {
            if (holes === '1-18') {
                return obj.some(hole => hole === '') + obj2.some(hole => hole === '');
            };
            if (holes === '1-9') {
                return obj.some(hole => hole === '');
            };
            if (holes === '10-18') {
                return obj2.some(hole => hole === '')
            };
        };
        let fnVal = Object.values(scoreInputData.firstNine);
        let lnVal = Object.values(scoreInputData.lastNine);

        if (isFieldEmpty(fnVal, lnVal)) {
            toast.error('Make sure all fields are filled out');
            return;
        };

        if (scoreInputData.username === '') {
            toast.error('Make sure all fields are filled out');
            return;
        };

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
        setFormData({
            courseName: setCourseName,
            numberOfHoles: holes,
            score: [],
            datePlayed: ''
        });
        setScoresList([]);
        setScoreInputData(INITIAL_SCORE_STATE);
    };

    const handleDeleteBtn = (e) => {
        e.preventDefault();

        const newScoresList = scoresList.filter((item) => item.username !== e.target.id);
        setScoresList(newScoresList);
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
    }, [scoreInputData.firstNine, scoreInputData.lastNine]);

    return (
        <>
            <section className='scorecardFormContainer content'>
                <h3 className='section-heading'>SELECT HOW MANY HOLES</h3>
                <div className='btn-group'>
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

                <h3 className='section-heading'>ENTER YOUR SCORECARD</h3>
            </section>
            <section className='scorecard-form'>
                <form onSubmit={handleFormSubmit}>
                    <div className='course-date-group'>
                        <div className='form-group'>
                            <label htmlFor='courseName'>Course Name:</label>
                            <input
                                type='text'
                                name='courseName'
                                id='courseName'
                                value={courseName}
                                onChange={handleFormChange}
                                required />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='datePlayed'>Date Played:</label>
                            <input
                                type='date'
                                name='datePlayed'
                                id='datePlayed'
                                value={datePlayed}
                                onChange={handleFormChange}
                                required />
                        </div>
                    </div>

                    <div>
                        <table className='formInputsContainer'>
                            <FormInputs
                                holes={holes}
                                scoreInputData={scoreInputData}
                                handleNameChange={handleNameChange}
                                handleFirstNineChange={handleFirstNineChange}
                                handleLastNineChange={handleLastNineChange}
                                handlePlayerSubmit={handlePlayerSubmit} />

                        </table>
                        <table className='styled-table addedScore'>
                            <thead>
                                {scoresList.map((item) => (
                                    <>
                                        <tr className='hide'><th></th></tr>
                                        <tr>
                                            <th>{`${item.username} - ${item.total}`}</th>
                                        </tr>
                                        <tr>
                                            <th className='deleteBtnTd'>
                                                <button
                                                    type='submit'
                                                    className='deleteScoreBtn'
                                                    onClick={handleDeleteBtn}>
                                                    <MdDeleteForever id={item.username} className='deleteScoreIcon' />
                                                </button>
                                            </th>
                                        </tr>
                                        <tr key={item.username}>
                                            {holes === '1-18' ?
                                                <th>
                                                    <table className='smallScreen styled-table'>
                                                        <thead>
                                                            <tr>
                                                                <th>1</th>
                                                                <th>2</th>
                                                                <th>3</th>
                                                                <th >4</th>
                                                                <th>5</th>
                                                                <th>6</th>
                                                                <th>7</th>
                                                                <th>8</th>
                                                                <th>9</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className='smallScree'>{item.firstNine.hole1}</td>
                                                                <td className='smallScren'>{item.firstNine.hole2}</td>
                                                                <td className='smallScren'>{item.firstNine.hole3}</td>
                                                                <td className='smallSceen'>{item.firstNine.hole4}</td>
                                                                <td className='smallSreen'>{item.firstNine.hole5}</td>
                                                                <td className='smallcreen'>{item.firstNine.hole6}</td>
                                                                <td className='smalScreen'>{item.firstNine.hole7}</td>
                                                                <td className='smalScreen'>{item.firstNine.hole8}</td>
                                                                <td className='smllScreen'>{item.firstNine.hole9}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <table className='smallScreen styled-table'>
                                                        <thead>
                                                            <tr>
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
                                                        </tbody>
                                                    </table>

                                                    <table className='bigScreen styled-table'>
                                                        <thead>
                                                            <tr>
                                                                <th>1</th>
                                                                <th>2</th>
                                                                <th>3</th>
                                                                <th >4</th>
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
                                                        </tbody>
                                                    </table>
                                                </th> : <></>
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

                                                    <td className='deleteBtnTd'>
                                                        <button
                                                            type='submit'
                                                            className='deleteScoreBtn'
                                                            onClick={handleDeleteBtn}>
                                                            <MdDeleteForever id={item.username} className='deleteScoreIcon' />
                                                        </button>
                                                    </td>
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

                                                    <td className='deleteBtnTd'>
                                                        <button
                                                            type='submit'
                                                            className='deleteScoreBtn'
                                                            onClick={handleDeleteBtn}>
                                                            <MdDeleteForever id={item.username} className='deleteScoreIcon' />
                                                        </button>
                                                    </td>
                                                </> : <></>
                                            }

                                        </tr>
                                    </>
                                ))}
                            </thead>
                        </table>
                    </div >
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form >
            </section >
        </ >
    );
};

export default ScorecardForm;