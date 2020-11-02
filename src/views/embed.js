const Embed = ({ documentURL = "" }) => {
  return (
    <embed
      src={documentURL}
      width="100%"
      height="400"
      type="application/pdf"
    ></embed>
  );
};

export default Embed;
