import * as React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PageBase from '../page-base';
import { RecruitingThemeProvider } from '../../assets/Theme/recruiting-theme';
import { [FCName]Provider } from './VacancyCreationContext';
import { I[FCName]Model, [FCName]StateType } from './types';
import { initialState } from './store';

export class [FCName]Page extends PageBase {
    initialState: [FCName]StateType;

    constructor(model: I[FCName]Model) {
        super('[FCName]');
        this.initialState = {
            ...initialState,
            breadcrumbs: model.NavigationContext.Breadcrumbs.map(b => ({
                label: b.Label,
                link: b.Link
            })),
            currentCulture: model.CurrentCulture,
            pageTitle: model.PageTitle,
            themeColor: model.ThemeColor,
        };
    };
    
    run(htmlElement: HTMLElement) {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                }
            }
        });
        const Component = () => (
            <QueryClientProvider client={queryClient}>
                <RecruitingThemeProvider
                    productionPrefix="rec[FCName]"
                    currentCulture={this.initialState.currentCulture}
                >
                    <[FCName]Provider initialState={this.initialState}>
                       {// YOUR COMPONENT}
                    </[FCName]Provider>
                </RecruitingThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
        
        renderToDOM(Component, htmlElement);
    }
}

export const renderToDOM = (Component: React.FunctionComponent, root: HTMLElement | null): void => {
    if (root !== null) {
        render(<Component />, root);
    }
};
