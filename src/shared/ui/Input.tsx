import React from 'react';
import {IDataTestAttributes} from '../model/types';

/**
 * Тип пропсов для компонента Input.
 */
type TProps = IDataTestAttributes &
    React.RefAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement> & {
        onBlur?: () => void;
        /**
         * Обработчик события изменения значения в поле ввода.
         * Вызывается при изменении значения пользователем.
         */
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        onFocus?: () => void;
        /**
         * Текущее значение поля ввода.
         * Отображается в поле и используется для управления состоянием.
         */
        value: string;
    };

/**
 * Функциональный компонент Input.
 * Представляет собой поле ввода с базовым стилизированным классом "btn".
 *
 * @param props - Объект пропсов, содержащий `onChange` и `value`
 * @returns JSX-элемент input
 */
export const Input: React.FC<TProps> = (props) => {
    const {dataTestId, onChange, value} = props;

    // const inputRef = React.useRef<HTMLInputElement>(null);

    // React.useImperativeHandle<InputRef, InputRef>(ref, () => ({
    //     contains: (node: Node) => {
    //         inputRef.current?.contains(node);
    //     },
    //     focus: () => {
    //         inputRef.current?.focus();
    //     },
    // }));

    return <input data-testid={dataTestId} onChange={onChange} value={value} />;
};
