import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ScoreCard from '../components/ScoreCard/ScoreCard';
import { getAllPersonal, reset } from '../utils/personal/personalSlice';
import spinner from '../assets/gif/Ghost.gif';

function Personal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { personal, isLoading, isError, message } = useSelector((state) => state.personal);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    };

    if (isError) {
      console.log(`Error: ${message}`);
    };

    if (user) {
      dispatch(getAllPersonal(user.username));
    };

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div>
      <section className="heading">
        <h1>Personal Scores</h1>
        <p>Welcome {user && user.username} !</p>
      </section>

      {isLoading ? (
        <img src={spinner} alt='Loading' />
      ) : (
        <section className='content'>
          {personal.length > 0 ? (
            <div className='scores'>
              {personal.map((item) => (
                <ScoreCard key={item._id} score={item} />
              )).reverse()}
            </div>
          ) : (
            <h3>There are no scorecards!</h3>
          )}
        </section>
      )}
    </div>
  )
}

export default Personal