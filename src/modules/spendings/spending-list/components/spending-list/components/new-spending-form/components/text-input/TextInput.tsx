import { FC } from 'react';

import css from './TextInput.module.scss';

type TextInputProps = {
    value: string;
    setValue: (value: string) => void;
    type?: 'number' | 'string';
    placeholder?: string;
};

const TextInput: FC<TextInputProps> = ({
    value,
    setValue,
    type = 'string',
    placeholder = '',
}) => (
    <input
        className={css['input']}
        type={type}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder={placeholder}
    />
);

export default TextInput;
