import { FC } from 'react';

import css from './Button.module.scss';

type ButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    testId?: string;
};

const Button: FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    testId,
}) => (
    <button
        className={css['button']}
        onClick={onClick}
        disabled={disabled}
        data-testid={testId}
    >
        {label}
    </button>
);

export default Button;
