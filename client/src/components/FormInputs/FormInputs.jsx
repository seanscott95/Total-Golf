// import "../ScorecardForm/ScorecardForm.css"

const FormInputs = ({
    holes,
    scoreInputData,
    handleNameChange,
    handleFirstNineChange,
    handleLastNineChange,
    handlePlayerSubmit,
    isEditMode,
}) => {
    return (
        <>
            <thead>
                <tr>
                    <th className="name-header">Name</th>
                    <th>Hole</th>
                    {holes === '1-18' ?
                        <>
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
                        </> : <></>
                    }

                    {holes === '1-9' ?
                        <>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                        </> : <></>
                    }

                    {holes === '10-18' ?
                        <>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                            <th>17</th>
                            <th>18</th>
                        </> : <></>}
                    <th></th>
                    <th>T</th>
                </tr>
            </thead>
            <tbody className="body-inputs">
                <tr>
                    <td>
                        <input
                            type="text"
                            name="username"
                            id="name"
                            value={scoreInputData.username}
                            onChange={(e) => handleNameChange(e, scoreInputData._id)} />
                    </td>
                    <td></td>
                    {holes === '1-9' ?
                        <>
                            <td>
                                <input
                                    type="number"
                                    name="hole1"
                                    id="hole1"
                                    value={scoreInputData.firstNine.hole1}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />

                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole2"
                                    id="hole2"
                                    value={scoreInputData.firstNine.hole2}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole3"
                                    id="hole3"
                                    value={scoreInputData.firstNine.hole3}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole4"
                                    id="hole4"
                                    value={scoreInputData.firstNine.hole4}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole5"
                                    id="hole5"
                                    value={scoreInputData.firstNine.hole5}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole6"
                                    id="hole6"
                                    value={scoreInputData.firstNine.hole6}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole7"
                                    id="hole7"
                                    value={scoreInputData.firstNine.hole7}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole8"
                                    id="hole8"
                                    value={scoreInputData.firstNine.hole8}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole9"
                                    id="hole9"
                                    value={scoreInputData.firstNine.hole9}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                        </>
                        : <></>}
                    {holes === '10-18' ?
                        <>
                            <td>
                                <input
                                    type="number"
                                    name="hole10"
                                    id="hole10"
                                    value={scoreInputData.lastNine.hole10}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole11"
                                    id="hole11"
                                    value={scoreInputData.lastNine.hole11}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole12"
                                    id="hole12"
                                    value={scoreInputData.lastNine.hole12}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole13"
                                    id="hole13"
                                    value={scoreInputData.lastNine.hole13}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole14"
                                    id="hole14"
                                    value={scoreInputData.lastNine.hole14}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole15"
                                    id="hole15"
                                    value={scoreInputData.lastNine.hole15}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole16"
                                    id="hole16"
                                    value={scoreInputData.lastNine.hole16}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole17"
                                    id="hole17"
                                    value={scoreInputData.lastNine.hole17}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole18"
                                    id="hole18"
                                    value={scoreInputData.lastNine.hole18}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                        </>
                        : <></>}
                    {holes === '1-18' ?
                        <>
                            <td>
                                <input
                                    type="number"
                                    name="hole1"
                                    id="hole1"
                                    value={scoreInputData.firstNine.hole1}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole2"
                                    id="hole2"
                                    value={scoreInputData.firstNine.hole2}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole3"
                                    id="hole3"
                                    value={scoreInputData.firstNine.hole3}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole4"
                                    id="hole4"
                                    value={scoreInputData.firstNine.hole4}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole5"
                                    id="hole5"
                                    value={scoreInputData.firstNine.hole5}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole6"
                                    id="hole6"
                                    value={scoreInputData.firstNine.hole6}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole7"
                                    id="hole7"
                                    value={scoreInputData.firstNine.hole7}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole8"
                                    id="hole8"
                                    value={scoreInputData.firstNine.hole8}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole9"
                                    id="hole9"
                                    value={scoreInputData.firstNine.hole9}
                                    onChange={(e) => handleFirstNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole10"
                                    id="hole10"
                                    value={scoreInputData.lastNine.hole10}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole11"
                                    id="hole11"
                                    value={scoreInputData.lastNine.hole11}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole12"
                                    id="hole12"
                                    value={scoreInputData.lastNine.hole12}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole13"
                                    id="hole13"
                                    value={scoreInputData.lastNine.hole13}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole14"
                                    id="hole14"
                                    value={scoreInputData.lastNine.hole14}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole15"
                                    id="hole15"
                                    value={scoreInputData.lastNine.hole15}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole16"
                                    id="hole16"
                                    value={scoreInputData.lastNine.hole16}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole17"
                                    id="hole17"
                                    value={scoreInputData.lastNine.hole17}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hole18"
                                    id="hole18"
                                    value={scoreInputData.lastNine.hole18}
                                    onChange={(e) => handleLastNineChange(e, scoreInputData._id)} />
                            </td>
                        </> : <></>
                    }

                    {isEditMode ?
                        <>
                            <td></td>
                            <td>
                                <input readOnly value={scoreInputData.total} />
                            </td>
                        </>
                        :
                        <>
                            <td></td>
                            <td></td>
                            <td>
                                <button type='submit' onClick={handlePlayerSubmit}>Add</button>
                            </td>
                        </>
                    }
                </tr>
            </tbody>
        </>
    );
};

export default FormInputs;