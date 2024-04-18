import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Map from "./pages/Map";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
