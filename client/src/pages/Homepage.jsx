import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ScorecardForm } from '../components/ScorecardForm/ScorecardForm';

function Homepage() {
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login');
    };
  }, [user, navigate]);

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