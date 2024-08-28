/**
 * 파일을 선택할 수 있는 파일창을 엽니다.
 * @param accept 선택가능한 파일 종류 지정. ex)'image/*' 모든 이미지
 * @param multiple 여러 파일 선택 여부
 */
export default function browse(accept, multiple = false) {
    const bodyElement = document.body;
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    if (accept) {
        input.setAttribute('accept', accept);
    }
    if (multiple) {
        input.setAttribute('multiple', 'multiple');
    }
    input.style.display = 'none';
    bodyElement.appendChild(input);
    const promise = new Promise(resolve => {
        const onFocus = event => {
            bodyElement.removeEventListener('focus', onFocus, true);
            setTimeout(() => {
                if (!input.value) {
                    resolve(null);
                }
                bodyElement.removeChild(input);
            }, 1000);
        };
        const onClick = event => {
            bodyElement.addEventListener('focus', onFocus, true);
            input.removeEventListener('click', onClick);
        };
        const onChange = () => {
            input.removeEventListener('change', onChange);
            resolve(input.files);
        };
        input.addEventListener('click', onClick);
        input.addEventListener('change', onChange);
    });
    input.click();
    return promise;
}
//# sourceMappingURL=browse.js.map