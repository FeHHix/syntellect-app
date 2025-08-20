import React from 'react';
import {Input} from '../Input';

export interface IOption {
    id: string;
    label: string;
    value: string;
}

type TProps = {
    debounceDelay?: number;
    fetcher: (search: string) => Promise<Array<IOption>>;
    loadingMessage?: string;
    maxSuggestions?: number;
    minCharsToFetch?: number;
    onSelect?(option: IOption): void;
    placeholder?: string;
};

const debounce = (func: (search: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return (search: string) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(search);
        }, delay);
    };
};

export const SuggestInput: React.FunctionComponent<TProps> = ({
    debounceDelay = 300,
    fetcher,
    loadingMessage = 'Loading...',
    maxSuggestions = 5,
    minCharsToFetch = 3,
    placeholder = '',
    onSelect = () => {},
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [filteredOptions, setFilteredOptions] = React.useState<IOption[]>([]);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [selectionMade, setSelectionMade] = React.useState(false);

    // Для дебаунса запросов
    const debouncedFetch = React.useCallback(
        debounce(async (search: string) => {
            try {
                setIsLoading(true);
                const results = await fetcher(search);
                const limitedResults = results.slice(0, maxSuggestions);
                setFilteredOptions(limitedResults);
                setShowDropdown(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }, debounceDelay),
        [fetcher, debounceDelay]
    );

    // Обработчик изменения
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setSelectionMade(false);
    };

    // Скрыть выпадающий список при потере фокуса
    const hideDropdown = () => {
        setShowDropdown(false);
        setFilteredOptions([]);
    };

    // Выбор пункта
    const selectOption = (selectedOption: IOption) => {
        console.log('selectOption', selectedOption.value);
        setSearch(selectedOption.value);
        setShowDropdown(false);
        setFilteredOptions([]);
        setSelectionMade(true);
        onSelect(selectedOption);
    };

    // Начинаем поиск, если набралось достаточное количество символов
    React.useEffect(() => {
        if (!selectionMade && search.length >= minCharsToFetch) {
            console.log('debouncedFetch', search);
            debouncedFetch(search);
        } else {
            setFilteredOptions([]);
        }
    }, [search, selectionMade, debouncedFetch, minCharsToFetch]);

    return (
        <>
            <Input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={handleInputChange}
                onBlur={hideDropdown}
                autoComplete="off"
            />
            {(isLoading && <div>{loadingMessage}</div>) ||
                (showDropdown && filteredOptions.length > 0 && (
                    <ul className="suggestions-list">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.id}
                                onClick={() => selectOption(option)}
                                role="presentation"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                ))}
        </>
    );
};
