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
    const [search, setSearch] = React.useState('');
    const [displayValue, setDisplayValue] = React.useState(''); // Новое состояние для отображаемого значения
    const [focus, setFocus] = React.useState(false);

    // Для дебаунса запросов
    const debouncedFetch = React.useCallback(
        debounce(async (search: string) => {
            try {
                setIsLoading(true);
                const results = await fetcher(search);
                const limitedResults = results.slice(0, maxSuggestions);
                setFilteredOptions(limitedResults);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }, debounceDelay),
        [fetcher, debounceDelay, maxSuggestions]
    );

    // Начинаем поиск, если набрано минимум нужное количество символов
    React.useEffect(() => {
        if (search.length >= minCharsToFetch) {
            debouncedFetch(search);
        } else {
            setFilteredOptions([]);
        }
    }, [search, debouncedFetch, minCharsToFetch]);

    // Обработчик изменения поискового инпута
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    // Выбор пункта
    const selectOption = (selectedOption: IOption) => {
        setDisplayValue(selectedOption.value); // обновляем отображаемое значение
        setSearch(''); // очищаем поисковый инпут
        setFilteredOptions([]); // скроем список
        onSelect(selectedOption);
    };

    return (
        <>
            {focus ? (
                <Input
                    value={search}
                    onChange={handleSearchChange}
                    onBlur={() => setFocus(false)}
                />
            ) : (
                <Input
                    onFocus={() => setFocus(true)}
                    value={displayValue}
                    placeholder={placeholder}
                    readOnly
                />
            )}
            {(isLoading && <div>{loadingMessage}</div>) ||
                (filteredOptions.length > 0 && (
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
