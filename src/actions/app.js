import { Api } from 'config';
import {
  SET_MESSAGES,
  CLEAR_ALL_MESSAGES,
  FETCH_SETTINGS,
  SAVE_SETTINGS,
} from 'actions/types';

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

export const fetchSettings = () => async dispatch => {
  const res = await Api.get('/settings');
  const settings = res.data;

  dispatch({
    type: FETCH_SETTINGS,
    payload: settings,
  });
}

export const saveSettings = data => async dispatch => {
  await Api.post('/settings', data);

  dispatch({
    type: SAVE_SETTINGS,
    payload: data,
  });
}
