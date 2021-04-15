import * as React from 'react';
import { reducer } from './store/reducer';
import { DispatchType, [FCName]ProviderType, [FCName]StateType } from './types';

const [FCName]Context = React.createContext<[FCName]StateType | undefined>(undefined);
const [FCName]DispatchContext = React.createContext<DispatchType | undefined>(undefined);

const [FCName]Provider = ({ initialState, children}: [FCName]ProviderType) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <[FCName]Context.Provider value={state}>
            <[FCName]DispatchContext.Provider value={dispatch}>
                {children}
            </[FCName]DispatchContext.Provider>
        </[FCName]Context.Provider>
    );
};

const use[FCName]State = () => {
    const context = React.useContext([FCName]Context);

    if (context === undefined) {
        throw new Error('use[FCName]State must be used within a [FCName]Provider');
    }

    return context;
};

const use[FCName]Dispatch = () => {
    const context = React.useContext([FCName]DispatchContext);

    if (context === undefined) {
        throw new Error('use[FCName]Dispatch must be used within a [FCName]Provider');
    }

    return context;
};

export { [FCName]Provider, use[FCName]State, use[FCName]Dispatch };