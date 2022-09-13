import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Nav from "./Components/NavBar"
import Home from './Components/Home';
import LandingPage from './Components/Landing';
import CountryDetail from './Components/CountryDetail';
import CreateActivity from './Components/CreateActivity';

function App() {
  return (
    <Router>
      <div id="Router">
    <Nav></Nav>
    <Switch>
      <Route exact path={"/"} component={LandingPage}/>
      <Route exact path={"/home"} component={Home} />
      {/* <Route exact path={"/createActivity"} component={CreateActivity}/> */}
      <Route path={"/:country"} component={CountryDetail}/>
    </Switch>
      </div>
    </Router>
  );
}

export default App;
