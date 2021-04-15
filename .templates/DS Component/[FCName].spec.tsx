import * as React from 'react';
import { render, screen } from '@testing-library/react';
import [FCName], { [FCName]Props } from './[FCName]';

describe('[FCName]', () => {
    it('should render', () => {
        const { container }  = render(<[FCName]></[FCName]>);

        expect(container).toBeInTheDocument();
    });
});