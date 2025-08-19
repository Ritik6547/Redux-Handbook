import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export const Provider = ({ store, children }) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    return unsubscribe;
  }, [store]);

  return (
    <StoreContext.Provider value={{ state, dispatch: store.dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useSelector = (selector) => {
  const { state } = useContext(StoreContext);
  return selector(state);
};

export const useDispatch = () => {
  const { dispatch } = useContext(StoreContext);
  return dispatch;
};
