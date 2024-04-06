import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Map />} />
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
