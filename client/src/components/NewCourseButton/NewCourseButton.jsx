import { Link } from 'react-router-dom';

import './NewCourseButton.css';

const NewCourseButton = ({ header, text, link, image }) => {
  return (
    <div className='button-container'>
        <section className='text-section'>
            <h1>{header}</h1>
            <p>Create a new Scorecard for {text}</p>
            <Link to={link}>
                <button className='btn'>GET STARTED &gt;</button>
            </Link>
        </section>
        <div className='image-container'>
          <img src={image} alt='Cartoon Golfer' className='svg' />
        </div>
    </div>
  )
};

export default NewCourseButton;