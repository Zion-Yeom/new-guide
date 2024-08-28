import { HierarchyList } from 'vrix.vue';
/**
 * 전체 노드를 탐색합니다.
 * 지정된 함수(callBack)에 대해 true를 반환하는 모든 항목이 포함된 새 배열을 만듭니다.
 * @param array 계층구졸르 가진 배열입니다.
 * @param callback  function callback(node, parent, children)
 * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
 * @param postOrder true 이면 후위탐색, false 이면 전위탐색
 * @return true 반환하는 항목의 배열입니다.
 */
export function find(array, callback, prefetchNode, postOrder) {
    return new HierarchyList(array).find(callback, prefetchNode, postOrder);
}
/**
 * 전체 노드를 탐색합니다.
 * 지정된 함수(callBack)에 대해 처음으로 true를 반환하는 항목을 반환하고 탐색을 중지합니다.
 * @param array 계층구졸르 가진 배열입니다.
 * @param callback  function callback(node, parent, children)
 * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
 * @param postOrder true 이면 후위탐색, false 이면 전위탐색
 * @return 처음으로 true를 반환하는 항목입니다.
 */
export function findOne(array, callback, prefetchNode, postOrder) {
    return new HierarchyList(array).findOne(callback, prefetchNode, postOrder);
}
//# sourceMappingURL=tree.js.map