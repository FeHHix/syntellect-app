import React from 'react';
import {Button} from '../shared/ui/Button';
import {TextControl} from '../shared/ui/TextControl/TextControl';
import {TextControlContext} from '../shared/ui/TextControl/TextControlProvider';

/**
 * Компонент кнопки для очистки значения в TextControl.
 * Использует контекст TextControlContext для доступа к viewModel.
 */
const ButtonClearValue = () => {
    const {viewModel} = React.useContext(TextControlContext);

    return (
        <Button
            dataTestId="TextControl_clearButton"
            label="clear"
            onClick={() => {
                viewModel?.handleClear();
            }}
        />
    );
};

/**
 * Компонент кнопки для установки значения "Hello world!" в TextControl.
 * Использует контекст TextControlContext для доступа к viewModel.
 */
const ButtonSetValue = () => {
    const {viewModel} = React.useContext(TextControlContext);

    return (
        <Button
            dataTestId="TextControl_setValueButton"
            label="set value"
            onClick={() => {
                viewModel?.handleInputChange('Hello world!');
            }}
        />
    );
};

/**
 * Пример использования компонента TextControl с двумя кнопками:
 * - очистка значения
 * - установка значения "Hello world!"
 *
 * @returns JSX элемент с TextControl и кнопками справа
 */
export function TextControlExample1() {
    return (
        <TextControl>
            <TextControl.Text dataTestId="TextControl_text" />
            <TextControl.RightButtons>
                <ButtonClearValue />
                <ButtonSetValue />
            </TextControl.RightButtons>
        </TextControl>
    );
}
