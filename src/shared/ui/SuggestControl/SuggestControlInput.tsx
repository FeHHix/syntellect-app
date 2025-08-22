import React from 'react';
import {Input} from '../Input';
import {observer} from 'mobx-react-lite';
import {
    SuggestControlProvider,
    useSuggestControlContext,
} from './SuggestControlProvider';
import {Dropdown} from 'antd';
import {MenuItemType} from 'antd/es/menu/interface';

export type IOption = MenuItemType;

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

        return (
            <>
                {localModel.focused ? (
                    <Input
                        dataTestId="SuggestControlInput_search-input"
                        onChange={(event) => {
                            viewModel.handleSearchChange(event);
                        }}
                        value={localModel.search}
                    />
                ) : (
                    <Input
                        dataTestId="SuggestControlInput_display-input"
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
                        <Dropdown
                            menu={{
                                items: localModel.filteredOptions.map(
                                    (option, index) => ({
                                        ...option,
                                        label: (
                                            <a
                                                data-testid={`SuggestControlInput_suggestion-item_${index}`}
                                                onClick={() =>
                                                    handleSelectOption(option)
                                                }
                                                role="presentation"
                                            >
                                                {option.label}
                                            </a>
                                        ),
                                    })
                                ),
                            }}
                            placement="bottomRight"
                            open
                        />
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
