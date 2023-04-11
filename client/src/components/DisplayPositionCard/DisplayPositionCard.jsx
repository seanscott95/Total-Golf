import "./DisplayPositionCard.css";
import ImgPosition from "../../assets/svg/gold-medal.png"

function DisplayPositionCard() {
  return (
    <div className="positionCard">
        <div className="imgPosition">
            <img src={ImgPosition} alt="Position Place" />
        </div>
        <div className="mainContainer">
            <h1>USERNAME</h1>
        </div>
        <div className="bottomContainer">
            <h1>55</h1>
        </div>
    </div>
  )
}

export default DisplayPositionCard;