import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar/Navbar";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Personal from './pages/Personal';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
