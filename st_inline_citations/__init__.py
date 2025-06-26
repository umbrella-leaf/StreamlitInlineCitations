import os
import streamlit.components.v1 as components
import streamlit as st

# 检查是在开发环境还是生产环境
_RELEASE = True  # 正式发布时设为 True

if not _RELEASE:
    # 开发模式：从 React 开发服务器加载前端
    _inline_citations_func = components.declare_component(
        "inline_citations",
        url="http://localhost:3000",
    )
else:
    # 生产模式：从静态构建文件加载前端
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _inline_citations_func = components.declare_component("inline_citations", path=build_dir)

def inline_citations(text: str, think_text: str = "", key: str=None):
    """
    创建一个可以渲染带内联、可点击引用标记的文本组件。

    参数
    ----------
    text: str
        要显示的文本，包含 [^数字^] 格式的引用标记。
    key: str or None
        Streamlit 组件的唯一键。

    返回
    -------
    str or None
        如果用户点击了一个引用标记，则返回该引用的编号（字符串格式）。
        否则返回 None。
    """
    component_value = _inline_citations_func(text=text, think_text=think_text, key=key, default=None)
    return component_value

# (可选) 添加一个小小的测试用例，方便直接运行这个文件来测试
if __name__ == "__main__":
    st.set_page_config(layout="wide")
    st.title("自定义内联引用组件测试")

    valorant_text = "在《Valorant》中，“空岛”指的是义境空岛（Ascent），也被称为亚海悬城[^6^][^8^]。这张地图以意大利为背景，整体风格现代且富有科技感，地图中间有一个双方队伍可以争夺的广大区域。这是一个非常长的句子，用来演示当文本足够长时，它会自动换行，并且旁边的回调按钮[^11^]也会跟着一起换行，而不会破坏布局。你可以调整浏览器窗口大小来观察这个效果[^123^]。"

    st.subheader("组件使用示例")
    with st.container(border=True):
        clicked_ref = inline_citations(valorant_text, key="valorant")

    st.subheader("后端信号接收")
    if clicked_ref:
        st.success(f"后端接收到点击信号！你点击了引用: **{clicked_ref}**")
    else:
        st.info("请点击文本中的引用标记。")