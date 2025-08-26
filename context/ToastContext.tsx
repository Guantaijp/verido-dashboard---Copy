import { ReactNode, createContext, useContext } from "react";

const ToastContext = createContext({});

const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
};

export default ToastContextProvider

export const useToastContext = () => useContext(ToastContext);
