import './ScorecardCard.css'

function ScorecardCard({ scorecard }) {
    return (
        <div className="scorecard">
            <div className='scorecard-header'>
                <p><span>Course:</span> {scorecard.courseName}</p>
                <p><span>Date:</span> {scorecard.datePlayed}</p>
            </div>
            <div>
                <table class='styled-table'>
                    <thead>
                        <tr>
                            <th>Username</th>
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
                        </tr>
                    </thead>
                    <tbody>
                        {scorecard.score.map((item) => (
                            <tr key={item._id}>
                                <td>{item.username}</td>
                                <td></td>
                                <td>{item.firstNine.hole1}</td>
                                <td>{item.firstNine.hole2}</td>
                                <td>{item.firstNine.hole3}</td>
                                <td>{item.firstNine.hole4}</td>
                                <td>{item.firstNine.hole5}</td>
                                <td>{item.firstNine.hole6}</td>
                                <td>{item.firstNine.hole7}</td>
                                <td>{item.firstNine.hole8}</td>
                                <td>{item.firstNine.hole9}</td>
                                <td>{item.lastNine.hole10}</td>
                                <td>{item.lastNine.hole11}</td>
                                <td>{item.lastNine.hole12}</td>
                                <td>{item.lastNine.hole13}</td>
                                <td>{item.lastNine.hole14}</td>
                                <td>{item.lastNine.hole15}</td>
                                <td>{item.lastNine.hole16}</td>
                                <td>{item.lastNine.hole17}</td>
                                <td>{item.lastNine.hole18}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScorecardCard;