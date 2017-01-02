import React from 'react';
import ReactDOM from 'react-dom';
import { App, Signin, Signup, Event, Events, Home } from 'containers';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';

import store from './store';

const rootEl = document.getElementById('root');

// ReactDOM.render(
//   <AppContainer>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </AppContainer>,
//   rootEl
// );

// if (module.hot) {
//   module.hot.accept('containers/App', () => {
//     const NextApp = require('containers/App').default;
//     ReactDOM.render(
//       <AppContainer>
//         <Provider store={store}>
//           <NextApp />
//         </Provider>
//       </AppContainer>,
//       rootEl
//     );
//   });
// }

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="auth/login" component={Signin} />
        <Route path="auth/register" component={Signup} />
        <Route path="events" component={Events} />
        <Route path="event/:eventId/:ask" component={Event} />
      </Route>
    </Router>
  </Provider>, rootEl);

  //<Route path="event/:eventId/ask" component={Event} />        
  //<Route path="event/:eventId/profile" component={Event} />

// if (module.hot) {
//   module.hot.accept('containers/App', () => {
//     const NextApp = require('containers/App').default;
//     ReactDOM.render(
//       <AppContainer>
//         <Provider store={store}>
//           <NextApp />
//         </Provider>
//       </AppContainer>,
//       rootEl
//     );
//   });
// }
