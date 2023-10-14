import spendingListSelectors from 'modules/spendings/spending-list/redux/selectors';
import { useSelector } from 'react-redux';

import css from './ErrorAlert.module.scss';

const ErrorAlert = () => {
    const error = useSelector(spendingListSelectors.getError);

    if (!error) {
        return null;
    }
    return <div className={css['alert']}>{error}</div>;
};

export default ErrorAlert;
