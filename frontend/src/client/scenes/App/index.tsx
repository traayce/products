import PrivateRoute from 'client/components/PrivateRoute';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import createLazyContainer from 'react-lazy-import';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './normalize.scss';
import * as style from './style.scss';
const Loading = () => <div>loading</div>;
const Error = () => <div>error</div>;

const Products = createLazyContainer<RouteComponentProps<{}>>(
  () => import(
    'client/scenes/Products'
  ), Loading, Error
);
const NotFound = createLazyContainer<RouteComponentProps<{}>>(
  () => import(
    /* webpackChunkName: 'NotFound' */
    'client/scenes/NotFound'
  ), Loading, Error
);

interface IState {
  hasError: boolean;
}

class App extends React.Component<{}, IState> {
  public state: IState = {
    hasError: false
  };

  public componentDidCatch () {
    this.setState({ hasError: true });
  }

  public render () {
    if (this.state.hasError) {
      return (
        <div>
          Whoops! This app broke :(
        </div>
      );
    }

    return (
      <div style={{height: '100%'}}>
        <div className={style.appShell}>
        <Helmet
          titleTemplate='%s - Products'
          defaultTitle='Products'
        />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Products} />
          <Route path='/products' component={Products} />
          <Route component={NotFound} />
        </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
