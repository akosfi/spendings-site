import spendingListSelectors from 'modules/spendings/spending-list/redux/selectors';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';

import css from './List.module.scss';
import ListItem from './components/list-item/ListItem';

const List: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const spendings = useSelector(spendingListSelectors.getSpendings);
    const isLoading = useSelector(spendingListSelectors.getIsLoading);

    useEffect(() => {
        dispatch(listSpendingsThunk({}));
    }, [dispatch]);

    const listFragment = useMemo(() => {
        if (isLoading) {
            return (
                <div className={css['spinner-area']}>
                    <span className={css['spinner']} />
                </div>
            );
        }
        return (
            <div>
                {spendings.map((spending) => (
                    <ListItem key={spending.id} spending={spending} />
                ))}
            </div>
        );
    }, [isLoading, spendings]);

    return listFragment;
};

export default List;
