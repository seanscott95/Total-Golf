import './LeaderboardPositionLayout.css'
import DisplayPositionCard from '../DisplayPositionCard/DisplayPositionCard';

const LeaderboardPositionLayout = ({ first, second, third }) => {
  return (
    <div className='mainContainer'>
        <section className='topContainer'>
            <DisplayPositionCard 
                position='gold'
                name={first.name}
                score={first.score}
                id={first.id}
            />
        </section>
        <section className='bottomContainer'>
            <DisplayPositionCard 
                position='silver'
                name={second.name}
                score={second.score}
                id={second.id}
            />
            <DisplayPositionCard 
                position='bronze'
                name={third.name}
                score={third.score}
                id={third.id}
            />
        </section>
    </div>
  );
};

export default LeaderboardPositionLayout;