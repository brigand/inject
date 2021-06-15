import React from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import styled from '@emotion/styled';
import andromeda from '../theme/andromeda-monaco.json';

const Root = styled.div`
  height: 100%;
`;

const Inner = styled.div`
  height: 100%;
`;

// let promise = null;
// let monaco = null;

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};

let registeredTheme = false;

function useResize(resize, editorRef) {}

function Editor(props) {
  const containerRef = React.useRef();
  const editorRef = React.useRef();

  const init = () => {
    if (!registeredTheme) {
      monaco.editor.defineTheme('andromeda', andromeda);
      registeredTheme = true;
    }

    const ed = monaco.editor.create(containerRef.current, {
      value: `// This is an example
const f = () => location.href.toLowerCase();
console.log(f());
const div = <div className={css.foo}>Hello, world!</div>;
`,
      language: 'javascript',
      theme: 'andromeda',
      fontSize: '16px',
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false,
      },
    });

    editorRef.current = ed;
  };

  props.resize.use(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  });

  React.useEffect(() => {
    if (monaco) {
      init();
    } else {
      if (!promise) {
        // promise = import('monaco-editor/esm/vs/editor/editor.main.js').then((mod) => {
        // promise = import('monaco-editor/dev/vs/editor/editor.main.js').then((mod) => {
        // monaco = { ...mod };
        // });
      }

      promise.then(init);
    }
  }, []);

  return (
    <Root>
      <Inner ref={containerRef} />
    </Root>
  );
}

export default Editor;