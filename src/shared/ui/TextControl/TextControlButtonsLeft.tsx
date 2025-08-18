import React from 'react';

/**
 * Тип пропсов для компонента TextControlLeftButtons.
 */
type TProps = {
    /**
     * Дочерние элементы, которые будут отрендерены внутри контейнера.
     */
    children: React.ReactNode;
};

/**
 * Компонент для отображения кнопок слева в текстовом контроле.
 * 
 * Рендерит переданные дочерние элементы внутри `div`-контейнера с применением
 * flexbox-стилей для выравнивания по левой стороне.
 */
export const TextControlLeftButtons: React.FC<TProps> = (props) => {
    const { children } = props;

    return (
        <div style={{ 
            /** Расширяет контейнер до максимальной ширины */
            flexGrow: 1,
            /** Активирует flexbox-раскладку */
            display: 'flex',
            /** Выравнивает элементы по левому краю */
            justifyContent: 'flex-start' 
        }}>
            {children}
        </div>
    );
};

