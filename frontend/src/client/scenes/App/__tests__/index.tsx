import * as React from 'react';
import { MemoryRouter } from 'react-router';
import * as renderer from 'react-test-renderer';

/**
 * Node doesn't have System.import, so we have to mock it
 */
(global as any).System = {
  import (path: string) {
    return new Promise((resolve, reject) => {
      resolve({ default: () => <div>{path}</div> });
    });
  }
};

import App from '../index';


describe('App scene', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
