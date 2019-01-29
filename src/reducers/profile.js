import { FETCH_PROFILE, SAVE_PROFILE } from 'actions/types';

const initialState = {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
    case SAVE_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
