import {defineStore} from 'pinia';
import axios from '@/plugin/axios';

export const useSystemTimeStore = defineStore('system-time', () => {
    const state = {
        server: 0,
        base: 0
    };

    async function load() {
        const dateString = await axios.get<any, string>('/api/echo/system/time', {
            responseType: 'text'
        });
        state.server = new Date(dateString).getTime();
        state.base = Date.now();
        // console.log(state.base);
    }

    /**
     * 현재 날짜를 반환합니다.
     */
    function getCurrentDate() {
        return new Date(state.server + Date.now() - state.base);
    }

    return {
        load,
        getCurrentDate
    };
});
