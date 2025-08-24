export const thunkMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      next(action);
    }
  };
