const Embed = () => {
  return (
    <embed
      src={process.env.PUBLIC_URL + "/sample.pdf"}
      width="100%"
      height="400"
      type="application/pdf"
    ></embed>
  );
};

export default Embed;
