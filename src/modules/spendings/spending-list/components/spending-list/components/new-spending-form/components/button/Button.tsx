import { FC } from 'react';

import css from './Button.module.scss';

type ButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ label, onClick, disabled = false }) => (
    <button className={css['button']} onClick={onClick} disabled={disabled}>
        {label}
    </button>
);

export default Button;
