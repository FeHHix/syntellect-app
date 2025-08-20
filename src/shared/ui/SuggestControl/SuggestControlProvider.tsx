import React from 'react';
import {createModel} from './SuggestControlModel';
import {createViewModel} from './SuggestControlViewModel';

type TSuggestControlContext = {
    localModel: ReturnType<typeof createModel>;
    viewModel: ReturnType<typeof createViewModel>;
};

export const SuggestControlContext = React.createContext<
    Partial<TSuggestControlContext>
>({});

type TProps = {
    children: React.ReactNode;
    debounceDelay?: number;
    maxSuggestions?: number;
    minCharsToFetch?: number;
};

export const SuggestControlProvider = (props: TProps) => {
    const {children, debounceDelay, maxSuggestions, minCharsToFetch} = props;

    const localModel = createModel();

    const viewModel = createViewModel({
        debounceDelay,
        maxSuggestions,
        minCharsToFetch,
        model: localModel,
    });

    const contextValue = React.useMemo(
        () => ({localModel, viewModel}),
        [localModel, viewModel]
    );

    return (
        <SuggestControlContext.Provider value={contextValue}>
            {children}
        </SuggestControlContext.Provider>
    );
};

export function useSuggestControlContext() {
    return React.useContext(SuggestControlContext) as TSuggestControlContext;
}
