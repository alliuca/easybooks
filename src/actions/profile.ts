import { Api } from 'config';
import { Dispatch } from 'redux';
import { ActionTypes } from 'actions/types';
const { FETCH_PROFILE, SAVE_PROFILE } = ActionTypes;

export interface Profile {
  name: string;
  website: string;
  taxCode: string;
  vat: string;
  phone: string;
  email: string;
  addressStreet: string;
  addressCity: string;
  addressCountry: string;
  postalCode: string;
}

export type Action = FetchProfileAction | SaveProfileAction;

export interface FetchProfileAction {
  type: ActionTypes.FETCH_PROFILE;
  payload: Profile;
}

export interface SaveProfileAction {
  type: ActionTypes.SAVE_PROFILE;
  payload: Profile;
}

export const fetchProfile = () => async (dispatch: Dispatch) => {
  const res = await Api.get('/profile');
  const profile = res.data;

  dispatch<FetchProfileAction>({
    type: FETCH_PROFILE,
    payload: profile,
  });
};

export const saveProfile = (data: Profile) => async (dispatch: Dispatch) => {
  await Api.post('/profile', data);

  dispatch<SaveProfileAction>({
    type: SAVE_PROFILE,
    payload: data,
  });
};
