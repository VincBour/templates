import { IBackOfficePageModel } from '../../userdashboard/contracts/shared/IBackOfficePageModel';

export interface I[FCName]Model extends IBackOfficePageModel {
    
}

type Sample = {
    type: '[FCName]/SAMPLE'
};

export type ActionType = (
    Sample
);

export type DispatchType = (action: ActionType) => void;

export interface [FCName]StateType {

};

export type [FCName]ProviderType = { children: React.ReactNode, initialState: [FCName]StateType };