import LoginHospital from './LoginHospital';
import HospitalMain from './HospitalMain';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
  
function App() {
  const token = localStorage.getItem("accressToken");

  if(!token){
    return<LoginHospital />
  }
  return (
    <div className="wrapper">
      {/* <BrowserRouter>
        <Switch>
          <Route path="/">
            <HospitalMain />
          </Route>
          <Route path="/dashboard">
            <HospitalMain />
          </Route>
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
