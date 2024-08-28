/**
 * 지정된 시간만큼 대기합니다.
 * @param milliSecond
 */
export default function delay(milliSecond) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliSecond);
    });
}
/**
 * 지정된 프레임 수만큼 대기합니다.
 */
export function delayFrame(count) {
    return new Promise(resolve => {
        function checkFrame() {
            if (--count <= 0) {
                resolve();
            }
            else {
                window.requestAnimationFrame(checkFrame);
            }
        }
        window.requestAnimationFrame(checkFrame);
    });
}
//# sourceMappingURL=delay.js.map