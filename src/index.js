import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { browserHistory, Router } from 'react-router';
import routes from './routes';

const MOUNT_NODE = document.getElementById('root');
const App = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

render(App, MOUNT_NODE);

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(<AppContainer>{App}</AppContainer>, MOUNT_NODE);
  });
}
