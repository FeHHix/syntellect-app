import React from 'react';
import {Input} from '../Input';
import {observer} from 'mobx-react-lite';
import {
    SuggestControlProvider,
    useSuggestControlContext,
} from './SuggestControlProvider';

export interface IOption {
    id: string;
    label: string;
    value: string;
}

type TSuggestControlInputObservableProps = {
    loadingMessage?: string;
    onSelect?(option: IOption): void;
    placeholder?: string;
};

const SuggestControlInputObservable: React.FunctionComponent<TSuggestControlInputObservableProps> =
    observer((props) => {
        const {
            loadingMessage = 'Loading...',
            placeholder = '',
            onSelect = () => {},
        } = props;

        const {localModel, viewModel} = useSuggestControlContext();

        // Выбор пункта
        const handleSelectOption = (selectedOption: IOption) => {
            viewModel.handleSelectOption(selectedOption);
            onSelect(selectedOption);
        };

        console.log('Current focused:', localModel.focused);

        return (
            <>
                {localModel.focused ? (
                    <Input
                        value={localModel.search}
                        onBlur={() => {
                            console.log('onBlur:', localModel.focused);
                            viewModel.handleFocusChange(false);
                        }}
                        onChange={(event) => {
                            viewModel.handleSearchChange(event);
                        }}
                    />
                ) : (
                    <Input
                        onFocus={() => {
                            viewModel.handleFocusChange(true);
                        }}
                        value={localModel.displayValue}
                        placeholder={placeholder}
                        readOnly
                    />
                )}
                {(localModel.isLoading && <div>{loadingMessage}</div>) ||
                    (localModel.filteredOptions.length > 0 && (
                        <ul className="suggestions-list">
                            {localModel.filteredOptions.map((option) => (
                                <li
                                    key={option.id}
                                    onClick={() => handleSelectOption(option)}
                                    role="presentation"
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    ))}
            </>
        );
    });

type TProps = {
    debounceDelay?: number;
    loadingMessage?: string;
    maxSuggestions?: number;
    minCharsToFetch?: number;
    onSelect?(option: IOption): void;
    placeholder?: string;
};

export const SuggestControlInput: React.FunctionComponent<TProps> = (props) => {
    const {
        debounceDelay,
        loadingMessage,
        maxSuggestions,
        minCharsToFetch,
        onSelect,
        placeholder,
    } = props;

    return (
        <SuggestControlProvider
            debounceDelay={debounceDelay}
            maxSuggestions={maxSuggestions}
            minCharsToFetch={minCharsToFetch}
        >
            <SuggestControlInputObservable
                loadingMessage={loadingMessage}
                onSelect={onSelect}
                placeholder={placeholder}
            />
        </SuggestControlProvider>
    );
};
