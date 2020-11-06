import { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";

import PDFHolder from "../components/PDFHolder";

const BASE_URL_FOR_PUBLIC_FILES = `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`;

const PSPDFKIT = ({ documentURL = "" }) => {
  const container = useRef(null);

  useEffect(() => {
    PSPDFKit.load({
      container: container.current,
      document: documentURL,
      licenseKey: process.env.REACT_APP_PSPDFKIT_LICENSE,
      baseUrl: BASE_URL_FOR_PUBLIC_FILES,
    })
      .then((instance) => {
        console.log("PSPDFKit loaded", instance);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [documentURL]);

  return (
    <PDFHolder title="PSPDFKIT" observations={["Nothing yet."]}>
      <div
        style={{
          height: "100%",
        }}
        ref={container}
      ></div>
    </PDFHolder>
  );
};

export default PSPDFKIT;
