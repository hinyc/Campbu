import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reset from './reset';

ReactDOM.render(
  <React.StrictMode>
    <Global styles={reset} />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
