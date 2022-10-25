import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from "./components/Navbar/Navbar";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Personal from './pages/Personal';
import Leaderboard from './pages/Leaderboard';
import PrivateRoutes from "./utils/auth/PrivateRoutes";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoutes user={user} />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/Leaderboard" element={<Leaderboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
