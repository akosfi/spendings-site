import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.scss';
import {
    SpendingContextProvider,
    RemoteSpendingFactory,
    RemoteSpendingRepository,
} from 'modules/spendings';
import axiosInstance from 'remote/axiosInstance';

const spendingRepository = new RemoteSpendingRepository(axiosInstance);
const spendingFactory = new RemoteSpendingFactory();

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SpendingContextProvider
            spendingContextValue={{ spendingRepository, spendingFactory }}
        >
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SpendingContextProvider>
    );
}
