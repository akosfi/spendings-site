import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import listSpendingsThunk from '../../redux/thunks/listSpendingsThunk';
import { AppDispatch } from 'redux/store';
import spendingListSelectors from '../../redux/selectors';
import createSpendingThunk from '../../redux/thunks/createSpendingThunk';
import { SpendingCurrency } from 'modules/spendings/domain/Spending';

const SpendingList: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const spendings = useSelector(spendingListSelectors.getSpendings);

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState<SpendingCurrency>(
        SpendingCurrency.USD,
    );

    const handleSave = () =>
        dispatch(
            createSpendingThunk({
                spendingToCreate: {
                    description,
                    amount,
                    currency,
                    spentAt: '2023-09-04T18:58:13.359000Z',
                },
            }),
        );

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

    useEffect(() => {
        dispatch(listSpendingsThunk({}));
    }, [dispatch]);

    return (
        <div>
            <div>
                <h2>Inputs</h2>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />

                <select
                    onChange={(e) =>
                        setCurrency(e.target.value as SpendingCurrency)
                    }
                    value={currency}
                >
                    <option value={'HUF'}>HUF</option>
                    <option value={'USD'}>USD</option>
                </select>

                <button onClick={handleSave}>Save</button>
            </div>
            <div>
                <h2>Filters</h2>
                <div>
                    <button onClick={() => setCurrencyFilter(null)}>All</button>
                    <button
                        onClick={() => setCurrencyFilter(SpendingCurrency.USD)}
                    >
                        USD
                    </button>
                    <button
                        onClick={() => setCurrencyFilter(SpendingCurrency.HUF)}
                    >
                        HUF
                    </button>
                </div>
                <div>
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
            </div>
            <div>
                <h2>Spendings list</h2>
                {spendings.map((spending) => (
                    <div key={spending.id}>{spending.description}</div>
                ))}
            </div>
        </div>
    );
};

export default SpendingList;
