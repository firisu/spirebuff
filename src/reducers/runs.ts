import { Reducer } from "redux";

import { Run } from "../modules/runs";

// state
export interface State {
  items: ReadonlyArray<Run>;
  loaded: number;
  total: number;
}
export const initialState: State = {
  items: [],
  loaded: 0,
  total: 0
};

// action type
const SET = "runs/SET" as const;
const SET_LOADED = "runs/SET_LOADED" as const;
const SET_TOTAL = "runs/SET_TOTAL" as const;
const INCR_LOADED = "runs/INCR_LOADED" as const;

// action
export interface Actions {
  readonly [SET]: ReturnType<typeof setRuns>;
  readonly [SET_LOADED]: ReturnType<typeof setLoaded>;
  readonly [SET_TOTAL]: ReturnType<typeof setTotal>;
  readonly [INCR_LOADED]: ReturnType<typeof incrLoaded>;
}
//export type Action = Actions[keyof Actions];
export type Action = Actions[keyof Actions];

// reducer
export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET: {
      const runs = action.payload.runs;
      return {
        ...state,
        items: runs
      };
    }

    case SET_LOADED: {
      const { loaded } = action.payload;
      return {
        ...state,
        loaded
      };
    }

    case SET_TOTAL: {
      const { total } = action.payload;
      return {
        ...state,
        total
      };
    }

    case INCR_LOADED: {
      return {
        ...state,
        loaded: state.loaded + 1
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

export const setLoaded = (loaded: number) => ({
  type: SET_LOADED,
  payload: { loaded }
});

export const setTotal = (total: number) => ({
  type: SET_TOTAL,
  payload: { total }
});

export const incrLoaded = () => ({
  type: INCR_LOADED
});
