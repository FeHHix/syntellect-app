import React from 'react'

/**
 * Тип свойств для компонента Button
 */
type TProps = {
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
export const Button: React.FC<TProps> = ({ label, onClick }) => (
    <button className="btn" onClick={onClick}>
        {label}
    </button>
)
