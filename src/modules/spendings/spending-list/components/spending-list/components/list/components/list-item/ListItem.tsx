import { FC, useMemo } from 'react';
import { Spending } from 'modules/spendings';

import css from './ListItem.module.scss';
import MoneyFormatterFactory from './money-formatter/MoneyFormatter';
import moment from 'moment';

type ListItemProps = {
    spending: Spending;
};

const ListItem: FC<ListItemProps> = ({ spending }) => {
    const formattedAmount = useMemo(
        () =>
            new MoneyFormatterFactory().getFormatter(spending).format(spending),
        [spending],
    );

    const formattedDescription = useMemo(() => {
        if (spending.description.length > 45) {
            return `${spending.description.slice(0, 45)}...`;
        }
        return spending.description;
    }, [spending.description]);

    const formattedSpentAtDate = useMemo(
        () =>
            moment(new Date(spending.spentAt)).format('h:mm A - MMMM DD, YYYY'),
        [spending.spentAt],
    );

    return (
        <div className={css['item']} key={spending.id}>
            <div className={css['icon-container']}>
                <div className={css['icon']}>$</div>
            </div>

            <div className={css['information']}>
                <p
                    className={css['description']}
                    data-testid="ListItem/description"
                >
                    {formattedDescription}
                </p>
                <p className={css['spentAtDate']}>{formattedSpentAtDate}</p>
            </div>
            <div />
            <div className={css['amount']}>{formattedAmount}</div>
            <div className={css['actions']}>
                <div className={css['icon']}>
                    <img src="/assets/edit_icon.svg" />
                </div>
                <div className={css['icon']}>
                    <img src="/assets/close_icon.svg" />
                </div>
            </div>
        </div>
    );
};

export default ListItem;
