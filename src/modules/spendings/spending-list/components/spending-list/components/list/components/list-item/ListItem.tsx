import { FC, useMemo } from 'react';
import { Spending } from 'modules/spendings';

import css from './ListItem.module.scss';
import MoneyFormatterFactory from './money-formatter/MoneyFormatter';

type ListItemProps = {
    spending: Spending;
};

const ListItem: FC<ListItemProps> = ({ spending }) => {
    const formattedAmount = useMemo(
        () =>
            new MoneyFormatterFactory().getFormatter(spending).format(spending),
        [spending],
    );
    return (
        <div className={css['item']} key={spending.id}>
            <div className={css['icon-container']}>
                <div className={css['icon']}>$</div>
            </div>

            <div className={css['information']}>
                <p className={css['description']}>{spending.description}</p>
                <p>{spending.spentAt}</p>
            </div>
            <div />
            <div className={css['amount']}>{formattedAmount}</div>
            <div className={css['actions']}>actions</div>
        </div>
    );
};

export default ListItem;
