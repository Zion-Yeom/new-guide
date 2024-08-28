import axios, {AxiosInstance, AxiosResponseHeaders} from 'axios';
import * as Token from '@/plugin/axios/token';
// import { hookError } from '@/config'
import {CacheAxiosResponse, CacheRequestConfig, setupCache} from 'axios-cache-interceptor';
import router from '@/plugin/router';

const DEFAULT_ROUTER_CACHE_TIME = 1000 * 60 * 10; //10분
const DEFAULT_CACHE_TIME = 1000;
const HEADER_CACHE_KEY = 'X-Cache-Key';

function createInstance(includeResponseHeaders = false): AxiosInstance {
    const instance = setupCache(
        axios.create({
            paramsSerializer: {
                serialize: function (data) {
                    const params = new URLSearchParams();
                    for (const key in data) {
                        params.append(key, data[key]);
                    }
                    return params.toString();
                }
            }
        }),
        {
            ttl(response: CacheAxiosResponse) {
                const key = response.config.headers[HEADER_CACHE_KEY];
                if (key) {
                    return DEFAULT_ROUTER_CACHE_TIME;
                }
                return DEFAULT_CACHE_TIME;
            }
        }
    );

    //Request interceptors
    instance.interceptors.request.use(
        async (config: CacheRequestConfig): Promise<any> => {
            if (!config.headers) {
                config.headers = {} as any;
            }
            config.headers['remember-me'] = Token.getAccessToken();
            //TODO config.cache === true 경우, DEFAULT_ROUTER_TIME 만큼 저장
            if ((config.cache as any) === true) {
                const key = instance.generateKey(config);
                const data = await instance.storage.get(key);
                if (!data || data.state === 'empty') {
                    config.headers['X-Cache-Key'] = key;
                    setRouterCache(key);
                }
            }

            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response: CacheAxiosResponse) => {
            //const key = response.config.headers[HEADER_CACHE_KEY];
            return includeResponseHeaders ? response : response.data;
        },
        (error: any) => {
            // hookError(error)
            return Promise.reject(error);
        }
    );

    const setRouterCache = (() => {
        const routerCache: Record<string, Set<string>> = {};
        router.afterEach((to, from) => {
            if (to.path !== from.path) {
                routerCache[from.path]?.forEach((key: string) => instance.storage.remove(key));
                routerCache[from.path]?.clear();
            }
        });

        return (key: string) => {
            const {path} = router.currentRoute.value;
            const keys = (routerCache[path] = routerCache[path] || new Set());
            keys.add(key);
        };
    })();

    return instance as AxiosInstance;
}

export function extractFileNameFromHeader(header: AxiosResponseHeaders) {
    const value = header.get('Content-Disposition') as string;
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(value);
    if (matches != null && matches[1]) {
        return decodeURIComponent(matches[1].replace(/['"]/g, ''));
    }
    return '';
}

export default createInstance(false);

export const CancelToken = axios.CancelToken;

export const instanceWithHeaders = createInstance(true);
