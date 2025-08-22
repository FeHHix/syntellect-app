import {Button as ButtonInternal, ButtonProps} from 'antd';
import React from 'react';
import {IDataTestAttributes} from '../model/types';

/**
 * Тип свойств для компонента Button
 */
type TProps = IDataTestAttributes &
    ButtonProps & {
        /**
         * Текст, отображаемый на кнопке
         */
        label: string;
    };

/**
 * Компонент кнопки
 *
 * @param props - Свойства компонента.
 * @returns JSX-элемент кнопки.
 */
export const Button: React.FC<TProps> = (props) => {
    const {dataTestId, label, onClick, ...rest} = props;

    return (
        <ButtonInternal {...rest} data-testid={dataTestId} onClick={onClick}>
            {label}
        </ButtonInternal>
    );
};
