import * as ActionTypes from './action-types';
import { DispatchType } from '../types';

export const GetSample = (dispatch: DispatchType) => dispatch({
    type: ActionTypes.SAMPLE
});