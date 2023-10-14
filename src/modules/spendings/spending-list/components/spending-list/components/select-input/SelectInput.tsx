import { FC } from 'react';

import css from './SelectInput.module.scss';

export type SelectOption = {
    id: string;
    label: string;
};

type SelectInputProps = {
    value: string;
    options: SelectOption[];
    setValue: (option: SelectOption) => void;
};

const SelectInput: FC<SelectInputProps> = ({ value, options, setValue }) => (
    <select
        onChange={(e) => {
            const selectedOption = options.find(
                ({ id }) => id === e.target.value,
            );

            if (selectedOption) {
                setValue(selectedOption);
            }
        }}
        value={value}
        className={css['select']}
    >
        {options.map((option) => (
            <option key={option.id} value={option.id}>
                {option.label}
            </option>
        ))}
    </select>
);

export default SelectInput;
