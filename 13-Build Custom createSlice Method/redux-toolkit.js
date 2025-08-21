import { produce } from "immer";

// Custom createSlice Method
export function myCreateSlice(config) {
  const { name, initialState, reducers } = config;

  // Action Creators
  const actions = {};
  Object.keys(reducers).forEach((key) => {
    actions[key] = function (payload) {
      return { type: `${name}/${key}`, payload };
    };
  });

  // Reducer
  function reducer(state = initialState, action) {
    return produce(state, (draft) => {
      if (action.type.startsWith(`${name}/`)) {
        const key = action.type.split("/")[1];
        const caseReducer = reducers[key];
        if (caseReducer) caseReducer(draft, action);
      }
    });
  }

  return { name, actions, reducer };
}
