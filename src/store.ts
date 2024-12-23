import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import { Cryptocurrency, Pair, CryptoPrice } from './types';
import { getCryptos , fetchCurrentCryptoPrice} from './services/CryptoService';

type CryptoStore = {
    cryptocurrencies : Cryptocurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>

}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL : "",
        PRICE : "",
        HIGHDAY: "",
        LOWDAY : "",
        CHANGEPCT24HOUR: "",
        LASTUPDATE: ""
    },
    fetchCryptos: async() => {
       const cryptocurrencies = await getCryptos()
       console.log(cryptocurrencies);
       set(() => ({
        cryptocurrencies
       }))
    },
    loading: false,

    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        await fetchCurrentCryptoPrice(pair)
        const result = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
        
    }
})))