import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 1em;
  display: flex;
  flex-direction: column;
  a ~ a {
    margin-top: 15px;
  }
`;

const Menu = () => {
  return (
    <Nav>
      <Link to="/embed">
        Using <code>{"<embed>"}</code>
      </Link>
      <Link to="/google">
        Using <code>{"<iframe>"} </code>with Google PDF Visualizer
      </Link>
      <Link to="/simpleLink">
        Using a simple link (<code>{"<a>"}</code>)
      </Link>
      <Link to="/pdfjs">
        Using Mozilla's renderer: <code>PDF.js</code>
      </Link>
      <Link to="/pspdfkit">
        Using <code>PSPDFKIT</code>
      </Link>
    </Nav>
  );
};

export default Menu;
