import spendingListSelectors from 'modules/spendings/spending-list/redux/selectors';
import listSpendingsThunk from 'modules/spendings/spending-list/redux/thunks/listSpendingsThunk';
import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'redux/store';
import { useSpendingContext } from 'modules/spendings';

import ListItem from './components/list-item/ListItem';

import css from './List.module.scss';

const List: FC = () => {
    const { spendingRepository, spendingFactory } = useSpendingContext();
    const dispatch = useDispatch<AppDispatch>();
    const spendings = useSelector((state) =>
        spendingListSelectors.getSpendings(state, spendingFactory),
    );
    const isLoading = useSelector(spendingListSelectors.getIsLoading);
    const filters = useSelector(spendingListSelectors.getFilters);

    useEffect(() => {
        dispatch(
            listSpendingsThunk({
                spendingRepository,
                order: filters.ordering,
                currency: filters.currency,
            }),
        );
    }, [dispatch, spendingRepository, filters]);

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
