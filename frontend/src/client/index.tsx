import App from 'client/scenes/App';
import createStore from 'client/store/createStore';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const preloadedState = window.__PRELOADED_STATE__;

 export const store = createStore(preloadedState);
const RootComponent: React.SFC<{}> = () => (
  <Provider store={store}>
    <Router>
    <MuiThemeProvider>
      <App />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

declare const module: Module;
type RenderFactory = (component: React.ComponentClass<any> | React.SFC<any>) => void;

if (__PROD__) {
    render(<RootComponent />, document.getElementById('app'));
} else {
  const { AppContainer } = require('react-hot-loader');
  const renderFactory: RenderFactory = Component => {
    render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('app')
    );
  };

  renderFactory(RootComponent);

  if (module.hot) {
    module.hot.accept('client/scenes/App', () => renderFactory(RootComponent));
  }
}
