import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Embed from "./views/embed";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/embed" component={Embed}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
