import type { ReactNode } from 'react';
import { MediaQueryComponent } from '..';
import { render, screen } from '@testing-library/react-native';
import ReactNative, { Text } from 'react-native';
import '@testing-library/react-native/extend-expect';

describe('MediaQueryComponent', () => {
  it('should accept empty query', () => {
    const WrappedComponent = <Text>Testing Wrapped Component</Text>;
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MediaQueryComponent>{children}</MediaQueryComponent>
    );
    render(WrappedComponent, { wrapper });
    const result = screen.queryByText(/Testing Wrapped Component/);
    expect(result).toBeOnTheScreen();
    expect(result).toHaveTextContent('Testing Wrapped Component');
  });

  it('should not return children when query fail', () => {
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 200,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    const WrappedComponent = <Text>Testing Wrapped Component</Text>;
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MediaQueryComponent breakpoint="lg" minPixelRatio={1}>
        {children}
      </MediaQueryComponent>
    );
    render(WrappedComponent, { wrapper });
    const result = screen.queryByText(/Testing Wrapped Component/);
    expect(result).not.toBeOnTheScreen();
    expect(result).toBeNull();
  });

  it('should return fallback if given when query fail', () => {
    jest.spyOn(ReactNative, 'useWindowDimensions').mockImplementation(() => ({
      width: 200,
      height: 1,
      scale: 1,
      fontScale: 1,
    }));
    const WrappedComponent = <Text>Testing Wrapped Component</Text>;
    const FallbackComponent = <Text>Testing Fallback Component</Text>;
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MediaQueryComponent breakpoint="lg" fallback={FallbackComponent}>
        {children}
      </MediaQueryComponent>
    );
    render(WrappedComponent, { wrapper });
    const result = screen.queryByText(/Testing Wrapped Component/);
    expect(result).not.toBeOnTheScreen();
    expect(result).toBeNull();

    const fallback = screen.queryByText(/Testing Fallback Component/);
    expect(fallback).toBeOnTheScreen();
    expect(fallback).toHaveTextContent('Testing Fallback Component');
  });
});
