import "./App.css";
import React from "react";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";


const initialInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const initialState = {
  input: initialInput,
  html: marked.parse(initialInput, {breaks: true}),
};

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.setState({
      input: e.target.value,
      html: marked.parse(e.target.value, {breaks: true}),
    });
  }

  componentDidMount() {
    applyClasses();
  }
  componentDidUpdate() {
    applyClasses();
  }

  render() {
    return (
      <div>
        <div className="Editor bg-dark text-bg-dark p-1">
          <h2>Editor</h2>
          <hr />
          <textarea
            className="form-control font-monospace"
            rows="10"
            id="editor"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </div>
        <div className="Previewer bg-secondary text-bg-secondary p-1">
          <h2>Preview</h2>
          <hr />
          <div id="preview" className="text-start" dangerouslySetInnerHTML={{__html: this.state.html}}></div>
        </div>
      </div>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Markdown Previewer</h1>
        <Editor />
      </div>
    );
  }
}

function applyClasses() {
  const tables = Array.from(document.getElementsByTagName('table'));
  tables.forEach((table) => {
    table.classList.add('table','table-dark','table-hover');
  })
  const images = Array.from(document.getElementsByTagName('img'));
  images.forEach((image) => {
    image.classList.add('img-fluid');
  });
  const codes = Array.from(document.getElementsByTagName('code'));
  codes.forEach((code) => {
    code.classList.add('bg-dark', 'p-1');
  });
  const pres = Array.from(document.getElementsByTagName('pre'));
  pres.forEach((pre) => {
    pre.classList.add('bg-dark', 'p-1');
  });
  const blockquotes = Array.from(document.getElementsByTagName('blockquote'));
  blockquotes.forEach((blockquote) => {
    blockquote.classList.add('blockquote');
  });
  const links = Array.from(document.getElementsByTagName('a'));
  links.forEach((link) => {
    link.classList.add('link-warning');
  });
}

export default App;
