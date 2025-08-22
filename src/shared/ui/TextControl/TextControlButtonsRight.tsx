import {Flex} from 'antd';
import React from 'react';

/**
 * Типизация пропсов компонента TextControlRightButtons
 */
type TProps = {
    /**
     * Дочерние элементы, которые будут отображаться внутри компонента
     */
    children: React.ReactNode;
};

/**
 * Компонент, выравнивающий дочерние элементы по правому краю с помощью Flexbox
 *
 * @param props - объект с пропсами
 * @param props.children - элементы, которые будут отображены внутри контейнера
 * @returns JSX-элемент с выровненными по правому краю дочерними элементами
 */
export const TextControlRightButtons: React.FC<TProps> = (props) => {
    const {children} = props;

    return <Flex gap="middle">{children}</Flex>;
};
