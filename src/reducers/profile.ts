import { Profile, Action } from 'actions/profile';
import { ActionTypes } from 'actions/types';
const { FETCH_PROFILE, SAVE_PROFILE } = ActionTypes;

export interface ProfileState extends Profile {}

const initialState: ProfileState = {
  name: 'John Doe',
  website: 'doe.com',
  taxCode: 'JHNDOE1234',
  vat: '0123456789',
  phone: '+1 555-555',
  email: 'john@doe.com',
  addressStreet: '102 West Hastings',
  addressCityCountry: 'Vancouver, BC, Canada',
  postalCode: 'V6B',
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_PROFILE:
    case SAVE_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
