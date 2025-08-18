import {makeAutoObservable} from 'mobx';

/**
 * Создает и возвращает экземпляр реактивной модели с функционалом ввода данных.
 *
 * @returns {LocalModel} Экземпляр класса LocalModel
 */
export const createModel = () => {
    class LocalModel {
        /**
         * Приватное свойство для хранения значения ввода.
         * Реактивное свойство благодаря makeAutoObservable.
         */
        private _inputValue: string;

        /**
         * Инициализирует модель с пустым значением ввода.
         * Подключает реактивность через MobX.
         */
        constructor() {
            this._inputValue = '';
            makeAutoObservable(this);
        }

        /**
         * Обновляет значение ввода.
         *
         * @param value - Новое значение для установки
         */
        updateInput(value: string) {
            this._inputValue = value;
        }

        /**
         * Очищает значение ввода, устанавливая пустую строку.
         */
        clearInput() {
            this.updateInput('');
        }

        /**
         * Геттер для получения текущего значения ввода.
         *
         * @returns Текущее значение ввода
         */
        get inputValue() {
            return this._inputValue;
        }
    }

    return new LocalModel();
};
