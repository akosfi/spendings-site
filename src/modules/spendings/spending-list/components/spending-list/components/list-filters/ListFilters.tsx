import { SpendingCurrency } from 'modules/spendings';
import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { SpendingOrdering } from 'modules/spendings/domain/SpendingRepository';
import SelectInput, { SelectOption } from '../select-input/SelectInput';
import Toggle from './components/toggle/Toggle';
import { spendingListActions } from 'modules/spendings/spending-list/redux/slice';
import spendingListSelectors from 'modules/spendings/spending-list/redux/selectors';

import css from './ListFilters.module.scss';

const orderingDisplayMap: { [key in SpendingOrdering]: string } = {
    [SpendingOrdering.AMOUNT_ASCENDING]: 'Sort by Amount ascending',
    [SpendingOrdering.AMOUNT_DESCENDING]: 'Sort by Amount descending',
    [SpendingOrdering.SPENT_AT_ASCENDING]: 'Sort by Date ascending',
    [SpendingOrdering.SPENT_AT_DESCENDING]: 'Sort by Date descending (default)',
};

const orderingOptions: SelectOption[] = Object.values(SpendingOrdering).map(
    (ordering) => ({ id: ordering, label: orderingDisplayMap[ordering] }),
);

const ListFilters: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector(spendingListSelectors.getFilters);

    const handleCurrencyFilterChange = (currency: SpendingCurrency | null) =>
        dispatch(spendingListActions.setCurrencyFilter({ currency }));
    const handleOrderingFilterChange = (ordering: SpendingOrdering) =>
        dispatch(spendingListActions.setOrderingFilter({ ordering }));

    return (
        <div className={css['filters']}>
            <div className={css['ordering']}>
                <SelectInput
                    value={filters.ordering}
                    options={orderingOptions}
                    setValue={(option) =>
                        handleOrderingFilterChange(
                            option.id as SpendingOrdering,
                        )
                    }
                />
            </div>
            <div className={css['currencyFilter']}>
                <Toggle
                    onClick={() => handleCurrencyFilterChange(null)}
                    label="All"
                    isActive={filters.currency === null}
                />
                {Object.values(SpendingCurrency).map((currency) => (
                    <Toggle
                        key={currency}
                        onClick={() => handleCurrencyFilterChange(currency)}
                        label={currency}
                        isActive={filters.currency === currency}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(ListFilters);
