import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import 'katex/dist/katex.min.css';
import {preprocessLaTeX} from "../utils/preprocess";

interface TextContainerProps {
  text: string;
  think: boolean;
  onCitationClick: (refNum: number) => void;
}

const TextContainer: React.FC<TextContainerProps> = ({ text, think, onCitationClick }) => {
  text = preprocessLaTeX(text);
  return <div className={`container${think ? " think" : ""}`}>
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkMath]}
      components={{
        a: ({node, children, ...props}) => (
          <a {...props} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
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
};

export default TextContainer;