import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface TextContainerProps {
  text: string;
  think: boolean;
  onCitationClick: (refNum: number) => void;
}

const TextContainer: React.FC<TextContainerProps> = ({ text, think, onCitationClick }) => (
  <div className={`container${think ? " think" : ""}`}>
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        sup: ({node, children, ...props}) => {
          const refNum = node?.properties?.["dataRef"];
          return (
            <sup
              style={{
                color: "#0068C9",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.8em",
                margin: "0 2px",
                verticalAlign: "super",
                userSelect: "none",
              }}
              onClick={() => {
                if (refNum) onCitationClick(Number(refNum));
              }}
              {...props}
            >
              {children}
            </sup>
          );
        }
      }}
    >
      {text}
    </ReactMarkdown>
  </div>
);

export default TextContainer;