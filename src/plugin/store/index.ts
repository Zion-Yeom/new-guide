import {createPinia, defineStore} from 'pinia';
import {computed, ref} from 'vue';
import axios from 'axios';
import {useMenuStore} from '@/plugin/store/menuStore';
import {useUserStore} from '@/plugin/store/userStore';
import {useI18nStore} from '@/plugin/store/localeStore';
import {useCategoryStore} from '@/plugin/store/categoryCodeStore';
import {useSystemTimeStore} from '@/plugin/store/systemTimeStore';

export const useRootStore = defineStore('root', () => {
    const isInitialized = ref<boolean>(false);
    const user = computed(() => useUserStore().user);
    const menus = computed(() => useMenuStore().menus);

    async function initialize(token: string):Promise<boolean> {
        if (isInitialized.value) {
            return true;
        }
        const userStore = useUserStore();
        const menuStore = useMenuStore();
        const i18nStore = useI18nStore();
        const codeStore = useCategoryStore();
        const timeStore = useSystemTimeStore();

        await Promise.all([
            //1. 유저정보
            userStore.load(token),
            //2. 메뉴정보
            menuStore.load(token),
            //3. 다국어
            i18nStore.load(),
            //4. 공통 카테고리 코드
            codeStore.load(),
            //5. 시스템 시간
            timeStore.load()
        ]);

        isInitialized.value = true;
        return true;
    }

    async function getTokens(userId: string, password: string): Promise<string> {
        const result = await axios.post(`https://arches.xenoimpact.com/api/auth/login?userId=${userId}&password=${password}`);
        return result.headers['remember-me'];
    }


    function test(){
        return isInitialized;
    }

    return {isInitialized, user, menus, initialize, getTokens, test};
});

export default createPinia();
