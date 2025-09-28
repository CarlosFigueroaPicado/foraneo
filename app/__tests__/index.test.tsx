import * as React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../index';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

describe('HomeScreen', () => {
  it('renderiza correctamente', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toBeTruthy();
  });
});
