/**
 * 입력 및 요청의 연속 실행을 제한하는 'debounce' 구현 함수입니다.
 * 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우, 마지막 이벤트만 지연 시간이 지난 후 실행합니다.
 * @param fn
 * @param delay
 * @param context
 */
export function debounce(fn, delay = 100, context = null) {
    let id = null;
    const callback = (...args) => {
        if (id) {
            clearTimeout(id);
        }
        id = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
    callback.cancel = () => {
        clearTimeout(id);
    };
    return callback;
}
//# sourceMappingURL=debounce.js.map