import '../ScorecardCard/ScorecardCard.css';

function ScoreCard({ score }) {
    return (
        <div className="scorecard">
            <div>
                <table className='styled-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Hole</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                            <th>17</th>
                            <th>18</th>
                            <th>T</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={score._id}>
                            <td>{score.username}</td>
                            <td>&nbsp;</td>
                            <td>{score.firstNine.hole1}</td>
                            <td>{score.firstNine.hole2}</td>
                            <td>{score.firstNine.hole3}</td>
                            <td>{score.firstNine.hole4}</td>
                            <td>{score.firstNine.hole5}</td>
                            <td>{score.firstNine.hole6}</td>
                            <td>{score.firstNine.hole7}</td>
                            <td>{score.firstNine.hole8}</td>
                            <td>{score.firstNine.hole9}</td>
                            <td>{score.lastNine.hole10}</td>
                            <td>{score.lastNine.hole11}</td>
                            <td>{score.lastNine.hole12}</td>
                            <td>{score.lastNine.hole13}</td>
                            <td>{score.lastNine.hole14}</td>
                            <td>{score.lastNine.hole15}</td>
                            <td>{score.lastNine.hole16}</td>
                            <td>{score.lastNine.hole17}</td>
                            <td>{score.lastNine.hole18}</td>
                            <td>{score.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScoreCard;