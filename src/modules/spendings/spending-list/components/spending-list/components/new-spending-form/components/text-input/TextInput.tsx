import { FC } from 'react';

import css from './TextInput.module.scss';

type TextInputProps = {
    value: string;
    setValue: (value: string) => void;
    type?: 'number' | 'string';
    placeholder?: string;
    testId?: string;
};

const TextInput: FC<TextInputProps> = ({
    value,
    setValue,
    type = 'string',
    placeholder = '',
    testId,
}) => (
    <input
        className={css['input']}
        type={type}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder={placeholder}
        data-testid={testId}
    />
);

export default TextInput;
