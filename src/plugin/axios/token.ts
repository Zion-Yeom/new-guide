import {useCookies} from '@vueuse/integrations/useCookies';
const cookies = useCookies();
const ACCESS_TOKEN_KEY = 'remember-me';
const REFRESH_TOKEN_KEY = 'refreshToken';

export function getAccessToken(): string {
    // return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    return cookies.get(ACCESS_TOKEN_KEY);
}

export function setAccessToken(value: string): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, value);
    cookies.set(ACCESS_TOKEN_KEY, value /*import.meta.env.VITE_ACCESS_TIME*/);
}

export function removeAccessToken(): void {
    //sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    cookies.remove(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string {
    //return sessionStorage.getItem(REFRESH_TOKEN_KEY);
    return cookies.get(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(value: string): void {
    //sessionStorage.setItem(REFRESH_TOKEN_KEY, value);
    cookies.set(REFRESH_TOKEN_KEY, value /*import.meta.env.VITE_REFRESH_TIME*/);
}

export function removeRefreshToken(): void {
    //sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    cookies.remove(REFRESH_TOKEN_KEY);
}
