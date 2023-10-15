import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.scss';
import { SpendingContextProvider } from 'modules/spendings';
import RemoteSpendingRepository from 'modules/spendings/remote/RemoteSpendingRepository';
import axiosInstance from 'remote/axiosInstance';

const spendingRepository = new RemoteSpendingRepository(axiosInstance);

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SpendingContextProvider spendingContextValue={{ spendingRepository }}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SpendingContextProvider>
    );
}
