import "./index.css";

import { Link } from "react-router";

function App() {
  return (
    <div className="">
      <Link to={"/about"}>About</Link>
      <Link to={"/about"}>Homes</Link>
    </div>
  );
}

export default App;
