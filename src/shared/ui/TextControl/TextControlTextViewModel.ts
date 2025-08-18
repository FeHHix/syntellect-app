import { createModel } from './TextControlTextModel';

/**
 * Создает и возвращает экземпляр ViewModel, связанный с моделью текстового контроля.
 * 
 * @param model - Модель текстового контроля, созданный через createModel
 * @returns Новый экземпляр ViewModel
 */
export const createViewModel = (model: ReturnType<typeof createModel>) => {
    /**
     * Представление модели текстового контроля.
     * Обрабатывает пользовательские действия и взаимодействует с моделью.
     */
    class ViewModel {
        /**
         * Ссылка на модель текстового контроля
         * @private
         */
        private model: ReturnType<typeof createModel>;

        /**
         * Инициализирует ViewModel с указанной моделью
         */
        constructor() {
            this.model = model;
        }

        /**
         * Обрабатывает изменение значения ввода
         * @param value - Новое значение ввода от пользователя
         */
        handleInputChange(value: string) {
            this.model.updateInput(value);
        }

        /**
         * Обрабатывает очистку поля ввода
         */
        handleClear() {
            this.model.clearInput();
        }
    }

    return new ViewModel();
}

