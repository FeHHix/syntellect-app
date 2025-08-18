import { render, fireEvent, screen } from '@testing-library/react';
import { TextControlExample1 } from './TextControlExample1';

describe('TextControlExample1', () => {
    it('отображает TextControl и кнопки корректно', () => {
        render(<TextControlExample1 />);

        const textInput = screen.getByTestId('TextControl_text'); // Предполагаем, что у текстового поля есть label="text"
        expect(textInput).toBeInTheDocument();

        const clearButton = screen.getByTestId('TextControl_clearButton');
        const setValueButton = screen.getByTestId('TextControl_setValueButton');
        expect(clearButton).toBeInTheDocument();
        expect(setValueButton).toBeInTheDocument();
    });

    it('очищает значение текстового поля после клика по кнопке очистки значения', () => {
        render(<TextControlExample1 />);

        const textInput = screen.getByTestId('TextControl_text');
        fireEvent.change(textInput, {target: {value: 'test'}});

        const clearButton = screen.getByTestId('TextControl_clearButton');
        fireEvent.click(clearButton);

        expect(textInput).toHaveValue('');
    });

    it('обновляет значение текстового поля после клика по кнопке установки значения', () => {
        render(<TextControlExample1 />);

        const setValueButton = screen.getByTestId('TextControl_setValueButton');
        fireEvent.click(setValueButton);

        const textInput = screen.getByTestId('TextControl_text');
        expect(textInput).toHaveValue('Hello world!');
    });
});
