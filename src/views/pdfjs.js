import PDFHolder from "../components/PDFHolder";

const PDFJS = ({ documentURL = "" }) => {
  return (
    <PDFHolder
      title="Mozilla's PDF.js lib (renderer)"
      observations={[
        "✅ Works well on all browsers (mobile, desktop)",
        "✅ Possibility of embedding in our document structure",
        "❓ Might be slower than other solutions at rendering",
        "❓ Might need manual maintenance/ library bump",
      ]}
    >
      <iframe
        title="PDF"
        src={`/pdfjs-2.5.207-es5-dist/web/viewer.html?file=${documentURL}`}
        width="100%"
        height="100%"
      ></iframe>
    </PDFHolder>
  );
};

export default PDFJS;
