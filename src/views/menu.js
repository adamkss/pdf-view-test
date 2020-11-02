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
    </Nav>
  );
};

export default Menu;
