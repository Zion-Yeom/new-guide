import { getCurrentInstance as ne, onMounted as pe, onUnmounted as Te, isReactive as ai, watch as de, render as ut, defineComponent as U, createVNode as ci, ref as Ce, computed as V, toRaw as $e, h as W, nextTick as mt, inject as ye, shallowRef as He, triggerRef as Ge, provide as ft } from "vue";
/*!
 * tachyon.js v1.1.2
 */
function N(...o) {
  const e = o[0];
  let t = o.length, i = !0;
  typeof o[t - 1] == "boolean" && (i = o[t - 1], t -= 1);
  for (let s = 1; s < t; s++) {
    let n = o[s];
    Object.getOwnPropertyNames(n).forEach((l) => {
      (i || !e.hasOwnProperty(l)) && Object.defineProperty(e, l, Object.getOwnPropertyDescriptor(n, l));
    });
  }
  return e;
}
function H(o, e, ...t) {
  if (e in o)
    return o[e].apply(o, t);
}
function ee(o, ...e) {
  return o instanceof Function ? o.apply(null, e) : o;
}
function k(o, e, t) {
  return isNaN(e) || (o = Math.max(o, e)), isNaN(t) || (o = Math.min(o, t)), o;
}
const di = gt((o) => o && (o.indexOf(".") !== -1 && o.split(".") || [o]));
function Fe(o) {
  if (!Array.isArray(o)) {
    const e = typeof o;
    switch (e) {
      case "number":
        o += "";
      case "string":
        o = di(o);
        break;
      default:
        throw new TypeError(`path must be a Number/String/Array, received ${e} instead.`);
    }
  }
  return o;
}
function Oe(o, e) {
  e = Fe(e);
  const t = e && e.length || 0;
  let i = o;
  for (let s = 0; s < t; s++) {
    let n = e[s];
    if (n in i)
      i = i[n];
    else
      return null;
  }
  return i;
}
function ui(o, e, t) {
  e = Fe(e);
  const i = e && e.length || 0;
  let s = o, n = 0;
  for (; n < i - 1; n++) {
    let r = e[n];
    if (r in s)
      s = s[r];
    else {
      s = null;
      break;
    }
  }
  return s && i > 0 && s[e[n]] !== t ? (s[e[n]] = t, !0) : !1;
}
function Re(o, e = "children") {
  let t = [], i = o[e], s = Array.isArray(i) && i.length || 0;
  if (s > 0)
    for (let n = 0; n < s; n++)
      t = t.concat(Re(i[n], e));
  else
    t.push(o);
  return t;
}
function gt(o) {
  let e = {};
  return (t) => {
    let i = e[t];
    return i === void 0 && (e[t] = i = o(t)), i;
  };
}
const we = /* @__PURE__ */ (() => {
  const o = /* @__PURE__ */ new WeakMap();
  return (e, t) => {
    let i = o.get(e);
    i && (window.cancelAnimationFrame(i), o.delete(e)), i = window.requestAnimationFrame(() => {
      e.apply(null, t), o.delete(e);
    }), o.set(e, i);
  };
})();
var G = {
  /*----------------------------
   *  Styles
   *----------------------------*/
  styles: {
    /**
     * 배경 색.
     */
    backgroundColor: "#FFFFFF",
    /**
     * 기본 폰트
     */
    font: "14px Arial",
    /**
     * 기본 폰트 색
     */
    color: "RGB(73,105,131)",
    /**
     * 셀 텍스트 정렬
     */
    textAlign: "left",
    /**
     * 셀 수직 정렬
     */
    verticalAlign: "center",
    /**
     * 기본 행 크기
     */
    rowHeight: 30,
    /**
     * 헤더 기본 행 크기
     */
    headerRowHeight: 30,
    /**
     * 셀 선택 배경색
     */
    cellSelectionColor: "RGB(183,210,222)",
    /**
     * 셀 오버 배경색
     */
    cellOverColor: "RGBA(215,237,247,0.5)",
    /**
     * 셀 선택 텍스트 색
     */
    textSelectionColor: "RGB(73,105,131)",
    /**
     * 셀 오버 텍스트 색
     */
    textOverColor: "RGB(73,105,131)",
    /**
     * 행 배경 색
     */
    rowColors: ["#F2F5F8"],
    /**
     * @type {number}
     */
    cellPadding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 2
    },
    /**
     * 행 구분선
     */
    rowLine: {
      width: 1,
      color: "#B3B4B6",
      dashed: []
    },
    /**
     * 컬럼 구분선
     */
    columnLine: {
      width: 1,
      color: "#B3B4B6",
      dashed: []
    },
    /**
     * 고정 구분선
     */
    frozenLine: {
      width: 1,
      color: "#000000",
      dashed: []
    },
    /**
     * 캐럿
     */
    caretLine: {
      width: 2,
      color: "RGB(52,102,124)",
      dashed: []
    },
    /**
     * 헤더 행 구분선
     */
    headerRowLine: {
      width: 1,
      color: "RGBA(72,84,101, 0.7)",
      dashed: []
    },
    /**
     * 헤더 행 구분선
     */
    headerColumnLine: {
      width: 1,
      color: "RGBA(72,84,101, 0.7)",
      dashed: []
    }
  },
  cacheMode: "hidden",
  editOnKeys: `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"Â£$%^&*()_+-=[];'#,./|<>?:@~{} `,
  /*----------------------------
   *  itemRenderer
   *----------------------------*/
  itemRenderer: null,
  /*----------------------------
   *  headerRenderer
   *----------------------------*/
  headerRenderer: null,
  /*----------------------------
   *  itemEditor
   *----------------------------*/
  itemEditor: null,
  /*----------------------------
   *  treeItemRenderer
   *----------------------------*/
  treeItemRenderer: null,
  /*----------------------------
   *  groupingItemRenderer
   *----------------------------*/
  groupingItemRenderer: null
};
const _ = {
  //화면갱신
  DISPLAY_UPDATE: 2,
  //아이템 목록 변경
  ITEMS_CHANGE: 4,
  //컬럼 목록 변경
  COLUMNS_CHANGE: 8,
  //화면에 보이는 컬럼 변경
  VISIBLE_COLUMNS_CHANGE: 16,
  //아이템 갱신
  ITEM_UPDATE: 32,
  //컬럼 갱신
  COLUMN_UPDATE: 64,
  //컬럼 비지블 갱신
  COLUMN_VISIBLE: 128,
  //TODO change 보다 update ?????
  //수직 스크롤 변경
  VERTICAL_SCROLL_CHANGE: 256,
  //스평 스크롤 변경
  HORIZONTAL_SCROLL_CHANGE: 512,
  //선택 변경
  SELECTION_CHANGE: 1024,
  //캐럿 변경
  CARET_CHANGE: 2048,
  //아이템 렌더러 변경
  RENDERER_CHANGE: 4096,
  //스타일 변경
  STYLES_CHANGE: 8192,
  ROW_HEIGHT_CHANGE: 16384,
  GROUP_SIZE_CHANGE: 32768,
  //전체 갱신
  ALL: 4294967295
};
class A {
  /**
   * 두점 사이의 거리를 구합니다.
   * @param p1
   * @param p2
   * @returns {number}
   */
  static distance(e, t) {
    return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
  }
  constructor(e, t) {
    this.setValues(e, t);
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * x, y 좌표를 설정합니다.
   * @param x
   * @param y
   * @returns {Point}
   */
  setValues(e, t) {
    return this.x = e || 0, this.y = t || 0, this;
  }
  /**
   * 객체의 복사본을 만듭니다.
   * @returns {Point}
   */
  clone() {
    return new A(this.x, this.y);
  }
  /**
   * x, y좌표를 문자열로 반환합니다.
   * @returns {string}
   */
  toString() {
    return "[Point (x=" + this.x + " y=" + this.y + ")]";
  }
}
class O {
  constructor(e, t, i, s) {
    this.setValues(e, t, i, s);
  }
  /**
   * 사각형의 왼쪽 x 좌표 입니다.
   * @returns {number}
   */
  get left() {
    return this.x;
  }
  set left(e) {
    this.width -= e - this.x, this.x = e;
  }
  /**
   * 사각형의 오른쪽 x 좌표 입니다.
   * @returns {number}
   */
  get right() {
    return this.x + this.width;
  }
  set right(e) {
    this.width = e - this.x;
  }
  /**
   * 사각형의 위쪽 y 좌표 입니다.
   * @returns {number}
   */
  get top() {
    return this.y;
  }
  set top(e) {
    this.height -= e - this.y, this.y = e;
  }
  /**
   * 사각형의 아래쪽 y 좌표 입니다.
   * @returns {number}
   */
  get bottom() {
    return this.y + this.height;
  }
  set bottom(e) {
    this.height = e - this.y;
  }
  /**
   * x, y, width, height 속성을 설정합니다.
   * @param x
   * @param y
   * @param width
   * @param height
   * @returns {Rectangle}
   */
  setValues(e, t, i, s) {
    return this.x = e || 0, this.y = t || 0, this.width = i || 0, this.height = s || 0, this;
  }
  /**
   *  지정된 rect이 자신의 영역과 같은지 여부입니다.
   * @param rect
   * @returns {boolean}
   */
  equals(e) {
    return e && e.x === this.x && e.y === this.y && e.width === this.width && e.height === this.height;
  }
  extend(e, t, i, s) {
    return i = i || 0, s = s || 0, e + i > this.x + this.width && (this.width = e + i - this.x), t + s > this.y + this.height && (this.height = t + s - this.y), e < this.x && (this.width += this.x - e, this.x = e), t < this.y && (this.height += this.y - t, this.y = t), this;
  }
  /**
   * 지정된 영역이 자신영역 내에 포함되는지 여부입니다.
   * @param x
   * @param y
   * @param width
   * @param height
   * @returns {boolean}
   */
  contains(e, t, i, s) {
    return i = i || 0, s = s || 0, e >= this.x && e + i <= this.x + this.width && t >= this.y && t + s <= this.y + this.height;
  }
  /**
   * 지정된 rect이 자신 영역 내에 포함되는지 여부입니다.
   * @param rect
   * @returns {boolean}
   */
  containsRect(e) {
    return e ? this.contains(e.x, e.y, e.width, e.height) : !1;
  }
  /**
   * 지정된 rect과 결합하여 새로운 사각형을 반환합니다.
   * @param rect
   * @returns {Rectangle}
   */
  union(e) {
    return this.clone().extend(e.x, e.y, e.width, e.height);
  }
  /**
   * 지정된 rect이 자신과 교차 새로운 사각형을 반환합니다.
   * @param rect
   * @returns {boolean}
   */
  intersection(e) {
    var t = e.x, i = e.y, s = t + e.width, n = i + e.height;
    return this.x > t && (t = this.x), this.y > i && (i = this.y), this.x + this.width < s && (s = this.x + this.width), this.y + this.height < n && (n = this.y + this.height), s <= t || n <= i ? null : new O(t, i, s - t, n - i);
  }
  /**
   * 지정된 rect이 자신과 교차하는지 여부입니다.
   * @param rect
   * @returns {boolean}
   */
  intersects(e) {
    return e.x <= this.x + this.width && this.x <= e.x + e.width && e.y <= this.y + this.height && this.y <= e.y + e.height;
  }
  /**
   * 모든 속성을 0으로 설정합니다.
   */
  setEmpty() {
    this.setValues(0, 0, 0, 0);
  }
  /**
   * 객체 영역이 비어있는지 여부입니다.
   * @returns {boolean}
   */
  isEmpty() {
    return this.width <= 0 || this.height <= 0;
  }
  /**
   * 객체의 복사본을 만듭니다.
   * @returns {Rectangle}
   */
  clone() {
    return new O(this.x, this.y, this.width, this.height);
  }
  toString() {
    return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]";
  }
}
function mi(o) {
  let e, t;
  return typeof HTMLTemplateElement > "u" ? (t = document.createElement("div"), t.innerHTML = o, e = document.createDocumentFragment(), e.appendChild(t.firstChild)) : (t = document.createElement("template"), t.innerHTML = o, e = t.content), e;
}
function _t(o, e) {
  let t = 0;
  const i = (s, n) => {
    if (s) {
      n(s, t++);
      let r = s.firstChild;
      for (; r; )
        i(r, n), r = r.nextSibling;
    }
  };
  return i(o, e), t;
}
function fi(o) {
  const e = [];
  return _t(o, (t, i) => {
    if (t.attributes) {
      let s = Array.prototype.slice.call(t.attributes), n = null, r = [];
      s.forEach((l) => {
        const h = l.name, a = l.value;
        h === "id" && a ? n = a : h.slice(0, 3) === "on-" && a && (t.removeAttribute(h), r.push({
          name: h.slice(3),
          value: a
        }));
      }), (n || r.length > 0) && (e[i] = {
        id: n,
        events: r
      });
    }
  }), e;
}
function gi(o) {
  const e = o.constructor.__template__, t = o.constructor.__annotations__;
  if (!e)
    return;
  const i = document.importNode(e, !0), s = i && i.querySelector("*") || null, n = {};
  _t(i, (r, l) => {
    const h = t[l], a = h && h.id, d = h && h.events;
    if (a && (n[a] = r, n[a].removeAttribute("id")), d) {
      const c = {};
      d.forEach((u) => {
        const m = u.name, f = u.value;
        if (o[f] instanceof Function) {
          let p = c[f];
          p || (p = c[f] = o[f].bind(o)), r.addEventListener(m, p);
        } else
          console.warn(r.localName + ":" + m, "listener method `" + u.value + "` not defined", r);
      });
    }
  }), o.DOM = n, o.root = s, o.root.__instance__ = o;
}
class pt {
  static withDom(e) {
    if (e) {
      const t = mi(e), i = fi(t);
      N(this, {
        get __template__() {
          return t;
        },
        get __annotations__() {
          return i;
        }
      });
    }
    return this;
  }
  static withBehavior(...e) {
    N.apply(null, [this.prototype, ...e, !1]);
    const t = this.__behaviors__ || [];
    return N(this, {
      get __behaviors__() {
        return t.concat(e);
      }
    }), this;
  }
  constructor() {
    gi(this), (this.constructor.__behaviors__ || []).forEach((e) => {
      e.constructor instanceof Function && e.constructor.call(this);
    });
  }
  get htmlElement() {
    return this.root;
  }
}
function ue(o, e, t) {
  if (o.__x !== e || o.__y !== t) {
    o.__x = e, o.__y = t;
    const i = o.style;
    return i.left = e + "px", i.top = t + "px", !0;
  }
  return !1;
}
function B(o, e, t) {
  if (o.__width !== e || o.__height !== t) {
    o.__width = e, o.__height = t;
    const i = o.style;
    return i.width = typeof e == "number" ? e + "px" : e, i.height = typeof t == "number" ? t + "px" : t, !0;
  }
  return !1;
}
function Ie(o, e, t, i, s) {
  let n = B(o, i, s);
  return ue(o, e, t) || n;
}
function qe(o, e, t) {
  if (o.__x !== e || o.__y !== t) {
    const i = o.style;
    i.transform = i.webkitTransform = "translate(" + e + "px," + t + "px)", o.__x = e, o.__y = t;
  }
}
function T(o, e) {
  const t = o.classList;
  return t && !t.contains(e) ? (t.add(e), !0) : !1;
}
function _i(o, e) {
  const t = o.classList;
  return t && t.contains(e) ? (t.remove(e), !0) : !1;
}
function pi(o) {
  if (o instanceof Node) {
    const e = o.nodeName.toLowerCase();
    return o.nodeType === 1 && (e === "textarea" || e === "input" && /^(?:text|email|number|search|tel|url|password)$/i.test(o.type)) || o.isContentEditable;
  }
  return !1;
}
let oe = class ae extends pt {
  constructor() {
    super();
  }
  get childContainer() {
    return this.htmlElement;
  }
  get style() {
    return this.htmlElement.style;
  }
  get clientWidth() {
    return this.htmlElement.clientWidth;
  }
  get clientHeight() {
    return this.htmlElement.clientHeight;
  }
  get childElementCount() {
    return this.childContainer.childElementCount;
  }
  /**
   * 컨테이너에 child 추가.
   * @param child
   */
  appendChild(e) {
    return e instanceof ae && (e = e.htmlElement), this.childContainer.appendChild(e);
  }
  /**
   * 컨테이너에 child 삭제
   * @param child
   * @returns {*|Node}
   */
  removeChild(e) {
    return e instanceof ae && (e = e.htmlElement), e instanceof HTMLElement && e.parentElement && e.parentElement.removeChild(e), e;
  }
  setChildIndex(e, t) {
    e instanceof ae && (e = e.htmlElement);
    const i = this.childContainer, s = i.children, n = Array.prototype.indexOf.call(s, e);
    return t === n ? !1 : (n < t && (t += 1), i.insertBefore(e, s[t]), !0);
  }
  /**
   * x, y만큼 위치를 변경합니다.
   * @param x
   * @param y
   */
  setPosition(e, t) {
    return ue(this.childContainer, e, t);
  }
  /**
   * 너비와 높이 크기를 변경합니다.
   * @param width
   * @param height
   */
  setSize(e, t) {
    return B(this.childContainer, e, t);
  }
  setLayout(e, t, i, s) {
    let n = this.setPosition(e, t), r = this.setSize(i, s);
    return n || r;
  }
  addEventListener(e, t, i) {
    this.htmlElement.addEventListener.apply(this.htmlElement, arguments);
  }
  removeEventListener(e, t, i) {
    this.htmlElement.removeEventListener.apply(this.htmlElement, arguments);
  }
  dispatchEvent(e) {
    return this.htmlElement.dispatchEvent.apply(this.htmlElement, arguments);
  }
};
function Ct(o, e) {
  return isNaN(o) && isNaN(e) ? 0 : isNaN(o) ? 1 : isNaN(e) || o < e ? -1 : o > e ? 1 : 0;
}
function Ze(o, e, t) {
  return o == null && e == null ? 0 : o == null ? 1 : e == null || (t && (o = o.toLowerCase(), e = e.toLowerCase()), o < e) ? -1 : o > e ? 1 : 0;
}
function yt() {
  let o = document.createElement("textarea"), e = o.style;
  return o.onkeydown = (t) => {
    t.preventDefault();
  }, e.position = "absolute", e.left = e.top = "-9999px", e.opacity = "0", o;
}
function Ci(o) {
  let e = document.activeElement, t = yt();
  return document.body.appendChild(t), t.value = o, t.select(), t.offsetWidth, new Promise((i) => {
    setTimeout(() => {
      document.body.removeChild(t), e.focus(), i(o);
    }, 100);
  });
}
function yi() {
  const o = document.activeElement, e = yt();
  return document.body.appendChild(e), e.select(), e.offsetWidth, new Promise((t) => {
    setTimeout(() => {
      const i = e.value;
      document.body.removeChild(e), o.focus(), t(i);
    }, 100);
  });
}
const Le = `
`, wt = "	";
function wi(o, e) {
  const t = o.dataGroup, i = o.collection;
  let s;
  t.isCellSelectionMode ? s = t.normalizedColumns.slice(e.columnIndex, e.endColumnIndex + 1) : s = t.normalizedColumns, s = s.filter((l) => l.visible);
  let n = [];
  for (let l = e.rowIndex, h = s.length; l <= e.endRowIndex; l++) {
    let a = i.get(l), d = [];
    for (let c = 0; c < h; c++)
      d[c] = t.itemToLabel(a, s[c]);
    n.push(d);
  }
  let r = n.reduce((l, h) => (l += h.join(wt) + Le, l), "");
  return r.substr(0, r.length - Le.length);
}
function vi(o) {
  let e = o.split(Le), t = e.length, i = [];
  for (let s = 0; s < t; s++)
    i[s] = e[s].split(wt);
  return t > 0 && i[t - 1].length === 1 && !i[t - 1][0] && i.pop(), i;
}
function bi(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var Ei = function() {
  function o(s) {
    return s;
  }
  function e(s) {
    return typeof s == "string" ? s.toLowerCase() : s;
  }
  function t(s, n) {
    if (n = typeof n == "object" ? n : { direction: n }, typeof s != "function") {
      var r = s;
      s = function(c) {
        return c[r] ? c[r] : "";
      };
    }
    if (s.length === 1) {
      var l = s, h = n.ignoreCase ? e : o, a = n.cmp || function(c, u) {
        return c < u ? -1 : c > u ? 1 : 0;
      };
      s = function(c, u) {
        return a(h(l(c)), h(l(u)));
      };
    }
    const d = { "-1": "", desc: "" };
    return n.direction in d ? function(c, u) {
      return -s(c, u);
    } : s;
  }
  function i(s, n) {
    var r = typeof this == "function" && !this.firstBy ? this : !1, l = t(s, n), h = r ? function(a, d) {
      return r(a, d) || l(a, d);
    } : l;
    return h.thenBy = i, h;
  }
  return i.firstBy = i, i;
}(), xi = /* @__PURE__ */ bi(Ei);
class Ae {
  constructor() {
    this.count = 0, arguments.length >= 2 ? (this.startCallback = arguments[0], this.endCallback = arguments[1]) : arguments.length === 1 && (this.endCallback = arguments[0]);
  }
  get counting() {
    return this.count > 0;
  }
  start() {
    let e = null;
    return this.count <= 0 && this.startCallback && (e = this.startCallback.apply(null, arguments)), this.count++, e;
  }
  end() {
    let e = null;
    return this.count--, this.count <= 0 && this.endCallback && (e = this.endCallback.apply(null, arguments), this.count = 0), e;
  }
  cancel() {
    this.count--;
  }
}
class vt extends EventTarget {
  constructor() {
    super(), this.collectionEventCounter = new Ae(this.dispatchCollectionEvent.bind(this)), this._source = null, this._active = null, this._sortFunction = null, this._filterFunction = null;
  }
  /**
   *
   */
  get source() {
    return this._source;
  }
  set source(e) {
    this._source !== e && (this._source = e, this._reset());
  }
  get length() {
    return this._active && this._active.length || 0;
  }
  get isEmpty() {
    return this.length === 0;
  }
  get filterFunction() {
    return this._filterFunction;
  }
  set filterFunction(e) {
    this._filterFunction !== e && (this._filterFunction = e, this.refresh());
  }
  get sortFunction() {
    return this._sortFunction;
  }
  get localItems() {
    return this._active || [];
  }
  get(e) {
    return e >= 0 && e < this.length ? this.localItems[e] : null;
  }
  indexOf(e, t) {
    return this.localItems.indexOf(e, t);
  }
  lastIndexOf(e, t) {
    return this.localItems.lastIndexOf(e, t);
  }
  contains(e) {
    return this.indexOf(e) >= 0;
  }
  containsAll(e) {
    const t = e && e.length || 0;
    if (t <= 0)
      return !1;
    for (let i = 0; i < t; i++)
      if (!this.contains(e[i]))
        return !1;
    return !0;
  }
  setValue(e, t, i) {
    return this._internalSetValue(this.get(e), t, i);
  }
  setItemValue(e, t, i) {
    return this._internalSetValue(e, t, i);
  }
  sort(e) {
    let t = e && e.length || 0;
    if (t > 0) {
      let i = e[0], s = xi(i.sortFunction, i.descending ? 0 : -1);
      for (let n = 1; n < t; n++)
        i = e[n], s = s.thenBy(i.sortFunction, i.descending ? 0 : -1);
      this._sortFunction = s;
    } else
      this._sortFunction = null;
  }
  forEach(e) {
  }
  /**
   * 아이템 목록을 재갱신합니다.
   */
  refresh() {
    this.collectionEventCounter.start(), this._internalRefresh(), this.collectionEventCounter.end("refresh");
  }
  clear() {
    this.source = [];
  }
  toArray() {
    return this.localItems.slice(0);
  }
  subList(e, t) {
    const i = this.localItems.slice(e, t);
    return new this.constructor(i);
  }
  _reset() {
    this.collectionEventCounter.start(), this._internalRefresh(), this.collectionEventCounter.end("reset");
  }
  _internalSetValue(e, t, i) {
    if (e && t != null) {
      let s = Oe(e, t);
      if (i !== s)
        return this.collectionEventCounter.start(), ui(e, t, i), this.collectionEventCounter.end("update", {
          source: e,
          index: this.indexOf(e),
          property: t,
          newValue: i,
          oldValue: s
        }), !0;
    }
    return !1;
  }
  /**
   * @private
   */
  _internalRefresh() {
  }
  dispatchCollectionEvent(e, t, i, s) {
    const n = t && !Array.isArray(t) && [t] || t, r = {
      collection: this,
      kind: e
    };
    return n != null && (r.items = n), i != null && (r.index = i), s != null && (r.oldIndex = s), this.dispatchEvent(new CustomEvent("collection-change", {
      bubbles: !1,
      cancelable: !1,
      detail: r
    }));
  }
}
class Ri extends vt {
  constructor(e) {
    super(), this.source = e || [];
  }
  /**
   * 'source' 기준으로 콜백함수를 배열 요소 각각에 대해 실행합니다.
   * @param callback
   */
  forEach(e) {
    (this.source || []).forEach((t, i, s) => {
      e(t, i, s);
    });
  }
  /**
   * 아이템을 맨끝 위치에 추가합니다.
   * @param item
   * @returns {boolean}
   */
  add(e) {
    return this.addAt(this.length, e);
  }
  /**
   * 지정된 인덱스에 아이템을 추가합니다.
   * @param index
   * @param item
   * @returns {boolean}
   */
  addAt(e, t) {
    if (e >= 0) {
      if (e >= this.length && (e = this.length), this.collectionEventCounter.start(), this.source !== this._active) {
        let i = e, s = 0;
        if (this.sortFunction ? i = this.source.length : this.filterFunction && (i >= this._active.length ? i = this.source.length : i = this.source.indexOf(this._active[e])), this.source.splice(i, 0, t), !this.filterFunction || this.filterFunction(t, e, this.source))
          if (this.sortFunction)
            s = this._findInsertIndex(this._active, t);
          else {
            let n = i - 1;
            for (; n >= 0; ) {
              let r = this.source[n];
              if (this.filterFunction(r, n, this.source) && (s = this._active.indexOf(r), s >= 0)) {
                s += 1;
                break;
              }
              n--;
            }
            s < 0 && (s = 0);
          }
        else
          s = -1;
        s >= 0 && this._active.splice(s, 0, t), e = s;
      } else
        this._active.splice(e, 0, t);
      return this.collectionEventCounter.end("add", t, e), !0;
    }
    return !1;
  }
  /**
   * 항목 목록을 맨끝 위치부터 추가합니다.
   * @param items
   */
  addAll(e) {
    this.addAllAt(this.length, e);
  }
  /**
   * 항목 목록을 지정된 위치부터 추가합니다.
   * @param index
   * @param items
   */
  addAllAt(e, t) {
    let i = t && t.length || 0;
    if (i > 0 && e >= 0) {
      this.collectionEventCounter.start();
      for (let s = 0; s < i; s++)
        this.addAt(e + s, t[s]);
      this.collectionEventCounter.end("add", t, e);
    }
  }
  /**
   * 아이템을 삭제합니다.
   * @param item
   * @returns {boolean}
   */
  remove(e) {
    return this.removeAt(this.indexOf(e)) === e;
  }
  /**
   * 항목 목록을 삭제합니다.
   * @param items
   * @returns {boolean}
   */
  removeAll(e) {
    this.collectionEventCounter.start(), e = e && e.slice(0) || [];
    const t = [];
    e.forEach((i) => {
      this.remove(i) && t.push(i);
    }), t.length > 0 ? this.collectionEventCounter.end("remove", t, -1) : this.collectionEventCounter.cancel();
  }
  /**
   * 지정된 위치의 아이템을 삭제합니다.
   * @param index
   * @returns {Array}
   */
  removeAt(e) {
    let t = null;
    return e >= 0 && e < this.length && (this.collectionEventCounter.start(), t = this._active.splice(e, 1)[0], this.source !== this._active && this.source.splice(this.source.indexOf(t), 1), this.collectionEventCounter.end("remove", t, e)), t;
  }
  /**
   * 지정된 위치에 아이템을 덮어씁니다.
   * @param index
   * @param item
   * @returns {boolean}
   */
  set(e, t) {
    return e >= 0 && e < this.length ? (this.collectionEventCounter.start(), this.removeAt(e), this.addAt(e, t), this.collectionEventCounter.end("set", t, e), !0) : !1;
  }
  /**
   * 배열의 'from' 항목을 'to' 위치에 이동합니다.
   * @param from
   * @param to
   * @returns {boolean}
   */
  move(e, t) {
    if (e !== t && 0 <= e && e < this.length && 0 <= t) {
      this.collectionEventCounter.start();
      const i = this.removeAt(e);
      return this.addAt(t, i), this.collectionEventCounter.end("move", i, this.indexOf(i), e), !0;
    }
    return !1;
  }
  /**
   * @private
   */
  _internalRefresh() {
    if ((this.source && this.source.length || 0) > 0 && (this.sortFunction || this.filterFunction)) {
      let t = this.source && this.source.slice(0) || 0;
      this.filterFunction && (t = t.filter(this.filterFunction)), this.sortFunction && (t = t.sort(this.sortFunction)), this._active = t;
    } else
      this._active = this.source;
  }
  /**
   * @private
   */
  _findInsertIndex(e, t) {
    let i = 0, s = 0, n = e.length - 1, r = null, l = 1;
    for (; s <= n; )
      if (i = Math.round((s + n) / 2), r = e[i], l = this.sortFunction(t, r), l <= -1)
        n = i - 1;
      else if (l >= 1)
        s = i + 1;
      else
        break;
    return l > 0 ? i + 1 : i;
  }
}
class b extends O {
  constructor(e, t, i, s, n) {
    super(), i == null && (i = e), s == null && (s = t), this.rowIndex = Math.min(e, i), this.columnIndex = Math.min(t, s), this.endRowIndex = Math.max(e, i), this.endColumnIndex = Math.max(t, s), this.isCrossed = n === !0;
  }
  /**
   * 셀의 상단 행 인덱스입니다.
   * @returns {number}
   */
  get rowIndex() {
    return this.top;
  }
  set rowIndex(e) {
    this.top = e, this.endRowIndex < e && (this.endRowIndex = e);
  }
  /**
   * 셀의 하단 행 인덱스입니다.
   * @returns {number}
   */
  get endRowIndex() {
    return this.bottom;
  }
  set endRowIndex(e) {
    this.bottom = e;
  }
  /**
   * 셀의 좌측 컬럼 인덱스입니다.
   * @returns {number}
   */
  get columnIndex() {
    return this.left;
  }
  set columnIndex(e) {
    this.left = e, this.endColumnIndex < e && (this.endColumnIndex = e);
  }
  /**
   * 셀의 우측 컬럼 인덱스입니다.
   * @returns {number}
   */
  get endColumnIndex() {
    return this.right;
  }
  set endColumnIndex(e) {
    this.right = e;
  }
  /**
   * 셀의 행 개수입니다.
   * @returns {number}
   */
  get rowCount() {
    return this.height + 1;
  }
  /**
   * 셀의 컬럼 개수입니다.
   * @returns {number}
   */
  get columnCount() {
    return this.width + 1;
  }
  /**
   * 병합된 셀인지 확인합니다.
   * @returns {boolean}
   */
  get isMerged() {
    return this.rowCount > 1 || this.columnCount > 1;
  }
  /**
   * 객체의 복사본을 만듭니다.
   * @returns {CellPosition}
   */
  clone() {
    return new b(this.rowIndex, this.columnIndex, this.endRowIndex, this.endColumnIndex);
  }
  toPosition() {
    return [this.rowIndex, this.columnIndex, this.endRowIndex, this.endColumnIndex].join(",");
  }
  valueOf() {
    return {
      rowIndex: this.rowIndex,
      columnIndex: this.columnIndex,
      endRowIndex: this.endRowIndex,
      endColumnIndex: this.endColumnIndex,
      rowCount: this.rowCount,
      columnCount: this.columnCount,
      isCrossed: this.isCrossed
    };
  }
  toJSON() {
    return ["rowIndex", "columnIndex", "endRowIndex", "endColumnIndex", "isCrossed"].reduce((e, t) => (e[t] = this[t], e), {});
  }
  toString() {
    return "[CellPosition (rowIndex=" + this.rowIndex + " columnIndex=" + this.columnIndex + " endRowIndex=" + this.endRowIndex + " endColumnIndex=" + this.endColumnIndex + ")]";
  }
  static create(e) {
    return new b(e.rowIndex, e.columnIndex, e.endRowIndex, e.endColumnIndex);
  }
}
const bt = {
  _styles: {},
  get defaultStyles() {
    return {};
  },
  get styleParent() {
    return null;
  },
  get _nonInheritingStyleNames() {
    return [];
  },
  get styles() {
    return this._styles;
  },
  set styles(o) {
    this.addStyles(o || {});
  },
  getStyle(...o) {
    return o.length > 1 ? o.reduce((e, t) => (e[t] = this._internalGetStyle(t), e), {}) : this._internalGetStyle(o[0]);
  },
  addStyle(o, e) {
    this._styles[o] = e, this._notifyStyleChanged();
  },
  removeStyle(o) {
    delete this._styles[o], this._notifyStyleChanged();
  },
  clearStyles() {
    this._styles = {}, this._notifyStyleChanged();
  },
  addStyles(o) {
    this._styles = N({}, this._styles, o), this._notifyStyleChanged();
  },
  _internalGetStyle(o) {
    const e = this.styles, t = this.defaultStyles, i = this._nonInheritingStyleNames;
    let s = e[o];
    return !s && t && (s = t[o]), this.styleParent && !s && (!i || i.indexOf(o) < 0) && (s = this.styleParent.getStyle(o)), s;
  },
  _styleChanged() {
  },
  _notifyStyleChanged() {
    this._boundStyleChanged || (this._boundStyleChanged = this._styleChanged.bind(this)), we(this._boundStyleChanged);
  }
};
class Et {
  constructor(e) {
    this.options = e;
  }
  get type() {
    return this.options.type;
  }
  get pattern() {
    return this.options.pattern;
  }
  get source() {
    return this.options.source;
  }
  format(e) {
  }
}
function Ii(o, e) {
  const t = class extends Et {
    constructor(s) {
      super(s);
    }
  };
  return N(t.prototype, e, !1), t;
}
const me = {};
function xt(o) {
  return me[o];
}
function Li(o, e) {
  return me[o] = Ii(o, e);
}
function Si(o) {
  o in me && delete me[o];
}
function Rt(o) {
  if (o && "type" in o && "pattern" in o) {
    const e = xt(o.type);
    if (e)
      return new e(o);
    console.warn("Formatter not defined.", o);
  }
  return null;
}
var pn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  IFormatter: Et,
  add: Li,
  createFormatter: Rt,
  get: xt,
  remove: Si
});
function It(o, e) {
  e._level = o && o.level + 1 || 0;
  let t = 0, i = e.children || [], s = i.length;
  for (let n = 0; n < s; n++) {
    let r = i[n];
    r._parent = e, It(e, r), t = Math.max(r.depth + 1, t);
  }
  e._depth = t;
}
class F extends EventTarget {
  constructor(e = null, t = "") {
    super(), this.index = -1, this._open = !0, this._width = void 0, this._visible = !0, this._minWidth = 30, this._children = [], this._level = 0, this._depth = 0, this._formatter = null, this._itemRenderer = null, this._itemEditor = null, this._headerRenderer = null, this.editable = !0, this.editOnEvents = null, this.draggable = !0, this.resizable = !0, this.wordWrap = !1, this.labelFunction = null, this.sortable = !0, this.sortDescending = !1, this.sortCompare = null, this.isSortOriginal = !1, this.isRowMerge = !1, this.isColumnMerge = !1, this.mergeDependColumns = null, this.height = void 0, this.dataField = e || "", this.headerText = t;
  }
  /**
   * 이 컬럼이 있는 그리드객체입니다.
   */
  get grid() {
    return this._grid;
  }
  /**
   * 셀 라벨이 표시되는 항목의 속성을 정의합니다.
   */
  get dataField() {
    return this._dataField;
  }
  set dataField(e) {
    e = e == null ? "" : "" + e, this._dataField !== e && (this._dataField = e, this._dataFieldPath = Fe(e), this.invalidate());
  }
  get dataFieldPath() {
    return this._dataFieldPath || [];
  }
  /**
   *  컬럼 헤더의 텍스트입니다. 지정되지 않을 시 dataField를 텍스트로 사용합니다.
   */
  get headerText() {
    return this._headerText || this.dataField;
  }
  set headerText(e) {
    this._headerText !== e && (this._headerText = e, this.invalidate());
  }
  get offsetWidth() {
    return this.grid ? this.grid.getColumnWidth(this.index) : this.width;
  }
  /**
   * 컬럼의 너비입니다. 지정되지 않을시 그리드 내부에서 자동으로 조절합니다.
   */
  get width() {
    return this._width;
  }
  set width(e) {
    isNaN(e) || (e = k(e, this.minWidth)), this._width !== e && (this.grid ? this.grid.setColumnWidth(this.index, e) : this.setWidth(e));
  }
  /**
   * 컬럼의 최소 너비입니다.
   */
  get minWidth() {
    return this._minWidth;
  }
  set minWidth(e) {
    this._minWidth !== e && (this._minWidth = e, this.invalidate());
  }
  /**
   * 컬럼의 표시 여부입니다.
   */
  get visible() {
    let e = this.parent;
    for (; e; ) {
      if (!e.visible)
        return !1;
      e = e.parent;
    }
    return this._visible;
  }
  set visible(e) {
    this._visible !== e && (this.grid ? this.grid.setColumnVisible(this, e) : this.setVisible(e));
  }
  /**
   * 셀을 구성하는 클래스 팩토리입니다. 지정되지 않으면 그리드의 기본 itemRenderer 구성합니다.
   */
  get itemRenderer() {
    return this._itemRenderer;
  }
  set itemRenderer(e) {
    this._itemRenderer !== e && (this._itemRenderer = e, this.grid && this.grid.clearItemRenderers());
  }
  /**
   * 셀을 구성하는 클래스 팩토리입니다. 지정되지 않으면 그리드의 기본 headerRenderer 구성합니다.
   */
  get headerRenderer() {
    return this._headerRenderer;
  }
  set headerRenderer(e) {
    this._headerRenderer !== e && (this._headerRenderer = e, this.grid && this.grid.clearHeaderRenderers());
  }
  /**
   * 항목을 편집하는데 사용되는 클래스 팩토리입니다.
   * 지정되지 않으면 그리드의 기본 itemEditor로 구성합니다.
   */
  get itemEditor() {
    return this._itemEditor;
  }
  set itemEditor(e) {
    this._itemEditor !== e && (this._itemEditor = e);
  }
  /**
   * 멀티 헤더 구성시 하위 컬럼을 보이거나 숨기게 합니다.
   */
  get open() {
    return this._open;
  }
  set open(e) {
    this._open !== e && (this._open = e, this.invalidate());
  }
  /**
   * 이 컬럼의 레벨입니다.
   */
  get level() {
    return this._level;
  }
  /**
   * 이 컬럼의 깊이입니다.
   * @returns {*|number}
   */
  get depth() {
    return this._depth;
  }
  /**
   * 이 컬럼의 부모 컬럼입니다.
   * @returns {null|*}
   */
  get parent() {
    return this._parent;
  }
  /**
   * 이 컬럼의 자식컬럼목록입니다.
   * @returns {Array}
   */
  get children() {
    return this._children;
  }
  set children(e) {
    this._children !== e && (this._children = e);
  }
  get isLeaf() {
    return !this.children || this.children.length <= 0;
  }
  /**
   * 컬럼 포멧를 정의합니다.
   * 포멧을 사용하기 위해선 tachyon.formatter 설정 해야 합니다.
   */
  get format() {
    return this._format;
  }
  set format(e) {
    this._format !== e && (this._format = e, this._formatter = Rt(e), this.invalidate());
  }
  get filterInstance() {
    return this.grid && this.grid.filterManager.getFilter(this);
  }
  /**
   * 이 컬럼의 필터를 지정합니다.
   * {
   *     type:['number','string','date'],
   *     condi
   * }
   */
  get filter() {
    return this._filter;
  }
  set filter(e) {
    this._filter !== e && (this._filter = e, this.invalidate());
  }
  /**
   * 스타일 부모
   * @private
   */
  get styleParent() {
    return this.grid;
  }
  get _nonInheritingStyleNames() {
    return ["backgroundColor"];
  }
  setGrid(e) {
    this._grid !== e && (this._grid = e, this.dispatchEvent(new CustomEvent("grid-change", {
      bubbles: !1,
      cancelable: !1,
      detail: {
        grid: e
      }
    })));
  }
  setWidth(e) {
    isNaN(e) || (e = k(e, this.minWidth)), this._width = e;
  }
  setVisible(e) {
    this._visible = e;
  }
  /**
   * 지정된 항목에 대해 렌더러가 표시하는 문자열을 반환합니다.
   * dataField, labelFunction, format 영향을 받습니다.
   */
  itemToLabel(e) {
    if (this.labelFunction instanceof Function)
      return this.labelFunction(e, this);
    let t = this.itemToValue(e);
    return this._formatter && (t = this._formatter.format(t)), t;
  }
  /**
   * 지정된 항목에 대해 원본 데이타를 반환합니다.
   */
  itemToValue(e) {
    if (!e)
      return null;
    try {
      return Oe(e, this.dataFieldPath);
    } catch (t) {
      console.error(t);
    }
    return null;
  }
  invalidate() {
    this._grid && this._grid.invalidate(_.COLUMN_UPDATE);
  }
  updateChildren() {
    It(this.parent, this);
  }
  _styleChanged() {
  }
  toJSON() {
    return ["minWidth", "width", "offsetWidth", "dataField", "headerText", "children", "visible", "open", "format"].reduce((e, t) => (t === "children" ? e[t] = this.children.map((i) => i.toJSON()) : e[t] = this[t], e), {});
  }
  static create(e) {
    if (e instanceof F)
      return e;
    const t = new this();
    for (let i in e) {
      let s = e[i];
      i === "styles" ? t.addStyles(s) : i in t && (i === "children" && Array.isArray(s) && (s = s.map((n) => n instanceof F ? n : F.create(n))), t[i] = s);
    }
    return t;
  }
}
N(F.prototype, bt, !1);
var Mi = (class extends oe {
  constructor(e) {
    super(), this._scroller = this.DOM.scroller, this._viewport = this.DOM.viewport, this._contentContainer = this.DOM.contentContainer, this._boundDoLayout = this.doLayout.bind(this), this._boundContentSizeChange = this._onContentSizeChange.bind(this), this._boundScrollPositionChange = this._onScrollPositionChange.bind(this), this._contentContainer.addEventListener("wheel", this._onWheel.bind(this)), this._scroller.addEventListener("scroll", this._onScroll.bind(this), { passive: !0 }), this._inOnScroll = !1, this.content = e;
  }
  get childContainer() {
    return this._contentContainer;
  }
  get maxScrollLeft() {
    return this._scroller.scrollWidth - this._scroller.clientWidth;
  }
  get maxScrollTop() {
    return this._scroller.scrollHeight - this._scroller.clientHeight;
  }
  get hasVerticalScroll() {
    return this._scroller.scrollHeight > this._scroller.clientHeight;
  }
  get hasHorizontalScroll() {
    return this._scroller.scrollWidth > this._scroller.clientWidth;
  }
  get content() {
    return this._content;
  }
  set content(e) {
    this._content !== e && (this.content && (this.content.removeEventListener("content-size-change", this._boundContentSizeChange), this.content.removeEventListener("vertical-scroll-position-change", this._boundScrollPositionChange), this.content.removeEventListener("horizontal-scroll-position-change", this._boundScrollPositionChange), this.removeChild(e)), this._content = e, this.content && (this.content.addEventListener("content-size-change", this._boundContentSizeChange), this.content.addEventListener("vertical-scroll-position-change", this._boundScrollPositionChange), this.content.addEventListener("horizontal-scroll-position-change", this._boundScrollPositionChange), this.appendChild(e)));
  }
  doLayout(e) {
    this._inDoLayout = !0;
    const t = this._scroller, i = this._contentContainer, s = this._content;
    B(i, t.clientWidth, t.clientHeight), s.doLayout(e), this._layoutViewport();
    const n = s.getViewMinHeight();
    n > 0 && (t.style.minHeight = n + t.offsetHeight - t.clientHeight + "px"), B(i, t.clientWidth, t.clientHeight) && s.invalidateFor(_.GROUP_SIZE_CHANGE), this._inDoLayout = !1;
  }
  _layoutViewport() {
    const e = this._content;
    return B(this._viewport, e.contentWidth, e.contentHeight);
  }
  _scrollPositionChanged() {
    this._inOnScroll || (this._scroller.scrollTop = this.content.scrollTop, this._scroller.scrollLeft = this.content.scrollLeft);
  }
  /**
   * 컨텐츠 사이즈 변경 핸들러
   * @param event
   * @private
   */
  _onContentSizeChange(e) {
    this._layoutViewport(), !this._inDoLayout && we(this._boundDoLayout);
  }
  _onScrollPositionChange(e) {
    this._scrollPositionChanged();
  }
  _onWheel(e) {
    const t = this._scroller, s = this._content.getVerticalScrollPositionDelta(e.deltaY), n = k(t.scrollTop + s, 0, this.maxScrollTop);
    if (t.scrollTop !== n)
      return t.scrollTop = n, e.preventDefault(), !1;
  }
  _onScroll(e) {
    this._inOnScroll = !0;
    const t = this._scroller, i = this._content, s = t.scrollLeft, n = t.scrollTop;
    let r = !1;
    i.scrollLeft !== s && (i.scrollLeft = s, r = !0), i.scrollTop !== n && (i.scrollTop = n, r = !0), r && this.dispatchEvent(new CustomEvent("scroll", {
      detail: {
        scrollTop: n,
        scrollLeft: s,
        maxScrollTop: this.maxScrollTop,
        maxScrollLeft: this.maxScrollLeft,
        trigger: e
      }
    })), this._inOnScroll = !1;
  }
}).withDom(
  '<div class="tachyon-scroller"><div id="scroller" class="tachyon-scroll-container"><div id="viewport" class="tachyon-scroll-viewport"></div></div><div id="contentContainer" class="tachyon-scroll-content"></div></div>'
);
const Lt = { left: 0, right: 0, top: 0, bottom: 0 };
function D(o, e, t, i, s, n) {
  o.beginPath();
  let r = ee(n.dashed) || [], l = ee(n.color) || 0, h = ee(n.width) || 1;
  o.setLineDash(r), o.strokeStyle = l, o.lineWidth = h;
  let a = (h || 0) % 2 / 2, d = e === i ? a : 0, c = t === s ? a : 0;
  o.translate(d, c), o.moveTo(e, t), o.lineTo(i, s), o.translate(-d, -c), o.stroke();
}
const ze = gt(
  function(o) {
    let e = document.createElement("canvas"), t = e.getContext("2d");
    t.fillRect(0, 0, e.width, e.height), t.textBaseline = "top", t.fillStyle = "white", t.font = o, t.fillText("gM", 0, 0);
    let i = t.getImageData(0, 0, e.width, e.height).data, s = -1, n = -1;
    for (let r = 0; r < e.height; r++)
      for (let l = 0; l < e.width; l++) {
        let h = (r * e.width + l) * 4;
        if (i[h] === 0) {
          if (l === e.width - 1 && s !== -1) {
            n = r, r = e.height;
            break;
          }
        } else {
          s === -1 && (s = r);
          break;
        }
      }
    return n - s;
  }
);
function ie(o, e) {
  return !e || e.length <= 0 ? 0 : o.measureText(e).width;
}
function Pe(o, e, t, i, s, n, r, l, h) {
  h = h || Lt;
  let a = ie(o, e), d = ze(o.font);
  return s - (h.left + h.right) < a && (r = "left"), r === "center" ? t += (s - a) / 2 : r === "right" ? t += s - a - h.right : t += h.left, l === "middle" || l === "center" ? i += (n - d) / 2 : l === "bottom" ? i += n - d - h.bottom : i += h.top, o.fillText(e, t, i + d - 1), h.top + h.bottom + d;
}
function Di(o, e, t) {
  let i = e.trim().split(`
`), s = i.length, n = [];
  for (let r = 0; r < s; r++)
    n = n.concat(St(o, Ni(i[r]).split(" "), t));
  return n;
}
function St(o, e, t) {
  if (e.length === 1)
    return e;
  let i, s = [e.shift()];
  for (; (i = ie(o, s.join(" ")) < t) && e.length; )
    s.push(e.shift());
  return !i && s.length > 1 && e.unshift(s.pop()), s = [s.join(" ")], e.length && (s = s.concat(St(o, e, t))), s;
}
function Ni(o) {
  return (o + "").trim().replace(/\s\s+/g, " ");
}
function Mt(o, e, t, i, s, n, r, l, h) {
  h = h || Lt;
  const a = ze(o.font), d = h.left + h.right, c = Di(o, e, s - d), u = c.length;
  if (u <= 1)
    return Pe(o, e, t, i, s, n, r, l, h);
  let m = u * a, f, p;
  l === "top" ? p = h.top : l === "center" || l === "middle" ? p = (n - m) / 2 : l === "bottom" && (p = n - m - h.bottom), p = Math.max(h.top, p) + a;
  let g = ie(o, e);
  for (let C = 0; C < u; C++) {
    let y = c[C];
    g = ie(o, y), r === "left" ? f = h.left : r === "center" ? f = (s - g) / 2 : r === "right" && (f = s - g - h.right), o.fillText(y, t + f, i + p + C * a - 2);
  }
  return h.top + h.bottom + a * u;
}
var yn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  lineTo: D,
  measureFontHeight: ze,
  measureTextWidth: ie,
  paintMultiLine: Mt,
  paintSingleLine: Pe
});
class se extends pt {
  constructor(e) {
    super(), this._grid = e, this._deferredFuncs = [];
  }
  get grid() {
    return this._grid;
  }
  get isDomRenderer() {
    return !!this.htmlElement;
  }
  /**
   * 렌더러 생성시 호출됩니다.
   * @param grid
   */
  created(e) {
  }
  /**
   * 렌더러 갱신시 호출됩니다.
   * @param grid
   * @param state
   */
  prepare(e, t) {
  }
  /**
   * 캔버스 영역에 그릴때 호출됩니다.
   * @param ctx {CanvasRenderingContext2D}
   * @param state
   * @param width
   * @param height
   * @return {number} 셀의 height를 반환합니다.  DataGrid.autoRowHeight 와 해당 컬럼 wordWrap 'true'일때 반환된 height 으로 행 크기를 설정합니다.
   */
  paint(e, t, i, s) {
  }
  /**
   * 렌더러 해제시 호출됩니다.
   */
  dispose() {
    for (; this._deferredFuncs.length > 0; )
      this._deferredFuncs.pop()();
  }
  /**
   *
   * @param target
   * @param eventName
   * @param listener
   * @param options
   */
  watchEvent(e, t, i, s) {
    e && e.addEventListener && (e.addEventListener(t, i, s), this._deferredFuncs.push(() => {
      e.removeEventListener(t, i, s);
    }));
  }
  static factory(e) {
    const t = class extends se {
      constructor(s) {
        super(s);
      }
    };
    return t.withBehavior({
      dispose() {
        if (se.prototype.dispose.apply(this), e.dispose)
          return e.dispose.apply(this);
      }
    }, e), typeof e.template == "string" && t.withDom(e.template), t;
  }
}
const Dt = {}, Se = {
  created() {
  },
  prepare(o, e) {
  },
  paint(o, e, t, i) {
    const s = e.cellPosition, n = e.column, r = e.label == null ? "" : "" + e.label, l = this.grid.getCellStyle(s.rowIndex, s.columnIndex, "font", "textAlign", "verticalAlign", "cellPadding"), h = this.grid.getCellStyle(s.rowIndex, s.columnIndex, e.hovered && "textOverColor" || e.selected && "textSelectionColor" || "color");
    let a = l.textAlign;
    if (n.format && n.styles.textAlign === void 0) {
      const d = n.format.type;
      d === "number" ? a = "right" : d === "date" && (a = "center");
    }
    return o.font !== l.font && (o.font = l.font), o.fillStyle !== h && (o.fillStyle = h, o.strokeStyle = h), n.wordWrap ? Mt(o, r, 0, 0, t, i, a, l.verticalAlign, l.cellPadding) : Pe(o, r, 0, 0, t, i, a, l.verticalAlign, l.cellPadding);
  }
}, Je = {
  template: '<div><label id="labelDisplay" style="width:100%;text-align:center;margin: 0 3px"></label><div id="iconContainer" style="height:80%; display:none; align-items:center;border-left:solid 1px #c3c3c3;"><label id="iconDisplay" style="font-size:small;min-width:15px;text-align: center;margin:0 3px;"></label></div></div></div>',
  prepare(o, e) {
    const { labelDisplay: t, iconDisplay: i, iconContainer: s } = this.DOM, { column: n, label: r } = e, l = o.getSortColumns() || [], h = l.length, a = l.indexOf(n);
    t.textContent = r, a >= 0 ? (i.textContent = (n.sortDescending ? "↓" : "↑") + (h > 1 ? a + 1 : ""), s.style.display = "flex") : s.style.display = "none";
  },
  dispose() {
  }
}, Ti = {
  template: '<div style="overflow: hidden"><div id="indentBox" style="display:inline-block"></div><button id="toggleButton" on-mousedown="onClick"></button><label id="labelDisplay"></label></div>',
  prepare(o, e) {
    let t = e.item, i = e.column, s = e.label || "", n = o.getNodeLevel(t), r = i.indent, l = o.isOpenNode(t), h = o.hasChildren(t), a = this.DOM.indentBox, d = this.DOM.labelDisplay, c = this.DOM.toggleButton;
    a.style.marginLeft = n * r + "px", d.textContent = s, h ? (c.removeAttribute("hidden"), c.textContent = l ? "-" : "+") : c.setAttribute("hidden", "hidden"), this.item = t, this.column = i;
  },
  onClick(o) {
    this.grid.toggleNode(this.item), o.preventDefault(), o.stopPropagation();
  }
}, Nt = {
  created(o) {
    this.watchEvent(document, "keydown", (e) => {
      switch (e.keyCode) {
        case 37:
        case 38:
        case 39:
        case 40:
          return e.stopImmediatePropagation(), !0;
      }
    }, !0);
  },
  /**
   * 편집 완료 전 호출.
   */
  getSaveValue() {
    return this.DOM.input.value;
  },
  prepare(o, e) {
    let t = this.DOM.input, i = e.label != null ? "" + e.label : "", s = e.inputtedKey;
    if (s) {
      t.value = s;
      let n = s.length;
      t.setSelectionRange(n, n);
    } else
      t.value = i, t.setSelectionRange(0, i.length);
    t.focus();
  },
  dispose() {
  },
  template: '<input id="input" class="tachyon-editor" type="text">'
};
class Ve {
  constructor() {
    this.item = null, this.column = null, this.hovered = !1, this.selected = !1, this.value = null, this.label = null, this.renderer = null, this.visible = !0;
  }
}
class ke extends Ve {
  constructor(e, t, i) {
    super(), this.item = e, this.column = t, this.cellPosition = i;
  }
  get isMerged() {
    return this.cellPosition.isMerged;
  }
}
class Hi extends ke {
  constructor(e, t, i) {
    super(e, t, i), this.level = -1, this.hasChildren = !1, this.isOpened = !1, this.isLeaf = !1;
  }
}
class Gi extends Ve {
  constructor(e) {
    super(), this.column = e;
  }
}
class Fi extends ke {
  constructor() {
    super();
  }
}
class Tt extends oe {
  constructor(e) {
    super(), this._grid = e, this._layers = [], this._reasonsMask = 0, this._invalidateFlag = !1, this._boundValidateNow = this.validateNow.bind(this), this._freeElementMap = /* @__PURE__ */ new Map(), this._factoryMap = /* @__PURE__ */ new Map(), this._scrollLeft = 0, this._scrollTop = 0, this._lockedDisplay = !1, this.hookFreeElement = null;
  }
  get grid() {
    return this._grid;
  }
  /**
   * 컨텐츠의 너비입니다.
   * @returns {number}
   */
  get contentWidth() {
    return this._contentWidth || 0;
  }
  /**
   * 컨텐츠의 높이입니다.
   * @returns {number}
   */
  get contentHeight() {
    return this._contentHeight || 0;
  }
  /**
   * scrollLeft의 최대값입니다.
   * @returns {number}
   */
  get maxScrollLeft() {
    return Math.max(0, this.contentWidth - this.clientWidth);
  }
  /**
   * scrollTop의 최대값입니다.
   * @returns {number}
   */
  get maxScrollTop() {
    return Math.max(0, this.contentHeight - this.clientHeight);
  }
  /**
   * 수평 스크롤 위치값입니다.
   * @returns {number}
   */
  get scrollLeft() {
    return this._scrollLeft || 0;
  }
  set scrollLeft(e) {
    if (e = parseInt(k(e, 0, this.maxScrollLeft)), this._scrollLeft !== e) {
      let t = this._scrollLeft;
      this._scrollLeft = e, this.updateScrollRect(), this.dispatchEvent(new CustomEvent("horizontal-scroll-position-change", {
        bubbles: !1,
        detail: {
          newValue: e,
          oldValue: t
        }
      }));
    }
  }
  /**
   * 수직 스크롤 위치값입니다.
   * @returns {number}
   */
  get scrollTop() {
    return this._scrollTop;
  }
  set scrollTop(e) {
    if (e = parseInt(k(e, 0, this.maxScrollTop)), this._scrollTop !== e) {
      let t = this._scrollTop;
      this._scrollTop = e, this.updateScrollRect(), this.dispatchEvent(new CustomEvent("vertical-scroll-position-change", {
        bubbles: !1,
        detail: {
          newValue: e,
          oldValue: t
        }
      }));
    }
  }
  /**
   * 컨텐츠 너비와 높이를 설정합니다.
   * @param width
   * @param height
   */
  setContentSize(e, t) {
    (e !== this.contentWidth || t !== this.contentHeight) && (this._contentWidth = e, this._contentHeight = t, this.dispatchEvent(new CustomEvent("content-size-change")));
  }
  getScrollRect() {
    return new O(this.scrollLeft, this.scrollTop, this.clientWidth, this.clientHeight);
  }
  getHorizontalScrollPositionDelta(e) {
    return e > 0 ? -30 : 30;
  }
  getVerticalScrollPositionDelta(e) {
    return e > 0 ? -30 : 30;
  }
  lockDisplay() {
    this._lockedDisplay = !0;
  }
  unlockDisplay() {
    this._lockedDisplay && (this._invalidateFlag = !1, this._lockedDisplay = !1, this.invalidateFor(_.ALL));
  }
  invalidate(e) {
    this.invalidateFor(e || _.DISPLAY_UPDATE);
  }
  validateNow() {
    !this._lockedDisplay && this._invalidateFlag && !this._inUpdateDisplay && (this._inUpdateDisplay = !0, this._updateDisplay(), this._inUpdateDisplay = !1, this._reasonsMask = 0, this._invalidateFlag = !1);
  }
  clearElementCache() {
    this._freeElementMap.clear(), this._factoryMap.clear();
  }
  invalidateFor(...e) {
    e.forEach((t) => {
      this._reasonsMask |= t | 0;
    }), this._invalidateFlag || (this._invalidateFlag = !0, we(this._boundValidateNow));
  }
  isInvalidateReason(...e) {
    for (let t = 0, i = e.length; t < i; t++) {
      let s = e[t];
      if ((this._reasonsMask & s) === s)
        return !0;
    }
    return !1;
  }
  _addLayer(e) {
    return this._layers.indexOf(e) < 0 && (this.appendChild(e), this._layers.push(e)), e;
  }
  _beginLayers() {
    let e = this._layers, t = e.length, i = 0;
    for (; i < t; i++)
      e[i].begin();
  }
  _endLayers() {
    this._layers.forEach((e) => e.end());
  }
  _prepareLayers(e, t, i, s) {
    this._layers.forEach((n) => n.prepareLayout(e, t, i, s));
  }
  _updateLayers(e, t, i, s, n, r, l) {
    this._layers.forEach((h) => h.updateLayout(e, t, i, s, n, r, l));
  }
  _createRenderer() {
    const e = this._itemToFactory.apply(this, arguments), t = this._freeElementMap.get(e), i = arguments[arguments.length - 1] instanceof Ve ? arguments[arguments.length - 1] : null;
    let s;
    return t && t.length > 0 ? s = t.pop() : e instanceof Function && (s = new e(this.grid), s && H(s, "created", this.grid, i)), s && H(s, "ready", this.grid, i), s;
  }
  _freeRenderer(e) {
    if (this.hookFreeElement instanceof Function && this.hookFreeElement(e) === !1)
      return;
    let t = e && e.constructor;
    if (!t)
      return !1;
    let i = this._freeElementMap.get(t);
    return i || (i = [], this._freeElementMap.set(t, i)), i.push(e), !0;
  }
  _itemToFactory() {
    const e = this._itemToTemplate.apply(this, arguments);
    if (e) {
      let t = this._factoryMap.get(e);
      return t || (t = se.factory(e), this._factoryMap.set(e, t)), t;
    }
    return null;
  }
  _itemToTemplate() {
  }
  _updateScrollRect() {
  }
  _updateDisplay() {
  }
  _mouseEventToContent(e) {
  }
  _mouseEventToLocal(e) {
    let t = this.root.getBoundingClientRect();
    return new A(Math.round(e.clientX - t.left), Math.round(e.clientY - t.top));
  }
}
const Oi = "tachyon-layer-", q = (class extends oe {
  constructor(e) {
    super(), this.useDB = !1, this._ctx = this.canvas.getContext("2d"), this._bufferCanvas = document.createElement("canvas"), this._bufferCtx = this._bufferCanvas.getContext("2d"), T(this.root, Oi + e);
  }
  get canvas() {
    return this.DOM.canvas;
  }
  get context() {
    return this.useDB ? this._bufferCtx : this._ctx;
  }
  begin() {
    this.context.save(), this.useDB && this._bufferCtx.clearRect(0, 0, this.canvas.width, this.canvas.height), this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  end() {
    this.context.restore(), this.useDB && this._bufferCanvas.width > 0 && this._bufferCanvas.height > 0 && this._ctx.drawImage(this._bufferCanvas, 0, 0);
  }
  setSize(e, t) {
    return super.setSize(e, t) ? (this.canvas.width !== e && (this.canvas.width = this._bufferCanvas.width = e), this.canvas.height !== t && (this.canvas.height = this._bufferCanvas.height = t), !0) : !1;
  }
  prepareLayout(e, t, i, s) {
    this.setSize(i, s);
  }
  updateLayout(e, t, i, s) {
  }
}).withDom('<div><canvas id="canvas" class="canvas"></canvas></div>'), L = (class extends oe {
  constructor(e) {
    super(), this.index = e, this.fragment = null;
  }
  begin() {
    this.fragment = document.createDocumentFragment();
  }
  end() {
    this.fragment.childNodes.length > 0 && this.root.appendChild(this.fragment), this.fragment = null;
  }
  addElement(e) {
    return this.fragment && e.parentElement !== this.root ? (this.fragment.appendChild(e), !0) : !1;
  }
}).withDom('<div class="tachyon-section"><div id="sizeMarker" style="position:absolute;width: 1px;height: 1px;visibility: hidden;pointer-events: none"></div></div>');
N(L, {
  LEFT: 1,
  RIGHT: 2,
  CENTER: 0,
  TOP: 1,
  BOTTOM: 2,
  MIDDLE: 0
});
const Ai = ["center", "left", "right"], zi = ["middle", "top", "bottom"];
class Be extends q {
  constructor(e) {
    super(e), this._sections = [], this._overlaySection = new L(), this.appendChild(this._overlaySection), T(this._overlaySection.root, "overlay");
  }
  begin() {
    super.begin(), this._sections.forEach((e, t, i) => {
      e && e.begin();
    }), this._overlaySection.begin();
  }
  end() {
    super.end(), this._sections.forEach((e) => {
      e && e.end();
    }), this._overlaySection.end();
  }
  updateLayout(e, t, i, s, n, r, l) {
    super.updateLayout(e, t, i, s, n, r, l);
    let h = this._sections.length, a, d, c, u, m, f;
    for (let p = 0; p < h; p++) {
      let g = this._sections[p];
      if (g) {
        let C = Math.floor(g.index / 3), y = g.index % 3;
        y === L.LEFT ? (a = 0, c = l.left, m = 0) : y === L.RIGHT ? (a = i - l.right, c = l.right, m = 0) : (a = l.left, c = i - (l.left + l.right), m = e, g.DOM.sizeMarker.style.left = n + "px"), C === L.TOP ? (d = 0, u = l.top, f = 0) : C === L.BOTTOM ? (d = s - l.bottom, u = l.bottom, f = 0) : (d = l.top, u = s - (l.top + l.bottom), f = t, g.DOM.sizeMarker.style.top = r + "px"), g.setLayout(a, d, c, u), g.root.scrollLeft = m, g.root.scrollTop = f;
      }
    }
    this._overlaySection.setLayout(0, 0, i, s);
  }
  addElement(e, t, i) {
    return this._getSection(e, t).addElement(i);
  }
  addOverlayElement(e) {
    this._overlaySection.addElement(e);
  }
  removeElement(e) {
    e instanceof HTMLElement && e.parentElement && e.parentElement.removeChild(e);
  }
  _getSection(e, t) {
    let i = e * 3 + t, s = this._sections[i];
    return s || (s = new L(i), this.appendChild(s), this.setChildIndex(this._overlaySection, this.childElementCount), T(s.root, Ai[t] + "-" + zi[e]), this._sections[i] = s, s.begin()), s;
  }
}
class Pi {
  constructor(e) {
    this.headerGroup = e, this._visibleColumns = [], this._visibleLayouts = [], this._oldVisibleColumns = null, this._pendingHeaders = null, this._headers = [], this._rowCount = 1, this._rowHeight = 30;
  }
  get dataGroup() {
    return this.headerGroup.dataGroup;
  }
  get columnCollection() {
    return this.dataGroup.columnCollection;
  }
  get rowCount() {
    return this._rowCount;
  }
  get headers() {
    return this._headers;
  }
  get rowHeight() {
    return this._rowHeight;
  }
  get headerHeight() {
    return this.rowHeight * this.rowCount;
  }
  setRowDefaultHeight(e) {
    this._rowHeight = e;
  }
  updateStart() {
    this._pendingHeaders = [];
  }
  updateEnd() {
    const e = this._headers;
    return this._headers = this._pendingHeaders, this._pendingHeaders = null, this._oldVisibleColumns = null, {
      headers: e
    };
  }
  getHeader(e) {
    const t = this._visibleColumns.indexOf(e);
    return t >= 0 ? this._headers[t] : null;
  }
  setHeader(e, t) {
    const i = this._pendingHeaders, s = this._visibleColumns.indexOf(e);
    i[s] = t;
  }
  takeHeader(e) {
    const t = (this._oldVisibleColumns || this._visibleColumns).indexOf(e);
    if (t >= 0) {
      const i = this._headers[t];
      return this._headers[t] = null, i;
    }
    return null;
  }
  createHeader(e) {
    return new Gi(e);
  }
  isOpenColumn(e) {
    if (!e.visible)
      return !1;
    let t = e.parent;
    for (; t; ) {
      if (!t.open)
        return !1;
      t = t.parent;
    }
    return !0;
  }
  getHeaderLayout(e) {
    const t = this._visibleColumns.indexOf(e);
    return t >= 0 ? this._visibleLayouts[t] : null;
  }
  /**
   * 헤더 행개수를 갱신합니다.
   */
  updateHeaderRowCount() {
    const e = this.dataGroup.normalizedColumns;
    this._rowCount = e.reduce((t, i) => {
      if (i.visible) {
        let s = 0, n = 0;
        for (; i; )
          (!i.open || i.height === 0) && (n = s), s++, i = i.parent;
        t = Math.max(s - n, t);
      }
      return t;
    }, 0);
  }
  /**
   * 헤더 컬럼 위치정보를 갱신합니다.
   */
  updateHeaderColumnLayouts() {
    const e = this.dataGroup._dimensions, t = this.dataGroup.normalizedColumns, i = this._visibleColumns, s = [], n = [], r = /* @__PURE__ */ new Set();
    e.forEachColumnLayouts((l, h) => {
      let a = t[h];
      for (; a && !r.has(a) && a.height !== 0; )
        r.add(a), this.isOpenColumn(a) && (s.push(a), n.push(this.calculateHeaderLayout(a))), a = a.parent;
    }), this._visibleColumns = s, this._visibleLayouts = n, this._oldVisibleColumns = i;
  }
  calculateHeaderLayout(e) {
    const t = this.columnCollection, i = this.dataGroup._dimensions, s = t.getVisibleLeafColumns(e), n = this.headerGroup.headerHeight, r = this.headerGroup.headerRowHeight, l = i.getColumnLayouts(s[0].index, s[s.length - 1].index), h = t.getAncestorNodes(e).reduce((d, c) => {
      let u = c.height;
      return (u == null || u < 0) && (u = r), d += u, d;
    }, 0), a = e.depth === 0 || !e.open ? n - h : e.height === 0 ? 0 : r;
    return { ...l, y: h, height: a, sy: 0, sh: a, dy: h, dh: a };
  }
  forEachHeaderLayouts(e) {
    this._visibleLayouts.forEach((t, i) => e(t, this._visibleColumns[i]));
  }
  clear() {
    this._visibleColumns = [], this._visibleLayouts = [], this._pendingHeaders = null, this._headers = [];
  }
}
const Vi = 5, ki = 400;
class Ht extends Tt {
  constructor(e) {
    super(e), this._headerDimensions = new Pi(this), this._selectionLayer = this._addLayer(new q("selection")), this._rendererLayer = this._addLayer(new Be("renderer")), this._separatorLayer = this._addLayer(new q("separator")), this._headerRenderer = G.headerRenderer || Je, this.headerRowHeight = G.styles.headerRowHeight, this._boundDocumentMouseMove = this._onDocumentMouseMove.bind(this), this._boundDocumentMouseUp = this._onDocumentMouseUp.bind(this), this.addEventListener("mousedown", this._onMouseDown.bind(this)), this.addEventListener("mousemove", this._onMouseMove.bind(this)), this.addEventListener("mouseout", this._onMouseOut.bind(this));
    const t = this._onDataGroupEvent.bind(this);
    [
      "visible-columns-change",
      "normalized-columns-change",
      "column-visible",
      "column-size-change",
      "horizontal-scroll-position-change",
      "group-size-change"
    ].forEach((i) => this.dataGroup.addEventListener(i, t));
  }
  get headerRenderer() {
    return this._headerRenderer;
  }
  set headerRenderer(e) {
    this._headerRenderer !== e && (this._headerRenderer = e, this.clearCache(), this.invalidateFor(_.RENDERER_CHANGE));
  }
  get headerHeight() {
    return this._headerDimensions.headerHeight;
  }
  get headerRowHeight() {
    return this._headerDimensions.rowHeight;
  }
  set headerRowHeight(e) {
    this.headerRowHeight !== e && (this._headerDimensions.setRowDefaultHeight(e), this.invalidate());
  }
  get dataGroup() {
    return this.grid.dataGroup;
  }
  get normalizedColumns() {
    return this.dataGroup.normalizedColumns;
  }
  doLayout(e) {
    this.invalidateFor(e ? _.ALL : 0), this.validateNow();
  }
  /**
   * x,y 위치로 컬럼을 반환합니다. x,y는 컨텐츠 좌표입니다.
   * @param x
   * @param y
   * @returns {null}
   */
  getColumnByPosition(e, t) {
    let i = null;
    return this._headerDimensions.forEachHeaderLayouts((s, n) => {
      !i && e >= s.x && e < s.x + s.width && t >= s.y && t < s.y + s.height && (i = n);
    }), i;
  }
  /**
   * 지정된 컬럼의 헤더 위치정보를 반환합니다.
   * @param column
   * @returns {*|null}
   */
  getHeaderLayout(e) {
    return this._headerDimensions.getHeaderLayout(e);
  }
  clearHeaderRenderers() {
    this._freeHeaders(this._headerDimensions.headers.slice(0));
  }
  clearCache() {
    this.clearHeaderRenderers(), this._headerDimensions.clear(), this.clearElementCache(), this.invalidateFor(_.RENDERER_CHANGE);
  }
  destroy() {
    this.clearCache();
  }
  _measureSize() {
    this.style.minHeight = this.headerHeight + "px";
  }
  _updateDisplay() {
    const e = this.dataGroup, t = e.scrollLeft, i = 0, s = e.clientWidth, n = e.getVisibleFrozenSizeRect().clone(), r = e.getContentWidth();
    n.top = n.bottom = 0;
    const l = this.isInvalidateReason(_.COLUMNS_CHANGE), h = this.isInvalidateReason(_.COLUMN_VISIBLE), a = this.isInvalidateReason(_.RENDERER_CHANGE), d = this.isInvalidateReason(_.VISIBLE_COLUMNS_CHANGE), c = l || h || d || this.isInvalidateReason(_.COLUMN_UPDATE, _.HORIZONTAL_SCROLL_CHANGE, _.GROUP_SIZE_CHANGE);
    l && this.clearCache(), this._beginLayers(), (l || h) && (this._headerDimensions.updateHeaderRowCount(), this._measureSize()), (c || a) && this._headerDimensions.updateHeaderColumnLayouts();
    const u = this.headerHeight;
    this._prepareLayers(t, i, s, u), this._createHeaders(t, i, s, u), this._paintSeparators(t, i, s, u), this._updateLayers(t, i, s, u, r, u, n), this._endLayers(), this.setContentSize(r, u);
  }
  _createHeaders(e, t, i, s) {
    const n = this._rendererLayer.context, r = this._headerDimensions;
    r.updateStart(), r.forEachHeaderLayouts((h, a) => {
      const d = r.takeHeader(a), c = this._createHeader(a, h, d);
      this._paintHeader(n, c, h), r.setHeader(a, c);
    });
    const { headers: l } = r.updateEnd();
    this._freeHeaders(l);
  }
  _createHeader(e, t, i) {
    const s = this._setupHeader(i, e), n = s.renderer || this._createRenderer(e, s);
    s.renderer = n;
    const r = n && n.htmlElement;
    if (r) {
      T(r, "header-cell");
      const l = this._rendererLayer;
      e.isLeaf ? (l.addElement(L.MIDDLE, this.dataGroup.getHorizontalSectionIndex(e.index), r), Ie(r, t.x - t.baseX, t.y, t.width, t.height)) : (l.addOverlayElement(r), Ie(r, t.dx, t.dy, Math.min(t.dw, t.width), t.dh));
    }
    return H(n, "prepare", this.grid, s), s;
  }
  _setupHeader(e, t) {
    return e || (e = this._headerDimensions.createHeader(t)), e.item = t, e.column = t, e.label = e.value = t.headerText, e.hovered = this._overColumn === t, e.visible = !0, e;
  }
  _paintHeader(e, t, i) {
    if (!t.visible)
      return;
    const s = t.renderer;
    if (s.paint) {
      const n = t.column.isLeaf, r = i.dx, l = i.dy, h = n ? i.sx : 0, a = n ? i.sy : 0, d = i.sw, c = i.sh, u = n ? i.width : d, m = n ? i.height : c;
      e.save(), e.beginPath(), e.rect(r, l, d, c), e.clip(), e.translate(r - h, l - a), s.paint(e, t, u, m), e.restore();
    }
  }
  _paintSeparators(e, t, i, s) {
    const n = this._separatorLayer.context, r = this._headerDimensions, l = this._getStyle("headerColumnLine");
    n.save(), r.forEachHeaderLayouts((c, u) => {
      const m = u.getStyle("headerColumnLine"), f = u.parent, p = f && r.getHeaderLayout(f) || null;
      r.getHeader(u), (!p || p.x + p.width !== c.x + c.width) && D(n, c.dx + c.dw, c.dy, c.dx + c.dw, s, m || l);
    });
    const h = this.dataGroup._dimensions.getColumnLayout(this.normalizedColumns.length - 1), a = h && h.x + h.width || -1;
    a > 0 && a < i && D(n, a, 0, a, s, l), this._grid.hasVerticalScroll && D(n, i - 1, 0, i - 1, s, l), n.restore();
    const d = this._getStyle("headerRowLine");
    n.save(), r.forEachHeaderLayouts((c, u) => {
      !u.isLeaf && c.height > 0 && D(n, c.dx, c.dy + c.dh, c.dx + Math.min(c.dw, c.width), c.dy + c.dh, d);
    }), n.restore();
  }
  _freeHeaders(e) {
    const t = this._rendererLayer;
    e.forEach((i) => {
      const s = i && i.renderer;
      if (s) {
        const n = s.htmlElement;
        H(s, "dispose"), n && t.removeElement(n), this._freeRenderer(s);
      }
    });
  }
  _itemToTemplate(e) {
    let t = e.headerRenderer || this.headerRenderer, i = t instanceof Function ? t(e) : t;
    return i || (i = Je), i;
  }
  _getStyle(e) {
    return this.grid.getStyle(e);
  }
  _dispatchDataGridHeaderEvent(e, t, i) {
    return this.dispatchEvent(new CustomEvent(e, {
      bubbles: !1,
      cancelable: !1,
      detail: {
        column: t,
        trigger: i
      }
    }));
  }
  _mouseEventToContent(e) {
    const t = this._mouseEventToLocal(e), i = this.dataGroup.clientWidth, s = this.dataGroup.contentWidth, n = this.dataGroup.getVisibleFrozenSizeRect();
    return n.left > 0 && t.x <= n.left || (n.right > 0 && i - t.x <= n.right ? t.x = s - (i - t.x) : t.x = t.x + this.dataGroup.scrollLeft), t;
  }
  _getSeparatorColumn(e) {
    const i = this._mouseEventToLocal(e);
    let s = null;
    if (this._headerDimensions.forEachHeaderLayouts((n, r) => {
      const l = n.dx + n.dw;
      (!r.isLeaf || n.width - (n.sx + n.sw) < 1) && i.x >= l - 5 && i.x < l + 5 && i.y >= n.y && i.y < n.y + n.height && (s = r);
    }), s && !s.isLeaf) {
      const n = this.dataGroup.columnCollection.getVisibleLeafColumns(s);
      s = n[n.length - 1];
    }
    return s;
  }
  _onMouseDown(e) {
    if (e.defaultPrevented)
      return;
    const t = this._mouseEventToContent(e), i = t && this.getColumnByPosition(t.x, t.y);
    i && (this._mouseDownPoint = t, this._mouseDownColumn = i, this._mouseDownSeparatorColumn = this._getSeparatorColumn(e), this._mouseDownSeparatorColumn ? (this._mouseDownColumn = null, this._dispatchDataGridHeaderEvent("separator-down", this._mouseDownSeparatorColumn, e)) : this._mouseDownColumn && this._dispatchDataGridHeaderEvent("header-down", this._mouseDownColumn, e), document.addEventListener("mousemove", this._boundDocumentMouseMove), document.addEventListener("mouseup", this._boundDocumentMouseUp));
  }
  _onMouseMove(e) {
    if ((e.buttons & 1) !== 1) {
      const t = this._getSeparatorColumn(e), i = this._mouseEventToContent(e), s = !t && this.getColumnByPosition(i.x, i.y);
      t !== this._overSeparatorColumn && (this._overSeparatorColumn && this._dispatchDataGridHeaderEvent("separator-out", this._overSeparatorColumn, e), t && this._dispatchDataGridHeaderEvent("separator-over", t, e)), s !== this._overColumn && (this._overColumn && this._dispatchDataGridHeaderEvent("header-out", this._overColumn, e), s && this._dispatchDataGridHeaderEvent("header-over", s, e)), this._overSeparatorColumn = t, this._overColumn = s;
    }
  }
  _onMouseOut(e) {
    this._overSeparatorColumn && this._dispatchDataGridHeaderEvent("separator-out", this._overSeparatorColumn, e), this._overColumn && this._dispatchDataGridHeaderEvent("header-out", this._overColumn, e), this._overSeparatorColumn = null, this._overColumn = null;
  }
  _onDocumentMouseMove(e) {
    const t = this._mouseEventToContent(e);
    this._mouseDownSeparatorColumn ? this._dispatchDataGridHeaderEvent("separator-drag", this._mouseDownSeparatorColumn, e) : this._mouseDownColumn && (!this._mouseDownPoint || A.distance(this._mouseDownPoint, t) > Vi) && (this._dispatchDataGridHeaderEvent("header-drag", this._mouseDownColumn, e), this._mouseDownPoint = null);
  }
  _onDocumentMouseUp(e) {
    document.removeEventListener("mousemove", this._boundDocumentMouseMove), document.removeEventListener("mouseup", this._boundDocumentMouseUp);
    let t = this._mouseEventToContent(e), i = t && this.getColumnByPosition(t.x, t.y), s = this._getSeparatorColumn(e);
    if (this._mouseDownSeparatorColumn && (i = null), s || i) {
      let n;
      this._lastClickTime >= 0 && Date.now() - this._lastClickTime < ki ? (this._lastClickTime = -1, n = s ? "separator-double-click" : "header-double-click") : (this._lastClickTime = Date.now(), n = s ? "separator-click" : "header-click"), this._dispatchDataGridHeaderEvent(n, s || i, e);
    }
    this._mouseDownSeparatorColumn && this._dispatchDataGridHeaderEvent("separator-up", this._mouseDownSeparatorColumn, e), this._mouseDownColumn && this._dispatchDataGridHeaderEvent("header-up", i, e), this._mouseDownSeparatorColumn = null, this._mouseDownColumn = null;
  }
  _onDataGroupEvent(e) {
    switch (e.type) {
      case "normalized-columns-change":
        this.invalidateFor(_.COLUMNS_CHANGE);
        break;
      case "visible-columns-change":
        this.invalidateFor(_.VISIBLE_COLUMNS_CHANGE);
        break;
      case "column-size-change":
        this.invalidateFor(_.COLUMN_UPDATE);
        break;
      case "column-visible":
        this.invalidateFor(_.COLUMN_VISIBLE);
        break;
      case "horizontal-scroll-position-change":
        this.invalidateFor(_.HORIZONTAL_SCROLL_CHANGE);
        break;
      case "group-size-change":
        this.invalidateFor(_.GROUP_SIZE_CHANGE);
        break;
    }
  }
}
Ht.withDom('<div class="tachyon-group-header"></div>');
class We extends b {
  constructor(e, t, i, s) {
    super(e, t, i, s), this._crossCellPositions = [];
  }
  /**
   * 셀의 상단 행 인덱스입니다.
   * @returns {number}
   */
  get crossCellPositions() {
    return this._crossCellPositions;
  }
  set crossCellPositions(e) {
    this._crossCellPositions = e || [];
  }
  containsCross(e, t) {
    return this.crossCellPositions.some((i) => i.contains(e, t));
  }
}
function j(o, e, t) {
  const i = o.length;
  for (let s = 0; s < i; s++) {
    let n = o[s];
    if (!n.isCrossed && e < n.y)
      break;
    if (n.contains(t, e))
      return n;
  }
  return null;
}
class Bi {
  constructor(e) {
    this._dataGroup = e, this._cells = [], this._affectColumnsMap = /* @__PURE__ */ new Map(), this._collection = null, this._compareFunction = null, this._columns = [], this._targetColumnIndices = [], this._doneRowsMap = {}, this._needUpdate = !0, this._crossCells = [], this._visibleRect = null, this._visibleCells = [];
  }
  /**
   * 셀 목록을 환합니다.
   * @returns {Array<CellPosition>}
   */
  getCells() {
    return this._cells.slice(0);
  }
  getCrossCells() {
    return this._needUpdate && (this._needUpdate = !1, this._crossCells = this._cells.reduce((e, t) => (t instanceof We && (e = e.concat(t.crossCellPositions)), e), [])), this._crossCells;
  }
  /**
   * 행당 셀을 추가합니다, 교차된 다른 셀은 삭제됩니다.
   * @param cell
   * @returns {boolean} 추가 되었으면 'true' 반환합니다.
   */
  addCell(e) {
    return e.isMerged ? (this.removeCell(e), this._internalAddCell(e), !0) : !1;
  }
  _internalAddCell(e) {
    this._needUpdate = !0;
    const t = this._cells, i = t.length;
    if (i <= 0)
      return t.push(e), !0;
    const s = e.y, n = e.x;
    for (let r = 0; r < i; r++) {
      const l = t[r], h = l.y, a = l.x;
      if (s < h || s === h && n < a)
        return t.splice(r, 0, e), !0;
    }
    return t.push(e), !0;
  }
  /**
   * 해당 셀과 교차한 모든 셀을 삭제합니다.
   * @param cell
   * @returns {Array<CellPosition>}
   */
  removeCell(e) {
    this._needUpdate = !0;
    const t = this._cells, i = [];
    let s = 0;
    for (; s < t.length; ) {
      let n = t[s];
      e.containsRect(n) ? (t.splice(s, 1), i.push(n)) : s++;
    }
    return i;
  }
  /**
   * 해당 셀 목록과 교차한 모든 셀을 삭제합니다.
   * @param cells
   * @returns {Array<CellPosition>[]}
   */
  removeCells(e) {
    return (e || []).map((t) => this.removeCell(t));
  }
  insertRows(e, t) {
    this._needUpdate = !0;
    const i = this._cells.slice(0), s = i.length, n = new b(e, 0, e + t - 1, 1073741824), r = [];
    for (let l = s - 1; l >= 0; l--) {
      let h = i[l];
      e <= h.y ? h.y += t : h.rowCount > 1 && n.intersects(h) && r.push.apply(r, i.splice(l, 1));
    }
    this._cells = i;
  }
  deleteRows(e, t) {
    this._needUpdate = !0;
    const i = this._cells.slice(0), s = i.length, n = new b(e, 0, e + t - 1, 1073741824), r = n.endRowIndex, l = [];
    for (let h = s - 1; h >= 0; h--) {
      let a = i[h];
      r < a.y ? a.y -= t : n.intersects(a) && l.push.apply(l, i.splice(h, 1));
    }
    this._cells = i;
  }
  insertColumns(e, t) {
  }
  deleteColumns(e, t) {
  }
  findCell(e, t) {
    let i = j(this._cells, e, t);
    return i || (i = j(this.getCrossCells(), e, t)), i;
  }
  findCellFromVisibleRect(e, t) {
    if (!this._visibleRect)
      return null;
    let i = null;
    return this._visibleRect.contains(t, e) ? this._visibleCells.length > 0 && (i = j(this._visibleCells, e, t)) : i = j(this._cells, e, t), i || (i = j(this.getCrossCells(), e, t)), i;
  }
  /**
   * 보이는 영역 지정
   * @param rowIndex
   * @param columnIndex
   * @param endRowIndex
   * @param endColumnIndex
   */
  setVisibleRect(e, t, i, s) {
    const n = new b(e, t, i, s), r = this._cells, l = [];
    for (let h = 0, a = r.length; h < a; h++) {
      let d = r[h];
      if (i < d.y)
        break;
      d.intersects(n) && l.push(d);
    }
    this._visibleRect = n, this._visibleCells = l;
  }
  unionCellPosition(e, t, i, s, n) {
    let r = this.getCells();
    n && (r = r.concat(this.getCrossCells()));
    let l = new b(e, t, i, s);
    for (let h = 0; h < r.length; h++) {
      let a = r[h];
      l.intersects(a) && (l.containsRect(a) || (l = l.union(a)), r.splice(h, 1), h = -1);
    }
    return l;
  }
  clear() {
    this._cells = [], this._crossCells = [], this._affectColumnsMap.clear(), this._doneRowsMap = {};
  }
  analysisReady() {
    const e = this._dataGroup.normalizedColumns.slice(0), t = e.filter((i) => i.isRowMerge || i.isColumnMerge).map((i) => i.index);
    this._affectColumnsMap.clear(), this._doneRowsMap = {}, this._collection = this._dataGroup.collection, this._columns = e, this._targetColumnIndices = t, this._compareFunction = this._dataGroup.mergeCompare, this._targetColumnIndices.forEach((i) => {
      const s = this._columns[i], n = s.mergeDependColumns;
      if (Array.isArray(n)) {
        const r = e.filter((l) => n.indexOf(l.dataField) >= 0);
        r.length > 0 && this._affectColumnsMap.set(s, r);
      }
    });
  }
  analysisAll() {
    let e = this._collection && this._collection.length || 0;
    for (let t = 0; t < e; t++)
      this.analysisRow(t);
  }
  analysisRow(e) {
    this._doneRowsMap[e] || (this._doneRowsMap[e] = !0, this._internalAnalysisRow(e));
  }
  analysisRows(e, t) {
    for (let i = e; i <= t; i++)
      this.analysisRow(i);
  }
  _internalAnalysisRow(e) {
    let t = this._targetColumnIndices.length, i = [];
    for (let s = 0; s < t; s++) {
      let n = this._targetColumnIndices[s];
      if (!j(i, e, n) && !j(this._cells, e, n)) {
        let r = this._analysisCell(e, n);
        r && i.push(r);
      }
    }
    for (this.removeCells(i); i.length > 0; )
      this._internalAddCell(i.shift());
  }
  _analysisCell(e, t) {
    let i = this._collection.get(e), s = this._columns[t], n = this._dataGroup.itemToLabel(i, s), r = e, l = t;
    if (s.isRowMerge && (r = this._compare(e, s, n, s)), s.isColumnMerge) {
      let h = this._targetColumnIndices.length, a = this._targetColumnIndices.indexOf(t), d = t, c, u;
      for (let m = a + 1; m < h && (c = this._targetColumnIndices[m], !(d !== c - 1 || (u = this._compare(e, this._columns[c], n, i, s), u < r))); m++)
        l = c, d = c;
    }
    return e !== r || t !== l ? new b(e, t, r, l) : null;
  }
  _compare(e, t, i, s) {
    let n = this._internalCompare(e, t, i, s);
    if (e < n) {
      let r = this._affectColumnsMap.get(t) || [], l = r.length, h = this._collection.get(e);
      for (let a = 0; a < l; a++) {
        let d = r[a], c = this._internalCompare(e, d, this._dataGroup.itemToLabel(h, d), s);
        if (c < n && (n = c), e >= n) {
          n = e;
          break;
        }
      }
    }
    return n;
  }
  _internalCompare(e, t, i, s) {
    let n = this._collection.length, r = this._collection.get(e), l = -1;
    for (let h = e; h < n; h++) {
      let a = this._collection.get(h), d = this._dataGroup.itemToLabel(a, t);
      if (this._compareFunction != null) {
        if (!this._compareFunction(a, t, r, s))
          break;
      } else if (i !== d)
        break;
      l = h;
    }
    return l;
  }
}
const Wi = {
  get merger() {
    return this._merger || (this._merger = new Bi(this)), this._merger;
  },
  /**
   * 병합된 셀 목록을 반환합니다.
   * @returns {Array<CellPosition>}
   */
  getMergeCellPositions() {
    return this.merger.getCells();
  },
  /**
   * 병합셀을 추가합니다.
   * @param cell
   * @returns {Boolean}
   */
  addMergeCellPosition(o) {
    return this.merger.addCell(o);
  },
  /**
   * 지정된 셀영역에 있는 병합셀을 삭제합니다.
   * @param cell
   * @returns {Array<CellPosition>}
   */
  removeMergeCellPosition(o) {
    return this.merger.removeCell(o);
  },
  /**
   * 지정된 셀영역에 있는 병합셀을 삭제합니다.
   * @param cells
   * @returns {Array<CellPosition>}
   */
  removeMergeCellPositions(o) {
    return this.merger.removeCells(o);
  },
  /**
   * 지정된 위치에 병합셀을 반환합니다.
   * @param rowIndex 행인덱스
   * @param columnIndex 컬럼인덱스
   * @returns {CellPosition}
   */
  findMergeCellPosition(o, e) {
    return this.merger.findCell(o, e);
  },
  findMergeCellPositionFromVisibleRect(o, e) {
    return this.merger.findCellFromVisibleRect(o, e);
  },
  /**
   *
   * @param rowIndex
   * @param columnIndex
   * @param endRowIndex
   * @param endColumnIndex
   */
  setMergeVisibleRect(o, e, t, i) {
    return this.merger.setVisibleRect(o, e, t, i);
  },
  unionCellPosition(o, e, t, i, s = !1) {
    return this.merger.unionCellPosition(o, e, t, i, s);
  },
  clearCellMerger() {
    return this.merger.clear();
  },
  analysisReady() {
    this.merger.analysisReady();
  },
  analysisAll() {
    this.merger.analysisAll();
  },
  analysisRow(o) {
    this.merger.analysisRow(o);
  },
  analysisRows(o, e) {
    this.merger.analysisRows(o, e);
  },
  collectionChangedForCellMerger(o) {
    let e = o.detail, t = e.index, i = e.items || [];
    switch (e.kind) {
      case "add":
        this.merger.insertRows(t, i.length);
        break;
      case "remove":
        this.merger.deleteRows(t, i.length);
        break;
    }
  }
};
function Gt(o, e) {
  return o === e || o == null && e == null || o instanceof Date && e instanceof Date && o.getTime() === e.getTime();
}
function Ui(o, e, t = !1, i = Gt) {
  let s = !0;
  const n = (r, l, h, a) => {
    if (!s && a(r, l))
      return !0;
    if (s = !1, typeof r != "object" || r == null || typeof l != "object" || l == null)
      return !1;
    const d = Object.keys(r), c = Object.keys(l);
    return d.length !== c.length ? !1 : d.every((u) => u in l && h ? n(r[u], l[u], h, a) : a(r[u], l[u]));
  };
  return n(o, e, t, i);
}
function ji(o, e, t = Gt) {
  return Ui(o, e, !1, t);
}
class Qe extends b {
  constructor(e, t, i, s, n) {
    super(e, t, i, s), this.isAdded = n;
  }
}
const et = "singleRow", tt = "multipleRows", Yi = "singleCell", it = "multipleCells";
class Ki {
  constructor(e) {
    this._dataGroup = e, this._selectionCells = [], this._maxBounds = null, this._cells = [], this._rows = [], this._needUpdateMaxBounds = !0, this._needUpdateCells = !0, this.mode = et;
  }
  get isRowMode() {
    return this.mode === et || this.mode === tt;
  }
  get isCellMode() {
    return this.mode === Yi || this.mode === it;
  }
  get isMultipleMode() {
    return this.mode === tt || this.mode === it;
  }
  get isSingleSelection() {
    return this._selectionCells.length === 1 && this._selectionCells[0].isAdded;
  }
  get selectedCells() {
    return this._selectionCells;
  }
  getSingleCell() {
    return this.isSingleSelection ? this._selectionCells[0].clone() : null;
  }
  getRows() {
    const e = [], t = this._getMaxBounds(), i = t.top, s = t.bottom, n = new b(0, 0);
    for (let r = i; r <= s; r++)
      n.y = r, this.containsCell(n) && e.push(r);
    return e;
  }
  getCells() {
    if (this._needUpdateCells) {
      const e = this._getMaxBounds(), t = e.rowIndex, i = e.endRowIndex, s = e.columnIndex, n = e.endColumnIndex, r = [], l = [], h = (a, d) => {
        for (let c = 0; c < l.length; c++)
          if (l[c].contains(d, a))
            return !0;
        return !1;
      };
      for (let a = t; a <= i; a++)
        for (let d = s; d <= n; d++)
          if (!h(a, d)) {
            let c = this._dataGroup.findMergeCellPosition(a, d);
            const u = c && c.x || d, m = c && c.y || a, f = c && c.width || 0, p = c && c.height || 0;
            this.containsBounds(u, m, f, p) && (c || (c = new b(a, d)), r.push(c), c.isMerged && l.push(c));
          }
      this._cells = r, this._needUpdateCells = !1;
    }
    return this._cells;
  }
  setCell(e) {
    return this.setCells(e ? [e] : []);
  }
  setCells(e) {
    return this.removeAll(), this.addCells(e), !0;
  }
  addCells(e) {
    return this.addCellsAt(e, this._selectionCells.length);
  }
  addCellsAt(e, t) {
    let i = e && e.length || 0, s, n = !1;
    for (s = 0; s < i; s++)
      this.addCellAt(e[s], t + s) && (n = !0);
    return n;
  }
  addCell(e) {
    return this.addCellAt(e, this._selectionCells.length);
  }
  addCellAt(e, t) {
    if (e && !this.containsCell(e)) {
      let i = this._cellToSelectionCell(e, !0);
      return this._selectionCells.splice(t, 0, i), this._needUpdateMaxBounds = !0, this._needUpdateCells = !0, !0;
    }
    return !1;
  }
  removeCell(e) {
    if (e && this.containsCell(e)) {
      const t = this._cellToSelectionCell(e, !1);
      return this._selectionCells.push(t), this._needUpdateMaxBounds = !0, this._needUpdateCells = !0, !0;
    }
    return !1;
  }
  removeAll() {
    return this._selectionCells.length <= 0 ? !1 : (this._selectionCells = [], this._needUpdateMaxBounds = !0, this._needUpdateCells = !0, !0);
  }
  itemsAdded(e, t) {
    if (!t)
      return;
    const i = this._selectionCells.length, s = t.length;
    for (let n = 0; n < i; n++) {
      const r = this._selectionCells[n];
      e <= r.y && (r.y += s);
    }
    this._needUpdateMaxBounds = !0, this._needUpdateCells = !0;
  }
  itemsRemoved(e, t) {
    const i = this._selectionCells.length, s = t.length;
    for (let n = i - 1; n >= 0; n--) {
      const r = this._selectionCells[n];
      e < r.y ? r.y -= s : e <= r.y && r.height <= s ? this._selectionCells.splice(n, 1) : e <= r.y + r.height && r.y <= e + s;
    }
    this._needUpdateMaxBounds = !0, this._needUpdateCells = !0;
  }
  containsCell(e) {
    return e && this.containsBounds(e.x, e.y, e.width, e.height);
  }
  containsBounds(e, t, i, s) {
    const n = this._selectionCells, r = n.length;
    let l = -1;
    for (let h = r - 1; h >= 0; h--) {
      let a = n[h];
      if (a.isAdded && a.contains(e, t, i, s)) {
        l = h;
        break;
      }
    }
    if (l === -1)
      return !1;
    for (let h = l + 1; h < r; h++) {
      let a = n[h];
      if (!a.isAdded && a.contains(e, t, i, s))
        return !1;
    }
    return !0;
  }
  clear() {
    this._selectionCells = [], this._cells = [], this._maxBounds = null, this._needUpdateMaxBounds = !0, this._needUpdateCells = !0;
  }
  _cellToSelectionCell(e, t) {
    return e instanceof Qe ? (e.isAdded = t, e) : new Qe(e.rowIndex, e.columnIndex, e.endRowIndex, e.endColumnIndex, t);
  }
  _getMaxBounds() {
    if (this._needUpdateMaxBounds) {
      const e = this._selectionCells.length;
      let t;
      if (e > 0) {
        t = this._selectionCells[0].clone();
        for (let i = 1, s; i < e; i++)
          s = this._selectionCells[i], s.isAdded && (t.left = Math.min(t.left, s.left), t.right = Math.max(t.right, s.right), t.top = Math.min(t.top, s.top), t.bottom = Math.max(t.bottom, s.bottom));
      } else
        t = new b(0, 0, 0, 0);
      this._maxBounds = t, this._needUpdateMaxBounds = !1;
    }
    return this._maxBounds;
  }
}
const Xi = {
  get selector() {
    return this._selector || (this._selector = new Ki(this), this._counter = new Ae((o, e) => this._dispatchSelectionEvent("selection-changing", o, e, !0), (o, e) => this._dispatchSelectionEvent("selection-change", o, e, !1))), this._selector;
  },
  get hasSelectionMode() {
    return this.isRowSelectionMode || this.isCellSelectionMode;
  },
  get isRowSelectionMode() {
    return this.selector.isRowMode;
  },
  get isCellSelectionMode() {
    return this.selector.isCellMode;
  },
  get isMultipleSelectionMode() {
    return this.selector.isMultipleMode;
  },
  get isSingleSelection() {
    return this.selector.isSingleSelection;
  },
  get selectionMode() {
    return this.selector.mode;
  },
  set selectionMode(o) {
    this.selector.mode = o;
  },
  get selectedIndices() {
    let o;
    return this.isRowSelectionMode ? o = this.selector.getRows() : o = [], o;
  },
  set selectedIndices(o) {
    this.setSelectedIndices(o);
  },
  get selectedIndex() {
    let o = this.selectedIndices;
    return o && o.length > 0 ? o[0] : -1;
  },
  set selectedIndex(o) {
    this.selectedIndex !== o && this.setSelectedIndices([o]);
  },
  get selectedItems() {
    return this.indicesToItems(this.selectedIndices);
  },
  set selectedItems(o) {
    this.collection && (this.selectedIndices = o.reduce((e, t) => {
      const i = this.collection.indexOf(t);
      return i >= 0 && e.push(i), e;
    }, []));
  },
  get selectedItem() {
    const o = this.selectedItems;
    return o && o.length > 0 && o[0] || null;
  },
  set selectedItem(o) {
    o !== this.selectedItem && (this.selectedItems = o && [o] || []);
  },
  get selectedCells() {
    return this.selector.getCells();
  },
  set selectedCells(o) {
    this.setSelectedCells(o);
  },
  get selectedCell() {
    const o = this.selectedCells;
    return o && o.length > 0 && o[0] || null;
  },
  set selectedCell(o) {
    this.selectedCell && this.selectedCell.equals(o) || (o ? this.setSelectedCells([o]) : this.removeSelectedAll());
  },
  getSingleCell() {
    return this.selector.getSingleCell();
  },
  containsSelectedCell(o) {
    return this.selector.containsCell(o);
  },
  containsSelectedPosition(o, e) {
    return this.selector.containsBounds(e, o);
  },
  setSelectedIndices(o) {
    let e = [];
    return o.forEach((t) => {
      e.push(new b(t, 0));
    }), this.setSelectedCells(e);
  },
  addSelectedRow(o) {
    return this.addSelectedCell(new b(o, 0));
  },
  removeSelectedRow(o) {
    return this.removeSelectedCell(new b(o, 0));
  },
  setSelectedCell(o) {
    return this.setSelectedCells(o ? [o] : []);
  },
  setSelectedCells(o) {
    return !this.isMultipleSelectionMode && o && o.length > 0 && (o = o.slice(0, 1)), ji(this.selector.selectedCells, o, (e, t) => e && t && e.equals(t)) ? !1 : this._executeSelectionFunction("setCells", "set", o);
  },
  addSelectedCell(o) {
    return this.isMultipleSelectionMode ? this._executeSelectionFunction("addCell", "add", o) : this.setSelectedCell(o);
  },
  removeSelectedCell(o) {
    return this._executeSelectionFunction("removeCell", "remove", o);
  },
  removeSelectedAll() {
    return this._executeSelectionFunction("removeAll", "remove");
  },
  indicesToItems(o) {
    if (this.collection) {
      const e = o && o.length || 0, t = [];
      for (let i = 0; i < e; i++) {
        const s = o[i], n = this.collection.get(s);
        n && t.push(n);
      }
      return t;
    }
    return null;
  },
  clearSelection() {
    this.selector.clear();
  },
  collectionChangedForSelection(o) {
    let e = o.detail;
    switch (e.kind) {
      case "add":
        this._itemsAddedForSelection(e.index, e.items);
        break;
      case "remove":
        this._itemsRemovedForSelection(e.index, e.items);
        break;
    }
  },
  _executeSelectionFunction(o, e, t) {
    const i = this.selector, s = this._counter;
    if (s.start(e, t)) {
      const r = i[o].call(i, t);
      return s.end(e, t), this.invalidateFor(_.SELECTION_CHANGE), r;
    }
    return s.cancel(), !1;
  },
  _itemsAddedForSelection(o, e) {
    this.selector.itemsAdded(o, e);
  },
  _itemsRemovedForSelection(o, e) {
    this.selector.itemsRemoved(o, e);
  },
  _dispatchSelectionEvent(o, e, t, i) {
    const s = Array.isArray(t) ? t : t ? [t] : [];
    return this.dispatchEvent(new CustomEvent(o, {
      bubbles: !1,
      cancelable: i,
      detail: {
        kind: e,
        cell: s[0] || null,
        cells: s
      }
    }));
  }
};
function $i(o, e) {
  let t = /* @__PURE__ */ Object.create({ __ROOT_NODE__: !0 });
  return t[e] = o, t;
}
function qi(o, e) {
  o && !(e in o) && (o[e] = []);
}
function Zi(o, e, t) {
  Array.prototype.splice.apply(o, [e, 0].concat(t));
}
function st(o, e, t) {
  o.splice(e, t.length);
}
function Me(o, e, t, i, s) {
  let n = e && e.length || 0, r = [];
  for (let l = 0; l < n; ++l) {
    let h = e[l];
    if (!i && t(h, o, e) && (r.push(h), s))
      return r;
    let a = this.getChildren(h);
    if (a && a.length > 0 && (r = r.concat(Me.call(this, h, a, t, i, s)), r.length > 0 && s) || i && t(h, o, e) && (r.push(h), s))
      return r;
  }
  return r;
}
function Ft(o) {
  let e = 1;
  return o && o.children && o.children.forEach((t) => {
    e = Math.max(e, Ft(t) + 1);
  }), e;
}
const nt = "noParent", ot = "parentToAbove";
class Ot extends vt {
  constructor(e) {
    super(), this.nodeEventCounter = new Ae(this.dispatchNodeEvent.bind(this)), this._rootNode = null, this._displayableNodes = [], this._openNodesMap = /* @__PURE__ */ new Map(), this._parentMap = /* @__PURE__ */ new Map(), this._childrenMap = /* @__PURE__ */ new Map(), this._childrenField = "children", this._displayPolicy = ot, this.source = e || [];
  }
  get displayableNodes() {
    return this._displayableNodes;
  }
  get childrenField() {
    return this._childrenField;
  }
  set childrenField(e) {
    this._childrenField !== e && (this._childrenField = e, this._reset());
  }
  get displayPolicy() {
    return this._displayPolicy;
  }
  set displayPolicy(e) {
    this._displayPolicy !== e && (this._displayPolicy = e, this.reset());
  }
  /**
   * 해당 노드의 부모 노드를 반환합니다.
   * @param node 자식 노드입니다.
   * @returns {*}
   */
  getParentNode(e) {
    let t = this._internalGetParentNode(e);
    return t === this._rootNode && (t = null), t;
  }
  /**
   * 해당 노드의 조상 노드 목록을 반환합니다.
   * @param node
   * @returns {Array}
   */
  getAncestorNodes(e) {
    const t = [];
    let i = this.getParentNode(e);
    for (; i; )
      t.unshift(i), i = this.getParentNode(i);
    return t;
  }
  /**
   * 해당 노드의 후손 노드 목록을 반환합니다.
   * @param node
   * @returns {Array}
   */
  getDescendantNodes(e) {
    return this.find((t) => e !== t, e);
  }
  /**
   * @param node
   * @return {null|unknown}
   * @private
   */
  _internalGetParentNode(e) {
    let t = this._parentMap.get(e);
    if (!t && this._rootNode) {
      let i = this.getNativeChildren(this._rootNode);
      if (i && i.indexOf(e) >= 0)
        return null;
      this._addAllParentMapping(), t = this._parentMap.get(e);
    }
    return t;
  }
  /**
   * 해당 노드의 자식노드들을 반환합니다.
   * @param node 부모 노드입니다.
   * @returns {Array} 자식노드 배열입니다.
   */
  getChildren(e) {
    e == null && (e = this._rootNode);
    let t = [];
    return this._childrenMap.has(e) || (e === this._rootNode || this.childrenField in e) && (t = this.getNativeChildren(e), this._addChildrenMapping(e, t)), t = this._childrenMap.get(e), t || [];
  }
  /**
   * 해당 노드의 가공되지 않은 원본 자식노드들을 반환합니다.
   * @param node 부모 노드입니다.
   * @returns {Array} 자식노드 배열입니다.
   */
  getNativeChildren(e) {
    return e || (e = this._rootNode), e && this.childrenField in e ? e[this.childrenField] || [] : [];
  }
  /**
   * 해당노드 하위의 열린 노드들을 배열형태로 반환합니다.
   * @param node 부모 노드입니다.
   * @returns {Array} 자식노드 배열입니다.
   */
  getDisplayableChildren(e) {
    return this._internalGetDisplayableChildren(e, !1);
  }
  /**
   * 해당노드의 형제노드들을 반환합니다.
   * @returns {Array} 형제노드 배열입니다.
   */
  getSiblingNodes(e) {
    const t = this.getParentNode(e);
    return this.getChildren(t);
  }
  /**
   * 해당 노드 부모의 기준으로 인덱스를 반환합니다.
   * @param node
   * @returns {Number} 형제 노드목록에서의 인덱스.
   */
  getNodeIndex(e) {
    return (this.getSiblingNodes(e) || []).indexOf(e);
  }
  _internalGetDisplayableChildren(e, t) {
    let i = [];
    return this.isOpenNode(e) && this.getChildren(e).forEach((n) => {
      t && this._addParentMapping(e, n), this._displayPolicy === nt ? (!this.isOpenNode(n) || !this.hasChildren(n)) && i.push(n) : this._displayPolicy === ot && i.push(n), i = i.concat(this._internalGetDisplayableChildren(n, t));
    }), i;
  }
  /**
   * 해당 노드에 자식이 있는지 확인합니다.
   * @param node
   * @returns {boolean}
   */
  hasChildren(e) {
    let t = this.getChildren(e);
    return t && t.length > 0 || !1;
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param node 추가할 자식 노드
   * @returns {boolean}
   */
  addNode(e, t) {
    let i = this.getNativeChildren(e), s = i && i.length || 0;
    return this.addNodeAt(e, t, s);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param node 추가할 자식 노드.
   * @param index 자식 노드 삽입 위치의 인덱스.
   * @returns {boolean}
   */
  addNodeAt(e, t, i) {
    return this.addNodesAt(e, [t], i);
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param nodes 추가할 자식 노드 목록
   * @returns {boolean}
   */
  addNodes(e, t) {
    const i = this.getNativeChildren(e);
    return this.addNodesAt(e, t, i.length);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param nodes 추가할 자식 노드 목록
   * @param index 자식 노드 삽입 위치의 인덱스.
   * @returns {boolean}
   */
  addNodesAt(e, t, i) {
    if (!t || t.length <= 0)
      return !1;
    this.nodeEventCounter.start(), e || (e = this._rootNode), i = Math.max(i, 0), qi(e, this.childrenField);
    let s = this.getChildren(e), n = this.getNativeChildren(e), r = n && n.length || 0, l = t.length;
    if (s !== n) {
      let h = s[i];
      i = n.indexOf(h), i < 0 && (i = r);
    }
    i = Math.min(i, r), this._internalCloseNode(e);
    for (let h = 0; h < l; h++) {
      let a = t[h];
      this._removeParentMapping(a), n.splice(i + h, 0, a), this._addParentMapping(e, a);
    }
    return this._removeChildrenMapping(e), this._internalOpenNode(e, !0), this.nodeEventCounter.end("add", !1, !1, t, e), !0;
  }
  /**
   *
   * @param node
   * @param toParent
   * @param toIndex
   * @returns {boolean}
   */
  moveNode(e, t, i) {
    if (this.getAncestorNodes(t).find((n) => n === e))
      return !1;
    const s = this.getParentNode(e);
    return this.dispatchNodeEvent("moving", !1, !0, [e], s, { toParent: t, toIndex: i }) ? (this.nodeEventCounter.start(), this.removeNode(s, e), this.addNodeAt(t, e, i), this.nodeEventCounter.end("move", !1, !1, [e], s, {
      toParent: t,
      toIndex: i
    }), !0) : !1;
  }
  /**
   * 부모 노드에서 자식 노드를 삭제합니다.
   * @param parent 부모 노드입니다.
   * @param node 삭제할 자식 노드 입니다.
   * @returns {boolean}
   */
  removeNode(e, t) {
    e || (e = this._rootNode);
    let i = this.getNativeChildren(e), s = i ? i.indexOf(t) : -1;
    if (s < 0)
      return !1;
    this.nodeEventCounter.start();
    let n = this.find((r) => !0, t);
    return this._internalCloseNode(e), this._removeChildrenMapping(e), n && n.forEach((r) => {
      this._removeOpenNodeMapping(r), this._removeChildrenMapping(r), this._removeParentMapping(r);
    }), i.splice(s, 1), this._internalOpenNode(e, !0), this.nodeEventCounter.end("remove", !1, !1, [t], e), !0;
  }
  /**
   * 부모 노드에서 자식 노드를 삭제합니다.
   * @param parent 부모 노드입니다.
   * @param nodes 자식 노드 목록입니다.
   * @returns {boolean}
   */
  removeNodes(e, t) {
    if (t) {
      this.nodeEventCounter.start();
      const i = [];
      if (t.forEach((s) => {
        this.removeNode(e, s) && i.push(s);
      }), i.length > 0)
        return this.nodeEventCounter.end("remove", !1, !1, i, e), !0;
      this.nodeEventCounter.cancel();
    }
    return !1;
  }
  /**
   * 해당 node가 있는지 확인합니다.
   * @param node
   * @return {boolean} 노드가 포함되어 있으면 true.
   */
  contains(e) {
    return !!this.findOne((i) => e === i);
  }
  /**
   * 해당 node 목록 있는지 확인합니다.
   * @param nodes {Array}
   * @return {boolean} 노드가 포함되어 있으면 true.
   */
  containsAll(e) {
    return (e && e.length || 0) <= 0 ? !1 : (e = e.slice(0), this.find((i, s) => {
      const n = e.indexOf(i);
      n >= 0 && e.splice(n, 1);
    }), e.length === 0);
  }
  /**
   * 해당 노드가 확장되어 있는지 확인합니다.
   * @param node
   * @return {boolean} 노드가 확장되어 있으면 true.
   */
  isOpenNode(e) {
    return e === this._rootNode ? !0 : this._openNodesMap.has(e);
  }
  /**
   * 해당 노느가 출력된 노드인지 확인합니다.
   * @param node
   * @return {boolean} 출련된 노드면 true.
   */
  isDisplayableNode(e) {
    let t = e;
    for (; t; ) {
      if (!this.isOpenNode(t))
        return !1;
      t = this.getParentNode(t);
    }
    return !0;
  }
  /**
   * 해당 노드를 확장합니다.
   * @param node
   * @return {boolean} 해당 노드가 확장되면 true.
   */
  openNode(e) {
    if (e !== null && !this.isOpenNode(e)) {
      const t = this.getParentNode(e);
      if (this.dispatchNodeEvent("expanding", !1, !0, [e], t))
        return this._addOpenNodeMapping(e), this._internalOpenNode(e, !0), this.dispatchNodeEvent("expand", !1, !1, [e], t), !0;
    }
    return !1;
  }
  _internalOpenNode(e, t) {
    if (this.isDisplayableNode(e)) {
      let i = this._internalGetDisplayableChildren(e, !0);
      if (i && i.length > 0) {
        let s = this._displayableNodes, n = e === this._rootNode ? s.length : s.indexOf(e);
        n >= 0 && (n += 1, Zi(s, n, i), t && this.dispatchCollectionEvent("add", i, n), this._displayPolicy === nt && e && e !== this._rootNode && (st(s, n - 1, [e]), this.dispatchCollectionEvent("remove", [e], n - 1)));
      }
    }
  }
  /**
   * 해당 노드를 축소합니다.
   * @param node
   * @return {boolean} 해당 노드가 축소되면 true.
   */
  closeNode(e) {
    if (e !== null && this.isOpenNode(e)) {
      const t = this.getParentNode(e);
      if (this.dispatchNodeEvent("collapsing", !1, !0, [e], t))
        return this._internalCloseNode(e), this._removeOpenNodeMapping(e), this.dispatchNodeEvent("collapse", !1, !1, [e], t), !0;
    }
    return !1;
  }
  _internalCloseNode(e) {
    if (this.isDisplayableNode(e)) {
      let t = this._internalGetDisplayableChildren(e, !1);
      if (t && t.length > 0) {
        let i = this._displayableNodes.indexOf(t[0]);
        i >= 0 && (st(this._displayableNodes, i, t), this.dispatchCollectionEvent("remove", t, i));
      }
    }
  }
  /**
   * 해당 노드 배열을 확장합니다.
   * @param nodes
   */
  openNodes(e) {
    let t = e && e.length, i, s;
    for (this._openNodesMap.clear(), s = 0; s < t; s++)
      i = e[s], this._addOpenNodeMapping(i);
    this._resetDisplayableNodes(), this._active = this._displayableNodes, this.dispatchCollectionEvent("refresh");
  }
  /**
   * 확장되어있는 노드목록을 반환합니다.
   * @returns {Array} 확장된 노드 목록
   */
  getOpenedNodes() {
    let e = [];
    return this._openNodesMap.forEach((t, i) => {
      e.push(i);
    }), e;
  }
  /**
   * 해당 노드의 레벨을 반환합니다.
   * @returns {Number} 노드 레벨
   */
  getNodeLevel(e) {
    if (e == null)
      return -1;
    let t = -1, i = this._internalGetParentNode(e);
    for (; i; )
      i = this._internalGetParentNode(i), t++;
    return t;
  }
  /**
   * 해당 노드의 깊이를 반환합니다.
   * @param node
   */
  getNodeDepth(e) {
    return (e ? [e] : this.toArray()).reduce((i, s) => Math.max(i, Ft(s)), 1);
  }
  forEach(e) {
    this.find((t, i, s) => {
      e.call(this, t, i, s);
    });
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 true를 반환하는 모든 항목이 포함된 새 배열을 만듭니다
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return {Array} callback true 반환하는 항목의 배열입니다.
   */
  find(e, t, i) {
    if (this.source && e) {
      let s = t && this.getParentNode(t) || null, n = t && [t] || this.getNativeChildren(s);
      return Me.call(this, s, n, e, i, !1);
    }
    return [];
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 처음으로 true를 반환하는 항목을 반환하고 탐색을 중지합니다.
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return {*} 처음으로 true 반환하는 항목입니다.
   */
  findOne(e, t, i) {
    if (this.source && e) {
      let s = t && this.getParentNode(t) || null, n = t && [t] || this.getNativeChildren(s), r = Me.call(this, s, n, e, i, !0);
      if (r && r.length > 0)
        return r[0];
    }
    return null;
  }
  /**
   * 전체 노드를 확장합니다.
   */
  expandAll() {
    this.openNodes(this._getParentsInNodes(this.getNativeChildren(null)));
  }
  /**
   * 전체 노드를 축소합니다.
   */
  collapseAll() {
    this.openNodes([]);
  }
  _resetDisplayableNodes() {
    this._displayableNodes = [], this._internalOpenNode(this._rootNode, !1);
  }
  _internalRefresh() {
    this._openNodesMap.clear(), this._parentMap.clear(), this._childrenMap.clear(), this._rootNode = $i(this.source, this.childrenField), this._resetDisplayableNodes(), this._active = this._displayableNodes;
  }
  _getParentsInNodes(e) {
    let t = e && e.length || 0, i = [], s, n, r;
    for (r = 0; r < t; r++)
      s = e[r], n = this.getChildren(s), n && n.length > 0 && (i.push(s), i = i.concat(this._getParentsInNodes(n)));
    return i;
  }
  _addOpenNodeMapping(e) {
    this._openNodesMap.set(e, !0);
  }
  _removeOpenNodeMapping(e) {
    this._openNodesMap.delete(e);
  }
  _addAllParentMapping() {
    this._lockAllParentMapping || (this._lockAllParentMapping = !0, this.find((e, t) => {
      t || (t = this._rootNode), this._addParentMapping(t, e);
    }, null, !1), this._lockAllParentMapping = !1);
  }
  _addParentMapping(e, t) {
    this._parentMap.set(t, e), e || console.warn("HierarchyList._addParentMapping !!!", t);
  }
  _removeParentMapping(e) {
    this._parentMap.delete(e);
  }
  _addChildrenMapping(e, t) {
    this._childrenMap.set(e, t);
  }
  _removeChildrenMapping(e) {
    this._childrenMap.delete(e);
  }
  dispatchNodeEvent(e, t, i, s, n, r = null) {
    const l = {
      collection: this,
      kind: e,
      nodes: s,
      parent: n,
      ...r
    };
    return this.dispatchEvent(new CustomEvent("node-change", {
      bubbles: t,
      cancelable: i,
      detail: l
    }));
  }
}
class At extends Ot {
  constructor(e) {
    super(e), this._leafColumnsMap = /* @__PURE__ */ new Map();
    const t = this._onCollectionChange.bind(this);
    this.addEventListener("collection-change", t), this.addEventListener("node-change", t);
  }
  updateColumns() {
    this.source && this.source.forEach((e) => {
      e.updateChildren();
    });
  }
  getLeafColumns(e) {
    return Re(e);
  }
  getVisibleLeafColumns(e) {
    let t = this._leafColumnsMap.get(e);
    return t || (t = Re(e).filter((i) => i.visible), this._leafColumnsMap.set(e, t)), t || [];
  }
  clearCache() {
    this._leafColumnsMap = /* @__PURE__ */ new Map();
  }
  _onCollectionChange(e) {
    const { type: t, detail: { kind: i } } = e;
    t === "collection-change" && i === "reset" ? this.clearCache() : t === "node-change" && (i === "move" || i === "remove" || i === "add") && this.clearCache();
  }
}
const P = 128, X = 7, z = 127;
class Ji {
  constructor(e, t) {
    this._index = e, this._itemFactory = t, this._items = new Array(P), this._total = 0, this._empty = P;
  }
  get empty() {
    return this._empty;
  }
  getTotal() {
    return this._total;
  }
  getItem(e) {
    return this._items[e];
  }
  addSize(e, t) {
    const i = this.getSize(z);
    this._items.splice(e, 0, null), t != null && this.setSize(e, t), this._total -= i || 0, this._items.length = P;
  }
  removeSize(e) {
    const t = this.getSize(e);
    return this._items.splice(e, 1), t != null && (this._total -= t || 0, this._empty = Math.min(P, this._empty + 1)), t;
  }
  getSize(e) {
    const t = this._items[e];
    if (t)
      return t.value;
  }
  setSize(e, t) {
    let i = this.getItem(e);
    i || (i = this._itemFactory(), this._items[e] = i, this._empty--);
    let s = i.value || 0;
    return i.value = t, this._total += t - s, i;
  }
}
class zt {
  constructor() {
    this._defaultSize = 30, this._blocks = [], this._gap = 0, this._maxIndex = -1;
  }
  get itemFactory() {
    return function() {
      return {
        value: 0
      };
    };
  }
  get gap() {
    return this._gap;
  }
  set gap(e) {
    this._gap = e;
  }
  get defaultSize() {
    return this._defaultSize;
  }
  set defaultSize(e) {
    e !== this._defaultSize && (this._defaultSize = e, this.clear());
  }
  /**
   * 사이즈 설정된 최대 인덱스.
   * @returns {number}
   */
  get maxIndex() {
    return this._maxIndex;
  }
  get length() {
    return Math.max(this._length > 0 ? this._length : this._maxIndex + 1, 0);
  }
  set length(e) {
    this._length !== e && (this._length = e, this._length <= this._maxIndex && (this._maxIndex = this._length - 1));
  }
  clear() {
    this._blocks = [], this._maxIndex = -1;
  }
  setSize(e, t) {
    const i = e >> X, s = e & z, n = this._getBlock(i), r = this.getSize(e);
    return n.setSize(s, t), this._maxIndex = Math.max(e, this._maxIndex), r !== t;
  }
  getSize(e) {
    return this.getItemValue(this.getItem(e));
  }
  indexOf(e) {
    let t = 0, i = 0, s = t >> X, n = t & z, r = this._getBlock(s), l = 0, h = 0, a;
    for (; i < e && (a = r.getItem(n), h = this.getItemValue(a) + this.gap, !(i + h > e)); ) {
      if (i += h, n++, n >= P) {
        for (n = 0, s += 1, l = this._getBlockTotalAt(s); l + i < e; )
          i += l, t += P, s += 1, l = this._getBlockTotalAt(s);
        r = this._getBlock(s);
      }
      t++;
    }
    return t;
  }
  getTotal(e, t) {
    e = e || 0, t = t ?? this.length - 1;
    let i = 0, s, n = e;
    for (; n <= t; ) {
      for (; !(n & z) && n + P < t; )
        s = n >> X, i += this._getBlockTotalAt(s), n += P;
      i += this.getSize(n) + this.gap, n++;
    }
    return t > 0 && (i -= this.gap), i;
  }
  addSize(e, t) {
    const i = this._blocks, s = i && i.length || 0;
    let n = e >> X, r = e & z, l = n, h, a;
    for (; l < s; l++)
      h = this._getBlock(l), a = h.removeSize(z), h.addSize(r, t), t = a, r = 0;
    a != null && (h = this._getBlock(s), h.addSize(0, a)), this.length++, this._maxIndex++;
  }
  removeSize(e) {
    const t = this._blocks, i = t && t.length || 0;
    let s = e >> X, n = e & z, r, l, h, a = null;
    for (l = this._getBlock(s), l.removeSize(n), r = i - 1; r >= s; r--)
      l = this._getBlock(r), r !== s && (h = l.removeSize(0)), a != null && l.setSize(z, a), a = h;
    this.length--, this._maxIndex--;
  }
  getItem(e) {
    const t = e >> X, i = e & z;
    return t >= 0 && t < this._blocks.length ? this._getBlock(t).getItem(i) : null;
  }
  getItemValue(e) {
    return e && !isNaN(e.value) ? e.value : this.defaultSize;
  }
  _createBlock(e) {
    return new Ji(e, this.itemFactory);
  }
  _getBlock(e) {
    let t = this._blocks[e];
    return t || (t = this._blocks[e] = this._createBlock(e)), t;
  }
  _getBlockTotal(e) {
    return e.getTotal() + e.empty * this.defaultSize + this.gap * P;
  }
  _getBlockTotalAt(e) {
    return this._getBlockTotal(this._getBlock(e));
  }
}
function Qi(o) {
  const e = [];
  for (; 0 < o--; )
    e.push(0);
  return e;
}
class es extends zt {
  constructor(e) {
    super();
  }
  get itemFactory() {
    return function() {
      return {
        value: 0,
        cellHeights: [],
        maxCellHeight: 0
      };
    };
  }
  getMaxCellHeight(e) {
    let t = this.getItem(e);
    return t && t.maxCellHeight || 0;
  }
  setCellHeight(e, t, i) {
    if (isNaN(i))
      return !1;
    let s = this.getItem(e);
    s || (this.setSize(e, this.defaultSize), s = this.getItem(e));
    let n = s.cellHeights;
    return n[t] !== i ? (n[t] = i, this._updateMaxCellHeight(s), !0) : !1;
  }
  insertColumns(e, t) {
    const i = this.length, s = Array.prototype.splice, n = Qi(t);
    for (let r = 0; r < i; r++) {
      let l = this.getItem(r), h = l.cellHeights;
      h.length < e && (h.length = e), s.apply(h, [e, 0].concat(n)), this._updateMaxCellHeight(l);
    }
  }
  removeColumns(e, t) {
    const i = this.length;
    let s, n;
    for (n = 0; n < i; n++)
      s = this.getItem(n), s.cellHeights.splice(e, t), this._updateMaxCellHeight(s);
  }
  _updateMaxCellHeight(e) {
    e.maxCellHeight = e.cellHeights.reduce((t, i) => t > i ? t : i);
  }
}
class ts {
  constructor(e, t = -1) {
    this._dimension = e, this._cells = [], this._layout = null, this._height = 0, this._index = t;
  }
  get index() {
    return this._index;
  }
  get columnIndices() {
    return this._dimension.isColumnChanging ? this._dimension.oldColumnIndices : this._dimension.columnIndices;
  }
  get cells() {
    return this._cells;
  }
  get layout() {
    return this._layout;
  }
  get height() {
    return this._height;
  }
  setIndex(e) {
    this._index = e;
  }
  setCells(e) {
    return this._cells = e, this;
  }
  setHeight(e) {
    return this._height = e, this;
  }
  setLayout(e) {
    return this._layout = e, this;
  }
  getCellAt(e) {
    const t = this.columnIndices.indexOf(e);
    return t >= 0 ? this._cells[t] : null;
  }
  takeCellAt(e) {
    const t = this.columnIndices.indexOf(e);
    if (t >= 0) {
      const i = this._cells[t];
      return this._cells[t] = null, i;
    }
    return null;
  }
}
class is extends F {
  constructor(e) {
    super(), this.hostColumn = e, this.draggable = !1, this.sortable = !1, this.editable = !1, this.open = !1;
  }
  get boxMode() {
    return this.hostColumn.boxMode;
  }
  get indent() {
    return this.hostColumn.indent;
  }
  get itemRenderer() {
    return this.hostColumn.itemRenderer;
  }
  get dataField() {
    return this.hostColumn.dataField;
  }
  set dataField(e) {
  }
  get dataFieldPath() {
    return this.hostColumn.dataFieldPath;
  }
  get headerText() {
    return "" + (this.hostColumn.children.indexOf(this) + 1);
  }
  set headerText(e) {
  }
  itemToLabel(e) {
    const i = this.hostColumn.children.indexOf(this);
    return this.grid.collection.getNodeLevel(e) > i ? null : super.itemToLabel(e);
  }
}
class te extends F {
  /**
   * @param dataField 값이 표시되는 항목의 필드
   * @param headerText 헤더 타이틀
   */
  constructor(e = null, t = "") {
    super(e, t), this._indent = 20, this._boxMode = !1;
  }
  get indent() {
    return this._indent;
  }
  set indent(e) {
    this._indent !== e && (this._indent = e, this.invalidate());
  }
  /**
   * 노드 모양을 '┌' 보이게 합니다.
   * @returns {Boolean}
   */
  get boxMode() {
    return this._boxMode;
  }
  set boxMode(e) {
    this._boxMode !== e && (this._boxMode = e);
  }
  toJSON() {
    return [
      "minWidth",
      "width",
      "dataField",
      "headerText",
      "children",
      "visible",
      "boxMode",
      "indent",
      "open"
    ].reduce((e, t) => (t === "children" ? e[t] = this.children.map((i) => i.toJSON()) : (e[t] = this[t], t === "width" && e[t]), e), {});
  }
}
function be(o, e, t, i, s) {
  const n = o[e], r = o[o.length - 1 - t], l = o.indexOf(i), h = o.indexOf(s);
  let a = i;
  l < 0 && (i >= r ? t > 0 ? a = o[o.length - t] : h >= 0 ? a = s : a = r : a = n);
  let d = s;
  return h < 0 && (s < n ? e > 0 ? d = o[e - 1] : l >= 0 ? d = i : d = n : d = r), [a, d];
}
function Ee(o, e, t, i) {
  return !(o > i || e < t);
}
function xe(o, e, t, i, s) {
  return !!(e > 0 && Ee(i, s, o[0], o[e - 1]) || t > 0 && Ee(i, s, o[o.length - t], o[o.length - 1]) || Ee(i, s, o[e], o[o.length - t - 1]));
}
class ss {
  constructor(e) {
    this.dataGroup = e, this.columnLinearVector = new zt(), this.rowLinearVector = new es(), this._columnIndices = [], this._columnLayouts = [], this._oldColumnIndices = null, this._rows = [], this._rowIndices = [], this._mergeCells = [], this._mergeCellPositions = [], this._mergeCellLayouts = [], this._pendingRows = null, this._pendingIndices = null, this._pendingMergeCellPositions = null, this._visibleFrozenIndexRect = new O(), this._visibleFrozenSizeRect = new O();
  }
  get columnIndices() {
    return this._columnIndices;
  }
  get columnLayouts() {
    return this._columnLayouts;
  }
  get oldColumnIndices() {
    return this._oldColumnIndices;
  }
  get mergeCellLayouts() {
    return this._mergeCellLayouts;
  }
  get rows() {
    return this._rows;
  }
  get rowIndices() {
    return this._rowIndices;
  }
  get mergeCellPositions() {
    return this._mergeCellPositions;
  }
  get mergeCells() {
    return this._mergeCells;
  }
  get cells() {
    return this._rows.reduce((e, t) => (e = e.concat(t.cells), e), []);
  }
  get visibleFrozenIndexRect() {
    return this._visibleFrozenIndexRect;
  }
  get visibleFrozenSizeRect() {
    return this._visibleFrozenSizeRect;
  }
  get firstColumnIndex() {
    return this._columnIndices.length > 0 ? this._columnIndices[0] : -1;
  }
  get lastColumnIndex() {
    return this._columnIndices.length > 0 ? this._columnIndices[this._columnIndices.length - 1] : -1;
  }
  get isColumnChanging() {
    return !!this._oldColumnIndices;
  }
  getRowDefaultHeight() {
    return this.rowLinearVector.defaultSize;
  }
  setRowDefaultHeight(e) {
    this.rowLinearVector.defaultSize = e;
  }
  setRowSize(e) {
    this.rowLinearVector.length = e;
  }
  createRow(e) {
    return new ts(this, e);
  }
  /**
   * index 행 반환
   * @param index
   */
  getRow(e) {
    const t = this._rowIndices.indexOf(e);
    return t >= 0 ? this._rows[t] : null;
  }
  getRowIndexOf(e) {
    const t = this._rows.indexOf(e);
    return t >= 0 ? this._rowIndices[t] : null;
  }
  setRow(e, t, i) {
    const s = this._pendingIndices || this._rowIndices, n = this._pendingRows || this._rows;
    let r = 0;
    for (let l = s.length; r < l && !(e < s[r]); r++)
      ;
    s.splice(r, 0, e), n.splice(r, 0, t), this.rowLinearVector.setSize(e, i);
  }
  /**
   * 지정된 인덱스 행정보를 삭제 후 반환합니다. 전체 행의 위치와 개수는 변하지 않습니다.
   * @param index
   * @returns {null|*}
   */
  takeRow(e) {
    const t = this._rowIndices.indexOf(e);
    return t >= 0 ? (this._rowIndices.splice(t, 1), this._rows.splice(t, 1)[0]) : null;
  }
  insertRow(e, t, i) {
    const s = this._rowIndices;
    return s.forEach((n, r) => {
      e <= n && (s[r] = n + 1);
    }), this.rowLinearVector.addSize(e, i), this.setRow(e, t, i), !0;
  }
  /**
   * 지정된 인덱스 행정보를 삭제 후 반환합니다. 행의 개수와 각 인덱스는 변경됩니다.
   * @param index
   * @returns {null|*}
   */
  removeRow(e) {
    const t = this.takeRow(e), i = this._rowIndices;
    return this.rowLinearVector.removeSize(e), i.forEach((s, n) => {
      e <= s && (i[n] = s - 1);
    }), t;
  }
  insertColumn(e) {
    const t = this._columnIndices;
    t.forEach((i, s) => {
      e <= i && (t[s] = i + 1);
    });
  }
  removeColumn(e) {
    const t = this._columnIndices, i = t.indexOf(e), s = [];
    return i >= 0 && (t.splice(i, 1), this._rows.forEach((n) => {
      Array.prototype.push.apply(s, n.cells.splice(i, 1));
    }), this._columnLayouts.splice(i, 1), t.forEach((n, r) => {
      e <= n && (t[r] = n - 1);
    })), s;
  }
  createCell(e, t, i) {
    return t instanceof te ? new Hi(e, t, i) : new ke(e, t, i);
  }
  getCell(e, t) {
    const i = this._rowIndices.indexOf(e);
    return i >= 0 ? this._rows[i].getCellAt(t) : null;
  }
  getMergeCell(e) {
    const t = this._mergeCellPositions.indexOf(e);
    return t >= 0 ? this._mergeCells[t] : null;
  }
  removeMergeCellPosition(e) {
    const t = this._mergeCellPositions.indexOf(e);
    return t >= 0 ? (this._mergeCellPositions.splice(t, 1), this._mergeCellLayouts.splice(t, 1), this._mergeCells.splice(t, 1)[0]) : null;
  }
  hasPendingMergeCellPosition(e) {
    return (this._pendingMergeCellPositions || []).indexOf(e) >= 0;
  }
  setMergeCell(e, t) {
    const i = this._pendingMergeCellPositions || this._mergeCellPositions, s = this._pendingMergeCells || this._mergeCells;
    i.push(e), s.push(t);
  }
  /**
   * 지정된 행의 위치 정보를 반환
   * @param rowIndex
   * @returns {*}
   */
  getRowLayout(e) {
    const t = this._rowIndices.indexOf(e);
    return t >= 0 ? this._rows[t].layout : null;
  }
  /**
   * 지정된 컬럼의 위치 정보를 반환
   * @param columnIndex
   * @returns {*}
   */
  getColumnLayout(e) {
    const t = this._columnIndices.indexOf(e);
    return t >= 0 ? this._columnLayouts[t] : null;
  }
  getColumnLayouts(e, t) {
    if (e === t)
      return this.getColumnLayout(e);
    const i = this._visibleFrozenIndexRect;
    if (!xe(this._columnIndices, i.left, i.right, e, t))
      return null;
    const s = be(this._columnIndices, i.left, i.right, e, t), n = this.getColumnLayout(s[0]), r = this.getColumnLayout(s[1]);
    return {
      x: this.getColumnX(e),
      width: this.getColumnsWidth(e, t),
      sx: n.sx + this.getColumnsWidth(e, s[0] - 1),
      sw: r.dx + r.dw - n.dx,
      dx: n.dx,
      dw: r.dx + r.dw - n.dx
    };
  }
  /**
   * 지정된 셀의 위치 정보 반환
   * @param rowIndex
   * @param columnIndex
   * @returns {{}|null}
   */
  getCellLayout(e, t) {
    const i = this.getRowLayout(e), s = this.getColumnLayout(t);
    if (i && s) {
      const n = { ...i, ...s };
      return delete n.index, n;
    }
    return null;
  }
  getCellLayoutByCellPosition(e) {
    if (!e.isMerged)
      return this.getCellLayout(e.rowIndex, e.columnIndex);
    const t = this._mergeCellPositions.indexOf(e);
    return t >= 0 ? this._mergeCellLayouts[t] : null;
  }
  calculateCellLayoutByCellPosition(e) {
    const { rowIndex: t, columnIndex: i, endRowIndex: s, endColumnIndex: n } = e;
    if (!e.isMerged)
      return this.getCellLayout(t, i);
    const r = this._visibleFrozenIndexRect, l = be(this._rowIndices, r.top, r.bottom, t, s), h = be(this._columnIndices, r.left, r.right, i, n), a = this.getRowLayout(l[0]), d = this.getRowLayout(l[1]), c = this.getColumnLayout(h[0]), u = this.getColumnLayout(h[1]);
    return {
      x: this.getColumnX(i),
      y: this.getRowY(i),
      width: this.getColumnsWidth(i, n),
      height: this.getRowsHeight(t, s),
      sx: c.sx + this.getColumnsWidth(i, h[0] - 1),
      sy: a.sy + this.getRowsHeight(t, l[0] - 1),
      sw: u.dx + u.dw - c.dx,
      sh: d.dy + d.dh - a.dy,
      dx: c.dx,
      dy: a.dy,
      dw: u.dx + u.dw - c.dx,
      dh: d.dy + d.dh - a.dy
    };
  }
  isVisibleRow(e) {
    return this._rowIndices.indexOf(e) >= 0;
  }
  isVisibleColumn(e) {
    return this._columnIndices.indexOf(e) >= 0;
  }
  isVisiblePosition(e, t) {
    return this.isVisibleRow(e) && this.isVisibleColumn(t);
  }
  /**
   *
   */
  isVisibleCell(e) {
    const { rowIndex: t, columnIndex: i, endRowIndex: s, endColumnIndex: n } = e, r = this._visibleFrozenIndexRect, l = xe(this._rowIndices, r.top, r.bottom, t, s), h = xe(this._columnIndices, r.left, r.right, i, n);
    return l && h;
  }
  /**
   * 지정된 행을 구성하는 셀 목록을 반환
   * @param index
   * @returns {*}
   */
  getCellsByRow(e) {
    const t = this._rowIndices.indexOf(e);
    return t >= 0 ? this._rows[t].cells : [];
  }
  /**
   * 지정된 컬럼을 구성하는 셀 목록을 반환
   * @param index
   * @returns {*}
   */
  getCellsByColumn(e) {
    const t = this._columnIndices.indexOf(e);
    return t >= 0 ? this._rows.map((i) => i.cells[t]) : [];
  }
  /**
   * 주어진 callback 함수를 행 위치데이타 각각에 대해 실행합니다.
   * @param callback(layout, rowIndex)
   */
  forEachRowLayouts(e) {
    this._rows.forEach((t, i) => e(t.layout, this._rowIndices[i], t));
  }
  /**
   * 주어진 callback 함수를 컬럼 위치데이타 각각에 대해 실행합니다.
   * @param callback(layout, columnIndex)
   */
  forEachColumnLayouts(e) {
    this._columnLayouts.forEach((t, i) => e(t, this._columnIndices[i]));
  }
  /**
   * 주어진 callback 함수를 셀 위치데이타 각각에 대해 실행합니다.
   * @param callback(layout, rowIndex, columnIndex, cell)
   */
  forEachCellLayouts(e) {
    const t = this._rowIndices.length, i = this._columnIndices.length;
    for (let s = 0; s < t; s++) {
      const n = this._rowIndices[s], r = this._rows[s], l = r.layout, h = r.cells;
      for (let a = 0; a < i; a++) {
        const d = this._columnIndices[a], c = this._columnLayouts[a], u = h[a];
        e({ ...l, ...c }, n, d, u);
      }
    }
  }
  /**
   * 주어진 callback 함수를 셀 위치데이타 각각에 대해 실행합니다.
   * @param callback(layout, rowIndex, columnIndex)
   */
  forEachMergeCellLayouts(e) {
    this._mergeCellLayouts.forEach((t, i) => {
      e(t, this._mergeCellPositions[i]);
    });
  }
  updateStart() {
    this._isUpdating = !0, this._pendingRows = [], this._pendingIndices = [], this._pendingMergeCellPositions = [], this._pendingMergeCellLayouts = [], this._pendingMergeCells = [];
  }
  updateEnd() {
    this._isUpdating = !1;
    const e = this._rows, t = this._mergeCells;
    return this._rows = this._pendingRows, this._rowIndices = this._pendingIndices, this._mergeCellPositions = this._pendingMergeCellPositions, this._mergeCells = this._pendingMergeCells, this._pendingRows = null, this._pendingIndices = null, this._pendingMergeCellPositions = null, this._pendingMergeCells = null, this._mergeCellLayouts = this._mergeCellPositions.map((i) => this.calculateCellLayoutByCellPosition(i)), this._mergeCells = this._mergeCells.map((i) => i instanceof Function ? i() : i), this._oldColumnIndices = null, {
      rows: e,
      mergeCells: t
    };
  }
  clear() {
    this._columnIndices = [], this._columnLayouts = [], this._rows = [], this._rowIndices = [], this._mergeCells = [], this._mergeCellPositions = [], this._mergeCellLayouts = [], this._visibleFrozenIndexRect = new O(), this._visibleFrozenSizeRect = new O();
  }
  /**
   * 지정된 컬럼인덱스의 x좌표를 반환합니다.
   * @param index
   * @returns {Number}
   */
  getColumnX(e) {
    return this.columnLinearVector.getTotal(0, e - 1);
  }
  /**
   * 지정된 x좌표에 해당하는 컬럼 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
   * @param x
   * @returns {Number}
   */
  getColumnIndexByDistance(e) {
    return this.columnLinearVector.indexOf(e);
  }
  /**
   * 지정된 컬럼 인덱스의 너비를 반환합니다.
   * @param index 컬럼 인덱스
   * @returns {Number}
   */
  getColumnWidth(e) {
    return this.columnLinearVector.getSize(e);
  }
  /**
   * 지정된 컬럼 인덱스 너비를 설정합니다.
   * @param index
   * @param size
   */
  setColumnWidth(e, t) {
    return this.getColumnWidth(e) !== t ? (this.columnLinearVector.setSize(e, t), !0) : !1;
  }
  /**
   * from 컬럼부터 to 컬럼까지의 너비의 합을 반환합니다.
   * @param from 시작 컬럼 인덱스
   * @param to 종료 컬럼 인덱스
   * @returns {Number}
   */
  getColumnsWidth(e, t) {
    return e < 0 || t < 0 || e == null ? 0 : this.columnLinearVector.getTotal(e, t);
  }
  getRowY(e) {
    return this.rowLinearVector.getTotal(0, e - 1);
  }
  /**
   * 지정된 y좌표에 해당하는 행 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
   * @param y
   * @returns {Number}
   */
  getRowIndexByDistance(e) {
    return this.rowLinearVector.indexOf(e);
  }
  /**
   * 지정된 인덱스 행 높이를 반환합니다.
   * @param index
   * @returns {Number}
   */
  getRowHeight(e) {
    return this.rowLinearVector.getSize(e);
  }
  /**
   * from 부터 to 높이의 합을 반환합니다.
   * @param from
   * @param to
   * @returns {*}
   */
  getRowsHeight(e, t) {
    return this.rowLinearVector.getTotal(e, t);
  }
  /**
   * 지정된 인덱스의 행 높이를 설정합니다.
   * @param index
   * @param height
   * @returns {boolean}
   */
  setRowHeight(e, t) {
    return this.rowLinearVector.setSize(e, t);
  }
  setCellHeight(e, t, i) {
    return this.rowLinearVector.setCellHeight(e, t, i);
  }
  /**
   * 컨텐츠 너비를 반환합니다.
   * @returns {Number}
   */
  getColumnsTotal() {
    return this.columnLinearVector.getTotal();
  }
  /**
   * 컨텐츠 높이를 반환합니다.
   * @returns {Number}
   */
  getRowsTotal() {
    return this.rowLinearVector.getTotal();
  }
  /**
   *
   */
  updateTypicalColumnSizes() {
    const e = this.dataGroup.normalizedColumns;
    this.columnLinearVector.clear(), this.columnLinearVector.length = e.length, e.forEach((t) => {
      const i = t.visible ? k(t.width || 0, t.minWidth) : 0;
      this.columnLinearVector.setSize(t.index, i);
    });
  }
  /**
   * 고정영역(상, 하, 좌, 우) 인덱스 업데이트
   * @private
   */
  updateVisibleFrozenIndexRect() {
    const { normalizedColumns: e, frozenLeft: t, frozenRight: i, frozenTop: s, frozenBottom: n } = this.dataGroup, r = e.length, l = new O();
    let h = 0;
    for (let a = 0; a < t && a < r; a++)
      e[a].visible && h++;
    l.left = h, h = 0;
    for (let a = Math.max(0, r - i); a < r; a++)
      e[a].visible && h++;
    l.right = h, l.top = s, l.bottom = n, this._visibleFrozenIndexRect = l;
  }
  updateVisibleFrozenSizeRect() {
    const { normalizedColumns: e, frozenLeft: t, frozenRight: i, frozenTop: s, frozenBottom: n } = this.dataGroup, r = e.length, l = this.dataGroup.numRows;
    this._visibleFrozenSizeRect.top = this.getRowsHeight(0, s - 1), this._visibleFrozenSizeRect.bottom = this.getRowsHeight(l - n, l - 1), this._visibleFrozenSizeRect.left = this.getColumnsWidth(0, t - 1), this._visibleFrozenSizeRect.right = this.getColumnsWidth(r - i, r - 1);
  }
  /**
   *
   * @param isNeed
   * @returns {boolean}
   */
  updateVisibleColumns(e) {
    const {
      normalizedColumns: t,
      clientWidth: i,
      scrollLeft: s,
      frozenLeft: n,
      frozenRight: r
    } = this.dataGroup;
    this.updateVisibleFrozenIndexRect();
    let l = !1;
    if (e) {
      const h = this.columnLinearVector.defaultSize, a = t.length;
      let d = [], c = [];
      const u = (g) => {
        let C;
        return g.visible ? (isNaN(g.width) ? (C = k(h, g.minWidth), c.push(g.index)) : C = k(g.width, g.minWidth), d.push(g.index)) : C = 0, this.columnLinearVector.setSize(g.index, C), C;
      };
      let m = 0, f = 0;
      for (let g = 0; g < n && g < a; g++) {
        let C = t[g], y = u(C);
        m += y, f += y;
      }
      for (let g = Math.max(0, a - r); g < a; g++) {
        let C = t[g];
        if (d.indexOf(C.index) < 0) {
          let y = u(C);
          m += y;
        }
      }
      let p = this.getColumnIndexByDistance(f + s);
      m += this.getColumnX(p) - f - s;
      for (let g = p; g < a - r && m < i; g++) {
        let C = t[g], y = u(C);
        m += y;
      }
      if (s <= 0 && m < i && c.length > 0) {
        const g = i - 1;
        let C, y = 0;
        for (; m < g - 1 && c.length > 0; ) {
          y === 0 && (C = Math.floor((g - m) / c.length));
          let E = c[y], v = this.getColumnWidth(E), w = v + Math.min(g - m, C);
          this.columnLinearVector.setSize(E, w), w = this.getColumnWidth(E), m += w - v, v === w && c.splice(y, 1), y = y < c.length - 1 ? y + 1 : 0;
        }
      }
      d = d.sort(Ct), (this._columnIndices.length !== d.length || this._columnIndices.some((g, C) => g !== d[C])) && (this._oldColumnIndices = this._columnIndices, this._columnIndices = d, l = !0);
    }
    return this.updateVisibleColumnLayouts(), l;
  }
  /**
   * 컬럼 위치 정보를 갱신합니다.(절대좌표 및 뷰포트 상대좌표)
   */
  updateVisibleColumnLayouts() {
    const e = this.dataGroup.clientWidth, t = this.dataGroup.scrollLeft, i = this._visibleFrozenIndexRect, s = this._columnIndices, n = s.length, r = i.left, l = n - i.right - 1, h = i.left > 0 ? this.getColumnsWidth(0, s[r - 1]) : 0, a = i.right > 0 ? this.getColumnsWidth(s[l + 1]) : 0, d = e - (h + a), c = i.left > 0 ? this.getColumnX(s[i.left - 1] + 1) : 0, u = i.right > 0 ? this.getColumnX(s[l + 1]) : 0;
    let m = 0, f = 0;
    this._columnLayouts = s.map((p, g) => {
      const C = this.getColumnX(p), y = this.getColumnWidth(p);
      let E = 0, v = y, w = m;
      return g === r ? (E = t - (this.getColumnX(p) - h), v = y - E, f = C) : g === l && g < n && (E = 0, v = h + d - m), g === r ? f = c : g === l + 1 && (f = u), m += v, {
        index: p,
        baseX: f,
        x: C,
        width: y,
        sx: E,
        sw: v,
        dx: w,
        dw: v
      };
    });
  }
}
const ns = "#", os = "74616368796f6e6c6963-6c6f636174696f6e-686f73746e616d65", rs = "7777772E78656E6F696D706163742E636F6D", le = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", rt = window;
let J = -1;
function Pt(o, e) {
  if (o) {
    let t = o && o.length || 0, i = 2, s = 0, n, r = "";
    for (; s < t; )
      n = o.substr(s, i), n = String.fromCharCode(parseInt(n.toString(e), e)), r += n, s += i;
    return r;
  }
  return null;
}
const ls = function(o) {
  const e = o.split("-"), t = [];
  for (let i = 0; i < e.length; i++)
    t[i] = Pt(e[i], 16);
  return t[0];
}(rs), ce = function(o) {
  const e = o.split("-"), t = [];
  for (let i = 0; i < e.length; i++)
    t[i] = Pt(e[i], 16);
  return t;
}(os);
function hs(o, e) {
  return o.charCodeAt(Math.floor(e % o.length));
}
function as(o, e) {
  typeof o == "string" && (o = o.split(""));
  let t = o && o.length || 0, i, s = [];
  for (i = 0; i < t; i++)
    s.push(e(o[i], i));
  return s;
}
function cs(o) {
  const e = ce[0];
  function t(i) {
    let s, n, r, l, h, a, d, c, u = 0, m = [];
    if (!i)
      return i;
    i += "";
    do
      l = le.indexOf(i.charAt(u++)), h = le.indexOf(i.charAt(u++)), a = le.indexOf(i.charAt(u++)), d = le.indexOf(i.charAt(u++)), c = l << 18 | h << 12 | a << 6 | d, s = c >> 16 & 255, n = c >> 8 & 255, r = c & 255, m.push(s), a !== 64 && (m.push(n), d !== 64 && m.push(r));
    while (u < i.length);
    return m;
  }
  return as(t(o), function(i, s) {
    return String.fromCharCode(i ^ hs(e, s));
  }).join("");
}
function ds() {
  if (J === -1) {
    J = !1;
    try {
      const o = ("" + rt[ce[1]][ce[2]]).toLowerCase(), e = cs(rt[ce[0]]).split(ns) || [], t = e[0], i = (e[1] || "").toLowerCase();
      o && i && /*values[0] === ('' + VERSION) &&*/
      i.indexOf(o) >= 0 && (J = !0);
    } catch {
      J = -2;
    }
  }
  return J;
}
function us(o, e, t) {
  ds() || (o.save(), o.font = "20px Arial", o.color = "#000000", o.textBaseline = "bottom", o.textAlign = "right", o.strokeText(ls, e - 10, t - 10), o.restore());
}
const ms = "none", fs = 400, he = new b();
class gs {
  constructor(e = {}) {
    this.data = e;
  }
  union(e) {
    for (const t in e) {
      const i = e[t];
      Array.isArray(i) ? (this.data[t] || (this.data[t] = []), this.data[t] = this.data[t].concat(i)) : i && typeof i == "object" || (this.data[t] = i);
    }
    return this.data;
  }
  get(e) {
    return this.data[e];
  }
}
function lt() {
  return document.createElement("canvas").getContext("2d");
}
function ht(o, e, t) {
  return o.isMerged && (o.contains(t, e) || o instanceof We && o.containsCross(t, e));
}
const _s = (o) => {
  const e = o.cells;
  for (let t = 0, i = e.length; t < i; t++) {
    const s = e[t];
    if (!s.cellPosition.isCrossed)
      return s;
  }
  return null;
};
class Ue extends Tt {
  constructor(e) {
    super(e), this._dimensions = new ss(this), this._normalizedColumns = [], this._bufferContexts = [], this._backgroundLayer = this._addLayer(new q("background")), this._selectionLayer = this._addLayer(new q("selection")), this._rendererLayer = this._addLayer(new Be("renderer")), this._separatorLayer = this._addLayer(new q("separator")), this._needGeneratedColumns = !0, this._frozenLeft = 0, this._frozenRight = 0, this._frozenTop = 0, this._frozenBottom = 0, this._itemRenderer = G.itemRenderer || Se, this._nullItemRenderer = G.nullItemRenderer || Dt, this._useNullItemRenderer = !1, this._autoRowHeight = !1, this._maxRowCount = -1, this._rowCount = -1, this._cacheStyle = null, this._boundCollectionChange = this._onCollectionChange.bind(this), this._boundColumnCollectionChange = this._onColumnCollectionChange.bind(this), this._boundDocumentMouseMove = this._onDocumentMouseMove.bind(this), this._boundDocumentMouseUp = this._onDocumentMouseUp.bind(this), this.rowHeight = 30, this.overRowIndex = -1, this.overColumnIndex = -1, this.overCell = null, this.anchorRowIndex = -1, this.anchorColumnIndex = -1, this.autoMerge = !1, this.autoGenerateColumns = !0, this._oldScrollLeft = 0, this._oldScrollTop = 0, this.options = {
      clipMode: "clip",
      hiddenElementMode: ms,
      mergeMode: "lazy",
      alwaysShowMergeCell: !0
    }, this.addEventListener("mousedown", this._onMouseDown.bind(this)), this.addEventListener("mousemove", this._onMouseMove.bind(this)), this.addEventListener("mouseenter", this._onMouseEnter.bind(this)), this.addEventListener("mouseleave", this._onMouseLeave.bind(this));
  }
  /**
   * 그리드의 컬럼을 관리하는 컬렉션입니다.
   * HierarchyCollection 속성 및 함수수 사용 수 있습니다.
   * @returns {*}
   */
  get columnCollection() {
    return this._columnCollection;
  }
  set columnCollection(e) {
    this._setColumnCollection(e), this._needGeneratedColumns = !e || e.length <= 0;
  }
  get collection() {
    return this._collection;
  }
  set collection(e) {
    this._collection && this._collection.removeEventListener("collection-change", this._boundCollectionChange), this._collection = e, this._collection && (this._collection.addEventListener("collection-change", this._boundCollectionChange), this._collection.dispatchCollectionEvent("reset"));
  }
  get numRows() {
    return this.collection && this.collection.length || 0;
  }
  get normalizedColumns() {
    return this._normalizedColumns.slice(0);
  }
  get caretRowIndex() {
    return this._caretRowIndex;
  }
  set caretRowIndex(e) {
    e !== this.caretRowIndex && this._setCaretIndex(e, this.caretColumnIndex), this._anchorRowIndex = e;
  }
  get caretColumnIndex() {
    return this._caretColumnIndex;
  }
  set caretColumnIndex(e) {
    e !== this.caretColumnIndex && this._setCaretIndex(this.caretRowIndex, e), this._anchorColumnIndex = e;
  }
  get rowHeight() {
    return this._dimensions.getRowDefaultHeight();
  }
  set rowHeight(e) {
    this.rowHeight !== e && (this._dimensions.setRowDefaultHeight(e), this.invalidateFor(_.ROW_HEIGHT_CHANGE));
  }
  get autoRowHeight() {
    return this._autoRowHeight;
  }
  set autoRowHeight(e) {
    this.autoRowHeight !== e && (this._autoRowHeight = e, this.scrollTop = 0, this.invalidate());
  }
  get maxRowCount() {
    return this._maxRowCount;
  }
  set maxRowCount(e) {
    this._maxRowCount !== e && (this._maxRowCount = e, this.invalidate());
  }
  get rowCount() {
    return this._rowCount;
  }
  set rowCount(e) {
    this._rowCount !== e && (this._rowCount = e);
  }
  get normalizedRowCount() {
    let e = this.rowCount;
    return e > 0 && this.maxRowCount > 0 && e > this.maxRowCount && (e = this.maxRowCount), e;
  }
  get itemRenderer() {
    return this._itemRenderer;
  }
  set itemRenderer(e) {
    this._itemRenderer !== e && (this._itemRenderer = e, this._itemRendererChanged());
  }
  get nullItemRenderer() {
    return this._nullItemRenderer;
  }
  set nullItemRenderer(e) {
    this._nullItemRenderer !== e && (this._nullItemRenderer = e, this._itemRendererChanged());
  }
  get mergeItemRenderer() {
    return this._mergeItemRenderer;
  }
  set mergeItemRenderer(e) {
    this._mergeItemRenderer !== e && (this._mergeItemRenderer = e, this._itemRendererChanged());
  }
  get frozenLeft() {
    return this._frozenLeft;
  }
  set frozenLeft(e) {
    e = Math.max(e, 0), this._frozenLeft !== e && (this._frozenLeft = e, this._frozenCountChanged());
  }
  get frozenRight() {
    return this._frozenRight;
  }
  set frozenRight(e) {
    e = Math.max(e, 0), this._frozenRight !== e && (this._frozenRight = e, this._frozenCountChanged());
  }
  get frozenTop() {
    return this._frozenTop;
  }
  set frozenTop(e) {
    e = Math.max(e, 0), this._frozenTop !== e && (this._frozenTop = e, this._frozenCountChanged());
  }
  get frozenBottom() {
    return this._frozenBottom;
  }
  set frozenBottom(e) {
    e = Math.max(e, 0), this._frozenBottom !== e && (this._frozenBottom = e, this._frozenCountChanged());
  }
  get mergeCompare() {
    return this._mergeCompare;
  }
  set mergeCompare(e) {
    this._mergeCompare !== e && (this._mergeCompare = e, this.invalidateFor(_.ITEMS_CHANGE));
  }
  get useNullItemRenderer() {
    return this._useNullItemRenderer;
  }
  set useNullItemRenderer(e) {
    this._useNullItemRenderer !== e && (this._useNullItemRenderer = e, this.invalidateFor(_.ALL));
  }
  _itemRendererChanged() {
    this.clearCache(), this.invalidateFor(_.ALL);
  }
  _frozenCountChanged(e) {
    this.invalidateFor(_.ALL);
  }
  _setColumnCollection(e) {
    let t = ["collection-change", "node-change"], i = this._boundColumnCollectionChange;
    this._columnCollection && t.forEach((s) => {
      this._columnCollection.removeEventListener(s, i);
    }), this._columnCollection = e, this._columnCollection ? (t.forEach((s) => {
      this._columnCollection.addEventListener(s, i);
    }), this._columnCollection.dispatchCollectionEvent("reset")) : this._resetColumns();
  }
  clearItemRenderers() {
    const e = this._dimensions;
    this._freeCells(e.cells.concat(e.mergeCells));
  }
  clearCache() {
    this.clearItemRenderers(), this._dimensions.clear(), this.scrollLeft = 0, this.scrollTop = 0, this.clearElementCache(), this.clearCellMerger(), this.clearSelection(), this._caretColumnIndex = -1, this._caretRowIndex = -1, this._anchorRowIndex = -1, this._anchorColumnIndex = -1, this.invalidateFor(_.ALL);
  }
  _clearCacheForIndicator() {
    this.clearItemRenderers(), this._dimensions.clear(), this.clearCellMerger(), this.clearSelection(), this._caretColumnIndex = -1, this._caretRowIndex = -1, this._anchorRowIndex = -1, this._anchorColumnIndex = -1;
  }
  /**
   * 전체 컬럼 갱신
   * @private
   */
  _resetColumns() {
    const e = this.grid, t = this.columnCollection, i = this.normalizedColumns, s = [];
    t && (t.updateColumns(), t.find((n) => {
      n.setGrid(e), n.isLeaf && (n.index = s.length, s.push(n));
    })), this._normalizedColumns = s, this._dimensions.updateTypicalColumnSizes(), this._dispatchChangeEvent("normalized-columns-change", s, i), this.invalidateFor(_.COLUMNS_CHANGE);
  }
  _measureSize() {
    const t = this.normalizedColumns.length;
    let i = 0;
    for (let s = 0; s < this.frozenLeft; s++)
      i += this.getColumnWidth(s);
    for (let s = t - this.frozenRight; s < t; s++)
      i += this.getColumnWidth(s);
    i >= 0 && (this.style.minWidth = i + "px");
  }
  _updateDisplay() {
    this._dispatchDataGroupEvent("render-updating", this._reasonsMask);
    const e = this._dimensions, t = this.clientWidth, i = this.clientHeight, s = this.scrollLeft, n = this.scrollTop, r = this.isInvalidateReason(_.ITEMS_CHANGE), l = this.isInvalidateReason(_.COLUMNS_CHANGE), h = r || l || this.isInvalidateReason(_.VISIBLE_COLUMNS_CHANGE, _.COLUMN_UPDATE, _.GROUP_SIZE_CHANGE), a = l || r;
    this.autoMerge && a && (this.merger.analysisReady(), this.options.mergeMode === "all" && this.merger.analysisAll()), (r || l) && (this._measureSize(), this._generateColumns()), this._beginLayers();
    const d = e.columnIndices;
    (e.updateVisibleColumns(h) || l) && this._dispatchChangeEvent("visible-columns-change", e.columnIndices, d), (l || r) && this._resetCaret(), this._cacheStyle = this.grid.getStyle("cellBackgroundColor", "rowColors", "backgroundColor", "cellSelectionColor", "cellOverColor", "rowLine", "columnLine", "frozenLine", "caretLine"), this._prepareLayers(s, n, t, i), this._createGrid(s, n, t, i), this.setContentSize(this.getContentWidth(), this.getContentHeight()), this._paintBackgrounds(s, n, t, i), this._paintSelectionIndicators(s, n, t, i), this._paintHighlightIndicators(s, n, t, i), this._paintSeparators(s, n, t, i), this._paintCaretIndicators(s, n, t, i), this._updateLayers(s, n, t, i, this.getContentWidth(), this.getContentHeight(), this.getVisibleFrozenSizeRect()), this._endLayers(), (this._oldWidth !== t || this._oldHeight !== i) && (this._dispatchDataGroupEvent("group-size-change", this._reasonsMask), this._oldWidth = t, this._oldHeight = i), this._dispatchDataGroupEvent("render-update", this._reasonsMask);
  }
  _resetCaret() {
    let e = -1, t = -1;
    this._setCaretIndex(e, t), this._anchorRowIndex = e, this._anchorColumnIndex = t;
  }
  _setCaretIndex(e, t) {
    let i = !1, s = this.findMergeCellPosition(e, t);
    return s && (e = s.rowIndex, t = s.columnIndex), this._caretRowIndex !== e && (this._caretRowIndex = e, i = !0), this._caretColumnIndex !== t && (this._caretColumnIndex = t, i = !0), i && (this._dispatchCaretChangeEvent(this._caretRowIndex, this._caretColumnIndex), this.invalidateFor(_.CARET_CHANGE)), i;
  }
  _generateColumns() {
    if (this.autoGenerateColumns && this._needGeneratedColumns && this.numRows > 0) {
      const t = Object.keys(this.collection.get(0)).map((i) => new F(i));
      this._setColumnCollection(new At(t)), this._needGeneratedColumns = !1;
    }
  }
  _createGrid(e, t, i, s) {
    const n = this._dimensions, r = n.visibleFrozenIndexRect, l = this.numRows;
    n.updateStart();
    let h, a, d, c;
    r.top > 0 && (h = 0, a = Math.min(r.top - 1, l - 1), d = 0, c = 0, this._createRows(L.TOP, h, a, d, c, i, s, 0)), r.bottom > 0 && (h = Math.max(r.top, l - r.bottom), a = l - 1, d = 0, c = s - this.getRowsHeight(l - this.frozenBottom, l - 1), this._createRows(L.BOTTOM, h, a, d, c, i, s, 0)), n.updateVisibleFrozenSizeRect();
    const u = n.visibleFrozenSizeRect;
    h = this.getRowIndexByDistance(t + u.top), a = l - (r.bottom + 1), d = this.getRowY(h) - u.top, c = this.getRowsHeight(0, this.frozenTop - 1);
    {
      this._createRows(L.MIDDLE, h, a, d, c, i, s - (u.top + u.bottom), t);
      const { rows: m, mergeCells: f } = this._dimensions.updateEnd();
      this._paintMergeCells(), this._freeRows(m), this._freeCells(f), n.updateVisibleFrozenSizeRect();
    }
  }
  _asyncCreateRows(e, t, i, s, n, r) {
    const l = this.collection.toArray(), h = this.scrollTop, a = this.autoRowHeight, d = this.merger, c = this.autoMerge, u = new gs({
      cellInfos: [],
      mergeCells: []
    });
    let m = this._calculateViewHeight(r);
    const f = (p, g) => new Promise((C) => {
      const y = Date.now(), E = 100;
      let v = g, w = p;
      for (; Date.now() - y < E && v - h < m; ) {
        c && d.analysisRow(w);
        const x = linearList.getSize(w);
        u.union(this._createRow(e, l[w], w, v));
        const R = linearList.getSize(w);
        a && R !== x && (m = this._calculateViewHeight(R)), v += R, w++;
      }
      C({
        lastIndex: w,
        lastY: v
      });
    });
    return new Promise((p) => {
      const g = (C, y) => {
        f(C, y).then((E) => {
          const { lastIndex: v, lastY: w } = E;
          v <= i && w - h < m ? g(C, w) : p(u);
        });
      };
      g(t, s);
    });
  }
  _createRows(e, t, i, s, n, r, l, h) {
    const a = this._dimensions, d = this.collection && this.collection.toArray() || [], c = this.autoRowHeight, u = this.merger, m = this.autoMerge;
    let f = t, p = s, g = n, C = this._calculateViewHeight(l);
    const y = f, E = Math.min(i, t + Math.ceil(C / this.rowHeight));
    m && u.analysisRows(y, E), this.setMergeVisibleRect(y, 0, E, this.normalizedColumns.length - 1);
    function v(w, x, R, I, M) {
      let S = 0, K = R;
      t === w ? (S = h - s, K = R - S) : I - h + R >= C && (S = 0, K = C - (I - h)), x.setLayout({
        index: w,
        y: I,
        height: R,
        sy: S,
        sh: K,
        dy: M,
        dh: K
      });
    }
    for (; f <= i && p - h < C; ) {
      m && E < f && u.analysisRow(f);
      let w = a.getRowHeight(f), x = this._createRow(d[f], f, p, w);
      c && x.height !== w && (C = this._calculateViewHeight(l), w = x.height), v(f, x, w, p, g), this._paintRow(x), g += x.layout.sh, p += w, ++f;
    }
  }
  _createRow(e, t, i, s) {
    const n = this._dimensions;
    this.autoRowHeight;
    const r = this._normalizedColumns, l = n.takeRow(t) || n.createRow(t), h = [];
    l.setIndex(t), n.forEachColumnLayouts((d, c) => {
      const u = r[c], m = l.takeCellAt(c), f = this.findMergeCellPositionFromVisibleRect(t, c) || new b(t, c), p = this._createCell(e, u, f, d.x - d.baseX, i, d.width, s, m);
      if (f.isMerged && !n.hasPendingMergeCellPosition(f)) {
        const g = n.getMergeCell(f);
        g && n.removeMergeCellPosition(f), n.setMergeCell(f, () => this._createMergeCell(f, g));
      }
      h.push(p);
    });
    const a = l.cells.slice(0);
    return l.setCells(h).setHeight(s), n.setRow(t, l, s), this._freeCells(a), l;
  }
  _setupCell(e, t, i, s) {
    return e || (e = this._dimensions.createCell(t, i, s)), e.item = t, e.column = i, e.cellPosition = s, e.value = this.itemToValue(t, i), e.label = this.itemToLabel(t, i, s), e.hovered = this.isCellSelectionMode ? s.contains(this.overColumnIndex, this.overRowIndex) : s.rowIndex === this.overRowIndex, e.selected = this.isCellSelectionMode ? this.containsSelectedCell(s) : this.containsSelectedPosition(s.rowIndex, 0), e;
  }
  /**
   * 셀 생성
   */
  _createCell(e, t, i, s, n, r, l, h) {
    const a = this._setupCell(h, e, t, i), d = a.isMerged;
    let c = a.renderer;
    !d && !c && (c = this._createRenderer(e, t, i, a)), a.renderer = c, a.visible = !d;
    const u = c == null ? void 0 : c.htmlElement;
    return u instanceof HTMLElement && (d ? this._rendererLayer.removeElement(u) : (this._rendererLayer.addElement(this.getVerticalSectionIndex(i.rowIndex), this.getHorizontalSectionIndex(i.columnIndex), u), T(u, "grid-cell"), B(u, r, l), qe(u, s, n))), a.visible && H(c, "prepare", this.grid, a), a;
  }
  /**
   * 병합셀 생성
   * @param cellPosition
   * @param cellCache
   * @returns {*}
   * @private
   */
  _createMergeCell(e, t) {
    const i = this.collection.get(e.rowIndex), s = this.normalizedColumns[e.columnIndex], n = this._setupCell(t, i, s, e), r = n.renderer || this._createRenderer(i, s, e, n);
    n.renderer = r, n.visible = !0;
    const l = r.htmlElement;
    if (l instanceof HTMLElement) {
      const h = this._dimensions.getCellLayoutByCellPosition(e);
      this._rendererLayer.addOverlayElement(l), T(l, "grid-cell"), B(l, h.dw, h.dh), qe(l, h.dx, h.dy);
    }
    return n.visible && H(r, "prepare", this.grid, n), n;
  }
  _paintRow(e) {
    const t = this._rendererLayer.context, i = e.layout, s = this._dimensions.columnLayouts, n = this.autoRowHeight;
    e.cells.forEach((r, l) => {
      const h = r.column, a = s[l], d = this._internalPaintCell(t, r, a.width, i.height, a.sx, i.sy, a.sw, i.sh, a.dx, i.dy);
      n && h.wordWrap && !r.renderer.isDomRenderer && this._dimensions.setCellHeight(e.index, h.index, d);
    });
  }
  _paintMergeCells() {
    const e = this._rendererLayer.context, t = this._dimensions;
    t.forEachMergeCellLayouts((i, s) => {
      const n = t.getMergeCell(s);
      this._internalPaintCell(e, n, i.dw, i.dh, 0, 0, i.dw, i.dh, i.dx, i.dy);
    });
  }
  _paintCell(e, t, i) {
    e.clearRect(i.dx, i.dy, i.dw, i.dh), t.cellPosition.isMerged ? this._internalPaintCell(e, t, i.dw, i.dh, 0, 0, i.dw, i.dh, i.dx, i.dy) : this._internalPaintCell(e, t, i.width, i.height, i.sx, i.sy, i.dw, i.dh, i.dx, i.dy);
  }
  /**
   *
   * @param context
   * @param cell
   * @param width cell 실 가로 크기
   * @param height  cell 실 세로 크기
   * @param sx
   * @param sy
   * @param sw
   * @param sh
   * @param dx
   * @param dy
   * @private
   */
  _internalPaintCell(e, t, i, s, n, r, l, h, a, d) {
    if (t.visible) {
      e.save(), e.beginPath(), e.rect(a, d, l, h), e.clip(), e.translate(a - n, d - r);
      const c = t.renderer.paint(e, t, i, s);
      return e.restore(), c;
    }
    return s;
  }
  _freeRows(e) {
    e.forEach((t) => this._freeCells(t.cells));
  }
  _freeCells(e) {
    const t = this._rendererLayer;
    e.forEach((i) => {
      const s = i && i.renderer;
      if (s) {
        const n = s.htmlElement;
        H(s, "dispose"), n && t.removeElement(n), this._freeRenderer(s), i.renderer = null;
      }
    });
  }
  itemToLabel(e, t, i) {
    let s = this.grid.labelFunction;
    return s ? s(e, t, i) : t.itemToLabel(e);
  }
  itemToValue(e, t) {
    return t.itemToValue(e);
  }
  getViewMinHeight() {
    return this._calculateViewHeight(0);
  }
  /**
   * TO DO
   */
  _getBufferContext(e, t) {
    let i = 200, s = 100, n, r;
    return e <= i && t <= s ? (n = this._bufferContexts.length > 0 ? this._bufferContexts[0] : null, n || (n = lt(), r = n.canvas, r.width = i, r.height = s, this._bufferContexts[0] = n)) : (n = this._bufferContexts.length > 1 ? this._bufferContexts[1] : null, n || (n = lt(), this._bufferContexts[1] = n), r = n.canvas, (r.width < e || r.height < t) && (r.width = e, r.height = t)), n;
  }
  _paintBackgrounds(e, t, i, s) {
    const n = this._dimensions, r = this._backgroundLayer.context, { rowColors: l, backgroundColor: h } = this._cacheStyle;
    r.save(), r.beginPath(), h && (r.fillStyle = h, r.fillRect(0, 0, i, s)), n.forEachRowLayouts((c, u) => {
      let m;
      l instanceof Function ? m = ee(l, u) : Array.isArray(l) ? m = l[u % l.length] : typeof l == "string" && (m = l), r.fillStyle = m, r.fillRect(0, c.dy, i, c.dh);
    }), r.restore(), r.save();
    const a = this.normalizedColumns;
    n.forEachColumnLayouts((c, u) => {
      const m = a[u].getStyle("backgroundColor");
      m && (r.fillStyle = m, r.fillRect(c.dx, 0, c.dw, s));
    }), r.restore();
    const d = this._cacheStyle.cellBackgroundColor;
    d instanceof Function && n.forEachCellLayouts((c, u, m) => {
      const f = d(u, m);
      f && (r.fillStyle = f, r.fillRect(c.dx, c.dy, c.dw, c.dh));
    });
  }
  _paintSelectionIndicators(e, t, i, s) {
    if (!this.hasSelectionMode)
      return;
    const n = this._selectionLayer.context, r = this.isRowSelectionMode, l = this._dimensions;
    n.save(), n.beginPath(), n.fillStyle = this._cacheStyle.cellSelectionColor, r ? l.forEachRowLayouts((h, a, d) => {
      const c = _s(d);
      c && c.selected && n.fillRect(0, h.dy, i, h.dh);
    }) : l.forEachCellLayouts((h, a, d, c) => {
      c && c.selected && n.fillRect(h.dx, h.dy, h.dw, h.dh);
    }), n.restore();
  }
  /**
   * 셀 오버시 표시
   * @param scrollX
   * @param scrollY
   * @param width
   * @param height
   * @private
   */
  _paintHighlightIndicators(e, t, i, s) {
    const n = this._dimensions, r = this._selectionLayer.context, l = this.overRowIndex, h = this.overColumnIndex;
    let a;
    if (this.isRowSelectionMode) {
      if (!n.isVisibleRow(l))
        return;
      a = { ...n.getRowLayout(l), dx: 0, dw: this.clientWidth };
    } else {
      const d = this.findMergeCellPosition(l, h) || new b(l, h);
      if (!n.isVisibleCell(d))
        return;
      a = n.getCellLayoutByCellPosition(d);
    }
    a && (r.save(), r.beginPath(), r.fillStyle = this._cacheStyle.cellOverColor, r.fillRect(a.dx, a.dy, a.dw, a.dh), r.restore());
  }
  /**
   * 셀 구분선 그리기
   * @param scrollX
   * @param scrollY
   * @param width
   * @param height
   * @private
   */
  _paintSeparators(e, t, i, s) {
    const n = this._separatorLayer.context, r = this._dimensions, l = r.visibleFrozenSizeRect, h = r.columnLayouts, a = h.length, d = this._cacheStyle.rowLine, c = (v, w, x) => {
      const R = h[w], I = h[x];
      D(n, R.dx, v, I.dx + I.dw, v, d);
    };
    if (n.save(), r.forEachRowLayouts((v, w) => {
      const x = r.getCellsByRow(w);
      let R = 0, I = 0;
      for (; I < a; I++) {
        const M = x[I], S = M.column;
        ht(M.cellPosition, w + 1, S.index) && (R < I && c(v.dy + v.dh, R, I - 1), R = I + 1);
      }
      R < I && c(v.dy + v.dh, R, I - 1);
    }), this.getContentHeight() < s) {
      const v = r.visibleFrozenSizeRect.bottom, w = this.rowHeight;
      let x = this.getContentHeight() - v;
      for (; x < s - v; )
        D(n, 0, x, i, x, d), x += w;
    }
    n.restore();
    const u = this._normalizedColumns, m = r.rows, f = m.length, p = this._cacheStyle.columnLine, g = (v, w, x, R) => {
      const I = m[w].layout, M = m[x].layout;
      D(n, v, I.dy, v, M.dy + M.dh, R);
    };
    n.save(), r.forEachColumnLayouts((v, w) => {
      const R = u[w].getStyle("columnLine") || p, I = r.getCellsByColumn(w);
      let M = 0, S = 0;
      for (; S < f; S++) {
        const K = m[S], hi = I[S].cellPosition;
        ht(hi, K.index, w + 1) && (M < S && g(v.dx + v.dw, M, S - 1, R), M = S + 1);
      }
      M < S && g(v.dx + v.dw, M, S - 1, R);
    });
    const C = r.getColumnLayout(this.normalizedColumns.length - 1), y = C && C.x + C.width || -1;
    y > 0 && y < i && D(n, y, 0, y, s, p), n.restore();
    const E = this._cacheStyle.frozenLine;
    n.save(), l.left > 0 && D(n, l.left, 0, l.left, s, E), l.right > 0 && D(n, i - l.right, 0, i - l.right, s, E), l.top > 0 && D(n, 0, l.top, i, l.top, E), l.bottom > 0 && D(n, 0, s - l.bottom, i, s - l.bottom, E), n.restore(), us(n, i, s);
  }
  _paintCaretIndicators(e, t, i, s) {
    const n = this._separatorLayer.context, r = this.caretRowIndex, l = this.caretColumnIndex;
    if (!this.isValidPosition(r, l))
      return;
    const h = this._dimensions.getCellLayoutByCellPosition(this.findMergeCellPosition(r, l) || new b(r, l));
    if (h) {
      const a = this._cacheStyle.caretLine, d = a.color, c = a.width, u = h.dx + Math.floor(c / 2), m = h.dy + Math.floor(c / 2), f = h.dw - c + 1, p = h.dh - c + 1;
      n.save(), n.beginPath(), n.strokeStyle = d, n.lineWidth = c, n.rect(u, m, f, p), n.stroke(), n.restore();
    }
  }
  _invalidateOverAndOut() {
    const e = this.clientWidth, t = this.clientHeight, i = this.scrollLeft, s = this.scrollTop;
    if (this.hasSelectionMode) {
      const n = this._dimensions.cells.concat(this._dimensions.mergeCells), r = this.isCellSelectionMode, l = this.isRowSelectionMode;
      n.forEach((h) => {
        const a = h.cellPosition;
        h.visible && (h.hovered || l && a.rowIndex === this.overRowIndex || r && a.contains(this.overColumnIndex, this.overRowIndex)) && this.invalidateCell(a.rowIndex, a.columnIndex);
      });
    }
    this._selectionLayer.begin(), this._paintSelectionIndicators(i, s, e, t), this._paintHighlightIndicators(i, s, e, t), this._selectionLayer.end();
  }
  _itemToTemplate(e, t, i) {
    let s = this.useNullItemRenderer && (!e || !(t.dataField in e) || e[t.dataField] == null), n = t.itemRenderer || this.itemRenderer, r = null;
    return i && i.isMerged && this.mergeItemRenderer ? r = this.mergeItemRenderer instanceof Function ? this.mergeItemRenderer(e, t, i) : this.mergeItemRenderer : n instanceof Function ? r = n(e, t, i) : s ? r = this.nullItemRenderer : n && (r = n), r || (r = Se), r;
  }
  _calculateViewHeight(e) {
    return this.normalizedRowCount > 0 ? this.getRowsHeight(0, this.normalizedRowCount - 1) : e;
  }
  getVisibleRowIndices() {
    return this._dimensions.rowIndices.slice(0);
  }
  getVisibleColumnIndices() {
    return this._dimensions.columnIndices.slice(0);
  }
  getCellLayout(e, t) {
    return this._dimensions.getCellLayout(e, t);
  }
  getCellLayoutByCellPosition(e) {
    return this._dimensions.getCellLayoutByCellPosition(e);
  }
  getVisibleFrozenIndexRect() {
    return this._dimensions.visibleFrozenIndexRect;
  }
  getVisibleFrozenSizeRect() {
    return this._dimensions.visibleFrozenSizeRect;
  }
  /**
   * 지정된 행 인덱스의 y 좌표를 반환합니다.
   * @param index
   * @returns {Number}
   */
  getRowY(e) {
    return this._dimensions.getRowY(e);
  }
  /**
   * 지정된 y좌표에 해당하는 행 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
   * @param y
   * @returns {Number}
   */
  getRowIndexByDistance(e) {
    return this._dimensions.getRowIndexByDistance(e);
  }
  /**
   * 지정된 인덱스 행 높이를 반환합니다.
   * @param index
   * @returns {Number}
   */
  getRowHeight(e) {
    return this._dimensions.getRowHeight(e);
  }
  /**
   * 지정된 인덱스의 행 높이를 설정합니다.
   * @param index
   * @param height
   * @returns {boolean}
   */
  setRowHeight(e, t) {
    return this._dimensions.setRowHeight(e, t) ? (this.invalidateFor(_.ROW_HEIGHT_CHANGE), !0) : !1;
  }
  /**
   * from 행부터 to 행까지의 높이의 합을 반환합니다.
   * @param from 시작행
   * @param to 종료행.
   * @returns {Number}
   */
  getRowsHeight(e, t) {
    return this._dimensions.getRowsHeight(e, t);
  }
  /**
   * 지정된 컬럼인덱스의 x좌표를 반환합니다.
   * @param index
   * @returns {Number}
   */
  getColumnX(e) {
    return e > 0 ? this._dimensions.getColumnX(e) : 0;
  }
  /**
   * 지정된 컬럼 인덱스의 보여지는 컬럼 레이아웃 정보를 반환합니다.
   * @param index
   * @returns {*}
   */
  getColumnLayout(e) {
    return this._dimensions.getColumnLayout(e);
  }
  /**
   * 지정된 x좌표에 해당하는 컬럼 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
   * @param x
   * @returns {Number}
   */
  getColumnIndexByDistance(e) {
    return Math.min(this._dimensions.getColumnIndexByDistance(e), this.normalizedColumns.length - 1);
  }
  /**
   * 지정된 컬럼 인덱스의 너비를 반환합니다.
   * @param index 컬럼 인덱스
   * @returns {Number}
   */
  getColumnWidth(e) {
    return this._dimensions.getColumnWidth(e);
  }
  /**
   * 지정된 컬럼 인덱스 너비를 설정합니다.
   * @param index
   * @param size
   */
  setColumnWidth(e, t) {
    const i = this.getColumnAt(e);
    if (i) {
      isNaN(t) || (t = k(t, i.minWidth));
      const s = this.getColumnWidth(e);
      (s !== t || i.width !== t) && (i.setWidth(t), isNaN(t) || this._dimensions.setColumnWidth(e, t), this.invalidateFor(_.COLUMN_UPDATE), this._dispatchDataGroupEvent("column-size-change", {
        column: i,
        newValue: t,
        oldValue: s
      }));
    }
  }
  /**
   * from 컬럼부터 to 컬럼까지의 너비의 합을 반환합니다.
   * @param from 시작 컬럼 인덱스
   * @param to 종료 컬럼 인덱스
   * @returns {Number}
   */
  getColumnsWidth(e, t) {
    return this._dimensions.getColumnsWidth(e, t);
  }
  /**
   * 컨텐츠 너비를 반환합니다.
   * @returns {Number}
   */
  getContentWidth() {
    return this._dimensions.getColumnsTotal();
  }
  /**
   * 컨텐츠 높이를 반환합니다.
   * @returns {Number}
   */
  getContentHeight() {
    return this._dimensions.getRowsTotal();
  }
  /**
   * 지정된 컬럼을 보이거나 숨기게 합니다.
   * @param column
   * @param {Boolean} visible
   */
  setColumnVisible(e, t) {
    e.visible !== t && (e.setVisible(t), this.columnCollection.getLeafColumns(e).forEach((i) => {
      const s = this.normalizedColumns.indexOf(i);
      s >= 0 && this._dimensions.setColumnWidth(s, t ? i.width : 0);
    }), this.columnCollection.clearCache(), this._dispatchDataGroupEvent("column-visible", e), this.invalidateFor(_.COLUMN_UPDATE), this.validateNow());
  }
  getHorizontalSectionIndex(e) {
    return e < this.frozenLeft ? L.LEFT : this.normalizedColumns.length - e <= this.frozenRight ? L.RIGHT : L.CENTER;
  }
  getVerticalSectionIndex(e) {
    return e < this.frozenTop ? L.TOP : this.numRows - e <= this.frozenBottom ? L.BOTTOM : L.MIDDLE;
  }
  getCell(e, t) {
    const i = this._dimensions, s = this.findMergeCellPosition(e, t);
    return s ? i.getMergeCell(s) : i.getCell(e, t);
  }
  getItemRenderer(e, t) {
    const i = this.getCell(e, t);
    return i && i.renderer || null;
  }
  /**
   * 지정된 행 인덱스가 화면에 표시되는 경우 해당 렌더러를 갱신합니다.
   * @param index
   */
  invalidateRow(e) {
    this._dimensions.getCellsByRow(e).forEach((t) => {
      this.invalidateCell(t.cellPosition.rowIndex, t.cellPosition.columnIndex);
    });
  }
  /**
   * 지정된 컬럼 인덱스가 화면에 표시되는 경우 해당 렌더러를 갱신합니다.
   * @param index 컬럼 인덱스
   */
  invalidateColumn(e) {
    this._dimensions.getCellsByColumn(e).forEach((t) => {
      this.invalidateCell(t.cellPosition.rowIndex, t.cellPosition.columnIndex);
    });
  }
  /**
   * 지정된 위치가 화면에 표시되는 경우 해당 렌더러를 갱신합니다.
   * @param rowIndex 행 인덱스
   * @param columnIndex 컬럼 인덱스
   */
  invalidateCell(e, t) {
    const i = this._dimensions, s = this.findMergeCellPosition(e, t), n = s ? i.getMergeCell(s) : i.getCell(e, t), r = s ? i.getCellLayoutByCellPosition(s) : i.getCellLayout(e, t);
    n && r && (n.visible && H(n.renderer, "prepare", this.grid, n), this._paintCell(this._rendererLayer.context, n, r));
  }
  /**
   * 지정된 위치가 화면에 표시되는 경우 true 반환합니다.
   * @param rowIndex
   * @param columnIndex
   * @returns {Boolean}
   */
  isVisiblePosition(e, t) {
    return this._dimensions.isVisiblePosition(e, t);
  }
  /**
   * 지정된 셀이 화면에 표시되는 경우 true 반환합니다.
   * @param cellPosition
   * @returns {Boolean}
   */
  isVisibleCell(e) {
    return !!(e && this._dimensions.isVisibleCell(e));
  }
  isValidPosition(e, t) {
    const i = this.numRows, s = this.normalizedColumns.length;
    return !(e < 0 || e >= i || t < 0 || t >= s);
  }
  /**
   * 지정된 행 인덱스의 아이템을 반환합니다.
   * @param index 행 인덱스
   * @returns {Object}
   */
  getItemAt(e) {
    return this.collection && this.collection.get(e);
  }
  /**
   * 지정된 컬럼 인덱스의 컬럼을 반환합니다.
   * @param index
   * @returns {GridColumn}
   */
  getColumnAt(e) {
    return e >= 0 && e < this.normalizedColumns.length ? this.normalizedColumns[e] : null;
  }
  doLayout(e) {
    this.invalidateFor(e ? _.ALL : 0), this.validateNow();
  }
  updateScrollRect() {
    const e = this._dimensions, t = this.scrollLeft, i = this.scrollTop, s = t !== this._oldScrollLeft, n = i !== this._oldScrollTop, r = e.visibleFrozenIndexRect, l = e.visibleFrozenSizeRect, h = e.columnIndices;
    let a = 0;
    if (s) {
      const d = this.getColumnIndexByDistance(t + l.left), c = this.getColumnIndexByDistance(t + this.clientWidth - l.right), u = h.length, m = u > r.left ? h[r.left] : 0, f = u > r.right ? h[u - r.right - 1] : 0;
      this._oldScrollLeft = t, a |= _.HORIZONTAL_SCROLL_CHANGE, (d !== m || c !== f) && (a |= _.VISIBLE_COLUMNS_CHANGE);
    }
    n && (this._oldScrollTop = i, a |= _.VERTICAL_SCROLL_CHANGE), this.invalidateFor(a);
  }
  /**
   * 병합영역 전체 체크
   */
  analysisMergeAll() {
    this.merger.analysisAll();
  }
  getVerticalScrollPositionDelta(e) {
    let t = Math.max(this.rowHeight, 30);
    return e > 0 ? t : -t;
  }
  _mouseEventToContent(e) {
    const t = this._mouseEventToLocal(e), i = this.clientWidth, s = this.clientHeight, n = this._dimensions.visibleFrozenSizeRect;
    return n.top > 0 && t.y <= n.top || (n.bottom > 0 && s - t.y <= n.bottom ? t.y = this.contentHeight - (s - t.y) : this.contentHeight < s && this.contentHeight - n.bottom <= t.y ? t.y = this.contentHeight : t.y = t.y + this.scrollTop), n.left > 0 && t.x <= n.left || (n.right > 0 && i - t.x <= n.right ? t.x = this.contentWidth - (i - t.x) : t.x = t.x + this.scrollLeft), t;
  }
  /**
   * 해당 위치로 스크롤을
   * @param rowIndex
   * @param columnIndex
   * @param allowSelection
   */
  scrollToCell(e, t, i) {
    if (this.isValidPosition(e, t)) {
      let s = t !== -1, n = e !== -1;
      do
        if (!this._internalScrollToCell(e, t, n, s))
          break;
      while (!this.isVisiblePosition(e, t));
      this._internalScrollToCell(e, t, n, s), i && this.updateSelection(e, t);
    }
  }
  /**
   *
   * 지정된 영역을 선택합니다.
   * @param rowIndex
   * @param columnIndex
   * @param shiftKey
   * @param ctrlKey
   */
  updateSelection(e, t, i, s) {
    let n = !1;
    if (this.hasSelectionMode) {
      let r = e, l = t, h = e, a = t, d;
      this.isRowSelectionMode && (l = 0, a = 0), i && this.isMultipleSelectionMode ? (d = "set", h = this._anchorRowIndex, a = this._anchorColumnIndex) : s ? this.containsSelectedCell(new b(r, l)) ? d = "remove" : this.isMultipleSelectionMode ? d = "add" : d = "set" : d = "set";
      const c = this.unionCellPosition(r, l, h, a, this.isMultipleSelectionMode);
      d === "set" ? n = this.setSelectedCell(c) : d === "add" ? n = this.addSelectedCell(c) : d === "remove" && (n = this.removeSelectedCell(c)), i && this.isMultipleSelectionMode || (this._anchorRowIndex = r, this._anchorColumnIndex = l);
    }
    return this._setCaretIndex(e, t), n;
  }
  getCellStyle(e, t, ...i) {
    const s = this.getColumnAt(t);
    let n = null;
    if (s ? n = s.getStyle.apply(s, i) : n = this.getStyle.apply(this, i), n) {
      if (n instanceof Function)
        n = n(e, t);
      else if (typeof n == "object")
        for (let r in n)
          n[r] = ee(n[r], e, t);
    }
    return n;
  }
  destroy() {
    this.clearCache();
  }
  _internalScrollToCell(e, t, i, s) {
    const n = this._calculateScrollPositionDelta(e, t);
    let r = !1;
    if (n) {
      if (i && n.y !== 0) {
        const l = this.scrollTop;
        this.scrollTop += n.y, this.scrollTop !== l && (r = !0);
      }
      if (s && n.x !== 0) {
        const l = this.scrollLeft;
        this.scrollLeft += n.x, this.scrollLeft !== l && (r = !0);
      }
    }
    return r;
  }
  _calculateScrollPositionDelta(e, t) {
    const i = this.getColumnX(t), s = this.getRowY(e), n = i + this.getColumnWidth(t), r = s + this.getRowHeight(e);
    let l = this.getScrollRect(), h = this._dimensions.visibleFrozenSizeRect, a = h.left + l.left, d = a + this.clientWidth - (h.left + h.right), c = h.top + l.top, u = c + this.clientHeight - (h.top + h.bottom), m = i - h.left - l.left, f = n - (l.right - h.right), p = s - h.top - l.top, g = r - (l.bottom - h.bottom), C = Math.abs(m) < Math.abs(f) ? m : f, y = Math.abs(p) < Math.abs(g) ? p : g;
    return (n <= h.left || i >= this.getContentWidth() - h.right || a <= i && n <= d) && (C = 0), (r <= h.top || s >= this.getContentHeight() - h.bottom || c <= s && r <= u) && (y = 0), new A(C, y);
  }
  /**
   * 아이템 추가, 뷰포인트 관련 추가된 만큼 데이타 갱신
   * @param rowIndex
   * @param items
   * @private
   */
  _itemsAdded(e, t) {
    const i = this._dimensions;
    t.forEach((s, n) => {
      const r = e + n;
      i.insertRow(r, i.createRow(r), this.rowHeight);
    }), this.autoMerge && this.clearCellMerger(), this.invalidateFor(_.ITEM_UPDATE);
  }
  /**
   * 아이템 삭제, 뷰포인트 관련 삭제된 만큼 데이타 갱신
   * @param rowIndex
   * @param items
   * @private
   */
  _itemsRemoved(e, t) {
    const i = this._dimensions;
    t.forEach((n, r) => {
      const l = e + r, h = i.removeRow(l);
      h && this._freeCells(h.cells);
    });
    const s = new b(e, 0, e + t.length - 1, this.normalizedColumns.length - 1);
    i.mergeCells.slice(0).forEach((n) => {
      const r = n.cellPosition;
      s.intersects(r) && (i.removeMergeCellPosition(r), this._freeCells([n]));
    }), this.autoMerge && this.clearCellMerger(), this.invalidateFor(_.ITEM_UPDATE);
  }
  _columnsAdded(e, t) {
    const i = this._dimensions;
    t.forEach((s, n) => {
      i.insertColumn(e + n);
    }), this.invalidateFor(_.COLUMNS_CHANGE);
  }
  /**
   * 컬럼삭제 셀 캐쉬 이동
   * @param index
   * @param columns 순차적인 컬럼 목록
   * @private
   */
  _columnsRemoved(e, t) {
    const i = this._dimensions, s = [];
    t.forEach((n, r) => {
      Array.prototype.push.apply(s, i.removeColumn(e));
    }), this._freeCells(s), this.invalidateFor(_.COLUMNS_CHANGE);
  }
  _dispatchDataGroupEvent(e, t) {
    return this.dispatchEvent(new CustomEvent(e, {
      bubbles: !1,
      cancelable: !1,
      detail: t
    }));
  }
  _dispatchChangeEvent(e, t, i) {
    return this.dispatchEvent(new CustomEvent(e, {
      bubbles: !1,
      cancelable: !1,
      detail: {
        newValue: t,
        oldValue: i
      }
    }));
  }
  _dispatchItemEvent(e, t, i, s, n = !1, r = !1) {
    return this.dispatchEvent(new CustomEvent(e, {
      cancelable: n,
      bubbles: r,
      detail: {
        rowIndex: t,
        columnIndex: i,
        item: this.getItemAt(t),
        column: this.getColumnAt(i),
        trigger: s
      }
    }));
  }
  _dispatchCaretChangeEvent(e, t) {
    return this.dispatchEvent(new CustomEvent("caret-change", {
      bubbles: !1,
      cancelable: !1,
      detail: {
        caretRowIndex: e,
        caretColumnIndex: t
      }
    }));
  }
  /**
   * mousedown event handler
   * @param event
   * @private
   */
  _onMouseDown(e) {
    if (e.defaultPrevented)
      return;
    const t = this._mouseEventToContent(e), i = this.getRowIndexByDistance(t.y), s = this.getColumnIndexByDistance(t.x);
    this.isValidPosition(i, s) && this._dispatchItemEvent("item-down", i, s, e, !0) && (this._mouseDownColumnIndex = s, this._mouseDownRowIndex = i, document.addEventListener("mousemove", this._boundDocumentMouseMove), document.addEventListener("mouseup", this._boundDocumentMouseUp), this.updateSelection(i, s, e.shiftKey, e.ctrlKey));
  }
  /**
   * mousemove event handler
   * @param event
   * @private
   */
  _onMouseMove(e) {
    const t = this._mouseEventToContent(e), i = this.getRowIndexByDistance(t.y), s = this.getColumnIndexByDistance(t.x);
    if (i !== this.overRowIndex || s !== this.overColumnIndex) {
      let n = this.findMergeCellPosition(i, s);
      n || (he.rowIndex = i, he.columnIndex = s, n = he), n.equals(this.overCell) || ((this.overRowIndex >= 0 || this.overColumnIndex >= 0) && this._dispatchItemEvent("item-out", this.overRowIndex, this.overColumnIndex, e), i >= 0 && s >= 0 && this._dispatchItemEvent("item-over", i, s, e), this.overRowIndex = i, this.overColumnIndex = s, this.overCell = he !== n ? n : null, this._boundInvalidateOverAndOut || (this._boundInvalidateOverAndOut = this._invalidateOverAndOut.bind(this)), we(this._boundInvalidateOverAndOut));
    }
  }
  /**
   * mouseenter event handler
   * @param event
   * @private
   */
  _onMouseEnter(e) {
    this._hasMouse = !0;
  }
  /**
   * mouseleave event handler
   * @param event
   * @private
   */
  _onMouseLeave(e) {
    this._hasMouse = !1, (this.overRowIndex >= 0 || this.overColumnIndex >= 0) && (this._dispatchItemEvent("item-out", this.overRowIndex, this.overColumnIndex, e), this.overRowIndex = -1, this.overColumnIndex = -1, this.overCell = null, this.invalidateFor(_.DISPLAY_UPDATE));
  }
  _onDocumentMouseMove(e) {
    try {
      let t = this._mouseEventToContent(e);
      if (t && this._mouseDownRowIndex >= 0 && this._mouseDownColumnIndex >= 0) {
        let i = this.getColumnIndexByDistance(t.x), s = this.getRowIndexByDistance(t.y);
        this._dispatchItemEvent("item-drag", s, i, e);
      }
    } catch {
      this._onDocumentMouseUp(e);
    }
  }
  _onDocumentMouseUp(e) {
    document.removeEventListener("mousemove", this._boundDocumentMouseMove), document.removeEventListener("mouseup", this._boundDocumentMouseUp);
    const t = this._mouseEventToContent(e), i = this.getRowIndexByDistance(t.y), s = this.getColumnIndexByDistance(t.x);
    if (this._dispatchItemEvent("item-up", i, s, e), this.isValidPosition(i, s) && i === this._mouseDownRowIndex && s === this._mouseDownColumnIndex) {
      const n = Date.now();
      this._lastClickTime >= 0 && n - this._lastClickTime < fs && this._lastMouseClickRowIndex === i && this._lastMouseClickColumnIndex === s ? (this._dispatchItemEvent("item-double-click", i, s, e), this._lastClickTime = -1) : (this._dispatchItemEvent("item-click", i, s, e), this._lastClickTime = Date.now()), this._lastMouseClickRowIndex = i, this._lastMouseClickColumnIndex = s;
    }
    this._mouseDownRowIndex = -1, this._mouseDownColumnIndex = -1;
  }
  /**
   * ColumnCollection
   * collection-change event handler
   * @param event
   */
  _onColumnCollectionChange(e) {
    const { type: t, detail: i, detail: { kind: s, nodes: n } } = e;
    if (t === "collection-change")
      s === "reset" && (this._resetColumns(), this.clearCache(), this.invalidateFor(_.COLUMNS_CHANGE));
    else if (t === "node-change" && (s === "move" || s === "add" || s === "remove")) {
      const r = this.columnCollection, l = this.normalizedColumns.slice(0);
      this._resetColumns();
      const h = this.normalizedColumns.slice(0);
      s !== "add" && n.forEach((a) => {
        const d = r.getLeafColumns(a), c = l.indexOf(d[0]);
        this._columnsRemoved(c, d);
      }), s !== "remove" && n.forEach((a) => {
        const d = r.getLeafColumns(a), c = h.indexOf(d[0]);
        this._columnsAdded(c, d);
      }), this.autoMerge && this.clearCellMerger();
    }
    !this.dispatchEvent(new CustomEvent("column-" + t, {
      bubbles: !1,
      cancelable: e.cancelable,
      detail: i
    })) && e.cancelable && e.preventDefault();
  }
  /**
   * collection collection-change event handler
   */
  _onCollectionChange(e, t = !0) {
    const i = e.detail;
    switch (i.kind) {
      case "add":
        this._itemsAdded(i.index, i.items);
        break;
      case "remove":
        this._itemsRemoved(i.index, i.items);
        break;
      case "set":
      case "update":
        this.invalidateFor(_.ITEM_UPDATE);
        break;
      case "reset":
        this.clearCache(), this.invalidateFor(_.ITEMS_CHANGE);
        break;
      case "refresh":
        this._clearCacheForIndicator(), this.invalidateFor(_.ITEMS_CHANGE);
        break;
    }
    this._dimensions.setRowSize(this.numRows), this.collectionChangedForCellMerger(e), this.collectionChangedForSelection(e), t !== !1 && this.dispatchEvent(new CustomEvent(e.type, {
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      detail: e.detail
    }));
  }
}
Ue.withDom('<div class="tachyon-group-body"></div>').withBehavior(Wi, Xi);
const ps = {
  "item-mouse-down": "down",
  "item-click": "click",
  "item-double-click": "doubleClick"
}, Cs = [9, 13, 27, 37, 38, 39, 40];
class ys {
  constructor(e) {
    this._grid = e, this._editedCell = null, this._lastEditCellPosition = null, this._boundOnDocumentKeyDown = this._onDocumentKeyDown.bind(this), this._boundOnDocumentMouseEvent = this._onDocumentMouseEvent.bind(this);
    const t = this._onGridItemEvent.bind(this);
    e.addEventListener("item-mouse-down", t), e.addEventListener("item-click", t), e.addEventListener("item-double-click", t), e.addEventListener("keydown", this._onGridKeyDown.bind(this)), e.addEventListener("scroll", this._onGridScroll.bind(this));
  }
  /**
   * @private
   * @returns {*}
   */
  get _dataGroup() {
    return this._grid.dataGroup;
  }
  /**
   * 편집중인 렌더러 객체입니다.
   * @returns {*|HTMLElement}
   */
  get editedCell() {
    return this._editedCell;
  }
  /**
   * 그리드 편집 중인지을 나타냅니다.
   * @returns {boolean}
   */
  isEditing() {
    return !!this._editedCell;
  }
  /**
   * 편집 가능한 셀인지 확인합니다.
   * @param rowIndex
   * @param columnIndex
   * @returns {boolean}
   */
  isCellEditable(e, t) {
    if (!this._grid.editable || !this._dataGroup.isValidPosition(e, t))
      return !1;
    const i = this._dataGroup.getColumnAt(t);
    return i && i.visible && i.editable;
  }
  /**
   * 지정된 셀에 편집을 시작합니다. 편집을 시작하면 'true'를 반환합니다.
   * 'item-edit-starting' 이벤트에서 'preventDefault()'호출시 편집을 취소합니다.
   * @param rowIndex
   * @param columnIndex
   * @param trigger
   * @returns {boolean}
   */
  startEdit(e, t, i) {
    if (this.isEditing() && this._lastEditCellPosition.contains(t, e) || !this.isCellEditable(e, t) || this.isEditing() && !this.endEdit(i) || !this._dispatchEditorEvent("item-edit-starting", !0, e, t))
      return !1;
    const s = this._findMergeCellPosition(e, t);
    return this._lastEditCellPosition = s, this._grid.scrollToCell(s.rowIndex, s.columnIndex, !0), this._grid.validateNow(), this._createEditor(s, i), this._dispatchEditorEvent("item-edit-start", !1, s.rowIndex, s.columnIndex), !0;
  }
  /**
   * 편집중이면 편집을 종료합니다.
   * 편집중인 내용이 저장됩니다.
   * @param trigger
   * @return {boolean}
   */
  endEdit(e = null) {
    if (this.isEditing()) {
      const t = this._grid, i = this._editedCell, s = i.editor, n = this._lastEditCellPosition;
      if (s.getSaveValue instanceof Function)
        try {
          let r = n.rowIndex, l = n.columnIndex, h = i.item, a = i.column, d = Oe(h, a.dataFieldPath), c = s.getSaveValue();
          if (this._dispatchEditorEvent("item-edit-ending", !0, r, l, d, c, e))
            t.collection.setValue(r, a.dataField, c), this._dispatchEditorEvent("item-edit-end", !1, r, l, d, c), this._destroyEditor();
          else
            return !1;
        } catch {
          this.cancelEdit();
        }
      else
        this.cancelEdit();
      return t.invalidate(), t.flush(), t.focus(), !0;
    }
    return !1;
  }
  /**
   * 편집을 취소합니다. 편집중인 내용은 저장되지 않습니다.
   * @returns {boolean}
   */
  cancelEdit() {
    return this.isEditing() ? (this._dispatchEditorEvent("item-edit-cancel", !1, this._lastEditCellPosition.rowIndex, this._lastEditCellPosition.columnIndex), this._destroyEditor(), this._grid.focus(), !0) : !1;
  }
  _itemToFactory(e, t, i) {
    let s = t.itemEditor || this._grid.itemEditor;
    return s instanceof Function && (s = s(e, t, i)), se.factory(s || Nt);
  }
  _dataCellToEditCell(e, t, i) {
    return Object.assign(new Fi(), e, { inputtedKey: t, trigger: i });
  }
  /**
   * 에디터를 생성합니다.
   * @param cellPosition
   * @param trigger
   * @private
   */
  _createEditor(e, t) {
    const i = this._grid, s = this._dataGroup, n = s.getCell(e.rowIndex, e.columnIndex), r = n.item, l = n.column, h = this._getPrintableKey(t), a = this._dataCellToEditCell(n, h, t), d = this._itemToFactory(r, l, e), c = new d(i);
    H(c, "created", i, a);
    const u = c.htmlElement;
    if (u) {
      T(u, "tachyon-editor"), u.parentElement !== i.htmlElement && i.appendChild(u);
      const m = s.getCellLayoutByCellPosition(e);
      Ie(u, m.dx, m.dy + i.getHeaderHeight(), m.dw, m.dh);
    }
    a.editor = c, H(c, "prepare", i, a), c.focus instanceof Function && c.focus(), this._editedCell = a, document.addEventListener("keydown", this._boundOnDocumentKeyDown, !0), document.addEventListener("mousedown", this._boundOnDocumentMouseEvent);
  }
  /**
   *
   * @private
   */
  _destroyEditor() {
    const e = this._editedCell.editor;
    document.removeEventListener("keydown", this._boundOnDocumentKeyDown, !0), document.removeEventListener("mousedown", this._boundOnDocumentMouseEvent), e && (H(e, "dispose"), this._grid.hookFreeElement instanceof Function && this._grid.hookFreeElement(e), e.htmlElement && this._grid.removeChild(e.htmlElement)), this._lastEditCellPosition = null, this._editedCell = null;
  }
  _findMergeCellPosition(e, t) {
    let i = this._dataGroup.findMergeCellPosition(e, t);
    return i || (i = new b(e, t)), i;
  }
  /**
   * 다음 편집위치
   * @param rowIndex
   * @param columnIndex
   * @param isReverse
   * @param isVertical
   * @param trigger
   * @private
   */
  _startNextEdit(e, t, i, s, n) {
    this._inStartNextEdit || (this._inStartNextEdit = !0, window.requestAnimationFrame(() => {
      let r, l;
      do
        r = this._findNextEditablePosition(e, t, i, s), r && (e = r.y, t = r.x, l = this.startEdit(e, t, n));
      while (r && !l);
      this._inStartNextEdit = !1;
    }));
  }
  _findNextEditablePosition(e, t, i, s) {
    const r = this._dataGroup.normalizedColumns.length, l = this._dataGroup.collection.length, h = i ? -1 : 1;
    let a = e, d = t;
    do {
      const c = this._findMergeCellPosition(a, d);
      if (s ? (a = i ? c.top : c.bottom, a += h) : (d = i ? c.left : c.right, d += h, d >= r ? (a++, d = 0) : d < 0 && (a--, d = r - 1)), a < 0 || a >= l)
        return null;
    } while (!this.isCellEditable(a, d));
    return a === e && d === t ? null : new A(d, a);
  }
  _dispatchEditorEvent(e, t, i, s, n = null, r = null, l = null) {
    const h = this._editedCell;
    return this._grid.dispatchEvent(new CustomEvent(e, {
      bubbles: !1,
      cancelable: t,
      detail: {
        rowIndex: i,
        columnIndex: s,
        item: this._dataGroup.getItemAt(i),
        column: this._dataGroup.getColumnAt(s),
        renderer: h && h.renderer || null,
        editor: h && h.editor || null,
        oldValue: n,
        newValue: r,
        trigger: l
      }
    }));
  }
  _getPrintableKey(e) {
    const t = e && (e.char || e.key);
    return this._grid.editOnKeys.indexOf(t) >= 0 ? t : null;
  }
  _onGridItemEvent(e) {
    const t = e.detail.rowIndex, i = e.detail.columnIndex, s = this.isEditing();
    if (s && this._lastEditCellPosition.contains(i, t))
      return;
    const n = this._dataGroup.getColumnAt(i), r = this._findMergeCellPosition(t, i), l = n.editOnEvents || this._grid.editOnEvents || [], h = ps[e.type];
    s && !this.endEdit(e) || l.indexOf(h) < 0 || this.startEdit(r.rowIndex, r.columnIndex, e);
  }
  _onGridKeyDown(e) {
    if (!this.isEditing() && !e.defaultPrevented) {
      const t = this._dataGroup.caretRowIndex, i = this._dataGroup.caretColumnIndex;
      if (!e.ctrlKey && !e.altKey && t >= 0 && i >= 0 && (this._getPrintableKey(e) || e.keyCode === 113)) {
        const n = this._findMergeCellPosition(t, i);
        this.startEdit(n.rowIndex, n.columnIndex, e) && e.preventDefault();
      }
    }
  }
  _onGridScroll(e) {
    this.isEditing() && this.endEdit(e);
  }
  _onDocumentKeyDown(e) {
    if (e.defaultPrevented)
      return;
    const { keyCode: t, shiftKey: i } = e;
    if (this.isEditing() && Cs.indexOf(t) >= 0) {
      e.preventDefault();
      const { rowIndex: s, columnIndex: n } = this._lastEditCellPosition;
      t === 27 ? this.cancelEdit() : t === 13 ? this.endEdit(e) && this._startNextEdit(s, n, i, !0, e) : t === 9 ? this.endEdit(e) && this._startNextEdit(s, n, i, !1, e) : t === 37 ? this.endEdit(e) && this._grid.moveCaretLeft() : t === 38 ? this.endEdit(e) && this._grid.moveCaretUp() : t === 39 ? this.endEdit(e) && this._grid.moveCaretRight() : t === 40 && this.endEdit(e) && this._grid.moveCaretDown();
    }
  }
  _onDocumentMouseEvent(e) {
    if (e.defaultPrevented)
      return;
    const t = this._editedCell.editor;
    if (!t)
      return;
    const i = t.htmlElement;
    if (i instanceof Element && i.contains(e.target))
      return;
    const s = e.clientX, n = e.clientY, r = i.getBoundingClientRect();
    (s < r.left || s > r.right || n < r.top || n > r.bottom) && this.endEdit(e);
  }
}
function $(o) {
  return new Function("a", "b", `return a ${o} b`);
}
function Vt(o, e, t) {
  return !o || !e ? !1 : (t && (o = o.toLowerCase(), e = e.toLowerCase()), o.indexOf(e) >= 0);
}
function ws(o, e) {
  return !Vt(o, e);
}
function vs(o, e) {
  return o && e && o.startsWith(e);
}
function bs(o, e) {
  return o && e && o.startsWith(e);
}
const Es = [
  { type: "equals", compare: $("==") },
  { type: "notEqual", compare: $("!=") },
  { type: "lessThan", compare: $("<") },
  { type: "lessThanOrEqual", compare: $("<=") },
  { type: "greaterThan", compare: $(">") },
  { type: "greaterThanOrEqual", compare: $(">=") },
  { type: "contains", compare: Vt },
  { type: "notContains", compare: ws },
  { type: "startsWith", compare: vs },
  { type: "endsWith", compare: bs }
];
function kt(o) {
  return o = (o || "").toLowerCase(), Es.find((e) => o === e.type.toLowerCase());
}
function Bt(o) {
  return o != null ? "" + o : "";
}
function xs(o) {
  return ++o;
}
function Rs(o) {
  o || (o = {});
  const e = [], t = [], i = function(s) {
    let n = s.operator;
    if (n) {
      const r = kt(n);
      r && (e.push(r.compare), t.push(s.value));
    }
  };
  return "from" in o && i(o.from), "to" in o && i(o.to), e.length <= 0 && i(o), { conditions: e, values: t };
}
class je {
  constructor(e, t) {
    this.options = e, this._manager = t;
    const i = Rs(e.condition);
    this._conditions = i.conditions || [], this._values = i.values || [], this.valueFunction = e.valueFunction;
  }
  get manager() {
    return this._manager;
  }
  get column() {
    return this.options.column;
  }
  get dataField() {
    return this.column.dataField;
  }
  get collection() {
    return this.options.collection;
  }
  /**
   * 비교 데이타가 있는지 여부
   * @returns {boolean}
   */
  get canCompare() {
    return this._values != null;
  }
  /**
   * 조건 입력
   * @returns {Array|null}
   */
  getConditions() {
    return this._conditions;
  }
  /**
   *
   * @param  {Array} value
   * @returns {boolean}
   */
  setConditions(e) {
    return this._conditions !== e ? (this._conditions = e || [], !0) : !1;
  }
  getValues() {
    return this._values || [];
  }
  /**
   *
   * @param  {Array} value
   * @returns {boolean}
   */
  setValues(e) {
    return this._values !== e ? (this._values = e || [], !0) : !1;
  }
  itemToValue(e) {
    const t = this.column.itemToValue(e);
    return this.valueFunction ? this.valueFunction(t) : t;
  }
  compare(e) {
    return !0;
  }
  compareOtherFilters(e) {
    return !this.manager.filters.some((t) => t !== this && t.canCompare && !t.compare(e));
  }
  refresh() {
    this.manager.refresh();
  }
}
class Is extends je {
  constructor(e, t) {
    super(e, t), this.filterValueSet = null;
  }
  get canCompare() {
    const e = this.getValues().length;
    return e <= 0 || (this._possibleValues || []).length === e ? !1 : super.canCompare;
  }
  itemToValue(e) {
    return Bt(super.itemToValue(e));
  }
  getPossibleValues() {
    const e = this.collection;
    if (e && !this._possibleValues) {
      const t = /* @__PURE__ */ new Set();
      e.forEach((i) => {
        const s = this.itemToValue(i);
        t.has(s) || t.add(s);
      }), this._possibleValues = Array.from(t);
    }
    return this._possibleValues;
  }
  /**
   * @override
   * @param value {Array}
   */
  setValues(e) {
    return super.setValues(e) ? (this.filterValueSet = new Set(e), !0) : !1;
  }
  compare(e) {
    return this.filterValueSet && this.filterValueSet.has(this.itemToValue(e));
  }
}
function at(o, e, t, i = !1) {
  return !o || o(e, t, i);
}
class Ye extends je {
  constructor(e, t) {
    super(e, t);
  }
  get canCompare() {
    return this.fromCondition != null && this.fromValue != null || this.toCondition != null && this.toValue != null;
  }
  get fromCondition() {
    return this._conditions[0];
  }
  get toCondition() {
    return this._conditions[1];
  }
  get fromValue() {
    return this._values[0];
  }
  get toValue() {
    return this._values[1];
  }
  setConditions(e) {
    return e = e && e.map((t) => {
      if (t instanceof Function)
        return t;
      const i = kt(t.toLowerCase());
      return i && i.compare;
    }), super.setConditions(e);
  }
  compare(e) {
    const t = this.itemToValue(e);
    let i = !0;
    if (this.fromCondition && this.fromValue && (i = at(this.fromCondition, t, this.fromValue, !0)), this.toCondition && this.toValue) {
      const s = this.options.condition.operator;
      return s === "and" && !i ? !1 : s !== "and" && i ? !0 : at(this.toCondition, t, this.toValue, !0);
    }
    return i;
  }
}
class Ls extends Ye {
  constructor(e, t) {
    super(e, t);
  }
  itemToValue(e) {
    return xs(super.itemToValue(e));
  }
}
class Ss extends Ye {
  constructor(e, t) {
    super(e, t);
  }
}
class Ms extends Ye {
  constructor(e, t) {
    super(e, t);
  }
  get canCompare() {
    return !!(this.fromCondition != null && this.fromValue || this.toCondition != null && this.toValue);
  }
  itemToValue(e) {
    return Bt(super.itemToValue(e));
  }
}
class Ds extends je {
  constructor(e, t, i) {
    super(t, i), this.callback = e;
  }
  /**
   * 비교 데이타가 있는지 여부
   * @returns {boolean}
   */
  get canCompare() {
    return this.callback instanceof Function;
  }
  compare(e) {
    return this.callback(e, this.options.column);
  }
}
class Ns {
  constructor(e) {
    this.grid = e, this.filters = [], this.filterMap = /* @__PURE__ */ new Map(), e.addEventListener("collection-change", this.onCollectionChange.bind(this)), e.addEventListener("column-collection-change", this.onColumnCollectionChange.bind(this));
  }
  get collection() {
    return this.grid.collection;
  }
  getFilter(e) {
    return this.filterMap.get(e);
  }
  /**
   * 필터 생성
   * @param column
   * @returns {null|*}
   */
  createFilter(e) {
    const t = e.filter;
    if (!t)
      return null;
    if (t instanceof Function)
      return new Ds(t, {
        collection: this.grid.collection,
        column: e
      }, this);
    if (!e.dataField)
      return console.warn("`dataField` is not defined", t), null;
    let i;
    switch (t.type) {
      case "set":
        i = Is;
        break;
      case "number":
        i = Ls;
        break;
      case "date":
        i = Ss;
        break;
      default:
        i = Ms;
        break;
    }
    return new i({
      ...t,
      collection: this.grid.collection,
      column: e
    }, this);
  }
  addFilter(e, t) {
    this.filters.push(t), this.filterMap.set(e, t);
  }
  /**
   *
   */
  refresh() {
    const e = this.grid.collection;
    if (!e)
      return !1;
    const t = this.filters.filter((s) => s.canCompare);
    let i = null;
    if (t.length > 0) {
      const s = (n) => {
        for (let r = 0, l = t.length; r < l; r++)
          if (!t[r].compare(n))
            return !1;
        return !0;
      };
      i = (n) => s(n);
    }
    return e.filterFunction !== i ? (e.filterFunction = i, e.refresh(), !0) : !1;
  }
  /**
   * 필터 리셋
   */
  reset(e = !1) {
    let t = this.filterMap;
    this.clear(), this.grid.normalizedColumns.forEach((i) => {
      let s = null;
      e && (s = t.get(i)), s || (s = this.createFilter(i)), s && this.addFilter(i, s);
    }), this.refresh();
  }
  clear() {
    this.filters = [], this.filterMap = /* @__PURE__ */ new Map();
  }
  onCollectionChange(e) {
    e.detail.kind === "reset" && this.reset();
  }
  onColumnCollectionChange(e) {
    e.detail.kind === "reset" && this.reset(!0);
  }
}
const Ts = {
  constructor() {
    this._filterManager = new Ns(this);
  },
  get filterManager() {
    return this._filterManager;
  }
};
class Wt {
  constructor(e, t) {
    this._grid = t, this._name = e;
  }
  get name() {
    return this._name;
  }
  get grid() {
    return this._grid;
  }
  created(e) {
  }
  updating() {
  }
  update() {
  }
}
const Z = {};
function Ut() {
  return Object.keys(Z).map((o) => Z[o]);
}
function jt(o, e) {
  const t = class extends Wt {
    constructor(s) {
      super(o, s);
    }
  };
  return N(t.prototype, e, !1), t;
}
function Hs(o) {
  return o ? Z[o] : null;
}
function Yt(o, e) {
  let t = null;
  return o && (t = Z[o] = jt(o, e)), t;
}
function Gs(o) {
  o in Z && delete Z[o];
}
var xn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  IAddon: Wt,
  add: Yt,
  createFactory: jt,
  get: Hs,
  getAddons: Ut,
  remove: Gs
});
class Fs {
  constructor(e) {
    this.grid = e, this._addons = Ut().map((i) => this._createAddon(i));
    const t = this._onDataGroupRender.bind(this);
    e.addEventListener("render-updating", t), e.addEventListener("render-update", t);
  }
  getAddons() {
    return this._addons.slice(0);
  }
  getAddon(e) {
    return this._addons.find((t) => t.name === e);
  }
  addAddon(e, t) {
    if (!e)
      return;
    if (this.getAddon(e))
      throw new Error(`'${e}' has already been taken`);
    const i = Yt(e, t);
    this._addons.push(this._createAddon(i));
  }
  /**
   * addon 인스턴스를 생성합니다.
   * @param factory
   * @returns {*}
   * @private
   */
  _createAddon(e) {
    const t = new e(this.grid);
    return H(t, "created", this.grid), t;
  }
  _onDataGroupRender(e) {
    switch (e.type) {
      case "render-updating":
        this._addons.forEach((t) => {
          t.updating(this.grid);
        });
        break;
      case "render-update":
        this._addons.forEach((t) => {
          t.update(this.grid);
        });
        break;
    }
  }
}
const fe = {};
function De(o) {
  return o ? fe[o] : null;
}
function Os(o, e) {
  o && "css" in e && "canvasStyle" in e && (fe[o] = e);
}
function As(o) {
  o in fe && delete fe[o];
}
var Rn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  add: Os,
  get: De,
  remove: As
});
const Kt = ["header-double-click", "header-down", "header-up", "header-click", "header-drag", "header-out", "header-over"], Xt = ["separator-over", "separator-out", "separator-down", "separator-drag", "separator-up", "separator-click", "separator-double-click"], zs = [].concat(Kt, Xt), Ps = ["item-over", "item-out", "item-down", "item-up", "item-drag", "item-click", "item-double-click"], Vs = Ps.concat([
  "collection-change",
  "column-collection-change",
  "column-node-change",
  "normalized-columns-change",
  "selection-changing",
  "selection-change",
  "item-edit-starting",
  "item-edit-start",
  "item-edit-ending",
  "item-edit-end",
  "item-edit-cancel",
  "render-updating",
  "render-update"
]), ct = {
  headerRenderer: -200,
  mergeItemRenderer: -100,
  itemRenderer: -100,
  columns: 100,
  items: 200
};
function ks(o, e) {
  const t = ct[o] || 0, i = ct[e] || 0;
  return t < i ? -1 : t > i ? 1 : 0;
}
function Bs(o) {
  return o === "number" ? Ct : Ze;
}
function Ws(o, e, t) {
  if (o.level >= e.level)
    return o.parent === e.parent;
  let i = e, s = e.parent;
  for (; s; ) {
    if (o.level - 1 === s.level && o.parent === s)
      return !0;
    {
      let n = s.children, r = n ? n.length : 0, l = r > 0 ? n.indexOf(i) : -1, h, a, d;
      for (h = 0; h < r; h++)
        if (d = t ? r - h - 1 : h, a = n[d], !!a.visible) {
          if (d !== l || o.level === a.level)
            return !1;
          break;
        }
    }
    i = s, s = s.parent;
  }
  return !0;
}
class Ke extends oe {
  constructor() {
    super(), this.editable = !1, this.editOnKeys = G.editOnKeys, this.editOnEvents = ["doubleClick"], this.selectOnDrag = !0, this.multiSortable = !1, this.pasteFromClipboard = !0, this._resizableColumns = !0, this._draggableColumns = !0, this._sortableColumns = !0, this._labelFunction = null, this._rowCount = -1, this._maxRowCount = -1, this._dragScrollId = -1, this._dragScrollDelta = null, this._sortColumns = [], this._dragColumnInfo = null, this._dropColumnInfo = null, this._dragCanceled = !1, this._theme = null, this._oldWidth = 0, this._oldHeight = 0, this._gridEditor = new ys(this), this._itemEditor = G.itemEditor || Nt, this._boundDoLayout = this.doLayout.bind(this), this._defaultStyles = N({}, G.styles);
    const e = this._dataGroup = this.createDataGroup(), t = this._headerGroup = this.createHeaderGroup(), i = this._scroller = new Mi(e);
    this.appendChild(t), this.appendChild(i), this._sizeDetector = new ResizeObserver((l, h) => {
      this._onResize();
    }), this._sizeDetector.observe(this.root), this._addonHelper = new Fs(this);
    const s = this._onHeaderEvents.bind(this);
    Kt.forEach((l) => t.addEventListener(l, s));
    const n = this._onHeaderSeparatorEvents.bind(this);
    Xt.forEach((l) => t.addEventListener(l, n));
    const r = this._redispatch.bind(this);
    zs.forEach((l) => t.addEventListener(l, r)), Vs.forEach((l) => e.addEventListener(l, r)), i.addEventListener("scroll", r, { passive: !0 }), this.addEventListener("keydown", this._onKeyDown.bind(this)), e.addEventListener("item-down", this._onItemDown.bind(this));
  }
  /**
   * 기본 스타일 정의
   * @returns defaults.styles|{backgroundColor, font, color, textAlign, verticalAlign, rowHeight, headerRowHeight, rowLineColor, rowLineWidth, rowColors, columnLineColor, columnLineWidth, columnLineStyle, frozenLineColor, frozenLineWidth, frozenLineStyle, cellSelectionColor, cellOverColor, textSelectionColor, textOverColor, caretLineColor, caretLineWidth, cellPadding, headerRowLineColor, headerRowLineWidth, headerColumnLineColor, headerColumnLineWidth}}
   * @private
   */
  get defaultStyles() {
    return this._defaultStyles;
  }
  /**
   * 데이타 그리드의 헤더영역 인스턴스입니다.
   * @returns {*}
   */
  get headerGroup() {
    return this._headerGroup;
  }
  /**
   * 데이타 그리드의 데이타 영역 인스턴스입니다.
   * @returns {*}
   */
  get dataGroup() {
    return this._dataGroup;
  }
  get selector() {
    return this.dataGroup.selector;
  }
  /**
   * 그리드의 행에 표시되는 데이터 목록을 관리합니다.
   * 이 속성은 ArrayList 타입입니다.
   * 이를 사용하면 행추가, 삭제, 수정, 이동이 가능합니다.
   * @returns {ArrayList}
   */
  get collection() {
    return this.dataGroup.collection;
  }
  get columnCollection() {
    return this.dataGroup.columnCollection;
  }
  /**
   * 그리드 행에 표시되는 데이타 목록입니다.
   * @returns {Array}
   */
  get items() {
    return this.collection && this.collection.source;
  }
  set items(e) {
    if (e && !Array.isArray(e)) {
      console.warn("`items` must be an array.", e);
      return;
    }
    this.items !== e && (this.dataGroup.collection = this.createCollection(e), this.doLayout());
  }
  /**
   * 그리드 헤더에 표시되는 컬럼목록입니다.
   * 명시적으로 설정하지 않는 경우 items의 첫번째 항목의 해당 속성들로 표시합니다.
   * @returns {Array}
   */
  get columns() {
    return this.columnCollection && this.columnCollection.source;
  }
  set columns(e) {
    this.columns !== e && (this.dataGroup.columnCollection = new At(e), this.doLayout());
  }
  /**
   *
   * @returns {*}
   */
  get normalizedColumns() {
    return this.dataGroup.normalizedColumns;
  }
  /**
   * 셀 텍스트를 결정하는 콜백 함수입니다.
   * 기본적으로 각 셀의 텍스트는 그 셀이 속한 컬럼의 `dataField`와 일치하는 아이템 객체의 프로퍼티 값으로 설정됩니다.
   * `labelFunction` 사용시 사용자가 지정한 값으로 설정할 수 있습니다.
   * 그러나, 컬럼 자체에 `labelFunction`이 이미 정의되어 있다면, 해당 컬럼의 `labelFunction`이 우선적으로 사용되며 이 메소드는 무시됩니다.
   * ```
   * labelFunction (item : Object, column : DataGridColumn) : String{
   *      return item[column.dataField] + '%';
   * }
   * ```
   */
  get labelFunction() {
    return this._labelFunction;
  }
  set labelFunction(e) {
    this._labelFunction !== e && (this._labelFunction = e, this.dataGroup.invalidate());
  }
  /**
   * 헤더 셀을 구성하는 클래스 팩토리입니다.
   */
  get headerRenderer() {
    return this._headerGroup.headerRenderer;
  }
  set headerRenderer(e) {
    this._headerGroup.headerRenderer = e;
  }
  /**
   * 데이타 셀을 구성하는 클래스 팩토리입니다.
   * @param Object || Function
   */
  get itemRenderer() {
    return this.dataGroup.itemRenderer;
  }
  set itemRenderer(e) {
    this.dataGroup.itemRenderer = e;
  }
  /**
   * 병합된 셀을 구성하는 클래스 팩토리입니다.
   */
  get mergeItemRenderer() {
    return this.dataGroup.mergeItemRenderer;
  }
  set mergeItemRenderer(e) {
    this.dataGroup.mergeItemRenderer = e;
  }
  /**
   * 빈값을 가진(null) 셀을 구성하는 클래스 팩토리입니다.
   */
  get nullItemRenderer() {
    return this.dataGroup.nullItemRenderer;
  }
  set nullItemRenderer(e) {
    this.dataGroup.nullItemRenderer = e;
  }
  /**
   * nullItemRenderer 사용 여부입니다.
   */
  get useNullItemRenderer() {
    return this.dataGroup.useNullItemRenderer;
  }
  set useNullItemRenderer(e) {
    this.dataGroup.useNullItemRenderer = e;
  }
  get itemEditor() {
    return this._itemEditor || G.defaultItemEditor;
  }
  set itemEditor(e) {
    this._itemEditor = e;
  }
  /**
   * `ScrollLeft` 최대값입니다.
   * @returns {number}
   */
  get maxScrollLeft() {
    return this._scroller.maxScrollLeft;
  }
  /**
   * `scrollTop` 최대값입니다.
   * @returns {number}
   */
  get maxScrollTop() {
    return this._scroller.maxScrollTop;
  }
  /**
   * 수평 스크롤 위치값입니다.
   * @returns {number}
   */
  get scrollLeft() {
    return this.dataGroup.scrollLeft || 0;
  }
  set scrollLeft(e) {
    this.dataGroup.scrollLeft = e;
  }
  /**
   * 수직 스크롤 위치값입니다.
   * @returns {number}
   */
  get scrollTop() {
    return this.dataGroup.scrollTop || 0;
  }
  set scrollTop(e) {
    this.dataGroup.scrollTop = e;
  }
  /**
   *  GridColumn.isColumnMerge 및 GridColumn.isRowMerge 설정에 따라 동일한 데이터를 가진 연속적인 셀들을 자동으로 병합하는 기능을 제어합니다.
   */
  get autoMerge() {
    return this.dataGroup.autoMerge;
  }
  set autoMerge(e) {
    this.dataGroup.autoMerge = e;
  }
  /**
   * 컬럼이 정의되지 않았을 때 `items` 첫 번째 아이템 구조를 기준으로 컬럼을 자동으로 생성하는 기능을 제어합니다.
   */
  get autoGenerateColumns() {
    return this.dataGroup.autoGenerateColumns;
  }
  set autoGenerateColumns(e) {
    this.dataGroup.autoGenerateColumns = e;
  }
  /**
   * 행의 기본 높이를 지정합니다.
   * autoRowHeight가 `false` 일 경우에 한합니다.
   * @returns {number}
   */
  get rowHeight() {
    return this.dataGroup.rowHeight;
  }
  set rowHeight(e) {
    this.dataGroup.rowHeight = e;
  }
  /**
   * 헤더 셀의 높이를 지정합니다.
   * 컬럼이 계층구조 일 경우 헤더 높이는 계층 최대 깊이 * headerRowHeight 립니다.
   * @returns {number}
   */
  get headerRowHeight() {
    return this._headerGroup.headerRowHeight;
  }
  set headerRowHeight(e) {
    this._headerGroup.headerRowHeight = e;
  }
  /**
   * 행의 높이를 구하는 기준을 지정합니다.
   * `true` 경우 각 행의 셀 렌더러의 최대 높이가 행의 높이가 됩니다.
   * `false` 경우 rowHeight 속성의 값이 됩니다.
   * @returns {boolean}
   */
  get autoRowHeight() {
    return this.dataGroup.autoRowHeight;
  }
  set autoRowHeight(e) {
    this.dataGroup.autoRowHeight = e;
  }
  /**
   * 그리드의 표현되는 최대 행의 수를 설정합니다.
   * @returns {number}
   */
  get maxRowCount() {
    return this.dataGroup.maxRowCount;
  }
  set maxRowCount(e) {
    this.dataGroup.maxRowCount = +e;
  }
  /**
   * 그리드의 표현되는 행의 수를 설정합니다.
   * @returns {number}
   */
  get rowCount() {
    return this.dataGroup.rowCount;
  }
  set rowCount(e) {
    this.rowCount !== e && (this.dataGroup.rowCount = +e, this.doLayout());
  }
  /**
   * 좌를 기준으로 행을 고정합니다.
   * 수평스크롤에 영향을 받지 않습니다.
   * @returns {number}
   */
  get frozenLeft() {
    return this.dataGroup.frozenLeft;
  }
  set frozenLeft(e) {
    this.dataGroup.frozenLeft = e;
  }
  /**
   * 우를 기준으로 행을 고정합니다.
   * 수평 스크롤에 영향을 받지 않습니다.
   * @returns {number}
   */
  get frozenRight() {
    return this.dataGroup.frozenRight;
  }
  set frozenRight(e) {
    this.dataGroup.frozenRight = e;
  }
  /**
   * 위를 기준으로 행을 고정합니다.
   * 수직스크롤에 영향을 받지 않습니다.
   * @returns {number}
   */
  get frozenTop() {
    return this.dataGroup.frozenTop;
  }
  set frozenTop(e) {
    this.dataGroup.frozenTop = e;
  }
  /**
   * 아래를 기준으로 행을 고정합니다.
   * 수직스크롤에 영향을 받지 않습니다.
   * @returns {number}
   */
  get frozenBottom() {
    return this.dataGroup.frozenBottom;
  }
  set frozenBottom(e) {
    this.dataGroup.frozenBottom = e;
  }
  /**
   * 자동 병합시 병합영역을 체크하는 함수입니다.
   * compareFunction(targetItem, targetColumn, sourceItem, sourceColumn)
   * @returns {function}
   */
  get mergeCompare() {
    return this.dataGroup.mergeCompare;
  }
  set mergeCompare(e) {
    this.dataGroup.mergeCompare = e;
  }
  /**
   * 컬럼의 정렬기능 사용여부입니다.
   * @returns {*}
   */
  get sortableColumns() {
    return this._sortableColumns;
  }
  set sortableColumns(e) {
    this._sortableColumns !== e && (this._sortableColumns = e, e || this.sortByColumns(null));
  }
  /**
   *  컬럼의 너비를 변경 가능한지 여부입니다.
   *  @returns {boolean}
   */
  get resizableColumns() {
    return this._resizableColumns;
  }
  set resizableColumns(e) {
    this._resizableColumns !== e && (this._resizableColumns = e);
  }
  /**
   * 컬럼의 순서를 변경가능한지 여부입니다.
   * 해당 속성이 true이고 드래그 대상 컬럼의 draggableColumn속성이 true인 경우 컬럼을 드래그하여 이동 할 수 있습니다.
   * @returns {boolean}
   */
  get draggableColumns() {
    return this._draggableColumns;
  }
  set draggableColumns(e) {
    this._draggableColumns !== e && (this._draggableColumns = e);
  }
  /**
   * 헤더 드래그 중인지 여부입니다.
   */
  get isHeaderDragging() {
    return this._dragColumnInfo != null;
  }
  get hasVerticalScroll() {
    return this._scroller.hasVerticalScroll;
  }
  get hasHorizontalScroll() {
    return this._scroller.hasHorizontalScroll;
  }
  /**
   * 아이템렌더러, 헤더 렌더러가 해제(삭제)될 때 콜백됩니다.
   * 반환값이 'false' 이면 해당렌더러는 재사용 되지 않습니다.
   */
  get hookFreeElement() {
    return this._hookFreeElement;
  }
  set hookFreeElement(e) {
    this._hookFreeElement !== e && (this._hookFreeElement = this.dataGroup.hookFreeElement = this.headerGroup.hookFreeElement = e);
  }
  //-------------------------------------------------
  //
  //   Selection
  //
  //-------------------------------------------------
  get selectionMode() {
    return this.dataGroup.selectionMode || "";
  }
  set selectionMode(e) {
    this.selectionMode !== e && (this.dataGroup.clearSelection(), this.dataGroup.selectionMode = e, this.invalidate());
  }
  /**
   * 선택된 아이템의 인덱스를 설정하거나 가져옵니다.
   * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 행 인덱스가 반환됩니다.
   */
  get selectedIndex() {
    return this.dataGroup.selectedIndex;
  }
  set selectedIndex(e) {
    this.dataGroup.selectedIndex = e;
  }
  /**
   * 선택된 아이템를 설정합니다.
   * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 항목이 반환됩니다.
   */
  get selectedItem() {
    return this.dataGroup.selectedItem;
  }
  set selectedItem(e) {
    this.dataGroup.selectedItem = e;
  }
  /**
   * 복수로 선택된 아이템의 인덱스 목록을 설정합니다.
   * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 인덱스 배열이 반환됩니다.
   */
  get selectedIndices() {
    return this.dataGroup.selectedIndices;
  }
  set selectedIndices(e) {
    this.dataGroup.selectedIndices = e;
  }
  /**
   * 복수로 선택된 아이템을 설정합니다.
   * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 항목의 배열이 반환됩니다.
   */
  get selectedItems() {
    return this.dataGroup.selectedItems;
  }
  set selectedItems(e) {
    this.dataGroup.selectedItems = e;
  }
  /**
   * 선택된 셀을 설정합니다.
   */
  get selectedCell() {
    return this.dataGroup.selectedCell;
  }
  set selectedCell(e) {
    this.dataGroup.selectedCell = e;
  }
  /**
   * 복수로 선택된 셀을 설정합니다.
   */
  get selectedCells() {
    return this.dataGroup.selectedCells;
  }
  set selectedCells(e) {
    this.dataGroup.selectedCells = e;
  }
  /**
   * caret 행 인덱스입니다.
   */
  get caretRowIndex() {
    return this.dataGroup.caretRowIndex;
  }
  set caretRowIndex(e) {
    this.dataGroup.caretRowIndex = e;
  }
  /**
   * caret 컬럼 인덱스입니다.
   */
  get caretColumnIndex() {
    return this.dataGroup.caretColumnIndex;
  }
  set caretColumnIndex(e) {
    this.dataGroup.caretColumnIndex = e;
  }
  /**
   * 지정된 이름으로 테마를 적용합니다..
   * `theme.add` 이용해 테마를 등록 후 테마를 사용할수 있습니다.
   * ```
   * tachyon.theme.add('themeA', {
   *     css: 'themeA',
   *     canvasStyle: {
   *         backgroundColor: '#999900',
   *         rowLine: {
   *             width: 1,
   *             color: '#FF0000',
   *             dashed: []
   *         },
   *         ...
   *     }
   * })
   * ```
   */
  get theme() {
    return this._theme;
  }
  set theme(e) {
    this._theme !== e && (this.releaseTheme(), this._theme = e, e && this.applyTheme());
  }
  /**
   *
   * @param item
   * @param column
   * @returns {*|*|*|*}
   */
  itemToLabel(e, t) {
    return this.dataGroup.itemToLabel(e, t);
  }
  //-------------------------------------------------
  //
  //   addons
  //
  //-------------------------------------------------
  /**
   * addons
   * @returns {Array}
   */
  getAddons() {
    return this._addonHelper.getAddons();
  }
  /**
   * 지정된 이름에 해당하는 애드온 컴포넌트를 반환합니다.
   */
  getAddon(e) {
    return this._addonHelper.getAddon(e);
  }
  addAddon(e, t) {
    this._addonHelper.addAddon(e, t);
  }
  //-------------------------------------------------
  //
  //   Columns
  //
  //-------------------------------------------------
  /**
   * 부모 컬럼에 자식 컬럼을 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param column 추가할 자식 컬럼
   * @returns {boolean}
   */
  addColumn(e, t) {
    return this.columnCollection ? this.columnCollection.addNode(e, t) : !1;
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 컬럼을 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param column 추가할 자식 컬럼.
   * @param index 자식 컬럼 삽입 위치의 인덱스.
   * @returns {boolean}
   */
  addColumnAt(e, t, i) {
    return this.columnCollection ? this.columnCollection.addNodeAt(e, t, i) : !1;
  }
  /**
   * 부모 컬럼에 자식 컬럼을 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param columns 추가할 자식 컬럼 목록
   * @returns {boolean}
   */
  addColumns(e, t) {
    return this.columnCollection ? this.columnCollection.addNodes(e, t) : !1;
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 컬럼목록을 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param columns 추가할 자식 컬럼 목록
   * @param index 자식 컬럼 삽입 위치의 인덱스.
   * @returns {boolean}
   */
  addColumnsAt(e, t, i) {
    return this.columnCollection ? this.columnCollection.addNodesAt(e, t, i) : !1;
  }
  /**
   * 부모 컬럼에서 자식 컬럼을 삭제합니다.
   * @param parent 부모 노드입니다.
   * @param column 삭제할 자식 컬럼 입니다.
   * @returns {boolean}
   */
  removeColumn(e, t) {
    return this.columnCollection ? this.columnCollection.removeNode(e, t) : !1;
  }
  /**
   * 부모 컬럼에서 자식 컬럼을 삭제합니다.
   * @param parent 부모 노드입니다.
   * @param columns 삭제할 컬럼 목록 입니다.
   * @returns {boolean}
   */
  removeColumns(e, t) {
    return this.columnCollection ? this.columnCollection.removeNodes(e, t) : !1;
  }
  moveColumn(e, t, i) {
    return this.columnCollection ? this.columnCollection.moveNode(e, t, i) : !1;
  }
  //-------------------------------------------------
  //
  //  Dimension
  //
  //-------------------------------------------------
  /**
   * 지정된 컬럼 인덱스의 x 위치를 반환합니다.
   * @param index
   * @returns {Number}
   */
  getColumnX(e) {
    return this.dataGroup.getColumnX(e);
  }
  /**
   * 지정된 컬럼 인덱스의 너비를 반환합니다.
   * @param index 컬럼 인덱스
   * @returns {Number}
   */
  getColumnWidth(e) {
    return this.dataGroup.getColumnWidth(e);
  }
  getColumnLayout(e) {
    return this.dataGroup.getColumnLayout(e);
  }
  /**
   * 지정된 컬럼 인덱스 너비를 설정합니다.
   * @param index
   * @param size
   */
  setColumnWidth(e, t) {
    this.dataGroup.setColumnWidth(e, t);
  }
  /**
   * from 컬럼부터 to 컬럼까지의 너비의 합을 반환합니다.
   * @param from 시작 컬럼 인덱스
   * @param to 종료 컬럼 인덱스
   * @returns {Number}
   */
  getColumnsWidth(e, t) {
    return this.dataGroup.getColumnsWidth(e, t);
  }
  /**
   * 지정된 인덱스 행 높이를 반환합니다.
   * @param index
   * @returns {Number}
   */
  getRowHeight(e) {
    return this.dataGroup.getRowHeight(e);
  }
  /**
   * 지정된 인덱스의 행 높이를 설정합니다.
   * @param index
   * @param height
   * @returns {boolean}
   */
  setRowHeight(e, t) {
    return this.dataGroup.setRowHeight(e, t);
  }
  /**
   * from 행부터 to 행까지의 높이의 합을 반환합니다.
   * @param from 시작행
   * @param to 종료행.
   * @returns {Number}
   */
  getRowsHeight(e, t) {
    return this.dataGroup.getRowsHeight(e, t);
  }
  getCellStyle(e, t, ...i) {
    return this.dataGroup.getCellStyle.apply(this.dataGroup, [e, t, ...i]);
  }
  setColumnVisible(e, t) {
    return this.dataGroup.setColumnVisible(e, t);
  }
  /**
   * 그리드 헤더 높이를 반환합니다.
   * @returns {number}
   */
  getHeaderHeight() {
    return this._headerGroup.headerHeight;
  }
  //-------------------------------------------------
  //
  //   Merge
  //
  //-------------------------------------------------
  getMergeCells() {
    return this.dataGroup.getMergeCellPositions();
  }
  addMergeCells(e) {
    Array.isArray(e) && e.forEach((t) => {
      t instanceof b || (t = b.create(t)), this.dataGroup.addMergeCellPosition(t);
    }), this.invalidate();
  }
  addMergeCell(e) {
    e instanceof b || (e = b.create(e)), this.dataGroup.addMergeCellPosition(e), this.invalidate();
  }
  removeMergeCell(e) {
    e instanceof b || (e = b.create(e)), this.dataGroup.removeMergeCellPosition(e), this.invalidate();
  }
  removeMergeCells() {
    this.dataGroup.removeMergeCellPositions(), this.invalidate();
  }
  //-------------------------------------------------
  //
  //   Sort
  //
  //-------------------------------------------------
  getSortColumns() {
    return this._sortColumns.slice(0);
  }
  /**
   * 하나 이상의 컬럼으로 정렬합니다.
   * @param columns
   */
  sortByColumns(e) {
    if (!this.collection || !e)
      return;
    let t = [], i = [];
    this.sortableColumns && e.forEach((n) => {
      n.sortable && (i.push(n), t.push({
        descending: n.sortDescending,
        sortFunction: ((r) => {
          let l;
          return r.sortCompare instanceof Function ? (l = r.sortCompare, (h, a) => l(h, a, r)) : (l = Bs(r.sortCompare), (h, a) => {
            let d = r.sortCompare, c = r.isSortOriginal ? r.itemToValue(h) : this.itemToLabel(h, r), u = r.isSortOriginal ? r.itemToValue(a) : this.itemToLabel(a, r);
            return d === "number" ? (c = +c, u = +u) : d === "string" && (c = c == null ? "" : "" + c, u = u == null ? "" : "" + u), l(c, u);
          });
        })(n)
      }));
    });
    let s = this._sortColumns || [];
    s.forEach((n) => {
      i.indexOf(n) < 0 && (n.sortDescending = !1);
    }), this._sortColumns = i, (s.length > 0 || i.length > 0) && (this.collection.sort(t), this.collection.refresh());
  }
  //-------------------------------------------------
  //
  //   Edit
  //
  //-------------------------------------------------
  /**
   * 편집 가능한 셀인지 확인합니다.
   * @param rowIndex
   * @param columnIndex
   * @returns {boolean}
   */
  isCellEditable(e, t) {
    return this._gridEditor.isCellEditable(e, t);
  }
  /**
   * 지정된 셀에서 편집을 시작합니다.
   * 편집이 시작되면 'item-edit-starting', 'item-edit-start' 이벤트가 발생합니다.
   * 'item-edit-starting' 이벤트가 발생할 때, `preventDefault`를 사용하여 편집을 취소할수 있습니다.
   * @param rowIndex
   * @param columnIndex
   * @returns {boolean}
   */
  startEdit(e, t) {
    return this._gridEditor.startEdit(e, t);
  }
  /**
   * 편집을 종료하고 편집중인 내용이 저장됩니다.
   * 편집이 종료되면 'item-edit-ending', 'item-edit-end' 이벤트가 발생합니다.
   * 'item-edit-ending' 이벤트가 발생할 때, `preventDefault`를 사용하여 편집 종료를 취소할수 있습니다.
   * @returns {boolean}
   */
  endEdit() {
    return this._gridEditor.endEdit();
  }
  /**
   * 편집을 취소합니다. 편집중인 내용은 저장되지 않습니다.
   * 편집이 취소되면 'item-edit-cancel' 이벤트가 발생합니다.
   * @returns {boolean}
   */
  cancelEdit() {
    return this._gridEditor.cancelEdit();
  }
  /**
   * 편집중인지 확인합니다.
   * @returns {boolean}
   */
  isEditing() {
    return this._gridEditor.isEditing();
  }
  /**
   * 편집중인 에디터 정보를 반환합니다.
   * @returns {HTMLElement|null}
   */
  getEditedCell() {
    return this._gridEditor.editedCell;
  }
  //-------------------------------------------------
  //
  //
  //
  //-------------------------------------------------
  analysisMergeAll() {
    this.dataGroup.analysisMergeAll();
  }
  /**
   * 전체 병합 영역 바로 분석실행
   */
  /**
   * @private
   */
  createHeaderGroup() {
    return new Ht(this);
  }
  /**
   * @private
   */
  createDataGroup() {
    return new Ue(this);
  }
  /**
   * @private
   */
  createCollection(e) {
    return new Ri(e);
  }
  /**
   * 포커스를 설정합니다.
   */
  focus() {
    this.htmlElement.focus();
  }
  moveCaretUp() {
    return this._internalMoveCaret(this.caretRowIndex - 1, this.caretColumnIndex);
  }
  moveCaretDown() {
    return this._internalMoveCaret(this.caretRowIndex + 1, this.caretColumnIndex);
  }
  moveCaretLeft() {
    return this._internalMoveCaret(this.caretRowIndex, this.getPreviousVisibleColumnIndex(this.caretColumnIndex));
  }
  moveCaretRight() {
    return this._internalMoveCaret(this.caretRowIndex, this.getNextVisibleColumnIndex(this.caretColumnIndex));
  }
  /**
   * 지정된 셀 위치로 스크롤을 이동합니다.
   * @param rowIndex {number} - 스크롤을 이동하려는 대상 행의 인덱스입니다.
   * @param columnIndex {number} - 스크롤을 이동하려는 대상 열의 인덱스입니다.
   * @param allowSelection {boolean} - 이 값이 `true` 설정되면, 지정된 셀이 선택되고, 기본값은 `false` 입니다.
   */
  scrollToCell(e, t, i = !1) {
    this.dataGroup.scrollToCell(e, t, i);
  }
  /**
   * @private
   */
  doLayout() {
    const e = this._headerGroup, t = this._scroller;
    e.doLayout(!0);
    const i = e.root.offsetHeight, s = t.hasVerticalScroll, n = t.hasHorizontalScroll;
    t.root.style.height = `calc(100% - ${i}px)`;
    let r = t.root.offsetHeight;
    t.doLayout(!0);
    let l = t.root.offsetHeight;
    (r !== l || s !== t.hasVerticalScroll || n !== t.hasHorizontalScroll) && t.doLayout(), this._oldWidth = this.root.offsetWidth, this._oldHeight = this.root.offsetHeight;
  }
  lockDisplay() {
    this.dataGroup.lockDisplay(), this.headerGroup.lockDisplay();
  }
  unlockDisplay() {
    this.dataGroup.unlockDisplay(), this.headerGroup.unlockDisplay();
  }
  validateNow() {
    this.dataGroup.validateNow(), this.headerGroup.validateNow();
  }
  /**
   * 표시 목록을 갱신을 요청합니다.
   */
  invalidate(e = _.DISPLAY_UPDATE) {
    this.dataGroup.invalidate(e), this.headerGroup.invalidate(e);
  }
  /**
   * 대기중인 표시 목록 갱신을 바로 실행합니다.
   */
  flush() {
    this.dataGroup.validateNow(), this.headerGroup.validateNow();
  }
  /**
   * 현재 설정된 테마를 적용합니다.
   */
  applyTheme() {
    const e = De(this.theme);
    e && (e.css && T(this.root, e.css), this._defaultStyles = N({}, G.styles, e.canvasStyle || {}), this.invalidate());
  }
  /**
   * 현재 설정된 테마를 해제합니다.
   */
  releaseTheme() {
    const e = De(this.theme);
    e && (e.css && _i(this.root, e.css), this._defaultStyles = N({}, G.styles), this._theme && (this._theme = null), this.invalidate());
  }
  /**
   * 해당 인덱스의 앞 컬럼을 반환합니다.
   * @param index
   * @returns {number}
   */
  getPreviousVisibleColumnIndex(e) {
    const t = this.normalizedColumns;
    for (let i = e - 1; i >= 0; i--)
      if (t[i].visible)
        return i;
    return -1;
  }
  /**
   * 해당 인덱스의 뒤 컬럼을 반환합니다.
   * @param index
   * @returns {number}
   */
  getNextVisibleColumnIndex(e) {
    const t = this.normalizedColumns;
    for (let i = e + 1, s = t.length; i < s; i++)
      if (t[i].visible)
        return i;
    return -1;
  }
  clearHeaderRenderers() {
    this.headerGroup.clearCache();
  }
  clearItemRenderers() {
    this.dataGroup.clearCache();
  }
  mount(e, t = {}) {
    var s;
    (s = this.root.parentElement) == null || s.removeChild(this.root);
    let i = null;
    if (e instanceof HTMLElement ? i = e : typeof e == "string" && (i = document.querySelector(e)), i instanceof HTMLElement)
      i.appendChild(this.root), this.setOptions(t);
    else
      throw new Error(`Invalid container : [${e}]`);
    return this;
  }
  setOptions(e) {
    return Object.keys(e).sort(ks).forEach((t) => {
      let i = e[t];
      t === "options" ? N(this.dataGroup.options, i) : t === "addons" ? i.keys.forEach((s) => {
        this.addAddon(s, i[s]);
      }) : t in this && (t === "columns" && Array.isArray(i) && (i = i.map((s) => s instanceof F ? s : F.create(s))), this[t] = i);
    }), this;
  }
  destroy() {
    this._sizeDetector.disconnect(), this.headerGroup.destroy(), this.dataGroup.destroy(), this.dataGroup.collection = null, this.dataGroup.columnCollection = null;
  }
  _getFirstVisibleRowIndex() {
    let e = this.dataGroup.getVisibleRowIndices();
    if (e && e.length > 0) {
      const t = this.dataGroup.getVisibleFrozenIndexRect();
      return e[t.top];
    }
    return -1;
  }
  _styleChanged() {
    this.invalidate(_.ALL);
  }
  _getLastVisibleRowIndex() {
    let e = this.dataGroup.getVisibleRowIndices();
    if (e && e.length > 0) {
      let t = this.dataGroup.getVisibleFrozenIndexRect();
      return e[e.length - t.bottom - 1];
    }
    return -1;
  }
  _internalMoveCaret(e, t, i) {
    return e >= 0 && t >= 0 && e < this.collection.length && (this.caretRowIndex !== e || this.caretColumnIndex !== t) ? (i ? this.dataGroup.updateSelection(e, t, !0) : this.dataGroup.updateSelection(e, t, !1, !1), this.scrollToCell(e, t, !1, !1), !0) : !1;
  }
  _adjustCellNavigation(e) {
    let t = e.keyCode, i = e.shiftKey;
    e.ctrlKey;
    let s = this.dataGroup, n = s.isCellSelectionMode, r = s.getVisibleFrozenIndexRect(), l = this.caretRowIndex, h = this.caretColumnIndex, a = this.normalizedColumns.length, d = this.collection.length, c = s.findMergeCellPosition(l, h) || new b(l, h);
    switch (t) {
      case 37:
        c.left > 0 && (h = this.getPreviousVisibleColumnIndex(c.left));
        break;
      case 39:
        c.right + 1 < a && (h = this.getNextVisibleColumnIndex(c.right));
        break;
      case 38:
        c.top > 0 && (l = c.top - 1);
        break;
      case 40:
        c.bottom + 1 < d && (l = c.bottom + 1);
        break;
      case 33:
        let u = this._getFirstVisibleRowIndex();
        l > d - r.bottom ? l = d - r.bottom : l > u ? l = u : (this.scrollTop -= this.scrollTop + s.clientHeight - (s.getRowY(l) + s.getRowHeight(l)), l = this._getFirstVisibleRowIndex());
        break;
      case 34:
        let m = this._getLastVisibleRowIndex();
        l < r.top && l < d ? l = r.top : l < m ? l = m : (this.scrollTop = s.getRowY(l), l = this._getLastVisibleRowIndex());
        break;
      case 35:
        l = d - 1, h = n ? this.getPreviousVisibleColumnIndex(a) : 0;
        break;
      case 36:
        l = 0, h = n ? this.getNextVisibleColumnIndex(-1) : 0;
        break;
    }
    this._internalMoveCaret(l, h, i);
  }
  _calculateDragScrollDelta(e) {
    let t = 10, i = this.dataGroup, s = i.getVisibleFrozenSizeRect(), n = this.scrollLeft, r = this.scrollTop, l = new A();
    return e.x < n + s.left ? l.x = -t : e.x > n + i.clientWidth - s.right && (l.x = t), e.y < r + s.top ? l.y = -t : e.y > r + i.clientHeight - s.bottom && (l.y = t), l;
  }
  _startDragScrolling(e, t) {
    if (this._dragScrollDelta = e, this._dragScrollId < 0) {
      let i = () => {
        let s = this.scrollLeft, n = this.scrollTop;
        this.scrollLeft += this._dragScrollDelta.x, this.scrollTop += this._dragScrollDelta.y, (this.scrollLeft !== s || this.scrollTop !== n) && t(), this._dragScrollId = window.requestAnimationFrame(i);
      };
      i();
    }
  }
  _stopDragScrolling() {
    this._dragScrollId > 0 && (window.cancelAnimationFrame(this._dragScrollId), this._dragScrollId = -1);
  }
  _showOverlay() {
    if (!this._overlayGroup) {
      let e = document.createElement("div");
      T(e, "tachyon-group-overlay"), this.appendChild(e), this._overlayGroup = e;
    }
  }
  _hideOverlay() {
    this._overlayGroup && (this.removeChild(this._overlayGroup), this._overlayGroup = null);
  }
  _showHeaderDropIndicator(e) {
    if (this._overlayGroup) {
      const i = this.dataGroup;
      let s = this._dropHeaderIndicator;
      s ? s.removeAttribute("hidden") : (s = this._dropHeaderIndicator = document.createElement("div"), s.style.position = "absolute", s.style.zIndex = "9999", T(s, "tachyon-header-drag"), B(s, 10, i.clientHeight), this._overlayGroup.appendChild(s));
      let n = null;
      if (e >= this.normalizedColumns.length)
        n = Math.round(Math.min(i.clientWidth, i.contentWidth) - 10 / 2);
      else {
        let r = i.getColumnLayout(e);
        r && (n = Math.round(r.dx - 10 / 2));
      }
      n != null ? ue(s, n, this._headerGroup.clientHeight) : this._hideHeaderDropIndicator();
    }
  }
  _hideHeaderDropIndicator(e) {
    let t = this._dropHeaderIndicator;
    t && (e ? (t.parentElement && t.parentElement.removeChild(t), this._dropHeaderIndicator = null) : t.setAttribute("hidden", "hidden"));
  }
  _startColumnDragDrop(e) {
    let t = e.detail, i = t.column, s = this._headerGroup, n = s._createRenderer(i), r = n.htmlElement, l = new Be("renderer"), h = s.getHeaderLayout(i);
    return this._overlayGroup.appendChild(l.root), l.setSize(h.width, h.height), l.updateLayout(0, 0, h.width, h.height, h.width, h.height), l.begin(), r && (l.addOverlayElement(r), T(r, "header-cell"), T(r, "header-cell-dragging"), B(r, h.width, h.height)), n.prepare && n.prepare(this, {
      renderer: n,
      item: i,
      column: i,
      label: i.headerText
    }), l.end(), {
      dragElement: l,
      renderer: n,
      column: i,
      columnPoint: new A(h.dx, h.dy),
      clientPoint: new A(t.trigger.clientX, t.trigger.clientY)
    };
  }
  _updateColumnDragDrop(e) {
    let t = e.detail, i = t.trigger, s = t.column, n = this.dataGroup, r = this._dragColumnInfo, l = r.columnPoint.x + i.clientX - r.clientPoint.x;
    ue(r.dragElement, l, r.columnPoint.y);
    let h = n._mouseEventToContent(i), a = Math.min(n.getColumnIndexByDistance(h.x), this.normalizedColumns.length - 1), d = n.getColumnAt(a), c = n.getColumnWidth(a) / 2 < h.x - n.getColumnX(a), u = a;
    return c && (a >= this.normalizedColumns.length - 1 ? u = this.normalizedColumns.length : u = this.getNextVisibleColumnIndex(a)), Ws(s, d, c) || (u = -1), u >= 0 ? this._showHeaderDropIndicator(u) : this._hideHeaderDropIndicator(), u >= 0 ? {
      overLeafColumn: d,
      moveIndex: u,
      isNext: c
    } : null;
  }
  _cancelColumnDragDrop() {
    this._destroyColumnDragDrop(), this._dragCanceled = !0;
  }
  _destroyColumnDragDrop() {
    this._dragColumnInfo = null, this._dropColumnInfo = null, this._dragCanceled = !1, this._hideHeaderDropIndicator(!0), this._hideOverlay(), this._stopDragScrolling();
  }
  _dispatchSortEvent(e, t, i) {
    return this.dispatchEvent(new CustomEvent(e, {
      detail: {
        column: t,
        trigger: i
      }
    }));
  }
  _redispatch(e) {
    !this.dispatchEvent(new CustomEvent(e.type, {
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      detail: e.detail
    })) && e.preventDefault();
  }
  //-------------------------------------------------
  //
  //   Event Handler
  //
  //-------------------------------------------------
  _onResize(e) {
    (this.root.offsetWidth !== this._oldWidth || this.root.offsetHeight !== this._oldHeight) && this.doLayout();
  }
  _onHeaderEvents(e) {
    const t = e.detail.column, i = e.detail.trigger;
    switch (e.type) {
      case "header-drag":
        if (this.draggableColumns && t.draggable && !this._dragCanceled)
          if (this._showOverlay(), this._stopDragScrolling(), !this._dragColumnInfo)
            this._dragColumnInfo = this._startColumnDragDrop(e), this._dropColumnInfo = this._updateColumnDragDrop(e);
          else {
            const s = this.dataGroup._mouseEventToContent(i), n = this._calculateDragScrollDelta(s);
            n.y = 0, this._dropColumnInfo = this._updateColumnDragDrop(e), this._startDragScrolling(n, () => {
              this._dropColumnInfo = this._updateColumnDragDrop(e);
            });
          }
        break;
      case "header-up":
        if (this.draggableColumns) {
          if (this._dropColumnInfo) {
            const s = this._dropColumnInfo.isNext, n = this._dragColumnInfo.column, r = n.parent, l = r ? r.children : this.columns;
            let h = null, a = this._dropColumnInfo.overLeafColumn;
            for (; a; ) {
              if (r === a.parent) {
                h = a;
                break;
              }
              a = a.parent;
            }
            if (h && h !== n) {
              let d = l.indexOf(n), c = Math.max(0, l.indexOf(h) + (s ? 1 : 0));
              d !== c && (d < c && (c -= 1), this.moveColumn(n, r, c) && (this.validateNow(), this.dispatchEvent(new CustomEvent("header-drop", {
                cancelable: !0,
                detail: {
                  column: n,
                  parent: r,
                  toParent: r,
                  toIndex: c,
                  trigger: e
                }
              }))));
            }
          }
          this._destroyColumnDragDrop();
        }
        break;
      case "header-click":
        if (!this.isHeaderDragging && this.sortableColumns && t.sortable && this.normalizedColumns.indexOf(t) >= 0 && this._dispatchSortEvent("sort-changing", t)) {
          let s = i.shiftKey || i.ctrlKey, n = this._sortColumns.indexOf(t) >= 0, r;
          s && this.multiSortable ? (r = this._sortColumns.slice(0), n || r.push(t)) : r = [t];
          let l = t.sortDescending;
          n && (t.sortDescending = !t.sortDescending), l && r.splice(r.indexOf(t), 1), this.sortByColumns(r), this._dispatchSortEvent("sort-change", t);
        }
        break;
    }
  }
  _onHeaderSeparatorEvents(e) {
    let t = this._headerGroup, i = e.detail.column, s = e.detail.trigger;
    if (this.resizableColumns && i.resizable)
      switch (e.type) {
        case "separator-over":
          t.style.cursor = "col-resize";
          break;
        case "separator-out":
          t.style.cursor = "";
          break;
        case "separator-down":
          this._showOverlay(), this._resizeColumn = i, this._resizeColumnWidth = this.dataGroup.getColumnWidth(i.index), this._resizeAnchorPoint = new A(s.clientX, s.clientY);
          break;
        case "separator-drag":
          this.setColumnWidth(i.index, Math.max(this._resizeColumnWidth + s.clientX - this._resizeAnchorPoint.x, i.minWidth));
          break;
        case "separator-up":
          this._hideOverlay(), this._resizeColumn = null, this._resizeColumnWidth = -1, this._resizeAnchorPoint = null;
          break;
      }
  }
  /**
   * dataGroup item-down 이벤트 핸들러
   * 아이템 드래그 및 아이템 드래그 선택 처리
   * @param event
   * @private
   */
  _onItemDown(e) {
    if (!this.selectOnDrag || !this.dataGroup.isMultipleSelectionMode)
      return;
    const t = this.dataGroup, i = e.detail.rowIndex, s = e.detail.columnIndex;
    let n = i, r = s, l = !1;
    const h = (c, u) => {
      (n !== c || r !== u) && (t.updateSelection(c, u, !0), n = c, r = u);
    };
    let a;
    const d = (c) => {
      const { rowIndex: u, columnIndex: m, trigger: f } = c.detail;
      if (a = f, !l)
        this.dispatchEvent(new CustomEvent("selection-drag-start", {
          cancelable: !0,
          detail: {
            cell: new b(i, s),
            trigger: c
          }
        })), l = !0;
      else {
        const p = t._mouseEventToContent(a), g = this._calculateDragScrollDelta(p);
        g && g.length > 0 ? this._startDragScrolling(g, () => {
          const C = t._mouseEventToContent(a), y = t.getRowIndexByDistance(C.y), E = t.getColumnIndexByDistance(C.x);
          h(y, E);
        }) : this._stopDragScrolling();
      }
      h(u, m), c.type === "item-up" && (this._stopDragScrolling(), t.removeEventListener("item-drag", d), t.removeEventListener("item-up", d), this.dispatchEvent(new CustomEvent("selection-drag-end", {
        cancelable: !0,
        detail: {
          cell: new b(i, s, u, m),
          trigger: c
        }
      })));
    };
    t.addEventListener("item-drag", d), t.addEventListener("item-up", d);
  }
  _onKeyDown(e) {
    if (!(e.defaultPrevented || this.isEditing())) {
      if (e.keyCode === 27 && this.isHeaderDragging) {
        this._cancelColumnDragDrop();
        return;
      }
      if (e.ctrlKey && this.selectedCell)
        switch (e.keyCode) {
          case 67:
            const t = this.dataGroup.getSingleCell();
            t && Ci(wi(this, t));
            return;
          case 86:
            this.editable && this.pasteFromClipboard && !pi(e.target) && yi().then((i) => {
              const s = vi(i), n = s.length, r = this.normalizedColumns, l = this.collection, h = this.caretRowIndex, a = this.caretColumnIndex;
              for (let d = 0; d < n; d++) {
                let c = d + h, u = a, m = s[d];
                for (let f = 0, p = m.length; f < p && u >= 0; f++) {
                  let g = r[u];
                  g.editable && l.setValue(c, g.dataFieldPath, m[f]), u = this.getNextVisibleColumnIndex(u);
                }
              }
              this.invalidate();
            });
            return;
        }
      this.collection && this.collection.length > 0 && this._adjustCellNavigation(e);
    }
  }
  static create(e, t) {
    return new this().mount(e, t);
  }
}
Ke.withDom('<div class="tachyon-grid" tabindex="-1"></div>').withBehavior(bt, Ts);
const Ne = ["node-change"];
class Us extends Ue {
  constructor(e) {
    super(e), this._boundTreeNodeListener = this._onTreeNodeChange.bind(this), this._crossDimension = [], this._maxNodeLevel = [], this._treeColumns = [], this._autoExpandLevel = 0;
  }
  get autoExpandLevel() {
    return this._autoExpandLevel;
  }
  set autoExpandLevel(e) {
    this._autoExpandLevel = e;
  }
  get collection() {
    return super.collection;
  }
  set collection(e) {
    this.collection && Ne.forEach(
      (t) => this.collection.removeEventListener(
        t,
        this._boundTreeNodeListener
      )
    ), super.collection = e, this.collection && Ne.forEach(
      (t) => this.collection.addEventListener(
        t,
        this._boundTreeNodeListener
      )
    );
  }
  _itemToTemplate(e, t, i) {
    if (i.isCrossed)
      return Dt;
    const s = super._itemToTemplate(e, t, i);
    return t instanceof te && !t.boxMode && s === Se ? Ti : s;
  }
  _setupCell(e, t, i, s) {
    return e = super._setupCell(e, t, i, s), i instanceof te && (e.hasChildren = this.collection.hasChildren(t), e.level = this.collection.getNodeLevel(t), e.isOpened = this.collection.isOpenNode(t), e.isLeaf = !this.hasChildren), e;
  }
  /**
   * 교차셀 표현하기 위한  컬럼 생성
   * @private
   */
  _resetCrossCells() {
    if (!this.collection || !this.columnCollection)
      return;
    const e = this._treeColumns = this.columnCollection.find((t) => t instanceof te && t.boxMode);
    this._maxNodeLevel = 0, e.length > 0 && (this._maxNodeLevel = this.collection.getNodeDepth(null) - 1), this._crossDimension = [], e.forEach((t) => {
      this._createChildColumns(t, this._maxNodeLevel);
    });
  }
  /**
   * 크로스 셀 생성(행기준으로 )
   * @param maxLevel
   * @param column
   * @param item
   * @param columnIndex
   * @param itemIndex
   * @returns {CrossCellPosition}
   * @private
   */
  _createCrossCellPosition(e, t, i, s, n) {
    const r = this.collection.getNodeLevel(i), l = s + r, h = s + e, a = this.collection.getDisplayableChildren(i), d = new We(n, l, n, h);
    return a.length > 0 && (d.crossCellPositions = [new b(n, l, n + a.length, l, !0)]), d;
  }
  _createChildColumns(e, t) {
    const i = this.grid.columnCollection, s = i.getChildren(e), n = e.width;
    if (!e.boxMode)
      i.removeNodes(e, s);
    else {
      const r = s.slice(t + 1);
      r.length > 0 && i.removeNodes(e, r);
      const l = e.indent, h = [];
      for (let a = 0; a <= t; a++) {
        let d = s[a];
        d || (d = new is(e), d.minWidth = l, h.push(d)), a === t ? d.width = n ? Math.max(n - l * t, l) : void 0 : d.width = l;
      }
      h.length > 0 && i.addNodes(e, h);
    }
  }
  /**
   * 해당 items 기준으로 크로스 셀 추가
   * @param index
   * @param items
   * @private
   */
  _addCrossCells(e, t) {
    if (!this._treeColumns.length)
      return;
    const i = t.length, s = this.normalizedColumns, n = {};
    this._crossDimension.length > 0 && Array.prototype.splice.apply(this._crossDimension, [e, 0].concat(new Array(i)));
    const r = (h) => {
      h.crossCellPositions.forEach((a) => {
        e >= a.rowIndex && e < a.endRowIndex ? a.height += i : e < a.rowIndex && (a.y += i);
      });
    };
    this._crossDimension.forEach((h) => h && h.forEach(r));
    const l = (h) => {
      const a = this.collection.get(h);
      for (let d in this._treeColumns) {
        const c = this._treeColumns[d];
        let u = n[d];
        u === void 0 && (u = n[d] = s.indexOf(c.children[0]));
        const m = this._createCrossCellPosition(this._maxNodeLevel, c, a, u, h);
        this.addMergeCellPosition(m);
        let f = this._crossDimension[h];
        f || (f = this._crossDimension[h] = []), f[u] = m;
      }
    };
    this.collection.getAncestorNodes(t[0]).forEach((h) => l(this.collection.indexOf(h))), t.forEach((h, a) => l(e + a));
  }
  /**
   * 크로셀 삭제
   * @param index
   * @param items
   * @private
   */
  _removeCrossCells(e, t) {
    const i = t.length;
    this._crossDimension.splice(e, i);
    const s = (n) => {
      n.crossCellPositions = n.crossCellPositions.filter((r) => e >= r.rowIndex && e <= r.endRowIndex ? (r.height -= Math.min(i, r.endRowIndex - e + 1), r.height > 0) : (e < r.rowIndex && (r.y -= i), !0));
    };
    this._crossDimension.forEach((n) => n.forEach(s));
  }
  _onColumnCollectionChange(e) {
    const t = e.detail.kind, i = t === "reset" || t === "refresh";
    this.collection && i ? (this._resetCrossCells(), super._onColumnCollectionChange(e), this._addCrossCells(0, this.collection.toArray())) : super._onColumnCollectionChange(e);
  }
  _onCollectionChange(e) {
    if (this._isBlockCollectionChange)
      return;
    const t = this.collection, i = e.detail, s = i.kind;
    switch (s === "reset" && this.autoExpandLevel > 0 && (this._isBlockCollectionChange = !0, t.openNodes(t.find((n) => t.getNodeLevel(n) < this.autoExpandLevel)), this._isBlockCollectionChange = !1), super._onCollectionChange(e, !1), s) {
      case "reset":
      case "refresh":
        this._resetCrossCells(), this._addCrossCells(0, this.collection.toArray());
        break;
      case "add":
        this._addCrossCells(i.index, i.items);
        break;
      case "remove":
        this._removeCrossCells(i.index, i.items);
        break;
    }
    this.dispatchEvent(new CustomEvent(e.type, {
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      detail: e.detail
    }));
  }
  /**
   * @param event
   * @private
   */
  _onTreeNodeChange(e) {
    const { type: t, cancelable: i, detail: s } = e, n = new CustomEvent(t, {
      cancelable: i,
      detail: s
    });
    switch (this.dispatchEvent(n), n.defaultPrevented && e.preventDefault(), s.kind) {
      case "expand":
      case "collapse":
      case "add":
      case "remove":
      case "move":
        this.invalidate();
        break;
    }
  }
}
class js extends Ke {
  constructor() {
    super(), this._childrenField = "children";
    const e = (t) => this._redispatch(t);
    Ne.forEach((t) => this.dataGroup.addEventListener(t, e));
  }
  get childrenField() {
    return this._childrenField;
  }
  set childrenField(e) {
    this._childrenField !== e && (this._childrenField = e, this.collection && (this.collection.childrenField = e));
  }
  get autoExpandLevel() {
    return this.dataGroup.autoExpandLevel;
  }
  set autoExpandLevel(e) {
    this.dataGroup.autoExpandLevel = e;
  }
  createDataGroup() {
    return new Us(this);
  }
  createCollection(e) {
    const t = new Ot(e);
    return t.childrenField = this.childrenField, t;
  }
  /**
   * 지정된 노드의 부모 노드를 반환합니다.
   */
  getParentNode(e) {
    return this.collection && this.collection.getParentNode(e);
  }
  /**
   * 지정된 노드의 자식노드들을 반환합니다.
   * @param node 부모 노드입니다.
   */
  getChildren(e) {
    return this.collection && this.collection.getChildren(e);
  }
  getDisplayableChildren(e) {
    return this.collection && this.collection.getDisplayableChildren(e);
  }
  /**
   * 해당 노드에 자식이 있는지 여부입니다.
   */
  hasChildren(e) {
    return this.collection && this.collection.hasChildren(e);
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param node 추가할 자식 노드
   *
   */
  addNode(e, t) {
    return this.collection && this.collection.addNode(e, t);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param node 추가할 자식 노드.
   * @param index 자식 노드 삽입 위치의 인덱스.
   */
  addNodeAt(e, t, i) {
    return this.collection && this.collection.addNodeAt(e, t, i);
  }
  /**
   * 부모 노드에 자식 노드를 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드
   * @param nodes 추가할 자식 노드 목록
   *
   */
  addNodes(e, t) {
    return this.collection && this.collection.addNodes(e, t);
  }
  /**
   * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
   * 부모 노드가 null이면 최상위 목록에 추가합니다.
   * @param parent 부모 노드.
   * @param nodes 추가할 자식 노드 목록
   * @param index 자식 노드 삽입 위치의 인덱스.
   */
  addNodesAt(e, t, i) {
    return this.collection && this.collection.addNodesAt(e, t, i);
  }
  /**
   * 부모 노드에서 자식 노드를 삭제합니다.
   * @param parent 부모 노드입니다.
   * @param node 삭제할 자식 노드 입니다.
   */
  removeNode(e, t) {
    return this.collection && this.collection.removeNode(e, t);
  }
  /**
   * 해당 node가 있는지 확인합니다.
   * @param node
   * @return 있으면 true,
   */
  contains(e) {
    return this.collection && this.collection.contains(e);
  }
  /**
   *    해당 노드가 확장되어 있는지 여부입니다.
   */
  isOpenNode(e) {
    return this.collection && this.collection.isOpenNode(e);
  }
  /**
   * 해당 노느가 출력된 노드인지 확인합니다.
   * @param node
   * @return
   */
  isDisplayableNode(e) {
    return this.collection && this.collection.isDisplayableNode(e);
  }
  /**
   * 지정된 노드를 확장합니다.
   */
  openNode(e) {
    return this.collection && this.collection.openNode(e);
  }
  /**
   * 지정된 노드를 축소합니다.
   */
  closeNode(e) {
    return this.collection && this.collection.closeNode(e);
  }
  /**
   * 노드 배열을 확장합니다.
   * @param nodes
   */
  openNodes(e) {
    return this.collection && this.collection.openNodes(e);
  }
  /**
   * 확장되어있는 노드목록을 반환합니다.
   * @returns {Array}
   */
  getOpenedNodes() {
    return this.collection && this.collection.getOpenedNodes();
  }
  /**
   * 지정된 노드의 레벨을 반환합니다.
   */
  getNodeLevel(e) {
    return this.collection && this.collection.getNodeLevel(e);
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 true를 반환하는 모든 항목이 포함된 새 배열을 만듭니다
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return true를 반환하는 항목의 배열입니다.
   */
  find(e, t, i) {
    return this.collection && this.collection.find(e, t, i);
  }
  /**
   * 전체 노드를 탐색합니다.
   * 지정된 함수(callBack)에 대해 처음으로 true를 반환하는 항목을 반환하고 탐색을 중지합니다.
   * @param callback  function callback(node, parent, children)
   * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
   * @param postOrder true 이면 후위탐색, false 이면 전위탐색
   * @return 처음으로 true를 반환하는 항목입니다.
   */
  findOne(e, t, i) {
    return this.collection && this.collection.findOne(e, t, i);
  }
  /**
   * 지정된 노드를 확장합니다.
   */
  expandNode(e) {
    return this.collection && this.collection.openNode(e);
  }
  /**
   * 지정된 노드를 축소합니다.
   */
  collapseNode(e) {
    return this.collection && this.collection.closeNode(e);
  }
  /**
   * 전체 노드를 확장합니다.
   */
  expandAll() {
    this.collection && this.collection.expandAll();
  }
  /**
   * 전체 노드를 축소합니다.
   */
  collapseAll() {
    this.collection && this.collection.collapseAll();
  }
  /**
   * 지정된 노드가 확장되어 있으면 축소하고 축소되어 있으면 확장합니다.
   */
  toggleNode(e) {
    this.isOpenNode(e) ? this.closeNode(e) : this.openNode(e);
  }
}
function In(o) {
  o && N(G, o);
}
function re(o) {
  ne().render = o;
}
const Ys = ["scrollTarget", "items"], Ks = ["items"];
function Xs(o, e, t) {
  const i = (n) => o.$emit(n.type, n), s = Object.keys(t.options).reduce(
    (n, r) => {
      const l = t.options[r];
      if (l !== void 0) {
        const h = Ys.indexOf(r) >= 0;
        n[h ? "post" : "pre"][r] = l;
      }
      return n;
    },
    { pre: {}, post: {} }
  );
  return e.setOptions(s.pre), pe(() => {
    e.mount(o.$el, s.post), t.events.forEach((n) => {
      e.addEventListener(n, i);
    });
  }), Te(() => {
    t.events.forEach((n) => {
      e.removeEventListener(n, i);
    }), e.destroy();
  }), null;
}
function ge(o, e, t, i) {
  const s = ai(e), n = Object.keys(e).filter((r) => !(i != null && i.includes(r))).map((r) => {
    const l = Ks.indexOf(r) >= 0 && e[`${r}Deep`], h = l ? { ...t || {}, deep: l } : t, a = s ? () => e[r] : e[r];
    return de(
      a,
      (d, c) => {
        var u;
        try {
          if (!(r in o))
            return;
          o[r] != d ? o[r] = d : l && "collection" in o && ((u = o.collection) == null || u.refresh());
        } catch (m) {
          console.warn(m);
        }
      },
      h
    );
  });
  return () => {
    n.forEach((r) => r());
  };
}
class $t {
  constructor(e) {
    this.wrapper = e;
  }
  get instance() {
    return this.wrapper.vnode.component.proxy;
  }
  get element() {
    return this.wrapper.vnode.el;
  }
  prepare(e, t) {
    const i = this.instance.$options.prepare;
    i == null || i.apply(this.instance, i.length === 1 ? [t] : [e, t]);
  }
  getSaveValue() {
    if (!this.instance.$options.getSaveValue) {
      console.warn('"getSaveValue" is not defined.', this.instance.$options);
      return;
    }
    return this.instance.$options.getSaveValue.apply(this.instance);
  }
  destroy() {
    ut(null, this.wrapper.container);
  }
}
function $s(o, e, t = {}) {
  const i = e.props ? ["slotName", "initState"].reduce((r, l) => (l in e.props && (r[l] = t[l]), r), {}) : {}, s = ci(e, i, { ...o.slots }), n = document.createElement("template");
  return n.className = "wrapper", o.appContext && (s.appContext = o.appContext), ut(s, n), new $t({ vnode: s, container: n });
}
function dt(o, e, t = null) {
  const i = o.$ || o;
  e.__setup && (e = U({ ...e }));
  const s = e.__setup || e.setup;
  return e.__setup = s, e.setup = (n, r) => {
    const l = ne();
    if (l.provides = i.provides, l.parent = i, s)
      return s(n, r);
  }, {
    wrapper: null,
    get htmlElement() {
      return this.wrapper.element;
    },
    created(n, r) {
      this.wrapper = $s(i, e, { slotName: t, initState: r });
    },
    prepare(n, r) {
      this.wrapper.prepare(n, r);
    },
    dispose() {
      this.wrapper.destroy();
    },
    /**
     * ItemEditor 인터페이스
     */
    getSaveValue() {
      return this.wrapper.getSaveValue();
    }
  };
}
function qs(o) {
  return !!o && (o.render instanceof Function || o.setup instanceof Function);
}
function Y(o, e, t, i) {
  return e instanceof Function ? (s, n, r) => Y(o, e(s, n, r), t, i) : t in o.slots ? dt(o, i, t) : qs(e) ? dt(o, e) : e;
}
function qt(o) {
  var t;
  const e = (t = o.type) == null ? void 0 : t.props;
  return !!(e && ["headerRenderer", "itemRenderer"].every((i) => i in e));
}
function Zt(o) {
  let e = [];
  return Array.isArray(o.children) && o.children.forEach((t) => {
    e = e.concat(Zt(t)), qt(t) && e.push(t);
  }), e;
}
function Jt(o) {
  var t, i;
  return (((i = (t = o.slots).default) == null ? void 0 : i.call(t)) || []).reduce((s, n) => (typeof n.type == "symbol" ? s = s.concat(Zt(n)) : qt(n) && s.push(n), s), []);
}
const Zs = {
  singleRow: "selectedItem",
  multipleRows: "selectedItems",
  singleCell: "selectedCell",
  multipleCells: "selectedCells"
};
function Q(o, e, t, i) {
  const s = ne(), n = Ce(o[e]), r = V(() => {
    if (!(e in o))
      return !1;
    const h = s.vnode.props;
    return !!(h && e in h && `onUpdate:${e}` in h);
  }), l = V({
    get() {
      return r.value ? o[e] : n.value;
    },
    set(h) {
      const a = $e(h);
      $e(n.value) !== a && (n.value = a, s == null || s.emit(`update:${e}`, h));
    }
  });
  return de(
    l,
    (h) => {
      if (h === void 0)
        return;
      const a = () => {
        t[i] != h && (t[i] = h);
      };
      s.isMounted ? a() : pe(a);
    },
    { immediate: !0, flush: "post" }
  ), t.addEventListener("selection-change", (h) => {
    l.value = t[i];
  }), l;
}
function Js(o, e) {
  const { selectionMode: t } = o, i = Zs[t];
  Q(o, "modelValue", e, i), t === "singleRow" || t === "multipleRows" ? (Q(o, "selectedItem", e, "selectedItem"), Q(o, "selectedItems", e, "selectedItems")) : (Q(o, "selectedCell", e, "selectedCell"), Q(o, "selectedCells", e, "selectedCells"));
}
function Qs(o, e = 100, t = null) {
  let i = null;
  const s = function(...n) {
    i && clearTimeout(i), i = setTimeout(function() {
      o.apply(t, n);
    }, e);
  };
  return s.cancel = () => {
    clearTimeout(i);
  }, s;
}
function en(o) {
  const e = [], t = Ce(e);
  return re(() => {
    var s;
    const i = W("template", Jt(o));
    return ((s = i.children) == null ? void 0 : s.length) > 0 && mt().then(() => {
      t.value = i.children || e;
    }), i;
  }), V(
    () => t.value.map((i) => {
      var s;
      return (s = i.component) != null && s.proxy ? i.component.proxy.$column : (console.warn("columns is wrong!!!"), null);
    })
  );
}
function Qt(o, e) {
  return o === e || o == null && e == null || o instanceof Date && e instanceof Date && o.getTime() === e.getTime();
}
function ei(o, e, t = !1, i = Qt) {
  if (i(o, e))
    return !0;
  if (typeof o != "object" || o == null || typeof e != "object" || e == null)
    return !1;
  const s = Object.keys(o), n = Object.keys(e);
  return s.length !== n.length ? !1 : s.every((r) => r in e && t ? ei(o[r], e[r], t, i) : i(o[r], e[r]));
}
function tn(o, e, t = Qt) {
  return ei(o, e, !1, t);
}
const ti = U({
  name: "TachyonGridItemEditor",
  props: {
    slotName: {
      type: String
    },
    initState: {
      type: Object
    }
  },
  setup(o, e) {
    const t = ye(ve), i = He(o.initState), s = Ce(i.value.value), n = (h) => {
      s.value = h, t.grid.endEdit();
    }, r = (h) => {
      var a;
      s.value = h, (a = t.grid.collection) == null || a.setItemValue(i.value.item, i.value.column.dataField, h);
    };
    re(() => {
      const h = e.slots[o.slotName];
      return W(h({ ...i.value, hookSetValue: r, hookEditEnd: n })[0]);
    });
    function l() {
      Ge(i);
    }
    return {
      state: i,
      lazySaveValue: s,
      triggerState: l
    };
  },
  prepare(o) {
    this.state = o, this.triggerState();
  },
  getSaveValue() {
    return this.lazySaveValue;
  }
}), ve = Symbol.for("GridColumnInstance"), ii = {
  /**
   * 셀에 표시될 텍스트를 결정하는 필드를 정의합니다.
   */
  dataField: {
    type: String
  },
  /**
   * 셀에 표시될 텍스트를 결정하는 콜백 함수입니다.
   * 기본적으로 컬럼의 셀의 텍스트는 `dataField`와 일치하는 아이템 객체의 프로퍼티 값으로 설정됩니다.
   * `labelFunction` 사용시 사용자가 지정한 값으로 설정할 수 있습니다.
   * ```typescript
   * labelFunction (item : object, column : DataGridColumn) : string{
   *      return item[column.dataField] + '%';
   * }
   * ```
   */
  labelFunction: {
    type: Function
  },
  /**
   * 컬럼 헤더의 텍스트입니다. 지정되지 않을시 'dataField' 속성을 사용합니다.
   */
  headerText: {
    type: String
  },
  /**
   * 컬럼의 너비입니다. 지정되지 않을시 그리드 내부에서 자동으로 조절합니다.
   */
  width: {
    type: Number
  },
  /**
   * 컬럼의 최소 너비입니다.
   */
  minWidth: {
    type: Number,
    default: 10
  },
  /**
   * 컬럼의 표시 여부입니다.
   */
  visible: {
    type: Boolean,
    default: !0
  },
  /**
   * 해당 컬럼 영역 셀을 편집할 수 있는지 여부입니다.
   */
  editable: {
    type: Boolean,
    default: !0
  },
  /**
   * 컬럼의 크기 변경 사용여부입니다.
   */
  resizable: {
    type: Boolean,
    default: !0
  },
  /**
   * 컬럼 정렬 사용 여부입니다.
   */
  sortable: {
    type: Boolean,
    default: !0
  },
  /**
   * 컬럼을 드래그하여 이동하여 순서 변경가능 여부입니다.
   */
  draggable: {
    type: Boolean,
    default: !0
  },
  /**
   * 정렬이 오름차순인지 아니면 내림차순 인지를 나타냅니다.
   */
  sortDescending: {
    type: Boolean,
    default: !1
  },
  /**
   * 컬럼의 정렬 형태(문자열, 숫자, 콜백함수)를 정의합니다.
   */
  sortCompare: {
    type: Function
  },
  /**
   * 포멧된 데이타가 아닌 원본 데이타기준으로 정렬 여부입니다.
   */
  isSortOriginal: {
    type: Boolean,
    default: !1
  },
  /**
   * 표시 텍스트가 영역을 벗어난 경우 줄바꿈 여부입니다.
   */
  wordWrap: {
    type: Boolean,
    default: !1
  },
  /**
   * 그리드 병합모드 사용시 행병합 여부입니다.
   */
  isRowMerge: {
    type: Boolean,
    default: !1
  },
  /**
   * 그리드 병합모드 사용시 컬럼병합 여부입니다.
   */
  isColumnMerge: {
    type: Boolean,
    default: !1
  },
  /**
   * 그리드 병합모드 사용시 해당 컬럼의 행 병합크기를 다른 컬럼의 행 크기를 종속하게 합니다.
   */
  mergeDependColumns: {
    type: Array
  },
  /**
   * 해당 컬럼 영역의 스타일을 정의합니다.
   */
  styles: {
    type: Object
  },
  /**
   * 식 컬럼 헤더를 보이거나 숨깁니다.
   */
  collapse: {
    type: Boolean,
    default: !1
  },
  /* open: {
      type: Boolean as PropType<boolean>,
      default: true
  },*/
  /**
   * 이 컬럼의 셀에 라벨에 포멧를 정의합니다.
   * 포멧의 정의 tachyon.formatter.add 사용합니다.
   */
  format: {
    type: Object
  },
  /**
   * 해당 컬럼의 필터를 정의합니다.
   */
  filter: {
    type: Object
  },
  /**
   * 헤더영역을 구성하는 헤더 렌더러입니다.
   */
  headerRenderer: {
    type: [Object, Function]
  },
  /**
   * 데이타영역을 구성하는 셀 렌더러입니다
   */
  itemRenderer: {
    type: [Object, Function]
  },
  /**
   * 데이타편집을 구성하는 셀 렌더러입니다
   */
  itemEditor: {
    type: [Object, Function]
  }
};
function si(o, e, t) {
  const i = ne(), s = ye(ni), n = {
    headerRenderer: V(() => Y(i, o.headerRenderer, "headerRenderer", _e)),
    itemRenderer: V(() => Y(i, o.itemRenderer, "itemRenderer", _e)),
    itemEditor: V(() => Y(i, o.itemEditor, "itemEditor", ti))
  };
  ge(t, o, { immediate: !0 }, Object.keys(n)), ge(t, n, { immediate: !0 }), i.proxy.$column = t;
  const r = en(e);
  return de(
    r,
    (l) => {
      tn(t.children, l) || (t.children = l);
    },
    { flush: "post" }
  ), de(
    () => o.collapse,
    (l) => {
      t.open = !l;
    },
    { immediate: !0 }
  ), ft(ve, {
    grid: s.grid,
    column: t
  }), pe(() => {
    mt().then(() => {
      var h;
      s.updateColumns();
      const l = i.proxy.$el;
      (h = l == null ? void 0 : l.parentElement) == null || h.removeChild(l);
    });
  }), Te(() => {
    s.updateColumns();
  }), {
    nativeInstance: t
  };
}
const sn = U({
  name: "TachyonColumn",
  props: {
    ...ii
  },
  setup(o, e) {
    return si(o, e, new F());
  }
}), nn = sn, _e = U({
  name: "TachyonGridItemRenderer",
  props: {
    slotName: {
      type: String
    },
    initState: {
      type: Object
    }
  },
  setup(o, e) {
    const t = ye(ve), i = He(o.initState), s = (r) => {
      var l;
      (l = t.grid.collection) == null || l.setItemValue(i.value.item, i.value.column.dataField, r);
    };
    re(() => {
      const r = e.slots[o.slotName];
      return W(r({ ...i.value, hookSetValue: s })[0]);
    });
    function n() {
      Ge(i);
    }
    return {
      state: i,
      triggerState: n
    };
  },
  prepare(o) {
    this.state = o, this.triggerState();
  }
}), ni = Symbol.for("DataGridInstance"), Xe = [
  "header-double-click",
  "header-down",
  "header-up",
  "header-click",
  "header-drag",
  "header-out",
  "header-over",
  "separator-over",
  "separator-out",
  "separator-down",
  "separator-drag",
  "separator-up",
  "separator-click",
  "separator-double-click",
  "item-over",
  "item-out",
  "item-down",
  "item-up",
  "item-drag",
  "item-click",
  "item-double-click",
  "node-change",
  "collection-change",
  "column-collection-change",
  "column-node-change",
  "normalized-columns-change",
  "selection-changing",
  "selection-change",
  "item-edit-starting",
  "item-edit-start",
  "item-edit-ending",
  "item-edit-end",
  "item-edit-cancel",
  "scroll"
], oi = {
  modelValue: {
    type: [Object, Array]
  },
  /**
   * 그리드 표시되는 데이타 목록입니다.
   */
  items: {
    type: Array
  },
  /**
   * 그리드 헤더에 표시되는 컬럼목록입니다.
   */
  columns: {
    type: Array
  },
  /**
   * 헤더영역을 구성하는 헤더 렌더러입니다.
   */
  headerRenderer: {
    type: [Object, Function]
  },
  /**
   * 데이타영역을 구성하는 셀 렌더러입니다
   */
  itemRenderer: {
    type: [Object, Function]
  },
  /**
   * 데이타편집을 구성하는 셀 렌더러입니다
   */
  itemEditor: {
    type: [Object, Function]
  },
  /**
   * 셀 텍스트를 결정하는 콜백 함수입니다.
   * 기본적으로 각 셀의 텍스트는 그 셀이 속한 컬럼의 `dataField`와 일치하는 아이템 객체의 프로퍼티 값으로 설정됩니다.
   * `labelFunction` 사용시 사용자가 지정한 값으로 설정할 수 있습니다.
   * 그러나, 컬럼 자체에 `labelFunction`이 이미 정의되어 있다면, 해당 컬럼의 `labelFunction`이 우선적으로 사용되며 이 메소드는 무시됩니다.
   * ```
   * labelFunction (item : Object, column : DataGridColumn) : String{
   *      return item[column.dataField] + '%';
   * }
   * ```
   */
  labelFunction: {
    type: Function
  },
  /**
   * 그리드의 표현되는 행의 수를 설정합니다.
   */
  rowCount: {
    type: Number,
    default: -1
  },
  /**
   * 그리드의 표현되는 최대 행의 수를 설정합니다.
   */
  maxRowCount: {
    type: Number,
    default: -1
  },
  /**
   * 데이타 행의 기본 높이를 설정합니다.
   */
  rowHeight: {
    type: Number,
    default: 40
  },
  /**
   * 헤더 행의 기본 높이를 설정합니다.
   */
  headerRowHeight: {
    type: Number,
    default: 40
  },
  /**
   * 좌 기준으로 행을 고정합니다.
   * 수평스크롤에 영향을 받지 않습니다.
   */
  frozenLeft: {
    type: Number,
    default: 0
  },
  /**
   * 우 기준으로 행을 고정합니다.
   * 수평스크롤에 영향을 받지 않습니다.
   */
  frozenRight: {
    type: Number,
    default: 0
  },
  /**
   * 상단 기준으로 행을 고정합니다.
   * 수직스크롤에 영향을 받지 않습니다.
   */
  frozenTop: {
    type: Number,
    default: 0
  },
  /**
   * 하단 기준으로 행을 고정합니다.
   * 수직스크롤에 영향을 받지 않습니다.
   */
  frozenBottom: {
    type: Number,
    default: 0
  },
  /**
   * 컬럼의 정렬 사용여부입니다.
   */
  sortableColumns: {
    type: Boolean,
    default: !1
  },
  /**
   * 컬럼 멀티 정렬 사용여부입니다.
   */
  multiSortable: {
    type: Boolean,
    default: !1
  },
  /**
   * 컬럼의 크기 변경 사용여부입니다.
   */
  resizableColumns: {
    type: Boolean,
    default: !0
  },
  /**
   * 컬럼의 순서 변경 사용여부입니다.
   * 각 컬럼의 draggable 속성에 영향을 받습니다.
   */
  draggableColumns: {
    type: Boolean,
    default: !1
  },
  /**
   * 데이타 영역 셀을 편집할 수 있는지 여부입니다.
   */
  editable: {
    type: Boolean,
    default: !1
  },
  /**
   * 편집 활성화 하는 이벤트 목록입니다.
   */
  editOnEvents: {
    type: Array,
    default: ["doubleClick"]
  },
  /**
   * 그리드 스타일을 정의합니다.
   */
  styles: {
    type: Object
  },
  /**
   * 아이템 드래그시 항목 선택 여부입니다.
   */
  selectOnDrag: {
    type: Boolean,
    default: !0
  },
  /**
   * 클립 보드 붙여넣기 사용 여부입니다.
   */
  pasteFromClipboard: {
    type: Boolean,
    default: !0
  },
  /**
   * 데이타 자동 병합 사용 여부입니다.
   */
  autoMerge: {
    type: Boolean,
    default: !1
  },
  /**
   * 자동 병합시 병합영역을 체크하는 콜백형태의 함수입니다.
   */
  mergeCompare: {
    type: Function
  },
  /**
   * 아이템 선택을 정의힙니다.
   */
  selectionMode: {
    type: String,
    default: "singleRow"
  },
  /**
   * 선택된 항목를 설정합니다.
   * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 항목이 반환됩니다.
   */
  selectedItem: {
    type: Object
  },
  /**
   * 복수 선택된 항목을 설정합니다.
   * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 항목의 배열이 반환됩니다.
   */
  selectedItems: {
    type: Object
  },
  /**
   * 선택된 셀을 설정합니다.
   */
  selectedCell: {
    type: Object
  },
  /**
   * 복수로 선택된 셀을 설정합니다.
   */
  selectedCells: {
    type: Object
  },
  /**
   * 지정된 이름으로 테마를 적용합니다..
   * `theme.add` 이용해 테마를 등록 후 테마를 사용할수 있습니다.
   * ```
   * tachyon.theme.add('themeA', {
   *     css: 'themeA',
   *     canvasStyle: {
   *         backgroundColor: '#999900',
   *         rowLine: {
   *             width: 1,
   *             color: '#FF0000',
   *             dashed: []
   *         },
   *         ...
   *     }
   * })
   * ```
   */
  theme: {
    type: String
  },
  /**
   * `items` 대한 깊은 감시를 활성화합니다.
   * 이를 통해 내부 상태 변화를 감지하고, 이에 따라 네이티브 컴포넌트의 상태를 갱신합니다.
   * 성능에 영향을 줄 수 있으므로 변화 감시가 필요한 경우에만 설정하길 권장합니다.
   */
  itemsDeep: {
    type: Boolean,
    default: !1
  }
};
function ri(o) {
  return {
    focus() {
      o.focus();
    },
    scrollToCell(e, t, i) {
      o.scrollToCell(e, t, i);
    },
    invalidate() {
      o.invalidate(null);
    },
    flush() {
      o.flush();
    },
    startEdit(e, t) {
      return o.startEdit(e, t);
    },
    endEdit() {
      return o.endEdit();
    },
    cancelEdit() {
      return o.cancelEdit();
    },
    getAddon(e) {
      return o.getAddon(e);
    },
    getCollection() {
      return o.collection;
    }
  };
}
function li(o, e, t) {
  const i = ne(), s = {
    headerRenderer: V(() => Y(i, o.headerRenderer, "headerRenderer", _e)),
    itemRenderer: V(() => Y(i, o.itemRenderer, "itemRenderer", _e)),
    itemEditor: V(() => Y(i, o.itemEditor, "itemEditor", ti))
  }, n = Ce([]);
  re(() => {
    var d;
    const a = W("div", { class: "tachyon-grid-wrap" }, Jt(e));
    return ((d = a.children) == null ? void 0 : d.length) > 0 && (t.autoGenerateColumns = !1, n.value = a.children), a;
  });
  function r() {
    n.value.length > 0 && (t.columns = n.value.map((a) => a.component.proxy.$column));
  }
  const l = Qs(r, 1);
  ge(t, o, {}, Object.keys(s)), ge(t, s), Xs(i.proxy, t, {
    events: Xe,
    options: {
      ...o,
      headerRenderer: s.headerRenderer.value,
      itemRenderer: s.itemRenderer.value,
      itemEditor: s.itemEditor.value
    }
  }), Js(o, t);
  let h = !1;
  return pe(() => {
    l(), h = !0;
  }), Te(() => {
    h = !1, t.destroy();
  }), t.hookFreeElement = (a) => ((a == null ? void 0 : a.wrapper) instanceof $t && (a == null || a.wrapper.destroy()), !1), ft(ni, {
    grid: t,
    updateColumns() {
      h && l();
    }
  }), {
    nativeInstance: t
  };
}
const on = U({
  name: "TachyonGrid",
  emits: [...Xe, "update:modelValue", "update:selectedItem", "update:selectedItems", "update:selectedCell", "update:selectedCells"],
  props: {
    ...oi
  },
  setup(o, e) {
    const t = li(o, e, new Ke());
    return {
      ...t,
      ...ri(t.nativeInstance)
    };
  }
}), rn = on, Ln = Symbol.for("TreeGridInstance"), ln = {
  /**
   * 트리 구조에서 아이템의 자식 목록을 포함하는 필드의 이름을 정의합니다.
   * @default 'children'
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
}, hn = U({
  name: "TachyonTreeGrid",
  emits: [...Xe, "update:modelValue", "update:selectedItem", "update:selectedItems", "update:selectedCell", "update:selectedCells"],
  props: {
    ...oi,
    ...ln
  },
  setup(o, e) {
    const t = li(o, e, new js()), i = t.nativeInstance;
    return {
      ...t,
      ...ri(i),
      openNode(s) {
        return i.openNode(s);
      },
      closeNode(s) {
        return i.closeNode(s);
      },
      expandNode(s) {
        return i.openNode(s);
      },
      collapseNode(s) {
        return i.closeNode(s);
      },
      expandAll() {
        i.expandAll();
      },
      collapseAll() {
        i.collapseAll();
      },
      toggleNode(s) {
        i.toggleNode(s);
      }
    };
  }
}), an = hn, cn = U({
  name: "TachyonTreeGridItem",
  props: {
    slotName: {
      type: String
    },
    initState: {
      type: Object
    }
  },
  setup(o, e) {
    const { grid: t } = ye(ve), i = He(o.initState), s = e.slots[o.slotName], n = (h) => {
      t.toggleNode(h);
    }, r = (h) => {
      var a;
      (a = t.collection) == null || a.setItemValue(i.value.item, i.value.column.dataField, h);
    };
    re(() => {
      const h = [];
      if (s && i.value)
        h.push(s({ ...i.value, hookToggle: n, hookSetValue: r }));
      else {
        const a = W(
          "button",
          {
            class: ["item-toggle"],
            onMousedown: (c) => {
              c.preventDefault();
            },
            onClick: (c) => {
              c.preventDefault(), t.toggleNode(i.value.item);
            }
          },
          W("i", { class: "item-toggle-icon" })
        ), d = W("div", { class: "item-label" }, i.value.label);
        h.push(a, d);
      }
      return W(
        "div",
        {
          class: ["tachyon-tree-item", { "item--open": i.value.isOpened }]
        },
        h
      );
    });
    function l() {
      Ge(i);
    }
    return {
      state: i,
      triggerState: l
    };
  },
  prepare(o) {
    this.state = o, this.triggerState();
  }
}), dn = {
  /**
   * 레벨 별 좌측 간격입니다.
   */
  indent: {
    type: Number,
    default: 30
  },
  /**
   * 노드 모양을 '┌' 보이게 합니다.
   */
  boxMode: {
    type: Boolean,
    default: !1
  },
  itemRenderer: {
    type: [Object, Function],
    default: () => cn
  }
}, un = U({
  name: "TachyonTreeColumn",
  props: {
    ...ii,
    ...dn
  },
  setup(o, e) {
    return {
      ...si(o, e, new te())
    };
  }
}), mn = un, fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TachyonColumn: nn,
  TachyonGrid: rn,
  TachyonTreeColumn: mn,
  TachyonTreeGrid: an
}, Symbol.toStringTag, { value: "Module" })), Sn = (o) => {
  Object.entries(fn).forEach(([e, t]) => {
    o.component(e, t);
  });
};
export {
  b as CellPosition,
  Ke as DataGrid,
  ni as DataGridSymbol,
  F as GridColumn,
  ve as GridColumnSymbol,
  nn as TachyonColumn,
  rn as TachyonGrid,
  mn as TachyonTreeColumn,
  an as TachyonTreeGrid,
  js as TreeGrid,
  te as TreeGridColumn,
  Ln as TreeGridSymbol,
  xn as addon,
  In as config,
  Sn as default,
  ii as defaultColumnProps,
  dn as defaultTreeColumnProps,
  pn as formatter,
  yn as helper,
  Rn as theme
};
//# sourceMappingURL=tachyon.vue.esm.js.map
