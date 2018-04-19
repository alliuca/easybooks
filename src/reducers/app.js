import {
  SET_MESSAGES,
  CLEAR_ALL_MESSAGES,
  FETCH_SETTINGS,
  SAVE_SETTINGS,
} from 'actions/types';

const initialState = {
  messages: [],
  settings: {
    brandColor: '#40a9ff',
    logo: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      const { messages } = state;
      const newMessages = action.payload.remove ? messages.filter(message => message.id !== action.payload.obj.id) : [...messages, action.payload.obj];
      return { ...state, messages: newMessages };
    case CLEAR_ALL_MESSAGES:
      return { ...state, messages: [] };
    case FETCH_SETTINGS:
    case SAVE_SETTINGS:
      return { ...state, settings: action.payload }
    default:
      return state;
  }
}
