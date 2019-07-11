import { Message, SettingsData, Action } from 'actions/app';
import { ActionTypes } from 'actions/types';
const { SET_MESSAGES, CLEAR_ALL_MESSAGES, FETCH_SETTINGS, SAVE_SETTINGS, LOGIN } = ActionTypes;

export interface AppState {
  messages: Message[];
  settings: SettingsData;
  loggedIn: boolean | null;
}

const initialState: AppState = {
  messages: [],
  settings: {
    brandColor: '#40a9ff',
    logo: '',
  },
  loggedIn: null,
};

export default (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case SET_MESSAGES:
      const { messages } = state;
      const newMessages = action.payload.remove
        ? messages.filter((message: Message) => message.id !== action.payload.obj.id)
        : [...messages, action.payload.obj];
      return { ...state, messages: newMessages };
    case CLEAR_ALL_MESSAGES:
      return { ...state, messages: [] };
    case FETCH_SETTINGS:
    case SAVE_SETTINGS:
      return { ...state, settings: action.payload };
    case LOGIN:
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};
