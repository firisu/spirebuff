import { Reducer, combineReducers } from "redux";
import { useSelector } from "react-redux";

import {
  State as runsState,
  Action as runsAction,
  reducer as runsReducer
} from "./reducers/runs";

interface State {
  runs: runsState;
}

type Action = runsAction;

// reducer
const reducer: Reducer<State, Action> = combineReducers({
  runs: runsReducer
});

// selector
export const useRuns = () => useSelector((state: State) => state.runs.items);
export const useRunsLoaded = () =>
  useSelector((state: State) => state.runs.loaded);
export const useRunsTotal = () =>
  useSelector((state: State) => state.runs.total);

export default reducer;
