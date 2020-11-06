import React from "react";
import PDFHolder from "../components/PDFHolder";

const GoogleViewer = ({ documentURL = "" }) => {
  return <IframeGoogleDocs url={documentURL} />;
};

export default GoogleViewer;

class IframeGoogleDocs extends React.Component {
  constructor(props) {
    super();
    this.bindActions();
  }
  bindActions() {
    this.updateIframeSrc = this.updateIframeSrc.bind(this);
    this.iframeLoaded = this.iframeLoaded.bind(this);
  }
  iframeLoaded() {
    clearInterval(this.iframeTimeoutId);
  }
  getIframeLink() {
    return `https://docs.google.com/viewer?url=${this.props.url}&embedded=true`; // no need for this if thats not dynamic
  }
  updateIframeSrc() {
    this.refs.iframe.src = this.getIframeLink();
  }
  componentDidMount() {
    this.iframeTimeoutId = setInterval(this.updateIframeSrc, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.iframeTimeoutId);
  }

  render() {
    return (
      <PDFHolder
        title="Google's Docs Viewer through an iframe"
        observations={[
          "✅ Works well on all browsers (mobile, desktop)",
          "✅ Possibility of embedding in our document structure",
          "❌ REDFLAG! Fails to load many times",
          "❌ HUGE REDFLAG! Nobody is sure whether this is maintained or official",
        ]}
      >
        <iframe
          title="PDF"
          onLoad={this.iframeLoaded}
          onError={this.updateIframeSrc}
          ref="iframe"
          style={{
            width: "100%",
            height: "100%",
          }}
          src={this.getIframeLink()}
        ></iframe>
      </PDFHolder>
    );
  }
}
