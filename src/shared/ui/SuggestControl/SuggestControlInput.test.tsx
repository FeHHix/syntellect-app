import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SuggestControlInput} from './SuggestControlInput';
import * as apiService from '../../../api/apiService';

describe('SuggestControlInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('отображает readonly-поле при потере фокуса', () => {
        render(
            <SuggestControlInput
                placeholder="Тестовое поле"
                onSelect={jest.fn()}
            />
        );

        // Проверка поля отображения
        const displayInput = screen.getByTestId(
            'SuggestControlInput_display-input'
        );
        expect(displayInput).toHaveAttribute('readOnly');
        expect(displayInput).toHaveAttribute('placeholder', 'Тестовое поле');
        expect(displayInput).toHaveValue('');
    });

    test('переключается на редактируемое поле при фокусе', () => {
        render(<SuggestControlInput debounceDelay={0} onSelect={jest.fn()} />);

        // Фокус на поле отображения
        const displayInput = screen.getByTestId(
            'SuggestControlInput_display-input'
        );
        fireEvent.focus(displayInput);

        // Проверка поля ввода
        const searchInput = screen.getByTestId(
            'SuggestControlInput_search-input'
        );
        expect(searchInput).toBeEnabled();
        expect(searchInput).toHaveValue('');
    });

    test('отображает сообщения загрузки по умолчанию', async () => {
        render(<SuggestControlInput debounceDelay={0} />);

        const displayInput = screen.getByTestId(
            'SuggestControlInput_display-input'
        );
        fireEvent.focus(displayInput);

        const searchInput = screen.getByTestId(
            'SuggestControlInput_search-input'
        );
        await userEvent.type(searchInput, 'Авс');

        // Проверка сообщения загрузки по умолчанию
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
    });

    test('отображает кастомное сообщение загрузки', async () => {
        render(
            <SuggestControlInput
                debounceDelay={0}
                loadingMessage="Пользовательское сообщение..."
            />
        );

        // Фокус на поле отображения
        const displayInput = screen.getByTestId(
            'SuggestControlInput_display-input'
        );
        fireEvent.focus(displayInput);

        // Проверка поля ввода
        const searchInput = screen.getByTestId(
            'SuggestControlInput_search-input'
        );

        await userEvent.type(searchInput, 'Авс');

        expect(
            screen.getByText('Пользовательское сообщение...')
        ).toBeInTheDocument();
    });

    test('обрабатывает выбор опции корректно', async () => {
        const spy = jest
            .spyOn(apiService, 'getCountryByName')
            .mockImplementation((countryName: string) => {
                const countries = jest.requireActual(
                    '../../../api/countries.json'
                );

                if (typeof countryName !== 'string' || !countryName) {
                    return [];
                }

                const searchText = countryName.toLocaleLowerCase();

                return countries.filter(
                    (x: {name: string; fullName: string}) =>
                        x.name.toLocaleLowerCase().startsWith(searchText) ||
                        x.fullName.toLocaleLowerCase().startsWith(searchText)
                );
            });

        const mockOnSelect = jest.fn();

        render(
            <SuggestControlInput debounceDelay={0} onSelect={mockOnSelect} />
        );

        // Фокус на поле отображения
        const displayInput = screen.getByTestId(
            'SuggestControlInput_display-input'
        );
        fireEvent.focus(displayInput);

        // Проверка поля ввода
        const searchInput = screen.getByTestId(
            'SuggestControlInput_search-input'
        );

        await userEvent.type(searchInput, 'Авс');

        // Выбор опции
        const option = screen.getByTestId(
            'SuggestControlInput_suggestion-item_0'
        );
        fireEvent.click(option);

        expect(mockOnSelect).toHaveBeenCalledWith(expect.anything());

        spy.mockClear();
    });
});
