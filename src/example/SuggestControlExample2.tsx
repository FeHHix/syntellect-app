import {
    IOption,
    SuggestControlInput,
} from '../shared/ui/SuggestControl/SuggestControlInput';

export function SuggestControlExample2() {
    const handleSelect = (option: IOption) => {
        console.log('Selected option:', option);
    };

    return (
        <SuggestControlInput
            placeholder="Type to see suggestions"
            onSelect={handleSelect}
            maxSuggestions={10} // установим, например, максимум 3 опции
        />
    );
}
