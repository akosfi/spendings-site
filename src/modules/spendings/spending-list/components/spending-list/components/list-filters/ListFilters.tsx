import { SpendingCurrency, useSpendingContext } from 'modules/spendings';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { SpendingOrdering } from 'modules/spendings/domain/SpendingRepository';
import SelectInput, { SelectOption } from '../select-input/SelectInput';
import Toggle from './components/toggle/Toggle';

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
    const { spendingRepository } = useSpendingContext();

    const dispatch = useDispatch<AppDispatch>();

    const [currencyFilter, setCurrencyFilter] =
        useState<SpendingCurrency | null>(null);
    const [order, setOrder] = useState<SpendingOrdering>(
        SpendingOrdering.SPENT_AT_DESCENDING,
    );

    useEffect(() => {
        dispatch(
            listSpendingsThunk({
                spendingRepository,
                currency: currencyFilter === null ? undefined : currencyFilter,
                order,
            }),
        );
    }, [currencyFilter, order, dispatch, spendingRepository]);

    return (
        <div className={css['filters']}>
            <div className={css['ordering']}>
                <SelectInput
                    value={order}
                    options={orderingOptions}
                    setValue={(option) =>
                        setOrder(option.id as SpendingOrdering)
                    }
                />
            </div>
            <div className={css['currencyFilter']}>
                <Toggle
                    onClick={() => setCurrencyFilter(null)}
                    label="All"
                    isActive={currencyFilter === null}
                />
                {Object.values(SpendingCurrency).map((currency) => (
                    <Toggle
                        key={currency}
                        onClick={() => setCurrencyFilter(currency)}
                        label={currency}
                        isActive={currencyFilter === currency}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListFilters;
