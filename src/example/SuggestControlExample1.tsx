import React from 'react';
import {IOption, SuggestInput} from '../shared/ui/SuggestControl/SuggestInput';
import {getCountryByName} from '../api/apiService';

async function fetchOptionsFromServer(search: string): Promise<IOption[]> {
    const response = await getCountryByName(search);

    return response.map((country) => ({
        id: country.name,
        label: country.fullName,
        value: country.name,
    }));
}

export function SuggestControlExample1() {
    const handleSelect = (option: IOption) => {
        console.log('Selected option:', option);
    };

    return (
        <div>
            <SuggestInput
                fetcher={fetchOptionsFromServer}
                placeholder="Type to see suggestions"
                onSelect={handleSelect}
                maxSuggestions={3} // установим, например, максимум 3 опции
            />
        </div>
    );
}
