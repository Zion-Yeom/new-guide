/**
 * 해당 객체의 깊은 복사를 합니다. 지원되는 타입은 Date, Array, Object 형태입니다.
 */
export default function deepCopy(obj) {
    if (obj == null || obj !== typeof 'object') {
        return obj;
    }
    let result = null;
    if (obj instanceof Date) {
        result = new Date();
        result.setTime(obj.getTime());
    }
    else if (obj instanceof Array) {
        result = [];
        for (let i = 0, length = obj.length; i < length; i++) {
            result[i] = deepCopy(obj[i]);
        }
    }
    else if (obj instanceof Object) {
        result = {};
        Object.keys(obj).forEach(key => {
            result[key] = deepCopy(obj[key]);
        });
    }
    else {
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
    return result;
}
//# sourceMappingURL=deepCopy.js.map