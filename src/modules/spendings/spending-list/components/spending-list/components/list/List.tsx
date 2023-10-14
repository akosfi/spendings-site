import spendingListSelectors from 'modules/spendings/spending-list/redux/selectors';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';

import css from './List.module.scss';

const List: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const spendings = useSelector(spendingListSelectors.getSpendings);

    useEffect(() => {
        dispatch(listSpendingsThunk({}));
    }, [dispatch]);

    return (
        <div className={css['list']}>
            {spendings.map((spending) => (
                <div className={css['list-item']} key={spending.id}>
                    <div className={css['icon-container']}>
                        <div className={css['icon']}>$</div>
                    </div>

                    <div className={css['information']}>
                        <p className={css['description']}>
                            {spending.description}
                        </p>
                        <p>{spending.spentAt}</p>
                    </div>
                    <div />
                    <div className={css['amount']}>{spending.amount}</div>
                    <div className={css['actions']}>actions</div>
                </div>
            ))}
        </div>
    );
};

export default List;
