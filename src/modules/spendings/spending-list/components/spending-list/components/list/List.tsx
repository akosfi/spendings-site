import spendingListSelectors from 'modules/spendings/spending-list/redux/selectors';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';

import css from './List.module.scss';
import ListItem from './components/list-item/ListItem';
import useSpendingContext from 'modules/spendings/context/useSpendingContext';

const List: FC = () => {
    const { spendingRepository, spendingFactory } = useSpendingContext();
    const dispatch = useDispatch<AppDispatch>();
    const spendings = useSelector((state) =>
        spendingListSelectors.getSpendings(state, spendingFactory),
    );
    const isLoading = useSelector(spendingListSelectors.getIsLoading);

    useEffect(() => {
        dispatch(listSpendingsThunk({ spendingRepository }));
    }, [dispatch, spendingRepository]);

    const listFragment = useMemo(() => {
        if (isLoading) {
            return (
                <div
                    className={css['spinner-area']}
                    data-testid="List/container"
                >
                    <span
                        className={css['spinner']}
                        data-testid="List/spinner"
                    />
                </div>
            );
        }
        return (
            <div data-testid="List/container">
                {spendings.map((spending) => (
                    <ListItem key={spending.id} spending={spending} />
                ))}
            </div>
        );
    }, [isLoading, spendings]);

    return listFragment;
};

export default List;
