// @flow
import Cookies from 'js-cookie';
import { Api } from 'config';
import type { Dispatch } from 'config/flowtypes';
import {
  SET_MESSAGES,
  CLEAR_ALL_MESSAGES,
  FETCH_SETTINGS,
  SAVE_SETTINGS,
  LOGIN,
} from 'actions/types';

export type SetMessages = { type: SET_MESSAGES, payload: { obj: Object, remove: boolean } };
export type ClearAllMessages = { type: CLEAR_ALL_MESSAGES };
export type Action = SetMessages | ClearAllMessages;

export const setMessages = (obj: Object, remove: boolean = false): SetMessages => ({
  type: SET_MESSAGES,
  payload: {
    obj,
    remove,
  },
});

export const clearAllMessages = (): ClearAllMessages => ({
  type: CLEAR_ALL_MESSAGES,
});

export const fetchSettings = () => async (dispatch: Dispatch) => {
  const res = await Api.get('/settings');
  const settings = res.data;

  dispatch({
    type: FETCH_SETTINGS,
    payload: settings,
  });
};

export const saveSettings = (data: Object) => async (dispatch: Dispatch) => {
  await Api.post('/settings', data);

  dispatch({
    type: SAVE_SETTINGS,
    payload: data,
  });
};

export const login = (data: Object) => async (dispatch: Dispatch) => {
  const login = await Api.post('/login', data);
  const { token, user } = login.data;

  if (token) Cookies.set('EasyBooksToken', token);

  dispatch({
    type: LOGIN,
    payload: user ? true : false,
  });
};
