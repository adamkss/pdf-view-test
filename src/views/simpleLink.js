const SimpleLink = ({ documentURL = "" }) => {
  return (
    <a href={documentURL} target="_blank" rel="noreferrer">
      Explore the PDF!
    </a>
  );
};

export default SimpleLink;
