import ScorecardForm from '../components/ScorecardForm/ScorecardForm';

const CreateScorecardQP = () => {
  return (
    <div className='scorecard-page-container'>
      <div className='page-container'>
        <ScorecardForm queensPark={true}/>
      </div>
    </div>
  )
}

export default CreateScorecardQP