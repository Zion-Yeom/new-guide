import {defineStore} from 'pinia';
import axios, {AxiosResponse} from 'axios';
import {Menus} from '@/defines/menu';
import {ref} from 'vue';
import delay from '@/plugin/utils/delay';

export const useMenuStore = defineStore('menu', () => {
    const menus = ref([]);

    async function load(token: string): Promise<void> {
        await delay(3000);
        const result = await axios.get<any, AxiosResponse<Menus>>('https://arches.xenoimpact.com/api/menu/admin/tree', {
            headers: {'Remember-Me': token}
        });
        // console.log('메뉴호출완료!!!!!');
        // console.log(result);
        menus.value = result.data;
    }

    return {menus, load};
});
