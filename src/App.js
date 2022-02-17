import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/home";
import Punks from "./views/punks";
import MainLayout from "./layouts/main";

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/punks" exact component={Punks}/>
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
