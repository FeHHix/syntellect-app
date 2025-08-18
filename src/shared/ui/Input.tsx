import React from 'react';
import { IDataTestAttributes } from '../model/types';

/**
 * Тип пропсов для компонента Input.
 */
type TProps = IDataTestAttributes & {
    /**
     * Обработчик события изменения значения в поле ввода.
     * Вызывается при изменении значения пользователем.
     */
    onChange: React.ChangeEventHandler<HTMLInputElement>;
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
    const { dataTestId, onChange, value } = props;

    return <input className="btn" data-testid={dataTestId} onChange={onChange} value={value} />;
};
