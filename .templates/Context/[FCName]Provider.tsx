import * as React from "react";
import { [FCName]Type } from "../[FCName]";

export interface [FCName]ContextProps { }

export interface [FCName]ProviderProps<Values = {}>
  extends [FCName]ContextProps<Values> {
  children: React.ReactNode;
}

const [FCName]Context = () =>
  React.createContext<[FCName]ContextProps>({})

const [FCName]Provider = ({ children }: [FCName]ProviderProps) => {
  const [FCName]Context = create[FCName]Context<Values>();
  return (
    <[FCName]Context.Provider value={{ }}>
      {children}
    </[FCName]Context.Provider>
  );
};

export const use[FCName]Context = () => {
  const context = React.useContext([FCName]Context());

  if (context === undefined) {
    throw new Error(
      "use[FCName]Context must be used within a [FCName]Provider"
    );
  }

  return context;
};

export default [FCName]Provider;
