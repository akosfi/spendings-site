import { createContext } from 'react';
import SpendingRepository from '../domain/SpendingRepository';
import RemoteSpendingRepository from '../remote/RemoteSpendingRepository';
import axiosInstance from 'remote/axiosInstance';

export type SpendingContextType = {
    spendingRepository: SpendingRepository;
};

const spendingContext = createContext<SpendingContextType>({
    spendingRepository: new RemoteSpendingRepository(axiosInstance),
});

export default spendingContext;
