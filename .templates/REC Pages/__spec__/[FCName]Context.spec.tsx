import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { initialState } from '../store/initialState';
import { use[FCName]Dispatch, use[FCName]State, [FCName]Provider } from '../[FCName]Context';
import { [FCName]import { expect } from 'chai';
StateType } from '../types';

jest.mock('../store');
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(),
}));

describe('[FCName]Context', () => {
    it('should return context when use[FCName]State is called', () => {
        // Given
        jest.spyOn(React, 'useContext').mockReturnValue(initialState);

        // When
        const context = use[FCName]State();

        // Then
        expect(context).lessThanOrEqual({});

    });
});