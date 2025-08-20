import {autorun, reaction} from 'mobx';
import {createModel, TModel} from './SuggestControlModel';
import {IOption} from './SuggestControlInput';
import {getCountryByName} from '../../../api/apiService';

const debounce = (func: (search: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return (search: string) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(search);
        }, delay);
    };
};

type TProps = {
    debounceDelay?: number;
    maxSuggestions?: number;
    minCharsToFetch?: number;
    model: TModel;
};

export const createViewModel = (props: TProps) => {
    const {debounceDelay, model, maxSuggestions, minCharsToFetch} = props;

    class ViewModel {
        private _model: ReturnType<typeof createModel>;
        private _debounceDelay: number;
        private _minCharsToFetch: number;
        private _maxSuggestions: number;

        constructor() {
            this._model = model;
            this._debounceDelay = debounceDelay || 300;
            this._maxSuggestions = maxSuggestions || 5;
            this._minCharsToFetch = minCharsToFetch || 3;

            // Reaction для запуска поиска при достаточном количестве символов
            reaction(
                () => this._model.search,
                debounce(() => {
                    if (this._model.search.length >= this._minCharsToFetch) {
                        console.log('fetchOptions:', this._model.search);
                        this.fetchOptions(this._model.search);
                    } else {
                        this._model.reset();
                    }
                }, this._debounceDelay)
            );
        }

        private async fetcher(search: string): Promise<IOption[]> {
            const response = await getCountryByName(search);

            return response.map((country) => ({
                id: country.name,
                label: country.fullName,
                value: country.name,
            }));
        }

        private async fetchOptions(search: string) {
            try {
                const results = await this.fetcher(search);
                const limitedResults = results.slice(0, this._maxSuggestions);
                this._model.setFilteredOptions(limitedResults);
            } catch (err) {
                console.error(err);
            } finally {
                this._model.stopLoading();
            }
        }

        handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
            this._model.setSearch(event.target.value);
        }

        handleFocusChange(focus: boolean) {
            this._model.setFocused(focus);
        }

        handleSelectOption(option: IOption) {
            this._model.setDisplayValue(option.value);
            this._model.reset();
        }
    }

    console.log('createViewModel');

    return new ViewModel();
};
