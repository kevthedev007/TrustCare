import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUpClient from "./components/SignUpClient";
import SignUpTherapist from "./components/SignUpTherapist";
import ErrorPage from "./components/ErrorPage";
import LogInClient from './components/LogInClient'
import LogInTherapist from './components/LogInTherapist'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signupClient" component={SignUpClient} />
        <Route path="/signupTherapist" component={SignUpTherapist} />
        <Route path="/loginClient" component={LogInClient} />
        <Route path="/loginTherapist" component={LogInTherapist} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
