import "./index.css";

import { Link, Route, Routes } from "react-router";
import AboutScreens from "./screens/about-screens";

function App() {
  return (
    <div className="flex justify-center items-center text-red-200">
      <Link to={"/about"}>About</Link>
      <Link to={"/about"}>Homes</Link>
      <Routes>
        <Route path="/" element={<div>Homes</div>} />
        <Route path="/about" element={<AboutScreens />} />
      </Routes>
    </div>
  );
}

export default App;
