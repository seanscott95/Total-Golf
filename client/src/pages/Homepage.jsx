import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ScorecardForm from '../components/ScorecardForm/ScorecardForm';
import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import spinner from '../assets/gif/Ghost.gif';

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { scorecard, isLoading, isError, message } = useSelector((state) => state.scorecard);

  useEffect(() => {
    if(!user) {
      navigate('/login');
    };

    if(isError) {
      console.log(message);
    };

    dispatch(getAllScorecards());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch]);

  if(isLoading) {
    return <img src={spinner} alt='Loading' />
  };

  return (
    <>
      <section className="heading">
        <h1>Welcome { user && user.username } !</h1>
        <p>Scorecard Dashboard</p>
      </section>
      <ScorecardForm />
    </>
  )
}

export default Homepage