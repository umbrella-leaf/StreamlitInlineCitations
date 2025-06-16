# st_inline_citations

## Usage
```python
import streamlit as st
from st_inline_citations import inline_citations

valorant_text = """
在《Valorant》中，“空岛”指的是 **义境空岛**（Ascent），也被称为亚海悬城[^6^][^8^]。
这张地图以意大利为背景，整体风格现代且富有科技感，地图中间有一个双方队伍可以争夺的广大区域。
这是一个非常长的句子，用来演示当文本足够长时，它会自动换行，并且旁边的回调按钮[^11^]也会跟着一起换行，而不会破坏布局。
你可以调整浏览器窗口大小来观察这个效果[^123^]。
"""
clicked_ref = inline_citations(valorant_text, key="valorant")

if clicked_ref:
    st.success(f"后端接收到点击信号！你点击了引用: **{clicked_ref}**")
else:
    st.info("请点击文本中的引用标记。")
```