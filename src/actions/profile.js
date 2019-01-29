import { Api } from 'config';
import { FETCH_PROFILE, SAVE_PROFILE } from 'actions/types';

export const fetchProfile = () => async dispatch => {
  const res = await Api.get('/profile');
  const profile = res.data;

  dispatch({
    type: FETCH_PROFILE,
    payload: profile,
  });
};

export const saveProfile = data => async dispatch => {
  await Api.post('/profile', data);

  dispatch({
    type: SAVE_PROFILE,
    payload: data,
  });
};
