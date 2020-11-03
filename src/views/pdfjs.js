const PDFJS = ({ documentURL = "" }) => {
  return (
    <iframe
      title="PDF"
      src={`/pdfjs-2.5.207-es5-dist/web/viewer.html?file=${documentURL}`}
      width="100%"
      height="400px"
    ></iframe>
  );
};

export default PDFJS;
