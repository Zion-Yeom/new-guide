import {defineStore} from 'pinia';
import {User} from '@/defines/user';
import axios from 'axios';
import {ref} from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);

    async function load(token: string): Promise<User> {
        user.value = await axios.get<any, User>('https://arches.xenoimpact.com/api/auth/user', {
            headers: {'Remember-Me': token}
        });
        // console.log(user.value);
        return user.value;
    }

    return {user, load};
});
