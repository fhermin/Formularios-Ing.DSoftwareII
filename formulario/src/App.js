import './App.css';
import Lists from "./Components/Lists.js";
import Crear from "./Components/Create.js";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";



function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="nav navbar-nav">
                <Link className="nav-item nav-link active" to={"/sistema"}>Sistema </Link>
            </div>
        </nav>
      <div className="container">
        <br></br>

        <Route exact path="/" component={Crear}></Route>
        <Route path='/sistema' component={Lists}></Route>
      </div>
    </Router>
  );
}

export default App;