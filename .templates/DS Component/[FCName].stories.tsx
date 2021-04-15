import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import [FCName], { [FCName]Props } from './[FCName]';

export default {
    title: "/[FCName]",
    component: [FCName],
    parameters: {
        stage: 'beta'
    }
} as Meta;

const Template: Story<[FCName]Props> = () => {
    return (
        <[FCName]></[FCName]>
    );
};

export const Default = Template.bind({});