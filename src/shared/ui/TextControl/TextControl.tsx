import React from 'react';
import {TextControlProvider} from './TextControlProvider';
import {TextControlText} from './TextControlText';
import {TextControlLeftButtons} from './TextControlButtonsLeft';
import {TextControlRightButtons} from './TextControlButtonsRight';

/**
 * Тип, описывающий структуру подкомпонентов TextControl.
 */
type TTextControlComponent = {
    /**
     * Компонент отображения текста.
     */
    Text: typeof TextControlText;
    /**
     * Компонент левых кнопок управления.
     */
    LeftButtons: typeof TextControlLeftButtons;
    /**
     * Компонент правых кнопок управления.
     */
    RightButtons: typeof TextControlRightButtons;
};

/**
 * Тип пропсов основного компонента TextControl.
 */
type TProps = {
    /**
     * Дочерние элементы, которые будут обёрнуты в TextControlProvider.
     */
    children: React.ReactNode;
};

/**
 * Основной компонент текстового контрола.
 *
 * @component
 * @param {TProps} props - Пропсы компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы для рендера.
 * @returns {JSX.Element} Отрендеренный компонент.
 */
const TextControl: React.FC<TProps> & TTextControlComponent = (props) => {
    const {children} = props;

    return (
        <div style={{display: 'flex'}}>
            <TextControlProvider>{children}</TextControlProvider>
        </div>
    );
};

/**
 * Подкомпоненты текстового контрола.
 */
TextControl.Text = TextControlText;
TextControl.LeftButtons = TextControlLeftButtons;
TextControl.RightButtons = TextControlRightButtons;

export {TextControl};
