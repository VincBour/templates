import * as ActionTypes from './action-types';
import { ActionType, [FCName]StateType } from '../types';

export const reducer = (state: [FCName]StateType, action: ActionType ): [FCName]StateType => {
    switch (action.type) {
        case ActionTypes.SAMPLE: {
            return {...state}
        }
        default:
            return state;
    }
};