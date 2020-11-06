import PDFHolder from "../components/PDFHolder";

const SimpleLink = ({ documentURL = "" }) => {
  return (
    <PDFHolder
      title="Simple link to the document"
      observations={[
        "✅/❓ Works well on Desktop as it opens the PDF in a separate tab in the browser's PDF plugin",
        "✅/❓ On Mobile it downloads the PDF and opens it automatically with the platform's default PDF viewer",
        "✅ Trusting the platform with showing the PDF. This means no maintanence or risks from our side",
        "❌ Not able to embed this in our document/webpage structure",
      ]}
    >
      <a
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        href={documentURL}
        target="_blank"
        rel="noreferrer"
      >
        Explore the PDF!
      </a>
    </PDFHolder>
  );
};

export default SimpleLink;
