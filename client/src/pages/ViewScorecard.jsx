
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { getAllScorecards, reset } from '../utils/scorecard/scorecardSlice';
import ScorecardCard from "../components/ScorecardCard/ScorecardCard";
import EditScorecardForm from "../components/EditScorecardForm/EditScorecardForm";
import spinner from '../assets/gif/Ghost.gif';
import { getUserCheckExpiry } from '../utils/helper/getUserCheckExpiry';

const ViewScorecard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

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
    const isValid = getUserCheckExpiry(user)
    if (!isValid) {
      localStorage.removeItem("user");
      window.location.reload();
    };
    if (user) {
      dispatch(getAllScorecards());
    };
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div className="page-container">
      {isLoading ? (
        <img src={spinner} alt='Loading' className="spinner" />
      )
        : (!isEditMode ?
          <>
            <ScorecardCard
              scorecard={scorecard}
              showEditBtn="true"
              setIsEditMode={setIsEditMode}
            />
          </>
          :
          <>
            <EditScorecardForm
              scorecard={scorecard}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode} />
          </>
        )
      }

    </div>
  );
};

export default ViewScorecard;