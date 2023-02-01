import { Link } from "react-router-dom";

import './NewQPCourseButton.css';
import golfCroc from '../../assets/svg/Crocodile-Playing-Golf.svg';

function NewQPCourseButton() {
  return (
    <div className="container-button">
        <section className="">
            <h1>Queens Park</h1>
            <p>Create a new Scorecard for Queens Park</p>
            <Link to="/CreateScorecardQP">
                <button className="btn">GET STARTED &gt;</button>
            </Link>
        </section>
        <img src={golfCroc} alt="Cartoon Golf Crocodile" className="croc-svg" />
    </div>
  )
}

export default NewQPCourseButton