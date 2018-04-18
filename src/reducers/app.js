import { SET_MESSAGES, CLEAR_ALL_MESSAGES } from 'actions/types';

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      const { messages } = state;
      const newMessages = action.payload.remove ? messages.filter(message => message.id !== action.payload.obj.id) : [...messages, action.payload.obj];
      return {...state, messages: newMessages };
    case CLEAR_ALL_MESSAGES:
      return {...state, messages: [] };
    default:
      return state;
  }
}
