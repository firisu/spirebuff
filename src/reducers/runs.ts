import { Reducer } from "redux";

import { Run } from "../modules/runs";

// state
export type State = ReadonlyArray<Run>;
export const initialState: State = [];

// action type
const SET = "runs/SET";

// action
export interface Actions {
  readonly [SET]: ReturnType<typeof setRuns>;
}
export type Action = Actions[keyof Actions];

// reducer
export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET: {
      const { runs } = action.payload;
      return runs;
    }

    default: {
      return state;
    }
  }
};

// action-creator
export const setRuns = (runs: ReadonlyArray<Run>) => ({
  type: SET,
  payload: { runs }
});
