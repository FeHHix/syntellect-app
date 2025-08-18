import {observer} from 'mobx-react-lite';
import React from 'react';
import {Input} from '../Input';
import {TextControlContext} from './TextControlProvider';
import {IDataTestAttributes} from '../../model/types';

/**
 * Тип пропсов компонента. В текущей реализации не требует внешних пропсов.
 */
type TProps = IDataTestAttributes & {};

/**
 * Основной функциональный компонент текстового поля ввода.
 *
 * @returns JSX-элемент с полем ввода и центрированием по горизонтали.
 */
export const TextControlText: React.FC<TProps> = observer((props) => {
    const {dataTestId} = props;

    const {localModel, viewModel} = React.useContext(TextControlContext);

    return (
        <span style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Input
                dataTestId={dataTestId}
                onChange={
                    viewModel
                        ? (e) => viewModel.handleInputChange(e.target.value)
                        : () => {}
                }
                value={localModel?.inputValue || ''}
            />
        </span>
    );
});
