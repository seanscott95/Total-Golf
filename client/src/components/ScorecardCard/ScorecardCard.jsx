function ScorecardCard({ scorecard }) {
    console.log(scorecard)
    return (
        <div className="scorecard">
            <div>
                {new Date(scorecard.datePlayed).toLocaleString('en-AU')}
            </div>
        </div>
    )
};

export default ScorecardCard;