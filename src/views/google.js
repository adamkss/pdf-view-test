import React from "react";

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
  render() {
    return (
      <iframe
        title="PDF"
        onLoad={this.iframeLoaded}
        onError={this.updateIframeSrc}
        ref="iframe"
        style={{
          width: "100%",
          height: 600,
        }}
        src={this.getIframeLink()}
      ></iframe>
    );
  }
}
