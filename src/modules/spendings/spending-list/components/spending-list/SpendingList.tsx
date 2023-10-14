import { FC } from 'react';

import NewSpendingForm from './components/new-spending-form/NewSpendingForm';
import ListFilters from './components/list-filters/ListFilters';
import List from './components/list/List';
import ErrorAlert from './components/error-alert/ErrorAlert';

import css from './SpendingList.module.scss';

const SpendingList: FC = () => (
    <div className={css['content']}>
        <NewSpendingForm />
        <ErrorAlert />
        <ListFilters />
        <List />
    </div>
);

export default SpendingList;
