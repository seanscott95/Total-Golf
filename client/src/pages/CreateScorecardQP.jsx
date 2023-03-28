import ScorecardForm from '../components/ScorecardForm/ScorecardForm';

function CreateScorecardQP() {
  return (
    <div className='scorecard-page-container'>
      <div className="page-container">
        <ScorecardForm queensPark={true}/>
      </div>
    </div>
  )
}

export default CreateScorecardQP