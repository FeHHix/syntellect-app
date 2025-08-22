import {Input as InputInternal, InputProps} from 'antd';
import React from 'react';
import {IDataTestAttributes} from '../model/types';

/**
 * Тип пропсов для компонента Input.
 */
type TProps = IDataTestAttributes &
    InputProps & {
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
    const {dataTestId, value, ...rest} = props;

    return <InputInternal {...rest} data-testid={dataTestId} value={value} />;
};
