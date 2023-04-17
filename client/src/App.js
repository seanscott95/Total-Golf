import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Homepage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Personal from './pages/Personal';
import Scores from './pages/Scores';
import CreateScorecardQP from './pages/CreateScorecardQP';
import CreateScorecard from './pages/CreateScorecard';
import LeaderBoard from './pages/LeaderBoard';
import ViewScorecard from './pages/ViewScorecard';
import PrivateRoutes from './utils/auth/PrivateRoutes';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route element={<PrivateRoutes user={user} />}>
              <Route path='/' element={<Homepage />} />
              <Route path='/personal' element={<Personal />} />
              <Route path='/scores' element={<Scores />} />
              <Route path='/createScorecardQP' element={<CreateScorecardQP />} />
              <Route path='/createScorecard' element={<CreateScorecard />} />
              <Route path='/leaderBoard' element={<LeaderBoard />} />
              <Route path='/viewScorecard/:scorecardId' element={<ViewScorecard />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
