import React, { createContext, useMemo } from 'react';
import { createModel } from './TextControlTextModel';
import { createViewModel } from './TextControlTextViewModel';

/**
 * Тип данных для контекста управления текстовым контролем.
 * 
 * @typeparam localModel - Модель локального состояния (создается через createModel).
 * @typeparam viewModel - ViewModel для представления данных (создается через createViewModel).
 */
type TTextControlContext = {
    /**
     * Локальная модель данных текстового контрола.
     * Опционально может быть не определена при инициализации.
     */
    localModel?: ReturnType<typeof createModel>;
    
    /**
     * ViewModel, связанная с локальной моделью.
     * Используется для преобразования данных для представления.
     */
    viewModel?: ReturnType<typeof createViewModel>;
};

/**
 * Контекст для передачи моделей между компонентами текстового контрола.
 * Инициализируется пустым объектом по умолчанию.
 */
export const TextControlContext = createContext<TTextControlContext>({});

/**
 * Тип пропсов для провайдера текстового контекста.
 * 
 * @typeparam children - Дочерние React-элементы, оборачиваемые провайдером.
 */
type TProps = {
    /**
     * Компоненты, которые будут иметь доступ к контексту.
     */
    children: React.ReactNode;
};

/**
 * Провайдер контекста текстового контрола.
 * Создает и предоставляет локальную модель и ViewModel дочерним компонентам.
 * 
 * @param props - Объект с дочерними элементами.
 * @returns React-компонент провайдера.
 */
export const TextControlProvider = (props: TProps) => {
    const {children} = props;

    /**
     * Локальная модель текстового контрола.
     * Создается с помощью функции createModel().
     */
    const localModel = createModel();
    
    /**
     * ViewModel, инициализированная с ссылкой на локальную модель.
     * Отвечает за логику представления данных.
     */
    const viewModel = createViewModel(localModel);

    /**
     * Значение контекста, передаваемое дочерним компонентам.
     * Кэшируется с помощью useMemo для предотвращения лишних перерисовок.
     */
    const contextValue = useMemo(
        () => ({ localModel, viewModel }),
        [localModel, viewModel]
    );

    return (
        <TextControlContext.Provider value={contextValue}>
            {children}
        </TextControlContext.Provider>
    );
};

