import styled from "styled-components";
import { Link } from "react-router-dom";
import Observations from "../components/Observations";

const Header = styled.header`
  padding: 1em;
`;

const Title = styled.h1`
  font-weight: 700;
`;

const PlaceHolder = styled.div`
  height: 0.7rem;
`;

const BackLink = styled(Link)`
  font-weight: bold;
`;

const PDFWrapper = styled.article`
  height: 70vh;
  max-height: 600px;
`;

const PDFHolder = ({ title = "", children, observations = [] }) => {
  return (
    <div>
      <Header>
        <Title>{title}</Title>
        <PlaceHolder />
        <BackLink to="/">Explore Other Options</BackLink>
      </Header>
      <PDFWrapper>{children}</PDFWrapper>
      {observations.length > 0 && <Observations observations={observations} />}}
    </div>
  );
};

export default PDFHolder;
