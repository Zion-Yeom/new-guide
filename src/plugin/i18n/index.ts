import {createI18n, TranslateResult} from 'vue-i18n';
import {App} from 'vue';

export type LangType = 'ko' | 'en';

const instance = createI18n({
    legacy: false,
    locale: 'ko', // set locale
    fallbackLocale: 'ko' // set fallback locale
});
export const i18n = instance.global;
export default function install(app: App): void {
    instance.install(app);
    app.config.globalProperties.$tf = (item: Record<string, any>, fieldMap: {[k in LangType]: string}): TranslateResult => {
        if (!item) {
            return '';
        }

        const field = fieldMap![i18n.locale.value as LangType] || fieldMap![i18n.fallbackLocale.value as LangType];
        if (!field) {
            console.warn('`$tf`의 필드 지정이 잘못 되었습니다.', item, fieldMap);
            return '';
        }
        if (!(field in item)) {
            console.warn('`$tf`의 item에 정의된 필드가 없습니다.', item, fieldMap);
            return '';
        }
        return item[field];
    };
}
