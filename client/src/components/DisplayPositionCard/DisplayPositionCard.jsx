import './DisplayPositionCard.css';
import GoldMedal from '../../assets/svg/gold-medal.png';
import SilverMedal from '../../assets/svg/silver-medal.png';
import BronzeMedal from '../../assets/svg/bronze-medal.png';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
const DisplayPositionCard = ({ position, name, score, id }) => {
    const navigate = useNavigate();

    const { scores } = useSelector((state) => state.scores);

    const handleClick = (e) => {
        e.preventDefault();

        // Returns full scorecard the score was on
        const scorecard = scores.filter(obj => {
            return obj.score.some(item => item._id === id);
        })[0];
        
        const scorecardId = scorecard._id;
        navigate(`/viewScorecard/${scorecardId}`);
    }
    return (
        <div className='positionCard' onClick={handleClick}>
            <div className='imgPosition'>
                {position === 'gold' ? (<img src={GoldMedal} alt='Gold Medal' />) : <></>}
                {position === 'silver' ? (<img src={SilverMedal} alt='Silver medal' />) : <></>}
                {position === 'bronze' ? (<img src={BronzeMedal} alt='Bronze medal' />) : <></>}
                
            </div>
            <div className='nameContainer'>
                <h1>{name}</h1>
            </div>
            <div className='scoreContainer'>
                <h3>{score}</h3>
            </div>
        </div>
    );
};

export default DisplayPositionCard; 