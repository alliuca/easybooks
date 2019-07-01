import { createContext } from 'react';
import { setMessages } from 'actions/app';

interface PageContext {
  setMessages: typeof setMessages;
}

export const { Provider, Consumer } = createContext<PageContext | null>(null);
