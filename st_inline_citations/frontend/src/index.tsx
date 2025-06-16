import React from "react"
import ReactDOM from "react-dom"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

// 定义组件接收的参数类型
interface InlineCitationsProps {
  text: string;
}

/**
 * 这是一个 React 函数组件，它会渲染来自 Python 的文本，
 * 并将引用标记转换为可点击的元素。
 */
class InlineCitations extends StreamlitComponentBase<InlineCitationsProps> {
  private onCitationClick = (refNum: number): void => {
    Streamlit.setComponentValue(refNum)
  }

  // 处理文本，将引用标记替换为sup标签
  private preprocessText = (text: string): string => {
    return text.replace(/\[\^(\d+)\^]/g, (_match, p1) => {
      return `<sup data-ref="${p1}">[${p1}]</sup>`;
    });
  };

  public render = (): React.ReactNode => {
    const text: string = this.props.args["text"];
    const processedText = this.preprocessText(text);

    return (
      <div style={{display: "flex", flexDirection: "column"}}>
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
                      if (refNum) this.onCitationClick(Number(refNum));
                    }}
                    {...props}
                  >
                    {children}
                  </sup>
                );
              }
            }}
          >
            {processedText}
          </ReactMarkdown>
      </div>
    )
  }
}

// 使用 `withStreamlitConnection` 将你的组件连接到 Streamlit
const StreamlitInlineCitations = withStreamlitConnection(InlineCitations)

ReactDOM.render(
  <React.StrictMode>
    <StreamlitInlineCitations/>
  </React.StrictMode>,
  document.getElementById("root")
)