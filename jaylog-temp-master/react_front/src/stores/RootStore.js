import { createContext, useContext } from "react";
import AuthStore from "stores/AuthStore";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{
        authStore: AuthStore(),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

/** @type {AuthStore()} useAuthStore */
export const useAuthStore = () => useContext(StoreContext).authStore;
