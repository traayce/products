import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NotFound: React.SFC<RouteComponentProps<{}>> = () => {
  return (
    <div>
      <h1>404</h1>
      <p>The page you're looking for cannot be found</p>
    </div>
  );
};

export default NotFound;
