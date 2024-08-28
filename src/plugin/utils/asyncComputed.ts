import {nextTick, Ref, ref, shallowRef, triggerRef, watchEffect} from 'vue';

export interface AsyncComputedRef<T> extends Ref<T> {
    /**
     * 현재 진행중인 비동기 함수의 Promise 반환합니다.
     */
    get promise(): Promise<T>;

    /**
     * 비동기 함수를 재호출하여 결과 값을 갱신합니다.
     */
    refresh(): void;

    /**
     * 비동기 작업이 실행중인지를 반환합니다.
     */
    isLoading(): boolean;

    /**
     * 결과 값을 defaultValue 값으로 초기화합니다.
     */
    clear(): void;

    /**
     * 비동기 작업을 시작하고 해당 Promise를 반환합니다.
     */
    start(): Promise<T>;
}

/**
 * 이 파일은 비동기 컴퓨티드 속성을 생성하는 asyncComputed 함수를 구현합니다.
 * 이 함수는 비동기식으로 데이터를 받아와서 계산된 값(Ref)으로 만드는 역할을 합니다.
 * options.manual 이용하여  비동기 작업을 수동으로 실행할수 있습니다.
 * @param asyncResolver
 * @param defaultValue
 * @param {Object} [options] -
 * @param {boolean} [options.manual] - 수동으로 asyncComputed 활성화 시킵니다.
 *
 * @example
 * ```js
 * // 사용자의 아이디가 바뀔 때마다, 해당 아이디를 가진 사용자의 정보를 받아옵니다.
 * const id = ref(1)
 * const user = asyncComputed(async () => {
 *   const response = await axios.get(`https://api.example.com/user/${id.value}`)
 *   return response.data;
 * }, {} )
 *
 * // 아래와 같은 함수들로 데이터를 새로 받아오거나, 로딩 중인지 확인하거나, 데이터를 초기화할 수도 있습니다.
 * user.refresh()  //갱신
 * user.isLoading()  //진행중인지 확인
 * user.clear()  //초기화
 * ```
 */

export default function asyncComputed<T = any>(
    asyncResolver: (onCancel?: any) => Promise<T>,
    defaultValue: T = null,
    options?: {
        manual: boolean;
    }
): AsyncComputedRef<T> {
    const internal = ref<T>(defaultValue) as AsyncComputedRef<T>;
    const count = shallowRef<number>(0);

    let promise: Promise<T>;
    let loading = false;
    let isStarted = false;

    const startWatchingEffect = () => {
        if (isStarted) {
            return;
        }

        isStarted = true;
        watchEffect(
            async onCleanup => {
                count.value++;
                const id = count.value;
                let isCompleted = false;
                loading = true;
                try {
                    const onCancel = (cb: () => void) => {
                        onCleanup(() => {
                            if (!isCompleted) {
                                cb();
                            }
                        });
                    };

                    promise = asyncResolver(onCancel);
                    const result = await promise;
                    if (id === count.value) {
                        internal.value = result;
                    }
                } catch (error) {
                    if (id === count.value) {
                        console.error(error);
                    }
                } finally {
                    isCompleted = true;
                    loading = false;
                }
            },
            {flush: 'post'}
        );
    };

    if (!options?.manual) {
        startWatchingEffect();
    }

    Object.defineProperty(internal, 'promise', {
        get() {
            return promise || Promise.resolve();
        }
    });

    internal.refresh = () => {
        triggerRef(count);
    };

    internal.clear = () => {
        internal.value = defaultValue;
    };

    internal.isLoading = () => loading;

    internal.start = async () => {
        startWatchingEffect();
        await nextTick();
        return promise;
    };

    return internal;
}
