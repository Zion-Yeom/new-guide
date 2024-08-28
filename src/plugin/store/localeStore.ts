import {defineStore} from 'pinia';
import axios from '@/plugin/axios';
import {i18n} from '@/plugin/i18n';
import {ref} from 'vue';

const LOCALE_META = {langKo: 'ko', langEn: 'en', langCn: 'zh', langEtc1: 'etc-1'};

function itemsToLocaleMessages(items: Array<object>): {
    ko: Array<object>;
    en: Array<object>;
    zh: Array<object>;
    langEtc1: Array<object>;
} {
    return items.reduce((result, item) => {
        for (const key in LOCALE_META) {
            const lang = LOCALE_META[key];
            let langMap = result[lang];
            if (!langMap) {
                langMap = result[lang] = {};
            }
            const code = item['i18nCode'];
            const value = item[key];
            if (value) {
                langMap[code] = value;
            }
        }
        return result;
    }, {} as any);
}

export const useI18nStore = defineStore('i18n', () => {
    async function load(): Promise<boolean> {
        const result = await axios.get<any, Array<object>>('https://arches.xenoimpact.com/api/admin/i18n/all');
        const languages = itemsToLocaleMessages(result);
        Object.entries(LOCALE_META).forEach(([key, value]) => {
            i18n.setLocaleMessage(value, languages[value]);
        });
        // console.log(result);
        return true;
    }

    return {load};
});
