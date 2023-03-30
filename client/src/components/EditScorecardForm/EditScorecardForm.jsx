
const EditScorecardForm = ({ scorecard, setIsEditMode }) => {

    const toggleEditMode = (e) => {
        e.stopPropagation();
        setIsEditMode((current) => !current);
    };
    return (
        <>
            <button type='button' className="edit-btn" onClick={toggleEditMode}>
                Hello World
            </button>
        </>
    );
};

export default EditScorecardForm;