import React from 'react'
import { IDataTestAttributes } from '../model/types'

/**
 * Тип свойств для компонента Button
 */
type TProps = IDataTestAttributes & {
    /**
     * Текст, отображаемый на кнопке
     */
    label: string
    /**
     * Обработчик события клика по кнопке
     */
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * Компонент кнопки
 *
 * @param props - Свойства компонента.
 * @returns JSX-элемент кнопки.
 */
export const Button: React.FC<TProps> = (props) => {
    const { dataTestId, label, onClick } = props

    return (
        <button className="btn" data-testid={dataTestId} onClick={onClick}>
            {label}
        </button>
    )
}
