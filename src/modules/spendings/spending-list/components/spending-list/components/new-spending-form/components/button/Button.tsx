import { FC, useCallback } from 'react';

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
}) => {
    const handleOnClick = useCallback(() => {
        if (!disabled) {
            onClick();
        }
    }, [disabled, onClick]);

    return (
        <button
            className={css['button']}
            onClick={handleOnClick}
            disabled={disabled}
            data-testid={testId}
        >
            {label}
        </button>
    );
};

export default Button;
