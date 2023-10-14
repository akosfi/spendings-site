import { SpendingCurrency } from 'modules/spendings';
import createSpendingThunk from 'modules/spendings/spending-list/redux/thunks/createSpendingThunk';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { RemoteSpendingFactory } from 'modules/spendings/remote/RemoteSpending';

import css from './NewSpendingForm.module.scss';
import TextInput from './components/text-input/TextInput';
import Button from './components/button/Button';
import SelectInput, { SelectOption } from '../select-input/SelectInput';

const currencyOptions: SelectOption[] = Object.values(SpendingCurrency).map(
    (currency) => ({ id: currency, label: currency }),
);

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
                spendingToCreate: new RemoteSpendingFactory().from({
                    description,
                    amount,
                    currency,
                    spentAt: new Date().toISOString(),
                    id: 0,
                }),
                resetForm: () => {
                    setDescription('');
                    setAmount(0);
                    setCurrency(SpendingCurrency.USD);
                },
            }),
        );

    return (
        <div className={css['form']}>
            <TextInput
                value={description}
                setValue={setDescription}
                placeholder="description"
            />
            <TextInput
                type="number"
                value={String(amount)}
                setValue={(value) => setAmount(Number(value))}
                placeholder="0"
            />

            <SelectInput
                value={currency}
                options={currencyOptions}
                setValue={(option) =>
                    setCurrency(option.id as SpendingCurrency)
                }
            />

            <Button label="Save" onClick={handleSave} disabled={!description} />
        </div>
    );
};

export default NewSpendingForm;
