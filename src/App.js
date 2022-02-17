import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/home";
import MainLayout from "./layouts/main";

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
