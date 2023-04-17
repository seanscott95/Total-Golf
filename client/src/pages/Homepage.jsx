import PhotoMontage from '../components/PhotoMontage/PhotoMontage';
import NewCourseButton from '../components/NewCourseButton/NewCourseButton';

import GolfCroc from '../assets/svg/GolfCroc.svg';
import GolfEagle from '../assets/svg/GolfEagle.png';

function Homepage() {
  // Values for the New Course Button
  const newCourse = {
    header: 'Any Golf Course',
    text: 'any golf course',
    link: '/CreateScorecard',
    image: GolfCroc,
  };

  // Values for the Queens Park Course Button
  const queensPark = {
    header: 'Queens Park',
    text: 'Queens Park',
    link: '/CreateScorecardQP',
    image: GolfEagle,
  };

  return (
    <div className='homepage-container'>
      <PhotoMontage />
      
      <section className='course-buttons'>
        <NewCourseButton 
          header={queensPark.header}
          text={queensPark.text}
          link={queensPark.link}
          image={queensPark.image}
        />
        <NewCourseButton 
          header={newCourse.header}
          text={newCourse.text}
          link={newCourse.link}
          image={newCourse.image}
        />
      </section>
    </div>
  )
}

export default Homepage