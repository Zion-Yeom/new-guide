import {App} from 'vue';
import {useRootStore} from '@/plugin/store';
import * as Token from '@/plugin/axios/token';

export default function config(app: App) {
    const rootStore = useRootStore();

    // rootStore.getTokens(import.meta.env.VITE_USER_ID, import.meta.env.VITE_USER_PASSWORD).then(result => {
    //     Token.setAccessToken(result);
    //     rootStore.initialize(result);
    // });
    (async () => {
        const token = await rootStore.getTokens(import.meta.env.VITE_USER_ID, import.meta.env.VITE_USER_PASSWORD);
        Token.setAccessToken(token);
        await rootStore.initialize(token);
    })();
    return app;
}
