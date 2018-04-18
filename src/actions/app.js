import { SET_MESSAGES, CLEAR_ALL_MESSAGES } from 'actions/types';

export const setMessages = (obj, remove = false) => ({
  type: SET_MESSAGES,
  payload: {
    obj,
    remove,
  }
});

export const clearAllMessages = () => ({
  type: CLEAR_ALL_MESSAGES,
});
