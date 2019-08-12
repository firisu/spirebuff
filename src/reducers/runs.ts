import { Reducer } from "redux";

import { Run } from "../modules/runs";

// state
export interface State {
  [level: number]: ReadonlyArray<Run>;
}
export const initialState: State = {};

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
      const runsByLevel: { [level: number]: Array<Run> } = {};

      // アセンションレベル別にRUNデータを配列として格納
      runs.forEach(run => {
        if (!runsByLevel[run.ascension_level]) {
          runsByLevel[run.ascension_level] = [];
        }
        runsByLevel[run.ascension_level].push(run);
      });

      return {
        ...state,
        ...runsByLevel
      };
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
