import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from '@/app/_utils/fetcher';

// .env から SWR のポーリング間隔を取得する。
// .env に SWR_POLLING_INTERVAL が設定されていない場合は、5000ミリ秒(5秒)をデフォルト値とする。
const swrPollingInterval = process.env.SWR_POLLING_INTERVAL ? parseInt(process.env.SWR_POLLING_INTERVAL) : 5000;
const defaultConfig: SWRConfiguration = {
    // swrPollingInterval ミリ秒間隔で API をポーリングし、データが更新されていれば、
    // データを再取得し、画面に再描画される。
    refreshInterval: swrPollingInterval,

    // fallbackDataでサーバー側でレンダリング(SSR)する際のデータを指定できる。
    // サーバーでレンダリングされたHTMLをブラウザが読み込んで表示するので、APIをリクエストする前に表示が完了する。
    // https://swr.vercel.app/ja/docs/with-nextjs#pre-rendering-with-default-data
    fallbackData: [], 
};

export const useSWRPolling = <T>(url: string, config: SWRConfiguration = defaultConfig) => {
    return useSWR<T>(url, fetcher, config)
}