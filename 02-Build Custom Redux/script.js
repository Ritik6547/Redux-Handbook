import { createStore } from "./my_redux";

const initialState = {
  post: 0,
  name: "alpha",
  age: 22,
};

const ACTIONS = {
  INCREMENT: "post/increment",
  DECREMENT: "post/decrement",
  INCREASE_BY: "post/increaseBy",
  DECREASE_BY: "post/decreaseBy",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, post: state.post + 1 };
    case ACTIONS.DECREMENT:
      return { ...state, post: state.post - 1 };
    case ACTIONS.INCREASE_BY:
      return { ...state, post: state.post + action.payload };
    case ACTIONS.DECREASE_BY:
      return { ...state, post: state.post - action.payload };

    default:
      return state;
  }
}

const store = createStore(reducer);

console.log(store);

const unSubscribe1 = store.subscribe(() => {
  console.log(store.getState());
});

const unSubscribe2 = store.subscribe(() => {
  console.log("hello");
});

store.dispatch({ type: ACTIONS.INCREMENT });
store.dispatch({ type: ACTIONS.DECREMENT });
unSubscribe2();
store.dispatch({ type: ACTIONS.INCREASE_BY, payload: 10 });
store.dispatch({ type: ACTIONS.DECREASE_BY, payload: 5 });
