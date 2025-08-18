import React from 'react';
import {Button} from '../shared/ui/Button';
import {TextControl} from '../shared/ui/TextControl/TextControl';
import {TextControlContext} from '../shared/ui/TextControl/TextControlProvider';

/**
 * Компонент кнопки, отображающей значение ввода как число.
 *
 * @component
 * @returns JSX-элемент кнопки, которая показывает введённое число при нажатии.
 */
const ButtonShowNumber = () => {
    const {localModel} = React.useContext(TextControlContext);

    return (
        <Button
            dataTestId="TextControl_showNumberButton"
            label="show number"
            onClick={() => {
                if (localModel && Number(localModel.inputValue))
                    alert(localModel.inputValue);
            }}
        />
    );
};

/**
 * Компонент кнопки, отображающей текстовое значение ввода.
 *
 * @component
 * @returns JSX-элемент кнопки, которая показывает введённый текст при нажатии.
 */
const ButtonShowText = () => {
    const {localModel} = React.useContext(TextControlContext);

    return (
        <Button
            dataTestId="TextControl_showTextButton"
            label="show text"
            onClick={() => {
                if (localModel?.inputValue) alert(localModel.inputValue);
            }}
        />
    );
};

/**
 * Пример использования компонента TextControl с двумя кнопками.
 *
 * @component
 * @returns JSX-структура с текстовым полем и кнопками слева/справа.
 * @remarks
 * - Использует контекст `TextControlContext` для получения данных ввода.
 * - Кнопка "show number" проверяет значение на численность перед выводом.
 * - Структура включает: левую панель с кнопкой, текстовое поле, правую панель с кнопкой.
 */
export const TextControlExample2: React.FC = () => {
    return (
        <TextControl>
            <TextControl.LeftButtons>
                <ButtonShowNumber />
            </TextControl.LeftButtons>
            <TextControl.Text dataTestId="TextControl_text" />
            <TextControl.RightButtons>
                <ButtonShowText />
            </TextControl.RightButtons>
        </TextControl>
    );
};
