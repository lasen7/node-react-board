import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';

import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('containers/App', () => {
    const NextApp = require('containers/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}