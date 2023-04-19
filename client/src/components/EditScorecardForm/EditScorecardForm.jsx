import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateScorecard, deleteScorecard } from '../../utils/scorecard/scorecardSlice';
import FormInputs from '../FormInputs/FormInputs';
import { date_all } from '../../utils/helper/dateHelper';
import { totalScore } from '../../utils/helper/totalScore';
import { MdDeleteForever } from 'react-icons/md'

import './EditScorecardForm.css';

const EditScorecardForm = ({ scorecard, isEditMode, setIsEditMode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        courseName: scorecard.courseName,
        id: scorecard._id,
        numberOfHoles: scorecard.numberOfHoles,
        score: scorecard.score,
        datePlayed: scorecard.datePlayed,
    });

    // Edits the scorecard when the user submits changes
    const handleScorecardEditSubmit = (e) => {
        e.preventDefault();

        dispatch(updateScorecard({ formData }));
        setIsEditMode((current) => !current);
    };

    // Handles the course name and date played input changes
    const handleFormChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handles the players score name input changes
    const handleNameChange = (e, id) => {
        const { name, value } = e.target;

        let currentScores = formData.score;
        const newScores = currentScores.map((score) => {
            if (score._id === id) {
                return {
                    ...score,
                    [name]: value,
                };
            } else {
                return {
                    ...score
                };
            };
        });

        setFormData({
            ...formData,
            score: newScores,
        });
    };

    // Handles the first nine scores input changes
    const handleFNChange = (e, id) => {
        const { name, value } = e.target;

        let currentScores = formData.score;
        const newScores = currentScores.map((score) => {
            if (score._id === id) {
                return {
                    ...score,
                    firstNine: {
                        ...score.firstNine,
                        [name]: value,
                    }
                };
            } else {
                return {
                    ...score
                };
            };
        });

        const newScoresAndTotals = newScores.map((score) => {
            if (score._id === id) {
                let sum = totalScore(score.firstNine, score.lastNine)
                return {
                    ...score,
                    total: sum
                };
            } else {
                return {
                    ...score
                };
            };
        });

        setFormData({
            ...formData,
            score: newScoresAndTotals,
        });
    };

    // Handles the last nine scores input changes
    const handleLNChange = (e, id) => {
        const { name, value } = e.target;

        let currentScores = formData.score;
        const newScores = currentScores.map((score) => {
            if (score._id === id) {
                return {
                    ...score,
                    lastNine: {
                        ...score.lastNine,
                        [name]: value,
                    }
                };
            } else {
                return {
                    ...score
                };
            };
        });

        const newScoresAndTotals = newScores.map((score) => {
            if (score._id === id) {
                let sum = totalScore(score.firstNine, score.lastNine)
                return {
                    ...score,
                    total: sum
                };
            } else {
                return {
                    ...score
                };
            };
        });

        setFormData({
            ...formData,
            score: newScoresAndTotals,
        });
    };

    const handleDeleteBtn = () => {
        dispatch(deleteScorecard(scorecard._id));
        navigate('/scores');
    };

    return (
        <>
            <section>
                <div>
                    <h3 className='section-heading edit-heading-container'>
                        EDIT SCORECARD
                        <button
                            type='submit'
                            className='btn delete-btn'
                            onClick={handleDeleteBtn}>
                            <MdDeleteForever />
                        </button>
                    </h3>

                </div>
                <form onSubmit={handleScorecardEditSubmit} className='content'>
                    <div className='form-group '>
                        <label htmlFor='courseName'>Course Name:</label>
                        <input
                            type='text'
                            name='courseName'
                            id='courseName'
                            value={formData.courseName}
                            onChange={handleFormChange} />

                        <label htmlFor='datePlayed'>Date Played:</label>
                        <input
                            type='date'
                            name='datePlayed'
                            id='datePlayed'
                            value={date_all(formData.datePlayed).split('-').reverse().join('-')}
                            onChange={handleFormChange} />
                    </div>

                    {
                        formData.score.map((item) => {
                            return <div key={item._id} className='form-group'>
                                <table>
                                    <FormInputs
                                        holes={formData.numberOfHoles}
                                        scoreInputData={item}
                                        handleFormChange={handleFormChange}
                                        handleNameChange={handleNameChange}
                                        handleFirstNineChange={handleFNChange}
                                        handleLastNineChange={handleLNChange}
                                        isEditMode={isEditMode} />
                                </table>
                            </div>
                        })
                    }
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditScorecardForm;