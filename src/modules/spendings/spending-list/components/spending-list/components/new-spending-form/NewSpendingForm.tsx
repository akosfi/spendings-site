import { SpendingCurrency } from 'modules/spendings';
import createSpendingThunk from 'modules/spendings/spending-list/redux/thunks/createSpendingThunk';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';

import css from './NewSpendingForm.module.scss';

const NewSpendingForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
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
                resetForm: () => {
                    setDescription('');
                    setAmount(0);
                    setCurrency(SpendingCurrency.USD);
                },
            }),
        );

    return (
        <div className={css['form']}>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="description"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="0"
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
    );
};

export default NewSpendingForm;
