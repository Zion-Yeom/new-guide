/*!
 * vrix.vue v1.3.1
 * https://www.xenoimpact.com/
 * (c) 2023 XENOIMPACT
 */
import { render, defineComponent, getCurrentInstance, createVNode, queuePostFlushCb, inject, computed, ref, h, onUpdated, onMounted, onUnmounted, toRefs, watchEffect, watch, provide, nextTick, reactive, isProxy } from "vue";
/*!
 * vrix.js v1.4.2
 * https://www.xenoimpact.com/
 * (c) 2023 XENOIMPACT
 */
const HIDDEN_CSS = "width: auto; height: auto; overflow: hidden; position: fixed;visibility: hidden; top: -99999px; left: -99999px;";
function parseHTML(html) {
  html = html == null ? void 0 : html.replace(/(\t|\n$)/g, "");
  if (typeof HTMLTemplateElement === "undefined") {
    const dummy = document.createElement("div");
    dummy.innerHTML = html;
    const fragment = document.createDocumentFragment();
    fragment.appendChild(dummy.firstChild);
    return fragment;
  }
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}
function buildHTML(value, ...args) {
  let result = null;
  if (value instanceof HTMLElement) {
    result = value.cloneNode(true);
  } else if (value instanceof Function) {
    result = value.apply(this, args);
  } else {
    result = value;
  }
  if (typeof result === "string") {
    const template = parseHTML(result);
    if (template) {
      return document.importNode(template, true).querySelector("*");
    }
  } else if (result instanceof HTMLElement) {
    return result;
  }
  return null;
}
function ready(context = document) {
  return new Promise((resolve) => {
    if (context.readyState === "complete" || context.readyState === "interactive") {
      resolve(context);
    } else {
      context.addEventListener("DOMContentLoaded", () => {
        resolve(context);
      }, { once: true });
    }
  });
}
function findElement(selector, context = document) {
  if (!selector) {
    return null;
  }
  let result;
  if (selector instanceof HTMLElement) {
    result = selector;
  } else {
    result = context.querySelector("" + selector);
  }
  if (!result) {
    console.warn("not found.", selector, "context : ", context);
  }
  return result;
}
function addClass(element, ...name) {
  const classList = element.classList;
  const names = Array.isArray(name) ? name : [name];
  const filtered = names.filter((n) => !classList.contains(n));
  if (filtered.length > 0) {
    DOMTokenList.prototype.add.apply(classList, filtered);
    return true;
  }
  return false;
}
function removeClass(element, name) {
  const classList = element.classList;
  if (classList == null ? void 0 : classList.contains(name)) {
    classList.remove(name);
    return true;
  }
  return false;
}
function toggleClass(element, name, bool) {
  return bool ? addClass(element, name) : removeClass(element, name);
}
function setAttribute(element, name, value = "") {
  if ((element == null ? void 0 : element.getAttribute(name)) !== value) {
    element.setAttribute(name, value);
    return true;
  }
  return false;
}
function removeAttribute(element, name) {
  if (element == null ? void 0 : element.hasAttribute(name)) {
    element.removeAttribute(name);
    return true;
  }
  return false;
}
function toggleAttribute(element, name, value) {
  if (value == null || value === false) {
    return removeAttribute(element, name);
  } else {
    return setAttribute(element, name, typeof value === "boolean" ? "" : value);
  }
}
function isEditableElement(element) {
  return ["input", "textarea"].indexOf(element == null ? void 0 : element.tagName.toLowerCase()) >= 0 || element.isContentEditable;
}
function isScrollable(value) {
  return value.split(" ").every((v) => v === "auto" || v === "scroll");
}
function isScrollableX(element) {
  const { overflow, overflowX } = window.getComputedStyle(element);
  return isScrollable(overflow) || isScrollable(overflowX);
}
function isScrollableY(element) {
  const { overflow, overflowY } = window.getComputedStyle(element);
  return isScrollable(overflow) || isScrollable(overflowY);
}
function findScroller(element) {
  if (!element) {
    return null;
  }
  while (element) {
    if (isScrollableX(element) || isScrollableY(element)) {
      return element;
    }
    element = element.parentElement;
  }
  return document.documentElement;
}
function setX(element, value) {
  if (element.__x !== value) {
    element.__x = value;
    element.style.left = isNaN(value) ? "" + value : value + "px";
    return true;
  }
  return false;
}
function setY(element, value) {
  if (element.__y !== value) {
    element.__y = value;
    element.style.top = isNaN(value) ? "" + value : value + "px";
    return true;
  }
  return false;
}
function setWidth(element, value) {
  if (element.__width !== value) {
    element.__width = value;
    element.style.width = isNaN(value) ? "" + value : value + "px";
    return true;
  }
  return false;
}
function setHeight(element, value) {
  if (element.__height !== value) {
    element.__height = value;
    element.style.height = isNaN(value) ? "" + value : value + "px";
    return true;
  }
  return false;
}
function setSize(element, width, height) {
  const wChanged = setWidth(element, width);
  const hChanged = setHeight(element, height);
  return wChanged || hChanged;
}
var Dom = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  HIDDEN_CSS,
  addClass,
  buildHTML,
  findElement,
  findScroller,
  isEditableElement,
  isScrollableX,
  isScrollableY,
  ready,
  removeAttribute,
  removeClass,
  setAttribute,
  setHeight,
  setSize,
  setWidth,
  setX,
  setY,
  toggleAttribute,
  toggleClass
});
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegExp(text = "") {
  return reHasRegExpChar.test(text) ? text.replace(reRegExpChar, "\\$&") : text;
}
function cache(fn) {
  const cache2 = {};
  return function(value) {
    let result = cache2[value];
    if (!result) {
      result = fn(value);
    }
    return result;
  };
}
function debounce(fn, context = null, delay2 = 100) {
  let timerId = null;
  const callback = function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(function() {
      fn.apply(context, args);
    }, delay2);
  };
  callback.cancel = () => {
    clearTimeout(timerId);
    timerId = null;
  };
  return callback;
}
function throttle(func, context = null, delay2 = 100) {
  let isAccess = true;
  const callback = function(...args) {
    if (!isAccess) {
      return;
    }
    isAccess = false;
    func.apply(context, args);
    setTimeout(function() {
      isAccess = true;
    }, delay2);
  };
  callback.cancel = () => {
    isAccess = true;
  };
  return callback;
}
function parsePath(path) {
  return (path == null ? void 0 : path.indexOf(".")) !== -1 && path.split(".") || [path];
}
function getValue(item, path) {
  if (!item || !path) {
    return null;
  }
  const pathArray = Array.isArray(path) ? path : parsePath(path);
  const num = pathArray == null ? void 0 : pathArray.length;
  let o = item;
  for (let i = 0; i < num; i++) {
    const field = pathArray[i];
    if (field in o) {
      o = o[field];
    } else {
      return null;
    }
  }
  return o;
}
function setValue(item, path, value) {
  const pathArray = Array.isArray(path) ? path : parsePath(path);
  const num = pathArray.length;
  let o = item;
  let i = 0;
  for (; i < num - 1; i++) {
    const field = pathArray[i];
    if (field in o) {
      o = o[field];
    } else {
      o = null;
      break;
    }
  }
  if (o && num > 0 && o[pathArray[i]] !== value) {
    o[path[i]] = value;
    return true;
  }
  return false;
}
function includesArray(source, target, isStrict = false) {
  source = source || [];
  target = target || [];
  return (!isStrict || source.length === target.length) && target.every((o) => source.indexOf(o) >= 0);
}
const treeSearch = /* @__PURE__ */ (() => {
  const search = function(parent, items, callback, childField = "children", once = false) {
    let found = [];
    for (let i = 0, num = items == null ? void 0 : items.length; i < num; i++) {
      const item = items[i];
      const children = item[childField];
      const result = callback(item, parent, children || []);
      if (result) {
        found.push(item);
      }
      if (once) {
        break;
      }
      if (Array.isArray(children) && children.length > 0) {
        found = found.concat(search(item, children, callback, childField));
      }
    }
    return found;
  };
  return (items, callback, childField = "children", once = false) => {
    return search(null, items, callback, childField);
  };
})();
function treeSearchOnce(items, callback, childField = "children") {
  return treeSearch(items, callback, childField, true)[0] || null;
}
function watchEvent(target, type, listener, options) {
  target.addEventListener(type, listener, options);
  return () => {
    target.removeEventListener(type, listener, options);
  };
}
function watchEventOnce(target, type, listener, options) {
  const handler = (event) => {
    listener.apply(target, [event]);
    cancel();
  };
  const cancel = () => {
    target.removeEventListener(type, handler, options);
  };
  target.addEventListener(type, handler, options);
  return cancel;
}
function highlight(text, search, tagTemplate) {
  if (!search) {
    return text;
  }
  const expression = escapeRegExp(search);
  const regexp = new RegExp(`(${expression.split(" ").join("|")})`, "gi");
  return `${text.replace(regexp, tagTemplate)}`;
}
const isBrowser = {
  ie: /MSIE|Trident|Edge\//.test(window.navigator.userAgent)
};
var Util = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  cache,
  debounce,
  escapeRegExp,
  getValue,
  highlight,
  includesArray,
  isBrowser,
  setValue,
  throttle,
  treeSearch,
  treeSearchOnce,
  watchEvent,
  watchEventOnce
});
class CancelError extends Error {
  constructor(message = "Cancelled") {
    super(message);
    this.name = "CancelError";
  }
}
class ProgressPromise {
  constructor(executor) {
    this.pendingProgresses = [];
    this.finished = false;
    this.onProgresses = [];
    this.promise = new Promise((resolve, reject) => {
      this.resolveFn = (result) => {
        this.finished = true;
        this.clear();
        resolve(result);
      };
      this.rejectFn = (reason) => {
        this.finished = true;
        this.clear();
        reject(reason);
      };
    });
    executor(this.resolveFn, this.rejectFn, (...args) => {
      if (!this.initialized) {
        this.pendingProgresses.push(args);
        return;
      }
      try {
        this.onProgresses.forEach((listener) => listener.apply(this, args));
      } catch (error) {
        this.rejectFn(error);
      }
    });
    this.initialized = true;
  }
  then(onfulfilled, onrejected) {
    this.promise = this.promise.then(onfulfilled, onrejected);
    return this;
  }
  catch(onrejected) {
    this.promise = this.promise.catch(onrejected);
    return this;
  }
  finally(onfinally) {
    this.promise = this.promise.finally(onfinally);
    return this;
  }
  /**
   * 프로미스가 진행될 때 호출되는 콜백 함수를 등록합니다.
   */
  progress(onProgress) {
    if (typeof onProgress !== "function") {
      throw new TypeError("not a function");
    }
    try {
      this.pendingProgresses.forEach((result) => {
        onProgress.apply(this, result);
      });
    } catch (error) {
      this.rejectFn(error);
    }
    this.onProgresses.push(onProgress);
    return this;
  }
  /**
   * 완료되지 않은 프로미스를 취소합니다.
   */
  cancel(reason) {
    if (!this.finished) {
      this.rejectFn(new CancelError(reason || "Promise was canceled"));
    }
  }
  /**
   * @private
   */
  clear() {
    this.onProgresses = [];
  }
}
function delayTime(delay2) {
  return new ProgressPromise((resolve) => window.setTimeout(resolve, delay2));
}
function delayFrame(count) {
  return new ProgressPromise((resolve) => {
    function checkFrame() {
      if (--count <= 0) {
        resolve();
      } else {
        window.requestAnimationFrame(checkFrame);
      }
    }
    window.requestAnimationFrame(checkFrame);
  });
}
var delay = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  delayFrame,
  delayTime
});
const Reason = {
  NONE: 0,
  RESET: 1 << 0,
  RESIZE: 1 << 1,
  SELECT: 1 << 2,
  SCROLL: 1 << 3,
  CARET: 1 << 4,
  ITEM_ADD: 1 << 5,
  ITEM_REMOVE: 1 << 6,
  ITEM_UPDATE: 1 << 7,
  ITEM_MOVE: 1 << 8,
  FOCUS_IN: 1 << 9,
  FOCUS_OUT: 1 << 10,
  LABEL: 1 << 11,
  VALUE: 1 << 12,
  PLACEHOLDER: 1 << 13,
  ATTRIBUTES: 1 << 14,
  REFRESH: 1 << 15,
  STATE: 1 << 16,
  TITLE: 1 << 17,
  MIN: 1 << 18,
  MAX: 1 << 19,
  ALL: 16777215
};
const INSTANCE_NAME = "__instance__";
class EventTargetWithType extends EventTarget {
  addEventListener(type, listener, options) {
    super.addEventListener(type, listener, options);
  }
  removeEventListener(type, listener, options) {
    super.removeEventListener(type, listener, options);
  }
}
const Config = /* @__PURE__ */ function() {
  const cache2 = /* @__PURE__ */ new WeakMap();
  return {
    get(ctor) {
      return cache2.get(ctor) || {};
    },
    set(ctor, value) {
      cache2.set(ctor, value);
    }
  };
}();
class Base extends EventTargetWithType {
  constructor() {
    super();
  }
  get config() {
    if (!this._config) {
      let config = {};
      let clazz = this.constructor;
      while (clazz) {
        if ("config" in clazz) {
          config = Object.assign({}, clazz.config, config);
        }
        clazz = Object.getPrototypeOf(clazz);
      }
      this._config = config;
    }
    return this._config;
  }
  static get config() {
    return Config.get(this);
  }
  static set config(value) {
    Config.set(this, value);
  }
}
const DEFAULT_PRIORITY = {
  items: 200,
  suggestSource: 200,
  selectedItem: 500,
  selectedItems: 500,
  selectedValue: 500,
  selectedValues: 500
};
function toSortPriorityKeys(options = {}, map = DEFAULT_PRIORITY) {
  return Object.keys(options).sort((a, b) => {
    const ap = map[a] || 0;
    const bp = map[b] || 0;
    if (ap < bp) {
      return -1;
    }
    if (ap > bp) {
      return 1;
    }
    return 0;
  });
}
function parseAnnotations(element, names = []) {
  let results = [];
  if (element.attributes) {
    const attributes = Array.prototype.slice.call(element.attributes);
    attributes.forEach((attribute) => {
      const name = attribute.name;
      const value = attribute.value;
      if (names.indexOf(attribute.name) >= 0 && value != null) {
        results.push({ element, name, value });
      }
    });
  }
  let child = element.firstChild;
  while (child) {
    results = results.concat(parseAnnotations(child, names));
    child = child.nextSibling;
  }
  return results;
}
const Parser = /* @__PURE__ */ function() {
  const cache2 = /* @__PURE__ */ new WeakMap();
  return {
    build(ctor, html) {
      if (!cache2.has(ctor)) {
        const element = buildHTML(html);
        const annotations = parseAnnotations(element, ["id"]) || [];
        cache2.set(ctor, { element, annotations });
      }
      return ctor;
    },
    mount(instance) {
      let clazz = instance.constructor;
      let templated = null;
      while (clazz && !templated) {
        templated = cache2.get(clazz);
        if (templated) {
          break;
        }
        clazz = Object.getPrototypeOf(clazz);
      }
      if (!templated) {
        throw new Error(`${clazz.name} class not found.`);
      }
      const root = templated.element.cloneNode(true);
      const refs = {};
      templated.annotations.forEach((annotation) => {
        const name = annotation.name.toLowerCase();
        const value = annotation.value;
        if (name === "id") {
          let element = root.querySelector('[id="' + value + '"]');
          if (!element && root.getAttribute("id") === value) {
            element = root;
          }
          refs[value] = element;
          if (element) {
            element.removeAttribute(name);
          }
        }
      });
      root[INSTANCE_NAME] = instance;
      return {
        refs,
        root
      };
    }
  };
}();
class Element extends Base {
  constructor() {
    super();
    this._invalidateFlag = false;
    this._reasonsMask = 0;
    this.isMounted = false;
    this.isDestroyed = false;
    this.resizable = true;
    this.__dom__ = Parser.mount(this);
  }
  /**
   * 돔에 마운트 되는 HTMLElement 입니다.
   */
  get root() {
    return this.__dom__.root;
  }
  /**
   * 엘리먼트에 여러 옵션을 설정합니다.
   * 여러 속성을 한번에 적용하기 위함입니다.
   * @param options
   */
  setOptions(options = {}) {
    toSortPriorityKeys(options).forEach((key) => {
      if (key in this) {
        this[key] = options[key];
      }
    });
    return this;
  }
  /**
   * HTMLElement 인스턴스를 지정한 컨테이너에 마운트합니다.
   * @param container
   * @param options
   */
  mount(container, options = {}) {
    var _a;
    (_a = this.root.parentElement) == null ? void 0 : _a.removeChild(this.root);
    let parent = null;
    if (container instanceof HTMLElement) {
      parent = container;
    } else if (typeof container === "string") {
      parent = document.querySelector(container);
    }
    if (parent instanceof HTMLElement) {
      parent.appendChild(this.root);
      this.setOptions(options);
      this.isMounted = true;
    } else {
      throw new Error(`Invalid container : [${container}]`);
    }
    this.watchResize();
    return this;
  }
  /**
   * 엘리먼트를 해당 부모 엘리먼트에서 제거합니다.
   */
  unmount() {
    if (this.root.parentElement) {
      this.root.parentElement.removeChild(this.root);
      this.unwatchResize();
      this.isMounted = false;
    }
    return this;
  }
  /**
   * 관련 리소스를 정리하고 인스턴스를 해제합니다.
   */
  destroy() {
    this.isDestroyed = true;
    this.cancelInvalidate();
    this.unmount();
    this.dispatchEvent(new CustomEvent("destroy"));
  }
  /**
   * invalidateFor 의해 자동호출됩니다.
   * 레이아웃 계산 및 각 변경된 속성 값을 적용합니다.
   * @protected
   */
  doLayout() {
  }
  /**
   * 표시 목록을 갱신을 요청합니다.
   */
  invalidate() {
    this.invalidateFor();
  }
  /**
   * 대기중인 표시 목록 갱신을 바로 실행합니다.
   */
  flush() {
    if (this._invalidateFlag) {
      if (!this.isDestroyed) {
        this.doLayout();
      }
      this._reasonsMask = 0;
      this._invalidateFlag = false;
      this._frameId = null;
    }
  }
  /**
   * 지정된 플레그 따라 표시 목록을 갱신을 요청합니다.
   * 이 메소드는 변경된 내용이 적용되는 작업을 다음 렌더링 시점에 doLayout 호출합니다.
   */
  invalidateFor(reason = Reason.NONE) {
    this._reasonsMask |= reason | 0;
    if (!this._invalidateFlag) {
      this._invalidateFlag = true;
      this._frameId = window.requestAnimationFrame(() => {
        this.flush();
      });
    }
  }
  /**
   * 지정된 플레그가 있는지 확인합니다.
   * @param reasons
   * @protected
   */
  hasInvalidateReason(...reasons) {
    return reasons.some((reason) => (this._reasonsMask & reason) === reason);
  }
  /**
   * 갱신 요청을 취소하고 모든 플래그를 초기화합니다.
   */
  cancelInvalidate() {
    if (this._invalidateFlag) {
      window.cancelAnimationFrame(this._frameId);
      this._reasonsMask = 0;
      this._invalidateFlag = false;
      this._frameId = null;
    }
  }
  /**
   * 크기변경을 감지하는 ResizeObserver를 활성화합니다.
   */
  watchResize() {
    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver((entries, observer) => {
        if (this.resizable) {
          this.invalidateFor(Reason.RESIZE);
          this.dispatchEvent(new CustomEvent("resize"));
        }
      });
      this.resizeObserver.observe(this.root);
    }
  }
  /**
   * 크기변경을 감지를 해제합니다.
   */
  unwatchResize() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  /**
   * 커스텀 이벤트 발생시킵니다.
   * @param type
   * @param detail
   * @param cancelable
   * @param bubbles
   * @protected
   */
  dispatchCustomEvent(type, detail = null, cancelable = false, bubbles = false) {
    return this.dispatchEvent(new CustomEvent(type, { bubbles, cancelable, detail }));
  }
  static create(container, options = {}) {
    return new this().mount(container, options);
  }
  static template(html) {
    return Parser.build(this, html);
  }
  static getInstance(element) {
    return element == null ? void 0 : element[INSTANCE_NAME];
  }
}
class SelectableElement extends Element {
  constructor() {
    super();
    this.valueField = null;
    this.useLazyValue = true;
    this.selector = new this.selectorFactory((data) => {
      return this.dispatchSelectionEvent("selection-changing", data, true);
    }, (data) => {
      this.doSelectionUpdate(data);
      this.dispatchSelectionEvent("selection-change", data);
    }, (data) => {
      const source = this.selector.source;
      if (data.kind === "reset" && (source == null ? void 0 : source.length) > 0) {
        if (this.pendingFn) {
          this.pendingFn();
          this.pendingFn = null;
        }
        if (this.maxSelection > 0 && this.maxSelection < this.minSelection) {
          this.maxSelection = this.minSelection;
        }
        if (this.minSelection > 0 && !this.selectedItem) {
          this.setSelectedItems(source.toArray().slice(0, this.minSelection));
        }
      }
    });
  }
  get selectorFactory() {
    throw new Error("selectorFactory is null");
  }
  /**
   * 최소 선택 아이템 개수입니다.
   */
  get minSelection() {
    return this.selector.min;
  }
  set minSelection(value) {
    if (value !== this.minSelection) {
      this.selector.min = value;
      this.dispatchCustomEvent("min-selection-change", value);
    }
  }
  /**
   * 최대 선택 아이템 개수입니다.
   */
  get maxSelection() {
    return this.selector.max;
  }
  set maxSelection(value) {
    if (value !== this.maxSelection) {
      this.selector.max = value;
      this.dispatchCustomEvent("max-selection-change", value);
    }
  }
  /**
   * 적어도 하나의 아이템이 항상 선택되어야 하는 여부입니다.
   */
  get requireSelection() {
    return this.minSelection > 0;
  }
  set requireSelection(value) {
    this.minSelection = value ? 1 : 0;
  }
  /**
   * 사용자가 여러 항목을 선택할 수 있는지 여부입니다.
   */
  get allowMultiple() {
    return this.maxSelection !== 1;
  }
  set allowMultiple(value) {
    this.maxSelection = value ? 0 : 1;
  }
  /**
   * 선택된 아이템을 정의합니다.
   */
  get selectedItem() {
    var _a;
    return ((_a = this.selectedItems) == null ? void 0 : _a.length) > 0 ? this.selectedItems[0] : null;
  }
  set selectedItem(item) {
    this.setSelectedItem(item);
  }
  /**
   * 복수 선택된 아이템을 정의합니다.
   */
  get selectedItems() {
    return this.selector.items;
  }
  set selectedItems(items) {
    if (items && !Array.isArray(items)) {
      throw new Error("items is not array.");
    }
    this.setSelectedItems(items);
  }
  /**
   * 선택된 아이템의 `valueField` 속성 값을 정의합니다
   */
  get selectedValue() {
    return this.selectedValues[0] ?? null;
  }
  set selectedValue(value) {
    this.selectedValues = value != null ? [value] : [];
  }
  /**
   * 선택된 아이템들의 `valueField` 속성 값들로 구성된 배열을 정의합니다.
   */
  get selectedValues() {
    var _a;
    return (_a = this.selectedItems) == null ? void 0 : _a.map((item) => getValue(item, this.valueField));
  }
  set selectedValues(values) {
    this.setSelectedValues(values);
  }
  setSelectedItem(item) {
    this.setSelectedItems(item != null ? [item] : []);
  }
  setSelectedItems(items) {
    this.selector.set(items);
  }
  setSelectedValues(values) {
    var _a;
    if (values && !Array.isArray(values)) {
      throw new Error("items is not array.");
    }
    if (!this.valueField) {
      console.warn("valueField is null.");
      return;
    }
    if (!values) {
      values = [];
    }
    if (this.useLazyValue && !((_a = this.selector.source) == null ? void 0 : _a.length)) {
      this.pendingFn = () => {
        this.setSelectedValues(values);
      };
      return;
    } else if (this.pendingFn) {
      this.pendingFn = null;
    }
    const olds = this.selectedValues;
    if (values.length !== olds.length || !values.every((item) => olds.indexOf(item) >= 0)) {
      const items = values.reduce((result, value) => {
        const found = this.selector.find(this.valueField, value);
        if (found) {
          result.push(found);
        }
        return result;
      }, []);
      if (items.length < values.length) {
        console.warn(`'values' are not included in 'items[${this.valueField}]'.`, values);
      } else {
        this.setSelectedItems(items);
      }
    }
  }
  hasSelectedItem(item) {
    return this.selector.has(item);
  }
  addSelectedItem(item) {
    return this.selector.add(item);
  }
  removeSelectedItem(item) {
    return this.selector.remove(item);
  }
  toggleSelectedItem(item) {
    return this.selector.toggle(item);
  }
  clearSelection() {
    this.selector.clear();
  }
  dispatchSelectionEvent(type, data, cancelable = false) {
    if (this.isDestroyed) {
      return false;
    }
    return this.dispatchEvent(new CustomEvent(type, {
      cancelable,
      detail: data
    }));
  }
  doSelectionUpdate(data) {
    this.invalidateFor(Reason.SELECT);
  }
}
class EventCounter {
  constructor(thisArg) {
    this.count = 0;
    this.thisArg = thisArg;
  }
  start(callback) {
    if (this.count <= 0 && callback) {
      if (callback) {
        callback();
      }
    }
    this.count++;
  }
  stop(callback) {
    this.count--;
    if (this.count <= 0) {
      if (callback) {
        callback();
      }
      this.count = 0;
    }
  }
  cancel() {
    this.count--;
  }
}
class IList extends EventTargetWithType {
  constructor() {
    super();
    this._source = [];
    this._locals = null;
    this._filter = null;
    this.counter = new EventCounter(this);
  }
  /**
   * 원본 데이터 배열입니다.
   */
  get source() {
    return this._source;
  }
  set source(value) {
    if (this._source !== value) {
      this._source = value;
      this.reset();
    }
  }
  /**
   * filter, sort 적용된 배열입니다.
   */
  get locals() {
    return this._locals;
  }
  get length() {
    var _a;
    return ((_a = this.locals) == null ? void 0 : _a.length) || 0;
  }
  /**
   * 필터함수를 정의하고 적용합니다.
   */
  get filter() {
    return this._filter;
  }
  set filter(filter) {
    if (this._filter !== filter) {
      this._filter = filter;
      this.refresh();
    }
  }
  /**
   * 인덱스에 해당하는 아이템을 반환합니다.
   * @param index
   */
  get(index) {
    if (index >= 0 && index < this.length) {
      return this.locals[index];
    }
    return null;
  }
  /**
   * 해당 아이템의 첫 번째 인덱스를 반환합니다.
   * @param item
   * @param fromIndex
   */
  indexOf(item, fromIndex) {
    return this.locals.indexOf(item, fromIndex);
  }
  /**
   * 아이템의 마지막 인덱스를 반환합니다.
   * @param item
   * @param fromIndex
   */
  lastIndexOf(item, fromIndex) {
    return this.locals.lastIndexOf(item, fromIndex);
  }
  /**
   * 아이템이 리스트에 포함되어 있는지 확인합니다.
   * @param item
   */
  contains(item) {
    return this.indexOf(item) >= 0;
  }
  /**
   * 인덱스와 속성으로 아이템의 값을 설정합니다.
   * @param index
   * @param property
   * @param value
   */
  setValue(index, property, value) {
    return this.internalSetValue(this.get(index), property, value);
  }
  setItemValue(item, property, value) {
    return this.internalSetValue(item, property, value);
  }
  /**
   * @private
   */
  internalSetValue(item, property, value) {
    if (item && property) {
      const oldValue = getValue(item, property);
      if (value !== oldValue) {
        this.counter.start();
        setValue(item, property, value);
        this.counter.stop(() => {
          this.dispatchCollectionEvent({
            kind: "update",
            item,
            index: this.indexOf(item),
            property,
            newValue: value,
            oldValue
          });
        });
        return true;
      }
    }
    return false;
  }
  /**
   * 정렬 필드 배열을 사용하여 아이템을 정렬합니다.
   * @param sortFields
   */
  sort(sortFields) {
    const num = sortFields == null ? void 0 : sortFields.length;
    if (num > 0) {
      this.sortCompareFn = (a, b) => {
        for (const field of sortFields) {
          let aValue = a[field.name] ?? "";
          let bValue = b[field.name] ?? "";
          if (field.ignoreCase) {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
          let comparison = 0;
          if (field.compare) {
            comparison = field.compare(aValue, bValue);
          } else {
            comparison = field.numeric ? +aValue - +bValue : String(aValue).localeCompare(String(bValue));
          }
          if (comparison !== 0) {
            return field.descending ? comparison * -1 : comparison;
          }
        }
        return 0;
      };
    } else {
      this.sortCompareFn = null;
    }
    this.refresh();
  }
  /**
   * 리스트를 초기 상태로 되돌립니다.
   */
  reset() {
    this.counter.start();
    this.internalReset();
    this.counter.stop(() => {
      this.dispatchCollectionEvent({ kind: "reset" });
    });
  }
  /**
   * 리스트를 새로 고칩니다.
   */
  refresh() {
    this.counter.start();
    this.internalReset();
    this.counter.stop(() => {
      this.dispatchCollectionEvent({ kind: "refresh" });
    });
  }
  /**
   * 리스트의 모든 아이템을 제거합니다.
   */
  clear() {
    this.source = [];
  }
  /**
   * 정렬 및 필터링이 적용된 배열의 복사본을 반환합니다.
   * 없는 경우 빈 배열을 반환합니다.
   */
  toArray() {
    var _a;
    return ((_a = this.locals) == null ? void 0 : _a.slice(0)) || [];
  }
  /**
   * 컬렉션에서 사용할 수 있는 배열 아이템을 반환합니다.
   */
  toStableArray() {
    var _a;
    return ((_a = this.source) == null ? void 0 : _a.slice(0)) || [];
  }
  /**
   * 해당 콜백 조건을 만족하는 모든 항목을 찾아 배열로 반환합니다.
   * @param callback
   */
  find(callback) {
    return [];
  }
  /**
   * 해당 콜백 조건을 만족하는 첫 번째 항목을 찾아 반환합니다.
   * @param callback
   */
  findOne(callback) {
    return null;
  }
  /**
   * 현재 컬렉션의 복제본을 만들어 반환합니다.
   */
  clone() {
    return null;
  }
  internalReset() {
  }
  dispatchCollectionEvent(detail) {
    return this.dispatchEvent(new CustomEvent("collection-change", { detail }));
  }
}
function numericCompare(a, b) {
  if (isNaN(a) && isNaN(b)) {
    return 0;
  }
  if (isNaN(a)) {
    return 1;
  }
  if (isNaN(b)) {
    return -1;
  }
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
class ArrayList extends IList {
  constructor(source) {
    super();
    if (source) {
      this.source = source;
    }
  }
  /**
   * 아이템을 맨끝 위치에 추가합니다.
   * @param item
   * @returns {boolean}
   */
  add(item) {
    return this.addAt(this.length, item);
  }
  /**
   * 지정된 위치에 아이템을 추가합니다.
   * @param index
   * @param item
   * @returns {boolean}
   */
  addAt(index, item) {
    if (index >= 0) {
      if (index >= this.length) {
        index = this.length;
      }
      this.counter.start();
      const source = this.source;
      const locals = this.locals;
      const isFiltered = !this.filter || this.filter(item, index, source);
      if (this.source !== locals) {
        let sourceIndex = index;
        let localIndex = index;
        if (this.sortCompareFn) {
          sourceIndex = source.length;
        } else if (isFiltered) {
          sourceIndex = index >= locals.length ? source.length : source.indexOf(locals[index]);
        }
        this.source.splice(sourceIndex, 0, item);
        if (isFiltered) {
          if (this.sortCompareFn) {
            localIndex = this.findInsertIndex(locals, item);
          }
        }
        if (!this.filter || this.filter(item, index, source)) {
          if (this.sort) {
            localIndex = this.findInsertIndex(locals, item);
          } else {
            let i = sourceIndex - 1;
            while (i >= 0) {
              const sItem = source[i];
              if (this.filter(sItem, i, source)) {
                localIndex = locals.indexOf(sItem);
                if (localIndex >= 0) {
                  localIndex += 1;
                  break;
                }
              }
              i--;
            }
            if (localIndex < 0) {
              localIndex = 0;
            }
          }
        } else {
          localIndex = -1;
        }
        if (localIndex >= 0) {
          locals.splice(localIndex, 0, item);
        }
        index = localIndex;
      } else {
        locals.splice(index, 0, item);
      }
      this.counter.stop(() => this.dispatchArrayListEvent("add", item, index));
      return true;
    }
    return false;
  }
  /**
   * 아이템 목록을 맨끝 위치부터 추가합니다.
   * @param items
   */
  addAll(items) {
    return this.addAllAt(this.length, items);
  }
  /**
   * 아이템 목록을 지정된 위치부터 추가합니다.
   * @param index
   * @param items
   */
  addAllAt(index, items) {
    const num = items == null ? void 0 : items.length;
    if (num > 0 && index >= 0) {
      const indices = [];
      this.counter.start();
      for (let i = 0; i < num; i++) {
        this.addAt(index + i, items[i]);
        indices.push(index + i);
      }
      this.counter.stop(() => this.dispatchArrayListEvent("add", items, indices));
      return true;
    }
    return false;
  }
  /**
   * 아이템을 삭제합니다.
   * @param item
   * @returns {boolean}
   */
  remove(item) {
    return this.removeAt(this.indexOf(item));
  }
  /**
   * 지정된 위치의 아이템을 삭제합니다.
   * @param index
   * @returns {Array | null}
   */
  removeAt(index) {
    let removed = null;
    if (index >= 0 && index < this.length) {
      this.counter.start();
      removed = this._locals.splice(index, 1)[0];
      if (this.source !== this._locals) {
        this.source.splice(this.source.indexOf(removed), 1);
      }
      this.counter.stop(() => this.dispatchArrayListEvent("remove", removed, index));
    }
    return removed;
  }
  /**
   * 지정된 index 부터 length 길이만큼 데이타를 삭제합니다.
   * @param index
   * @param length
   */
  removeRange(index, length) {
    const from = Math.max(0, index);
    const to = Math.min(this.length, from + length) - 1;
    if (from <= to) {
      length = to - from + 1;
      this.counter.start();
      const indices = new Array(length).fill(from).map((v, i) => v + i);
      const removed = this._locals.splice(from, length);
      if (this.source !== this._locals) {
        removed.forEach((item) => {
          this.source.splice(this.source.indexOf(item), 1);
        });
      }
      this.counter.stop(() => this.dispatchArrayListEvent("remove", removed, indices, { to }));
    }
    return null;
  }
  /**
   * 아이템 목록을 삭제합니다.
   * @param {Array} items
   * @returns {boolean}
   */
  removeAll(items) {
    this.counter.start();
    const removedIndices = items.map((item) => this.indexOf(item)).filter((index) => index >= 0).sort(numericCompare);
    const removedItems = removedIndices.slice(0).reverse().map((index) => this.removeAt(index));
    if (removedItems.length > 0) {
      this.counter.stop(() => this.dispatchArrayListEvent("remove", removedItems, removedIndices));
    } else {
      this.counter.cancel();
    }
    return removedItems;
  }
  /**
   * 지정된 위치에 아이템을 덮어씁니다.
   * @param index
   * @param item
   * @returns {boolean}
   */
  setAt(index, item) {
    if (index >= 0 && index < this.length) {
      this.counter.start();
      this.removeAt(index);
      this.addAt(index, item);
      this.counter.stop(() => {
        this.dispatchArrayListEvent("set", item, index);
      });
      return true;
    }
    return false;
  }
  /**
   * 배열의 'from' 아이템을 'to' 위치에 이동합니다.
   * @param from
   * @param to
   * @returns {boolean}
   */
  move(from, to) {
    if (from !== to && 0 <= from && from < this.length && 0 <= to) {
      this.counter.start();
      const item = this.removeAt(from);
      this.addAt(to, item);
      this.counter.stop(() => this.dispatchArrayListEvent("move", item, this.indexOf(item), { oldIndex: from }));
      return true;
    }
    return false;
  }
  internalReset() {
    var _a;
    if (((_a = this.source) == null ? void 0 : _a.length) > 0 && (this.sortCompareFn || this.filter)) {
      let array = this.source.slice(0);
      if (this.filter) {
        array = array.filter(this.filter);
      }
      if (this.sortCompareFn) {
        array = array.sort(this.sortCompareFn);
      }
      this._locals = array;
    } else {
      this._locals = this.source;
    }
  }
  /**
   * @private
   */
  findInsertIndex(items, target) {
    let index = 0;
    let lower = 0;
    let upper = items.length - 1;
    while (lower <= upper) {
      index = Math.round((lower + upper) / 2);
      const item = items[index];
      const direction = this.sortCompareFn(item, target);
      if (direction < 0) {
        upper = index - 1;
      } else if (direction > 0) {
        lower = index + 1;
      } else {
        break;
      }
    }
    return index;
  }
  /**
   * @private
   */
  dispatchArrayListEvent(kind, item, index, options = {}) {
    const items = Array.isArray(item) ? item : [item];
    const indices = Array.isArray(index) ? index : [index];
    return this.dispatchCollectionEvent({
      kind,
      items,
      indices,
      item: items[0],
      index: indices[0],
      ...options
    });
  }
  find(callback) {
    return this.locals.filter(callback);
  }
  findOne(callback) {
    return this.locals.find(callback);
  }
  clone() {
    return new ArrayList(this.source);
  }
}
const BLOCK_SIZE = 128;
const BLOCK_SHIFT = 7;
const BLOCK_MASK = 127;
function toBlockIndex(value) {
  return value >> BLOCK_SHIFT;
}
function toBlockOffset(value) {
  return value & BLOCK_MASK;
}
class Block {
  constructor() {
    this._values = new Array(BLOCK_SIZE);
    this._total = 0;
    this._empty = BLOCK_SIZE;
  }
  get empty() {
    return this._empty;
  }
  get total() {
    return this._total;
  }
  get(index) {
    return this._values[index];
  }
  set(index, value) {
    const old = this.get(index);
    if (old != value) {
      if (old == null && value != null) {
        this._empty--;
      } else if (old != null && value == null) {
        this._empty++;
      }
      this._values[index] = value;
      this._total += (value || 0) - (old || 0);
      return true;
    }
    return false;
  }
  add(index, value) {
    const lastValue = this.get(BLOCK_MASK);
    if (lastValue != null) {
      this._total -= lastValue;
      this._empty++;
    }
    this._values.splice(index, 0, void 0);
    this.set(index, value);
    this._values.length = BLOCK_SIZE;
  }
  /**
   *
   * @param index
   */
  remove(index) {
    const value = this.get(index);
    this._values.splice(index, 1);
    if (value != null) {
      this._total -= value;
      this._empty = Math.min(BLOCK_SIZE, this._empty + 1);
    }
    this._values.length = BLOCK_SIZE;
    return value;
  }
}
class LinearVector {
  constructor(length = 0) {
    this._defaultSize = 30;
    this._blocks = [];
    this._gap = 0;
    this._length = length;
  }
  get defaultSize() {
    return this._defaultSize;
  }
  set defaultSize(value) {
    this._defaultSize = value;
  }
  get length() {
    return this._length;
  }
  set length(value) {
    if (this._length !== value) {
      let i = this.length;
      while (i > value) {
        this.removeSize(--i);
      }
      this._length = value;
    }
  }
  get gap() {
    return this._gap;
  }
  set gap(value) {
    this._gap = value;
  }
  clear() {
    this._blocks = [];
  }
  /**
   * 해당 인덱스의 크기 반환합니다.
   * @param index
   */
  getSize(index) {
    const blockIndex = toBlockIndex(index);
    const offset = toBlockOffset(index);
    if (blockIndex >= 0 && blockIndex < this._blocks.length) {
      const size = this.getBlockValue(blockIndex, offset);
      if (size !== void 0) {
        return size;
      }
    }
    return this.defaultSize;
  }
  /**
   * 해당 인덱스의 크기를 덮어씁니다. 전체 길이 변화는 없습니다.
   * @param index
   * @param value
   */
  setSize(index, value) {
    const blockIndex = toBlockIndex(index);
    const offset = toBlockOffset(index);
    const block = this.getBlock(blockIndex);
    return block.set(offset, value);
  }
  /**
   * 해당 인덱스에 크기를 추가합니다. 전체 길이는 +1 합니다.
   * @param index
   * @param value
   */
  addSize(index, value) {
    const blockIndex = toBlockIndex(index);
    const offset = toBlockOffset(index);
    const numBlocks = Math.max(blockIndex + 1, this._blocks.length);
    let nextValue;
    for (let i = blockIndex, o = offset; i < numBlocks; i++) {
      const block = this.getBlock(i);
      nextValue = block.remove(BLOCK_MASK);
      block.add(o, value);
      value = nextValue;
      o = 0;
    }
    if (nextValue != null) {
      const block = this.getBlock(numBlocks);
      block.add(0, nextValue);
    }
    this._length = Math.max(index + 1, this._length + 1);
  }
  /**
   * 해당 인덱스 삭제합니다. 전체 길이 -1 합니다.
   * @param index
   */
  removeSize(index) {
    if (index < 0 || this.length <= index) {
      throw new Error(`${index} is out of range.`);
    }
    const blockIndex = toBlockIndex(index);
    const offset = toBlockOffset(index);
    const numBlocks = this._blocks.length;
    this.getBlock(blockIndex).remove(offset);
    for (let i = blockIndex; i < numBlocks - 1; i++) {
      const cur = this.getBlock(i);
      const next = this.getBlock(i + 1);
      const value = next.remove(0);
      cur.set(BLOCK_MASK, value);
    }
    this._length--;
  }
  /**
   * 해당 길이에 위치한 인덱스를 반환합니다.
   * @param distance
   * @return {number}
   */
  indexOf(distance) {
    let index = 0;
    let blockIndex = 0;
    let blockOffset = 0;
    let startY = 0;
    while (startY < distance) {
      const value = this.calculateBlockTotal(blockIndex);
      if (value + startY > distance) {
        break;
      }
      startY += value;
      blockIndex++;
      index += BLOCK_SIZE;
    }
    while (startY < distance) {
      const value = this.getBlockValue(blockIndex, blockOffset) + this.gap;
      if (value + startY > distance) {
        break;
      }
      startY += value;
      blockOffset++;
      index++;
    }
    return index;
  }
  /**
   * 해당 인덱스 시작까지의 누적 거리
   * @param index
   */
  getStart(index) {
    return this.getTotal(0, index - 1);
  }
  getTotal(from = 0, to = this.length - 1) {
    to = Math.min(to, this.length - 1);
    let total = 0;
    let index = from;
    while (index <= to) {
      while (toBlockOffset(index) === 0 && index + BLOCK_SIZE < to) {
        total += this.calculateBlockTotal(toBlockIndex(index));
        index += BLOCK_SIZE;
      }
      total += this.getSize(index);
      index++;
    }
    total += this.gap * Math.max(0, to - from);
    return total;
  }
  getBlock(index) {
    let block = this._blocks[index];
    if (!block) {
      block = this._blocks[index] = new Block();
    }
    return block;
  }
  calculateBlockTotal(index) {
    const block = this.getBlock(index);
    return block.total + block.empty * this.defaultSize + this.gap * BLOCK_SIZE;
  }
  getBlockValue(blockIndex, offset) {
    const value = this.getBlock(blockIndex).get(offset);
    return value === void 0 ? this.defaultSize : value;
  }
}
function intersect(r1, r2) {
  return r1 && r2 && r1.left <= r2.left + r2.width && r2.left <= r1.left + r1.width && r1.top <= r2.top + r2.height && r2.top <= r1.top + r1.height;
}
function clamp(value, min, max) {
  if (!isNaN(min)) {
    value = Math.max(value, min);
  }
  if (!isNaN(max)) {
    value = Math.min(value, max);
  }
  return value;
}
function fitDelta(rect, boundary) {
  const dx = clamp(rect.left, boundary.left, Math.max(boundary.left, boundary.right - rect.width)) - rect.left;
  const dy = clamp(rect.top, boundary.top, Math.max(boundary.top, boundary.bottom - rect.height)) - rect.top;
  return { x: dx, y: dy };
}
class Layout {
  constructor(instance) {
    this.instance = instance;
    this.linearVector = new LinearVector();
  }
  get length() {
    return this.linearVector.length;
  }
  set length(value) {
    this.linearVector.length = value;
  }
  getSize(index) {
    return this.linearVector.getSize(index);
  }
  setSize(index, value) {
    return this.linearVector.setSize(index, value);
  }
  getStart(index) {
    return this.linearVector.getStart(index);
  }
  indexOf(distance) {
    return this.linearVector.indexOf(distance);
  }
  getTotal(from, to) {
    return this.linearVector.getTotal(from, to);
  }
  clear() {
    this.linearVector.clear();
  }
  measureElement(element) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
}
class VerticalLayout extends Layout {
  constructor(instance) {
    super(instance);
    this.minSize = 20;
  }
  setDefaultSize(size) {
    this.linearVector.defaultSize = clamp(size.height, this.minSize);
  }
  doUpdate(scrollX, scrollY, width, height) {
    const instance = this.instance;
    const collection = instance.collection;
    const rowCount = instance.isExternalScroller ? 0 : instance.rowCount;
    const isAll = height <= 0 && instance.rowCount <= 0;
    const startIndex = isAll ? 0 : this.indexOf(scrollY);
    const startY = isAll ? 0 : this.getStart(startIndex);
    const endIndex = collection.length - 1;
    if (rowCount > 0) {
      height = this.getTotal(0, rowCount - 1);
    }
    let index = startIndex;
    let yy = startY;
    while (index <= endIndex && (isAll || yy < scrollY + height)) {
      const element = instance.createElement(index);
      const size = this.measureElement(element);
      this.setSize(index, size.height || void 0);
      yy += this.getSize(index);
      index++;
      if (rowCount > 0) {
        height = this.getTotal(0, rowCount - 1);
      }
    }
  }
  updateElementAt(index) {
    const element = this.instance.getElementAt(index);
    if (element) {
      const size = this.measureElement(element);
      this.setSize(index, size.height || void 0);
      this.updateContentSize();
    }
  }
  updateContentSize() {
    const instance = this.instance;
    const firstIndex = instance.firstVisibleIndex;
    instance.contentLayer.style.height = this.getTotal(firstIndex) + "px";
    instance.contentLayer.style.top = this.getStart(firstIndex) + "px";
    if (instance.isExternalScroller) {
      instance.root.style.height = this.getTotal() + "px";
    } else if (instance.rowCount > 0) {
      instance.root.style.height = this.getTotal(0, instance.rowCount - 1) + "px";
    }
  }
  positionToIndex(point) {
    return this.indexOf(point.y);
  }
  calculateScrollPositionDelta(index, offset) {
    const start = this.instance.scrollTop - offset.y;
    const end = start + this.instance.scroller.clientHeight;
    const itemStart = this.getStart(index);
    const itemEnd = itemStart + this.getSize(index);
    const ds = itemStart - start;
    const de = itemEnd - end;
    if (start <= itemStart && itemEnd <= end) {
      return null;
    }
    const delta = Math.abs(ds) < Math.abs(de) ? ds : de;
    return { x: 0, y: delta };
  }
  collectionReset() {
    var _a;
    this.clear();
    this.length = ((_a = this.instance.collection) == null ? void 0 : _a.length) || 0;
  }
  collectionSet(index, length) {
    this.linearVector.setSize(index, this.linearVector.defaultSize);
  }
  collectionAdd(index, length) {
    for (let i = 0, size = this.linearVector.defaultSize; i < length; i++) {
      this.linearVector.addSize(index, size);
    }
  }
  collectionRemove(index, length) {
    for (let i = 0; i < length; i++) {
      this.linearVector.removeSize(index);
    }
  }
}
class ItemList {
  constructor(indices = [], items = []) {
    this.indices = indices;
    this.items = items;
  }
  get length() {
    return this.indices.length;
  }
  get firstIndex() {
    return this.indices[0];
  }
  get lastIndex() {
    return this.indices[this.indices.length - 1];
  }
  get firstItem() {
    return this.items[0];
  }
  get lastItem() {
    return this.items[this.items.length - 1];
  }
  getIndices() {
    return this.indices.slice(0);
  }
  has(index) {
    return this.indices.indexOf(index) >= 0;
  }
  get(index) {
    const offset = this.indices.indexOf(index);
    if (offset >= 0) {
      return this.items[offset];
    }
    return null;
  }
  indexOf(item) {
    const offset = this.items.indexOf(item);
    if (offset >= 0) {
      return this.indices[offset];
    }
    return -1;
  }
  add(index, item) {
    this.indices.push(index);
    this.items.push(item);
    return true;
  }
  remove(item) {
    const offset = this.items.indexOf(item);
    if (offset >= 0) {
      this.indices.splice(offset, 1);
      return this.items.splice(offset, 1)[0];
    }
    return null;
  }
  removeAt(index) {
    const offset = this.indices.indexOf(index);
    if (offset >= 0) {
      this.indices.splice(offset, 1);
      return this.items.splice(offset, 1)[0];
    }
    return null;
  }
  forEach(callback) {
    this.items.forEach((item, i) => {
      callback(item, this.indices[i]);
    });
  }
  map(callback) {
    return this.items.map((item, i) => {
      return callback(item, this.indices[i]);
    });
  }
  clear() {
    this.indices = [];
    this.items = [];
  }
  clone() {
    return new ItemList(this.indices.slice(0), this.items.slice(0));
  }
  concat(target) {
    return new ItemList(this.indices.concat(target.indices), this.items.concat(target.items));
  }
  collectionSet(index, length) {
    this.removeAt(index);
  }
  collectionAdd(index, length) {
    for (let i = 0, num = this.indices.length; i < num; i++) {
      if (this.indices[i] >= index) {
        this.indices[i] += length;
      }
    }
  }
  collectionRemove(index, length) {
    for (let i = length - 1; i >= 0; i--) {
      this.removeAt(index + i);
    }
    this.indices = this.indices.map((i) => i > index ? i - length : i);
  }
}
class Selector {
  constructor(hookChanging = null, hookChange = null, hookSourceUpdate = null) {
    this.boundCollectionChange = this.onCollectionChange.bind(this);
    this._items = [];
    this.min = 0;
    this.max = 1;
    this.hookChange = null;
    this.hookChanging = null;
    this.hookSourceUpdate = null;
    this.hookChange = hookChange;
    this.hookChanging = hookChanging;
    this.hookSourceUpdate = hookSourceUpdate;
  }
  get items() {
    return this._items;
  }
  get source() {
    return this._source;
  }
  set source(source) {
    this.setSource(source);
  }
  setSource(source) {
    var _a, _b;
    if (this.source !== source) {
      (_a = this.source) == null ? void 0 : _a.removeEventListener("collection-change", this.boundCollectionChange);
      this._source = source;
      (_b = this.source) == null ? void 0 : _b.addEventListener("collection-change", this.boundCollectionChange);
    }
  }
  indexOf(item) {
    return this._items.indexOf(item);
  }
  has(item) {
    return this.indexOf(item) >= 0;
  }
  set(items) {
    items = items || [];
    const numItems = items.length;
    if (this._items.length === numItems && items.every((item) => this.has(item))) {
      return false;
    }
    let newItems = items.slice(0);
    if (numItems > 0 && numItems < this.min) {
      if (items.every((item) => this.has(item))) {
        return false;
      }
      newItems = this._items.slice(this._items.length - (this.min - items.length)).concat(items);
    }
    return this.setItems("set", items, newItems, this._items);
  }
  add(item) {
    if (!this.has(item)) {
      const oldItems = this._items.slice(0);
      const newItems = this._items.concat(item);
      const removeCount = newItems.length - this.max;
      if (this.max > 0 && removeCount > 0) {
        newItems.splice(0, removeCount);
      }
      return this.setItems("add", [item], newItems, oldItems);
    }
    return false;
  }
  remove(item) {
    const index = this.indexOf(item);
    if (index >= 0 && this.min < this._items.length) {
      const oldItems = this._items.slice(0);
      const newItems = this._items.slice(0);
      newItems.splice(index, 1);
      return this.setItems("remove", [item], newItems, oldItems);
    }
    return false;
  }
  toggle(item) {
    return this.has(item) ? this.remove(item) : this.add(item);
  }
  find(key, value) {
    return this.source.findOne((item) => getValue(item, key) === value);
  }
  clear() {
    var _a;
    if (((_a = this._items) == null ? void 0 : _a.length) > 0) {
      this.setItems("reset", [], [], this._items);
    }
  }
  setItems(kind, source, newItems, oldItems) {
    var _a;
    if (this.hookChanging && !this.hookChanging({ kind, source, items: newItems, oldItems })) {
      return false;
    }
    this._items = newItems;
    (_a = this.hookChange) == null ? void 0 : _a.call(this, { kind, source, items: newItems, oldItems });
    return true;
  }
  onCollectionChange(event) {
    var _a;
    if (event.detail.kind === "reset") {
      this.clear();
    }
    (_a = this.hookSourceUpdate) == null ? void 0 : _a.call(this, event.detail);
  }
}
class ListSelector extends Selector {
  collectionAdd(data) {
  }
  collectionRemove(data) {
    const removed = data.items || [];
    const found = this.items.filter((item) => removed.indexOf(item) === -1);
    this.set(found);
  }
  onCollectionChange(event) {
    super.onCollectionChange(event);
    const { detail, detail: { kind } } = event;
    switch (kind) {
      case "add":
        this.collectionAdd(detail);
        break;
      case "remove":
        this.collectionRemove(detail);
        break;
    }
  }
}
class Group {
  constructor(instance, key, container) {
    this._items = [];
    this.elementMap = /* @__PURE__ */ new Map();
    this.instance = instance;
    this.key = key;
    this.container = container;
  }
  get items() {
    return this._items;
  }
  get length() {
    return this._items.length;
  }
  get first() {
    let item = this._items[0];
    while (item instanceof Group) {
      item = item.first;
    }
    return item;
  }
  getFirstLeafItem(item) {
    return item instanceof Group ? item.first : item;
  }
  has(item) {
    return this._items.indexOf(item) >= 0;
  }
  add(groupItem, element) {
    if (!this.has(groupItem)) {
      if (groupItem instanceof Group) {
        groupItem.parent = this;
      }
      const item = this.getFirstLeafItem(groupItem);
      if (!item) {
        return;
      }
      this.elementMap.set(groupItem, element);
      if (this.length === 0) {
        this._items.push(groupItem);
        this.container.appendChild(element);
        if (this.parent) {
          this.parent.add(this, this.container);
        }
      } else {
        const array = this.instance.collection.toStableArray();
        const itemIndex = array.indexOf(item);
        let offset = 0;
        for (let num = this._items.length; offset < num; offset++) {
          const added = this._items[offset];
          const addedIndex = array.indexOf(this.getFirstLeafItem(added));
          if (itemIndex <= addedIndex) {
            break;
          }
        }
        this._items.splice(offset, 0, groupItem);
        this.container.insertBefore(element, this.container.children[offset]);
      }
      return true;
    }
    return false;
  }
  remove(item) {
    if (this.has(item)) {
      if (item instanceof Group) {
        item.parent = null;
      }
      const index = this._items.indexOf(item);
      const element = this.elementMap.get(item);
      this._items.splice(index, 1);
      this.elementMap.delete(item);
      this.instance.freeElement(element);
      return true;
    }
    return false;
  }
  clear() {
    this.items.slice(0).reverse().forEach((item) => {
      if (item instanceof Group) {
        item.clear();
      }
      this.remove(item);
    });
  }
}
class Watcher {
  constructor() {
    this.callbacks = [];
  }
  add(target, type, listener, options) {
    target.addEventListener(type, listener, options);
    const callback = () => {
      target.removeEventListener(type, listener, options);
    };
    this.callbacks.push(callback);
    return callback;
  }
  once(target, type, listener, options) {
    const callback = this.add(target, type, (event) => {
      listener.apply(target, [event]);
      this.remove(callback);
    }, options);
    return callback;
  }
  addBySelector(element, selector, type, listener, options) {
    const found = element == null ? void 0 : element.querySelector(selector);
    if (selector) {
      return this.add(found, type, listener, options);
    }
    return null;
  }
  remove(callBack) {
    const index = this.callbacks.indexOf(callBack);
    if (index >= 0) {
      callBack();
      this.callbacks.splice(index, 1);
    }
  }
  clear() {
    this.callbacks.slice(0).forEach((callBack) => this.remove(callBack));
  }
  static add(target, type, listener, options) {
    return new Watcher().add(target, type, listener, options);
  }
  static once(target, type, listener, options) {
    return new Watcher().once(target, type, listener, options);
  }
}
const TRIGGER_TO_EVENT = {
  open: { click: "click", over: "mouseenter" },
  close: { click: "click", over: "mouseleave" }
};
function alignToRatio(align) {
  if (align === "right" || align === "bottom") {
    return 1;
  } else if (align === "center") {
    return 0.5;
  }
  return 0;
}
function getPopupStage(context = document) {
  const ID = "popup-stage";
  let container = context.getElementById(ID);
  if (!container) {
    container = context.createElement("div");
    container.setAttribute("id", ID);
    context.body.appendChild(container);
  }
  return container;
}
class Overlay {
  //dynamicAlign
  constructor() {
    this.coordinateMode = "relative";
    this.lockOutside = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }
  get anchorElement() {
    return this._anchorElement;
  }
  get contentElement() {
    return this._contentElement;
  }
  get content() {
    return this._content;
  }
  set content(selector) {
    if (this.content !== selector) {
      this._content = selector;
      this._contentElement = findElement(selector);
    }
  }
  get contentAlign() {
    return this._contentAlign;
  }
  set contentAlign(align) {
    if (this.contentAlign !== align) {
      this._contentAlign = align;
    }
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(selector) {
    if (this.anchor !== selector) {
      this._anchor = selector;
      this._anchorElement = findElement(selector);
    }
  }
  get anchorAlign() {
    return this._anchorAlign;
  }
  set anchorAlign(align) {
    if (this.anchorAlign !== align) {
      this._anchorAlign = align;
    }
  }
  static getStageRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      right: window.innerWidth,
      bottom: window.innerHeight
    };
  }
  update() {
    const contentElement = this.contentElement;
    const hasAnchor = !!this.anchorElement && this.anchorAlign !== "none";
    const offsetParent = contentElement.offsetParent;
    const stageRect = Overlay.getStageRect();
    const contentRect = contentElement.getBoundingClientRect();
    const anchorRect = hasAnchor ? this.anchorElement.getBoundingClientRect() : stageRect;
    const parentRect = offsetParent && !(offsetParent instanceof HTMLBodyElement) ? offsetParent.getBoundingClientRect() : stageRect;
    const contentRatio = this.getAlignRatio(this.contentAlign || (hasAnchor ? "top left" : "center"));
    const anchorRatio = hasAnchor && this.anchorAlign ? this.getAlignRatio(this.anchorAlign) : contentRatio;
    let x = Math.floor(anchorRect.left + anchorRect.width * anchorRatio.x + contentRect.width * contentRatio.x * -1) + this.offsetX;
    let y = Math.floor(anchorRect.top + anchorRect.height * anchorRatio.y + contentRect.height * contentRatio.y * -1) + this.offsetY;
    let position = "fixed";
    if (hasAnchor && (!this.coordinateMode || this.coordinateMode === "none")) {
      position = "absolute";
      x -= parentRect.left - offsetParent.scrollLeft;
      y -= parentRect.top - offsetParent.scrollTop;
      if (offsetParent instanceof HTMLBodyElement) {
        x += window.scrollX;
        y += window.scrollY;
      }
    } else if (position === "fixed") {
      const parent = this.findFixedParent(contentElement);
      if (parent) {
        const rect = parent.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
      }
    }
    if (this.lockOutside) {
      if (hasAnchor) {
        const xSign = anchorRatio.x - contentRatio.x;
        if (Math.abs(xSign) === 1 && xSign * (stageRect.left + stageRect.width * anchorRatio.x) < xSign * (x + contentRect.width * anchorRatio.x)) {
          x -= (anchorRect.width + contentRect.width) * xSign;
        }
        const ySign = anchorRatio.y - contentRatio.y;
        if (Math.abs(ySign) === 1 && ySign * (stageRect.top + stageRect.height * anchorRatio.y) < ySign * (y + contentRect.height * anchorRatio.y)) {
          y -= (anchorRect.height + contentRect.height) * ySign;
        }
      }
      const delta = fitDelta({
        left: x,
        top: y,
        right: x + contentRect.width,
        bottom: y + contentRect.height,
        width: contentRect.width,
        height: contentRect.height
      }, Overlay.getStageRect());
      x += delta.x;
      y += delta.y;
    }
    const style = {
      position,
      left: `${x}px`,
      top: `${y}px`
    };
    Object.keys(style).forEach((p) => contentElement.style[p] = style[p]);
  }
  invalidate() {
    this.update();
  }
  getAlignRatio(align) {
    let alignArray = align.split(" ");
    if (alignArray[0] === "center" && alignArray.length === 1) {
      alignArray.push("center");
    }
    alignArray = alignArray.sort((a, b) => {
      if (b === "top" || b === "bottom" || a === "left" || a === "right") {
        return -1;
      }
      return 0;
    });
    const ratioArray = alignArray.map((align2) => {
      return isNaN(Number(align2)) ? alignToRatio(align2) : +align2;
    });
    return {
      x: ratioArray[0],
      y: ratioArray[1]
    };
  }
  /**
   * fixed 스타일에 영향을 주는 부모를 검색합니다.
   * @param element
   */
  findFixedParent(element) {
    const attrs = Popup.config.fixContextAttrs;
    let parent = element.parentElement;
    while (parent) {
      const style = window.getComputedStyle(parent);
      if (attrs.some((attr) => style[attr] && style[attr] !== "none")) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  }
}
class CallbackArray {
  constructor() {
    this.data = {};
  }
  push(state, cb) {
    const cbs = this.data[state];
    if (!cbs) {
      this.data[state] = [];
    }
    this.data[state].push(cb);
  }
  execute(state, args) {
    var _a;
    return (_a = this.data[state]) == null ? void 0 : _a.map((cb) => cb.apply(this, args));
  }
  clear() {
    this.data = {};
  }
}
class Popup extends Base {
  constructor() {
    super();
    this.callbackArray = new CallbackArray();
    this.overlay = new Overlay();
    this.manager = PopupManager.getInstance();
    this._state = "closed";
    this._timeoutId = -1;
    this.backdropTemplate = this.config.backdropTemplate;
    this.closeOnOutsideDown = false;
    this.closeOnEscape = false;
    this.updateOnScroll = true;
    this.openOnTrigger = null;
    this.closeOnEvents = this.config.closeOnEvents;
    this.openDelay = 1;
    this.closeDelay = 1;
    this.modal = false;
    this.alwaysOnTop = false;
    this.priority = 0;
    this.nest = true;
    this.autoFocus = true;
    this.hitAreas = [];
    this.debounceUpdateLayout = debounce(this.updateLayout, this, 1);
  }
  get state() {
    return this._state;
  }
  get contentElement() {
    return this._contentElement;
  }
  get contentGroup() {
    return this._contentGroup;
  }
  get anchorElement() {
    return this._anchorElement;
  }
  /**
   * 팝업이 실제로 중첩되어 있는지를 결정합니다.
   * `nest`와 `coordinateMode`의 값을 고려하여 팝업이 실제로 중첩되는지를 나타냅니다.
   */
  get isNested() {
    return this.coordinateMode === "relative" || this.nest;
  }
  /**
   * 팝업이 열렸는지 닫혔는지를 나타냅니다.
   */
  get isOpened() {
    return this.state === "opened" || this.state === "opening";
  }
  set isOpened(value) {
    if (value) {
      this.open();
    } else {
      this.close();
    }
  }
  get isOpenReady() {
    return this.state === "ready";
  }
  /**
   * 팝업 컨텐츠 렌더링 방법을 정의합니다.
   * HTML 형태의 문자열, 완성된 HTMLElement, Promise<HTMLElement> 또는 Promise<HTMLElement> 반환하는 콜백 함수중 하나의 형태를 가질 수 있습니다.
   * 아래의 예제는 콜백 함수의 사용 예를 나타냅니다.
   * ```typescript
   * (data: any): Promise<HTMLElement> {
   *     return new Promise(resolve => {
   *         setTimeout(() => {
   *             const element = document.createElement('div');
   *             element.innerText = 'popup-content';
   *             resolve(element);
   *         }, 1000);
   *     });
   * };
   * ```
   */
  get content() {
    return this._content;
  }
  set content(content) {
    this.setContent(content);
  }
  /**
   * content 기준으로 정렬할 방향을 지정합니다.
   * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center', 'center' 입니다.
   * @return {AnchorAlign} The content alignment of the overlay.
   */
  get contentAlign() {
    return this.overlay.contentAlign;
  }
  set contentAlign(align) {
    this.overlay.contentAlign = align;
    if (this.isOpened) {
      this.updateLayout();
    }
  }
  /**
   * 팝업의 좌표 시스템을 설정합니다.
   * - 'global' 팝업을 전역 좌표계에 배치합니다.
   * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
   * - 'none' 팝업을 상대적인 위치에 배치합니다('fixed' 적용됩니다.)
   * 기본 값은 'relative' 입니다.
   */
  get coordinateMode() {
    return this.overlay.coordinateMode;
  }
  set coordinateMode(value) {
    if (this.coordinateMode !== value) {
      this.overlay.coordinateMode = value;
      if (this.isOpened) {
        this.updateLayout();
      }
    }
  }
  /**
   * 팝업이 열릴 상대적 위치(HTMLElement, DomSelector)를 지정합니다.
   * 설정하지 않으면 기본적으로 최상위 노드(body)가 됩니다.
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(anchor) {
    this.setAnchor(anchor);
  }
  /**
   * anchor 기준으로 정렬할 방향을 지정합니다.
   * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center', 'center' 입니다
   */
  get anchorAlign() {
    return this.overlay.anchorAlign;
  }
  set anchorAlign(align) {
    this.overlay.anchorAlign = align;
    if (this.isOpened) {
      this.updateLayout();
    }
  }
  /**
   * 해당 크기 만큼 팝업 X 위치가 변경됩니다. 단위는 픽셀입니다.
   */
  get offsetX() {
    return this.overlay.offsetX;
  }
  set offsetX(value) {
    this.overlay.offsetX = value;
  }
  /**
   * 해당 크기만큼 팝업 Y 위치가 변경됩니다. 단위는 픽셀입니다.
   */
  get offsetY() {
    return this.overlay.offsetY;
  }
  set offsetY(value) {
    this.overlay.offsetY = value;
  }
  /**
   * 컨텐츠가 뷰포트 바깥 영역으로 나감을 방지합니다.
   * 만일 화면크기가 뷰표트 크기보다 클땐 왼쪽상단을 기준으로 맞춥니다.
   */
  get lockOutside() {
    return this.overlay.lockOutside;
  }
  set lockOutside(value) {
    this.overlay.lockOutside = value;
  }
  /**
   * 중첩된 팝업목록을 반환합니다.
   */
  get nestedPopups() {
    var _a;
    return ((_a = this.manager.getNestedNode(this)) == null ? void 0 : _a.children.map((child) => child.popup)) || [];
  }
  /**
   * 최상위에 배치 되어있는지 여부입니다.
   */
  get includedOnStage() {
    return getPopupStage() === this._contentGroup.parentElement;
  }
  setOptions(options = {}) {
    toSortPriorityKeys(options).forEach((key) => {
      if (key in this) {
        this[key] = options[key];
      }
    });
    return this;
  }
  setAnchor(anchor) {
    if (this.anchor !== anchor) {
      this._anchor = anchor;
      ready().then(() => this.internalSetAnchor(anchor));
    }
    return this;
  }
  setContent(content) {
    if (this._content !== content) {
      this.destroyContent();
      this._content = content;
    }
    return this;
  }
  /**
   * 팝업이 열리고 컨텐츠가 렌더링 되기 전 호출
   * @param callback
   * @returns {Popup}
   */
  opening(callback) {
    this.callbackArray.push("opening", callback);
    return this;
  }
  /**
   * 팝업이 열리고 컨텐트가 렌더링 후 호출됩니다.
   * @param callback
   * @returns {Popup}
   */
  opened(callback) {
    this.callbackArray.push("opened", callback);
    return this;
  }
  /**
   * 팝업이 닫히기 전에 호출됩니다.
   * @param callback - 팝업이 닫히기 전에 호출되는 콜백 함수입니다. 콜백 함수의 반환 값이 `false`면 팝업의 닫힘이 취소됩니다. 함수의 매개변수 `reason`은 'Popup.close(reason)' 메서드에 전달된 데이터입니다.
   * @returns {Popup}
   */
  closing(callback) {
    this.callbackArray.push("closing", callback);
    return this;
  }
  /**
   * 팝업이 닫힐 때 호출됩니다.
   * @param callback - 팝업이 닫힐때 호출되는 콜백 함수입니다. 함수의 매개변수 `reason`은 'Popup.close(reason)' 메서드에 전달된 데이터입니다.
   * @returns {Popup}
   */
  closed(callback) {
    this.callbackArray.push("closed", callback);
    return this;
  }
  /**
   * 중첩되어있는 팝업인지 확인합니다.
   * @param popup
   */
  contains(popup) {
    if (this === popup) {
      return true;
    }
    const node = this.manager.getNestedNode(this);
    if (node) {
      let parentNode = node.parent;
      while (parentNode) {
        if (parentNode.popup === popup) {
          return false;
        }
        parentNode = parentNode.parent;
      }
      return !!treeSearchOnce([node], (node2) => node2.popup.contentElement.contains(popup.anchorElement));
    }
    return false;
  }
  /**
   * 팝업을 엽니다.
   * @param data
   */
  open(data) {
    clearTimeout(this._timeoutId);
    if (!this.isOpened) {
      this.setState(
        "ready"
        /* PopupState.ready */
      );
      this.callbackArray.clear();
      this._timeoutId = window.setTimeout(async () => {
        await this.forceBuildContent(data);
        if (!await this.callbackState("opening", this.contentElement, data)) {
          this.setState(
            "closed"
            /* PopupState.closed */
          );
          this.dispatchEvent(new CustomEvent("cancel-open"));
          return;
        }
        this.setState(
          "opening"
          /* PopupState.opening */
        );
        await this.internalOpen();
        this.setState(
          "opened"
          /* PopupState.opened */
        );
        await this.callbackState("opened", this.contentElement, data);
        this.dispatchEvent(new CustomEvent("open"));
      }, this.openDelay);
    }
    return this;
  }
  /**
   * 팝업을 닫습니다.
   * @param reason
   * @returns {Popup}
   */
  close(reason) {
    clearTimeout(this._timeoutId);
    if (this.isOpened) {
      this._timeoutId = window.setTimeout(async () => {
        if (!await this.callbackState("closing", reason)) {
          this.dispatchEvent(new CustomEvent("cancel-close"));
          return;
        }
        this.setState(
          "closing"
          /* PopupState.closing */
        );
        await this.internalClose();
        this.setState(
          "closed"
          /* PopupState.closed */
        );
        await this.callbackState("closed", reason);
        this.dispatchEvent(new CustomEvent("close"));
        this.callbackArray.clear();
      }, this.closeDelay);
    } else {
      this.callbackArray.clear();
    }
    return this;
  }
  /**
   * 팝업을 열거나 닫습니다.
   * @param data
   */
  toggle(data) {
    return this.isOpened ? this.close(data) : this.open(data);
  }
  /**
   * 팝업을 위치를 갱신합니다.
   */
  invalidate() {
    this.updateLayout();
  }
  /**
   * 팝업 인스턴스가 삭제됩니다.
   * - 팝업이 닫히고 팝업과 연결된 이벤트가 해제됩니다.
   */
  destroy() {
    this.destroyContent();
    this.unwatchAnchor();
  }
  setState(state) {
    this._state = state;
  }
  async callbackState(state, ...args) {
    const results = this.callbackArray.execute(state, args);
    return Promise.all(results || []).then((result) => result.every((v) => v !== false));
  }
  internalSetAnchor(anchor) {
    this.unwatchAnchor();
    this._anchorElement = findElement(anchor);
    this.watchAnchor();
  }
  async internalOpen() {
    await ready();
    this.mountContent();
    this.updateLayout();
    this.watchEvents();
    this.setContentFocus();
    this.manager.addPopup(this);
  }
  async internalClose() {
    await this.closeNestedPopups();
    this.unmountContent();
    this.manager.removePopup(this);
    if (this._oldFocusedElement && this.autoFocus) {
      this._oldFocusedElement.focus();
    }
  }
  closeNestedPopups() {
    return new Promise((resolve) => {
      const popups = this.nestedPopups;
      const num = popups.length;
      if (num === 0) {
        resolve();
      } else {
        let count = 0;
        popups.forEach((popup) => popup.close(this).closed(() => {
          count++;
          if (num <= count) {
            resolve();
          }
        }));
      }
    });
  }
  /**
   *
   * @param template
   * @param data
   * @private
   */
  async templateToHTMLElement(template, data) {
    if (template instanceof Function) {
      return this.templateToHTMLElement(template(data), data);
    }
    if (template instanceof HTMLElement) {
      return template;
    } else if (template instanceof Promise) {
      return template;
    }
    return buildHTML(template, data);
  }
  /**
   *
   * @private
   */
  async forceBuildContent(data) {
    if (this._contentElement) {
      return this._contentElement;
    } else if (!this._content) {
      throw new Error("content is null.");
    }
    this._contentElement = await this.templateToHTMLElement(this._content, data);
    return this._contentElement;
  }
  /**
   * 돔에 팝업 컨텐츠를 마운트합니다.
   * @private
   */
  mountContent() {
    var _a;
    let container;
    let group;
    if (!this.anchorElement && this.anchor) {
      this.internalSetAnchor(this.anchor);
    }
    if (this.coordinateMode === "global" || this.modal || !((_a = this.anchorElement) == null ? void 0 : _a.parentElement)) {
      container = getPopupStage();
      if (this.modal) {
        group = this._contentGroup;
        if (!group) {
          group = this._contentGroup = buildHTML(this.backdropTemplate);
          addClass(group, "x-popup-backdrop");
        }
        group.appendChild(this.contentElement);
      } else {
        group = this._contentGroup = this.contentElement;
      }
    } else {
      container = this.anchorElement.parentElement;
      group = this._contentGroup = this.contentElement;
    }
    if (group.parentElement !== container) {
      addClass(this.contentElement, "x-popup-content");
      container.appendChild(group);
    }
  }
  /**
   * 돔에 팝업 컨텐츠를 언마운트합니다.
   * @private
   */
  unmountContent() {
    var _a;
    const parent = (_a = this._contentGroup) == null ? void 0 : _a.parentElement;
    if (parent) {
      parent.removeChild(this._contentGroup);
      if (this._contentGroup !== this.contentElement) {
        this._contentGroup.removeChild(this.contentElement);
        removeClass(this.contentElement, "x-content-popup");
      }
    }
  }
  destroyContent() {
    if (this.isOpened) {
      this.internalClose();
      this.setState(
        "closed"
        /* PopupState.closed */
      );
      this.callbackArray.clear();
    }
    this.unmountContent();
    this._contentGroup = null;
    this._contentElement = null;
  }
  watchEvents() {
    const contentElement = this.contentElement;
    const closeOnOutsideDown = this.closeOnOutsideDown;
    const closeOnEscape = this.closeOnEscape;
    const watcher = new Watcher();
    const observer = new ResizeObserver(() => {
      this.updateLayout();
    });
    observer.observe(contentElement);
    if (!this.modal && this.updateOnScroll && this.anchorElement) {
      const scroller = findScroller(this.anchorElement);
      const anchorParent = this.anchorElement.offsetParent;
      const contentParent = contentElement.offsetParent;
      if (scroller && !(anchorParent === contentParent && scroller.contains(anchorParent))) {
        watcher.add(scroller instanceof HTMLHtmlElement ? window : scroller, "scroll", () => this.debounceUpdateLayout(), { passive: true });
      }
    }
    watcher.add(window, "resize", () => this.debounceUpdateLayout());
    if (closeOnOutsideDown) {
      const closeByEvent = (event) => {
        var _a;
        const target = event.target;
        const node = this.manager.getNestedNode(this) || { popup: this, children: [] };
        const found = treeSearchOnce([node], (node2) => {
          var _a2, _b;
          const popup = node2.popup;
          return popup && (((_a2 = popup.anchorElement) == null ? void 0 : _a2.contains(target)) || ((_b = popup.contentElement) == null ? void 0 : _b.contains(target)));
        }) || ((_a = this.hitAreas) == null ? void 0 : _a.find((element) => element.contains(target)));
        if (!found) {
          this.close(event);
        }
      };
      watcher.add(document, "mousedown", (event) => {
        closeByEvent(event);
      });
      watcher.add(document, "wheel", (event) => {
        if (!event.defaultPrevented) {
          closeByEvent(event);
        }
      });
    }
    if (closeOnEscape) {
      watcher.add(document, "keydown", (event) => {
        if (!event.defaultPrevented) {
          if (event.key === "Escape") {
            this.close(event);
          }
        }
      });
    }
    this.closeOnEvents.forEach((type) => {
      watcher.add(contentElement, type, (event) => this.close(event));
    });
    if (this.anchorElement && this.openOnTrigger) {
      const openEvent = TRIGGER_TO_EVENT.open[this.openOnTrigger];
      const closeEvent = TRIGGER_TO_EVENT.close[this.openOnTrigger];
      if (openEvent !== closeEvent) {
        watcher.add(this.contentElement, openEvent, (event) => this.open(event));
        watcher.add(this.contentElement, closeEvent, (event) => this.close(event));
      }
    }
    this.closed(() => {
      observer.disconnect();
      watcher.clear();
    });
  }
  setContentFocus() {
    this._oldFocusedElement = document.activeElement;
  }
  /**
   *  팝업 레이아웃 갱신
   * @returns {Popup}
   */
  updateLayout() {
    if (!this.isOpened) {
      return this;
    }
    this.overlay.content = this.contentElement;
    this.overlay.anchor = this.anchorElement;
    this.overlay.invalidate();
    return this;
  }
  /**
   * @private
   */
  watchAnchor() {
    const anchorElement = this.anchorElement;
    const watcher = new Watcher();
    if (anchorElement && this.openOnTrigger) {
      const openEvent = TRIGGER_TO_EVENT.open[this.openOnTrigger];
      const closeEvent = TRIGGER_TO_EVENT.close[this.openOnTrigger];
      const onOpen = (event) => {
        this.dispatchEvent(new CustomEvent("trigger-open"));
        this.open(event);
      };
      const onClose = (event) => {
        this.dispatchEvent(new CustomEvent("trigger-close"));
        this.close(event);
      };
      if (openEvent === closeEvent) {
        watcher.add(anchorElement, openEvent, (event) => {
          if (this.isOpened) {
            onClose(event);
          } else {
            onOpen(event);
          }
        });
      } else {
        watcher.add(anchorElement, openEvent, onOpen);
        watcher.add(anchorElement, closeEvent, onClose);
      }
    }
    this.anchorWatcher = watcher;
  }
  unwatchAnchor() {
    if (this.anchorWatcher) {
      this.anchorWatcher.clear();
    }
  }
  static create(options = {}) {
    return new Popup().setOptions(options);
  }
}
class PopupManager {
  static getInstance() {
    return PopupManager.instance;
  }
  constructor() {
    this.popups = [];
    this.nestedMap = /* @__PURE__ */ new Map();
    this.alwaysOnTopCount = 0;
  }
  /**
   * 팝업을 추가합니다.
   */
  addPopup(popup) {
    if (this.popups.indexOf(popup) < 0) {
      this.addNestedNode(popup);
      this.popups.push(popup);
      if (popup.alwaysOnTop) {
        this.alwaysOnTopCount++;
      }
      this.bringToFront(popup);
    }
  }
  /**
   * 팝업을 해제합니다.
   */
  removePopup(popup) {
    const index = this.popups.indexOf(popup);
    if (index >= 0) {
      this.popups.splice(index, 1);
      if (popup.alwaysOnTop) {
        this.alwaysOnTopCount--;
      }
      this.removeNestedNode(popup);
    }
  }
  /**
   * 팝업을 최상위로 이동 시킵니다.
   * @param popup
   */
  bringToFront(popup) {
    const oldIndex = this.popups.indexOf(popup);
    if (oldIndex < 0) {
      return;
    }
    this.popups.splice(oldIndex, 1);
    let start, end;
    if (popup.alwaysOnTop) {
      end = this.popups.length - 1;
      start = Math.max(0, end - (this.alwaysOnTopCount - 1) + 1);
    } else {
      end = this.popups.length - 1 - this.alwaysOnTopCount;
      start = 0;
    }
    let insertIndex = start;
    for (let i = start, priority = popup.priority; i <= end; i++) {
      const other = this.popups[i];
      if (popup.contains(other) || priority < other.priority) {
        break;
      }
      insertIndex = i + 1;
    }
    this.popups.splice(insertIndex, 0, popup);
    let count = 0;
    this.popups.forEach((popup2) => {
      popup2.contentGroup.style.zIndex = "" + (PopupManager.MIN_Z_INDEX + count++);
    });
  }
  getNestedNode(popup) {
    return this.nestedMap.get(popup);
  }
  createNestedNode(popup) {
    let node = this.nestedMap.get(popup);
    if (!node) {
      node = { popup, children: [] };
      this.nestedMap.set(popup, node);
    }
    return node;
  }
  /**
   * 중첩된 팝업이 있으면 추가합니다.
   * @param popup
   * @private
   */
  addNestedNode(popup) {
    const element = popup.anchorElement;
    if (popup.isNested && element) {
      const found = this.popups.find((popup2) => popup2.contentElement.contains(element));
      if (found) {
        const parent = this.createNestedNode(found);
        const child = this.createNestedNode(popup);
        parent.children.push(child);
        child.parent = parent;
      }
    }
  }
  removeNestedNode(popup) {
    var _a;
    const node = this.getNestedNode(popup);
    if (node) {
      const children = (_a = node.parent) == null ? void 0 : _a.children;
      const index = children == null ? void 0 : children.indexOf(node);
      if (index >= 0) {
        children.splice(index, 1);
      }
      this.nestedMap.delete(popup);
    }
  }
}
PopupManager.instance = new PopupManager();
PopupManager.MIN_Z_INDEX = 1e3;
Popup.config = {
  backdropTemplate: `<div></div>`,
  closeOnEvents: ["close"],
  fixContextAttrs: ["transform", "perspective", "filter", "clipPath", "backdrop-filter", "scale", "rotate"]
};
class MirrorElement extends Element {
  constructor(content) {
    super();
    this.debounceUpdate = debounce(this.update, this, 33);
    this._message = "";
    this._state = "leave";
    this.content = content;
  }
  get contentContainer() {
    return this.__dom__.refs.contentContainer;
  }
  get messageContainer() {
    return this.__dom__.refs.messageContainer;
  }
  /**
   * 드래그 미러 대상
   */
  get content() {
    return this._content;
  }
  set content(content) {
    this.setContent(content);
  }
  /**
   * 드래그 메세지
   */
  get message() {
    return this._message;
  }
  set message(value) {
    this.setMessage(value);
  }
  /**
   * 드래그 상태
   */
  get state() {
    return this._state;
  }
  set state(value) {
    this.setState(value);
  }
  setContent(content) {
    if (this._content !== content) {
      this._content = content;
      if (this.contentElement) {
        this.contentContainer.removeChild(this.contentElement);
      }
      this.contentElement = buildHTML(this._content);
      if (this.contentElement) {
        this.contentContainer.appendChild(this.contentElement);
      }
      this.debounceUpdate();
    }
    return this;
  }
  setMessage(value) {
    if (this._message !== value) {
      this._message = value;
      this.debounceUpdate();
    }
    return this;
  }
  setState(value) {
    if (this._state !== value) {
      this._state = value;
      this.debounceUpdate();
    }
    return this;
  }
  move(x, y) {
    this.root.style.transform = `translate(${x}px, ${y}px)`;
    return this;
  }
  update() {
    toggleAttribute(this.root, "enter", this.state === "enter");
    this.messageContainer.innerHTML = this._message;
  }
}
MirrorElement.template(`<div class="x-mirror" style="user-select: none;pointer-events: none">
    <div id="contentContainer" class="x-content"></div>
    <div id="messageContainer" class="x-message"></div>
</div>`);
const RELEASE_EVENT = "__release__";
class DragManager extends Base {
  constructor(container, options) {
    super();
    this.dragThreshold = this.config.dragThreshold;
    this.cancelKeyCodes = this.config.cancelKeyCodes;
    this.boundContainerMouseDown = this.onContainerMouseDown.bind(this);
    this._dragging = false;
    this._dragScrolling = false;
    this._dragScrollingId = -1;
    if (!(container instanceof HTMLElement)) {
      throw new TypeError('The "container" parameter must be an instance of HTMLElement.');
    }
    this.container = container;
    this.options = options;
    this.container.addEventListener("mousedown", this.boundContainerMouseDown);
    this.popup = Popup.create({
      priority: Number.MAX_SAFE_INTEGER,
      alwaysOnTop: true,
      contentAlign: "left top",
      anchorAlign: "left top"
    });
  }
  /**
   * 드래그 중인지 여부입니다.
   */
  get dragging() {
    return this._dragging;
  }
  /**
   * 드래드 대상 엘리먼트입니다.
   */
  get dragElement() {
    return this._dragElement;
  }
  /**
   *  드래그 데이터입니다.
   */
  get dragSource() {
    return this._dragSource;
  }
  /**
   * 스크롤 중인지 여부입니다.
   */
  get dragScrolling() {
    return this._dragScrolling;
  }
  /**
   * 드래그 중인 요소의 미러 이미지(원본 요소의 복사본)입니다.
   */
  get mirrorElement() {
    return this._mirrorElement;
  }
  get document() {
    return this.container.ownerDocument;
  }
  /**
   * 드래그 취소합니다.
   */
  cancel() {
    this.dragCancel();
    this.dispatchEvent(new CustomEvent(RELEASE_EVENT));
  }
  /**
   * 'drag_enter' 일때 현 상태를 취소합니다. 'drag_leave' 발생합니다.
   */
  cancelDragEnter() {
    this.dragLeave(new Event("drag-enter-cancel"));
  }
  /**
   * 드래그 관련 리소스 삭제하고 연결된 이벤트 리스너를 해제합니다.
   */
  destroy() {
    this.cancel();
    this.container.removeEventListener("mousedown", this.boundContainerMouseDown);
  }
  /**
   * 드래그시 보여주는 메시지를 정의합니다.
   */
  setDragMessage(message) {
    var _a;
    (_a = this.mirrorElement) == null ? void 0 : _a.setMessage(message);
  }
  /**
   * 드래그 준비
   * @param event
   * @private
   */
  dragReady(event) {
    const { dragSource } = this.options;
    const element = this.adjustElement(this.eventToElement(event), this.options.dragTarget);
    if (!element) {
      return false;
    }
    this._dragElement = element;
    this._dragSource = dragSource instanceof Function ? dragSource(element, event) : dragSource;
    if (!this.dispatchDragEvent("drag-ready", null, event, true)) {
      this._dragElement = null;
      this._dragSource = null;
      return false;
    }
    return true;
  }
  /**
   * 드래그를 시작
   * @param event
   * @private
   */
  dragStart(event) {
    if (!this.dispatchDragEvent("drag-start", null, event, true)) {
      return false;
    }
    DragManager.draggingInstance = this;
    this._dragging = true;
    this._mirrorElement = this.createMirrorElement();
    this.popup.setContent(this._mirrorElement.root).open().opening(() => {
      this.mirrorOffset = this.calculateMirrorOffset(event);
      this.dispatchDragEvent("drag-mirror-create", null, event);
      this.moveMirrorElement(event);
    });
    addClass(this.dragElement, "drag-dragging");
    return true;
  }
  /**
   * 드래그 이동
   * @param event
   * @private
   */
  dragMove(event) {
    if (!this.dragging) {
      return false;
    }
    const element = this.eventToElement(event);
    const overContainer = this.adjustElement(element, this.options.dropTarget);
    const oldContainer = this.overContainer;
    const isOut = oldContainer && oldContainer !== overContainer;
    this.moveMirrorElement(event);
    this.dispatchDragEvent("drag-move", overContainer, event);
    if (isOut) {
      this.dragLeave(event);
      removeClass(oldContainer, "drag-container-over");
      this.dispatchDragEvent("drag-out", this.overContainer, event);
      this.overContainer = null;
    }
    if (overContainer) {
      if (this.overContainer !== overContainer) {
        addClass(overContainer, "drag-container-over");
        this.overContainer = overContainer;
      }
      if (!this.dispatchDragEvent("drag-over", overContainer, event, true)) {
        this.dragEnter(event, overContainer);
      } else {
        this.dragLeave(event);
      }
    }
    if (event !== this.lastMouseMoveEvent) {
      this.lastMouseMoveEvent = event;
      this.startAutoScroll(event, oldContainer !== overContainer);
    }
    return true;
  }
  /**
   * 드랍 영역에 들어감
   * @param event
   * @param overContainer
   * @private
   */
  dragEnter(event, overContainer) {
    if (this.dropContainer !== overContainer && this.dispatchDragEvent("drag-enter", overContainer, event, true)) {
      this.dropContainer = overContainer;
      addClass(overContainer, "drag-container-enter");
      this._mirrorElement.state = "enter";
    }
  }
  /**
   * 드랍 영역을 나감
   * @param event
   * @private
   */
  dragLeave(event) {
    if (this.dropContainer) {
      this._mirrorElement.state = "leave";
      removeClass(this.dropContainer, "drag-container-enter");
      this.dispatchDragEvent("drag-leave", this.dropContainer, event);
      this.dropContainer = null;
    }
  }
  /**
   * 드래그 종료
   * @param event
   * @private
   */
  dragEnd(event) {
    if (!this._dragging) {
      return false;
    }
    if (this.dropContainer) {
      this.dispatchDragEvent("drop", this.dropContainer, event, true);
    }
    this.dragStop("drag-end", event);
    return true;
  }
  /**
   * 드래그 관련 리소스를 해제
   * @param type
   * @param event
   * @private
   */
  dragStop(type, event) {
    if (this.overContainer) {
      removeClass(this.overContainer, "drag-container-over");
    }
    this.dispatchDragEvent("drag-mirror-remove", null, event);
    this.popup.close();
    this.popup.destroy();
    if (this.dropContainer) {
      removeClass(this.dropContainer, "drag-container-enter");
    }
    if (this._dragElement) {
      removeClass(this._dragElement, "drag-dragging");
    }
    this.stopDragScrolling();
    this.dispatchDragEvent(type, this.dropContainer, event);
    this._dragging = false;
    this._dragElement = null;
    this._dragSource = null;
    this._mirrorElement = null;
    this.dropContainer = null;
    this.overContainer = null;
    DragManager.draggingInstance = null;
  }
  /**
   * 드래그 취소
   * @private
   */
  dragCancel() {
    if (!this._dragging) {
      return false;
    }
    this.dragStop("drag-cancel", new Event("drag-cancel"));
    return true;
  }
  /**
   * @private
   */
  eventToElement(event) {
    if (this.lastMouseMoveEvent === event) {
      return document.elementFromPoint(event.clientX, event.clientY);
    }
    return event.target;
  }
  /**
   * @private
   */
  adjustElement(element, template) {
    if (!element) {
      return null;
    }
    if (template instanceof Function) {
      return template(element);
    } else if (typeof template === "string") {
      return element.closest(template);
    }
    return null;
  }
  /**
   * @private
   */
  startAutoScroll(event, isNeed) {
    if (isNeed) {
      this.scroller = findScroller(this.overContainer);
    }
    const delta = this.calculateDragScrollDelta(event);
    if (delta) {
      this.startDragScrolling(delta);
    } else {
      this.stopDragScrolling();
    }
  }
  /**
   * 미러 엘리먼트 생성
   * @private
   */
  createMirrorElement() {
    const mirror = this.options.mirrorTarget;
    let result = null;
    if (mirror instanceof Function) {
      if (mirror === MirrorElement || mirror.prototype instanceof MirrorElement) {
        result = new mirror(this.dragElement);
      } else {
        result = mirror(this.dragElement);
      }
    } else if (mirror) {
      result = buildHTML(mirror);
    }
    if (!result) {
      return new MirrorElement(this.dragElement);
    }
    if (!(result instanceof MirrorElement)) {
      return new MirrorElement(result);
    }
    return result;
  }
  /**
   * 미러 엘리먼트
   * @param event
   * @private
   */
  moveMirrorElement(event) {
    if (this._mirrorElement && this.mirrorOffset) {
      this._mirrorElement.move(event.clientX - this.mirrorOffset.x, event.clientY - this.mirrorOffset.y);
    }
  }
  /**
   *
   * @param event
   * @private
   */
  calculateMirrorOffset(event) {
    const { left, top } = this.dragElement.getBoundingClientRect();
    return {
      x: event.clientX - left,
      y: event.clientY - top
    };
  }
  calculateDragScrollDelta(event) {
    if (!this.scroller) {
      return null;
    }
    const rect = this.scroller.getBoundingClientRect();
    const x = Math.abs(event.clientX - rect.left);
    const y = Math.abs(event.clientY - rect.top);
    const { dragScrollThreshold, dragScrollValue } = this.config;
    let dx = 0;
    let dy = 0;
    if (this.scroller.clientWidth < this.scroller.scrollWidth) {
      if (x <= dragScrollThreshold) {
        dx = -dragScrollValue;
      } else if (rect.width - x <= dragScrollThreshold) {
        dx = dragScrollValue;
      }
    }
    if (this.scroller.clientHeight < this.scroller.scrollHeight) {
      if (y <= dragScrollThreshold) {
        dy = -dragScrollValue;
      } else if (rect.height - y <= dragScrollThreshold) {
        dy = dragScrollValue;
      }
    }
    if (dx === 0 && dy === 0) {
      return null;
    }
    return { x: dx, y: dy };
  }
  /**
   * 자동 스크롤을 시작합니다.
   * @param delta
   * @private
   */
  startDragScrolling(delta) {
    if (this._dragScrollingId < 0) {
      let timeoutId = -1;
      const runScroll = () => {
        const oldLeft = this.scroller.scrollLeft;
        const oldTop = this.scroller.scrollTop;
        this.scroller.scrollTop += delta.y;
        this.scroller.scrollLeft += delta.x;
        const isChanged = this.scroller.scrollLeft !== oldLeft || this.scroller.scrollTop !== oldTop;
        if (timeoutId < 0 && isChanged || this._dragScrolling !== isChanged) {
          if (timeoutId >= 0) {
            clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
            if (this.lastMouseMoveEvent) {
              this.dragMove(this.lastMouseMoveEvent);
            }
            timeoutId = -1;
          }, 200);
        }
        this._dragScrolling = isChanged;
        this._dragScrollingId = window.requestAnimationFrame(() => runScroll());
      };
      runScroll();
    }
  }
  /**
   * 스크롤을 멈춤니다.
   * @private
   */
  stopDragScrolling() {
    if (this._dragScrollingId > 0) {
      window.cancelAnimationFrame(this._dragScrollingId);
      this._dragScrollingId = -1;
      this._dragScrolling = false;
    }
  }
  toggleUserSelect(value) {
    this.document.body.style.userSelect = value ? "" : "none";
  }
  /**
   * DragEvent 발생시킵니다.
   */
  dispatchDragEvent(type, overContainer, trigger, cancelable = false) {
    const event = new CustomEvent(type, {
      cancelable,
      detail: {
        dragSource: this.dragSource,
        dragElement: this.dragElement,
        overContainer,
        mirrorElement: this._mirrorElement,
        mirrorOffset: this.mirrorOffset,
        isScrolling: this.dragScrolling,
        trigger
      }
    });
    if (this.options.hookEvents) {
      this.options.hookEvents(event);
      if (event.defaultPrevented) {
        return false;
      }
    }
    return this.dispatchEvent(event);
  }
  /**
   * MouseEvent 핸들러
   * @param event
   * @private
   */
  onContainerMouseDown(event) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey) {
      return;
    }
    if (!this.dragReady(event)) {
      return;
    }
    const document2 = this.document;
    const downX = event.clientX;
    const downY = event.clientY;
    const downEvent = event;
    const onPreventEvent = (e) => {
      e.preventDefault();
    };
    const onKeyDown = (e) => {
      const cancelKeyCodes = this.cancelKeyCodes || [];
      if (cancelKeyCodes.indexOf(e.keyCode) >= 0) {
        this.cancel();
      }
    };
    const onMouseMove = (e) => {
      if (this._dragging) {
        if (this.dragMove(e)) {
          e.stopPropagation();
        }
      } else {
        const deltaX = e.clientX - downX;
        const deltaY = e.clientY - downY;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > this.dragThreshold) {
          if (this.dragStart(downEvent)) {
            this.toggleUserSelect(false);
            document2.addEventListener("keydown", onKeyDown);
          } else {
            this.dispatchEvent(new CustomEvent(RELEASE_EVENT));
          }
        }
      }
    };
    const onMouseUp = (e) => {
      if (this._dragging && this.dragEnd(e)) {
        e.stopPropagation();
      }
      this.dispatchEvent(new CustomEvent(RELEASE_EVENT));
    };
    const onRelease = (e) => {
      e.stopPropagation();
      this.toggleUserSelect(true);
      document2.removeEventListener("keydown", onKeyDown);
      document2.removeEventListener("mouseup", onMouseUp);
      document2.removeEventListener("mousemove", onMouseMove);
      document2.removeEventListener("dragstart", onPreventEvent);
      this.removeEventListener(RELEASE_EVENT, onRelease);
    };
    document2.addEventListener("mousemove", onMouseMove);
    document2.addEventListener("mouseup", onMouseUp);
    document2.addEventListener("dragstart", onPreventEvent);
    this.addEventListener(RELEASE_EVENT, onRelease);
  }
  static create(options) {
    return new DragManager(options.container, options.options);
  }
  static getDraggingInstance() {
    return DragManager.draggingInstance;
  }
}
DragManager.config = {
  dragThreshold: 5,
  dragScrollThreshold: 30,
  dragScrollValue: 10,
  cancelKeyCodes: [27]
};
function is(a, b) {
  return a === b || a == null && b == null || a instanceof Date && b instanceof Date && a.getTime() === b.getTime();
}
function equal(a, b, isDeep = false, compare = is) {
  if (compare(a, b)) {
    return true;
  }
  if (typeof a !== "object" || a == null || typeof b !== "object" || b == null) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  return keysA.every((key) => key in b && isDeep ? equal(a[key], b[key], isDeep, compare) : compare(a[key], b[key]));
}
function shallowEqual(a, b, compare = is) {
  return equal(a, b, false, compare);
}
class ListMirrorElement extends MirrorElement {
  constructor(content) {
    super(content);
  }
}
const DRAG_MANAGER_EVENTS = [
  "drag-ready",
  "drag-start",
  "drag-move",
  "drag-over",
  "drag-out",
  "drag-enter",
  "drag-leave",
  "drag-end",
  "drop",
  "drag-cancel",
  "drag-mirror-create",
  "drag-mirror-remove"
];
class DragDropBase {
  constructor(target) {
    this._droppable = false;
    this.enterDelayPromise = null;
    this.onDragEvents = (event) => {
      const instance = this.getDropInstance(event);
      if (instance instanceof List) {
        instance.dragDrop.handleEvents(event, this);
      }
    };
    this.onItemDragEnter = (event) => {
      const context = this.dragContext;
      this.enterDelayPromise = delayFrame(1).then(() => {
        var _a, _b;
        const message = (_b = (_a = context.target).hookDragMessage) == null ? void 0 : _b.call(_a, event.detail);
        if (message) {
          context.dragManager.setDragMessage(message);
        }
      }).catch(() => {
      });
    };
    this.onItemDragLeave = (event) => {
      this.dragContext.dragManager.setDragMessage("");
      if (this.enterDelayPromise) {
        this.enterDelayPromise.cancel();
        this.enterDelayPromise = null;
      }
    };
    this.target = target;
    this.target.addEventListener("item-drag-enter", this.onItemDragEnter);
    this.target.addEventListener("item-drag-leave", this.onItemDragLeave);
  }
  /**
   * 아이템 드래그를 가능 여부입니다.
   */
  get draggable() {
    return !!this.dragManager;
  }
  set draggable(value) {
    if (value) {
      this.createDragManager();
    } else {
      this.removeDragManager();
    }
  }
  /**
   * 아이템 드랍 가능 여부입니다.
   */
  get droppable() {
    return this._droppable;
  }
  set droppable(value) {
    this._droppable = value;
  }
  /**
   * 드래그 중인지 여부입니다.
   */
  get dragging() {
    var _a;
    return !!((_a = this.dragManager) == null ? void 0 : _a.dragging);
  }
  /**
   * 드래그 매니저 생성합니다.
   * @private
   */
  createDragManager() {
    if (!this.dragManager) {
      this.dragManager = DragManager.create({
        container: this.target.root,
        options: {
          dragTarget: `.${this.target.config.itemClass}`,
          dropTarget: `.x-droppable`,
          dragSource: (element, event) => {
            return {
              item: this.target.getItemByPosition(event.clientX, event.clientY),
              element
            };
          },
          mirrorTarget: ListMirrorElement
        }
      });
      DRAG_MANAGER_EVENTS.forEach((event) => {
        this.dragManager.addEventListener(event, this.onDragEvents);
      });
    }
  }
  /**
   * 드래그 매니저를 삭제합니다.
   * @private
   */
  removeDragManager() {
    if (this.dragManager) {
      DRAG_MANAGER_EVENTS.forEach((event) => {
        this.dragManager.removeEventListener(event, this.onDragEvents);
      });
      this.dragManager.destroy();
      this.dragManager = null;
    }
  }
  /**
   * 드래그 매니저 인스턴스를 반환합니다.
   */
  getDragManager(event) {
    if (this.draggable) {
      return this.dragManager;
    }
    if (event.target instanceof DragManager) {
      return event.target;
    }
    return DragManager.getDraggingInstance();
  }
  /**
   * 드랍 대상 인스턴스를 반환합니다.
   */
  getDropInstance(event) {
    const element = event.detail.overContainer;
    if (!element) {
      return this.target;
    }
    return Element.getInstance(element) || element;
  }
  /**
   * 드랍 표시 엘리먼트 생성합니다.
   * @private
   */
  createDropIndicator() {
    if (!this.dropIndicator) {
      this.dropIndicator = buildHTML(this.target.config.dropIndicator);
      this.target.contentLayer.appendChild(this.dropIndicator);
    }
    removeAttribute(this.dropIndicator, "hidden");
    return this.dropIndicator;
  }
  /**
   * 드랍 표시 엘리먼트 삭제합니다.
   * @private
   */
  removeDropIndicator() {
    if (this.dropIndicator) {
      this.target.contentLayer.removeChild(this.dropIndicator);
      this.dropIndicator = null;
    }
  }
  /**
   * 드랍 표시 엘리먼트를 보이게합니다.
   */
  showDropIndicator(dropLocation) {
    if (!dropLocation) {
      return null;
    }
    const { overIndex, overPosition } = dropLocation;
    const yy = this.target.getItemStart(overIndex) - this.target.getItemStart(this.target.firstVisibleIndex);
    const hh = this.target.getItemSize(overIndex);
    const indicator = this.createDropIndicator();
    setY(indicator, yy);
    setHeight(indicator, hh);
    setAttribute(indicator, "dropPosition", overPosition);
    return indicator;
  }
  /**
   * 드랍 표시 엘리먼트를 숨깁니다.
   */
  hideDropIndicator() {
    if (this.dropIndicator) {
      setAttribute(this.dropIndicator, "hidden");
    }
  }
  /**
   * 아이템 드래그 이벤트를 발생 시킵니다.
   */
  dispatchItemDragEvent(event, dropLocation) {
    const type = `item-${event.type}`;
    const cancelable = event.cancelable;
    if (!dropLocation) {
      dropLocation = this.currentDropLocation;
    }
    return this.target.dispatchEvent(new CustomEvent(type, {
      cancelable,
      detail: {
        ...event.detail,
        dropLocation
      }
    }));
  }
  /**
   * drag-ready 핸들러
   */
  onDragReady(event) {
    if (!this.dispatchItemDragEvent(event)) {
      event.preventDefault();
    }
  }
  /**
   * drag-start 핸들러
   */
  onDragStart(event) {
    if (!this.dispatchItemDragEvent(event)) {
      event.preventDefault();
    }
  }
  /**
   * drag-over 핸들러
   */
  onDragOver(event) {
    if (!this.droppable) {
      return;
    }
    const dropPosition = this.calculateDropLocation(event);
    if (!event.detail.isScrolling && dropPosition && this.validDropLocation(dropPosition)) {
      if (this.currentDropLocation && !shallowEqual(this.currentDropLocation, dropPosition)) {
        this.getDragManager(event).cancelDragEnter();
      }
      if (this.dispatchItemDragEvent(event, dropPosition)) {
        this.currentDropLocation = dropPosition;
        this.showDropIndicator(this.currentDropLocation);
        event.preventDefault();
      } else {
        this.currentDropLocation = null;
        this.hideDropIndicator();
      }
    } else {
      this.currentDropLocation = null;
      this.hideDropIndicator();
    }
  }
  /**
   * drag-out 핸들러
   */
  onDragOut(event) {
    this.dispatchItemDragEvent(event);
    this.currentDropLocation = null;
    this.hideDropIndicator();
  }
  /**
   * drag-enter 핸들러
   */
  onDragEnter(event) {
    if (this.dispatchItemDragEvent(event)) {
      this.showDropIndicator(this.currentDropLocation);
    } else {
      event.preventDefault();
    }
  }
  /**
   * drag-leave 핸들러
   */
  onDragLeave(event) {
    this.dispatchItemDragEvent(event);
    this.currentDropLocation = null;
    this.hideDropIndicator();
  }
  /**
   * drop 핸들러
   */
  onDrop(event) {
    if (this.dispatchItemDragEvent(event)) {
      this.applyDrop(this.currentDropLocation);
    } else {
      event.preventDefault();
    }
  }
  /**
   * drag-end 핸들러
   */
  onDragEnd(event) {
    this.dispatchItemDragEvent(event);
    this.currentDropLocation = null;
    this.removeDropIndicator();
  }
  /**
   * drag-cancel 핸들러
   */
  onDragCancel(event) {
    this.dispatchItemDragEvent(event);
    this.currentDropLocation = null;
    this.removeDropIndicator();
  }
  /**
   * drag-mirror-create 핸들러
   */
  onDragMirrorCreate(event) {
    this.dispatchItemDragEvent(event);
    this.dragManager.mirrorElement.root.style.setProperty("--drag-width", `${this.target.contentLayer.offsetWidth}px`);
  }
  /**
   * drag-mirror-remove 핸들러
   */
  onDragMirrorRemove(event) {
    this.dispatchItemDragEvent(event);
    this.dragManager.mirrorElement.root.style.removeProperty("--drag-width");
  }
  handleEvents(event, dragContext) {
    this.dragContext = dragContext;
    switch (event.type) {
      case "drag-ready":
        this.onDragReady(event);
        break;
      case "drag-start":
        this.onDragStart(event);
        break;
      case "drag-over":
        this.onDragOver(event);
        break;
      case "drag-out":
        this.onDragOut(event);
        break;
      case "drag-enter":
        this.onDragEnter(event);
        break;
      case "drag-leave":
        this.onDragLeave(event);
        break;
      case "drop":
        this.onDrop(event);
        break;
      case "drag-end":
        this.onDragEnd(event);
        break;
      case "drag-cancel":
        this.onDragCancel(event);
        break;
      case "drag-mirror-create":
        this.onDragMirrorCreate(event);
        break;
      case "drag-mirror-remove":
        this.onDragMirrorRemove(event);
        break;
    }
  }
}
class ListDragDrop extends DragDropBase {
  constructor(target) {
    super(target);
  }
  calculateDropLocation(event) {
    const { contentLayer, collection } = this.target;
    const { dragSource, trigger } = event.detail;
    const mouseEvent = trigger;
    const foundIndex = this.target.getItemIndexByPosition(mouseEvent.clientX, mouseEvent.clientY);
    const overIndex = foundIndex >= 0 ? foundIndex : (collection == null ? void 0 : collection.length) - 1 || 0;
    const overY = mouseEvent.clientY - (contentLayer.getBoundingClientRect().top - contentLayer.offsetTop + this.target.getItemStart(overIndex));
    const overSize = this.target.getItemSize(overIndex);
    const overPosition = overY / overSize < 0.5 ? "top" : "bottom";
    const dropIndex = overIndex + (overPosition === "bottom" ? 1 : 0);
    return {
      dragIndex: (collection == null ? void 0 : collection.indexOf(dragSource.item)) ?? -1,
      dragItem: dragSource.item,
      overIndex,
      overItem: (collection == null ? void 0 : collection.get(overIndex)) ?? null,
      overPosition,
      dropIndex
    };
  }
  validDropLocation(dropLocation) {
    if (!this.draggable) {
      return true;
    }
    const { dragIndex, dropIndex } = dropLocation;
    const delta = dropIndex - dragIndex;
    return !(delta >= 0 && delta <= 1);
  }
  applyDrop(dropLocation) {
    const collection = this.target.collection;
    const { dragIndex, dropIndex, dragItem } = dropLocation;
    if (this.dragging) {
      collection.move(dragIndex, dropIndex - (dragIndex < dropIndex ? 1 : 0));
    } else {
      if (!collection) {
        this.target.items = [dragItem];
      } else {
        collection.addAt(dropIndex, dragItem);
      }
    }
  }
}
class List extends SelectableElement {
  constructor() {
    super();
    this.needUpdateTypicalSize = false;
    this.doLayouting = false;
    this.boundCollectionChange = this.onCollectionChange.bind(this);
    this._items = null;
    this._rowCount = 0;
    this._isExternalScroller = false;
    this._caretIndex = -1;
    this.selectOnClick = this.config.selectOnClick;
    this.selectOnKeys = this.config.selectOnKeys;
    this.toggleOnSelect = false;
    this.scrollViewOnSelect = true;
    this.minItemSize = 30;
    this.hookDragMessage = null;
    this.onScrollerScroll = /* @__PURE__ */ (() => {
      let oldLeft = 0;
      let oldTop = 0;
      return (event) => {
        this.dispatchCustomEvent("scroll", {
          oldLeft,
          oldTop,
          scrollLeft: this.scrollLeft,
          scrollTop: this.scrollTop,
          trigger: event
        });
        oldLeft = this.scrollLeft;
        oldTop = this.scrollTop;
        this.invalidateFor(Reason.SCROLL);
      };
    })();
    this.layout = new VerticalLayout(this);
    this.elementList = new ItemList();
    this.groupMap = /* @__PURE__ */ new Map();
    this.rootGroup = new Group(this, { __ROOT__: true }, this.contentLayer);
    this.scrollTarget = this.root;
    this.groupTemplate = this.config.groupTemplate;
    this.itemTemplate = this.config.itemTemplate;
    this.dragDrop = new this.dragDropFactory(this);
    this.root.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.root.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.root.addEventListener("keydown", this.onKeyDown.bind(this));
    this.cancelInvalidate();
  }
  get selectorFactory() {
    return ListSelector;
  }
  get dragDropFactory() {
    return ListDragDrop;
  }
  get layout() {
    return this._layout;
  }
  set layout(value) {
    this._layout = value;
  }
  get contentLayer() {
    return this.__dom__.refs.contentLayer;
  }
  /**
   * 배열 타입의 데이터를 관리하는 `ArrayList` 인스턴스를 반환합니다.
   * 반환형은 `IList<T>` 인터페이스이지만, 실제로는 `ArrayList`를 반환합니다.
   */
  get collection() {
    return this._collection;
  }
  /**
   * 표시되는 아이템의 배열입니다.
   * @return {Array}
   */
  get items() {
    return this._items;
  }
  set items(value) {
    if (this.items !== value) {
      this._items = value;
      this.setCollection(value);
    }
  }
  /**
   * 스크롤을 가지고 있는 HTMLElement 객체입니다.
   */
  get scroller() {
    return this._scrollTarget;
  }
  /**
   * 외부스크롤 사용했는지 여부를 나타냅니다.
   */
  get isExternalScroller() {
    return this._isExternalScroller;
  }
  /**
   * 아이템 목록의 외부 스크롤을 지정합니다. 아이템 목록을 포함하는 부모노드만 가능합니다.
   */
  get scrollTarget() {
    return this._scrollTarget;
  }
  set scrollTarget(target) {
    if (target == null) {
      target = this.root;
    }
    if (this.scroller) {
      this.scroller.removeEventListener("scroll", this.onScrollerScroll);
    }
    let element;
    if (typeof target === "string") {
      element = document.querySelector(target);
      if (!element) {
        console.warn("not found scrollTarget.", target);
      }
    } else {
      element = target;
    }
    if (!element) {
      console.warn("scrollTarget is null.", target);
    }
    if (element) {
      this._scrollTarget = element;
      this._isExternalScroller = this.scroller !== this.root && this.scroller.contains(this.root);
      this.root.style.overflow = this._isExternalScroller ? "visible" : "";
      this.scroller.style.overflowAnchor = "none";
      this.scroller.addEventListener("scroll", this.onScrollerScroll, { passive: true });
    }
  }
  /**
   * 수직 스크롤 최대 값입니다.
   */
  get maxScrollTop() {
    return this.scroller.scrollHeight - this.scroller.clientHeight;
  }
  /**
   * 수평 스크롤 최대 값입니다.
   */
  get maxScrollLeft() {
    return this.scroller.scrollWidth - this.scroller.clientWidth;
  }
  /**
   * 스크롤의 상단 위치를 반환합니다.
   */
  get scrollTop() {
    return this.scroller.scrollTop;
  }
  set scrollTop(value) {
    this.scroller.scrollTop = value;
  }
  /**
   * 스크롤의 좌측 위치를 반환합니다.
   */
  get scrollLeft() {
    return this.scroller.scrollLeft;
  }
  set scrollLeft(value) {
    this.scroller.scrollLeft = value;
  }
  /**
   * 아이템과 해당 아이템의 상태(`ItemState<T>`)에 따른 렌더링 방법을 정의합니다.
   * HTML 형태의 문자열, 완성된 HTMLElement 또는 HTMLElement 반환하는 콜백 함수중 하나의 형태를 가질 수 있습니다
   * 아래의 예제는 콜백 함수의 사용 예를 나타냅니다.
   * ```typescript
   * (state: ItemState<T>): HTMLElement {
   *     element = document.createElement('div');
   *     element.innerText = state.item['text'];
   *     return element;
   * }
   * ```
   */
  get itemTemplate() {
    return this._itemTemplate;
  }
  set itemTemplate(value) {
    if (this.itemTemplate != value) {
      this._itemTemplate = value;
      this.clear();
      this.invalidateFor(Reason.RESET);
    }
  }
  get groupTemplate() {
    return this._groupTemplate;
  }
  set groupTemplate(value) {
    if (this.groupTemplate != value) {
      this._groupTemplate = value;
    }
  }
  /**
   * 아이템 목록에 표시되는 최대 아이템 개수입니다.
   */
  get rowCount() {
    return this._rowCount;
  }
  set rowCount(value) {
    if (!(value >= 0)) {
      throw new Error("Not a positive integer.");
    }
    if (this._rowCount !== value) {
      this._rowCount = Math.max(0, value);
      this.invalidate();
    }
  }
  /**
   * 커서 인덱스입니다.
   */
  get caretIndex() {
    return this._caretIndex;
  }
  set caretIndex(index) {
    if (this.caretIndex !== index) {
      const oldValue = this.caretIndex;
      this._caretIndex = index;
      this.invalidateFor(Reason.CARET);
      this.dispatchCustomEvent("caret-change", {
        value: index,
        oldValue
      });
    }
  }
  /**
   * 아이템 렌더링 갱신 시 호출되는 함수를 정의합니다.
   * 이 콜백은 아이템이 재렌더링될 때마다 호출되며, 커스텀 처리나 추가적인 로직을 수행할 수 있습니다.
   */
  get hookRenderElement() {
    return this._hookRenderElement;
  }
  set hookRenderElement(callback) {
    this._hookRenderElement = callback;
  }
  /**
   * 아이템이 삭제될 때 호출되는 함수를 정의합니다.
   * 이 콜백은 아이템이 메모리에서 해제되기 바로 직전에 호출되며,
   * 아이템의 마지막 상태를 처리하거나 필요한 정리 작업을 수행할 수 있습니다.
   */
  get hookFreeElement() {
    return this._hookFreeElement;
  }
  set hookFreeElement(callback) {
    this._hookFreeElement = callback;
  }
  /**
   * List 아이템이 드래그 가능한지 여부를 나타냅니다.
   */
  get draggable() {
    return this.dragDrop.draggable;
  }
  set draggable(value) {
    this.dragDrop.draggable = value;
  }
  /**
   * List 내부의 아이템 또는 다른 List 아이템이 해당 List 위에 드롭 가능한지 여부를 나타냅니다.
   */
  get droppable() {
    return this.dragDrop.droppable;
  }
  set droppable(value) {
    this.dragDrop.droppable = value;
    toggleClass(this.root, "x-droppable", value);
  }
  /**
   * 리스트에 보여지는 첫번째 인덱스를 반환합니다.
   */
  get firstVisibleIndex() {
    return this.elementList.firstIndex;
  }
  /**
   * 리스트에 보여지는 마지막 인덱스를 반환합니다.
   */
  get lastVisibleIndex() {
    return this.elementList.lastIndex;
  }
  get isMouseDown() {
    return this._downIndex >= 0;
  }
  createCollection(source = null) {
    return new ArrayList(source);
  }
  setCollection(items) {
    var _a;
    (_a = this.collection) == null ? void 0 : _a.removeEventListener("collection-change", this.boundCollectionChange);
    this._collection = this.createCollection();
    this.collection.addEventListener("collection-change", this.boundCollectionChange);
    this.selector.source = this._collection;
    this._collection.source = items;
  }
  doLayout() {
    var _a;
    this.dispatchEvent(new CustomEvent("render-updating"));
    this.startLayout();
    const isVisible = !!this.root.offsetParent && ((_a = this.collection) == null ? void 0 : _a.length) > 0;
    if (this.hasInvalidateReason(Reason.RESET, Reason.RESIZE) || this.needUpdateTypicalSize) {
      if (isVisible) {
        this.measureSize();
        this.needUpdateTypicalSize = false;
      } else {
        this.needUpdateTypicalSize = true;
      }
    }
    const scrollRect = this.scroller.getBoundingClientRect();
    const rootRect = this.root.getBoundingClientRect();
    const contentRect = this.contentLayer.getBoundingClientRect();
    if (isVisible && (!this.isExternalScroller || intersect(scrollRect, rootRect))) {
      const scrollX = Math.floor(Math.max(0, scrollRect.left - contentRect.left + this.contentLayer.offsetLeft));
      const scrollY = Math.floor(Math.max(0, scrollRect.top - contentRect.top + this.contentLayer.offsetTop));
      const width = Math.floor(Math.min(this.scroller.clientWidth, scrollRect.right - rootRect.left));
      const height = Math.floor(Math.min(this.scroller.clientHeight, scrollRect.bottom - rootRect.top));
      this.layout.doUpdate(scrollX, scrollY, width, height);
    }
    this.endLayout();
    this.dispatchEvent(new CustomEvent("render-update"));
  }
  startLayout() {
    this.doLayouting = true;
    this.pendingElementList = new ItemList();
  }
  endLayout() {
    if (this.doLayouting) {
      this.doLayouting = false;
      this.freeElements(this.elementList.map((element, index) => this.collection.get(index)));
      this.elementList = this.pendingElementList;
      this.pendingElementList = null;
      this.layout.updateContentSize();
    }
  }
  measureSize() {
    const size = this.updateTypicalSize();
    if (size) {
      this.layout.setDefaultSize(size);
    }
  }
  updateTypicalSize(item = {}) {
    let size = null;
    if (this.itemTemplate) {
      try {
        const element = this.templateToElement(this.itemTemplate, { item, index: -1, dummy: true });
        element.style.position = "absolute";
        addClass(element, this.config.itemClass, "x-typical");
        if (this.hookRenderElement) {
          this.hookRenderElement({ element, item, index: -1, dummy: true });
        }
        this.contentLayer.appendChild(element);
        const rect = element.getBoundingClientRect();
        size = {
          width: Math.max(rect.width, this.minItemSize),
          height: Math.max(rect.height, this.minItemSize)
        };
        this.contentLayer.removeChild(element);
      } catch (error) {
        console.error(error);
      }
    }
    return size;
  }
  getGroupKey(item) {
    return null;
  }
  createGroup(parent, key) {
    return new Group(this, key, this.templateToElement(this.config.groupTemplate, {}));
  }
  getGroup(item) {
    const groupKey = this.getGroupKey(item instanceof Group ? item.key : item);
    if (groupKey) {
      let group = this.groupMap.get(groupKey);
      if (!group) {
        const parentGroup = this.getGroup(groupKey);
        group = this.createGroup(parentGroup, groupKey);
        parentGroup.add(group, group.container);
        this.groupMap.set(groupKey, group);
      }
      return group;
    }
    return this.rootGroup;
  }
  addElementInGroup(item, element) {
    const group = this.getGroup(item);
    return group.add(item, element);
  }
  removeElementInGroup(item) {
    let group = this.getGroup(item);
    group.remove(item);
    while (group) {
      const parent = group.parent;
      if (parent && group.length <= 0) {
        parent.remove(group);
        this.groupMap.delete(group.key);
      }
      group = parent;
    }
  }
  removeElementAll() {
    this.rootGroup.clear();
    this.groupMap.clear();
  }
  /**
   * 해당 인덱스의 엘리먼트 생성합니다.
   * @param index
   */
  createElement(index) {
    var _a;
    const item = this.collection.get(index);
    const state = this.getItemState(index);
    let element = this.elementList.removeAt(index);
    if (!element) {
      element = this.templateToElement(this.itemTemplate, { element, ...state });
      if (element) {
        addClass(element, this.config.itemClass);
      }
    }
    if (!element) {
      throw new Error(`List.itemTemplate is wrong. [index=${index}]`);
    }
    state.element = element;
    if (this.doLayouting) {
      this.pendingElementList.add(index, element);
      this.addElementInGroup(item, element);
      this.updateElementState(element, state);
      const promise = (_a = this.hookRenderElement) == null ? void 0 : _a.call(this, { element, ...state });
      if (promise instanceof Promise) {
        promise.then(() => {
          this.layout.updateElementAt(index);
        });
      } else {
        this.layout.updateElementAt(index);
      }
    }
    return element;
  }
  /**
   * 해당 아이템 목록의 자원을 해제합니다.
   */
  freeElements(items) {
    items.forEach((item) => this.removeElementInGroup(item));
  }
  /**
   * 해당 엘리먼트 자원을 해제하고 보모 엘리먼트로부터 제거합니다.
   */
  freeElement(element) {
    var _a;
    if (this.hookFreeElement) {
      try {
        this.hookFreeElement({ element });
      } catch (reason) {
        console.error(reason);
      }
    }
    (_a = element.parentElement) == null ? void 0 : _a.removeChild(element);
  }
  /**
   * 해당 인덱스 아이템을 갱신합니다.
   */
  invalidateAt(index) {
    var _a;
    const element = this.getElementAt(index);
    if (element) {
      const state = this.getItemState(index);
      state.element = element;
      this.updateElementState(element, state);
      const promise = (_a = this.hookRenderElement) == null ? void 0 : _a.call(this, { element, ...state });
      if (promise instanceof Promise) {
        promise.then(() => {
          this.layout.updateElementAt(index);
        });
      } else {
        this.layout.updateElementAt(index);
      }
    }
  }
  /**
   * 해당 인덱스의 위치로 스크롤합니다. 이미 표시되어 있는 경우 스크롤 되지 않습니다.
   */
  scrollToIndex(index) {
    const MAX_COUNT = 20;
    let count = 0;
    index = clamp(index, 0, this.collection.length - 1);
    const offset = this.calculateContentLayerPosition();
    do {
      const delta = this.layout.calculateScrollPositionDelta(index, offset);
      if (delta) {
        const oldTop = this.scrollTop;
        const oldLeft = this.scrollLeft;
        this.scrollTop += delta.y;
        this.scrollLeft += delta.x;
        if (this.scrollTop !== oldTop || this.scrollLeft !== oldLeft) {
          this.invalidate();
          this.flush();
        } else {
          break;
        }
      } else {
        break;
      }
    } while (count++ < MAX_COUNT);
  }
  /**
   * 해당 아이템 위치로 스크롤합니다. 이미 표시되어 있는 경우 스크롤 되지 않습니다.
   */
  scrollToItem(item) {
    const index = this.collection.indexOf(item);
    if (index >= 0) {
      this.scrollToIndex(index);
    }
  }
  /**
   * 해당 인덱스의 엘리먼트를 반환합니다.
   * @param index
   */
  getElementAt(index) {
    return this.elementList.get(index);
  }
  /**
   * 해당 위치의 아이템 인덱스를 반환합니다.
   * @param globalX 글로벌 좌표 X
   * @param globalY 글로벌 좌표 Y
   */
  getItemIndexByPosition(globalX, globalY) {
    var _a;
    const contentRect = this.contentLayer.getBoundingClientRect();
    const x = Math.round(globalX - contentRect.left + this.contentLayer.offsetLeft);
    const y = Math.round(globalY - contentRect.top + this.contentLayer.offsetTop);
    const index = this.layout.positionToIndex({ x, y });
    if (index >= 0 && index < ((_a = this.collection) == null ? void 0 : _a.length)) {
      return index;
    }
    return -1;
  }
  /**
   * 해당 위치의 아이템을 반환합니다.
   * @param globalX 글로벌 좌표 X
   * @param globalY 글로벌 좌표 Y
   * @return T
   */
  getItemByPosition(globalX, globalY) {
    return this.collection.get(this.getItemIndexByPosition(globalX, globalY));
  }
  /**
   * 해당 index 아이템 위치를 반환합니다.
   * @param index 아이템 인덱스
   * @return 아이템 위치
   */
  getItemStart(index) {
    return this.layout.getStart(index);
  }
  /**
   * 해당 index 아이템 크기를 반환합니다.
   * @param index 아이템 인덱스
   * @returns 아이템 크기
   */
  getItemSize(index) {
    return this.layout.getSize(index);
  }
  doSelectionUpdate(data) {
    var _a, _b;
    super.doSelectionUpdate(data);
    if (this.scrollViewOnSelect && !this.isMouseDown && data.kind === "set" && ((_a = data.items) == null ? void 0 : _a.length) > 0) {
      this.commitCaret((_b = this.collection) == null ? void 0 : _b.indexOf(data.items[0]));
    }
  }
  getItemState(index) {
    const item = this.collection.get(index);
    const selected = this.hasSelectedItem(item);
    const focused = index === this.caretIndex;
    const isFirst = item === this.collection.get(0);
    const isLast = item === this.collection.get(this.collection.length - 1);
    return { item, index, selected, focused, isFirst, isLast };
  }
  updateElementState(element, state) {
    toggleAttribute(element, "first", state.isFirst ? "" : null);
    toggleAttribute(element, "last", state.isLast ? "" : null);
    toggleAttribute(element, "select", state.selected ? "" : null);
    toggleAttribute(element, "focus", state.focused ? "" : null);
  }
  calculateContentLayerPosition() {
    if (this.isExternalScroller) {
      const scrollRect = this.scroller.getBoundingClientRect();
      const contentRect = this.contentLayer.getBoundingClientRect();
      return {
        x: this.scroller.scrollLeft - (scrollRect.left - contentRect.left + this.contentLayer.offsetLeft),
        y: this.scroller.scrollTop - (scrollRect.top - contentRect.top + this.contentLayer.offsetTop)
      };
    }
    return { x: 0, y: 0 };
  }
  /**
   * 아이템, 선택 목록, 커서 및 스크롤 위치 초기화합니다.
   */
  clear() {
    this.cancelInvalidate();
    this.removeElementAll();
    this.elementList.clear();
    this.layout.clear();
    this.clearSelection();
    this.scrollLeft = 0;
    this.scrollTop = 0;
    this._caretIndex = -1;
  }
  commitSelection(index, multiple) {
    const item = this.collection.get(index);
    if (this.allowMultiple || multiple) {
      this.toggleSelectedItem(item);
    } else {
      this.setSelectedItems([item]);
    }
  }
  commitCaret(index) {
    var _a;
    if (index >= 0 && index < ((_a = this.collection) == null ? void 0 : _a.length)) {
      this.caretIndex = index;
      this.scrollToIndex(index);
      return true;
    }
    return false;
  }
  moveArrow(event) {
    let next = this.caretIndex;
    switch (event.keyCode) {
      case 37:
      case 38:
        next -= 1;
        break;
      case 39:
      case 40:
        next += 1;
        break;
    }
    if (this.caretIndex !== next) {
      this.commitCaret(next);
      return true;
    }
    return false;
  }
  dispatchItemEvent(type, item, trigger, cancelable = false) {
    const index = this.collection.indexOf(item);
    const element = this.getElementAt(index);
    return this.dispatchCustomEvent(type, { index, item, element, trigger }, cancelable);
  }
  templateToElement(template, state) {
    return buildHTML(template, state);
  }
  /**
   * 해당 이벤트에 위치한 아이템 인덱스를 반환합니다.
   * @param event
   * @protected
   */
  mouseEventToIndex(event) {
    var _a;
    const content = this.contentLayer;
    const element = event.target;
    if (content.contains(element)) {
      const rect = content.getBoundingClientRect();
      const x = Math.round(event.clientX - rect.left + content.offsetLeft);
      const y = Math.round(event.clientY - rect.top + content.offsetTop);
      const index = this.layout.positionToIndex({ x, y });
      if (index >= 0 && index < ((_a = this.collection) == null ? void 0 : _a.length)) {
        return index;
      }
    }
    return -1;
  }
  /**
   * Collection reset event
   * @private
   */
  collectionReset() {
    this.clear();
    this.layout.collectionReset();
    this.invalidateFor(Reason.RESET);
  }
  /**
   * @private
   */
  collectionRefresh() {
    this.removeElementAll();
    this.elementList.clear();
    this.layout.collectionReset();
    this.invalidateFor(Reason.REFRESH);
  }
  collectionSet(data) {
    const { index, item } = data;
    this.removeElementInGroup(item);
    this.elementList.collectionSet(index, 1);
    this.layout.collectionSet(index, 1);
    this.invalidateFor(Reason.ITEM_UPDATE);
  }
  collectionAdd(data) {
    const { items: { length: numItems }, index } = data;
    this.elementList.collectionAdd(index, numItems);
    this.layout.collectionAdd(index, numItems);
    this.invalidateFor(Reason.ITEM_ADD);
  }
  collectionRemove(data) {
    if ("to" in data) {
      const length = data.to - data.index + 1;
      this.elementList.collectionRemove(data.index, length);
      this.layout.collectionRemove(data.index, length);
    } else {
      data.indices.slice(0).sort(function(a, b) {
        return numericCompare(a, b) * -1;
      }).forEach((index) => {
        this.elementList.collectionRemove(index, 1);
        this.layout.collectionRemove(index, 1);
      });
    }
    this.freeElements(data.items);
    this.invalidateFor(Reason.ITEM_REMOVE);
  }
  collectionMove(data) {
    const { oldIndex: from, index: to, item } = data;
    this.removeElementInGroup(data.item);
    this.elementList.collectionRemove(from, 1);
    this.layout.collectionRemove(from, 1);
    this.elementList.collectionAdd(to, 1);
    this.layout.collectionAdd(to, 1);
    this.invalidateFor(Reason.ITEM_MOVE);
  }
  onCollectionChange(event) {
    const { detail: data } = event;
    switch (data.kind) {
      case "reset":
        this.collectionReset();
        break;
      case "refresh":
        this.collectionRefresh();
        break;
      case "set":
        this.collectionSet(data);
        break;
      case "add":
        this.collectionAdd(data);
        break;
      case "remove":
        this.collectionRemove(data);
        break;
      case "move":
        this.collectionMove(data);
        break;
    }
  }
  onMouseDown(event) {
    if (!event.defaultPrevented) {
      const index = this.mouseEventToIndex(event);
      if (index >= 0) {
        this._downIndex = index;
        if (this.dispatchItemEvent("item-down", this.collection.get(index), event, true)) {
          if (!this.selectOnClick) {
            this.commitSelection(index, this.toggleOnSelect);
          }
          this.commitCaret(index);
        }
      }
    }
  }
  onMouseUp(event) {
    if (!event.defaultPrevented) {
      const index = this.mouseEventToIndex(event);
      if (index >= 0) {
        const item = this.collection.get(index);
        this.dispatchItemEvent("item-up", item, event);
        if (this._downIndex === index && this.dispatchItemEvent("item-click", item, event, true)) {
          if (this.selectOnClick) {
            this.commitSelection(index, this.toggleOnSelect);
          }
        }
      }
    }
    this._downIndex = -1;
  }
  onKeyDown(event) {
    const element = event.target;
    if (!isEditableElement(element)) {
      if (this.selectOnKeys.indexOf(event.keyCode) >= 0) {
        if (this.caretIndex >= 0) {
          this.commitSelection(this.caretIndex, this.toggleOnSelect);
          event.preventDefault();
        }
      } else if (this.moveArrow(event)) {
        event.preventDefault();
      }
    }
  }
}
List.template(`<div class="x-list" tabindex="0" style="position:relative;">
            <div id="contentLayer" class="x-list-container" style="position:relative;overflow:hidden;"></div> 
        </div>`);
List.config = {
  defaultItemSize: 30,
  selectOnClick: false,
  selectOnKeys: [13, 32],
  itemClass: "x-list-item",
  groupTemplate: `<div class="x-list-group"></div>`,
  dropIndicator: `<div class="x-drop-container"><div class="x-drop-indicator"></div></div>`
};
class HierarchyList extends IList {
  constructor(source, childrenField = "children") {
    super();
    this._displayPolicy = "ABOVE";
    this._lockDisplayListEvent = false;
    this.onDisplayCollectionChange = (event) => {
      if (this._lockDisplayListEvent) {
        return;
      }
      const { detail } = event;
      switch (detail.kind) {
        case "reset":
          break;
        case "add":
        case "remove":
          this.dispatchCollectionEvent(detail);
          break;
      }
    };
    this.nodeEventCounter = new EventCounter(this);
    this._rootNode = null;
    this._displayList = new ArrayList();
    this._displayList.addEventListener("collection-change", this.onDisplayCollectionChange);
    this._expandedNodeMap = /* @__PURE__ */ new Map();
    this._parentMap = /* @__PURE__ */ new Map();
    this._childrenMap = /* @__PURE__ */ new Map();
    this._childrenField = childrenField;
    if (source) {
      this.source = source;
    }
  }
  /**
   * 출력된 노드 목록를 반환합니다.
   */
  get displayNodes() {
    return this._displayList.toArray();
  }
  /**
   * 하위 노드 목록의 정보를 가지고 있는 필드 나타냅니다.
   */
  get childrenField() {
    return this._childrenField;
  }
  set childrenField(value) {
    if (this._childrenField !== value) {
      this._childrenField = value;
      this.internalReset();
    }
  }
  /**
   * 리스트에서 부모위치를 나타냅니다.
   */
  get displayPolicy() {
    return this._displayPolicy;
  }
  set displayPolicy(value) {
    if (this._displayPolicy !== value) {
      this._displayPolicy = value;
      this.internalReset();
    }
  }
  /**
   * 해당 노드의 부모 노드를 반환합니다.
   * @param node 자식 노드입니다.
   * @returns T
   */
  getParentNode(node) {
    let parent = this.internalGetParentNode(node);
    if (parent === this._rootNode) {
      parent = null;
    }
    return parent;
  }
  /**
   * 해당 노드의 조상 노드 목록을 반환합니다.
   * @param node
   * @returns {Array}
   */
  getAncestorNodes(node) {
    const nodes = [];
    let active = this.getParentNode(node);
    while (active) {
      nodes.unshift(active);
      active = this.getParentNode(active);
    }
    return nodes;
  }
  /**
   * 해당 노드의 후손 노드 목록을 반환합니다. null 이면 전체 노드 반환
   * @param node
   * @returns {Array}
   */
  getDescendantNodes(node) {
    return this.find((child) => {
      return !!child && node !== child;
    }, node);
  }
  /**
   * 해당노드의 형제노드들을 반환합니다.
   * @returns {Array} 형제노드 배열입니다.
   */
  getSiblingNodes(node) {
    const parentNode = this.getParentNode(node);
    return this.getChildren(parentNode);
  }
  /**
   * @param node
   * @private
   */
  internalGetParentNode(node) {
    if (node === this._rootNode) {
      return null;
    }
    let parent = this._parentMap.get(node);
    if (!parent && this._rootNode) {
      const children = this.getNativeChildren(this._rootNode);
      if (children && children.indexOf(node) >= 0) {
        return null;
      }
      this.addAllParentMapping();
      parent = this._parentMap.get(node);
    }
    return parent;
  }
  /**
   * 해당 노드의 자식노드들을 반환합니다.
   * @param node 부모 노드입니다.
   * @returns {Array} 자식노드 배열입니다.
   */
  getChildren(node) {
    if (node == null) {
      node = this._rootNode;
    }
    let children = null;
    if (!this._childrenMap.has(node)) {
      if (node === this._rootNode || this.childrenField in node) {
        children = this.getNativeChildren(node);
        this.addChildrenMapping(node, children);
      }
    }
    children = this._childrenMap.get(node);
    return children;
  }
  /**
   * 해당 노드의 가공되지 않은 원본 자식노드들을 반환합니다.
   * @param node 부모 노드입니다.
   * @returns {Array} 자식노드 배열입니다.
   */
  getNativeChildren(node) {
    if (!node) {
      node = this._rootNode;
    }
    if (node && this.childrenField in node) {
      return node[this.childrenField];
    }
    return null;
  }
  /**
   * 해당노드 하위의 열린 노드들을 배열형태로 반환합니다.
   * @param node 부모 노드입니다.
   * @returns {Array} 자식노드 배열입니다.
   */
  getDisplayChildren(node) {
    return this.internalGetDisplayChildren(node, false);
  }
  /**
   * 해당 노드 부모의 기준으로 인덱스를 반환합니다.
   * @param node
   * @returns {Number} 형제 노드목록에서의 인덱스.
   */
  getNodeIndex(node) {
    const nodes = this.getSiblingNodes(node) || [];
    return nodes.indexOf(node);
  }
  /**
   * @private
   */
  internalGetDisplayChildren(node, doParentMapping) {
    let result = [];
    if (this.isExpandedNode(node)) {
      const children = this.getChildren(node);
      for (let i = 0, num = children == null ? void 0 : children.length; i < num; i++) {
        const child = children[i];
        if (doParentMapping) {
          this.addParentMapping(node, child);
        }
        if (this._displayPolicy === "NONE") {
          if (!this.isExpandedNode(child) || !this.hasChildren(child)) {
            result.push(child);
          }
        } else if (this._displayPolicy === "ABOVE") {
          result.push(child);
        }
        result = result.concat(this.internalGetDisplayChildren(child, doParentMapping));
      }
    }
    return result;
  }
  /**
   * 해당 노드에 자식이 있는지 확인합니다.
   * @param node
   * @returns {boolean}
   */
  hasChildren(node) {
    var _a;
    return ((_a = this.getChildren(node)) == null ? void 0 : _a.length) > 0;
  }
  /**
   * 해당 node가 있는지 확인합니다.
   * @param node {Object}
   * @return {boolean} 노드가 포함되어 있으면 true.
   */
  contains(node) {
    return !!this.findOne((o) => node === o);
  }
  /**
   * 해당 노드가 확장되어 있는지 확인합니다.
   * @param node
   * @return {boolean} 노드가 확장되어 있으면 true.
   */
  isExpandedNode(node) {
    if (node === this._rootNode) {
      return true;
    }
    return this._expandedNodeMap.has(node);
  }
  /**
   * 해당 노드가 출력된 (즉, 화면에 표시) 노드인지 확인합니다.
   * 노드가 출력되려면 해당 노드의 모든 상위 노드들이 확장된 상태여야 합니다.
   * @param node
   * @return {boolean}
   */
  isDisplayNode(node) {
    let p = node;
    while (p) {
      if (!this.isExpandedNode(p)) {
        return false;
      }
      p = this.getParentNode(p);
    }
    return true;
  }
  /**
   * 해당 노드가 가지노드(자식 노드를 가진 노드)인지 확인합니다.
   * @param node
   */
  isBranchNode(node) {
    return !!(node && this.childrenField in node && Array.isArray(node[this.childrenField]));
  }
  /**
   * 해당 노드가 마지막노드(자식 노드를 가지지 않는 노드)인지 확인합니다.
   * @param node
   */
  isLeafNode(node) {
    return !this.hasChildren(node);
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 `true` 반환하는 모든 아이템이 포함된 새 배열을 만듭니다
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return true 반환하는 항목의 배열입니다.
   */
  find(callback, prefetchNode = null, postOrder = false) {
    if (this.source && callback) {
      const parent = prefetchNode && this.getParentNode(prefetchNode) || null;
      const children = prefetchNode && [prefetchNode] || this.getNativeChildren(parent);
      return this.internalFind(parent, children, callback, postOrder, false);
    }
    return null;
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 처음으로 `true` 반환하는 항목을 반환하고 탐색을 중지합니다.
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return 처음으로 true를 반환하는 항목입니다.
   */
  findOne(callback, prefetchNode = null, postOrder = false) {
    if (this.source && callback) {
      const parent = prefetchNode && this.getParentNode(prefetchNode) || null;
      const children = prefetchNode && [prefetchNode] || this.getNativeChildren(parent);
      const result = this.internalFind(parent, children, callback, postOrder, true);
      if ((result == null ? void 0 : result.length) > 0) {
        return result[0];
      }
    }
    return null;
  }
  /**
   * @private
   */
  internalFind(parent, children, callback, isPostOrder, isOnce) {
    const numChildren = children == null ? void 0 : children.length;
    let result = [];
    for (let i = 0; i < numChildren; ++i) {
      const child = children[i];
      if (!isPostOrder) {
        if (callback(child, parent, children)) {
          result.push(child);
          if (isOnce) {
            return result;
          }
        }
      }
      const subChildren = this.getChildren(child);
      if ((subChildren == null ? void 0 : subChildren.length) > 0) {
        result = result.concat(this.internalFind(child, subChildren, callback, isPostOrder, isOnce));
        if (result.length > 0 && isOnce) {
          return result;
        }
      }
      if (isPostOrder) {
        if (callback(child, parent, children)) {
          result.push(child);
          if (isOnce) {
            return result;
          }
        }
      }
    }
    return result;
  }
  /**
   * 해당 노드를 확장합니다.
   * @param node
   * @return {boolean} 해당 노드가 확장되면 true.
   */
  expandNode(node) {
    if (node && !this.isExpandedNode(node)) {
      const parentNode = this.getParentNode(node);
      if (this.dispatchNodeEvent({ kind: "expanding", parentNode, nodes: [node] }, true)) {
        this.addExpandedNodeMapping(node);
        this.internalExpandNode(node);
        this.dispatchNodeEvent({ kind: "expand", parentNode, nodes: [node] });
        return true;
      }
    }
    return false;
  }
  internalExpandNode(node) {
    if (this.isDisplayNode(node)) {
      const children = this.internalGetDisplayChildren(node, true);
      let index;
      if (node === this._rootNode) {
        index = this._displayList.length;
      } else {
        index = this._displayList.indexOf(node);
        if (index >= 0) {
          index += 1;
        }
      }
      if ((children == null ? void 0 : children.length) > 0 && index >= 0) {
        this._displayList.addAllAt(index, children);
      }
    }
  }
  /**
   * 전체 노드를 확장합니다.
   */
  expandAll() {
    this.setExpandedNodes(this.getParentsInNodes(this.getNativeChildren(null)));
  }
  /**
   * 해당 노드를 축소합니다.
   * @param node
   * @return {boolean} 해당 노드가 축소되면 true.
   */
  collapseNode(node) {
    if (node && this.isExpandedNode(node)) {
      const parentNode = this.getParentNode(node);
      if (this.dispatchNodeEvent({ kind: "collapsing", parentNode, nodes: [node] }, true)) {
        this.internalCollapseNode(node);
        this.removeExpandedNodeMapping(node);
        this.dispatchNodeEvent({ kind: "collapse", parentNode, nodes: [node] });
        return true;
      }
    }
    return false;
  }
  internalCollapseNode(node) {
    if (this.isDisplayNode(node)) {
      const children = this.internalGetDisplayChildren(node, false);
      const index = this._displayList.indexOf(children[0]);
      if (index >= 0) {
        this._displayList.removeAll(children);
      }
    }
  }
  /**
   * 전체 노드를 축소합니다.
   */
  collapseAll() {
    this.setExpandedNodes([]);
  }
  /**
   * 해당 노드 배열을 확장합니다.
   * @param nodes
   */
  setExpandedNodes(nodes) {
    this._expandedNodeMap.clear();
    nodes == null ? void 0 : nodes.forEach((node) => {
      if (this.isBranchNode(node)) {
        this.addExpandedNodeMapping(node);
      }
    });
    this.resetDisplayList();
    this.dispatchCollectionEvent({ kind: "refresh" });
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param node 추가할 자식 노드
   * @returns {boolean}
   */
  addNode(parent, node) {
    const children = this.getNativeChildren(parent);
    return this.addNodeAt(parent, node, (children == null ? void 0 : children.length) || 0);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param node 추가할 자식 노드.
   * @param index 자식 노드 삽입 위치의 인덱스.
   * @returns {boolean}
   */
  addNodeAt(parent, node, index) {
    return this.addNodesAt(parent, [node], index);
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param nodes 추가할 자식 노드 목록
   * @returns {boolean}
   */
  addNodes(parent, nodes) {
    const children = this.getNativeChildren(parent);
    return this.addNodesAt(parent, nodes, (children == null ? void 0 : children.length) || 0);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parentNode 부모 노드.
   * @param nodes 추가할 자식 노드 목록
   * @param index 자식 노드 삽입 위치의 인덱스.
   * @returns {boolean}
   */
  addNodesAt(parentNode, nodes, index) {
    if (!nodes || nodes.length <= 0) {
      return false;
    }
    this.nodeEventCounter.start();
    if (!parentNode) {
      parentNode = this._rootNode;
    }
    this.createChildrenField(parentNode);
    index = Math.max(index, 0);
    const displayChildren = this.getChildren(parentNode);
    const children = this.getNativeChildren(parentNode);
    const numChildren = (children == null ? void 0 : children.length) || 0;
    const numNodes = nodes.length;
    if (displayChildren && displayChildren !== children) {
      const node = displayChildren[index];
      index = children.indexOf(node);
      if (index < 0) {
        index = numChildren;
      }
    }
    index = Math.min(index, numChildren);
    this.internalCollapseNode(parentNode);
    for (let i = 0; i < numNodes; i++) {
      const node = nodes[i];
      this.removeParentMapping(node);
      children.splice(index + i, 0, node);
      this.addParentMapping(parentNode, node);
    }
    this.removeChildrenMapping(parentNode);
    this.internalExpandNode(parentNode);
    this.nodeEventCounter.stop(() => {
      this.dispatchNodeEvent({ kind: "add", parentNode, nodes, index });
    });
    return true;
  }
  /**
   * 노드를 삭제합니다.
   * @param node 삭제할 노드 입니다.
   * @returns {boolean}
   */
  removeNode(node) {
    return this.internalRemoveNode(this.getParentNode(node), node);
  }
  internalRemoveNode(parentNode, node) {
    if (!parentNode) {
      parentNode = this._rootNode;
    }
    const children = this.getNativeChildren(parentNode);
    const removeIndex = children ? children.indexOf(node) : -1;
    if (removeIndex < 0) {
      return false;
    }
    this.nodeEventCounter.start();
    const removedNodes = this.find((o) => !!o, node);
    this.internalCollapseNode(parentNode);
    this.removeChildrenMapping(parentNode);
    removedNodes == null ? void 0 : removedNodes.forEach((o) => {
      this.removeExpandedNodeMapping(o);
      this.removeChildrenMapping(o);
      this.removeParentMapping(o);
    });
    children.splice(removeIndex, 1);
    this.internalExpandNode(parentNode);
    this.nodeEventCounter.stop(() => {
      this.dispatchNodeEvent({ kind: "remove", parentNode, nodes: [node], index: removeIndex });
    });
    return true;
  }
  /**
   * 노드목록을 삭제합니다.
   * @returns {boolean}
   * @param nodes
   */
  removeNodes(nodes) {
    this.nodeEventCounter.start();
    const removed = nodes == null ? void 0 : nodes.filter((node) => this.removeNode(node));
    if ((removed == null ? void 0 : removed.length) > 0) {
      this.nodeEventCounter.stop(() => {
        this.dispatchNodeEvent({ kind: "remove", nodes: removed });
      });
      return true;
    }
    this.nodeEventCounter.cancel();
    return false;
  }
  /**
   *
   * @param node
   * @param toParent
   * @param toIndex
   * @returns {boolean}
   */
  moveNode(node, toParent, toIndex) {
    var _a;
    if (this.getAncestorNodes(toParent).find((o) => o === node)) {
      return false;
    }
    const parentNode = this.getParentNode(node);
    const oldIndex = ((_a = this.getChildren(parentNode)) == null ? void 0 : _a.indexOf(node)) ?? -1;
    this.nodeEventCounter.start();
    if (this.removeNode(node)) {
      this.addNodeAt(toParent, node, toIndex);
      this.nodeEventCounter.stop(() => {
        this.dispatchNodeEvent({
          kind: "move",
          parentNode: toParent,
          nodes: [node],
          index: toIndex,
          oldParentNode: parentNode,
          oldIndex
        });
      });
      return true;
    }
    this.nodeEventCounter.cancel();
    return false;
  }
  /**
   * 확장되어있는 노드목록을 반환합니다.
   * @returns Array 확장된 노드 목록
   */
  getExpandedNodes() {
    const keys = [];
    this._expandedNodeMap.forEach((value, key) => keys.push(key));
    return keys;
  }
  /**
   * 해당 노드의 레벨을 반환합니다.
   * @returns {Number} 노드 레벨
   */
  getNodeLevel(node) {
    if (node === null) {
      return -1;
    }
    let level = -1;
    let active = this.internalGetParentNode(node);
    while (active) {
      active = this.internalGetParentNode(active);
      level++;
    }
    return level;
  }
  /**
   * 해당 노드의 깊이를 반환합니다.
   * @param node
   */
  getNodeDepth(node) {
    const nodes = !node ? this.toArray() : [node];
    return nodes.reduce((depth, node2) => {
      return Math.max(depth, this.internalGetDepth(node2));
    }, 1);
  }
  toStableArray() {
    if (!this._stableNodes) {
      const parents = Array.from(new Set(this._parentMap.values()));
      const getNodes = (nodes) => {
        let result = [];
        for (let i = 0, num = nodes.length; i < num; i++) {
          const node = nodes[i];
          result.push(node);
          if (parents.indexOf(node) >= 0) {
            result = result.concat(getNodes(this.getChildren(node)));
          }
        }
        return result;
      };
      this._stableNodes = getNodes(this.getChildren(this._rootNode));
    }
    return this._stableNodes;
  }
  clone() {
    return new HierarchyList(this.source);
  }
  internalReset() {
    this._expandedNodeMap.clear();
    this._parentMap.clear();
    this._childrenMap.clear();
    this._rootNode = this.createRootNode(this.source);
    this.resetDisplayList();
  }
  getParentsInNodes(nodes) {
    const numNodes = nodes == null ? void 0 : nodes.length;
    let parents = [];
    for (let i = 0; i < numNodes; i++) {
      const node = nodes[i];
      const children = this.getChildren(node);
      if (children && children.length > 0) {
        parents.push(node);
        parents = parents.concat(this.getParentsInNodes(children));
      }
    }
    return parents;
  }
  resetDisplayList() {
    this._lockDisplayListEvent = true;
    this._displayList.clear();
    this.internalExpandNode(this._rootNode);
    this._locals = this._displayList.source;
    this._lockDisplayListEvent = false;
  }
  addExpandedNodeMapping(node) {
    this._expandedNodeMap.set(node, true);
  }
  removeExpandedNodeMapping(node) {
    this._expandedNodeMap.delete(node);
  }
  addAllParentMapping() {
    if (!this._lockAllParentMapping) {
      this._lockAllParentMapping = true;
      this.find((node, parent) => {
        if (!parent) {
          parent = this._rootNode;
        }
        this.addParentMapping(parent, node);
        return false;
      });
      this._lockAllParentMapping = false;
    }
  }
  addParentMapping(parent, node) {
    if (this._parentMap.get(node) !== parent) {
      this._parentMap.set(node, parent);
      this._stableNodes = null;
    }
    if (!parent) {
      console.warn("HierarchyList.addParentMapping !!!", node);
    }
  }
  removeParentMapping(node) {
    if (this._parentMap.has(node)) {
      this._parentMap.delete(node);
      this._stableNodes = null;
    }
  }
  addChildrenMapping(node, children) {
    this._childrenMap.set(node, children);
  }
  removeChildrenMapping(node) {
    this._childrenMap.delete(node);
  }
  createChildrenField(node) {
    if (node && !Array.isArray(node[this.childrenField])) {
      node[this.childrenField] = [];
    }
  }
  createRootNode(children) {
    const node = /* @__PURE__ */ Object.create({ __ROOT_NODE__: true });
    node[this.childrenField] = children;
    return node;
  }
  internalGetDepth(node) {
    var _a;
    let depth = 1;
    (_a = node == null ? void 0 : node[this.childrenField]) == null ? void 0 : _a.forEach((child) => {
      depth = Math.max(depth, this.internalGetDepth(child) + 1);
    });
    return depth;
  }
  dispatchNodeEvent(data, cancelable = false) {
    return this.dispatchEvent(new CustomEvent("node-change", {
      cancelable,
      detail: data
    }));
  }
}
class TreeSelector extends Selector {
  constructor() {
    super(...arguments);
    this.onNodeChange = (event) => {
      const { detail, detail: { kind } } = event;
      switch (kind) {
        case "add":
          break;
        case "remove":
          this.nodeRemove(detail);
          break;
      }
    };
  }
  setSource(source) {
    var _a, _b;
    if (this.source !== source) {
      (_a = this.source) == null ? void 0 : _a.removeEventListener("node-change", this.onNodeChange);
      super.setSource(source);
      (_b = this.source) == null ? void 0 : _b.addEventListener("node-change", this.onNodeChange);
    }
  }
  nodeRemove(data) {
    var _a;
    const hc = new HierarchyList();
    (_a = data.nodes) == null ? void 0 : _a.forEach((node) => {
      hc.source = [node];
      hc.find((item) => this.remove(item));
    });
  }
}
class TreeDragDrop extends DragDropBase {
  constructor(target) {
    super(target);
    this.expandId = -1;
  }
  onDragOver(event) {
    super.onDragOver(event);
    const mouseEvent = event.detail.trigger;
    this.startExpandNode(this.target.getItemByPosition(mouseEvent.clientX, mouseEvent.clientY));
  }
  calculateDropLocation(event) {
    var _a, _b;
    const GAP_RATIO = 0.3;
    const LAST_RATIO = 0.1;
    const { contentLayer, collection } = this.target;
    const { dragSource, trigger } = event.detail;
    const mouseEvent = trigger;
    const foundIndex = this.target.getItemIndexByPosition(mouseEvent.clientX, mouseEvent.clientY);
    const overIndex = foundIndex >= 0 ? foundIndex : (collection == null ? void 0 : collection.length) - 1 || 0;
    const overItem = collection.get(overIndex);
    const overY = mouseEvent.clientY - (contentLayer.getBoundingClientRect().top - contentLayer.offsetTop + this.target.getItemStart(overIndex));
    const overSize = this.target.getItemSize(overIndex);
    const tRatio = overY / overSize;
    const bRatio = 1 - tRatio;
    let dropParentItem = collection.getParentNode(overItem);
    let dropIndex = collection.getChildren(dropParentItem).indexOf(overItem);
    let overPosition = null;
    if (tRatio < GAP_RATIO) {
      overPosition = "top";
    } else if (bRatio < GAP_RATIO) {
      overPosition = "bottom";
      if (collection.isExpandedNode(overItem) && collection.hasChildren(overItem)) {
        dropParentItem = overItem;
        dropIndex = 0;
      } else if (bRatio < LAST_RATIO && dropParentItem && collection.length - 1 === overIndex) {
        dropParentItem = null;
        dropIndex = ((_a = collection.getChildren(null)) == null ? void 0 : _a.length) || 0;
      } else {
        dropIndex += 1;
      }
    } else {
      overPosition = "middle";
      dropParentItem = overItem;
      dropIndex = ((_b = collection.getChildren(overItem)) == null ? void 0 : _b.length) || 0;
    }
    return {
      dragIndex: (collection == null ? void 0 : collection.indexOf(dragSource.item)) ?? -1,
      dragItem: dragSource.item,
      overIndex,
      overItem: (collection == null ? void 0 : collection.get(overIndex)) ?? null,
      overPosition,
      dropIndex,
      dropParentItem
    };
  }
  validDropLocation(dropLocation) {
    if (!this.draggable) {
      return true;
    }
    const { dragItem, overItem, dropIndex, dropParentItem } = dropLocation;
    let node = overItem;
    while (node) {
      if (node === dragItem) {
        return false;
      }
      node = this.target.getParentNode(node);
    }
    if (this.target.getParentNode(dragItem) === dropParentItem) {
      const children = this.target.getChildren(dropParentItem);
      const delta = dropIndex - children.indexOf(dragItem);
      if (delta >= 0 && delta <= 1) {
        return false;
      }
    }
    return true;
  }
  showDropIndicator(dropLocation) {
    const element = super.showDropIndicator(dropLocation);
    if (element) {
      toggleAttribute(element, "level", "" + (this.target.getNodeLevel(dropLocation.dropParentItem) + 1));
    }
    return element;
  }
  applyDrop(dropLocation) {
    const collection = this.target.collection;
    const { dragItem, dropParentItem, dropIndex } = dropLocation;
    const dragParentItem = collection.getParentNode(dragItem);
    const dragIndex = collection.getNodeIndex(dragItem);
    if (this.dragging) {
      const adjustment = dragParentItem === dropParentItem && dragIndex < dropIndex ? -1 : 0;
      collection.moveNode(dragItem, dropParentItem, dropIndex + adjustment);
    } else {
      if (!collection) {
        this.target.items = [dragItem];
      } else {
        collection.addNodeAt(dragParentItem, dragItem, dropIndex);
      }
    }
  }
  startExpandNode(item) {
    if (this.expandId) {
      clearTimeout(this.expandId);
      this.expandId = -1;
    }
    if (this.target.isBranchNode(item) && !this.target.isExpandedNode(item)) {
      this.expandId = setTimeout(() => {
        this.target.expandNode(item);
        this.target.flush();
      }, this.target.config.expandDelayOnOver);
    }
  }
}
class Tree extends List {
  constructor() {
    super();
    this.boundOnNodeChange = this.onNodeChange.bind(this);
    this._childrenField = "children";
    this.autoExpandLevel = 0;
  }
  get selectorFactory() {
    return TreeSelector;
  }
  get dragDropFactory() {
    return TreeDragDrop;
  }
  /**
   * 계층 구조를 가진 아이템 배열을 관리하는 `HierarchyList` 인스턴스를 반환합니다.
   */
  get collection() {
    return this._collection;
  }
  /**
   * 트리 구조에서 아이템의 자식 목록을 포함하는 필드의 이름을 정의합니다.
   */
  get childrenField() {
    return this._childrenField;
  }
  set childrenField(value) {
    if (this._childrenField !== value) {
      this._childrenField = value;
      if (this.collection) {
        this.collection.childrenField = this.childrenField;
      }
    }
  }
  createCollection(source = null) {
    const collection = new HierarchyList(source);
    collection.childrenField = this.childrenField;
    return collection;
  }
  setCollection(items) {
    var _a, _b;
    (_a = this.collection) == null ? void 0 : _a.removeEventListener("node-change", this.boundOnNodeChange);
    super.setCollection(items);
    (_b = this.collection) == null ? void 0 : _b.addEventListener("node-change", this.boundOnNodeChange);
  }
  getItemState(index) {
    const item = this.collection.get(index);
    const state = super.getItemState(index);
    return {
      ...state,
      hasChildren: this.hasChildren(item),
      isExpanded: this.isExpandedNode(item),
      isBranch: this.isBranchNode(item),
      isLeaf: this.isLeafNode(item),
      level: this.getNodeLevel(item)
    };
  }
  updateElementState(element, state) {
    super.updateElementState(element, state);
    toggleAttribute(element, "expand", this.isExpandedNode(state.item) ? "" : null);
    toggleAttribute(element, "branch", this.isBranchNode(state.item) ? "" : null);
    toggleAttribute(element, "leaf", this.isLeafNode(state.item) ? "" : null);
    toggleAttribute(element, "level", "" + state.level);
  }
  getGroupKey(item) {
    return this.getParentNode(item);
  }
  createGroup(parent, key) {
    const group = super.createGroup(parent, key);
    if (group) {
      toggleAttribute(group.container, "level", "" + (this.getNodeLevel(key) + 1));
    }
    return group;
  }
  /**
   * 지정된 노드의 부모 노드를 반환합니다.
   */
  getParentNode(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.getParentNode(node);
  }
  /**
   * 해당 노드의 조상 노드 목록을 반환합니다.
   * @param node
   * @returns {Array}
   */
  getAncestorNodes(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.getAncestorNodes(node);
  }
  /**
   * 해당 노드의 후손 노드 목록을 반환합니다. null 이면 전체 노드를 반환합니다.
   * @param node
   * @returns {Array}
   */
  getDescendantNodes(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.getDescendantNodes(node);
  }
  /**
   * 해당노드의 형제노드들을 반환합니다.
   * @returns {Array} 형제노드 배열입니다.
   */
  getSiblingNodes(node) {
    const parentNode = this.getParentNode(node);
    return this.getChildren(parentNode);
  }
  /**
   * 지정된 노드의 자식노드들을 반환합니다.
   * @param node 부모 노드입니다.
   */
  getChildren(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.getChildren(node);
  }
  /**
   * 해당 노드에 자식이 있는지 여부입니다.
   * @param node
   */
  hasChildren(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.hasChildren(node);
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 `null`이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param node 추가할 자식 노드
   *
   */
  addNode(parent, node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.addNode(parent, node);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
   * 부모 노드가 `null`이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param node 추가할 자식 노드.
   * @param index 자식 노드 삽입 위치의 인덱스.
   */
  addNodeAt(parent, node, index) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.addNodeAt(parent, node, index);
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 `null`이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param nodes 추가할 자식 노드 목록
   *
   */
  addNodes(parent, nodes) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.addNodes(parent, nodes);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
   * 부모 노드가 null 이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param nodes 추가할 자식 노드 목록
   * @param index 자식 노드 삽입 위치의 인덱스.
   */
  addNodesAt(parent, nodes, index) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.addNodesAt(parent, nodes, index);
  }
  /**
   * 부모 노드에서 자식 노드를 삭제합니다.
   * @param node 삭제할 자식 노드 입니다.
   */
  removeNode(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.removeNode(node);
  }
  /**
   * 해당 노드가 있는지 확인합니다.
   * @param node
   * @return 있으면 true,
   */
  contains(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.contains(node);
  }
  /**
   * 해당 노드가 확장되어 있는지 여부입니다.
   */
  isExpandedNode(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.isExpandedNode(node);
  }
  /**
   * 지정된 노드를 확장합니다.
   */
  expandNode(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.expandNode(node);
  }
  /**
   * 전체 노드를 확장합니다.
   */
  expandAll() {
    var _a;
    (_a = this.collection) == null ? void 0 : _a.expandAll();
  }
  /**
   * 지정된 노드를 축소합니다.
   */
  collapseNode(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.collapseNode(node);
  }
  /**
   * 전체 노드를 축소합니다.
   */
  collapseAll() {
    var _a;
    (_a = this.collection) == null ? void 0 : _a.collapseAll();
  }
  /**
   * 주어진 노드의 확장 상태를 확장 또는 축소합니다.
   * @param node
   */
  toggleNode(node) {
    this.isExpandedNode(node) ? this.collapseNode(node) : this.expandNode(node);
  }
  /**
   * 확장된 노드를 설정합니다.
   * @param nodes
   */
  setExpandedNodes(nodes) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.setExpandedNodes(nodes);
  }
  /**
   * 확장된 노드목록을 반환합니다.
   * @returns {Array}
   */
  getExpandedNodes() {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.getExpandedNodes();
  }
  /**
   * 지정된 노드의 레벨을 반환합니다.
   */
  getNodeLevel(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.getNodeLevel(node);
  }
  /**
   * 해당 노드가 가지노드(자식 노드를 가진 노드)인지 확인합니다.
   * @param node
   */
  isBranchNode(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.isBranchNode(node);
  }
  /**
   * 주어진 노드가 마지막노드(자식 노드를 가지지 않는 노드)인지 확인합니다.
   * @param node
   */
  isLeafNode(node) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.isLeafNode(node);
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 `true`를 반환하는 모든 항목이 포함된 새 배열을 만듭니다
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return true 를 반환하는 항목의 배열입니다.
   */
  find(callback, prefetchNode = null, postOrder = false) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.find(callback, prefetchNode, postOrder);
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 처음으로 `true`를 반환하는 항목을 반환하고 탐색을 중지합니다.
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return 처음으로 `true` 반환하는 아이템입니다.
   */
  findOne(callback, prefetchNode = null, postOrder = false) {
    var _a;
    return (_a = this.collection) == null ? void 0 : _a.findOne(callback, prefetchNode, postOrder);
  }
  collectionReset() {
    super.collectionReset();
    if (this.autoExpandLevel > 0) {
      this.setExpandedNodes(this.find((node) => this.getNodeLevel(node) < this.autoExpandLevel));
    }
  }
  onNodeChange(event) {
    if (!this.dispatchCustomEvent(event.type, event.detail, event.cancelable)) {
      event.preventDefault();
      return;
    }
    event.detail;
    this.invalidate();
  }
}
Tree.template(`<div class="x-tree" tabindex="0" style="position:relative;">
            <div id="contentLayer" class="x-tree-container" style="position:relative;overflow:hidden;"></div> 
        </div>`);
Tree.config = {
  itemClass: "x-tree-item",
  groupTemplate: `<div class="x-tree-group"></div>`,
  expandDelayOnOver: 800
};
class SuggestList extends List {
  constructor() {
    super();
    this.typicalItemHook = null;
  }
  measureSize() {
    const item = this.typicalItemHook ? this.typicalItemHook(this.items || []) : {};
    const size = this.updateTypicalSize(item);
    if (size) {
      this.root.style.minWidth = `${Math.ceil(size.width)}px`;
      this.layout.setDefaultSize(size);
    }
  }
}
class Switch {
  constructor(element, value = true) {
    this._value = true;
    this.target = element;
    this.initialize();
    this.value = value;
  }
  get value() {
    return this._value;
  }
  set value(v) {
    if (v) {
      this.on();
    } else {
      this.off();
    }
  }
  initialize() {
    if (!this.target) {
      throw new Error("target is null!!!");
    }
    this.parent = this.target.parentElement;
    this.index = Array.from(this.parent.children).indexOf(this.target);
  }
  on() {
    if (!this._value) {
      this._value = true;
      this.parent.insertBefore(this.target, this.parent.children[this.index]);
    }
  }
  off() {
    if (this._value) {
      this.parent.removeChild(this.target);
      this._value = false;
    }
  }
  static create(element, isOn = true) {
    return new Switch(element, isOn);
  }
}
class Autocomplete extends SelectableElement {
  /**
   * 외부영역 클릭시 팝업을 닫을지 여부입니다.
   */
  get closeOnOutsideDown() {
    return this.suggestPopup.closeOnOutsideDown;
  }
  set closeOnOutsideDown(value) {
    this.suggestPopup.closeOnOutsideDown = value;
  }
  constructor() {
    super();
    this.highlightCache = {};
    this.loadSuggestValue = null;
    this.lastSuggestValue = "";
    this.lockedCount = 0;
    this.suggestStateElementMap = {};
    this._inputValue = "";
    this._caretSuggestIndex = -1;
    this._focused = false;
    this._placeholder = "";
    this._label = "";
    this.minChar = this.config.minChar;
    this.suggestCount = this.config.suggestCount;
    this.suggestDelay = this.config.suggestDelay;
    this.suggestMinCount = this.config.suggestMinCount;
    this.delimiterOnKeys = this.config.delimiterOnKeys;
    this.suggestItemTemplate = this.config.suggestItemTemplate;
    this.suggestNodataStateTemplate = this.config.suggestNodataStateTemplate;
    this.suggestProgressStateTemplate = this.config.suggestProgressStateTemplate;
    this.hookRenderSuggestElement = null;
    this.hookFreeSuggestElement = null;
    this.hookSuggestItems = null;
    this.selectOnClick = this.config.selectOnClick;
    this.closeOnSelect = true;
    this.closeOnFocusOut = true;
    this.onInputEvent = (event) => {
      const type = event.type;
      if (type === "input") {
        this.debounceChangeInputValue(this.inputValue);
        this.dispatchCustomEvent("input", { value: this.inputValue, trigger: event });
      } else if (type === "keydown") {
        this.dispatchCustomEvent("keydown", { value: this.inputValue, trigger: event });
      } else if (type === "keyup") {
        this.dispatchCustomEvent("keyup", { value: this.inputValue, trigger: event });
      }
    };
    this.selectContainer = this.__dom__.refs.selectContainer;
    this.floatingLabel = this.__dom__.refs.floatingLabel;
    this.stateContainer = this.__dom__.refs.stateContainer;
    this.clearButton = this.__dom__.refs.clearable;
    this.clearSwitch = Switch.create(this.clearButton, false);
    this.inputTemplate = this.config.inputTemplate;
    this.debounceOpenSuggest = debounce(this.openSuggest, this, this.suggestDelay);
    this.debounceChangeInputValue = debounce(this.changeInputValue, this, 20);
    this.root.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.root.addEventListener("keydown", this.onKeyDown.bind(this));
    this.root.addEventListener("focusin", this.onFocusIn.bind(this));
    this.root.addEventListener("focusout", this.onFocusOut.bind(this));
    this.clearButton.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });
    this.clearButton.addEventListener("click", this.onClearButtonClick.bind(this));
    this.initialize();
    this.closeOnOutsideDown = true;
  }
  get selectorFactory() {
    return ListSelector;
  }
  get inputGroup() {
    return this._inputGroup;
  }
  get inputElement() {
    return this._inputElement;
  }
  get suggestCollection() {
    return this.suggestList.collection;
  }
  get suggestItems() {
    return this.suggestList.items || [];
  }
  get inputTemplate() {
    return this._inputTemplate;
  }
  set inputTemplate(value) {
    if (this._inputTemplate !== value) {
      this._inputTemplate = value;
      this.setInputElement(buildHTML(value));
    }
  }
  /**
   * 키 입력 시 해당 입력 값에 일치하는 데이터를 생성하는 데이터 소스를 정의합니다.
   * Array<T>, Promise<Array<T>>, 콜백 함수 (keyword: string) => Array<T>|Promise<Array<T>> 중 하나의 형태를 가질 수 있습니다.
   * 아래의 예제는 이 콜백 함수가 어떻게 작동하는지를 보여줍니다.
   * ```typescript
   *  (keyword: string) => {
   *      return fetch(`https://api.example.com/data?keyword=${encodeURIComponent(keyword)}`, {
   *          method: 'GET'
   *      });
   *  };
   * ```
   */
  get suggestSource() {
    return this._suggestSource;
  }
  set suggestSource(value) {
    if (value !== this.suggestSource) {
      this._suggestSource = value;
      this.lastSuggestItems = null;
    }
  }
  /**
   * 제안목록이 열렸는지 닫혔는를 나타냅니다.
   */
  get isOpenedSuggest() {
    return this.suggestPopup.isOpened;
  }
  get isOpenReady() {
    return this.suggestPopup.isOpenReady || !!this.loadSuggestPromise;
  }
  /**
   * 제안목록 커서의 위치(인덱스)를 반환합니다.
   * @returns {number}
   */
  get caretSuggestIndex() {
    return this._caretSuggestIndex;
  }
  /**
   * 입력 필드에 포커스를 가지고 있는지를 나타냅니다.
   * @returns {boolean}
   */
  get focused() {
    return this._focused;
  }
  /**
   * 입력 필드에 현재 입력된 값입니다.
   */
  get inputValue() {
    var _a;
    return ((_a = this._inputElement) == null ? void 0 : _a.value) || "";
  }
  set inputValue(value) {
    this.setInputValue(value);
  }
  /**
   * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
   */
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value) {
    if (this.placeholder !== value) {
      this._placeholder = value;
      this.invalidateFor(Reason.PLACEHOLDER);
    }
  }
  /**
   * 입력 필드의 레이블 텍스트입니다.
   */
  get label() {
    return this._label;
  }
  set label(value) {
    value = value ? value.trim() : "";
    if (this.label !== value) {
      this._label = value;
      this.invalidateFor(Reason.LABEL);
    }
  }
  /**
   * 표시될 아이템의 값이 결정되는 필드를 정의합니다.
   * 이 값이 문자열일 경우, 아이템 객체의 해당 키의 값(item[labelField])이 표시되고
   * 콜백일 경우 (item: T) => string 반환된 문자열이 값이 표시됩니다.
   */
  get labelField() {
    return this._labelField;
  }
  set labelField(value) {
    if (this._labelField !== value) {
      this._labelField = value;
    }
  }
  /**
   * 입력필드에 값이 있을때 초기화 버튼 활성화 여부입니다.
   */
  get clearable() {
    return this.clearSwitch.value;
  }
  set clearable(value) {
    this.clearSwitch.value = value;
  }
  /**
   * 팝업의 좌표 시스템을 설정합니다.
   * - 'global' 팝업을 전역 좌표계에 배치합니다.
   * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
   * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
   * 기본 값은 'relative' 입니다.
   */
  get coordinateMode() {
    return this.suggestPopup.coordinateMode;
  }
  set coordinateMode(value) {
    this.suggestPopup.coordinateMode = value;
  }
  get selectedItem() {
    var _a;
    return ((_a = this.selectedItems) == null ? void 0 : _a.length) > 0 ? this.selectedItems[0] : null;
  }
  set selectedItem(item) {
    this.selectSuggestItem(item);
  }
  setInputElement(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error("inputTemplate is wrong.");
    }
    if (this.inputGroup) {
      this.selectContainer.removeChild(this.inputGroup);
    }
    const group = this._inputGroup = element;
    let input = this.inputElement;
    if (input) {
      input.removeEventListener("keydown", this.onInputEvent);
      input.removeEventListener("keyup", this.onInputEvent);
      input.removeEventListener("input", this.onInputEvent);
    }
    input = this._inputElement = element.querySelector("input");
    if (!input) {
      throw new Error("inputTemplate is wrong.");
    }
    const id = `x-input-${Autocomplete.LABEL_UID++}`;
    setAttribute(input, "id", id);
    setAttribute(this.floatingLabel, "for", id);
    this.selectContainer.appendChild(group);
    input.addEventListener("keydown", this.onInputEvent);
    input.addEventListener("keyup", this.onInputEvent);
    input.addEventListener("input", this.onInputEvent);
  }
  setInputValue(value) {
    value = value ?? "";
    if (this._inputValue !== value) {
      const oldValue = this._inputValue;
      this._inputElement.value = this._inputValue = value;
      this.dispatchCustomEvent("value-change", { value, oldValue });
      this.invalidateFor(Reason.VALUE);
      return true;
    }
    return false;
  }
  doLayout() {
    const labelElement = this.floatingLabel;
    const hasLabel = this.label.length > 0;
    const labelChanged = this.hasInvalidateReason(Reason.LABEL);
    if (labelChanged) {
      labelElement.textContent = this.label;
      toggleAttribute(this.root, "label", hasLabel ? this.label : null);
    }
    const active = hasLabel && (this.focused || !!this.inputValue || !!this.selectedItem);
    toggleAttribute(labelElement, "active", active ? "" : null);
    if (this.inputElement) {
      this.inputElement.placeholder = !hasLabel || this.focused ? this.placeholder : "";
    }
    toggleAttribute(this.root, "dirty", !this.inputValue && !this.selectedItem ? "" : null);
  }
  /**
   * 입력된 값, 표시된 제안 목록, 그리고 선택된 아이템을 초기화합니다.
   */
  clear() {
    this._caretSuggestIndex = -1;
    this.closeSuggest();
    this.setInputValue("");
    this.clearSuggest();
    this.clearSelection();
  }
  clearSuggest() {
    this.suggestList.items = [];
  }
  /**
   * 입력 필드에 포커스를 설정합니다.
   */
  focus() {
    this._inputElement.focus();
  }
  /**
   * 입력 필드에 포커스를 해제합니다.
   */
  blur() {
    this._inputElement.blur();
  }
  /**
   * 아이템에 대한 'labelField' 속성의 값을 반환합니다.
   */
  itemToLabel(item) {
    if (item == null) {
      return "";
    }
    const type = typeof item;
    if (type === "object" && this.labelField != null) {
      if (this.labelField instanceof Function) {
        return this.labelField(item);
      }
      return getValue(item, this.labelField);
    }
    return "" + item;
  }
  /**
   * 제안 목록을 엽니다. 해당 파라메터 `value` 와 `suggestSource` 속성을 이용해여 제안 목록을 가져오고 표시합니다.
   * 만약 'value' 값이 명시적으로 주어지지 않은 경우, 현재 입력 필드의 값이 사용됩니다.
   * @param {string} value
   * @returns {boolean} - 제안 목록이 성공적으로 열렸는지 여부를 나타냅니다.
   */
  openSuggest(value = this.inputValue) {
    value = value || "";
    if (value.length >= this.minChar) {
      this.inputValue = value;
      if (this.lastSuggestValue === value && this.lastSuggestItems) {
        this.internalOpenSuggest(this.lastSuggestItems);
      } else if (value.length > 0 && this.loadSuggestValue === value) {
        return false;
      } else {
        const REASON = "INLINE_CANCEL";
        if (this.loadSuggestPromise) {
          this.loadSuggestPromise.cancel(REASON);
        }
        this.loadSuggestPromise = this.loadSuggest(value).then((result) => {
          this.loadSuggestValue = null;
          this.loadSuggestPromise = null;
          this.lastSuggestItems = result;
          this.lastSuggestValue = value;
          this.internalOpenSuggest(result);
        }).catch((reason) => {
          if ((reason == null ? void 0 : reason.message) !== REASON) {
            this.loadSuggestValue = null;
            this.loadSuggestPromise = null;
            this.updateSuggestState(null);
          }
        });
      }
      return true;
    }
    this.updateSuggestState(null);
    return false;
  }
  /**
   * 제안 목록를 닫습니다.
   */
  closeSuggest() {
    if (this.loadSuggestPromise) {
      this.loadSuggestPromise.cancel("SUGGEST_LOAD_CANCELED");
      this.loadSuggestPromise = null;
    }
    toggleAttribute(this.root, "progress", null);
    this.suggestPopup.close();
    this.invalidate();
  }
  /**
   * 해당 자원을 모두 해제합니다.
   */
  destroy() {
    super.destroy();
    if (this.suggestList) {
      this.suggestList.destroy();
    }
    if (this.suggestPopup) {
      this.suggestPopup.destroy();
    }
    this.clear();
  }
  /**
   * 제안 목록 팝업 초기 설정
   * @private
   */
  initialize() {
    if (this.suggestPopup) {
      return;
    }
    const container = buildHTML('<div class="x-suggest-container"></div>');
    this.suggestList = SuggestList.create(container.querySelector(".x-suggest-container") || container, {
      itemTemplate: (state) => {
        const element = buildHTML(this.suggestItemTemplate, state);
        addClass(element, "x-suggest-list-item");
        return element;
      },
      hookRenderElement: (state) => {
        const text = this.itemToLabel(state.item);
        const html = this.toHighlightHtml(text, this.lastSuggestValue.trim());
        if (this.hookRenderSuggestElement) {
          this.hookRenderSuggestElement.call(this, { ...state, text, html });
        } else {
          state.element.innerHTML = html;
        }
      },
      hookFreeElement: (state) => {
        if (this.hookFreeSuggestElement) {
          this.hookFreeSuggestElement.call(this, state);
        }
      },
      typicalItemHook: (items) => {
        let result = {};
        let resultLength = -1;
        items.forEach((item) => {
          const itemLength = this.itemToLabel(item).length;
          if (itemLength > resultLength) {
            result = item;
            resultLength = itemLength;
          }
        });
        return result;
      },
      items: []
    });
    addClass(this.suggestList.root, "x-suggest-list");
    removeAttribute(this.suggestList.root, "tabindex");
    this.suggestPopup = Popup.create({
      content: container,
      anchor: this.selectContainer,
      coordinateMode: "relative",
      anchorAlign: "left bottom",
      contentAlign: "left top",
      lockOutside: true,
      autoFocus: false,
      updateOnScroll: false,
      hitAreas: [this.root]
    });
  }
  /**
   * 제안목록 로드
   * @param value
   */
  loadSuggest(value) {
    this.loadSuggestValue = value;
    return new ProgressPromise((resolve, reject) => {
      let source = this.suggestSource;
      if (source instanceof Function) {
        source = source(value);
      }
      if (Array.isArray(source)) {
        resolve(source);
      } else if (source instanceof Promise || source instanceof ProgressPromise) {
        this.updateSuggestState("progress");
        source.then((result) => resolve(result)).catch((reason) => reject(reason));
      }
    }).then((result) => {
      if (this.hookSuggestItems) {
        return this.hookSuggestItems(result);
      }
      return result;
    });
  }
  internalOpenSuggest(items) {
    if (this.suggestList.items !== items) {
      this.highlightCache = {};
      this.suggestList.items = items;
    }
    if (this.isOpenedSuggest) {
      this.suggestPopup.invalidate();
      this.invalidate();
    } else {
      const onPrevent = (event) => {
        event.preventDefault();
        if (isBrowser.ie) {
          this.lockFocus();
          watchEventOnce(document, "mouseup", () => this.unlockFocus());
        }
        return false;
      };
      const itemEventType = this.selectOnClick ? "item-click" : "item-down";
      const watcher = new Watcher();
      this.suggestPopup.open().opening((content) => {
        if (!this.dispatchCustomEvent("suggest-opening", { items }, true)) {
          return false;
        }
        this.root.style.setProperty("--suggest-width", `${this.root.offsetWidth}px`);
        if (this.coordinateMode === "global") {
          this.suggestPopup.contentElement.style.setProperty("--suggest-width", `${this.root.offsetWidth}px`);
        }
        this.suggestList.allowMultiple = this.allowMultiple;
        this.suggestList.selectOnClick = this.selectOnClick;
        this.suggestList.flush();
        this.suggestList.rowCount = clamp(this.suggestCollection.length, this.suggestMinCount, this.suggestCount);
        this.commitCaretSuggestIndex(-1);
      }).opened((content) => {
        this.updateSuggestState(this.suggestCollection.length <= 0 ? "nodata" : "complete");
        setAttribute(this.root, "open");
        watcher.add(content, "mousedown", onPrevent);
        watcher.add(this.suggestList, itemEventType, (event) => {
          event.preventDefault();
          this.commitSuggestItem("list");
        });
        watcher.add(this.suggestList, "caret-change", (event) => {
          this._caretSuggestIndex = event.detail.value;
        });
        this.dispatchCustomEvent("suggest-open", { items });
        this.invalidate();
      }).closing((reason) => {
        if (!this.dispatchCustomEvent("suggest-closing", { items, reason }, true)) {
          return false;
        }
      }).closed((reason) => {
        this.updateSuggestState(null);
        removeAttribute(this.root, "open");
        watcher.clear();
        this.dispatchCustomEvent("suggest-close", { items, reason });
        this.invalidate();
      });
    }
  }
  /**
   * text 중에 search 포함되어 있다면 하이라이트된 html를 반환합니다.
   * @param text
   * @param search
   * @returns {html}
   */
  toHighlightHtml(text, search) {
    if (!text) {
      return "";
    }
    const key = text + "|" + search;
    let html = this.highlightCache[key];
    if (html === void 0) {
      html = this.highlightCache[key] = highlight(text, search, this.config.suggestHighlightTemplate);
    }
    return html;
  }
  /**
   * @protected
   */
  changeInputValue(value) {
    if (this.setInputValue(value)) {
      this.onInputChanged();
      this.closeSuggest();
      this.updateSuggestState(null);
      this.debounceOpenSuggest.cancel();
      this.debounceOpenSuggest(value);
      return true;
    }
    return false;
  }
  hasDelimiterKey(keyCode) {
    return this.delimiterOnKeys.indexOf(keyCode) >= 0;
  }
  selectSuggestItem(item, trigger = null) {
    this.setSelectedItem(item);
    this.setInputValue(this.itemToLabel(item));
    if (this.closeOnSelect) {
      this.closeSuggest();
    }
  }
  commitSuggestItem(trigger) {
    if (this.isOpenedSuggest) {
      let index = this._caretSuggestIndex;
      if (this.suggestCollection.length === 1) {
        index = 0;
      }
      if (index >= 0) {
        const item = this.suggestCollection.get(index);
        this.dispatchCustomEvent("suggest-select", { items: this.suggestItems, item });
        this.selectSuggestItem(item, trigger);
        return true;
      }
    }
    return false;
  }
  commitCaretSuggestIndex(index) {
    if (this._caretSuggestIndex !== index) {
      const oldIndex = this._caretSuggestIndex;
      this._caretSuggestIndex = index;
      this.suggestList.caretIndex = index;
      this.suggestList.scrollToIndex(index);
      this.suggestList.flush();
      this.dispatchCustomEvent("suggest-caret-change", {
        value: index,
        oldValue: oldIndex
      });
    }
  }
  adjustNavigation(event) {
    switch (event.keyCode) {
      case 38:
        this.moveUp(event);
        break;
      case 40:
        this.moveDown(event);
        break;
    }
  }
  moveUp(event) {
    if (this.suggestItems.length > 0 && this.isOpenedSuggest) {
      if (this._caretSuggestIndex >= 0) {
        this.commitCaretSuggestIndex(this._caretSuggestIndex - 1);
      }
      if (this._caretSuggestIndex < 0) {
        this.closeSuggest();
      }
      event.preventDefault();
    }
  }
  moveDown(event) {
    if (!this.isOpenedSuggest) {
      this.openSuggest();
    } else if (this.suggestItems.length > 0) {
      const index = Math.min(this.suggestItems.length - 1, Math.max(this._caretSuggestIndex + 1, 0));
      this.commitCaretSuggestIndex(index);
      event.preventDefault();
    }
  }
  /**
   * 제안 목록 상태 갱신
   * @param state
   * @private
   */
  updateSuggestState(state) {
    if (this.suggestState !== state) {
      if (this.suggestState) {
        removeAttribute(this.root, this.suggestState);
        const element = this.suggestStateElementMap[this.suggestState];
        if (element) {
          this.stateContainer.removeChild(element);
          this.suggestStateElementMap[this.suggestState] = null;
        }
      }
      if (state && state !== "complete") {
        setAttribute(this.root, state);
        let element = this.suggestStateElementMap[state];
        if (!element) {
          const template = state === "progress" ? this.suggestProgressStateTemplate : this.suggestNodataStateTemplate;
          if (template) {
            element = template instanceof HTMLElement ? template : buildHTML(template);
            this.suggestStateElementMap[state] = element;
          }
        }
        if (element && element.parentElement !== this.stateContainer) {
          this.stateContainer.appendChild(element);
        }
      }
      this.suggestState = state;
    }
  }
  lockFocus() {
    if (this.focused) {
      this.lockedCount++;
    }
  }
  unlockFocus() {
    if (this.lockedCount > 0) {
      this.lockedCount--;
      if (this.lockedCount <= 0) {
        this.lockedCount = 0;
        this.focus();
      }
    }
  }
  onInputChanged() {
    this.clearSelection();
  }
  onMouseDown(event) {
    var _a;
    if (event.defaultPrevented) {
      return;
    }
    if (!this.isOpenedSuggest) {
      this.openSuggest();
    }
    if (!this.focused || ((_a = this._inputElement) == null ? void 0 : _a.offsetParent) && event.target !== this._inputElement) {
      event.preventDefault();
      this.focus();
    }
  }
  onKeyDown(event) {
    if (this.hasDelimiterKey(event.keyCode)) {
      if (this.commitSuggestItem("input")) {
        event.preventDefault();
        event.stopPropagation();
        this.flush();
      }
    } else {
      this.adjustNavigation(event);
    }
  }
  /**
   * input focus event
   * @param event
   */
  onFocusIn(event) {
    if (this.focused) {
      return;
    }
    this._focused = true;
    setAttribute(this.root, "focus");
    if (!this.isOpenedSuggest && !this.isOpenReady) {
      delayTime(1).then(() => {
        if (this.focused) {
          this.openSuggest();
        }
      });
    }
    this.dispatchCustomEvent("focusin", { trigger: event });
    this.invalidateFor(Reason.FOCUS_IN);
  }
  /**
   * input blur event
   * @param event
   */
  onFocusOut(event) {
    if (this.lockedCount > 0) {
      return;
    }
    this._focused = false;
    this.debounceOpenSuggest.cancel();
    removeAttribute(this.root, "focus");
    if (this.closeOnFocusOut) {
      this.closeSuggest();
    }
    this.dispatchCustomEvent("focusout", { trigger: event });
    this.invalidateFor(Reason.FOCUS_OUT);
  }
  onClearButtonClick(event) {
    this.clear();
  }
}
Autocomplete.LABEL_UID = 0;
Autocomplete.template(`<div class="x-auto-complete">
        <label id="floatingLabel" class="x-floating-label"></label>
        <div id="selectContainer" class="x-select-container">
        </div>
        <div id="clearable" class="x-clear">
            <button></button>
        </div>
        <div id="stateContainer" class="x-state-container">
        </div>
    </div>`);
Autocomplete.config = {
  minChar: 0,
  suggestCount: 6,
  suggestDelay: 300,
  suggestMinCount: 0,
  delimiterOnKeys: [9, 13],
  selectOnClick: true,
  inputTemplate: `<div class="x-input-control"><input class="x-input" autocomplete="off"></div>`,
  suggestItemTemplate: "<div></div>",
  suggestHighlightTemplate: `<em class="x-highlight">$1</em>`,
  suggestNodataStateTemplate: `<div class="x-nodata"><span>No data.</span></div>`,
  suggestProgressStateTemplate: `<div class="x-progress"><span>loading...</span></div>`
};
class Renderer extends EventTarget {
  constructor(host, root, data) {
    super();
    this.host = host;
    this.root = root;
    this.data = data;
  }
  mount(container, options) {
    return this;
  }
  unmount() {
    return this;
  }
  setOptions(options) {
    return this;
  }
}
class RendererFactory {
  constructor(host, factory2) {
    this.host = host;
    this.factory = factory2;
  }
  create(item, ...args) {
    const element = buildHTML(this.template, item);
    const renderer = new this.factory(this.host, element, item);
    element.__instance__ = renderer;
    renderer.created();
    return renderer;
  }
}
class Chip extends Renderer {
  constructor(host, root, data) {
    super(host, root, data);
    this._removable = true;
    this.watcher = new Watcher();
  }
  get selected() {
    return this._selected;
  }
  set selected(value) {
    if (this._selected !== value) {
      this._selected = value;
      toggleAttribute(this.root, "focus", value);
    }
  }
  get removable() {
    return this._removable;
  }
  set removable(value) {
    var _a, _b;
    if (this._removable !== value) {
      this._removable = value;
      if (!value) {
        if ((_a = this.removeElement) == null ? void 0 : _a.parentElement) {
          this.root.removeChild(this.removeElement);
        }
      } else {
        if (!((_b = this.removeElement) == null ? void 0 : _b.parentElement)) {
          this.root.appendChild(this.removeElement);
        }
      }
    }
  }
  created() {
    const labelElement = this.labelElement = this.root.querySelector(".x-label");
    const text = this.text = this.host.itemToLabel(this.data);
    if (labelElement) {
      labelElement.innerHTML = text;
    }
    const removeElement = this.removeElement = this.root.querySelector(".x-remover");
    if (removeElement) {
      this.watcher.add(removeElement, "mousedown", (event) => {
        event.preventDefault();
      });
      this.watcher.add(removeElement, "click", () => {
        this.dispatchEvent(new CustomEvent("remove", {
          detail: {
            item: this.data
          }
        }));
      });
    }
  }
  destroy() {
    var _a;
    (_a = this.root.parentElement) == null ? void 0 : _a.removeChild(this.root);
    this.watcher.clear();
  }
}
class Tokenizer extends Autocomplete {
  constructor() {
    super();
    this.doLayouting = false;
    this._caretSelectedIndex = -1;
    this.allowInputValue = false;
    this.keyField = null;
    this.chipRemovable = true;
    this.chipTemplate = this.config.chipTemplate;
    this.onChipRemove = (event) => {
      this.removeSelectedItem(event.detail.item);
    };
    this.inputSizer = this.__dom__.refs.inputSizer;
    this.chipFactory = new RendererFactory(this, Chip);
    this.chipMap = /* @__PURE__ */ new Map();
    this.allowMultiple = true;
  }
  get selectedItem() {
    var _a;
    return ((_a = this.selectedItems) == null ? void 0 : _a.length) > 0 ? this.selectedItems[0] : null;
  }
  set selectedItem(item) {
    this.selectedItems = item != null ? [item] : [];
  }
  doLayout() {
    super.doLayout();
    this.startLayout();
    const valueChanged = this.hasInvalidateReason(Reason.VALUE);
    const selectChanged = this.hasInvalidateReason(Reason.SELECT);
    const caretChanged = this.hasInvalidateReason(Reason.CARET);
    if (selectChanged) {
      this.createChips();
    }
    if (selectChanged || valueChanged) {
      this.measureInputElement();
    }
    if (caretChanged) {
      this.setActiveSelectedElements();
    }
    this.endLayout();
  }
  internalOpenSuggest(items) {
    super.internalOpenSuggest(items);
    this.updateSuggestSelectedItems();
  }
  /**
   * 제안목록에 선택된 아이템 갱신
   * @private
   */
  updateSuggestSelectedItems() {
    const items = this.suggestList.items || [];
    const founds = [];
    this.selectedItems.forEach((item) => {
      const key = this.itemToKey(item);
      const found = items.find((o) => key === this.itemToKey(o));
      if (found) {
        founds.push(found);
      }
    });
    this.suggestList.selectedItems = founds;
  }
  changeInputValue(value) {
    if (super.changeInputValue(value)) {
      this.commitCaretIndex(-1);
      return true;
    }
    return false;
  }
  selectSuggestItem(item, trigger = null) {
    this.setInputValue("");
    if (this.closeOnSelect) {
      this.closeSuggest();
    }
    const key = this.itemToKey(item);
    const found = this.selectedItems.find((item2) => key == this.itemToKey(item2));
    if (found) {
      if (this.allowMultiple && trigger === "list") {
        this.removeSelectedItem(found);
      } else {
        this.dispatchCustomEvent("suggest-duplicate", { items: this.suggestItems, item });
      }
    } else {
      this.addSelectedItem(item);
    }
  }
  commitSuggestItem(trigger) {
    if (!super.commitSuggestItem(trigger)) {
      if (trigger === "input" && this.caretSuggestIndex < 0 && this.allowInputValue) {
        this.debounceOpenSuggest.cancel();
        this.debounceChangeInputValue.cancel();
        const value = this.inputValue.trim();
        if (value.length > 0) {
          this.selectSuggestItem(this.generateSelectedItem(value), trigger);
          return true;
        }
      }
    }
    return false;
  }
  /**
   * 지정된 아이템의 'keyField' 속성의 값 반환.
   *  @returns {String}
   */
  itemToKey(item) {
    if (item == null) {
      return "";
    }
    const keyField = !this.keyField ? this.labelField : this.keyField;
    const type = typeof item;
    if (type === "object") {
      if (keyField instanceof Function) {
        return keyField(item);
      }
      return getValue(item, keyField);
    }
    return "" + item;
  }
  doSelectionUpdate(data) {
    super.doSelectionUpdate(data);
    this.commitCaretIndex(-1);
    this.updateSuggestSelectedItems();
    this.invalidateFor(Reason.SELECT);
    const isAddAndRemove = data.kind === "add" || data.kind === "remove";
    this.dispatchCustomEvent(`suggest-${data.kind}`, isAddAndRemove ? { items: this.suggestItems, item: data.source[0] } : { items: data.source });
  }
  generateSelectedItem(value) {
    return typeof this.labelField === "string" ? { [this.labelField]: value } : value;
  }
  startLayout() {
    this.doLayouting = true;
    if (this.updateChipFactory()) {
      if (this.typicalChip) {
        this.freeChip(this.typicalChip);
      }
      const chip = this.chipFactory.create(this.generateSelectedItem(""));
      chip.root.style.cssText = HIDDEN_CSS;
      addClass(chip.root, "typical");
      this.typicalChip = chip;
    }
    if (this.typicalChip.root !== this.selectContainer.parentElement) {
      this.selectContainer.appendChild(this.typicalChip.root);
    }
  }
  endLayout() {
    if (this.doLayouting) {
      this.doLayouting = false;
      this.selectContainer.removeChild(this.typicalChip.root);
    }
  }
  /*
  private measure(): void {
      const typicalRect = this.typicalChip.root.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(this.typicalChip.root);
      this.selectContainer.style.minHeight = typicalRect.height + parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom) + 'px';
  }
  */
  measureInputElement() {
    this.inputSizer.innerHTML = this.inputValue;
    const containerRect = this.selectContainer.getBoundingClientRect();
    const sizerRect = this.inputSizer.getBoundingClientRect();
    const typicalRect = this.typicalChip.root.getBoundingClientRect();
    this.inputGroup.style.minWidth = Math.floor(Math.min(containerRect.width, sizerRect.width + typicalRect.width)) + "px";
  }
  updateChipFactory() {
    if (this.chipFactory.template !== this.chipTemplate) {
      this.chipFactory.template = this.chipTemplate;
      return true;
    }
    return false;
  }
  createChips() {
    const oldMap = this.chipMap;
    const newMap = /* @__PURE__ */ new Map();
    this.selectedItems.forEach((item, index) => {
      let chip = oldMap.get(item);
      if (chip) {
        oldMap.delete(item);
      } else {
        chip = this.createChip(item, index);
      }
      chip.removable = this.chipRemovable;
      newMap.set(item, chip);
    });
    oldMap.forEach((chip) => this.freeChip(chip));
    this.chipMap = newMap;
  }
  createChip(item, index) {
    let chip = this.chipMap.get(item);
    if (!chip) {
      chip = this.chipFactory.create(item, index);
      chip.addEventListener("remove", this.onChipRemove);
      this.selectContainer.insertBefore(chip.root, this.inputGroup);
    } else {
      this.chipMap.delete(item);
    }
    if (!chip) {
      throw new Error(`Tokenizer.chipTemplate is wrong. [item=${item}]`);
    }
    return chip;
  }
  freeChip(chip) {
    chip.removeEventListener("remove", this.onChipRemove);
    chip.destroy();
  }
  setActiveSelectedElements() {
    this.selectedItems.forEach((item, index) => {
      const chip = this.chipMap.get(item);
      if (chip) {
        chip.selected = index === this._caretSelectedIndex;
      }
    });
  }
  commitCaretIndex(index) {
    if (this._caretSelectedIndex !== index) {
      const oldIndex = this._caretSelectedIndex;
      this._caretSelectedIndex = index;
      this.invalidateFor(Reason.CARET);
      this.dispatchCustomEvent("caret-change", {
        value: index,
        oldValue: oldIndex
      });
    }
  }
  moveLeft(event) {
    const num = this.selectedItems.length;
    const caretIndex = this._caretSelectedIndex;
    if (num > 0 && (this.inputElement.selectionStart === 0 || caretIndex >= 0)) {
      let index;
      if (caretIndex === 0) {
        index = -1;
      } else if (caretIndex > 0) {
        index = caretIndex - 1;
      } else {
        index = num - 1;
      }
      this.commitCaretIndex(index);
      event.preventDefault();
      return true;
    }
    return false;
  }
  moveRight(event) {
    const num = this.selectedItems.length;
    const caretIndex = this._caretSelectedIndex;
    if (num > 0 && this.inputElement.selectionStart === this.inputValue.length || caretIndex >= 0) {
      let index;
      if (caretIndex === num - 1) {
        index = -1;
      } else if (caretIndex < num - 1) {
        index = caretIndex + 1;
      } else {
        index = 0;
      }
      this.commitCaretIndex(index);
      event.preventDefault();
      return true;
    }
    return false;
  }
  backspace(event) {
    const index = this._caretSelectedIndex;
    if (index >= 0) {
      this.removeSelectedItem(this.selectedItems[index]);
      event.preventDefault();
      return true;
    } else if (this.selectedItems.length > 0 && this.inputElement.selectionStart === 0 && this.inputElement.selectionEnd === 0) {
      this.moveLeft(event);
      return true;
    }
    return false;
  }
  delete(event) {
    const index = this._caretSelectedIndex;
    if (index >= 0) {
      this.removeSelectedItem(this.selectedItems[index]);
      event.preventDefault();
      return true;
    }
    return false;
  }
  /**
   *
   * @param event
   * @override
   */
  adjustNavigation(event) {
    switch (event.keyCode) {
      case 8:
        if (this.backspace(event)) {
          return;
        }
        break;
      case 46:
        if (this.delete(event)) {
          return;
        }
        break;
      case 37:
        this.moveLeft(event);
        return;
      case 39:
        this.moveRight(event);
        return;
      case 35:
        return;
    }
    super.adjustNavigation(event);
  }
  onInputChanged() {
  }
}
Tokenizer.template(`<div class="x-tokenizer">
        <label id="floatingLabel" class="x-floating-label"></label>
        <div id="selectContainer" class="x-select-container">
        </div>
        <div id="clearable" class="x-clear">
            <button></button>
        </div>
        <div id="stateContainer" class="x-state-container">
        </div>
        <div id="inputSizer" style="${HIDDEN_CSS}"></div>
    </div>`);
Tokenizer.config = {
  chipTemplate: `<div class="x-select-chip"><span class="x-label"></span><button class="x-remover" tabindex="-1"></button></div>`
};
class Combobox extends Tokenizer {
  constructor() {
    super();
    this.filterFn = null;
    this.singleChipTemplate = this.config.singleChipTemplate;
    this.filterable = false;
    this.allowMultiple = false;
    this.chipRemovable = false;
    this.dropdownTrigger = this.__dom__.refs.dropdownTrigger;
    this.dropdownTrigger.addEventListener("mousedown", this.onDropdownMouseDown.bind(this));
    this.addEventListener("value-change", this.onValueChange.bind(this));
    this.addEventListener("max-selection-change", this.onMaxSelectionChange.bind(this));
  }
  /**
   * 표시되는 아이템의 배열입니다.
   * 'labelField' 속성을 이용하여 표시되는 텍스트를 결정합니다.
   */
  get items() {
    return this.suggestSource;
  }
  set items(items) {
    if (items && !Array.isArray(items)) {
      console.warn("`items` must be an array.");
      return;
    }
    this.suggestSource = this.suggestList.items = items;
    (this.selector.source = this.suggestList.collection.clone()).reset();
  }
  /**
   * 사용자가 입력한 문자열에 따라 콤보박스에서 표시되는 항목을 필터링할 수 있는지 여부입니다.
   */
  get filterable() {
    return this._filterable;
  }
  set filterable(value) {
    if (this._filterable !== value) {
      this._filterable = value;
      this.invalidateFor(Reason.ATTRIBUTES);
    }
  }
  get selectedItems() {
    return this.selector.items;
  }
  set selectedItems(items) {
    var _a;
    items = items || [];
    const source = ((_a = this.items) == null ? void 0 : _a.slice(0)) || [];
    if (items.length > 0 && source.length > 0 && !items.every((item) => source.indexOf(item) >= 0)) {
      console.warn("Element of `items` must be in `Combobox.items`.", items);
      return;
    }
    this.setSelectedItems(items);
  }
  doLayout() {
    if (!this.inputElement) {
      return;
    }
    super.doLayout();
    const attributesChanged = this.hasInvalidateReason(Reason.ATTRIBUTES);
    const maxChanged = this.hasInvalidateReason(Reason.MAX);
    if (attributesChanged) {
      toggleAttribute(this.inputElement, "readonly", !this.filterable);
    }
    if (maxChanged) {
      toggleAttribute(this.root, "multiple", this.allowMultiple);
    }
    if (this.placeholder.length > 0 && !this.allowMultiple && !!this.selectedItem) {
      this.inputElement.placeholder = "";
    }
  }
  updateChipFactory() {
    const template = this.allowMultiple ? this.chipTemplate : this.singleChipTemplate;
    if (this.chipFactory.template !== template) {
      this.chipFactory.template = template;
      return true;
    }
    return false;
  }
  internalOpenSuggest(items) {
    super.internalOpenSuggest(items);
    const collection = this.suggestList.collection;
    if (collection.filter !== this.filterFn) {
      collection.filter = this.filterFn;
    }
  }
  itemToKey(item) {
    return item;
  }
  onDropdownMouseDown(event) {
    if (this.isOpenedSuggest) {
      this.closeSuggest();
    }
  }
  onValueChange(event) {
    if (this.filterable && this.inputValue.length > 0) {
      const regexp = new RegExp(this.inputValue, "gi");
      this.filterFn = (item) => regexp.test(this.itemToLabel(item));
    } else {
      this.filterFn = null;
    }
  }
  onMaxSelectionChange(event) {
    this.invalidateFor(Reason.MAX);
  }
}
Combobox.template(`<div class="x-combobox">
        <label id="floatingLabel" class="x-floating-label"></label>
        <div class="x-controls">
            <div id="selectContainer" class="x-select-container"></div>
            <div id="clearable" class="x-clear">
                <button></button>
            </div>
            <div id="dropdownTrigger" class="x-dropdown-trigger">
                <button tabindex="-1"></button>
            </div>
        </div>
        <div id="stateContainer" class="x-state-container">
        </div>
        <div id="inputSizer" style="${HIDDEN_CSS}"></div>
    </div>`);
Combobox.config = {
  chipTemplate: `<div class="x-select-chip"><span class="x-label"></span><button class="x-remover" tabindex="-1"></button></div>`,
  singleChipTemplate: `<div class="x-select-text"><span class="x-label"></div>`
};
function cloneDate(date) {
  return new Date(date.getTime());
}
function equalsDate(a, b) {
  return (a == null ? void 0 : a.getTime()) === (b == null ? void 0 : b.getTime());
}
function toYYYY(date) {
  return date.getFullYear();
}
function toYYYYMM(date) {
  return date.getFullYear() * 100 + (date.getMonth() + 1);
}
function toYYYYMMDD(date) {
  return toYYYYMM(date) * 100 + date.getDate();
}
const DateDimensions = {
  YEAR: {
    x: 4,
    y: 4
  },
  MONTH: {
    x: 4,
    y: 4
  },
  DAY: {
    x: 7,
    y: 6
  }
};
class DateProvider {
  constructor(dimension) {
    this.dimension = dimension;
  }
  get xCount() {
    return this.dimension.x;
  }
  get yCount() {
    return this.dimension.y;
  }
  get allCount() {
    return this.dimension.x * this.dimension.y;
  }
  createItems(date) {
    return [];
  }
  createItem(date) {
    date = cloneDate(date);
    return {
      source: date,
      value: this.toValue(date),
      fullValue: this.toFullValue(date),
      groupKey: this.createGroupKey(date)
    };
  }
  equal(a, b) {
    if (!a || !b) {
      return false;
    }
    return this.toFullValue(a) === this.toFullValue(b);
  }
}
class YearProvider extends DateProvider {
  constructor() {
    super(DateDimensions.YEAR);
  }
  createGroupKey(date) {
    return date.getFullYear() - ((date.getFullYear() - YearProvider.BASED_YEAR) % this.allCount + this.allCount) % this.allCount % this.xCount;
  }
  createItems(date) {
    const startYear = date.getFullYear() - ((date.getFullYear() - YearProvider.BASED_YEAR) % this.allCount + this.allCount) % this.allCount;
    const start = new Date(startYear, 0, 1);
    const items = [];
    for (let i = 0; i < this.allCount; i++) {
      items.push(this.createItem(start));
      start.setFullYear(start.getFullYear() + 1);
    }
    return items;
  }
  getPreviousItems(date) {
    const items = [];
    for (let i = 0, start = cloneDate(date); i < this.allCount; i++) {
      start.setFullYear(start.getFullYear() - 1);
      items.unshift(this.createItem(start));
    }
    return items;
  }
  getNextItems(date) {
    const items = [];
    for (let i = 0, start = cloneDate(date); i < this.allCount; i++) {
      start.setFullYear(start.getFullYear() + 1);
      items.push(this.createItem(start));
    }
    return items;
  }
  toValue(date) {
    return date.getFullYear();
  }
  toFullValue(date) {
    return toYYYY(date);
  }
}
YearProvider.BASED_YEAR = 2001;
class MonthProvider extends DateProvider {
  constructor() {
    super(DateDimensions.MONTH);
  }
  createGroupKey(date) {
    return date.getFullYear() * 100 + Math.floor(date.getMonth() / this.xCount);
  }
  createItems(date) {
    const items = [];
    const start = new Date(date.getFullYear(), 0, 1);
    for (let i = 0; i < this.allCount; i++) {
      items.push(this.createItem(cloneDate(start)));
      start.setMonth(start.getMonth() + 1);
    }
    return items;
  }
  getPreviousItems(date) {
    const items = [];
    for (let i = 0, start = cloneDate(date); i < this.allCount; i++) {
      start.setMonth(start.getMonth() - 1);
      items.unshift(this.createItem(start));
    }
    return items;
  }
  getNextItems(date) {
    const items = [];
    for (let i = 0, start = cloneDate(date); i < this.allCount; i++) {
      start.setMonth(start.getMonth() + 1);
      items.push(this.createItem(start));
    }
    return items;
  }
  toValue(date) {
    return date.getMonth();
  }
  toFullValue(date) {
    return toYYYYMM(date);
  }
}
class DayProvider extends DateProvider {
  constructor() {
    super(DateDimensions.DAY);
  }
  createGroupKey(date) {
    return Math.floor(date.getTime() / DayProvider.MILLISECONDS_PER_DAY) - date.getDay();
  }
  createItems(date) {
    const items = [];
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    start.setDate(-start.getDay() + 1);
    for (let i = 0; i < this.allCount; i++) {
      items.push(this.createItem(start));
      start.setDate(start.getDate() + 1);
    }
    return items;
  }
  getPreviousItems(date) {
    const items = [];
    for (let i = 0, start = cloneDate(date); i < this.allCount; i++) {
      start.setDate(start.getDate() - 1);
      items.unshift(this.createItem(start));
    }
    return items;
  }
  getNextItems(date) {
    const items = [];
    for (let i = 0, start = cloneDate(date); i < this.allCount; i++) {
      start.setDate(start.getDate() + 1);
      items.push(this.createItem(start));
    }
    return items;
  }
  toValue(date) {
    return date.getDate();
  }
  toFullValue(date) {
    return toYYYYMMDD(date);
  }
}
DayProvider.MILLISECONDS_PER_DAY = 1e3 * 60 * 60 * 24;
class DateTableLayout extends Layout {
  constructor(instance) {
    super(instance);
    this.columnCount = 7;
  }
  setDefaultSize(size) {
    this.linearVector.defaultSize = clamp(size.height, 20);
  }
  doUpdate(scrollX, scrollY, width, height) {
    const numColumns = this.columnCount;
    const instance = this.instance;
    const rowCount = instance.rowCount;
    const isAll = height <= 0 && instance.rowCount <= 0;
    const startRowIndex = isAll ? 0 : this.indexOf(scrollY);
    const endRowIndex = Math.ceil(instance.collection.length / numColumns);
    const startY = isAll ? 0 : this.getStart(startRowIndex);
    const endIndex = instance.collection.length - 1;
    let rowIndex = startRowIndex;
    let yy = startY;
    let index = startRowIndex * numColumns;
    while (index <= endIndex && rowIndex <= endRowIndex && (isAll || yy < scrollY + height)) {
      let maxHeight = 0;
      for (let i = 0; i < numColumns && index <= endIndex; i++) {
        const element = instance.createElement(index);
        const size = this.measureElement(element);
        maxHeight = Math.max(size.height, maxHeight);
        index++;
      }
      this.setSize(rowIndex, maxHeight || void 0);
      yy += maxHeight;
      rowIndex++;
      if (rowCount > 0) {
        height = this.getTotal(0, rowCount - 1);
      }
    }
  }
  updateElementAt(index) {
    const element = this.instance.getElementAt(index);
    if (element) {
      const size = this.measureElement(element);
      this.setSize(index, size.height || void 0);
      this.updateContentSize();
    }
  }
  updateContentSize() {
    const instance = this.instance;
    const firstIndex = Math.floor(instance.firstVisibleIndex / this.columnCount);
    instance.contentLayer.style.height = this.getTotal(firstIndex) + "px";
    instance.contentLayer.style.top = this.getStart(firstIndex) + "px";
    if (instance.rowCount > 0) {
      instance.root.style.height = this.getTotal(0, instance.rowCount - 1) + "px";
    }
  }
  positionToIndex(point) {
    return this.indexOf(point.y) * this.columnCount + Math.floor(point.x / (this.instance.root.offsetWidth / this.columnCount));
  }
  calculateScrollPositionDelta(index, offset) {
    index = Math.floor(index / this.columnCount);
    return VerticalLayout.prototype.calculateScrollPositionDelta.call(this, index, offset);
  }
  collectionReset() {
    var _a;
    this.clear();
    this.linearVector.length = Math.ceil(((_a = this.instance.collection) == null ? void 0 : _a.length) / this.columnCount || 0);
  }
  collectionSet(index, length) {
    index = Math.floor(index / this.columnCount);
    this.linearVector.setSize(index, this.linearVector.defaultSize);
  }
  collectionAdd(index, length) {
    index = Math.floor(index / this.columnCount);
    length = Math.floor(length / this.columnCount);
    for (let i = 0, size = this.linearVector.defaultSize; i < length; i++) {
      this.linearVector.addSize(index, size);
    }
  }
  collectionRemove(index, length) {
    index = Math.floor(index / this.columnCount);
    length = Math.floor(length / this.columnCount);
    for (let i = 0; i < length; i++) {
      this.linearVector.removeSize(index);
    }
  }
}
class DateTableSelector extends Selector {
  indexOf(item) {
    const value = item.fullValue;
    return this.items.findIndex((item2) => item2.fullValue === value);
  }
  clear() {
  }
}
class DateTable extends List {
  constructor() {
    super();
    this._today = /* @__PURE__ */ new Date();
    this._currentDate = /* @__PURE__ */ new Date();
    this.debounceUpdateCurrent = debounce(this.updateCurrent, this, 50);
    this.layout = new DateTableLayout(this);
    this.type = "day";
    this.itemTemplate = this.config.itemTemplate;
    this.hookRenderElement = this.config.hookRenderElement;
    this.scrollTarget = this.scrollLayer;
    this.addEventListener("scroll", this.onScroll.bind(this));
    this.addEventListener("selection-changing", this.onSelectionChanging.bind(this));
  }
  get selectorFactory() {
    return DateTableSelector;
  }
  get scrollLayer() {
    return this.__dom__.refs.scrollLayer;
  }
  get dateProvider() {
    return this._dateProvider;
  }
  set dateProvider(value) {
    if (this._dateProvider !== value) {
      this._dateProvider = value;
      this.initDateProvider();
    }
  }
  get type() {
    return this._type;
  }
  set type(value) {
    if (this._type !== value) {
      this._type = value;
      setAttribute(this.root, "type", value);
      if (value === "year") {
        this.dateProvider = new YearProvider();
      } else if (value === "month") {
        this.dateProvider = new MonthProvider();
      } else {
        this.dateProvider = new DayProvider();
      }
    }
  }
  get today() {
    return this._today;
  }
  set today(value) {
    if (!equalsDate(this.today, value)) {
      this._today = value;
      this.invalidate();
    }
  }
  get currentDate() {
    return this._currentDate;
  }
  set currentDate(value) {
    if (this.setCurrentDate(value)) {
      this.initDateProvider();
    }
  }
  get selectedRange() {
    return this._selectedRange || [];
  }
  set selectedRange(range) {
    this.setSelectedItems((range || []).map((date) => this.dateProvider.createItem(date)));
  }
  setSelectedRange(range) {
    if (this._selectedRange !== range) {
      range = (range || []).sort((a, b) => +a - +b >= 0 ? 1 : -1);
      this._selectedRange = range;
      return true;
    }
    return false;
  }
  getPreviousScrollIndex() {
    return -1;
  }
  getNextScrollIndex() {
    return -1;
  }
  /**
   * 이전 날짜로 스크롤 이동
   */
  previousScroll() {
    let found = this.getPreviousScrollIndex();
    if (found < 0) {
      this.addPreviousItems();
      found = this.getPreviousScrollIndex();
    }
    const delta = this.layout.getStart(Math.floor(found / this.dateProvider.xCount)) - this.scrollTop;
    if (Math.abs(delta) >= this.scrollTop) {
      this.addPreviousItems();
    }
    this.scrollTop += delta;
  }
  /**
   * 다음 날짜로 스크롤 이동
   */
  nextScroll() {
    const index = this.getNextScrollIndex();
    const delta = this.layout.getStart(Math.floor(index / this.dateProvider.xCount)) - this.scrollTop;
    if (delta >= this.maxScrollTop - this.scrollTop) {
      this.addNextItems();
    }
    this.scrollTop += delta;
  }
  setCurrentDate(date) {
    if (!equalsDate(this._currentDate, date)) {
      this._currentDate = date;
      this.dispatchEvent(new CustomEvent("current-change", {
        detail: date
      }));
      this.invalidate();
      return true;
    }
    return false;
  }
  doLayout() {
    if (this.hasInvalidateReason(Reason.RESET, Reason.RESIZE)) {
      this.rootGroup.items.forEach((item) => {
        if (item instanceof Group) {
          this.updateGroupHeight(item);
        }
      });
    }
    super.doLayout();
  }
  updateTypicalSize() {
    return {
      width: 0,
      height: this.calculateRowHeight()
    };
  }
  createGroup(parent, key) {
    const group = super.createGroup(parent, key);
    if (group) {
      this.updateGroupHeight(group);
    }
    return group;
  }
  getGroupKey(item) {
    return item.groupKey;
  }
  containsRange(date) {
    var _a;
    if (((_a = this.selectedRange) == null ? void 0 : _a.length) > 0) {
      const yyyymm = this.dateProvider.toFullValue(date);
      const from = this.selectedRange[0];
      const to = this.selectedRange[1] || from;
      return yyyymm >= this.dateProvider.toFullValue(from) && yyyymm <= this.dateProvider.toFullValue(to);
    }
    return false;
  }
  validateAllowDate(date) {
    return !(this.allowDates instanceof Function && !this.allowDates(date));
  }
  getItemState(index) {
    const item = this.collection.get(index);
    const date = item.source;
    const disabled = !this.validateAllowDate(date);
    const selected = this.containsRange(date);
    const isToday = this.dateProvider.equal(this.today, date);
    const isFirst = this.dateProvider.equal(this.selectedRange[0], date);
    const isLast = this.dateProvider.equal(this.selectedRange[1], date);
    return { item, index, selected, isToday, isFirst, isLast, disabled, extra: this.isExtraDate(date) };
  }
  updateElementState(element, state) {
    toggleAttribute(element, "today", state.isToday ? "" : null);
    toggleAttribute(element, "select", state.selected ? "" : null);
    if (this.allowMultiple) {
      toggleAttribute(element, "range-first", state.isFirst ? "" : null);
      toggleAttribute(element, "range-last", state.isLast ? "" : null);
    }
    toggleAttribute(element, "extra", state.extra ? "" : null);
    toggleAttribute(element, "disabled", state.disabled ? "" : null);
  }
  commitSelection(index, multiple) {
    const range = this.selectedRange;
    const item = this.collection.get(index);
    const isHad = this.hasSelectedItem(item);
    if (!isHad && range.length > 0 && this.allowMultiple) {
      const date = item.source;
      let from = range[0];
      let to = range[1] ?? from;
      if (date < from) {
        from = date;
      } else {
        to = date;
      }
      this.selectedRange = [from, to];
    } else {
      super.commitSelection(index, multiple);
    }
  }
  isExtraDate(date) {
    return false;
  }
  updateCurrent() {
  }
  doSelectionUpdate(data) {
    super.doSelectionUpdate(data);
    if (data.kind !== "reset") {
      this.setSelectedRange(data.items.map((item) => item.source));
    }
  }
  initDateProvider() {
    this.removeElementAll();
    this.elementList.clear();
    this.layout.clear();
    this.layout.columnCount = this.dateProvider.xCount;
    this.items = this.dateProvider.createItems(this.currentDate);
    if (this.initCancel) {
      this.initCancel();
    }
    this.initCancel = Watcher.add(this, "render-update", () => {
      if (this.root.offsetParent) {
        this.initCancel();
        this.addPreviousItems();
        this.addNextItems();
        this.updateCurrent();
        this.initCancel = null;
      }
    });
  }
  calculateRowHeight() {
    return this.scrollLayer.offsetHeight / this.dateProvider.yCount;
  }
  updateGroupHeight(group) {
    group.container.style.height = `${this.calculateRowHeight()}px`;
  }
  addPreviousItems() {
    const collection = this.collection;
    const items = this.dateProvider.getPreviousItems(collection.get(0).source);
    const deleteCount = this.dateProvider.allCount;
    collection.addAllAt(0, items);
    this.flush();
    this.scrollLayer.style.scrollBehavior = "auto";
    this.scrollTop += this.layout.getStart(this.dateProvider.yCount);
    this.scrollLayer.style.removeProperty("scroll-behavior");
    if (this.lastVisibleIndex <= collection.length - deleteCount * 2) {
      collection.removeRange(collection.length - deleteCount, deleteCount);
    }
  }
  addNextItems() {
    const collection = this.collection;
    const items = this.dateProvider.getNextItems(collection.get(collection.length - 1).source);
    const deleteCount = this.dateProvider.allCount;
    collection.addAll(items);
    this.flush();
    if (this.firstVisibleIndex >= deleteCount * 2) {
      this.scrollLayer.style.scrollBehavior = "auto";
      this.scrollTop -= this.layout.getStart(this.dateProvider.yCount);
      this.scrollLayer.style.removeProperty("scroll-behavior");
      collection.removeRange(0, deleteCount);
    }
  }
  onScroll(event) {
    if (this.initCancel || this.scrollLayer.offsetHeight < 1) {
      return;
    }
    const SCROLL_GAP = 30;
    const { scrollTop, oldTop } = event.detail;
    if (oldTop > scrollTop && scrollTop < SCROLL_GAP) {
      this.addPreviousItems();
    } else if (oldTop < scrollTop && this.maxScrollTop - scrollTop < SCROLL_GAP) {
      this.addNextItems();
    }
    this.debounceUpdateCurrent();
  }
  onSelectionChanging(event) {
    if (event.detail.source.some((item) => !this.validateAllowDate(item.source))) {
      event.preventDefault();
    }
  }
  onKeyDown(event) {
  }
}
DateTable.template(`<div class="x-date-table">
        <div id="scrollLayer" class="x-date-table-container" style="position:relative;">
            <div id="contentLayer" style="position:relative;overflow:hidden;"></div> 
        </div>
    </div>`);
DateTable.config = {
  itemClass: "x-date-table-item",
  groupTemplate: `<div class="x-date-table-row"></div>`,
  itemTemplate: `<div></div>`
};
const DEFAULT_WEEK_LABELS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
class DayTable extends DateTable {
  constructor() {
    super();
    this.type = "day";
    this.weekLabels = this.config.weekLabels;
  }
  get headerLayer() {
    return this.__dom__.refs.headerLayer;
  }
  get weekLabels() {
    return this._weekLabels;
  }
  set weekLabels(values) {
    if (this._weekLabels !== values) {
      this._weekLabels = values;
      while (this.headerLayer.firstChild) {
        this.headerLayer.removeChild(this.headerLayer.firstChild);
      }
      this.weekLabels.forEach((label, index) => {
        const child = buildHTML(this.config.weekLabelsTemplate);
        toggleAttribute(child, DEFAULT_WEEK_LABELS[index], "");
        child.innerText = label;
        this.headerLayer.appendChild(child);
      });
    }
  }
  updateElementState(element, state) {
    const day = state.item.source.getDay();
    toggleAttribute(element, DEFAULT_WEEK_LABELS[day], "");
    super.updateElementState(element, state);
  }
  isExtraDate(date) {
    return toYYYYMM(date) !== toYYYYMM(this.currentDate);
  }
  updateCurrent() {
    if (this.elementList.length > 0) {
      const cache2 = {};
      this.elementList.forEach((element, index) => {
        const date = this.collection.get(index).source;
        const yyyymm = toYYYYMM(date);
        if (!(yyyymm in cache2)) {
          cache2[yyyymm] = 0;
        }
        cache2[yyyymm]++;
      });
      const result = +Object.keys(cache2).reduce((cur, next) => cache2[cur] > cache2[next] ? cur : next);
      this.setCurrentDate(new Date(Math.floor(result / 100), result % 100 - 1, 1));
    }
  }
  getPreviousScrollIndex() {
    const yyyymmdd = toYYYYMMDD(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1));
    return this.items.findIndex((item) => yyyymmdd === item.fullValue);
  }
  getNextScrollIndex() {
    const yyyymmdd = toYYYYMMDD(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1));
    return this.items.findIndex((item) => yyyymmdd === item.fullValue);
  }
}
DayTable.template(`<div class="x-date-table">
        <div id="headerLayer" class="x-date-table-header"></div>
        <div id="scrollLayer" class="x-date-table-container" style="position:relative;">
            <div id="contentLayer" style="position:relative;overflow:hidden;"></div> 
        </div>
    </div>`);
DayTable.config = {
  weekLabels: DEFAULT_WEEK_LABELS,
  weekLabelsTemplate: `<span class="x-date-table-week"></span>`,
  itemTemplate: `<div><span></span></div>`,
  hookRenderElement: function(state) {
    state.element.firstElementChild.textContent = "" + state.item.value;
  }
};
class MonthTable extends DateTable {
  constructor() {
    super();
    this.type = "month";
  }
  isExtraDate(date) {
    return toYYYY(date) !== toYYYY(this.currentDate);
  }
  updateCurrent() {
    if (this.elementList.length > 0) {
      const cache2 = {};
      this.elementList.forEach((element, index) => {
        const date = this.collection.get(index).source;
        const yyyy = toYYYY(date);
        if (!(yyyy in cache2)) {
          cache2[yyyy] = 0;
        }
        cache2[yyyy]++;
      });
      const result = +Object.keys(cache2).reduce((cur, next) => cache2[cur] > cache2[next] ? cur : next);
      this.setCurrentDate(new Date(result, 0, 1));
    }
  }
  getPreviousScrollIndex() {
    const yyyymm = toYYYYMM(new Date(this.currentDate.getFullYear() - 1, 0, 1));
    return this.items.findIndex((item) => yyyymm === item.fullValue);
  }
  getNextScrollIndex() {
    const yyyymm = toYYYYMM(new Date(this.currentDate.getFullYear() + 1, 0, 1));
    return this.items.findIndex((item) => yyyymm === item.fullValue);
  }
}
MonthTable.config = {
  itemTemplate: `<div><span></span></div>`,
  hookRenderElement: function(state) {
    state.element.firstElementChild.textContent = "" + (state.item.value + 1);
  }
};
function toYYY0(date) {
  return date.getFullYear() - date.getFullYear() % 10;
}
class YearTable extends DateTable {
  constructor() {
    super();
    this.type = "year";
  }
  isExtraDate(date) {
    return toYYY0(date) !== toYYY0(this.currentDate);
  }
  updateCurrent() {
    if (this.elementList.length > 0) {
      const cache2 = {};
      this.elementList.forEach((element, index) => {
        const date = this.collection.get(index).source;
        const yyy0 = toYYY0(date);
        if (!(yyy0 in cache2)) {
          cache2[yyy0] = 0;
        }
        cache2[yyy0]++;
      });
      const result = +Object.keys(cache2).reduce((cur, next) => cache2[cur] > cache2[next] ? cur : next);
      this.setCurrentDate(new Date(result, 0, 1));
    }
  }
  getPreviousScrollIndex() {
    const yyyy = toYYY0(new Date(this.currentDate.getFullYear() - 10, 0, 1));
    return this.items.findIndex((item) => yyyy === item.fullValue);
  }
  getNextScrollIndex() {
    const yyyy = toYYY0(new Date(this.currentDate.getFullYear() + 10, 0, 1));
    return this.items.findIndex((item) => yyyy === item.fullValue);
  }
}
YearTable.config = {
  itemTemplate: `<div><span></span></div>`,
  hookRenderElement: function(state) {
    state.element.firstElementChild.textContent = "" + state.item.value;
  }
};
function createFactory(type, base) {
  const Super = base.constructor === Object ? Object.assign((class {
  }).prototype, base).constructor : base;
  return class Formatter extends Super {
    constructor() {
      super();
      this.type = type;
    }
    get pattern() {
      return null;
    }
    get source() {
      return null;
    }
  };
}
const formatter = {};
function get(type) {
  return formatter[type];
}
function set(type, base) {
  const factory2 = createFactory(type, base);
  formatter[type] = new factory2();
  return formatter[type];
}
function isDate(date) {
  return !isNaN(date == null ? void 0 : date.getTime());
}
const STATE_STEPS = ["day", "month", "year"];
class DateChooser extends Element {
  constructor() {
    super();
    this._allowRange = false;
    this._patterns = this.config.patterns;
    this._headerPatterns = this.config.headerPatterns;
    this._itemTemplate = void 0;
    this._hookRenderElement = void 0;
    this._hookFreeElement = void 0;
    this.tableInstance = { year: null, month: null, day: null };
    this.initSetHeader = false;
    this.selectOnClick = true;
    this.headerTitleTemplate = this.config.headerTitleTemplate;
    this.headerPreviousTemplate = this.config.headerPreviousTemplate;
    this.headerNextTemplate = this.config.headerNextTemplate;
    this.onDateTableCurrentChange = (event) => {
      this.invalidateFor(Reason.TITLE);
    };
    this.onDateTableItemDown = (event) => {
      if (!this.dispatchCustomEvent(event.type, event.detail, true)) {
        event.preventDefault();
      }
    };
    this.onDateTableItemClick = (event) => {
      if (!this.dispatchCustomEvent(event.type, event.detail, true)) {
        event.preventDefault();
      }
      if (this.state !== this.type) {
        delayTime(1).then(() => this.lowerStep(event.detail.item.source));
      }
    };
    this.onDateTableSelectionChanging = (event) => {
      if (this.state !== this.type || !this.dispatchCustomEvent(event.type, this.convertSelectionEventDataToDate(event.detail), true)) {
        event.preventDefault();
      }
    };
    this.onDateTableSelectionChange = (event) => {
      if (this.state === this.type) {
        this.dispatchCustomEvent(event.type, this.convertSelectionEventDataToDate(event.detail));
      }
    };
    this.type = "day";
  }
  get headerLayer() {
    return this.__dom__.refs["headerLayer"];
  }
  get bodyLayer() {
    return this.__dom__.refs["bodyLayer"];
  }
  get formatter() {
    return get("date") || get("defaultDate");
  }
  /**
   * 현재 표시되는 날짜 상태('day', 'month', 'year')입니다.
   */
  get state() {
    return this._state;
  }
  /**
   * 'day', 'month', 'year' 표시할 지를 정의합니다.
   * 기본값은 'day' 입니다.
   */
  get type() {
    return this._type;
  }
  set type(value) {
    if (this._type !== value) {
      this._type = value;
      if (this.state !== value) {
        this.setState(value);
      }
    }
  }
  /**
   * 오늘 날짜를 정의합니다.
   */
  get today() {
    return this.currentTable.today;
  }
  set today(value) {
    this.setState(this.type);
    this.currentTable.today = value;
    this.setCurrentDate(value);
  }
  /**
   * 사용자가 날짜 범위를 선택할 수 있는지 여부입니다.
   */
  get allowRange() {
    return this._allowRange;
  }
  set allowRange(value) {
    if (this.allowRange !== value) {
      this._allowRange = value;
      this.currentTable.maxSelection = value ? 2 : 1;
    }
  }
  /**
   * 선택 가능한 날짜를 정의합니다.
   * ```typescript
   * dateChooser.allowDates = (date: Date) => boolean {}
   * ```
   */
  get allowDates() {
    return this._allowDates;
  }
  set allowDates(value) {
    if (this._allowDates !== value) {
      this._allowDates = value;
      this.currentTable.allowDates = value;
    }
  }
  /**
   * 헤더에 표시되는 날짜의 형식입니다.
   * ```typescript
   * dateChooser.headerPatterns = {day : 'YYYY.MM', month: 'YYYY',  year:'{YYYY} ~ {YYYY}'}
   * ```
   */
  get headerPatterns() {
    return this._headerPatterns;
  }
  set headerPatterns(value) {
    if (value && this._headerPatterns !== value) {
      this._headerPatterns = value;
    }
  }
  /**
   * 표시되는 날짜의 형식입니다.
   * `DateChooser.setFormatter` 설정된 포멧터에 의해 결정됩니다.
   * ```typescript
   * dateChooser.pattern = {day : 'YYYY.MM.DD', month: 'YYYY.MM.DD',  year:'YYYY'}
   * ```
   */
  get patterns() {
    return this._patterns;
  }
  set patterns(value) {
    if (value && this._patterns !== value) {
      this._patterns = value;
    }
  }
  /**
   * 선택된 날짜 범위를 정의합니다.
   * ```typescript
   * dateChooser.selectedRange = [new Date('2020/1/1'), new Date('2020/1/31')]
   * ```
   */
  get selectedRange() {
    return this.getTable(this.type).selectedRange;
  }
  set selectedRange(range) {
    this.getTable(this.type).selectedRange = range;
  }
  /**
   * 선택된 날짜를 정의합니다.
   * 날짜는 Date 객체로 반환납니다.
   * ```typescript
   * dateChooser.selectedDate = new Date('2020/1/1');
   * ```
   */
  get selectedDate() {
    return this.selectedRange[0] || null;
  }
  set selectedDate(date) {
    this.selectedRange = isNaN(date == null ? void 0 : date.getTime()) ? null : [date];
  }
  /**
   * 선택된 날짜를 정의합니다.
   * 문자열의 형식는 `DateChooser.setFormatter` 통해 설정된 포맷터와 'pattern' 속성에 의해 생성됩니다.
   */
  get selectedDateString() {
    return this.format(this.selectedDate);
  }
  set selectedDateString(dateString) {
    if (dateString) {
      const date = this.parse(dateString);
      if (!isDate(date)) {
        console.warn(`Invalid date string: ${dateString}`);
        return;
      }
      this.selectedDate = date;
    } else {
      this.selectedDate = null;
    }
  }
  /**
   * 아이템과 해당 아이템의 상태(`DateItemState`)에 따른 렌더링 방법을 정의합니다.
   * HTML 형태의 문자열, 완성된 HTMLElement 또는 HTMLElement 반환하는 콜백 함수중 하나의 형태를 가질 수 있습니다
   * 아래의 예제는 콜백 함수의 사용 예를 나타냅니다.
   * ```typescript
   * (state: DateItemState): HTMLElement {
   *     element = document.createElement('div');
   *     element.innerText = state.item['text'];
   *     return element;
   * }
   * ```
   */
  get itemTemplate() {
    return this._itemTemplate;
  }
  set itemTemplate(value) {
    if (value) {
      this._itemTemplate = value;
      this.currentTable.itemTemplate = value;
    }
  }
  get hookRenderElement() {
    return this._hookRenderElement;
  }
  set hookRenderElement(value) {
    if (value) {
      this._hookRenderElement = value;
      this.currentTable.hookRenderElement = value;
    }
  }
  get hookFreeElement() {
    return this._hookFreeElement;
  }
  set hookFreeElement(value) {
    if (value) {
      this._hookFreeElement = value;
      this.currentTable.hookFreeElement = value;
    }
  }
  /**
   *  Date 객체를 지정된 형식의 문자열로 변환합니다.
   * `pattern` 속성과 `DateChooser.setFormatter` 통해 정의된 포맷터를 사용하여 특정 형식의 날짜 문자열로 반환합니다.
   *  포맷터나 패턴이 지정되지 않았을 경우, 기본적으로 'YYYY.MM.DD' 형식으로 변환합니다.
   */
  format(date, type = this.type) {
    if (!date) {
      return null;
    }
    return this.formatter.format(date, this.patterns[type], type);
  }
  /**
   *  날짜 문자열을 Date 객체로 변환합니다.
   * `pattern` 속성과 `DateChooser.setFormatter` 통해 정의된 포맷터를 사용하여 Date 객체로 반환합니다.
   */
  parse(dateStrting, type = this.type) {
    return this.formatter.parse(dateStrting, this.patterns[type], type);
  }
  /**
   * 이전 날짜로 이동합니다.
   */
  previous() {
    this.currentTable.previousScroll();
  }
  /**
   * 다음 날짜로 이동합니다.
   */
  next() {
    this.currentTable.nextScroll();
  }
  /**
   * 현재 표시된 해당 날짜를 반환합니다.
   */
  getCurrentDate() {
    return this.currentTable.currentDate;
  }
  /**
   * 해당 날짜로 이동합니다.
   * @param date
   */
  setCurrentDate(date) {
    this.setState(this.type);
    this.currentTable.currentDate = date;
  }
  /**
   * 선택된 날짜를 삭제합니다.
   */
  clear() {
    this.selectedDate = null;
  }
  /**
   * 선택된 날짜로 이동하거나, 선택된 날짜가 없는 경우 오늘의 날짜로 이동합니다.
   */
  reset() {
    this.setCurrentDate(this.selectedDate || this.today);
  }
  /**
   * '일', '월', '년' 대한 상태를 설정합니다.
   */
  setState(value) {
    if (this._state !== value) {
      const oldValue = this._state;
      this._state = value;
      setAttribute(this.root, "state", value);
      this.setCurrentTable(this.getTable(value));
      this.invalidateFor(Reason.STATE);
      this.dispatchCustomEvent("state-change", { value, oldValue });
    }
  }
  /**
   * @private
   */
  setHeader() {
    const titleElement = buildHTML(this.headerTitleTemplate);
    const previousElement = buildHTML(this.headerPreviousTemplate);
    const nextElement = buildHTML(this.headerNextTemplate);
    if (previousElement) {
      this.headerLayer.appendChild(previousElement);
    }
    if (titleElement) {
      this.headerLayer.appendChild(titleElement);
    }
    if (nextElement) {
      this.headerLayer.appendChild(nextElement);
    }
    const watcher = new Watcher();
    watcher.addBySelector(this.headerLayer, ".x-previous", "click", () => this.previous());
    watcher.addBySelector(this.headerLayer, ".x-next", "click", () => this.next());
    watcher.addBySelector(this.headerLayer, ".x-title", "click", () => this.upperStep());
  }
  /**
   * @private
   */
  updateHeaderTitle() {
    const element = this.headerLayer.querySelector(".x-title");
    if (element) {
      const pattern = this.headerPatterns[this.state];
      const date = this.getCurrentDate();
      let title;
      if (this.state === "year") {
        const regExp = new RegExp("[{](.*?)[}]", "gi");
        const toDate = cloneDate(date);
        toDate.setFullYear(toDate.getFullYear() + 9);
        if (regExp.test(pattern)) {
          regExp.lastIndex = 0;
          let result = regExp.exec(pattern);
          title = pattern.replace(result[0], this.formatter.format(date, result[1], "year"));
          result = regExp.exec(pattern);
          if (result) {
            title = title.replace(result[0], this.formatter.format(toDate, result[1], "year"));
          }
        } else {
          title = `${this.formatter.format(date, pattern, "year")} ~ ${this.formatter.format(toDate, pattern, "year")}`;
        }
      } else if (this.state === "month") {
        title = this.formatter.format(date, pattern, "year");
      } else {
        title = this.formatter.format(date, pattern, "month");
      }
      element.textContent = title;
    }
  }
  /**
   * 상위 형태로 변경(일 -> 월 -> 년)
   * @private
   */
  upperStep() {
    const index = STATE_STEPS.indexOf(this.state);
    if (index + 1 < STATE_STEPS.length) {
      const oldTable = this.currentTable;
      this.setState(STATE_STEPS[index + 1]);
      this.currentTable.currentDate = oldTable.currentDate;
      return true;
    }
    return false;
  }
  /**
   * 하위 형태로 변경(년 -> 월 -> 일)
   * @param date
   * @private
   */
  lowerStep(date) {
    const index = STATE_STEPS.indexOf(this.state);
    const minIndex = STATE_STEPS.indexOf(this.type);
    if (index > minIndex) {
      this.setState(STATE_STEPS[index - 1]);
      this.currentTable.currentDate = date;
      return true;
    }
    return false;
  }
  setCurrentTable(table) {
    if (this.currentTable) {
      this.currentTableWatcher.clear();
      this.currentTable.unmount();
    }
    this.currentTable = table;
    this.currentTable.mount(this.bodyLayer);
    if (this._itemTemplate) {
      this.currentTable.itemTemplate = this._itemTemplate;
    }
    if (this._hookRenderElement) {
      this.currentTable.hookRenderElement = this._hookRenderElement;
    }
    if (this._hookFreeElement) {
      this.currentTable.hookFreeElement = this._hookFreeElement;
    }
    this.currentTable.today = this.today;
    this.currentTable.allowDates = this._allowDates;
    this.currentTable.selectOnClick = this.selectOnClick;
    this.currentTable.maxSelection = this.allowRange ? 2 : 1;
    const watcher = this.currentTableWatcher = new Watcher();
    watcher.add(this.currentTable, "current-change", this.onDateTableCurrentChange);
    watcher.add(this.currentTable, "item-down", this.onDateTableItemDown);
    watcher.add(this.currentTable, "item-click", this.onDateTableItemClick);
    watcher.add(this.currentTable, "selection-changing", this.onDateTableSelectionChanging);
    watcher.add(this.currentTable, "selection-change", this.onDateTableSelectionChange);
  }
  doLayout() {
    if (!this.initSetHeader) {
      this.setHeader();
      this.initSetHeader = true;
    }
    if (this.hasInvalidateReason(Reason.TITLE)) {
      this.updateHeaderTitle();
    }
  }
  getTable(state) {
    let table = this.tableInstance[state];
    if (!table) {
      if (state === "year") {
        table = new YearTable();
      } else if (state === "month") {
        table = new MonthTable();
      } else {
        table = new DayTable();
      }
      this.tableInstance[state] = table;
    }
    return table;
  }
  destroy() {
    super.destroy();
    if (this.currentTable) {
      this.currentTable.destroy();
    }
  }
  convertSelectionEventDataToDate(data) {
    return {
      kind: data.kind,
      items: data.items.map((item) => item.source),
      oldItems: data.oldItems.map((item) => item.source),
      source: data.source.map((item) => item.source)
    };
  }
  /**
   * `DateChooser` 의 날짜 포맷터을 설정합니다.
   * 이 함수는 두 가지 메서드를 포함하는 객체를 인자로 받습니다:
   *  - format: 날짜 객체와 포맷 패턴 문자열을 인자로 받아, 해당 패턴에 따른 문자열로 변환합니다.
   *  - parse: 날짜 형식의 문자열과 포맷 패턴을 인자로 받아, 해당 패턴에 따라 Date 객체로 변환합니다.
   * 아래 코드는 'moment' 라이브러리를 이용하여 날짜를 변환하고 파싱하는 예입니다:
   * ```typescript
   * DateChooser.setFormatter({
   *     format(date: Date, pattern: string, options?:any): string {
   *         return moment(date).format(pattern);
   *     },
   *     parse(dateString: string, pattern: string, options?:any): Date{
   *         return moment(dateString, pattern).toDate();
   *     }
   * })
   * ```
   * @param base
   */
  static setFormatter(base) {
    set("date", base);
  }
}
set("defaultDate", {
  format(date, pattern, options) {
    if (options === "year") {
      return `${date.getFullYear()}`;
    } else if (options === "month") {
      return `${date.getFullYear()}.${date.getMonth() + 1}`;
    } else {
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    }
  },
  parse(dateString, pattern) {
    return new Date(dateString);
  }
});
DateChooser.template(`<div class="x-date-chooser">
        <div id="headerLayer" class="x-date-chooser-header"></div>
        <div id="bodyLayer" class="x-date-chooser-body"></div>
        <div id="footerLayer" class="x-date-chooser-footer"></div>
    </div>`);
DateChooser.config = {
  headerTitleTemplate: `<div><button class="x-title"></button></div>`,
  headerPreviousTemplate: `<button class="x-previous"></button>`,
  headerNextTemplate: `<button class="x-next"></button>`,
  patterns: {
    day: "YYYY.MM.DD",
    month: "YYYY.MM",
    year: "YYYY"
  },
  headerPatterns: {
    day: "YYYY.MM",
    month: "YYYY",
    year: "{YYYY} ~ {YYYY}"
  }
};
class DatePicker extends Element {
  constructor() {
    super();
    this._label = "";
    this._placeholder = "";
    this._titlePatterns = this.config.titlePatterns;
    this.closeOnSelect = true;
    this.root.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.dropdownTrigger.addEventListener("mousedown", this.onDropdownMouseDown.bind(this));
    this.clearButton.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });
    this.clearButton.addEventListener("click", this.onClearButtonClick.bind(this));
    this.clearSwitch = Switch.create(this.clearButton, false);
    this.initialize();
    this.closeOnOutsideDown = true;
  }
  /**
   * 날짜선택 인스턴스입니다.
   */
  get dateChooser() {
    return this._dateChooser;
  }
  /**
   * 팝업 인스턴스입니다.
   */
  get popup() {
    return this._popup;
  }
  get dropdownTrigger() {
    return this.__dom__.refs.dropdownTrigger;
  }
  get floatingLabel() {
    return this.__dom__.refs.floatingLabel;
  }
  get selectLabel() {
    return this.__dom__.refs.selectLabel;
  }
  get clearButton() {
    return this.__dom__.refs.clearable;
  }
  get placeholderLabel() {
    return this.__dom__.refs.placeholderLabel;
  }
  /**
   * `DateChooser` 열렸는지 닫혔는를 나타냅니다.
   */
  get isOpened() {
    return this.popup.isOpened;
  }
  get label() {
    return this._label;
  }
  set label(value) {
    if (this.label !== value) {
      this._label = value;
      this.invalidateFor(Reason.LABEL);
    }
  }
  /**
   * 년, 월, 일 날짜 타입을 지정합니다
   */
  get type() {
    return this.dateChooser.type;
  }
  set type(value) {
    this.dateChooser.type = value;
  }
  /**
   * 캘린더 헤더에 표시되는 날짜의 형식입니다.
   * ```typescript
   * datePicker.headerPatterns = {day : 'YYYY.MM', month: 'YYYY',  year:'{YYYY} ~ {YYYY}'}
   * ```
   */
  get headerPatterns() {
    return this.dateChooser.headerPatterns;
  }
  set headerPatterns(value) {
    this.dateChooser.headerPatterns = value;
  }
  /**
   * 타이틀에 표시되는 날짜의 형식입니다.
   * ```typescript
   * datePicker.titlePatterns = {day : 'YYYY.MM.DD', month: 'YYYY.MM',  year:'YYYY'}
   * ```
   */
  get titlePatterns() {
    return this._titlePatterns;
  }
  set titlePatterns(value) {
    this._titlePatterns = value;
  }
  /**
   * 선택된 날짜의 표시되는 날짜의 형식입니다.
   * ```typescript
   * datePicker.patterns = {day : 'YYYY.MM.DD', month: 'YYYY.MM',  year:'YYYY'}
   * ```
   */
  get patterns() {
    return this.dateChooser.patterns;
  }
  set patterns(value) {
    this.dateChooser.patterns = value;
  }
  /**
   * 기간 선택입력 여부입니다. 'true' 인 경우 시작일과 종료일을 선택 할 수 있습니다.
   */
  get allowRange() {
    return this.dateChooser.allowRange;
  }
  set allowRange(value) {
    this.dateChooser.allowRange = value;
  }
  /**
   * 선택 가능한 날짜를 정의합니다.
   * ```typescript
   * datePicker.allowDates = (date: Date) => boolean {}
   * ```
   */
  get allowDates() {
    return this.dateChooser.allowDates;
  }
  set allowDates(value) {
    this.dateChooser.allowDates = value;
  }
  /**
   * 범위 날짜를 선택합니다.
   * ```typescript
   * datePicker.selectedRange = [new Date('2020/1/1'), new Date('2020/1/31')]
   * ```
   */
  get selectedRange() {
    return this.dateChooser.selectedRange;
  }
  set selectedRange(range) {
    this.dateChooser.selectedRange = range;
  }
  /**
   * 단일 날짜를 선택합니다.
   * ```typescript
   * datePicker.selectedDate = new Date('2020/1/1')
   * ```
   */
  get selectedDate() {
    return this.dateChooser.selectedDate;
  }
  set selectedDate(date) {
    this.dateChooser.selectedDate = date;
  }
  /**
   * 선택된 날짜를 정의합니다.
   * 문자열의 형식는 `DateChooser.setFormatter` 통해 설정된 포맷터와 'pattern' 속성에 의해 생성됩니다.
   */
  get selectedDateString() {
    return this.dateChooser.selectedDateString;
  }
  set selectedDateString(date) {
    this.dateChooser.selectedDateString = date;
  }
  /**
   * 초기화 버튼을 활성화 여부입니다.
   */
  get clearable() {
    return this.clearSwitch.value;
  }
  set clearable(value) {
    this.clearSwitch.value = value;
  }
  /**
   * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
   */
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value) {
    if (this.placeholder !== value) {
      this._placeholder = value;
      this.invalidateFor(Reason.PLACEHOLDER);
    }
  }
  /**
   * 외부영역 클릭시 팝업을 닫을지 여부입니다.
   */
  get closeOnOutsideDown() {
    return this.popup.closeOnOutsideDown;
  }
  set closeOnOutsideDown(value) {
    this.popup.closeOnOutsideDown = value;
  }
  /**
   * 팝업의 좌표 시스템을 설정합니다.
   * - 'global' 팝업을 전역 좌표계에 배치합니다.
   * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
   * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
   * 기본 값은 'relative' 입니다.
   */
  get coordinateMode() {
    return this.popup.coordinateMode;
  }
  set coordinateMode(value) {
    this.popup.coordinateMode = value;
  }
  get dateChooserItemTemplate() {
    return this.dateChooser.itemTemplate;
  }
  set dateChooserItemTemplate(value) {
    this.dateChooser.itemTemplate = value;
  }
  get dateChooserHookRenderElement() {
    return this.dateChooser.hookRenderElement;
  }
  set dateChooserHookRenderElement(value) {
    this.dateChooser.hookRenderElement = value;
  }
  get dateChooserHookFreeElement() {
    return this.dateChooser.hookFreeElement;
  }
  set dateChooserHookFreeElement(value) {
    this.dateChooser.hookFreeElement = value;
  }
  /**
   * 날짜선택 팝업 초기 설정
   * @private
   */
  initialize() {
    if (this.popup) {
      return;
    }
    const dateChooser = this._dateChooser = new DateChooser();
    dateChooser.addEventListener("state-change", this.onDateChooserStateChange.bind(this));
    dateChooser.addEventListener("item-click", this.onDateChooserItemClick.bind(this));
    dateChooser.addEventListener("selection-changing", this.onDateChooserSelectionChanging.bind(this));
    dateChooser.addEventListener("selection-change", this.onDateChooserSelectionChange.bind(this));
    this._popup = Popup.create({
      content: dateChooser.root,
      anchor: this.root.querySelector(".x-controls"),
      coordinateMode: "relative",
      anchorAlign: "left bottom",
      contentAlign: "left top",
      lockOutside: true,
      autoFocus: false,
      updateOnScroll: false,
      hitAreas: [this.root]
    });
  }
  /**
   * 날짜선택 팝업을 엽니다.
   */
  open() {
    return this.popup.open().opening((content) => {
      if (!this.dispatchCustomEvent("date-picker-opening", this.selectedRange, true)) {
        return false;
      }
      this.dateChooser.reset();
    }).closing((reason) => {
      if (!this.dispatchCustomEvent("date-picker-closing", this.selectedRange, true)) {
        return false;
      }
    }).opened((content) => {
      setAttribute(this.root, "open");
      this.dispatchCustomEvent("date-picker-open", this.selectedRange);
      this.invalidate();
    }).closed((reason) => {
      removeAttribute(this.root, "open");
      this.dispatchCustomEvent("date-picker-close", this.selectedRange);
      this.invalidate();
    });
  }
  /**
   * 날짜선택 팝업을 닫습니다.
   */
  close(reason = null) {
    return this.popup.close(reason);
  }
  /**
   * 날짜를 지정된 형식의 문자열로 반환합니다.
   * @param date
   */
  format(date) {
    return this.dateChooser.format(date);
  }
  /**
   * 선택된 날짜를 삭제합니다.
   */
  clear() {
    this.dateChooser.clear();
  }
  /**
   * 선택된 날짜로 이동하거나, 선택된 날짜가 없는 경우 오늘의 날짜로 이동합니다.
   */
  reset() {
    this.dateChooser.reset();
  }
  /**
   * 해당 날짜로 이동합니다.
   * @param date
   */
  setCurrentDate(date) {
    this.dateChooser.setCurrentDate(date);
  }
  updateSelectLabel() {
    this.selectLabel.textContent = isDate(this.selectedDate) ? this.dateChooser.formatter.format(this.selectedDate, this.titlePatterns[this.type], this.type) : "";
  }
  doLayout() {
    if (this.hasInvalidateReason(Reason.LABEL)) {
      this.floatingLabel.textContent = this.label ?? "";
    }
    const active = !!this.selectedDateString;
    toggleAttribute(this.floatingLabel, "active", active ? "" : null);
    toggleAttribute(this.placeholderLabel, "active", !active && this.placeholder ? "" : null);
    toggleAttribute(this.root, "dirty", !active ? "" : null);
    if (this.hasInvalidateReason(Reason.PLACEHOLDER)) {
      this.placeholderLabel.textContent = this._placeholder;
    }
    if (this.hasInvalidateReason(Reason.SELECT)) {
      this.updateSelectLabel();
    }
  }
  /**
   * 해당 자원을 모두 해제합니다.
   */
  destroy() {
    super.destroy();
    this.dateChooser.destroy();
    this.popup.destroy();
  }
  validateAllowDate(date) {
    return !(this.allowDates instanceof Function && !this.allowDates(date));
  }
  onMouseDown(event) {
    if (!this.isOpened && !event.defaultPrevented) {
      this.open();
    }
  }
  onDropdownMouseDown(event) {
    if (this.isOpened && !event.defaultPrevented) {
      this.close(event);
    }
  }
  onDateChooserStateChange(event) {
    this.dispatchCustomEvent(event.type, event.detail);
  }
  onDateChooserItemClick(event) {
    if (!this.dispatchCustomEvent("date-picker-select", { item: event.detail.item }, true)) {
      event.preventDefault();
    } else if (this.dateChooser.state === this.type && this.validateAllowDate(event.detail.item.source)) {
      if (this.closeOnSelect) {
        this.close(event);
      }
    }
  }
  onDateChooserSelectionChanging(event) {
    if (!this.dispatchCustomEvent(event.type, event.detail, true)) {
      event.preventDefault();
    }
  }
  onDateChooserSelectionChange(event) {
    this.dispatchCustomEvent(event.type, event.detail);
    this.invalidateFor(Reason.SELECT);
  }
  onClearButtonClick(event) {
    this.clear();
  }
}
DatePicker.template(`<div class="x-date-picker">
        <label id="floatingLabel" class="x-floating-label"></label>
        <div class="x-controls">
            <div class="x-select-container">
                <span id="selectLabel" class="x-select"></span>
                <span id="placeholderLabel" class="x-placeholder"></span>
            </div>
            <div id="clearable" class="x-clear">
                <button></button>
            </div>
            <div id="dropdownTrigger" class="x-dropdown-trigger">
                <button tabindex="-1">▼</button>
            </div>
        </div>
    </div>`);
DatePicker.config = {
  titlePatterns: {
    day: "YYYY.MM.DD",
    month: "YYYY.MM",
    year: "YYYY"
  }
};
const util = { ...Dom, ...Util, ...delay };
class ComponentWrapper {
  constructor(wrapper) {
    this.wrapper = wrapper;
    Object.defineProperty(this.element, "__wrapper", {
      get: () => {
        return this;
      }
    });
  }
  get instance() {
    return this.wrapper.vnode.component.proxy;
  }
  get element() {
    return this.wrapper.vnode.el;
  }
  destroy() {
    render(null, this.wrapper.container);
  }
  static factory(host, type, WrapperClass) {
    return factory(host, type, WrapperClass);
  }
}
function factory(host, type, wrapperClass) {
  const instance = host.$ || host;
  if (type.__setup) {
    type = defineComponent({ ...type });
  }
  const hookSetup = type.__setup || type.setup;
  type.__setup = hookSetup;
  type.setup = (props, ctx) => {
    getCurrentInstance().parent = instance;
    if (hookSetup) {
      return hookSetup(props, ctx);
    }
  };
  const create = (args) => {
    const data = args.length > 0 ? args[0] : {};
    const vnode = createVNode(type, data, { ...instance.slots });
    const container = document.createElement("template");
    container.className = "wrapper";
    if (instance.appContext) {
      vnode.appContext = instance.appContext;
    }
    render(vnode, container);
    return { vnode, container };
  };
  return (...args) => {
    return new wrapperClass(create(args));
  };
}
function useItemTemplate(instance, itemFactory) {
  const hadInvalidateItem = !!instance.invalidateItem;
  let rendering = false;
  if (hadInvalidateItem) {
    const onRender = (event) => {
      rendering = event.type === "render-updating";
    };
    instance.addEventListener("render-updating", onRender);
    instance.addEventListener("render-update", onRender);
  }
  return {
    itemTemplate: (state) => {
      const { item, index } = state;
      const wrapper = itemFactory({ item, index, nativeInstance: instance, initState: state });
      if (hadInvalidateItem) {
        wrapper.onUpdated(() => {
          if (!rendering) {
            instance.invalidateItem(state.item);
          }
        });
      }
      return wrapper.element;
    },
    hookRenderElement: (state) => {
      state.element.__wrapper.prepare(state);
      return new Promise((resolve) => {
        queuePostFlushCb(() => {
          resolve(state.element);
        });
      });
    },
    hookFreeElement: (state) => {
      var _a;
      (_a = state.element.__wrapper) == null ? void 0 : _a.destroy();
    }
  };
}
function makeItemProps() {
  return {
    item: {
      type: [String, Number, Object]
    },
    index: {
      type: Number
    },
    nativeInstance: {
      type: Object
    },
    initState: {
      type: Object,
      default: () => ({})
    }
  };
}
function useRender(render2) {
  getCurrentInstance().render = render2;
}
const VxListItem = defineComponent({
  name: "VxListItem",
  props: {
    ...makeItemProps()
  },
  setup(props, context) {
    const provider = inject(VxListSymbol);
    const label = computed(() => provider.itemToLabel(state.value.item));
    const state = ref(props.initState);
    useRender(() => {
      const children = [];
      if (context.slots.default && state.value) {
        children.push(context.slots.default({ ...state.value, label: label.value }));
      }
      return h("div", children);
    });
    return {
      state
    };
  },
  prepare(state) {
    this.state = state;
  }
});
class ItemTemplateWrapper extends ComponentWrapper {
  constructor(wrapper) {
    super(wrapper);
  }
  onUpdated(hook) {
    this.releaseOnUpdate = onUpdated(hook, this.instance["_"]);
  }
  onMounted(hook) {
    this.releaseOnMount = onMounted(hook, this.instance["_"]);
  }
  prepare(state) {
    var _a;
    (_a = this.instance["_"].type.prepare) == null ? void 0 : _a.apply(this.instance, [state]);
  }
  destroy() {
    super.destroy();
    if (this.releaseOnUpdate)
      ;
    if (this.releaseOnMount)
      ;
  }
}
const FLUSH_AFTER_MOUNTED = ["scrollTarget", "chipTemplate", "items", "selectedItem", "selectedItems", "selectedValue", "selectedValues"];
const DEEP_WATCH = ["items"];
function mountNative(componentInstance, nativeInstance, data) {
  const onDispatch = (event) => componentInstance.$emit(event.type, event);
  const options = Object.keys(data.options).reduce(
    (item, key) => {
      const v = data.options[key];
      if (v !== void 0) {
        const flushAfterMounted = FLUSH_AFTER_MOUNTED.indexOf(key) >= 0;
        item[flushAfterMounted ? "post" : "pre"][key] = v;
      }
      return item;
    },
    { pre: {}, post: {} }
  );
  data.events.forEach((type) => nativeInstance.addEventListener(type, onDispatch));
  nativeInstance.setOptions(options.pre);
  onMounted(() => {
    if (!(nativeInstance instanceof Popup)) {
      nativeInstance.mount(componentInstance.$el, options.post);
    }
  });
  onUnmounted(() => {
    data.events.forEach((type) => nativeInstance.removeEventListener(type, onDispatch));
    nativeInstance.destroy();
  });
}
function bindNative(target, props, postWatchProps = []) {
  const refs = toRefs(props);
  const unwatchs = Object.keys(refs).map((key) => {
    if (postWatchProps.indexOf(key) >= 0) {
      return watchEffect(
        () => {
          const value = refs[key].value;
          if (target[key] != value) {
            target[key] = value;
          }
        },
        {
          flush: "post"
        }
      );
    }
    const deep = DEEP_WATCH.indexOf(key) >= 0 && props[`${key}Deep`];
    return watch(
      refs[key],
      (value, oldValue) => {
        var _a;
        try {
          if (!(key in target)) {
            return;
          }
          if (target[key] != value) {
            target[key] = value;
          } else if (deep && "collection" in target) {
            (_a = target.collection) == null ? void 0 : _a.refresh();
          }
        } catch (e) {
          console.warn(e);
        }
      },
      {
        deep
      }
    );
  });
  return () => {
    unwatchs.forEach((fn) => fn());
  };
}
function useModel(props, prop, nativeInstance, nativeProp, changeEvent) {
  const instance = getCurrentInstance();
  const internal = ref(props[prop]);
  const isTwoWay = computed(() => {
    if (!(prop in props)) {
      return false;
    }
    const vProps = instance.vnode.props;
    return !!(vProps && prop in vProps && `onUpdate:${prop}` in vProps);
  });
  const model = computed({
    get() {
      return isTwoWay.value ? props[prop] : internal.value;
    },
    set(value) {
      if (internal.value !== value) {
        internal.value = value;
        instance == null ? void 0 : instance.emit(`update:${prop}`, value);
      }
    }
  });
  watch(
    model,
    (value) => {
      if (!instance.isMounted) {
        if (value === void 0) {
          return;
        }
        onMounted(() => {
          if (nativeInstance[nativeProp] != value) {
            nativeInstance[nativeProp] = value;
          }
        });
      } else {
        if (value === void 0) {
          value = null;
        }
        if (nativeInstance[nativeProp] != value) {
          nativeInstance[nativeProp] = value;
        }
      }
    },
    { immediate: true, flush: "post" }
  );
  const onSetValue = () => model.value = nativeInstance[nativeProp];
  const events = Array.isArray(changeEvent) ? changeEvent : [changeEvent];
  events.forEach((name) => {
    nativeInstance.addEventListener(name, onSetValue);
  });
  return model;
}
const NativeSelectableEvents = ["collection-change", "selection-changing", "selection-change"];
const defaultSelectableProps = {
  /**
   * 선택된 아이템 또는 아이템 배열을 나타냅니다.
   * `valueField` 정의 되어 있으면 선택된 아이템의 필드 값 또는 값 배열을 나타냅니다.
   */
  modelValue: {
    type: [Array, Object, Number, String]
  },
  /**
   * 사용자가 여러 항목을 선택할 수 있는지 여부입니다.
   */
  allowMultiple: {
    type: Boolean,
    default: false
  },
  /**
   * 적어도 하나의 아이템이 항상 선택되어야 하는 여부입니다.
   */
  requireSelection: {
    type: Boolean,
    default: false
  },
  /**
   * 선택된 아이템의 값을 결정하는 필드의 이름입니다.
   */
  valueField: {
    type: String
  },
  /**
   * 선택된 아이템을 정의합니다.
   */
  selectedItem: {
    type: [Object, Number, String]
  },
  /**
   * 복수 선택된 아이템을 정의합니다.
   */
  selectedItems: {
    type: Array
  },
  /**
   * 선택된 아이템의 `valueField` 속성 값을 정의합니다
   */
  selectedValue: {
    type: [Object, Number, String]
  }
};
function useSelectableModels(props, nativeInstance) {
  const field = `selected${props.valueField != null ? "Value" : "Item"}${props.allowMultiple ? "s" : ""}`;
  useModel(props, "modelValue", nativeInstance, field, "selection-change");
  useModel(props, "selectedItem", nativeInstance, "selectedItem", "selection-change");
  useModel(props, "selectedItems", nativeInstance, "selectedItems", "selection-change");
  if (props.valueField) {
    useModel(props, "selectedValue", nativeInstance, "selectedValue", "selection-change");
  }
}
const NativeItemDragEvents = [
  "item-drag-ready",
  "item-drag-start",
  "item-drag-move",
  "item-drag-over",
  "item-drag-out",
  "item-drag-enter",
  "item-drag-leave",
  "item-drag-end",
  "item-drag-cancel",
  "item-drop"
];
const VxListSymbol = Symbol.for("ListInstance");
const NativeListEvents = [...NativeSelectableEvents, ...NativeItemDragEvents, "caret-change", "item-down", "item-up", "item-click", "scroll"];
const defaultListProps = {
  /**
   * 표시되는 아이템의 배열입니다.
   */
  items: {
    type: Array
  },
  /**
   * 표시할 아이템의 필드 이름를 정의합니다.
   */
  labelField: {
    type: String,
    default: "label"
  },
  /**
   * 아이템 배열에 표시되는 최대 아이템 개수입니다.
   */
  rowCount: {
    type: Number,
    default: 0
  },
  /**
   * 외부 스크롤을 정의합니다. 아이템 배열 포함하는 부모노드만 가능합니다.
   */
  scrollTarget: {
    type: [String, HTMLElement],
    validator: (v) => !!v
  },
  /**
   * List 아이템이 드래그 가능한지 여부를 나타냅니다.
   */
  draggable: {
    type: Boolean,
    default: false
  },
  /**
   * List 내부의 아이템 또는 다른 List 아이템이 해당 List 위에 드롭 가능한지 여부를 나타냅니다.
   */
  droppable: {
    type: Boolean,
    default: false
  },
  /**
   * `items` 대한 깊은 감시를 활성화합니다.
   * 이를 통해 내부 상태 변화를 감지하고, 이에 따라 네이티브 컴포넌트의 상태를 갱신합니다.
   * 성능에 영향을 줄 수 있으므로 변화 감시가 필요한 경우에만 설정하길 권장합니다.
   */
  itemsDeep: {
    type: Boolean,
    default: false
  },
  /**
   * 아이템 드래그시 보여주는 메시지를 호출하는 함수를 정의합니다.
   */
  hookDragMessage: {
    type: Function
  }
};
const VxListImpl = defineComponent({
  name: "VxList",
  emits: [...NativeListEvents, "update:modelValue", "update:selectedItem", "update:selectedItems", "update:selectedValue"],
  props: {
    ...defaultSelectableProps,
    ...defaultListProps
  },
  setup(props) {
    const instance = getCurrentInstance();
    const nativeInstance = new List();
    const itemFactory = ComponentWrapper.factory(instance, VxListItem, ItemTemplateWrapper);
    bindNative(nativeInstance, props);
    mountNative(instance == null ? void 0 : instance.proxy, nativeInstance, {
      events: NativeListEvents,
      options: {
        ...props,
        ...useItemTemplate(nativeInstance, itemFactory)
      }
    });
    useSelectableModels(props, nativeInstance);
    useRender(() => h("div", { class: "x-list-wrap" }));
    provide(VxListSymbol, {
      list: nativeInstance,
      itemToLabel: (item) => {
        if (item == null || typeof item !== "object") {
          return item;
        }
        return util.getValue(item, props.labelField);
      }
    });
    return {
      nativeInstance,
      get collection() {
        return nativeInstance.collection;
      },
      scrollToIndex(index) {
        nativeInstance.scrollToIndex(index);
      },
      scrollToItem(item) {
        nativeInstance.scrollToItem(item);
      },
      invalidate() {
        nativeInstance.invalidate();
      },
      flush() {
        nativeInstance.invalidate();
      }
    };
  }
});
const VxList = VxListImpl;
const VxTreeItem = defineComponent({
  name: "VxTreeItem",
  props: {
    ...makeItemProps()
  },
  setup(props, context) {
    const provider = inject(VxTreeSymbol);
    const state = ref(props.initState);
    const label = computed(() => provider.itemToLabel(state.value.item));
    const hookToggle = (item) => {
      props.nativeInstance.toggleNode(item);
    };
    useRender(() => {
      const children = [];
      if (context.slots.default && state.value) {
        children.push(context.slots.default({ ...state.value, label: label.value, hookToggle }));
      } else {
        const toggleNode = h(
          "button",
          {
            class: "x-toggle",
            onMousedown: (event) => {
              event.preventDefault();
            },
            onClick: (event) => {
              event.preventDefault();
              props.nativeInstance.toggleNode(state.value.item);
            }
          },
          [h("i", { class: "x-toggle-icon" })]
        );
        const labelNode = h(
          "div",
          {
            class: "x-label"
          },
          label.value
        );
        children.push(toggleNode, labelNode);
      }
      return h("div", children);
    });
    return {
      state
    };
  },
  prepare(state) {
    this.state = state;
  }
});
const VxTreeSymbol = Symbol.for("TreeInstance");
const NativeTreeEvents = [...NativeListEvents, "node-change"];
const defaultTreeProps = {
  /**
   * 트리 구조에서 아이템의 자식 목록을 포함하는 필드의 이름을 정의합니다.
   */
  childrenField: {
    type: String,
    default: "children"
  },
  /**
   * `items`가 갱신될 때 자동으로 확장될 아이템의 레벨을 지정합니다.
   * 예를 들어, 이 속성의 값이 2인 경우, `items`가 갱신될 때 2번째 레벨까지 모든 아이템이 자동으로 확장됩니다.
   */
  autoExpandLevel: {
    type: Number,
    default: 0
  }
};
const VxTreeImpl = defineComponent({
  name: "VxTree",
  emits: [...NativeTreeEvents, "update:modelValue", "update:selectedItem", "update:selectedItems", "update:selectedValue"],
  props: {
    ...defaultSelectableProps,
    ...defaultListProps,
    ...defaultTreeProps
  },
  setup(props) {
    const instance = getCurrentInstance();
    const nativeInstance = new Tree();
    const itemFactory = ComponentWrapper.factory(instance, VxTreeItem, ItemTemplateWrapper);
    bindNative(nativeInstance, props);
    mountNative(instance.proxy, nativeInstance, {
      events: NativeTreeEvents,
      options: {
        ...props,
        ...useItemTemplate(nativeInstance, itemFactory)
      }
    });
    useSelectableModels(props, nativeInstance);
    useRender(() => h("div", { class: "x-tree-wrap" }));
    provide(VxTreeSymbol, {
      list: nativeInstance,
      itemToLabel: (item) => {
        if (item == null || typeof item !== "object") {
          return item;
        }
        return util.getValue(item, props.labelField);
      }
    });
    return {
      nativeInstance,
      get collection() {
        return nativeInstance.collection;
      },
      scrollToIndex(index) {
        nativeInstance.scrollToIndex(index);
      },
      scrollToItem(item) {
        nativeInstance.scrollToItem(item);
      },
      invalidate() {
        nativeInstance.invalidate();
      },
      flush() {
        nativeInstance.invalidate();
      },
      getParentNode(node) {
        return nativeInstance.getParentNode(node);
      },
      getAncestorNodes(node) {
        return nativeInstance.getAncestorNodes(node);
      },
      getDescendantNodes(node) {
        return nativeInstance.getDescendantNodes(node);
      },
      getSiblingNodes(node) {
        return nativeInstance.getSiblingNodes(node);
      },
      getChildren(node) {
        return nativeInstance.getChildren(node);
      },
      hasChildren(node) {
        return nativeInstance.hasChildren(node);
      },
      addNode(parent, node) {
        return nativeInstance.addNode(parent, node);
      },
      addNodeAt(parent, node, index) {
        return nativeInstance.addNodeAt(parent, node, index);
      },
      addNodes(parent, nodes) {
        return nativeInstance.addNodes(parent, nodes);
      },
      addNodesAt(parent, nodes, index) {
        return nativeInstance.addNodesAt(parent, nodes, index);
      },
      removeNode(node) {
        return nativeInstance.removeNode(node);
      },
      contains(node) {
        return nativeInstance.contains(node);
      },
      isExpandedNode(node) {
        return nativeInstance.isExpandedNode(node);
      },
      expandNode(node) {
        return nativeInstance.expandNode(node);
      },
      expandAll() {
        nativeInstance.expandAll();
      },
      collapseNode(node) {
        return nativeInstance.collapseNode(node);
      },
      collapseAll() {
        nativeInstance.collapseAll();
      },
      toggleNode(node) {
        nativeInstance.toggleNode(node);
      },
      setExpandedNodes(nodes) {
        return nativeInstance.setExpandedNodes(nodes);
      },
      getExpandedNodes() {
        return nativeInstance.getExpandedNodes();
      },
      getNodeLevel(node) {
        return nativeInstance.getNodeLevel(node);
      },
      isBranchNode(node) {
        return nativeInstance.isBranchNode(node);
      },
      isLeafNode(node) {
        return nativeInstance.isLeafNode(node);
      },
      find(callback, prefetchNode = null, postOrder = false) {
        return nativeInstance.find(callback, prefetchNode, postOrder);
      },
      findOne(callback, prefetchNode = null, postOrder = false) {
        return nativeInstance.findOne(callback, prefetchNode, postOrder);
      }
    };
  }
});
const VxTree = VxTreeImpl;
const VxPopupSymbol = Symbol.for("PopupInstance");
const NativePopupEvents = ["open", "close", "cancel-open", "cancel-close"];
const defaultPopupProps = {
  /**
   * 팝업의 상태를(열림/닫힘) 나타냅니다.
   * @type {boolean}
   * @default false
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * 모달 팝업 표시 여부입니다.
   * @type {boolean}
   * @default false
   */
  modal: {
    type: Boolean,
    default: false
  },
  /**
   * content 기준으로 정렬할 방향을 지정합니다.
   * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center', 'center' 입니다.
   * @type {AnchorAlign}
   */
  contentAlign: {
    type: String
  },
  /**
   * 팝업의 좌표 시스템을 설정합니다.
   * - 'global' 팝업을 전역 좌표계에 배치합니다.
   * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
   * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
   * @type {'global' | 'relative' | 'none'}
   * @default relative
   */
  coordinateMode: {
    type: String
  },
  /**
   * 팝업이 열릴 상대적 위치(HTMLElement, DomSelector)를 지정합니다.
   * 설정하지 않으면 기본적으로 최상위 노드(body)가 됩니다.
   */
  anchor: {
    type: [String, HTMLElement]
  },
  /**
   * anchor 기준으로 정렬할 방향을 지정합니다.
   * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center' 입니다
   * @type {AnchorAlign}
   */
  anchorAlign: {
    type: String
  },
  /**
   * 해당 크기 만큼 팝업 X 위치가 변경됩니다. 단위는 픽셀입니다.
   * @type {number}
   * default: 0
   */
  offsetX: {
    type: Number,
    default: 0
  },
  /**
   * 해당 크기만큼 팝업 Y 위치가 변경됩니다. 단위는 픽셀입니다.
   * @type {number}
   * @default 0
   */
  offsetY: {
    type: Number,
    default: 0
  },
  /**
   * 컨텐츠가 뷰포트 바깥 영역으로 나감을 방지합니다.
   * 만일 화면크기가 뷰표트 크기보다 클땐 왼쪽상단을 기준으로 맞춥니다.
   * @default false
   */
  lockOutside: {
    type: Boolean,
    default: false
  },
  /**
   * z-index 항상 최상위 위치에 팝업을 배치합니다.
   * @default false
   */
  alwaysOnTop: {
    type: Boolean,
    default: false
  },
  /**
   * 다중 팝업이 열려있을때  z-index 우선순위를 정의합니다. 큰 수일수록 최상대에 배치합니다.
   * @type {number}
   * @default 0
   */
  priority: {
    type: Number,
    default: 0
  },
  /**
   * 중첩된 팝업 구조를 관리합니다.
   * - 일반적인 경우, 팝업이 닫히면 연관된(자식) 팝업도 함께 닫힙니다.
   * - 단, `coordinateMode` 값이 `relative` 인 경우에는 값이 `false`여도 해당 팝업은 중첩된 팝업으로 처리됩니다.
   * @default true
   */
  nest: {
    type: Boolean,
    default: true
  },
  /**
   * 팝업 열릴때 자동으로 팝업 컨텐츠에 포커스를 설정합니다.
   * @default true
   */
  autoFocus: {
    type: Boolean,
    default: true
  },
  /**
   * 외부 영역 클릭시 자동 닫기 방지위한 유효영역 설정합니다.
   */
  hitAreas: {
    type: Array,
    default: () => []
  },
  /**
   * 외부영역 다운시 팝업을 닫습니다.
   * @default false
   */
  closeOnOutsideDown: {
    type: Boolean,
    default: false
  },
  /**
   * ESC 입력시 팝업을 닫습니다.
   * @default false
   */
  closeOnEscape: {
    type: Boolean,
    default: false
  },
  /**
   * 팝업 컨텐츠 영역에 정의된 이벤트 발생시 팝업을 닫습니다.
   * @default ['close']
   */
  closeOnEvents: {
    type: Array,
    default: ["close"]
  },
  /**
   * 팝업 열릴때 지연 시간(ms)입니다.
   */
  openDelay: {
    type: Number,
    default: 0
  },
  /**
   * 팝업 닫힐때 지연 시간(ms)입니다.
   */
  closeDelay: {
    type: Number,
    default: 0
  },
  /**
   * 앵커 엘리먼트의 'click' 또는 'over' 이벤트 발생시 자동으로 팝업 엽니다.
   */
  openOnTrigger: {
    type: String
  },
  /**
   * 렌더 타이밍, 'true' 이면 팝업 열리기전에 렌더링 합니다.
   * @internal 사용하지 마세요
   */
  usePreRender: {
    type: Boolean,
    default: false
  }
};
const VxPopupImpl = defineComponent({
  name: "VxPopup",
  emits: [...NativePopupEvents, "update:modelValue"],
  props: {
    ...defaultPopupProps
  },
  setup(props, context) {
    const instance = getCurrentInstance();
    const nativeInstance = new Popup();
    const isFirst = ref(false);
    if (!props.usePreRender) {
      const unwatch = watch(
        () => props.modelValue,
        (value) => {
          if (value) {
            isFirst.value = true;
            nextTick().then(() => unwatch());
          }
        },
        { immediate: true }
      );
    }
    useModel(props, "modelValue", nativeInstance, "isOpened", NativePopupEvents);
    bindNative(nativeInstance, props);
    mountNative(instance.proxy, nativeInstance, {
      events: NativePopupEvents,
      options: {
        ...props,
        content: new Promise((resolve, reject) => {
          const child = () => instance.proxy.$el.firstElementChild;
          onMounted(() => {
            if (props.usePreRender || isFirst.value) {
              resolve(child());
            } else {
              const unwatch = watch(
                isFirst,
                (value) => {
                  if (value) {
                    if (!child()) {
                      nextTick().then(() => {
                        if (!child()) {
                          reject("Failed to generate content in the expected timeframe. ");
                        } else {
                          resolve(child());
                        }
                      });
                    } else {
                      resolve(child());
                    }
                    unwatch();
                  }
                },
                { immediate: true, flush: "post" }
              );
            }
          });
        })
      }
    });
    provide(VxPopupSymbol, nativeInstance);
    useRender(() => {
      if (!props.usePreRender && !isFirst.value) {
        return h("template");
      }
      return h("template", context.slots.default());
    });
    nativeInstance.addEventListener("trigger-open", () => {
      isFirst.value = true;
    });
    function opening(callback) {
      nativeInstance.opening(callback);
      return this;
    }
    function opened(callback) {
      nativeInstance.opened(callback);
      return this;
    }
    function closing(callback) {
      nativeInstance.closing(callback);
      return this;
    }
    function closed(callback) {
      nativeInstance.closed(callback);
      return this;
    }
    function open(data) {
      isFirst.value = true;
      nativeInstance.open(data);
      return this;
    }
    function close(data) {
      nativeInstance.close(data);
      return this;
    }
    function toggle(data) {
      return nativeInstance.isOpened ? close(data) : open(data);
    }
    function invalidate() {
      nativeInstance.invalidate();
    }
    function destroy() {
      nativeInstance.destroy();
    }
    return {
      nativeInstance,
      get isOpened() {
        return nativeInstance.isOpened;
      },
      opening,
      opened,
      closing,
      closed,
      open,
      close,
      toggle,
      invalidate,
      destroy
    };
  }
});
const VxPopup = VxPopupImpl;
const VxSuggestItem = {
  name: "VxSuggestItem",
  props: {
    ...makeItemProps()
  },
  setup(props) {
    const state = reactive(props.initState);
    return {
      state
    };
  },
  methods: {
    genLabel() {
      if (this.$slots.suggest) {
        return this.$slots.suggest(this.state);
      }
      return h("span", {
        innerHTML: this.state.html
      });
    },
    genContent() {
      if (this.state.item) {
        return [this.genLabel()];
      }
      return [];
    }
  },
  render() {
    return h("div", this.genContent());
  },
  prepare(state) {
    for (const key in state) {
      if (key !== "element") {
        this.state[key] = state[key];
      }
    }
  }
};
const VxSuggestStatus = defineComponent({
  name: "VxSuggestStatus",
  props: {
    slotName: {
      type: String
    }
  },
  setup(props, context) {
    const slot = context.slots[props.slotName];
    const provider = inject(VxAutocompleteSymbol);
    useRender(() => {
      return h("div", slot(provider.inputValue.value));
    });
  }
});
const VxAutocompleteSymbol = Symbol.for("AutocompleteInstance");
const NativeAutocompleteEvents = [
  ...NativeSelectableEvents,
  "suggest-opening",
  "suggest-open",
  "suggest-closing",
  "suggest-close",
  "suggest-select",
  "suggest-caret-change",
  "value-change",
  "input",
  "keydown",
  "keyup",
  "focusin",
  "focusout"
];
const defaultInputProps = {
  /**
   * 입력 필드의 레이블 텍스트입니다.
   */
  label: {
    type: String,
    default: ""
  },
  /**
   * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
   */
  placeholder: {
    type: String
  },
  /**
   * 표시될 아이템의 값이 결정되는 필드를 정의합니다.
   * 이 값이 문자열일 경우, 아이템 객체의 해당 키의 값(item[labelField])이 표시되고
   * 콜백일 경우 (item: T) => string 반환된 문자열이 값이 표시됩니다.
   */
  labelField: {
    type: [String, Function],
    default: null
  },
  /**
   * 아이템 선택시 자동으로 제안 목록 닫을지를 정의합니다. 기본값음 true 입니다.
   * @defaultValue true
   */
  closeOnSelect: {
    type: Boolean,
    default: true
  },
  /**
   * 포커스 아웃시 자동으로 제안 목록 닫을지를 정의합니다. 기본값은 true 입니다.
   * @defaultValue true
   */
  closeOnFocusOut: {
    type: Boolean,
    default: true
  },
  /**
   * 외부영역 다운시 자동으로 제안 목록 닫을지를 정의합니다. 기본값은 true 입니다.
   * @defaultValue true
   */
  closeOnOutsideDown: {
    type: Boolean,
    default: true
  },
  /**
   * 입력 필드에 현재 입력된 값입니다.
   */
  inputValue: {
    type: String,
    default: ""
  },
  /**
   * 최소 문자 입력 개수입니다. 최소 개수 만족시 제안목록이 활성화 합니다.
   */
  minChar: {
    type: Number,
    default: 0
  },
  /**
   * 입력필드에 값이 있을때 초기화 버튼 활성화 여부입니다.
   * @defaultValue false
   */
  clearable: {
    type: Boolean,
    default: false
  },
  /**
   * 사용자가 특정 키를 눌렀을 때 값을 입력하는 코드 배열입니다.
   * 기본 키코드는 [9, 13]으로, 이는 각각 "Tab", "Enter" 입니다.
   */
  delimiterOnKeys: {
    type: Array,
    default: [9, 13]
  },
  /**
   * 팝업의 좌표 시스템을 설정합니다.
   * - 'global' 팝업을 전역 좌표계에 배치합니다.
   * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
   * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
   * 기본 값은 'relative' 입니다.
   */
  coordinateMode: {
    type: String,
    default: "relative"
  }
};
const defaultSuggestProps = {
  /**
   * 키 입력 시 해당 입력 값에 일치하는 데이터를 생성하는 데이터 소스를 정의합니다.
   * Array<T>, Promise<Array<T>>, 콜백 함수 (keyword: string) => Array<T>|Promise<Array<T>> 중 하나의 형태를 가질 수 있습니다.
   * 아래의 예제는 이 콜백 함수가 어떻게 작동하는지를 보여줍니다.
   * ```typescript
   *  (keyword: string) => {
   *      return fetch(`https://api.example.com/data?keyword=${encodeURIComponent(keyword)}`, {
   *          method: 'GET'
   *      });
   *  };
   * ```
   */
  suggestSource: {
    type: [Array, Function, Promise]
  },
  /**
   * 제안 목록에 표시될 아이템 개수입니다.
   */
  suggestCount: {
    type: Number,
    default: 6
  },
  /**
   * @private
   */
  hookSuggestItems: {
    type: Function,
    default: (items) => {
      if (!isProxy(items)) {
        items = reactive(items);
      }
      return items;
    }
  }
};
const defaultAutocompleteProps = {
  /**
   * 입력필드에 입력된 값을 나타냅니다.
   */
  modelValue: {
    type: String
  },
  /**
   * 제안 목록에서 선택했던 아이템입니다.
   */
  selectedItem: {
    type: [String, Number, Object]
  }
};
function makeDefaultMethods(instance) {
  return {
    focus() {
      instance.focus();
    },
    blur() {
      instance.blur();
    },
    openSuggest(value) {
      return instance.openSuggest(value);
    },
    closeSuggest() {
      instance.closeSuggest();
    },
    clear() {
      instance.clear();
    }
  };
}
const VxAutocompleteImpl = defineComponent({
  name: "VxAutocomplete",
  props: {
    ...defaultInputProps,
    ...defaultSuggestProps,
    ...defaultAutocompleteProps
  },
  emits: [...NativeAutocompleteEvents, "update:modelValue", "update:selectedItem"],
  setup(props) {
    const instance = getCurrentInstance();
    const nativeInstance = new Autocomplete();
    const suggestItemFactory = ComponentWrapper.factory(instance, VxSuggestItem, ItemTemplateWrapper);
    const {
      itemTemplate: suggestItemTemplate,
      hookRenderElement: hookRenderSuggestElement,
      hookFreeElement: hookFreeSuggestElement
    } = useItemTemplate(nativeInstance.suggestList, suggestItemFactory);
    bindNative(nativeInstance, props);
    mountNative(instance.proxy, nativeInstance, {
      events: NativeAutocompleteEvents,
      options: {
        ...props,
        suggestItemTemplate,
        hookRenderSuggestElement,
        hookFreeSuggestElement
      }
    });
    const inputValue = useModel(props, "modelValue", nativeInstance, "inputValue", "value-change");
    useModel(props, "selectedItem", nativeInstance, "selectedItem", "selection-change");
    useRender(() => h("div", { class: "x-autocomplete-wrap" }));
    provide(VxAutocompleteSymbol, {
      instance: nativeInstance,
      get inputValue() {
        return inputValue;
      }
    });
    useStateTemplate(instance, nativeInstance);
    return {
      nativeInstance,
      ...makeDefaultMethods(nativeInstance)
    };
  }
});
function useStateTemplate(componentInstance, nativeInstance) {
  const { nodata, progress } = componentInstance.slots;
  if (nodata || progress) {
    const stateFactory = ComponentWrapper.factory(componentInstance, VxSuggestStatus, ComponentWrapper);
    onMounted(() => {
      if (nodata) {
        nativeInstance.suggestNodataStateTemplate = stateFactory({ slotName: "nodata" }).element;
      }
      if (progress) {
        nativeInstance.suggestProgressStateTemplate = stateFactory({ slotName: "progress" }).element;
      }
    });
  }
}
const VxAutocomplete = VxAutocompleteImpl;
const VxChip = defineComponent({
  name: "VxChip",
  props: {
    item: {
      type: [Object, String, Number]
    },
    nativeInstance: {
      type: Object
    }
  },
  setup(props) {
    const state = ref({});
    const slotProps = computed(() => {
      const remove = () => props.nativeInstance.removeSelectedItem(props.item);
      return { item: props.item, label: props.nativeInstance.itemToLabel(props.item), remove };
    });
    return {
      state,
      slotProps
    };
  },
  methods: {
    genLabel() {
      return h("span", { class: "x-label" }, this.slotProps.label);
    },
    genRemover() {
      return h("button", {
        class: "x-remover",
        onMousedown: (e) => {
          e.preventDefault();
        },
        onClick: (e) => {
          e.preventDefault();
        }
      });
    },
    genContent() {
      if (this.$slots.chip) {
        return this.$slots.chip(this.slotProps);
      }
      if (this.slotProps.item) {
        return [this.genLabel(), this.genRemover()];
      }
      return [this.genRemover()];
    }
  },
  render() {
    return h("div", { class: "x-select-chip" }, this.genContent());
  }
});
const VxTokenizerSymbol = Symbol.for("TokenizerInstance");
const NativeTokenizerEvents = [...NativeAutocompleteEvents, "suggest-add", "suggest-remove", "suggest-duplicate"];
const defaultTokenizerProps = {
  /**
   * 사용자는 제안 목록에서 값을 선택해서 추가하는 것 외에도,
   * 입력 필드에 직접 값을 입력하여 속성 `delimiterOnKeys` 따라 값을 추가할 수 있습니다.
   * `delimiterOnKeys`의 기본 키코드는 [9, 13]으로, 이는 각각 "Tab", "Enter" 입니다.
   */
  allowInputValue: {
    type: Boolean,
    default: false
  }
};
const VxTokenizerImpl = defineComponent({
  name: "VxTokenizer",
  emits: [...NativeTokenizerEvents, "update:modelValue", "update:selectedItem", "update:selectedItems", "update:selectedValue", "update:inputValue"],
  props: {
    ...defaultInputProps,
    ...defaultSuggestProps,
    ...defaultSelectableProps,
    ...defaultTokenizerProps,
    /**
     * 사용자가 여러 항목을 선택할 수 있는지 여부입니다.
     *
     */
    allowMultiple: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const instance = getCurrentInstance();
    const nativeInstance = new Tokenizer();
    const suggestItemFactory = ComponentWrapper.factory(instance, VxSuggestItem, ItemTemplateWrapper);
    const chipFactory = ComponentWrapper.factory(instance, VxChip, ItemTemplateWrapper);
    const {
      itemTemplate: suggestItemTemplate,
      hookRenderElement: hookRenderSuggestElement,
      hookFreeElement: hookFreeSuggestElement
    } = useItemTemplate(nativeInstance.suggestList, suggestItemFactory);
    bindNative(nativeInstance, props);
    mountNative(instance.proxy, nativeInstance, {
      events: NativeTokenizerEvents,
      options: {
        ...props,
        chipTemplate: (item, index) => {
          const wrapper = chipFactory({ item, nativeInstance });
          return wrapper.element;
        },
        suggestItemTemplate,
        hookRenderSuggestElement,
        hookFreeSuggestElement
      }
    });
    const inputValue = useModel(props, "inputValue", nativeInstance, "inputValue", "value-change");
    useSelectableModels(props, nativeInstance);
    useRender(() => h("div", { class: "x-tokenizer-wrap" }));
    provide(VxAutocompleteSymbol, {
      instance: nativeInstance,
      get inputValue() {
        return inputValue;
      }
    });
    provide(VxTokenizerSymbol, {
      instance: nativeInstance,
      get inputValue() {
        return inputValue;
      }
    });
    useStateTemplate(instance, nativeInstance);
    return {
      nativeInstance,
      ...makeDefaultMethods(nativeInstance)
    };
  }
});
const VxTokenizer = VxTokenizerImpl;
const VxTextChip = defineComponent({
  name: "VxTextChip",
  props: {
    item: {
      type: [String, Number, Object]
    },
    nativeInstance: {
      type: Object
    }
  },
  setup(props) {
    const label = computed(() => props.nativeInstance.itemToLabel(props.item));
    return {
      label
    };
  },
  methods: {
    genLabel() {
      return h("span", { class: "x-label" }, this.label);
    },
    genContent() {
      if (this.item) {
        if (this.$slots.chip) {
          return this.$slots.chip({
            item: this.item,
            label: this.label
          });
        }
        return [this.genLabel()];
      }
      return [];
    }
  },
  render() {
    return h("div", { class: "x-select-text" }, this.genContent());
  }
});
const VxComboboxSymbol = Symbol.for("ComboboxInstance");
const { suggestSource, ...otherSuggestProps } = defaultSuggestProps;
const defaultComboboxProps = {
  /**
   * 표시되는 아이템의 배열입니다.
   * 'labelField' 속성을 이용하여 표시되는 텍스트를 결정합니다.
   */
  items: {
    type: Array
  },
  /**
   * 사용자가 입력한 문자열에 따라 콤보박스에서 표시되는 항목을 필터링할 수 있는지 여부입니다.
   */
  filterable: {
    type: Boolean,
    default: false
  },
  /**
   * 표시된 아이템의 삭제버튼 활성화 여부입니다.
   */
  chipRemovable: {
    type: Boolean,
    default: false
  }
};
const VxComboboxImpl = defineComponent({
  name: "VxCombobox",
  emits: [...NativeTokenizerEvents, "update:modelValue", "update:selectedItem", "update:selectedItems", "update:selectedValue", "update:inputValue"],
  props: {
    ...defaultInputProps,
    ...otherSuggestProps,
    ...defaultSelectableProps,
    ...defaultComboboxProps
  },
  setup(props) {
    const instance = getCurrentInstance();
    const nativeInstance = new Combobox();
    const suggestItemFactory = ComponentWrapper.factory(instance, VxSuggestItem, ItemTemplateWrapper);
    const chipFactory = ComponentWrapper.factory(instance, VxChip, ItemTemplateWrapper);
    const singleChipFactory = ComponentWrapper.factory(instance, VxTextChip, ItemTemplateWrapper);
    const {
      itemTemplate: suggestItemTemplate,
      hookRenderElement: hookRenderSuggestElement,
      hookFreeElement: hookFreeSuggestElement
    } = useItemTemplate(nativeInstance.suggestList, suggestItemFactory);
    bindNative(nativeInstance, props);
    mountNative(instance.proxy, nativeInstance, {
      events: NativeAutocompleteEvents,
      options: {
        ...props,
        chipTemplate: (item, index) => {
          const wrapper = chipFactory({ item, nativeInstance });
          return wrapper.element;
        },
        singleChipTemplate: (item, index) => {
          const wrapper = singleChipFactory({ item, nativeInstance });
          return wrapper.element;
        },
        suggestItemTemplate,
        hookRenderSuggestElement,
        hookFreeSuggestElement
      }
    });
    useSelectableModels(props, nativeInstance);
    useModel(props, "inputValue", nativeInstance, "inputValue", "value-change");
    provide(VxComboboxSymbol, {});
    return {
      nativeInstance,
      ...makeDefaultMethods(nativeInstance)
    };
  },
  render() {
    return h("div", { class: "x-combobox-wrap" });
  }
});
const VxCombobox = VxComboboxImpl;
const VxDateChooserItem = defineComponent({
  name: "VxDateChooserItem",
  props: {
    ...makeItemProps()
  },
  setup(props) {
    const state = reactive(props.initState);
    return {
      state
    };
  },
  methods: {
    genContent() {
      const children = [];
      if (this.$slots.default && this.state.item) {
        children.push(this.$slots.default(this.state));
      }
      return children;
    }
  },
  render() {
    return h("div", this.genContent());
  },
  prepare(state) {
    for (const key in state) {
      if (key !== "element") {
        this.state[key] = state[key];
      }
    }
  }
});
const VxDateChooserSymbol = Symbol.for("DateChooserInstance");
const NativeDateChooserEvents = ["state-change", "item-down", "item-click", "selection-changing", "selection-change"];
const defaultDateChooserProps = {
  modelValue: {
    type: [Date, Object]
  },
  /**
   * 'day', 'month', 'year' 표시할 지를 정의합니다.
   * 기본값은 'day' 입니다.
   */
  type: {
    type: String,
    default: "day"
  },
  /**
   * 오늘 날짜를 정의합니다.
   */
  today: {
    type: Date,
    default: /* @__PURE__ */ new Date()
  },
  /**
   * 헤더에 표시되는 날짜의 형식입니다.
   * ```typescript
   * dateChooser.headerPatterns = {day : 'YYYY.MM', month: 'YYYY',  year:'{YYYY} ~ {YYYY}'}
   * ```
   */
  headerPatterns: {
    type: Object
  },
  /**
   * 표시되는 날짜의 형식입니다.
   * `DateChooser.setFormatter` 설정된 포멧터에 의해 결정됩니다.
   * ```typescript
   * dateChooser.pattern = {day : 'YYYY.MM.DD', month: 'YYYY.MM.DD',  year:'YYYY'}
   * ```
   */
  patterns: {
    type: Object
  },
  /**
   * 사용자가 날짜 범위를 선택할 수 있는지 여부입니다.
   */
  allowRange: {
    type: Boolean,
    default: false
  },
  /**
   * 선택 가능한 날짜를 정의합니다.
   * ```typescript
   * dateChooser.allowDates = (date: Date) => boolean {}
   * ```
   */
  allowDates: {
    type: Function
  },
  /**
   * 선택된 날짜 범위를 정의합니다.
   * ```typescript
   * dateChooser.selectedRange = [new Date('2020/1/1'), new Date('2020/1/31')]
   * ```
   */
  selectedRange: {
    type: Array
  },
  /**
   * 선택된 날짜를 정의합니다.
   * 날짜는 Date 객체로 반환납니다.
   * ```typescript
   * dateChooser.selectedDate = new Date('2020/1/1');
   * ```
   */
  selectedDate: {
    type: Date
  },
  /**
   * 선택된 날짜를 정의합니다.
   * 문자열의 형식는 `DateChooser.setFormatter` 통해 설정된 포맷터와 'pattern' 속성에 의해 생성됩니다.
   */
  selectedDateString: {
    type: String
  }
};
const VxDateChooserImpl = defineComponent({
  name: "VxDateChooser",
  emits: [...NativeDateChooserEvents, "update:modelValue", "update:selectedDate", "update:selectedDateString", "update:selectedRange"],
  props: {
    ...defaultDateChooserProps
  },
  setup(props) {
    const instance = getCurrentInstance();
    const nativeInstance = new DateChooser();
    let options = null;
    if (instance.slots.default) {
      const itemFactory = ComponentWrapper.factory(instance, VxDateChooserItem, ItemTemplateWrapper);
      options = { ...props, ...useItemTemplate(nativeInstance, itemFactory) };
    } else {
      options = props;
    }
    bindNative(nativeInstance, props);
    mountNative(instance.proxy, nativeInstance, { events: NativeDateChooserEvents, options });
    useModel(props, "modelValue", nativeInstance, props.allowRange ? "selectedRange" : "selectedDate", "selection-change");
    useModel(props, "selectedDate", nativeInstance, "selectedDate", "selection-change");
    useModel(props, "selectedDateString", nativeInstance, "selectedDateString", "selection-change");
    if (props.allowRange) {
      useModel(props, "selectedRange", nativeInstance, "selectedRange", "selection-change");
    }
    provide(VxDateChooserSymbol, {});
    return {
      nativeInstance,
      getState() {
        return this.nativeInstance.state;
      },
      clear() {
        return this.nativeInstance.clear();
      },
      reset() {
        return this.nativeInstance.reset();
      },
      setCurrentDate(date) {
        return this.nativeInstance.setCurrentDate(date);
      }
    };
  },
  render() {
    return h("div", { class: "x-date-chooser-wrap" });
  }
});
const VxDateChooser = VxDateChooserImpl;
const VxDatePickerSymbol = Symbol.for("DatePickerInstance");
const NativeDatePickerEvents = [
  "state-change",
  "selection-changing",
  "selection-change",
  "date-picker-opening",
  "date-picker-closing",
  "date-picker-open",
  "date-picker-close",
  "date-picker-select"
];
const defaultDatePickerProps = {
  /**
   * 입력 필드의 레이블 텍스트입니다.
   */
  label: {
    type: String,
    default: ""
  },
  /**
   * 입력필드에 값이 있을때 초기화 버튼 활성화 여부입니다.
   */
  clearable: {
    type: Boolean,
    default: false
  },
  /**
   * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
   */
  placeholder: {
    type: String
  },
  /**
   * 타이틀에 표시되는 날짜의 형식입니다.
   * `DateChooser.setFormatter` 설정된 포멧터에 의해 결정됩니다.
   * ```typescript
   * datePicker.titlePatterns = {day : 'YYYY.MM.DD', month: 'YYYY.MM',  year:'YYYY'}
   * ```
   */
  titlePatterns: {
    type: Object
  },
  /**
   * 팝업의 좌표 시스템을 설정합니다.
   * - 'global' 팝업을 전역 좌표계에 배치합니다.
   * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
   * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
   * 기본 값은 'relative' 입니다.
   */
  coordinateMode: {
    type: String,
    default: "relative"
  }
};
const VxDatePickerImpl = defineComponent({
  name: "VxDatePicker",
  props: {
    ...defaultDateChooserProps,
    ...defaultDatePickerProps
  },
  emits: [...NativeDatePickerEvents, "update:modelValue", "update:selectedDate", "update:selectedDateString", "update:selectedRange"],
  setup(props) {
    const instance = getCurrentInstance();
    const nativeInstance = new DatePicker();
    let options = null;
    if (instance.slots.default) {
      const itemFactory = ComponentWrapper.factory(instance, VxDateChooserItem, ItemTemplateWrapper);
      const { itemTemplate: dateChooserItemTemplate, hookRenderElement: dateChooserHookRenderElement, hookFreeElement: dateChooserHookFreeElement } = useItemTemplate(nativeInstance, itemFactory);
      options = { ...props, dateChooserItemTemplate, dateChooserHookRenderElement, dateChooserHookFreeElement };
    } else {
      options = props;
    }
    bindNative(nativeInstance, props);
    mountNative(instance.proxy, nativeInstance, { events: NativeDatePickerEvents, options });
    useModel(props, "modelValue", nativeInstance, props.allowRange ? "selectedRange" : "selectedDate", "selection-change");
    useModel(props, "selectedDate", nativeInstance, "selectedDate", "selection-change");
    useModel(props, "selectedDateString", nativeInstance, "selectedDateString", "selection-change");
    if (props.allowRange) {
      useModel(props, "selectedRange", nativeInstance, "selectedRange", "selection-change");
    }
    provide(VxDatePickerSymbol, {});
    return {
      nativeInstance,
      clear() {
        this.nativeInstance.clear();
      },
      reset() {
        this.nativeInstance.reset();
      },
      setCurrentDate(date) {
        this.nativeInstance.setCurrentDate(date);
      },
      getState() {
        return this.nativeInstance.getState();
      },
      open() {
        return this.nativeInstance.open();
      },
      close(reason) {
        return this.nativeInstance.close();
      }
    };
  },
  render() {
    return h("div", { class: "x-date-picker-wrap" });
  }
});
const VxDatePicker = VxDatePickerImpl;
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VxAutocomplete,
  VxCombobox,
  VxDateChooser,
  VxDatePicker,
  VxList,
  VxPopup,
  VxTokenizer,
  VxTree
}, Symbol.toStringTag, { value: "Module" }));
const install = (app) => {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};
export {
  ArrayList,
  Autocomplete,
  Combobox,
  DateChooser,
  DatePicker,
  DragManager,
  HierarchyList,
  List,
  Popup,
  ProgressPromise,
  Tokenizer,
  Tree,
  VxAutocomplete,
  VxAutocompleteSymbol,
  VxCombobox,
  VxComboboxSymbol,
  VxDateChooser,
  VxDateChooserSymbol,
  VxDatePicker,
  VxDatePickerSymbol,
  VxList,
  VxListSymbol,
  VxPopup,
  VxPopupSymbol,
  VxTokenizer,
  VxTokenizerSymbol,
  VxTree,
  VxTreeSymbol,
  install as default
};
//# sourceMappingURL=vrix.vue.esm.js.map
