import { FC, ReactElement } from 'react';
import spendingContext, { SpendingContextType } from './spendingContext';

type SpendingProviderProps = {
    children: ReactElement;
    spendingContextValue: SpendingContextType;
};

const SpendingContext: FC<SpendingProviderProps> = ({
    children,
    spendingContextValue,
}) => (
    <spendingContext.Provider value={spendingContextValue}>
        {children}
    </spendingContext.Provider>
);

export default SpendingContext;
