import spendingListSelectors from 'modules/spendings/spending-list/redux/selectors';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';

import css from './List.module.scss';
import ListItem from './components/list-item/ListItem';

const List: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const spendings = useSelector(spendingListSelectors.getSpendings);

    useEffect(() => {
        dispatch(listSpendingsThunk({}));
    }, [dispatch]);

    return (
        <div className={css['list']}>
            {spendings.map((spending) => (
                <ListItem key={spending.id} spending={spending} />
            ))}
        </div>
    );
};

export default List;
