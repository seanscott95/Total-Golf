import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/Profile" />
        <Route path="/History" />
        <Route path="/Leaderboard" />
      </Routes>
    </Router>
  );
}

export default App;
