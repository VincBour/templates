import * as React from 'react';
import { render } from 'react-dom';
import { renderToDOM, [FCName]Page } from '../[FCName]Page';

jest.mock('react-dom', () => ({
    render: jest.fn(),
}));
jest.mock('../[FCName]Context.tsx');


describe('[FCName]Page', () => {
    it('should set the initialState', () => {
        
    });
});