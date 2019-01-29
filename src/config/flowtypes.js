// @flow

// export type ReduxAction = (
//   ...args: any
// ) => {
//   type: string,
//   payload?: Object,
// };

export type Action = { type: string, payload?: Object };
export type Dispatch = (action: Action) => any;
// type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
// type GetState = () => State;
// type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
// type PromiseAction = Promise<Action>;
