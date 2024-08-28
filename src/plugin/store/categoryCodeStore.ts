import {LabelValues} from '@/defines/labelValue';
import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from '@/plugin/axios';

type Code = {
    codeList: LabelValues | null;
};

export const useCategoryStore = defineStore('category-code', () => {
    const codeList = ref([]);

    async function load(): Promise<LabelValues> {
        const result = await axios.get<any, LabelValues>('https://arches.xenoimpact.com/api/opsq/clf/hierarchy');
        // console.log(result);
        codeList.value = result;
        return result;
    }

    return {codeList, load};
});
