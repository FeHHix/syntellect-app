import {Flex} from 'antd';
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
    const {children} = props;

    return <Flex gap="middle">{children}</Flex>;
};
