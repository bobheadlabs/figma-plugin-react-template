import * as React from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const App = () => {
  const textbox = React.useRef<HTMLInputElement>(undefined);

  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  const onCreate = React.useCallback(() => {
    const count = parseInt(textbox.current.value, 10);
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
  }, []);

  const onCancel = React.useCallback(() => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  }, []);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <img alt="logo" src={require('../assets/logo.svg')} />
      <h2>Rectangle Creator</h2>
      <p>
        Count:
        {' '}
        <input ref={countRef} />
      </p>
      <button id="create" onClick={onCreate} type="button">
        Create
      </button>
      <button onClick={onCancel} type="button">Cancel</button>
    </div>
  );
};

export default App;
