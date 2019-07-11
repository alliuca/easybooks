import { createContext } from 'react';
import { Message, setMessages } from 'actions/app';
import { Props } from './index';

export interface PageContextProps {
  messages: Message[];
  setMessages: typeof setMessages;
  goTo: Props['goTo'];
}

const context = createContext<PageContextProps | null>(null);
export const PageContext = context;
export const { Provider, Consumer } = PageContext;
