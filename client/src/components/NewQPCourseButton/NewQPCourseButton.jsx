import { Link } from "react-router-dom";

import './NewQPCourseButton.css';
import golfCroc from '../../assets/svg/Crocodile-Playing-Golf.svg';

function NewQPCourseButton() {
  return (
    <div className="container">
        <section className="">
            <h1>Queens Park</h1>
            <p>Create a new Scorecard for Queens Park</p>
            <Link to="/CreateScorecardQP">
                <button >GET STARTED &gt;</button>
            </Link>
        </section>
        <img src={golfCroc} alt="Cartoon Golf Crocodile" />
    </div>
  )
}

export default NewQPCourseButton