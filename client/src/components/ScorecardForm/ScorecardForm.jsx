import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ScorecardForm() {
    const [formData, setFormData] = useState({
        courseName: '',
        scores: [],
        datePlayed: ''
    });

    const { courseName, scores, datePlayed } = formData;

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="courseName">Course Name:</label>
                    <input
                        type="text"
                        name="courseName"
                        id="courseName"
                        value={courseName}
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="scores">Scores:</label>
                    <input
                        type="text"
                        name="scores"
                        id="scores"
                        value={scores}
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="datePlayed">Date Played:</label>
                    <input
                        type="date"
                        name="datePlayed"
                        id="datePlayed"
                        value={datePlayed}
                        onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type='submit' className='btn'>Submit</button>
                </div>
            </form>
        </section>
    )
}

export default ScorecardForm