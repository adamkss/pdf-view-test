import PDFHolder from "../components/PDFHolder";

const Embed = ({ documentURL = "" }) => {
  return (
    <PDFHolder
      title="Using the HTML <embed> tag"
      observations={[
        "✅ Works well on all Desktop browsers",
        "✅ Possibility of embedding in our document structure",
        "❌ Fails on all Mobile browsers",
      ]}
    >
      <embed
        src={documentURL}
        width="100%"
        height="100%"
        type="application/pdf"
      ></embed>
    </PDFHolder>
  );
};

export default Embed;
