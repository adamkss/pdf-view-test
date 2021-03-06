import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import Menu from "./views/menu";

import Embed from "./views/embed";
import GoogleViewer from "./views/google";
import SimpleLink from "./views/simpleLink";
import PDFJS from "./views/pdfjs";
import PSPDFKIT from "./views/pspdfkit";

const DOCUMENT_URL = "https://pdf-view-test.netlify.app/sample.pdf";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
          <Route
            exact
            path="/simpleLink"
            render={() => <SimpleLink documentURL={DOCUMENT_URL} />}
          />
          <Route
            exact
            path="/pdfjs"
            render={() => <PDFJS documentURL={"/test-pdf1.pdf"} />}
          />
          <Route
            exact
            path="/pspdfkit"
            render={() => <PSPDFKIT documentURL={"/sample.pdf"} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
