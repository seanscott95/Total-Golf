import NewCourseButton from '../components/NewCourseButton/NewCourseButton';

import GolfCroc from '../assets/svg/GolfCroc.svg';
import GolfEagle from '../assets/svg/GolfEagle.png';

const Homepage = () => {
  // Values for the New Course Button
  const newCourse = {
    header: 'Any Golf Course',
    text: 'any golf course',
    link: '/CreateScorecard',
    image: GolfCroc,
  };

  // Values for the Local Course Button
  const localCourse = {
    header: process.env.REACT_APP_LOCAL_COURSE,
    text: process.env.REACT_APP_LOCAL_COURSE,
    link: '/CreateScorecardQP',
    image: GolfEagle,
  };

  return (
    <div className='homepage-container'>
      <div className='photo-container'></div>
      <section className='course-buttons'>
        <NewCourseButton 
          header={localCourse.header}
          text={localCourse.text}
          link={localCourse.link}
          image={localCourse.image}
        />
        <NewCourseButton 
          header={newCourse.header}
          text={newCourse.text}
          link={newCourse.link}
          image={newCourse.image}
        />
      </section>
    </div>
  );
};

export default Homepage;