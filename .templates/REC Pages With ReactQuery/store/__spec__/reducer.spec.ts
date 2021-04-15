import * as React from 'react';
import { initialState } from '../initialState';
import { reducer } from '../reducer';

describe('[FCName] reducer', () => {
    it('should return initialState', () => {
        expect(initialState).toEqual({});
    });
});