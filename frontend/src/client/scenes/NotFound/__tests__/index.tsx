import * as React from 'react';
import { MemoryRouter } from 'react-router';
import * as renderer from 'react-test-renderer';
import NotFound from '../index';

describe('NotFound scene', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
