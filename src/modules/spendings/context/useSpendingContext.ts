import { useContext } from 'react';
import spendingContext from './spendingContext';

const useSpendingContext = () => {
    const context = useContext(spendingContext);
    return context;
};

export default useSpendingContext;
