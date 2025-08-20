import {makeAutoObservable} from 'mobx';
import {IOption} from './SuggestControlInput';

export const createModel = () => {
    class LocalModel {
        private _filteredOptions: IOption[] = []; // фильтрованные подсказки
        private _isLoading: boolean = false; // статус загрузки
        private _search: string = ''; // текущий поисковый запрос
        private _displayValue: string = ''; // отображаемое значение
        private _focused: boolean = false; // признак фокуса

        constructor() {
            makeAutoObservable(this);
        }

        setSearch(val: string) {
            this._search = val;
        }

        setFocused(focused: boolean) {
            this._focused = focused;
        }

        setDisplayValue(value: string) {
            this._displayValue = value;
        }

        setFilteredOptions(options: IOption[]) {
            this._filteredOptions = options;
        }

        startLoading() {
            this._isLoading = true;
        }

        stopLoading() {
            this._isLoading = false;
        }

        reset() {
            this.setSearch('');
            this.setFilteredOptions([]);
            this.setFocused(false);
        }

        get search(): string {
            return this._search;
        }

        get focused(): boolean {
            return this._focused;
        }

        get displayValue(): string {
            return this._displayValue;
        }

        get isLoading(): boolean {
            return this._isLoading;
        }

        get filteredOptions(): IOption[] {
            return this._filteredOptions;
        }
    }

    return new LocalModel();
};

export type TModel = ReturnType<typeof createModel>;
