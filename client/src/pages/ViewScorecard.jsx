
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import ScorecardCard from "../components/ScorecardCard/ScorecardCard";
import spinner from '../assets/gif/Ghost.gif';

const ViewScorecard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { scores, isLoading, isError, message } = useSelector((state) => state.scores);

  const { scorecardId } = useParams();

  const scorecard = scores?.filter((obj) => {
    return obj._id === scorecardId;
  })[0];

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    };
    if (isError) {
      console.log(`Error: ${message}`);
    };
    if (user) {
      dispatch(getAllScorecards());
    };
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <img src={spinner} alt='Loading' />
  };

  return (
    <div className="page-container">
      <ScorecardCard scorecard={scorecard} />
    </div>
  );
};

export default ViewScorecard;