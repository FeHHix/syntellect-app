import { render, fireEvent, screen } from '@testing-library/react';
import { TextControlExample2 } from './TextControlExample2';

describe('TextControlExample2', () => {
    beforeEach(() => {
        // Замокаем alert глобально
        window.alert = jest.fn();
    });

    afterEach(() => {
        // Восстанавливаем оригинальный alert
        jest.resetAllMocks();
    });

    it('отображает структуру с левой кнопкой, текстовым полем и правой кнопкой', () => {
        render(<TextControlExample2 />);

        const leftButton = screen.getByTestId('TextControl_showNumberButton');
        const textInput = screen.getByTestId('TextControl_text');
        const rightButton = screen.getByTestId('TextControl_showTextButton');

        expect(leftButton).toBeInTheDocument();
        expect(textInput).toBeInTheDocument();
        expect(rightButton).toBeInTheDocument();
    });

    it('показывает alert с числом при клике по кнопке show number (валидный ввод)', () => {
        render(<TextControlExample2 />);

        const textInput = screen.getByTestId('TextControl_text');
        fireEvent.change(textInput, { target: { value: '123' } });

        const button = screen.getByTestId('TextControl_showNumberButton');
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith('123');
    });

    it('не показывает alert при клике по кнопке show number (невалидный ввод)', () => {
        render(<TextControlExample2 />);

        const textInput = screen.getByTestId('TextControl_text');
        fireEvent.change(textInput, { target: { value: 'test' } });

        const button = screen.getByTestId('TextControl_showNumberButton');
        fireEvent.click(button);

        expect(window.alert).not.toHaveBeenCalled();
    });

    it('показывает alert с текстом при клике по кнопке show text', () => {
        render(<TextControlExample2 />);

        const textInput = screen.getByTestId('TextControl_text');
        fireEvent.change(textInput, { target: { value: 'test' } });

        const button = screen.getByTestId('TextControl_showTextButton');
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith('test');
    });

    it('не показывает alert при клике по кнопке show text (пустой ввод)', () => {
        render(<TextControlExample2 />);

        const button = screen.getByTestId('TextControl_showTextButton');
        fireEvent.click(button);

        expect(window.alert).not.toHaveBeenCalled();
    });

    it('обновляет значение текстового поля после ввода', () => {
        render(<TextControlExample2 />);

        const textInput = screen.getByTestId('TextControl_text');
        fireEvent.change(textInput, { target: { value: 'new value' } });

        expect(textInput).toHaveValue('new value');
    });
});
