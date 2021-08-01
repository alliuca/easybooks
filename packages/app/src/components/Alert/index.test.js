import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Alert from './';

jest.mock('providers/Page/context', () => {
  const setMessages = jest.fn();
  return {
    Consumer: props => props.children({ setMessages }),
  };
});

describe('<Alert />', () => {
  it('renders', () => {
    const { container } = render(<Alert data={{ text: 'Success' }} />);
    expect(container).toBeDefined();
  });

  it('calls setMessages with remove flag when closed', async () => {
    const component = render(<Alert data={{ text: 'Success' }} />);
    const closeBtn = component.container.querySelector('.ant-alert-close-icon');
    fireEvent.click(closeBtn);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(component.container).toEqual(render(<div />).container.firstChild);
  });
});
