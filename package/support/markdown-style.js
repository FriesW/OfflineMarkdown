var markdown_style =
`body {
    background-color: #e4e4e4;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
    margin-left: 1.5%;
    margin-right: 1.5%;
}
#_markdown_content_body {
    max-width: 52em;
    min-width: 12em;
    border: 1px solid grey;
    background-color: white;
    padding: 1.2em;
    margin-left: auto;
    margin-right: auto;
}
hr {
    border: 0;
    height: 3px;
    background-color: #d0d0d0;
}
h1+hr, h2+hr, h3+hr, h4+hr, h5+hr, h6+hr {
    position: relative;
    top: -1.2em;
    margin: 0;
    height: 1px;
    background-color: black;
}
h1+hr+*, h2+hr+*, h3+hr+*, h4+hr+*, h5+hr+*, h6+hr+* {
    margin-top: 0;
}
img {
    max-width: 100%;
}
a {
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}
blockquote {
    margin: 0;
    padding: 0.5em 2em;
    background-color: #f4f4f4;
    border-left: 0.4em solid #c6c6c6;
    color: #636363;
}
blockquote p {
    margin: 0;
}
pre {
    padding: 0.7em;
    overflow: auto;
}
code {
    padding: 0.1em 0.2em;
    border-radius: 0.3em;
    background-color: #e0e0d9;
    display: inline-block;
}
pre, pre code {
    background-color: #f4f4f4;
}
table {
    border-collapse: collapse;
    display: block;
    overflow: auto;
}
th, td {
    padding: 0.4em;
    border: 1px solid #bababa;
}
th {
    background-color: #dadada;
}
tr:nth-child(even) {
    background-color: #f4f4ff;
}`;