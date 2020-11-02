import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Menu from "./views/menu";

import Embed from "./views/embed";
import GoogleViewer from "./views/google";

const DOCUMENT_URL = "https://pdf-view-test.netlify.app/sample.pdf";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" render={() => <Menu />} />
            <Route
              exact
              path="/embed"
              render={() => <Embed documentURL={DOCUMENT_URL} />}
            />
            <Route
              exact
              path="/google"
              render={() => <GoogleViewer documentURL={DOCUMENT_URL} />}
            />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
