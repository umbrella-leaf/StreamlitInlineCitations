import React from "react"
import ReactDOM from "react-dom"
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import TextContainer from "./ts/text-container"

interface InlineCitationsProps {
  think: string;
  text: string;
}

class InlineCitations extends StreamlitComponentBase<InlineCitationsProps> {
  private onCitationClick = (refNum: number): void => {
    Streamlit.setComponentValue(refNum)
  }

  private preprocessText = (text: string): string => {
    return text.replace(/\[\^(\d+)\^]/g, (_match, p1) => {
      return `<sup data-ref="${p1}">[${p1}]</sup>`;
    });
  };

  public render = (): React.ReactNode => {
    const text: string = this.props.args["text"];
    const thinkText: string = this.props.args["think_text"];
    const processedText = this.preprocessText(text);
    const processedThinkText = this.preprocessText(thinkText);

    return (
      <>
        {processedThinkText && processedThinkText.trim() !== "" && (
        <TextContainer
          text={processedThinkText}
          think={true}
          onCitationClick={this.onCitationClick}
        />
        )}
        <TextContainer
        text={processedText}
        think={false}
        onCitationClick={this.onCitationClick}
        />
      </>
    )
  }
}

const StreamlitInlineCitations = withStreamlitConnection(InlineCitations)

ReactDOM.render(
  <React.StrictMode>
    <StreamlitInlineCitations/>
  </React.StrictMode>,
  document.getElementById("root")
)