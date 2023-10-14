import { FC } from 'react';

import css from './Toggle.module.scss';
import classNames from 'classnames';

type ToggleProps = {
    onClick: () => void;
    label: string;
    isActive?: boolean;
};

const Toggle: FC<ToggleProps> = ({ onClick, label, isActive = false }) => (
    <div
        className={classNames(css['toggle'], {
            [css['toggle-active']]: isActive,
        })}
        onClick={onClick}
    >
        {label}
    </div>
);

export default Toggle;
