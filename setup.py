from os.path import dirname
from os.path import join
import setuptools


def readme() -> str:
    """Utility function to read the README file.
    Used for the long_description.  It's nice, because now 1) we have a top
    level README file and 2) it's easier to type in the README file than to put
    a raw string in below.
    :return: content of README.md
    """
    return open(join(dirname(__file__), "readme.md"), encoding="utf-8").read()


setuptools.setup(
    name="streamlit-inline-citations",
    version="0.0.4",
    author="liuzhongnuo",
    description="streamlit custom components for inline citations",
    long_description=readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/umbrella-leaf/StreamlitInlineCitations.git",
    packages=setuptools.find_packages(),
    include_package_data=True,
    python_requires=">=3.8",
    install_requires=[
        "streamlit >= 1.12.0",
    ],
)
