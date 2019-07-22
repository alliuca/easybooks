import { Dispatch } from 'redux';
import Cookies from 'js-cookie';
import { Api } from 'config';
import { ActionTypes } from 'actions/types';
const {
  FETCH_SETTINGS,
  SET_MESSAGES,
  CLEAR_ALL_MESSAGES,
  SAVE_SETTINGS,
  LOGIN,
  GET_LOGIN_TOKEN,
} = ActionTypes;

export interface Message {
  id: string;
  type: string;
  text: string | JSX.Element;
}

export interface SettingsData {
  brandColor: string;
  logo: string;
  locale: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SetMessagesAction {
  type: ActionTypes.SET_MESSAGES;
  payload: { obj: Message; remove: boolean };
}

export interface ClearAllMessagesAction {
  type: ActionTypes.CLEAR_ALL_MESSAGES;
}

export interface FetchSettingsAction {
  type: ActionTypes.FETCH_SETTINGS;
  payload: SettingsData;
}

export interface SaveSettingsAction {
  type: ActionTypes.SAVE_SETTINGS;
  payload: SettingsData;
}

export interface LoginAction {
  type: ActionTypes.LOGIN;
  payload: boolean;
}

export interface GetLoginToken {
  type: ActionTypes.GET_LOGIN_TOKEN;
  payload: boolean;
}

export type Action =
  | SetMessagesAction
  | ClearAllMessagesAction
  | FetchSettingsAction
  | SaveSettingsAction
  | LoginAction
  | GetLoginToken;

export const setMessages = (obj: Message, remove: boolean = false): SetMessagesAction => ({
  type: SET_MESSAGES,
  payload: {
    obj,
    remove,
  },
});

export const clearAllMessages = (): ClearAllMessagesAction => ({
  type: CLEAR_ALL_MESSAGES,
});

export const fetchSettings = () => async (dispatch: Dispatch) => {
  const res = await Api.get<SettingsData>('/settings');
  const settings = res.data;
  if (!settings.locale) settings.locale = 'en-GB';

  dispatch<FetchSettingsAction>({
    type: FETCH_SETTINGS,
    payload: settings,
  });
};

export const saveSettings = (data: SettingsData) => async (dispatch: Dispatch) => {
  await Api.post('/settings', data);

  dispatch<SaveSettingsAction>({
    type: SAVE_SETTINGS,
    payload: data,
  });
};

export const login = (data: LoginData) => async (dispatch: Dispatch) => {
  const login = await Api.post('/login', data);
  const { token, user } = login.data;

  if (token) Cookies.set('EasyBooksToken', token);

  dispatch<LoginAction>({
    type: LOGIN,
    payload: user ? true : false,
  });
};

export const getLoginToken = () => (dispatch: Dispatch) => {
  const token = Cookies.get('EasyBooksToken');

  dispatch<GetLoginToken>({
    type: GET_LOGIN_TOKEN,
    payload: token ? true : false,
  });
};
