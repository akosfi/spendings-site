import { SpendingCurrency } from 'modules/spendings';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { SpendingOrdering } from 'modules/spendings/domain/SpendingRepository';

import css from './ListFilters.module.scss';

const orderingDisplayMap: { [key in SpendingOrdering]: string } = {
    [SpendingOrdering.AMOUNT_ASCENDING]: 'Sort by Amount descending',
    [SpendingOrdering.AMOUNT_DESCENDING]: 'Sort by Amount descending',
    [SpendingOrdering.DATE_ASCENDING]: 'Sort by Date ascending',
    [SpendingOrdering.DATE_DESCENDING]: 'Sort by Date descending (default)',
};

const ListFilters: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [currencyFilter, setCurrencyFilter] =
        useState<SpendingCurrency | null>(null);
    const [orderBy, setOrderBy] = useState<SpendingOrdering>(
        SpendingOrdering.DATE_DESCENDING,
    );

    useEffect(() => {
        dispatch(
            listSpendingsThunk({
                currency: currencyFilter === null ? undefined : currencyFilter,
                orderBy,
            }),
        );
    }, [currencyFilter, orderBy, dispatch]);

    return (
        <div className={css['filters']}>
            <div className={css['ordering']}>
                <select
                    onChange={(e) =>
                        setOrderBy(e.target.value as SpendingOrdering)
                    }
                    value={orderBy}
                >
                    {Object.values(SpendingOrdering).map((ordering) => (
                        <option key={ordering} value={ordering}>
                            {orderingDisplayMap[ordering]}
                        </option>
                    ))}
                </select>
            </div>
            <div className={css['currencyFilter']}>
                <button onClick={() => setCurrencyFilter(null)}>All</button>
                {Object.values(SpendingCurrency).map((currency) => (
                    <button
                        key={currency}
                        onClick={() => setCurrencyFilter(currency)}
                    >
                        {currency}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListFilters;
