import { SpendingCurrency } from 'modules/spendings';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';

import css from './ListFilters.module.scss';

const ListFilters: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [currencyFilter, setCurrencyFilter] =
        useState<SpendingCurrency | null>(null);
    const [orderBy, setOrderBy] = useState<
        'spent_at' | '-spent_at' | 'amount' | '-amount'
    >('spent_at');

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
                        setOrderBy(
                            e.target.value as
                                | 'spent_at'
                                | '-spent_at'
                                | 'amount'
                                | '-amount',
                        )
                    }
                    value={orderBy}
                >
                    <option value={'spent_at'}>spent_at</option>
                    <option value={'-spent_at'}>-spent_at</option>
                    <option value={'amount'}>amount</option>
                    <option value={'-amount'}>-amount</option>
                </select>
            </div>
            <div className={css['currencyFilter']}>
                <button onClick={() => setCurrencyFilter(null)}>All</button>
                <button onClick={() => setCurrencyFilter(SpendingCurrency.USD)}>
                    USD
                </button>
                <button onClick={() => setCurrencyFilter(SpendingCurrency.HUF)}>
                    HUF
                </button>
            </div>
        </div>
    );
};

export default ListFilters;
