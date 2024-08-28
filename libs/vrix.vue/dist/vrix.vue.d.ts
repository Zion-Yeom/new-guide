import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { InjectionKey } from 'vue';
import { MethodOptions } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { SlotsType } from 'vue';
import { ValuesType } from 'utility-types';

export declare type AnchorAlign = `${HAlign} ${VAlign}` | `${VAlign} ${HAlign}` | 'center' | `${number} ${number}` | 'none';

export declare type AnchorTrigger = 'click' | 'over';

/**
 * `ArrayList` 클래스는 배열 타입의 데이터를 관리하는 컬렉션 클래스입니다.
 * 데이터의 삽입, 삭제, 조회 등의 배열 연산을 수행하며, 인덱스를 통해 빠르게 데이터에 접근할 수 있습니다.
 */
export declare class ArrayList<T = any> extends IList<T, ArrayListEventMap<T>> {
    constructor(source?: Array<T>);
    /**
     * 아이템을 맨끝 위치에 추가합니다.
     * @param item
     * @returns {boolean}
     */
    add(item: T): boolean;
    /**
     * 지정된 위치에 아이템을 추가합니다.
     * @param index
     * @param item
     * @returns {boolean}
     */
    addAt(index: number, item: T): boolean;
    /**
     * 아이템 목록을 맨끝 위치부터 추가합니다.
     * @param items
     */
    addAll(items: Array<T>): boolean;
    /**
     * 아이템 목록을 지정된 위치부터 추가합니다.
     * @param index
     * @param items
     */
    addAllAt(index: number, items: Array<T>): boolean;
    /**
     * 아이템을 삭제합니다.
     * @param item
     * @returns {boolean}
     */
    remove(item: T): T;
    /**
     * 지정된 위치의 아이템을 삭제합니다.
     * @param index
     * @returns {Array | null}
     */
    removeAt(index: number): T;
    /**
     * 지정된 index 부터 length 길이만큼 데이타를 삭제합니다.
     * @param index
     * @param length
     */
    removeRange(index: number, length: number): Array<T>;
    /**
     * 아이템 목록을 삭제합니다.
     * @param {Array} items
     * @returns {boolean}
     */
    removeAll(items: Array<T>): Array<T>;
    /**
     * 지정된 위치에 아이템을 덮어씁니다.
     * @param index
     * @param item
     * @returns {boolean}
     */
    setAt(index: number, item: T): boolean;
    /**
     * 배열의 'from' 아이템을 'to' 위치에 이동합니다.
     * @param from
     * @param to
     * @returns {boolean}
     */
    move(from: number, to: number): boolean;
    protected internalReset(): void;
    /**
     * @private
     */
    private findInsertIndex;
    /**
     * @private
     */
    private dispatchArrayListEvent;
    find(callback: ListFindFn<T>): Array<T>;
    findOne(callback: ListFindFn<T>): T;
    clone(): IList<T>;
}

export declare type ArrayListEvent<T> = CustomEvent<ArrayListEventData<T>>;

export declare type ArrayListEventData<T> = ListEventData & {
    /**
     * 이벤트 종류
     * - set - 다른 아이템으로 변경
     * - add - 아이템 추가
     * - remove - 아이템 삭제
     * - move - 아이템 이동
     * - update - 아이템 특정 필드 값 변경
     * - reset - 컬렉션 소스 변경
     * - refresh - 컬렉션 필터등 재 갱신
     */
    kind: ListEventData['kind'] | 'set' | 'add' | 'remove' | 'move' | 'update';
    /**
     * 이벤트 대상 아이템 배열
     */
    items: Array<T>;
    /**
     * 이벤트 대상 아이템
     */
    item: T;
    /**
     * 이벤트 대상 아이템 인덱스 배열
     */
    indices: Array<number>;
    /**
     * 이벤트 대상 아이템 인덱스
     */
    index: number;
    /**
     * 아이템 이동전 인덱스
     */
    oldIndex?: number;
    /**
     * 아이템 삭제시 마지막인 인덱스
     */
    to?: number;
};

export declare type ArrayListEventMap<T> = {
    /**
     * 컬렉션 내부의 아이템이 변경되었을 때 발생합니다.
     * - set - 다른 아이템으로 변경
     * - add - 아이템 추가
     * - remove - 아이템 삭제
     * - move - 아이템 이동
     * - update - 아이템 특정 필드 값 변경
     * - reset - 컬렉션 소스 변경
     * - refresh - 컬렉션 필터등 재 갱신
     */
    'collection-change': ArrayListEvent<T>;
};

/**
 * `Autocomplete`는 사용자가 키입력시 관련된 추천 아이템을 제안하는 UI 컴포넌트입니다.
 * 사용자가 입력한 텍스트를 기반으로 대응하는 결과를 실시간으로 검색하고 이를 통해 입력을 완성하거나 추가 정보를 제공하는 데 도움을 줍니다.
 */
export declare class Autocomplete<T = any, EventTypes extends AutocompleteEventMap<T> = AutocompleteEventMap<T>> extends SelectableElement<T, EventTypes> {
    private static LABEL_UID;
    protected readonly selectContainer: HTMLElement;
    protected readonly floatingLabel: HTMLElement;
    protected readonly stateContainer: HTMLElement;
    protected readonly clearButton: HTMLElement;
    protected readonly debounceOpenSuggest: CancelableCallback;
    protected readonly debounceChangeInputValue: CancelableCallback;
    suggestList: SuggestList;
    suggestPopup: Popup;
    private highlightCache;
    private loadSuggestPromise;
    private loadSuggestValue;
    private lastSuggestItems;
    private lastSuggestValue;
    private lockedCount;
    private clearSwitch;
    private suggestState;
    private suggestStateElementMap;
    private _inputTemplate;
    private _inputValue;
    private _caretSuggestIndex;
    private _inputGroup;
    private _inputElement;
    private _labelField;
    private _focused;
    private _suggestSource;
    private _placeholder;
    private _label;
    /**
     * 최소 문자 입력 개수입니다. 최소 개수 만족시 제안목록이 활성화 합니다.
     */
    minChar: any;
    /**
     * 제안 목록에 표시될 아이템 개수입니다.
     */
    suggestCount: any;
    suggestDelay: any;
    suggestMinCount: any;
    /**
     * 사용자가 특정 키를 눌렀을 때 값을 입력하는 코드 배열입니다.
     * 기본 키코드는 [9, 13]으로, 이는 각각 "Tab", "Enter" 입니다.
     */
    delimiterOnKeys: any;
    suggestItemTemplate: ElementTemplate;
    suggestNodataStateTemplate: ElementTemplate;
    suggestProgressStateTemplate: ElementTemplate;
    hookRenderSuggestElement: SuggestStateHook;
    hookFreeSuggestElement: ItemStateHook<T>;
    hookSuggestItems: (items: Array<T>) => Array<any>;
    selectOnClick: any;
    /**
     * 아이템 선택시 팝업을 닫을지 여부입니다.
     */
    closeOnSelect: boolean;
    /**
     * 포커스 아웃시 팝업 닫을지 여부입니다.
     */
    closeOnFocusOut: boolean;
    /**
     * 외부영역 클릭시 팝업을 닫을지 여부입니다.
     */
    get closeOnOutsideDown(): boolean;
    set closeOnOutsideDown(value: boolean);
    constructor();
    protected get selectorFactory(): SelectorCtor<T>;
    protected get inputGroup(): HTMLElement;
    protected get inputElement(): HTMLInputElement;
    protected get suggestCollection(): IList<T>;
    get suggestItems(): Array<T>;
    get inputTemplate(): ElementTemplate;
    set inputTemplate(value: ElementTemplate);
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
    get suggestSource(): SuggestSource<T>;
    set suggestSource(value: SuggestSource<T>);
    /**
     * 제안목록이 열렸는지 닫혔는를 나타냅니다.
     */
    get isOpenedSuggest(): boolean;
    get isOpenReady(): boolean;
    /**
     * 제안목록 커서의 위치(인덱스)를 반환합니다.
     * @returns {number}
     */
    get caretSuggestIndex(): number;
    /**
     * 입력 필드에 포커스를 가지고 있는지를 나타냅니다.
     * @returns {boolean}
     */
    get focused(): boolean;
    /**
     * 입력 필드에 현재 입력된 값입니다.
     */
    get inputValue(): string;
    set inputValue(value: string);
    /**
     * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
     */
    get placeholder(): string;
    set placeholder(value: string);
    /**
     * 입력 필드의 레이블 텍스트입니다.
     */
    get label(): string;
    set label(value: string);
    /**
     * 표시될 아이템의 값이 결정되는 필드를 정의합니다.
     * 이 값이 문자열일 경우, 아이템 객체의 해당 키의 값(item[labelField])이 표시되고
     * 콜백일 경우 (item: T) => string 반환된 문자열이 값이 표시됩니다.
     */
    get labelField(): string | Callback<string>;
    set labelField(value: string | Callback<string>);
    /**
     * 입력필드에 값이 있을때 초기화 버튼 활성화 여부입니다.
     */
    get clearable(): boolean;
    set clearable(value: boolean);
    /**
     * 팝업의 좌표 시스템을 설정합니다.
     * - 'global' 팝업을 전역 좌표계에 배치합니다.
     * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
     * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
     * 기본 값은 'relative' 입니다.
     */
    get coordinateMode(): CoordinateMode;
    set coordinateMode(value: CoordinateMode);
    get selectedItem(): T;
    set selectedItem(item: T);
    protected setInputElement(element: HTMLElement): void;
    protected setInputValue(value: string): boolean;
    protected doLayout(): void;
    /**
     * 입력된 값, 표시된 제안 목록, 그리고 선택된 아이템을 초기화합니다.
     */
    clear(): void;
    clearSuggest(): void;
    /**
     * 입력 필드에 포커스를 설정합니다.
     */
    focus(): void;
    /**
     * 입력 필드에 포커스를 해제합니다.
     */
    blur(): void;
    /**
     * 아이템에 대한 'labelField' 속성의 값을 반환합니다.
     */
    itemToLabel(item: T): string;
    /**
     * 제안 목록을 엽니다. 해당 파라메터 `value` 와 `suggestSource` 속성을 이용해여 제안 목록을 가져오고 표시합니다.
     * 만약 'value' 값이 명시적으로 주어지지 않은 경우, 현재 입력 필드의 값이 사용됩니다.
     * @param {string} value
     * @returns {boolean} - 제안 목록이 성공적으로 열렸는지 여부를 나타냅니다.
     */
    openSuggest(value?: string): boolean;
    /**
     * 제안 목록를 닫습니다.
     */
    closeSuggest(): void;
    /**
     * 해당 자원을 모두 해제합니다.
     */
    destroy(): void;
    /**
     * 제안 목록 팝업 초기 설정
     * @private
     */
    private initialize;
    /**
     * 제안목록 로드
     * @param value
     */
    private loadSuggest;
    protected internalOpenSuggest(items: Array<T>): void;
    /**
     * text 중에 search 포함되어 있다면 하이라이트된 html를 반환합니다.
     * @param text
     * @param search
     * @returns {html}
     */
    protected toHighlightHtml(text: string, search: string): string;
    /**
     * @protected
     */
    protected changeInputValue(value: string): boolean;
    private hasDelimiterKey;
    protected selectSuggestItem(item: T, trigger?: SuggestTrigger): void;
    protected commitSuggestItem(trigger: SuggestTrigger): boolean;
    private commitCaretSuggestIndex;
    protected adjustNavigation(event: KeyboardEvent): void;
    private moveUp;
    private moveDown;
    /**
     * 제안 목록 상태 갱신
     * @param state
     * @private
     */
    private updateSuggestState;
    private lockFocus;
    private unlockFocus;
    protected onInputChanged(): void;
    protected onMouseDown(event: MouseEvent): void;
    private onKeyDown;
    private onInputEvent;
    /**
     * input focus event
     * @param event
     */
    private onFocusIn;
    /**
     * input blur event
     * @param event
     */
    private onFocusOut;
    private onClearButtonClick;
}

export declare type AutocompleteEventMap<T> = SelectionEventMap<T> & {
    /**
     * 제안목록에서 커서 인덱스가 변경되었을때 발생합니다.
     */
    'suggest-caret-change': CustomEvent<{
        value: number;
        oldValue: number;
    }>;
    /**
     * 제안목록이 열리기 전에 발생합니다.
     */
    'suggest-opening': SuggestEvent<T>;
    /**
     * 제안목록이 열릴때 발생합니다.
     */
    'suggest-open': SuggestEvent<T>;
    /**
     * 제안목록이 닫히기 전에 발생합니다.
     */
    'suggest-closing': SuggestEvent<T>;
    /**
     * 제안목록이 닫힐때 발생합니다.
     */
    'suggest-close': SuggestEvent<T>;
    /**
     * 제안 목록의 특정 아이템을 선택했을 때 발생합니다.
     */
    'suggest-select': SuggestEvent<T>;
    /**
     * 'value' 프로버티가 변경될때 발생합니다.
     */
    'value-change': CustomEvent<{
        value: string;
        oldValue: string;
    }>;
    /**
     * input 요소의 value 변경될때 발생합니다.
     */
    input: CustomEvent<{
        value: string;
        trigger: Event;
    }>;
    /**
     * input 요소에서 키보드를 누를때 발생합니다.
     */
    keydown: CustomEvent<{
        value: string;
        trigger: Event;
    }>;
    /**
     * input 요소에서 키보드를 땔때 발생합니다.
     */
    keyup: CustomEvent<{
        value: string;
        trigger: Event;
    }>;
    /**
     * 포커스를 받을때 발생합니다
     */
    focusin: CustomEvent<{
        trigger: Event;
    }>;
    /**
     * 포커스를 잃을때 발생합니다.
     */
    focusout: CustomEvent<{
        trigger: Event;
    }>;
};

declare type AutocompleteEvents<T = any> = SelectionEvents<T> & {
    /**
     * 제안목록에서 커서 인덱스가 변경되었을때 발생합니다.
     */
    'suggest-caret-change': (event: CustomEvent<{
        value: number;
        oldValue: number;
    }>) => void;
    /**
     * 제안목록이 열리기 전에 발생합니다.
     */
    'suggest-opening': (event: SuggestEvent<T>) => void;
    /**
     * 제안목록이 열릴때 발생합니다.
     */
    'suggest-open': (event: SuggestEvent<T>) => void;
    /**
     * 제안목록이 닫히기 전에 발생합니다.
     */
    'suggest-closing': (event: SuggestEvent<T>) => void;
    /**
     * 제안목록이 닫힐때 발생합니다.
     */
    'suggest-close': (event: SuggestEvent<T>) => void;
    /**
     * 제안 목록의 특정 아이템을 선택했을 때 발생합니다.
     */
    'suggest-select': (event: SuggestEvent<T>) => void;
    /**
     * 'value' 프로버티가 변경될때 발생합니다.
     */
    'value-change': (event: CustomEvent<{
        value: string;
        oldValue: string;
    }>) => void;
    /**
     * input 요소의 value 변경될때 발생합니다.
     */
    input: (event: CustomEvent<{
        value: string;
        trigger: InputEvent;
    }>) => void;
    /**
     * input 요소에서 키보드를 누를때 발생합니다.
     */
    keydown: (event: CustomEvent<{
        value: string;
        trigger: KeyboardEvent;
    }>) => void;
    /**
     * input 요소에서 키보드를 땔때 발생합니다.
     */
    keyup: (event: CustomEvent<{
        value: string;
        trigger: KeyboardEvent;
    }>) => void;
    /**
     * 포커스를 받을때 발생합니다
     */
    focusin: (event: CustomEvent<{
        trigger: Event;
    }>) => void;
    /**
     * 포커스를 잃을때 발생합니다.
     */
    focusout: (event: CustomEvent<{
        trigger: Event;
    }>) => void;
};

declare type AutocompleteGetters = {
    /**
     * `VxAutocomplete` 감싸고 있는 Autocomplete 인스턴스입니다.
     */
    nativeInstance: Autocomplete;
};

declare interface AutocompleteMethods extends MethodOptions {
    [key: string]: any;
    /**
     * 입력 필드에 포커스를 설정합니다.
     */
    focus(): void;
    /**
     * 입력 필드에 포커스를 해제합니다.
     */
    blur(): void;
    /**
     * 제안 목록을 엽니다. 해당 파라메터 `value` 와 `suggestSource` 속성을 이용해여 제안 목록을 가져오고 표시합니다.
     * 만약 'value' 값이 명시적으로 주어지지 않은 경우, 현재 입력 필드의 값이 사용됩니다.
     * @param {string} value
     * @returns {boolean} - 제안 목록이 성공적으로 열렸는지 여부를 나타냅니다.
     */
    openSuggest(value?: string): boolean;
    /**
     * 제안 목록을 닫습니다.
     */
    closeSuggest(): void;
    /**
     * 입력된 값, 표시된 제안 목록, 그리고 선택된 아이템을 초기화합니다.
     */
    clear(): void;
}

declare type AutocompletePropsType = typeof defaultInputProps & typeof defaultSuggestProps & typeof defaultAutocompleteProps;

declare interface AutocompleteProvider {
    readonly instance: Autocomplete;
    get inputValue(): Ref<string>;
}

declare type AutocompleteSlot = {
    /**
     * 제안 목록 슬롯
     */
    suggest?: ItemState & {
        label: string;
        text: string;
        html: string;
    };
    /**
     * 로딩 슬롯
     */
    progress?: string;
    /**
     * 데이타 없음 슬롯
     */
    nodata?: string;
};

/**
 * @hidden
 */
export declare class Base<EventTypes extends EventMap = EventMap> extends EventTargetWithType<EventTypes> {
    private _config;
    constructor();
    get config(): Config;
    static get config(): Config;
    static set config(value: Config);
}

declare type BaseCtor = Constructor<Base>;

export declare type Callback<T = void> = (...arg: any[]) => T;

export declare type CancelableCallback<T = void> = Callback<T> & {
    cancel: () => void;
};

declare class Chip<T> extends Renderer<Tokenizer<T>, T> {
    private labelElement;
    private removeElement;
    private text;
    private _selected;
    private _removable;
    private watcher;
    constructor(host: Tokenizer<T>, root: HTMLElement, data: T);
    get selected(): boolean;
    set selected(value: boolean);
    get removable(): boolean;
    set removable(value: boolean);
    created(): void;
    destroy(): void;
}

/**
 * `Combobox`는 드롭다운 목록을 표시하고 관리하는 UI 컴포넌트입니다.
 * 사용자는 텍스트를 입력하면, 일치하는 항목이 필터링되어 목록에서 선택할 수 있습니다.
 */
export declare class Combobox<T = any> extends Tokenizer<T> {
    private readonly dropdownTrigger;
    private _filterable;
    private filterFn;
    singleChipTemplate: ElementTemplate;
    constructor();
    /**
     * 표시되는 아이템의 배열입니다.
     * 'labelField' 속성을 이용하여 표시되는 텍스트를 결정합니다.
     */
    get items(): Array<T>;
    set items(items: Array<T>);
    /**
     * 사용자가 입력한 문자열에 따라 콤보박스에서 표시되는 항목을 필터링할 수 있는지 여부입니다.
     */
    get filterable(): boolean;
    set filterable(value: boolean);
    get selectedItems(): Array<T>;
    set selectedItems(items: Array<T>);
    protected doLayout(): void;
    protected updateChipFactory(): boolean;
    protected internalOpenSuggest(items: Array<T>): void;
    protected itemToKey(item: T): string | T;
    private onDropdownMouseDown;
    private onValueChange;
    private onMaxSelectionChange;
}

declare type ComboboxEvents<T = any> = TokenizerEvents<T> & {};

declare type ComboboxGetters = {
    /**
     * `VxCombobox` 감싸고 있는 Combobox 인스턴스입니다.
     */
    nativeInstance: Combobox;
};

declare interface ComboboxMethods extends TokenizerMethods {
}

declare type ComboboxPropsType = typeof defaultInputProps & typeof otherSuggestProps & typeof defaultSelectableProps & typeof defaultComboboxProps;

declare interface ComboboxProvider {
}

declare type ComboboxSlots = TokenizerSlots & {};

declare type CompareFn<T> = (a: T, b: T) => number;

export declare type Config = Record<string, any>;

export declare const Config: {
    get(ctor: BaseCtor): Config;
    set(ctor: BaseCtor, value: Config): void;
};

export declare type Constructor<T> = new (...arg: any[]) => T;

export declare type ContentTemplate = ElementTemplate | Promise<HTMLElement>;

export declare type CoordinateMode = 'global' | 'relative' | 'none';

/**
 * `DateChooser`는 일, 월, 년 등의 날짜를 선택하고 관리하는 UI 컴포넌트입니다.
 * 특정 날짜나 날짜의 범위를 선택하는 기능을 제공하며, 선택 가능한 날짜나 날짜 패턴을 사용자가 따로 지정할 수 있습니다.
 */
export declare class DateChooser<EventTypes extends DateChooserEventMap = DateChooserEventMap> extends Element_2<EventTypes> {
    private _state;
    private _type;
    private _allowDates;
    private _allowRange;
    private _patterns;
    private _headerPatterns;
    private _itemTemplate;
    private _hookRenderElement;
    private _hookFreeElement;
    private tableInstance;
    private currentTable;
    private currentTableWatcher;
    private initSetHeader;
    selectOnClick: boolean;
    headerTitleTemplate: ElementTemplate;
    headerPreviousTemplate: ElementTemplate;
    headerNextTemplate: ElementTemplate;
    constructor();
    private get headerLayer();
    private get bodyLayer();
    get formatter(): Formatter<Date>;
    /**
     * 현재 표시되는 날짜 상태('day', 'month', 'year')입니다.
     */
    get state(): DateType;
    /**
     * 'day', 'month', 'year' 표시할 지를 정의합니다.
     * 기본값은 'day' 입니다.
     */
    get type(): DateType;
    set type(value: DateType);
    /**
     * 오늘 날짜를 정의합니다.
     */
    get today(): Date;
    set today(value: Date);
    /**
     * 사용자가 날짜 범위를 선택할 수 있는지 여부입니다.
     */
    get allowRange(): boolean;
    set allowRange(value: boolean);
    /**
     * 선택 가능한 날짜를 정의합니다.
     * ```typescript
     * dateChooser.allowDates = (date: Date) => boolean {}
     * ```
     */
    get allowDates(): Callback<boolean>;
    set allowDates(value: Callback<boolean>);
    /**
     * 헤더에 표시되는 날짜의 형식입니다.
     * ```typescript
     * dateChooser.headerPatterns = {day : 'YYYY.MM', month: 'YYYY',  year:'{YYYY} ~ {YYYY}'}
     * ```
     */
    get headerPatterns(): FormatType;
    set headerPatterns(value: FormatType);
    /**
     * 표시되는 날짜의 형식입니다.
     * `DateChooser.setFormatter` 설정된 포멧터에 의해 결정됩니다.
     * ```typescript
     * dateChooser.pattern = {day : 'YYYY.MM.DD', month: 'YYYY.MM.DD',  year:'YYYY'}
     * ```
     */
    get patterns(): FormatType;
    set patterns(value: FormatType);
    /**
     * 선택된 날짜 범위를 정의합니다.
     * ```typescript
     * dateChooser.selectedRange = [new Date('2020/1/1'), new Date('2020/1/31')]
     * ```
     */
    get selectedRange(): DateRange;
    set selectedRange(range: DateRange);
    /**
     * 선택된 날짜를 정의합니다.
     * 날짜는 Date 객체로 반환납니다.
     * ```typescript
     * dateChooser.selectedDate = new Date('2020/1/1');
     * ```
     */
    get selectedDate(): Date;
    set selectedDate(date: Date);
    /**
     * 선택된 날짜를 정의합니다.
     * 문자열의 형식는 `DateChooser.setFormatter` 통해 설정된 포맷터와 'pattern' 속성에 의해 생성됩니다.
     */
    get selectedDateString(): string;
    set selectedDateString(dateString: string);
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
    get itemTemplate(): ElementTemplate;
    set itemTemplate(value: ElementTemplate);
    get hookRenderElement(): ItemStateHook<DateItem>;
    set hookRenderElement(value: ItemStateHook<DateItem>);
    get hookFreeElement(): ItemStateHook<DateItem>;
    set hookFreeElement(value: ItemStateHook<DateItem>);
    /**
     *  Date 객체를 지정된 형식의 문자열로 변환합니다.
     * `pattern` 속성과 `DateChooser.setFormatter` 통해 정의된 포맷터를 사용하여 특정 형식의 날짜 문자열로 반환합니다.
     *  포맷터나 패턴이 지정되지 않았을 경우, 기본적으로 'YYYY.MM.DD' 형식으로 변환합니다.
     */
    format(date: Date, type?: DateType): string;
    /**
     *  날짜 문자열을 Date 객체로 변환합니다.
     * `pattern` 속성과 `DateChooser.setFormatter` 통해 정의된 포맷터를 사용하여 Date 객체로 반환합니다.
     */
    parse(dateStrting: string, type?: DateType): Date;
    /**
     * 이전 날짜로 이동합니다.
     */
    previous(): void;
    /**
     * 다음 날짜로 이동합니다.
     */
    next(): void;
    /**
     * 현재 표시된 해당 날짜를 반환합니다.
     */
    getCurrentDate(): Date;
    /**
     * 해당 날짜로 이동합니다.
     * @param date
     */
    setCurrentDate(date: Date): void;
    /**
     * 선택된 날짜를 삭제합니다.
     */
    clear(): void;
    /**
     * 선택된 날짜로 이동하거나, 선택된 날짜가 없는 경우 오늘의 날짜로 이동합니다.
     */
    reset(): void;
    /**
     * '일', '월', '년' 대한 상태를 설정합니다.
     */
    protected setState(value: DateType): void;
    /**
     * @private
     */
    private setHeader;
    /**
     * @private
     */
    private updateHeaderTitle;
    /**
     * 상위 형태로 변경(일 -> 월 -> 년)
     * @private
     */
    private upperStep;
    /**
     * 하위 형태로 변경(년 -> 월 -> 일)
     * @param date
     * @private
     */
    private lowerStep;
    private setCurrentTable;
    protected doLayout(): void;
    protected getTable(state: DateType): DateTable;
    destroy(): void;
    private convertSelectionEventDataToDate;
    private onDateTableCurrentChange;
    private onDateTableItemDown;
    private onDateTableItemClick;
    private onDateTableSelectionChanging;
    private onDateTableSelectionChange;
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
    static setFormatter(base: FormatterBase<Date>): void;
}

export declare type DateChooserEventMap = SelectionEventMap<Date> & {
    /**
     * 달력의 상태가 변경될 때마다 발생합니다.
     */
    'state-change': CustomEvent<{
        value: DateType;
        oldValue: DateType;
    }>;
    /**
     * 아이템에 마우스 다운했을때 발생합니다.
     */
    'item-down': ItemEvent<DateItem>;
    /**
     * 아이템에 마우스 클릭 했을때 발생합니다.
     */
    'item-click': ItemEvent<DateItem>;
};

declare type DateChooserEvents = SelectionEvents<Date> & {
    /**
     * 달력의 상태가 변경될 때마다 발생합니다.
     */
    'state-change': (event: CustomEvent<{
        value: DateType;
        oldValue: DateType;
    }>) => void;
    /**
     * 아이템에 마우스 다운했을때 발생합니다.
     */
    'item-down': (event: ItemEvent<DateItem>) => void;
    /**
     * 아이템에 마우스 클릭 했을때 발생합니다.
     */
    'item-click': (event: ItemEvent<DateItem>) => void;
};

declare type DateChooserGetters = {
    /**
     * `VxDateChooser` 감싸고 있는 DateChooser 인스턴스입니다.
     */
    nativeInstance: DateChooser;
};

declare interface DateChooserMethods extends MethodOptions {
    [key: string]: any;
    /**
     * 선택된 날짜를 삭제합니다.
     */
    clear(): void;
    /**
     * 선택된 날짜로 이동하거나, 선택된 날짜가 없는 경우 오늘의 날짜로 이동합니다.
     */
    reset(): void;
    /**
     * 화면에 출력된 날짜 목록을 해당 날짜로 이동합니다.
     * @param date
     */
    setCurrentDate(date: Date): void;
    /**
     * 현재 표시되는 날짜 상태('day', 'month', 'year')입니다.
     */
    getState(): DateType;
}

declare type DateChooserPropsType = ExtractPropTypes<{}> & typeof defaultDateChooserProps;

declare interface DateChooserProvider {
}

declare type DateChooserSlot = {
    /**
     * DateChooser 기본 슬롯
     */
    default?: DateItemState;
};

declare type DateDimension = typeof DateDimensions.DAY | typeof DateDimensions.MONTH | typeof DateDimensions.YEAR;

declare const DateDimensions: {
    YEAR: {
        x: number;
        y: number;
    };
    MONTH: {
        x: number;
        y: number;
    };
    DAY: {
        x: number;
        y: number;
    };
};

export declare type DateItem = {
    source: Date;
    value: number;
    fullValue: number;
    groupKey: number;
};

/**
 * 'DateChooser' 컴포넌트의 각각의 아이템의 상태를 나타냅니다.
 */
export declare type DateItemState = ItemState<DateItem> & {
    /**
     * 해당 아이템이 오늘 날짜인지를 나타냅니다.
     */
    isToday: boolean;
    /**
     * 해당 아이템이 현재 월이 아닌 이전 또는 다음달 아이템인지를 나타냅니다.
     */
    extra: boolean;
    /**
     * 해당 아이템이 disabled 인지를 나타냅니다.
     */
    disabled: boolean;
};

/**
 * `DatePicker`는 사용자에게 드롭다운 형태로 `DateChooser` 컴포넌트를 활성화한 후 날짜를 선택하고, 선택된 날짜를 표시하는 UI 컴포넌트입니다.
 * 일반적으로 사용자가 특정 날짜를 선택하고 확인할 수 있도록 돕는 폼 또는 대화 상자에 사용되고 선택한 날짜는 정의된 포맷으로 표시되며, 포멧은 `DateChooser.setFormatter` 이용하여 설정할 수 있습니다.
 */
export declare class DatePicker<EventTypes extends DatePickerEventMap = DatePickerEventMap> extends Element_2<EventTypes> {
    private _dateChooser;
    private _popup;
    private _label;
    private _placeholder;
    private _titlePatterns;
    private clearSwitch;
    /**
     * 아이템 선택시 팝업을 닫을지 여부입니다.
     */
    closeOnSelect: boolean;
    constructor();
    /**
     * 날짜선택 인스턴스입니다.
     */
    get dateChooser(): DateChooser;
    /**
     * 팝업 인스턴스입니다.
     */
    get popup(): Popup;
    private get dropdownTrigger();
    private get floatingLabel();
    private get selectLabel();
    private get clearButton();
    private get placeholderLabel();
    /**
     * `DateChooser` 열렸는지 닫혔는를 나타냅니다.
     */
    get isOpened(): boolean;
    get label(): string;
    set label(value: string);
    /**
     * 년, 월, 일 날짜 타입을 지정합니다
     */
    get type(): DateType;
    set type(value: DateType);
    /**
     * 캘린더 헤더에 표시되는 날짜의 형식입니다.
     * ```typescript
     * datePicker.headerPatterns = {day : 'YYYY.MM', month: 'YYYY',  year:'{YYYY} ~ {YYYY}'}
     * ```
     */
    get headerPatterns(): FormatType;
    set headerPatterns(value: FormatType);
    /**
     * 타이틀에 표시되는 날짜의 형식입니다.
     * ```typescript
     * datePicker.titlePatterns = {day : 'YYYY.MM.DD', month: 'YYYY.MM',  year:'YYYY'}
     * ```
     */
    get titlePatterns(): FormatType;
    set titlePatterns(value: FormatType);
    /**
     * 선택된 날짜의 표시되는 날짜의 형식입니다.
     * ```typescript
     * datePicker.patterns = {day : 'YYYY.MM.DD', month: 'YYYY.MM',  year:'YYYY'}
     * ```
     */
    get patterns(): FormatType;
    set patterns(value: FormatType);
    /**
     * 기간 선택입력 여부입니다. 'true' 인 경우 시작일과 종료일을 선택 할 수 있습니다.
     */
    get allowRange(): boolean;
    set allowRange(value: boolean);
    /**
     * 선택 가능한 날짜를 정의합니다.
     * ```typescript
     * datePicker.allowDates = (date: Date) => boolean {}
     * ```
     */
    get allowDates(): Callback<boolean>;
    set allowDates(value: Callback<boolean>);
    /**
     * 범위 날짜를 선택합니다.
     * ```typescript
     * datePicker.selectedRange = [new Date('2020/1/1'), new Date('2020/1/31')]
     * ```
     */
    get selectedRange(): DateRange;
    set selectedRange(range: DateRange);
    /**
     * 단일 날짜를 선택합니다.
     * ```typescript
     * datePicker.selectedDate = new Date('2020/1/1')
     * ```
     */
    get selectedDate(): Date;
    set selectedDate(date: Date);
    /**
     * 선택된 날짜를 정의합니다.
     * 문자열의 형식는 `DateChooser.setFormatter` 통해 설정된 포맷터와 'pattern' 속성에 의해 생성됩니다.
     */
    get selectedDateString(): string;
    set selectedDateString(date: string);
    /**
     * 초기화 버튼을 활성화 여부입니다.
     */
    get clearable(): boolean;
    set clearable(value: boolean);
    /**
     * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
     */
    get placeholder(): string;
    set placeholder(value: string);
    /**
     * 외부영역 클릭시 팝업을 닫을지 여부입니다.
     */
    get closeOnOutsideDown(): boolean;
    set closeOnOutsideDown(value: boolean);
    /**
     * 팝업의 좌표 시스템을 설정합니다.
     * - 'global' 팝업을 전역 좌표계에 배치합니다.
     * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
     * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
     * 기본 값은 'relative' 입니다.
     */
    get coordinateMode(): CoordinateMode;
    set coordinateMode(value: CoordinateMode);
    get dateChooserItemTemplate(): ElementTemplate;
    set dateChooserItemTemplate(value: ElementTemplate);
    get dateChooserHookRenderElement(): ItemStateHook<DateItem>;
    set dateChooserHookRenderElement(value: ItemStateHook<DateItem>);
    get dateChooserHookFreeElement(): ItemStateHook<DateItem>;
    set dateChooserHookFreeElement(value: ItemStateHook<DateItem>);
    /**
     * 날짜선택 팝업 초기 설정
     * @private
     */
    private initialize;
    /**
     * 날짜선택 팝업을 엽니다.
     */
    open(): Popup;
    /**
     * 날짜선택 팝업을 닫습니다.
     */
    close(reason?: any): Popup;
    /**
     * 날짜를 지정된 형식의 문자열로 반환합니다.
     * @param date
     */
    format(date: Date): string;
    /**
     * 선택된 날짜를 삭제합니다.
     */
    clear(): void;
    /**
     * 선택된 날짜로 이동하거나, 선택된 날짜가 없는 경우 오늘의 날짜로 이동합니다.
     */
    reset(): void;
    /**
     * 해당 날짜로 이동합니다.
     * @param date
     */
    setCurrentDate(date: Date): void;
    protected updateSelectLabel(): void;
    protected doLayout(): void;
    /**
     * 해당 자원을 모두 해제합니다.
     */
    destroy(): void;
    private validateAllowDate;
    private onMouseDown;
    private onDropdownMouseDown;
    private onDateChooserStateChange;
    private onDateChooserItemClick;
    private onDateChooserSelectionChanging;
    private onDateChooserSelectionChange;
    private onClearButtonClick;
}

export declare type DatePickerEventMap = DateChooserEventMap & {
    /**
     * 날짜선택 팝업이 열리기 전에 발생합니다.
     */
    'date-picker-opening': CustomEvent<DateRange>;
    /**
     * 날짜선택 팝업이 닫히기 전에 발생합니다.
     */
    'date-picker-closing': CustomEvent<DateRange>;
    /**
     * 날짜선택 팝업이 열릴때 발생합니다.
     */
    'date-picker-open': CustomEvent<DateRange>;
    /**
     * 날짜선택 팝업이 닫힐때 발생합니다.
     */
    'date-picker-close': CustomEvent<DateRange>;
    /**
     * 날짜를 선택했을 때 발생합니다.
     */
    'date-picker-select': CustomEvent<DateRange>;
};

declare type DatePickerEvents = DateChooserEvents & {
    /**
     * 날짜선택 팝업이 열리기 전에 발생합니다.
     */
    'date-picker-opening': (event: CustomEvent<DateRange>) => void;
    /**
     * 날짜선택 팝업이 닫히기 전에 발생합니다.
     */
    'date-picker-closing': (event: CustomEvent<DateRange>) => void;
    /**
     * 날짜선택 팝업이 열릴때 발생합니다.
     */
    'date-picker-open': (event: CustomEvent<DateRange>) => void;
    /**
     * 날짜선택 팝업이 닫힐때 발생합니다.
     */
    'date-picker-close': (event: CustomEvent<DateRange>) => void;
    /**
     * 날짜를 선택했을 때 발생합니다.
     */
    'date-picker-select': (event: CustomEvent<DateRange>) => void;
};

declare type DatePickerGetters = {
    /**
     * `VxDatePicker` 감싸고 있는 DatePicker 인스턴스입니다.
     */
    nativeInstance: DatePicker;
};

declare interface DatePickerMethods extends DateChooserMethods {
    /**
     * 날짜선택 팝업을 엽니다.
     */
    open(): Popup;
    /**
     * 날짜선택 팝업을 닫습니다.
     */
    close(reason?: any): Popup;
}

declare type DatePickerPropsType = typeof defaultDatePickerProps & DateChooserPropsType;

declare interface DatePickerProvider {
}

declare abstract class DateProvider<T extends DateItem> {
    readonly dimension: DateDimension;
    allow: Callback<boolean>;
    protected constructor(dimension: DateDimension);
    get xCount(): number;
    get yCount(): number;
    get allCount(): number;
    createItems(date: Date): Array<T>;
    createItem(date: Date): T;
    equal(a: Date, b: Date): boolean;
    protected abstract createGroupKey(date: Date): number;
    abstract getPreviousItems(date: Date): Array<T>;
    abstract getNextItems(date: Date): Array<T>;
    abstract toValue(date: Date): number;
    abstract toFullValue(date: Date): number;
}

export declare type DateRange = [Date?, Date?];

declare class DateTable extends List<DateItem> {
    private _type;
    private _dateProvider;
    private _today;
    private _currentDate;
    private _selectedRange;
    private initCancel;
    private debounceUpdateCurrent;
    allowDates: Callback<boolean>;
    constructor();
    protected get selectorFactory(): SelectorCtor<DateItem>;
    private get scrollLayer();
    protected get dateProvider(): DateProvider<DateItem>;
    protected set dateProvider(value: DateProvider<DateItem>);
    get type(): DateType;
    set type(value: DateType);
    get today(): Date;
    set today(value: Date);
    get currentDate(): Date;
    set currentDate(value: Date);
    get selectedRange(): DateRange;
    set selectedRange(range: DateRange);
    protected setSelectedRange(range: DateRange): boolean;
    protected getPreviousScrollIndex(): number;
    protected getNextScrollIndex(): number;
    /**
     * 이전 날짜로 스크롤 이동
     */
    previousScroll(): void;
    /**
     * 다음 날짜로 스크롤 이동
     */
    nextScroll(): void;
    protected setCurrentDate(date: Date): boolean;
    protected doLayout(): void;
    protected updateTypicalSize(): Size;
    protected createGroup(parent: Group<DateItem>, key: any): Group<DateItem>;
    protected getGroupKey(item: DateItem): any;
    private containsRange;
    private validateAllowDate;
    protected getItemState(index: number): DateItemState;
    protected updateElementState(element: HTMLElement, state: DateItemState): void;
    protected commitSelection(index: number, multiple: boolean): void;
    protected isExtraDate(date: Date): boolean;
    protected updateCurrent(): void;
    protected doSelectionUpdate(data: SelectionEventData<DateItem>): void;
    private initDateProvider;
    private calculateRowHeight;
    private updateGroupHeight;
    private addPreviousItems;
    private addNextItems;
    private onScroll;
    private onSelectionChanging;
    protected onKeyDown(event: KeyboardEvent): void;
}

export declare type DateType = 'day' | 'month' | 'year';

/**
 * @hidden
 */
export declare class DayTable extends DateTable {
    private _weekLabels;
    constructor();
    private get headerLayer();
    get weekLabels(): WeekLabels;
    set weekLabels(values: WeekLabels);
    protected updateElementState(element: HTMLElement, state: DateItemState): void;
    protected isExtraDate(date: Date): boolean;
    protected updateCurrent(): void;
    protected getPreviousScrollIndex(): number;
    protected getNextScrollIndex(): number;
}

declare const DEFAULT_WEEK_LABELS: string[];

declare const defaultAutocompleteProps: {
    /**
     * 입력필드에 입력된 값을 나타냅니다.
     */
    modelValue: {
        type: PropType<string>;
    };
    /**
     * 제안 목록에서 선택했던 아이템입니다.
     */
    selectedItem: {
        type: PropType<ItemResult>;
    };
};

declare const defaultComboboxProps: {
    /**
     * 표시되는 아이템의 배열입니다.
     * 'labelField' 속성을 이용하여 표시되는 텍스트를 결정합니다.
     */
    items: {
        type: PropType<ItemResult[]>;
    };
    /**
     * 사용자가 입력한 문자열에 따라 콤보박스에서 표시되는 항목을 필터링할 수 있는지 여부입니다.
     */
    filterable: {
        type: PropType<Boolean>;
        default: boolean;
    };
    /**
     * 표시된 아이템의 삭제버튼 활성화 여부입니다.
     */
    chipRemovable: {
        type: PropType<Boolean>;
        default: boolean;
    };
};

declare const defaultDateChooserProps: {
    modelValue: {
        type: PropType<Date | [Date, Date?]>;
    };
    /**
     * 'day', 'month', 'year' 표시할 지를 정의합니다.
     * 기본값은 'day' 입니다.
     */
    type: {
        type: PropType<"day" | "month" | "year">;
        default: string;
    };
    /**
     * 오늘 날짜를 정의합니다.
     */
    today: {
        type: PropType<Date>;
        default: Date;
    };
    /**
     * 헤더에 표시되는 날짜의 형식입니다.
     * ```typescript
     * dateChooser.headerPatterns = {day : 'YYYY.MM', month: 'YYYY',  year:'{YYYY} ~ {YYYY}'}
     * ```
     */
    headerPatterns: {
        type: PropType<FormatType>;
    };
    /**
     * 표시되는 날짜의 형식입니다.
     * `DateChooser.setFormatter` 설정된 포멧터에 의해 결정됩니다.
     * ```typescript
     * dateChooser.pattern = {day : 'YYYY.MM.DD', month: 'YYYY.MM.DD',  year:'YYYY'}
     * ```
     */
    patterns: {
        type: PropType<FormatType>;
    };
    /**
     * 사용자가 날짜 범위를 선택할 수 있는지 여부입니다.
     */
    allowRange: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 선택 가능한 날짜를 정의합니다.
     * ```typescript
     * dateChooser.allowDates = (date: Date) => boolean {}
     * ```
     */
    allowDates: {
        type: PropType<(date: Date) => boolean>;
    };
    /**
     * 선택된 날짜 범위를 정의합니다.
     * ```typescript
     * dateChooser.selectedRange = [new Date('2020/1/1'), new Date('2020/1/31')]
     * ```
     */
    selectedRange: {
        type: PropType<Date[]>;
    };
    /**
     * 선택된 날짜를 정의합니다.
     * 날짜는 Date 객체로 반환납니다.
     * ```typescript
     * dateChooser.selectedDate = new Date('2020/1/1');
     * ```
     */
    selectedDate: {
        type: PropType<Date>;
    };
    /**
     * 선택된 날짜를 정의합니다.
     * 문자열의 형식는 `DateChooser.setFormatter` 통해 설정된 포맷터와 'pattern' 속성에 의해 생성됩니다.
     */
    selectedDateString: {
        type: PropType<string>;
    };
};

declare const defaultDatePickerProps: {
    /**
     * 입력 필드의 레이블 텍스트입니다.
     */
    label: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 입력필드에 값이 있을때 초기화 버튼 활성화 여부입니다.
     */
    clearable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
     */
    placeholder: {
        type: PropType<string>;
    };
    /**
     * 타이틀에 표시되는 날짜의 형식입니다.
     * `DateChooser.setFormatter` 설정된 포멧터에 의해 결정됩니다.
     * ```typescript
     * datePicker.titlePatterns = {day : 'YYYY.MM.DD', month: 'YYYY.MM',  year:'YYYY'}
     * ```
     */
    titlePatterns: {
        type: PropType<FormatType>;
    };
    /**
     * 팝업의 좌표 시스템을 설정합니다.
     * - 'global' 팝업을 전역 좌표계에 배치합니다.
     * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
     * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
     * 기본 값은 'relative' 입니다.
     */
    coordinateMode: {
        type: PropType<CoordinateMode>;
        default: string;
    };
};

declare const defaultInputProps: {
    /**
     * 입력 필드의 레이블 텍스트입니다.
     */
    label: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 입력 필드에 값이 입력되지 않는 경우 표시되는 텍스트입니다.
     */
    placeholder: {
        type: PropType<string>;
    };
    /**
     * 표시될 아이템의 값이 결정되는 필드를 정의합니다.
     * 이 값이 문자열일 경우, 아이템 객체의 해당 키의 값(item[labelField])이 표시되고
     * 콜백일 경우 (item: T) => string 반환된 문자열이 값이 표시됩니다.
     */
    labelField: {
        type: PropType<string | ((item: any) => string)>;
        default: any;
    };
    /**
     * 아이템 선택시 자동으로 제안 목록 닫을지를 정의합니다. 기본값음 true 입니다.
     * @defaultValue true
     */
    closeOnSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 포커스 아웃시 자동으로 제안 목록 닫을지를 정의합니다. 기본값은 true 입니다.
     * @defaultValue true
     */
    closeOnFocusOut: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 외부영역 다운시 자동으로 제안 목록 닫을지를 정의합니다. 기본값은 true 입니다.
     * @defaultValue true
     */
    closeOnOutsideDown: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 입력 필드에 현재 입력된 값입니다.
     */
    inputValue: {
        type: PropType<String>;
        default: string;
    };
    /**
     * 최소 문자 입력 개수입니다. 최소 개수 만족시 제안목록이 활성화 합니다.
     */
    minChar: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 입력필드에 값이 있을때 초기화 버튼 활성화 여부입니다.
     * @defaultValue false
     */
    clearable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 사용자가 특정 키를 눌렀을 때 값을 입력하는 코드 배열입니다.
     * 기본 키코드는 [9, 13]으로, 이는 각각 "Tab", "Enter" 입니다.
     */
    delimiterOnKeys: {
        type: PropType<number[]>;
        default: number[];
    };
    /**
     * 팝업의 좌표 시스템을 설정합니다.
     * - 'global' 팝업을 전역 좌표계에 배치합니다.
     * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
     * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
     * 기본 값은 'relative' 입니다.
     */
    coordinateMode: {
        type: PropType<CoordinateMode>;
        default: string;
    };
};

declare const defaultListProps: {
    /**
     * 표시되는 아이템의 배열입니다.
     */
    items: {
        type: PropType<ItemResult[]>;
    };
    /**
     * 표시할 아이템의 필드 이름를 정의합니다.
     */
    labelField: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 아이템 배열에 표시되는 최대 아이템 개수입니다.
     */
    rowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 외부 스크롤을 정의합니다. 아이템 배열 포함하는 부모노드만 가능합니다.
     */
    scrollTarget: {
        type: PropType<string | HTMLElement>;
        validator: (v: string | HTMLElement) => boolean;
    };
    /**
     * List 아이템이 드래그 가능한지 여부를 나타냅니다.
     */
    draggable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * List 내부의 아이템 또는 다른 List 아이템이 해당 List 위에 드롭 가능한지 여부를 나타냅니다.
     */
    droppable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * `items` 대한 깊은 감시를 활성화합니다.
     * 이를 통해 내부 상태 변화를 감지하고, 이에 따라 네이티브 컴포넌트의 상태를 갱신합니다.
     * 성능에 영향을 줄 수 있으므로 변화 감시가 필요한 경우에만 설정하길 권장합니다.
     */
    itemsDeep: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 아이템 드래그시 보여주는 메시지를 호출하는 함수를 정의합니다.
     */
    hookDragMessage: {
        type: PropType<(data: ListItemDragEventData) => string>;
    };
};

declare const defaultPopupProps: {
    /**
     * 팝업의 상태를(열림/닫힘) 나타냅니다.
     * @type {boolean}
     * @default false
     */
    modelValue: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 모달 팝업 표시 여부입니다.
     * @type {boolean}
     * @default false
     */
    modal: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * content 기준으로 정렬할 방향을 지정합니다.
     * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center', 'center' 입니다.
     * @type {AnchorAlign}
     */
    contentAlign: {
        type: PropType<AnchorAlign>;
    };
    /**
     * 팝업의 좌표 시스템을 설정합니다.
     * - 'global' 팝업을 전역 좌표계에 배치합니다.
     * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
     * - 'none' 팝업에 특정 좌표 시스템을 적용하지 않습니다.
     * @type {'global' | 'relative' | 'none'}
     * @default relative
     */
    coordinateMode: {
        type: PropType<"none" | "global" | "relative">;
    };
    /**
     * 팝업이 열릴 상대적 위치(HTMLElement, DomSelector)를 지정합니다.
     * 설정하지 않으면 기본적으로 최상위 노드(body)가 됩니다.
     */
    anchor: {
        type: PropType<string | HTMLElement>;
    };
    /**
     * anchor 기준으로 정렬할 방향을 지정합니다.
     * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center' 입니다
     * @type {AnchorAlign}
     */
    anchorAlign: {
        type: PropType<AnchorAlign>;
    };
    /**
     * 해당 크기 만큼 팝업 X 위치가 변경됩니다. 단위는 픽셀입니다.
     * @type {number}
     * default: 0
     */
    offsetX: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 해당 크기만큼 팝업 Y 위치가 변경됩니다. 단위는 픽셀입니다.
     * @type {number}
     * @default 0
     */
    offsetY: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컨텐츠가 뷰포트 바깥 영역으로 나감을 방지합니다.
     * 만일 화면크기가 뷰표트 크기보다 클땐 왼쪽상단을 기준으로 맞춥니다.
     * @default false
     */
    lockOutside: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * z-index 항상 최상위 위치에 팝업을 배치합니다.
     * @default false
     */
    alwaysOnTop: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 다중 팝업이 열려있을때  z-index 우선순위를 정의합니다. 큰 수일수록 최상대에 배치합니다.
     * @type {number}
     * @default 0
     */
    priority: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 중첩된 팝업 구조를 관리합니다.
     * - 일반적인 경우, 팝업이 닫히면 연관된(자식) 팝업도 함께 닫힙니다.
     * - 단, `coordinateMode` 값이 `relative` 인 경우에는 값이 `false`여도 해당 팝업은 중첩된 팝업으로 처리됩니다.
     * @default true
     */
    nest: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 팝업 열릴때 자동으로 팝업 컨텐츠에 포커스를 설정합니다.
     * @default true
     */
    autoFocus: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 외부 영역 클릭시 자동 닫기 방지위한 유효영역 설정합니다.
     */
    hitAreas: {
        type: PropType<HTMLElement[]>;
        default: () => any[];
    };
    /**
     * 외부영역 다운시 팝업을 닫습니다.
     * @default false
     */
    closeOnOutsideDown: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * ESC 입력시 팝업을 닫습니다.
     * @default false
     */
    closeOnEscape: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 팝업 컨텐츠 영역에 정의된 이벤트 발생시 팝업을 닫습니다.
     * @default ['close']
     */
    closeOnEvents: {
        type: PropType<string[]>;
        default: string[];
    };
    /**
     * 팝업 열릴때 지연 시간(ms)입니다.
     */
    openDelay: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 팝업 닫힐때 지연 시간(ms)입니다.
     */
    closeDelay: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 앵커 엘리먼트의 'click' 또는 'over' 이벤트 발생시 자동으로 팝업 엽니다.
     */
    openOnTrigger: {
        type: PropType<AnchorTrigger>;
    };
    /* Excluded from this release type: usePreRender */
};

declare const defaultSelectableProps: {
    /**
     * 선택된 아이템 또는 아이템 배열을 나타냅니다.
     * `valueField` 정의 되어 있으면 선택된 아이템의 필드 값 또는 값 배열을 나타냅니다.
     */
    modelValue: {
        type: PropType<ItemResult | ItemResult[]>;
    };
    /**
     * 사용자가 여러 항목을 선택할 수 있는지 여부입니다.
     */
    allowMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 적어도 하나의 아이템이 항상 선택되어야 하는 여부입니다.
     */
    requireSelection: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 선택된 아이템의 값을 결정하는 필드의 이름입니다.
     */
    valueField: {
        type: PropType<string>;
    };
    /**
     * 선택된 아이템을 정의합니다.
     */
    selectedItem: {
        type: PropType<ItemResult>;
    };
    /**
     * 복수 선택된 아이템을 정의합니다.
     */
    selectedItems: {
        type: PropType<ItemResult[]>;
    };
    /**
     * 선택된 아이템의 `valueField` 속성 값을 정의합니다
     */
    selectedValue: {
        type: PropType<any>;
    };
};

declare const defaultSuggestProps: {
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
        type: PropType<string | Promise<any> | ((item: any) => string)>;
    };
    /**
     * 제안 목록에 표시될 아이템 개수입니다.
     */
    suggestCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * @private
     */
    hookSuggestItems: {
        type: FunctionConstructor;
        default: (items: any) => any;
    };
};

declare const defaultTokenizerProps: {
    /**
     * 사용자는 제안 목록에서 값을 선택해서 추가하는 것 외에도,
     * 입력 필드에 직접 값을 입력하여 속성 `delimiterOnKeys` 따라 값을 추가할 수 있습니다.
     * `delimiterOnKeys`의 기본 키코드는 [9, 13]으로, 이는 각각 "Tab", "Enter" 입니다.
     */
    allowInputValue: {
        type: PropType<boolean>;
        default: boolean;
    };
};

declare const defaultTreeProps: {
    /**
     * 트리 구조에서 아이템의 자식 목록을 포함하는 필드의 이름을 정의합니다.
     */
    childrenField: {
        type: PropType<string>;
        default: string;
    };
    /**
     * `items`가 갱신될 때 자동으로 확장될 아이템의 레벨을 지정합니다.
     * 예를 들어, 이 속성의 값이 2인 경우, `items`가 갱신될 때 2번째 레벨까지 모든 아이템이 자동으로 확장됩니다.
     */
    autoExpandLevel: {
        type: PropType<number>;
        default: number;
    };
};

export declare type DomSelector = HTMLElement | string;

export declare abstract class DragDropBase<TElement extends List, DropLocation extends ListDropLocation, T = any> {
    /**
     * List 계열 인스턴스
     */
    readonly target: TElement;
    protected dragManager: DragManager;
    protected currentDropLocation: DropLocation;
    private _droppable;
    private dropIndicator;
    private dragContext;
    private enterDelayPromise;
    protected constructor(target: TElement);
    /**
     * 아이템 드래그를 가능 여부입니다.
     */
    get draggable(): boolean;
    set draggable(value: boolean);
    /**
     * 아이템 드랍 가능 여부입니다.
     */
    get droppable(): boolean;
    set droppable(value: boolean);
    /**
     * 드래그 중인지 여부입니다.
     */
    get dragging(): boolean;
    /**
     * 드래그 매니저 생성합니다.
     * @private
     */
    private createDragManager;
    /**
     * 드래그 매니저를 삭제합니다.
     * @private
     */
    private removeDragManager;
    /**
     * 드래그 매니저 인스턴스를 반환합니다.
     */
    protected getDragManager(event: Event): DragManager;
    /**
     * 드랍 대상 인스턴스를 반환합니다.
     */
    private getDropInstance;
    /**
     * 드랍 표시 엘리먼트 생성합니다.
     * @private
     */
    private createDropIndicator;
    /**
     * 드랍 표시 엘리먼트 삭제합니다.
     * @private
     */
    private removeDropIndicator;
    /**
     * 드랍위치 정보를 계산합니다.
     */
    protected abstract calculateDropLocation(event: ListDragEvent<T>): DropLocation;
    /**
     * 드랍가능한 영역인지 확인합니다.
     */
    protected abstract validDropLocation(dropLocation: DropLocation): boolean;
    /**
     * 드랍된 아이템 이동하거나 추가합니다.
     */
    protected abstract applyDrop(dropLocation: DropLocation): void;
    /**
     * 드랍 표시 엘리먼트를 보이게합니다.
     */
    protected showDropIndicator(dropLocation: DropLocation): HTMLElement;
    /**
     * 드랍 표시 엘리먼트를 숨깁니다.
     */
    protected hideDropIndicator(): void;
    /**
     * 아이템 드래그 이벤트를 발생 시킵니다.
     */
    protected dispatchItemDragEvent(event: ListDragEvent<T>, dropLocation?: ListDropLocation): boolean;
    /**
     * drag-ready 핸들러
     */
    protected onDragReady(event: ListDragEvent<T>): void;
    /**
     * drag-start 핸들러
     */
    protected onDragStart(event: ListDragEvent<T>): void;
    /**
     * drag-over 핸들러
     */
    protected onDragOver(event: ListDragEvent<T>): void;
    /**
     * drag-out 핸들러
     */
    protected onDragOut(event: ListDragEvent<T>): void;
    /**
     * drag-enter 핸들러
     */
    protected onDragEnter(event: ListDragEvent<T>): void;
    /**
     * drag-leave 핸들러
     */
    protected onDragLeave(event: ListDragEvent<T>): void;
    /**
     * drop 핸들러
     */
    protected onDrop(event: ListDragEvent<T>): void;
    /**
     * drag-end 핸들러
     */
    protected onDragEnd(event: ListDragEvent<T>): void;
    /**
     * drag-cancel 핸들러
     */
    protected onDragCancel(event: ListDragEvent<T>): void;
    /**
     * drag-mirror-create 핸들러
     */
    protected onDragMirrorCreate(event: ListDragEvent<T>): void;
    /**
     * drag-mirror-remove 핸들러
     */
    protected onDragMirrorRemove(event: ListDragEvent<T>): void;
    protected handleEvents(event: ListDragEvent<T>, dragContext: this): void;
    /**
     * @private
     */
    private readonly onDragEvents;
    /**
     * @private
     */
    private readonly onItemDragEnter;
    /**
     * @private
     */
    private readonly onItemDragLeave;
}

declare type DragEvent_2<T = any> = CustomEvent<DragEventData<T>>;
export { DragEvent_2 as DragEvent }

export declare type DragEventData<T = any> = {
    dragSource: T;
    dragElement: HTMLElement;
    overContainer: HTMLElement;
    mirrorElement: MirrorElement;
    mirrorOffset: Point;
    isScrolling: boolean;
    trigger: Event;
};

export declare type DragEventMap<T> = EventMap & {
    /**
     * 드래그 준비 되었을때 발생합니다.
     * 드래그를 시작하려는 요소를 사용자가 처음 클릭했을 때 발생합니다.
     */
    'drag-ready': DragEvent_2<T>;
    /**
     * 드래그 시작 되었을때 발생합니다.
     */
    'drag-start': DragEvent_2<T>;
    /**
     * 드래그 중일 때, 움직임이 감지될 때마다 발생합니다.
     */
    'drag-move': DragEvent_2<T>;
    /**
     * 드래그 중인 요소가 특정 영역 위에 이동했을 때 발생합니다.
     */
    'drag-over': DragEvent_2<T>;
    /**
     * 드래그 중인 요소가 특정 영역에서 벗어 났을 때 발생합니다.
     */
    'drag-out': DragEvent_2<T>;
    /**
     * 드래그 중인 요소가 드랍 가능한 영역 들어 갔을 때 발생합니다.
     */
    'drag-enter': DragEvent_2<T>;
    /**
     * 드래그 중인 요소가 드랍 가능 영역에서 밖으로 나갔을 때 발생합니다.
     */
    'drag-leave': DragEvent_2<T>;
    /**
     * 드래그 종료되었을 때 발생합니다.
     */
    'drag-end': DragEvent_2<T>;
    /**
     * 드래그 취소되었을 때 발생합니다.
     */
    'drag-cancel': DragEvent_2<T>;
    /**
     * 드래그 중인 요소가 드랍되었을때 발생합니다.
     */
    drop: DragEvent_2<T>;
    /**
     * 드래그 중인 요소의 미러 이미지(원본 요소의 복사본)가 생성될 때 발생합니다.
     */
    'drag-mirror-create': DragEvent_2<T>;
    /**
     * 드래그 중인 요소의 미러 이미지(원본 요소의 복사본)가 삭제될 때 발생합니다.
     */
    'drag-mirror-remove': DragEvent_2<T>;
};

/**
 * `DragManager` 클래스는 드래그 앤 드랍 동작을 관리합니다.
 * 사용자가 손쉽게 드래그 앤 드랍 동작을 구현할 수 있도록 도움을 줍니다.
 */
export declare class DragManager<T = any> extends Base<DragEventMap<T>> {
    private static draggingInstance;
    /**
     * 드래그로 인식하기 시작하는 이동 픽셀 수입니다.
     */
    dragThreshold: number;
    /**
     * 드래그 취소를 위해 사용되는 키보드 키 코드들입니다.
     */
    cancelKeyCodes: Array<Number>;
    private readonly container;
    private readonly options;
    private readonly boundContainerMouseDown;
    private readonly popup;
    private scroller;
    private _dragElement;
    private _dragging;
    private _dragSource;
    private _dragScrolling;
    private _dragScrollingId;
    private _mirrorElement;
    private mirrorOffset;
    private overContainer;
    private dropContainer;
    private lastMouseMoveEvent;
    constructor(container: HTMLElement, options: DragManagerOptions<T>);
    /**
     * 드래그 중인지 여부입니다.
     */
    get dragging(): boolean;
    /**
     * 드래드 대상 엘리먼트입니다.
     */
    get dragElement(): HTMLElement;
    /**
     *  드래그 데이터입니다.
     */
    get dragSource(): T;
    /**
     * 스크롤 중인지 여부입니다.
     */
    get dragScrolling(): boolean;
    /**
     * 드래그 중인 요소의 미러 이미지(원본 요소의 복사본)입니다.
     */
    get mirrorElement(): MirrorElement;
    private get document();
    /**
     * 드래그 취소합니다.
     */
    cancel(): void;
    /**
     * 'drag_enter' 일때 현 상태를 취소합니다. 'drag_leave' 발생합니다.
     */
    cancelDragEnter(): void;
    /**
     * 드래그 관련 리소스 삭제하고 연결된 이벤트 리스너를 해제합니다.
     */
    destroy(): void;
    /**
     * 드래그시 보여주는 메시지를 정의합니다.
     */
    setDragMessage(message: string): void;
    /**
     * 드래그 준비
     * @param event
     * @private
     */
    private dragReady;
    /**
     * 드래그를 시작
     * @param event
     * @private
     */
    private dragStart;
    /**
     * 드래그 이동
     * @param event
     * @private
     */
    private dragMove;
    /**
     * 드랍 영역에 들어감
     * @param event
     * @param overContainer
     * @private
     */
    private dragEnter;
    /**
     * 드랍 영역을 나감
     * @param event
     * @private
     */
    private dragLeave;
    /**
     * 드래그 종료
     * @param event
     * @private
     */
    private dragEnd;
    /**
     * 드래그 관련 리소스를 해제
     * @param type
     * @param event
     * @private
     */
    private dragStop;
    /**
     * 드래그 취소
     * @private
     */
    private dragCancel;
    /**
     * @private
     */
    private eventToElement;
    /**
     * @private
     */
    private adjustElement;
    /**
     * @private
     */
    private startAutoScroll;
    /**
     * 미러 엘리먼트 생성
     * @private
     */
    private createMirrorElement;
    /**
     * 미러 엘리먼트
     * @param event
     * @private
     */
    private moveMirrorElement;
    /**
     *
     * @param event
     * @private
     */
    private calculateMirrorOffset;
    private calculateDragScrollDelta;
    /**
     * 자동 스크롤을 시작합니다.
     * @param delta
     * @private
     */
    private startDragScrolling;
    /**
     * 스크롤을 멈춤니다.
     * @private
     */
    private stopDragScrolling;
    private toggleUserSelect;
    /**
     * DragEvent 발생시킵니다.
     */
    private dispatchDragEvent;
    /**
     * MouseEvent 핸들러
     * @param event
     * @private
     */
    private onContainerMouseDown;
    static create<T = any>(options: {
        container: HTMLElement;
        options: DragManagerOptions<T>;
    }): DragManager<T>;
    static getDraggingInstance(): DragManager;
}

export declare type DragManagerOptions<T> = {
    dragTarget?: ElementTemplate;
    dropTarget?: ElementTemplate;
    dragSource?: Callback<T> | T;
    mirrorTarget?: ElementTemplate | Constructor<MirrorElement>;
    hookEvents?: (event: DragEvent_2<T>) => void;
};

declare type DragState = 'enter' | 'leave';

/**
 * UI 컴포넌트의 기본이 되는 클래스입니다.
 */
declare class Element_2<EventTypes extends EventMap = EventMap> extends Base<EventTypes> implements IElement {
    protected _invalidateFlag: boolean;
    protected _reasonsMask: number;
    protected __dom__: Mounted;
    protected resizeObserver: ResizeObserver;
    private _frameId;
    protected isMounted: boolean;
    protected isDestroyed: boolean;
    /**
     * 크기 변경을 감지할지 여부입니다.
     */
    resizable: boolean;
    constructor();
    /**
     * 돔에 마운트 되는 HTMLElement 입니다.
     */
    get root(): HTMLElementEx;
    /**
     * 엘리먼트에 여러 옵션을 설정합니다.
     * 여러 속성을 한번에 적용하기 위함입니다.
     * @param options
     */
    setOptions(options?: {}): this;
    /**
     * HTMLElement 인스턴스를 지정한 컨테이너에 마운트합니다.
     * @param container
     * @param options
     */
    mount(container: DomSelector, options?: {}): this;
    /**
     * 엘리먼트를 해당 부모 엘리먼트에서 제거합니다.
     */
    unmount(): this;
    /**
     * 관련 리소스를 정리하고 인스턴스를 해제합니다.
     */
    destroy(): void;
    /**
     * invalidateFor 의해 자동호출됩니다.
     * 레이아웃 계산 및 각 변경된 속성 값을 적용합니다.
     * @protected
     */
    protected doLayout(): void;
    /**
     * 표시 목록을 갱신을 요청합니다.
     */
    invalidate(): void;
    /**
     * 대기중인 표시 목록 갱신을 바로 실행합니다.
     */
    flush(): void;
    /**
     * 지정된 플레그 따라 표시 목록을 갱신을 요청합니다.
     * 이 메소드는 변경된 내용이 적용되는 작업을 다음 렌더링 시점에 doLayout 호출합니다.
     */
    protected invalidateFor(reason?: ReasonType): void;
    /**
     * 지정된 플레그가 있는지 확인합니다.
     * @param reasons
     * @protected
     */
    protected hasInvalidateReason(...reasons: ReasonType[]): boolean;
    /**
     * 갱신 요청을 취소하고 모든 플래그를 초기화합니다.
     */
    protected cancelInvalidate(): void;
    /**
     * 크기변경을 감지하는 ResizeObserver를 활성화합니다.
     */
    watchResize(): void;
    /**
     * 크기변경을 감지를 해제합니다.
     */
    unwatchResize(): void;
    /**
     * 커스텀 이벤트 발생시킵니다.
     * @param type
     * @param detail
     * @param cancelable
     * @param bubbles
     * @protected
     */
    protected dispatchCustomEvent<T = any>(type: string, detail?: T, cancelable?: boolean, bubbles?: boolean): boolean;
    static create(container: DomSelector, options?: {}): Element_2;
    static template(html: string): ElementCtor;
    static getInstance(element: HTMLElement): Element_2;
}

declare type ElementCtor = Constructor<Element_2>;

export declare type ElementTemplate<T = any> = DomSelector | ((data: T) => HTMLElement);

declare class EventCounter<T> {
    private count;
    private readonly thisArg;
    constructor(thisArg: T);
    start(callback?: Callback<void>): void;
    stop(callback?: Callback<void>): void;
    cancel(): void;
}

declare type EventMap = {
    [key: string]: CustomEvent | Event;
};

declare class EventTargetWithType<EventTypes extends EventMap = EventMap> extends EventTarget {
    addEventListener<T extends keyof EventTypes>(type: T, listener: (event: EventTypes[T]) => void, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<T extends keyof EventTypes>(type: T, listener: (event: EventTypes[T]) => void, options?: boolean | EventListenerOptions): void;
}

declare type FilterFn<T> = (item: T, index: number, source: Array<T>) => boolean;

declare type Formatter<T> = {
    format?: (value: T, pattern: string, options?: FormatterOptions) => string;
    parse?: (value: string, pattern: string, options?: FormatterOptions) => T;
};

declare type FormatterBase<T> = Constructor<Formatter<T>> | Formatter<T>;

declare type FormatterOptions = any;

export declare type FormatType = Record<DateType, string>;

declare class Group<T = any> {
    parent: Group<T>;
    container: HTMLElement;
    private readonly instance;
    readonly key: any;
    private _items;
    private elementMap;
    constructor(instance: List<T>, key: any, container: HTMLElement);
    get items(): Array<GroupItem<T>>;
    get length(): number;
    get first(): T;
    private getFirstLeafItem;
    has(item: GroupItem<T>): boolean;
    add(groupItem: GroupItem<T>, element: HTMLElement): boolean;
    remove(item: GroupItem<T>): boolean;
    clear(): void;
}

declare type GroupItem<T> = T | Group<T>;

declare type HAlign = (typeof HAlignArray)[number];

declare const HAlignArray: readonly ["left", "center", "right"];

export declare type HierarchyFindFn<T> = (node: T, parent?: T, children?: Array<T>) => boolean;

/**
 * `HierarchyList`는 트리 구조의 배열을 관리하는 컬렉션 클래스입니다.
 * 노드 삽입, 삭제, 탐색 등의 기본적인 트리 구조 연산을 수행합니다.
 */
export declare class HierarchyList<T extends Object> extends IList<T, HierarchyListEventMap<T>> {
    private readonly nodeEventCounter;
    private _rootNode;
    private _expandedNodeMap;
    private _parentMap;
    private _childrenMap;
    private _childrenField;
    private _lockAllParentMapping;
    private _displayPolicy;
    private _displayList;
    private _lockDisplayListEvent;
    private _stableNodes;
    constructor(source?: Array<T>, childrenField?: string);
    /**
     * 출력된 노드 목록를 반환합니다.
     */
    get displayNodes(): Array<T>;
    /**
     * 하위 노드 목록의 정보를 가지고 있는 필드 나타냅니다.
     */
    get childrenField(): string;
    set childrenField(value: string);
    /**
     * 리스트에서 부모위치를 나타냅니다.
     */
    get displayPolicy(): Policy;
    set displayPolicy(value: Policy);
    /**
     * 해당 노드의 부모 노드를 반환합니다.
     * @param node 자식 노드입니다.
     * @returns T
     */
    getParentNode(node: T): T;
    /**
     * 해당 노드의 조상 노드 목록을 반환합니다.
     * @param node
     * @returns {Array}
     */
    getAncestorNodes(node: T): Array<T>;
    /**
     * 해당 노드의 후손 노드 목록을 반환합니다. null 이면 전체 노드 반환
     * @param node
     * @returns {Array}
     */
    getDescendantNodes(node: T): Array<T>;
    /**
     * 해당노드의 형제노드들을 반환합니다.
     * @returns {Array} 형제노드 배열입니다.
     */
    getSiblingNodes(node: T): Array<T>;
    /**
     * @param node
     * @private
     */
    private internalGetParentNode;
    /**
     * 해당 노드의 자식노드들을 반환합니다.
     * @param node 부모 노드입니다.
     * @returns {Array} 자식노드 배열입니다.
     */
    getChildren(node: T): Array<T>;
    /**
     * 해당 노드의 가공되지 않은 원본 자식노드들을 반환합니다.
     * @param node 부모 노드입니다.
     * @returns {Array} 자식노드 배열입니다.
     */
    getNativeChildren(node: T): Array<T>;
    /**
     * 해당노드 하위의 열린 노드들을 배열형태로 반환합니다.
     * @param node 부모 노드입니다.
     * @returns {Array} 자식노드 배열입니다.
     */
    getDisplayChildren(node: T): Array<T>;
    /**
     * 해당 노드 부모의 기준으로 인덱스를 반환합니다.
     * @param node
     * @returns {Number} 형제 노드목록에서의 인덱스.
     */
    getNodeIndex(node: T): number;
    /**
     * @private
     */
    private internalGetDisplayChildren;
    /**
     * 해당 노드에 자식이 있는지 확인합니다.
     * @param node
     * @returns {boolean}
     */
    hasChildren(node: T): boolean;
    /**
     * 해당 node가 있는지 확인합니다.
     * @param node {Object}
     * @return {boolean} 노드가 포함되어 있으면 true.
     */
    contains(node: T): boolean;
    /**
     * 해당 노드가 확장되어 있는지 확인합니다.
     * @param node
     * @return {boolean} 노드가 확장되어 있으면 true.
     */
    isExpandedNode(node: T): boolean;
    /**
     * 해당 노드가 출력된 (즉, 화면에 표시) 노드인지 확인합니다.
     * 노드가 출력되려면 해당 노드의 모든 상위 노드들이 확장된 상태여야 합니다.
     * @param node
     * @return {boolean}
     */
    isDisplayNode(node: T): boolean;
    /**
     * 해당 노드가 가지노드(자식 노드를 가진 노드)인지 확인합니다.
     * @param node
     */
    isBranchNode(node: T): boolean;
    /**
     * 해당 노드가 마지막노드(자식 노드를 가지지 않는 노드)인지 확인합니다.
     * @param node
     */
    isLeafNode(node: T): boolean;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 `true` 반환하는 모든 아이템이 포함된 새 배열을 만듭니다
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return true 반환하는 항목의 배열입니다.
     */
    find(callback: HierarchyFindFn<T>, prefetchNode?: T, postOrder?: boolean): Array<T>;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 처음으로 `true` 반환하는 항목을 반환하고 탐색을 중지합니다.
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return 처음으로 true를 반환하는 항목입니다.
     */
    findOne(callback: HierarchyFindFn<T>, prefetchNode?: T, postOrder?: boolean): T;
    /**
     * @private
     */
    private internalFind;
    /**
     * 해당 노드를 확장합니다.
     * @param node
     * @return {boolean} 해당 노드가 확장되면 true.
     */
    expandNode(node: T): boolean;
    private internalExpandNode;
    /**
     * 전체 노드를 확장합니다.
     */
    expandAll(): void;
    /**
     * 해당 노드를 축소합니다.
     * @param node
     * @return {boolean} 해당 노드가 축소되면 true.
     */
    collapseNode(node: T): boolean;
    private internalCollapseNode;
    /**
     * 전체 노드를 축소합니다.
     */
    collapseAll(): void;
    /**
     * 해당 노드 배열을 확장합니다.
     * @param nodes
     */
    setExpandedNodes(nodes: Array<T>): void;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param node 추가할 자식 노드
     * @returns {boolean}
     */
    addNode(parent: T, node: T): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param node 추가할 자식 노드.
     * @param index 자식 노드 삽입 위치의 인덱스.
     * @returns {boolean}
     */
    addNodeAt(parent: T, node: T, index: number): boolean;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param nodes 추가할 자식 노드 목록
     * @returns {boolean}
     */
    addNodes(parent: T, nodes: Array<T>): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parentNode 부모 노드.
     * @param nodes 추가할 자식 노드 목록
     * @param index 자식 노드 삽입 위치의 인덱스.
     * @returns {boolean}
     */
    addNodesAt(parentNode: T, nodes: Array<T>, index: number): boolean;
    /**
     * 노드를 삭제합니다.
     * @param node 삭제할 노드 입니다.
     * @returns {boolean}
     */
    removeNode(node: T): boolean;
    private internalRemoveNode;
    /**
     * 노드목록을 삭제합니다.
     * @returns {boolean}
     * @param nodes
     */
    removeNodes(nodes: Array<T>): boolean;
    /**
     *
     * @param node
     * @param toParent
     * @param toIndex
     * @returns {boolean}
     */
    moveNode(node: T, toParent: T, toIndex: number): boolean;
    /**
     * 확장되어있는 노드목록을 반환합니다.
     * @returns Array 확장된 노드 목록
     */
    getExpandedNodes(): Array<T>;
    /**
     * 해당 노드의 레벨을 반환합니다.
     * @returns {Number} 노드 레벨
     */
    getNodeLevel(node: T): number;
    /**
     * 해당 노드의 깊이를 반환합니다.
     * @param node
     */
    getNodeDepth(node: T): number;
    toStableArray(): Array<T>;
    clone(): IList<T>;
    protected internalReset(): void;
    private getParentsInNodes;
    private resetDisplayList;
    private addExpandedNodeMapping;
    private removeExpandedNodeMapping;
    private addAllParentMapping;
    private addParentMapping;
    private removeParentMapping;
    private addChildrenMapping;
    private removeChildrenMapping;
    private createChildrenField;
    private createRootNode;
    private internalGetDepth;
    protected dispatchNodeEvent(data: HierarchyListEventData<T>, cancelable?: boolean): boolean;
    private onDisplayCollectionChange;
}

export declare type HierarchyListEvent<T> = CustomEvent<HierarchyListEventData<T>>;

export declare type HierarchyListEventData<T> = ListEventData & {
    /**
     * 이벤트 종류
     * - collapsing - 노드 접혀지기 전
     * - collapse - 노드 접혀진 후
     * - expanding - 노드 확장되기 전
     * - expand - 노드 확장된 후
     * - add - 노드 추가
     * - remove - 노드 삭제
     * - move - 노드 이동
     */
    kind: 'collapsing' | 'collapse' | 'expanding' | 'expand' | 'add' | 'remove' | 'move';
    /**
     * 이벤트 대상 노드의 부모 노드
     */
    parentNode?: T;
    /**
     * 이벤트 대상 노드 배열
     */
    nodes: Array<T>;
    /**
     * 이벤트 대상 노드의 인덱스
     */
    index?: number;
    /**
     * 노드 이동 이벤트 발생 시, 이동하기 전의 부모 노드
     */
    oldParentNode?: T;
    /**
     * 노드 이동 이벤트 발생 시, 이동하기 전의 노드 인덱스
     */
    oldIndex?: number;
};

export declare type HierarchyListEventMap<T> = {
    /**
     * 컬렉션 내부의 아이템이 변경되었을 때 발생합니다.
     * - reset - 컬렉션 소스 변경
     * - refresh - 컬렉션 필터등 재 갱신
     */
    'collection-change': ArrayListEvent<T>;
    /**
     * 컬렉션 내부의 노드 변경되었을 때  발생합니다.
     * - collapsing - 노드 접혀지기 전
     * - collapse - 노드 접혀진 후
     * - expanding - 노드 확장되기 전
     * - expand - 노드 확장된 후
     * - add - 노드 추가
     * - remove - 노드 삭제
     * - move - 노드 이동
     */
    'node-change': HierarchyListEvent<T>;
};

export declare type HTMLElementEx = HTMLElement & {
    [INSTANCE_NAME]: IElement;
};

/**
 * HTMLElement 감싸는 가상 엘리먼트 인터페이스입니다.
 * @interface
 * @hidden
 */
export declare interface IElement {
    /**
     * 돔에 마운트 되는 HTMLElement 입니다.
     */
    get root(): HTMLElement;
    /**
     * 엘리먼트에 여러 옵션을 설정합니다.
     * 여러 속성을 한번에 적용하기 위함입니다.
     * @param options
     */
    setOptions(options: {}): this;
    /**
     * HTMLElement 인스턴스를 지정한 컨테이너에 마운트합니다.
     * @param container
     * @param options
     */
    mount(container: DomSelector, options: {}): this;
    /**
     * 엘리먼트를 해당 부모 엘리먼트에서 제거합니다.
     */
    unmount(): this;
    /**
     * 관련 리소스를 정리하고 인스턴스를 해제합니다.
     */
    destroy(): void;
}

/**
 * `IList`는 컬렉션의 일반적인 액세스 방식을 제공합니다.
 */
export declare class IList<T, EventTypes extends EventMap = EventMap> extends EventTargetWithType<EventTypes> {
    protected _source: Array<T>;
    protected _locals: Array<T>;
    protected counter: EventCounter<IList<T>>;
    protected sortCompareFn: any;
    private _filter;
    constructor();
    /**
     * 원본 데이터 배열입니다.
     */
    get source(): Array<T>;
    set source(value: Array<T>);
    /**
     * filter, sort 적용된 배열입니다.
     */
    get locals(): Array<T>;
    get length(): number;
    /**
     * 필터함수를 정의하고 적용합니다.
     */
    get filter(): FilterFn<T>;
    set filter(filter: FilterFn<T>);
    /**
     * 인덱스에 해당하는 아이템을 반환합니다.
     * @param index
     */
    get(index: number): T;
    /**
     * 해당 아이템의 첫 번째 인덱스를 반환합니다.
     * @param item
     * @param fromIndex
     */
    indexOf(item: T, fromIndex?: number): number;
    /**
     * 아이템의 마지막 인덱스를 반환합니다.
     * @param item
     * @param fromIndex
     */
    lastIndexOf(item: T, fromIndex?: number): number;
    /**
     * 아이템이 리스트에 포함되어 있는지 확인합니다.
     * @param item
     */
    contains(item: T): boolean;
    /**
     * 인덱스와 속성으로 아이템의 값을 설정합니다.
     * @param index
     * @param property
     * @param value
     */
    setValue(index: number, property: string, value: any): boolean;
    setItemValue(item: T, property: string, value: any): boolean;
    /**
     * @private
     */
    private internalSetValue;
    /**
     * 정렬 필드 배열을 사용하여 아이템을 정렬합니다.
     * @param sortFields
     */
    sort(sortFields: Array<SortField>): void;
    /**
     * 리스트를 초기 상태로 되돌립니다.
     */
    reset(): void;
    /**
     * 리스트를 새로 고칩니다.
     */
    refresh(): void;
    /**
     * 리스트의 모든 아이템을 제거합니다.
     */
    clear(): void;
    /**
     * 정렬 및 필터링이 적용된 배열의 복사본을 반환합니다.
     * 없는 경우 빈 배열을 반환합니다.
     */
    toArray(): Array<T>;
    /**
     * 컬렉션에서 사용할 수 있는 배열 아이템을 반환합니다.
     */
    toStableArray(): Array<T>;
    /**
     * 해당 콜백 조건을 만족하는 모든 항목을 찾아 배열로 반환합니다.
     * @param callback
     */
    find(callback: (item: T, ...args: any) => boolean): Array<T>;
    /**
     * 해당 콜백 조건을 만족하는 첫 번째 항목을 찾아 반환합니다.
     * @param callback
     */
    findOne(callback: (item: T, ...args: any) => boolean): T;
    /**
     * 현재 컬렉션의 복제본을 만들어 반환합니다.
     */
    clone(): IList<T>;
    protected internalReset(): void;
    protected dispatchCollectionEvent<EventData extends ListEventData>(detail: EventData): boolean;
}

/**
 * Called automatically by `app.use(vrix)`
 * @param app
 */
declare const install: Exclude<Plugin_2['install'], undefined>;
export default install;

export declare const INSTANCE_NAME = "__instance__";

export declare type ItemDragEventMap<T = any> = EventMap & {
    /**
     * 드래그 준비 되었을때 발생합니다.
     * 드래그를 시작하려는 요소를 사용자가 처음 클릭했을 때 발생합니다.
     */
    'item-drag-ready': ListItemDragEvent<T>;
    /**
     * 드래그 시작 되었을때 발생합니다.
     */
    'item-drag-start': ListItemDragEvent<T>;
    /**
     * 드래그 중일 때, 움직임이 감지될 때마다 발생합니다.
     */
    'item-drag-move': ListItemDragEvent<T>;
    /**
     * 드래그 중인 요소가 특정 영역 위에 이동했을 때 발생합니다.
     */
    'item-drag-over': ListItemDragEvent<T>;
    /**
     * 드래그 중인 요소가 특정 영역에서 벗어 났을 때 발생합니다.
     */
    'item-drag-out': ListItemDragEvent<T>;
    /**
     * 드래그 중인 요소가 드랍 가능한 영역 들어 갔을 때 발생합니다.
     */
    'item-drag-enter': ListItemDragEvent<T>;
    /**
     * 드래그 중인 요소가 드랍 가능 영역에서 밖으로 나갔을 때 발생합니다.
     */
    'item-drag-leave': ListItemDragEvent<T>;
    /**
     * 드래그 종료되었을 때 발생합니다.
     */
    'item-drag-end': ListItemDragEvent<T>;
    /**
     * 드래그 취소되었을 때 발생합니다.
     */
    'item-drag-cancel': ListItemDragEvent<T>;
    /**
     * 드래그 중인 요소가 드랍되었을때 발생합니다.
     */
    'item-drop': ListItemDragEvent<T>;
    /**
     * 드래그 중인 요소의 미러 이미지(원본 요소의 복사본)가 생성될 때 발생합니다.
     */
    'item-drag-mirror-create': DragEvent_2<T>;
    /**
     * 드래그 중인 요소의 미러 이미지(원본 요소의 복사본)가 삭제될 때 발생합니다.
     */
    'item-drag-mirror-remove': DragEvent_2<T>;
};

export declare type ItemEvent<T> = CustomEvent<ItemEventData<T>>;

export declare type ItemEventData<T> = {
    index: number;
    item: T;
    element: HTMLElement;
    trigger: Event;
};

declare class ItemList<T> {
    protected indices: Array<number>;
    protected items: Array<T>;
    constructor(indices?: any[], items?: any[]);
    get length(): number;
    get firstIndex(): number;
    get lastIndex(): number;
    get firstItem(): T;
    get lastItem(): T;
    getIndices(): Array<number>;
    has(index: number): boolean;
    get(index: number): T;
    indexOf(item: T): number;
    add(index: number, item: T): boolean;
    remove(item: T): T;
    removeAt(index: number): T;
    forEach(callback: (item: T, index?: number) => void): void;
    map(callback: (item: T, index?: number) => void): Array<any>;
    clear(): void;
    clone(): ItemList<T>;
    concat(target: this): ItemList<T>;
    collectionSet(index: number, length: number): void;
    collectionAdd(index: number, length: number): void;
    collectionRemove(index: number, length: number): void;
}

declare type ItemResult = string | number | {
    [prop: string]: any;
};

/**
 * `List` 컴포넌트의 각각의 아이템의 상태를 나타냅니다.
 */
export declare type ItemState<T = any> = {
    /**
     * 해당 아이템을 나타내는 HTMLElement 입니다.
     */
    element?: HTMLElement;
    /**
     * 해당 아이템 객체입니다.
     */
    item?: T;
    /**
     * 해당 아이템 인덱스입니다.
     */
    index?: number;
    /**
     * 해당 아이템이 현재 포커스되었는지를 나타내는 상태입니다.
     */
    focused?: boolean;
    /**
     * 해당 아이템이 선택되었는지를 나타냅니다.
     */
    selected?: boolean;
    /**
     * 해당 아이템 목록의 첫번째 아이템인지를 나타냅니다.
     */
    isFirst?: boolean;
    /**
     * 해당 아이템 목록의 첫번째 아이템인지를 나타냅니다.
     */
    isLast?: boolean;
    /**
     * 해당 아이템이 더미 아이템인지를 나타냅니다.
     * 더미 아이템은 일반적으로 계산 또는 로직 처리를 위한 내부용도로 사용됩니다.
     */
    dummy?: boolean;
};

declare type ItemState_2 = ItemState & {
    label: string;
};

export declare type ItemStateHook<T = any> = (state: ItemState<T>) => Promise<HTMLElement> | void;

declare abstract class Layout {
    protected readonly instance: List;
    protected readonly linearVector: LinearVector;
    protected constructor(instance: List);
    get length(): number;
    set length(value: number);
    getSize(index: number): number;
    setSize(index: number, value: number): boolean;
    getStart(index: number): number;
    indexOf(distance: number): number;
    getTotal(from?: number, to?: number): number;
    clear(): void;
    measureElement(element: HTMLElement): Size;
    abstract updateElementAt(index: number): void;
    abstract setDefaultSize(size: Size): void;
    abstract doUpdate(scrollX: number, scrollY: number, width: number, height: number): void;
    abstract positionToIndex(point: Point): number;
    abstract updateContentSize(): void;
    abstract calculateScrollPositionDelta(index: number, offset: Point): Point;
    abstract collectionReset(): void;
    abstract collectionSet(index: number, length: number): void;
    abstract collectionAdd(index: number, length: number): void;
    abstract collectionRemove(index: number, length: number): void;
}

declare class LinearVector {
    private _defaultSize;
    private _blocks;
    private _gap;
    private _length;
    constructor(length?: number);
    get defaultSize(): number;
    set defaultSize(value: number);
    get length(): number;
    set length(value: number);
    get gap(): number;
    set gap(value: number);
    clear(): void;
    /**
     * 해당 인덱스의 크기 반환합니다.
     * @param index
     */
    getSize(index: number): number;
    /**
     * 해당 인덱스의 크기를 덮어씁니다. 전체 길이 변화는 없습니다.
     * @param index
     * @param value
     */
    setSize(index: number, value: number): boolean;
    /**
     * 해당 인덱스에 크기를 추가합니다. 전체 길이는 +1 합니다.
     * @param index
     * @param value
     */
    addSize(index: number, value: number): void;
    /**
     * 해당 인덱스 삭제합니다. 전체 길이 -1 합니다.
     * @param index
     */
    removeSize(index: number): void;
    /**
     * 해당 길이에 위치한 인덱스를 반환합니다.
     * @param distance
     * @return {number}
     */
    indexOf(distance: number): number;
    /**
     * 해당 인덱스 시작까지의 누적 거리
     * @param index
     */
    getStart(index: number): number;
    getTotal(from?: number, to?: number): number;
    private getBlock;
    private calculateBlockTotal;
    private getBlockValue;
}

/**
 * `List`는 대용량 데이터를 저장하고 관리하는 UI 컴포넌트입니다.
 * 전체 데이터 목록을 한번에 렌더링하지 않고, 사용자에게 보이는 뷰포트 내의 항목만 효율적으로 렌더링합니다.
 * - ItemTemplate 이용하여 각 아이템의 렌더링을 사용자 정의로 쉽게 조작할 수 있게 지원합니다.
 * - 단일 항목 선택 뿐만 아니라, 복수 항목 선택을 지원합니다.
 * - 외부 스크롤 기능도 지원하여, 더 유연한 UI 조작을 가능하게 합니다.
 * - 아이템 조작시(down, click, up) 상호 이벤트를 발생시킵니다.
 */
export declare class List<T = any, EventTypes extends ListEventMap<T> = ListEventMap<T>> extends SelectableElement<T, EventTypes> {
    protected elementList: ItemList<HTMLElement>;
    private pendingElementList;
    private needUpdateTypicalSize;
    private doLayouting;
    private readonly boundCollectionChange;
    protected _collection: IList<T>;
    private groupMap;
    protected rootGroup: Group<T>;
    private _items;
    private _scrollTarget;
    private _layout;
    private _rowCount;
    private _itemTemplate;
    private _groupTemplate;
    private _isExternalScroller;
    private _downIndex;
    private _caretIndex;
    private _hookRenderElement;
    private _hookFreeElement;
    dragDrop: DragDropBase<List<T>, ListDropLocation<T>, T>;
    /**
     * 마우스 클릭시 아이템 선택을 활성합니다. 'false' 경우 마우스 다운시 선택합니다.
     * @default
     */
    selectOnClick: boolean;
    /**
     * 키 입력으로 아이템을 선택합니다. 기본값은 Space(32), Enter(13)
     */
    selectOnKeys: any;
    /**
     * 아이템 선택시 토글(선택/해제) 활성화합니다.
     */
    toggleOnSelect: boolean;
    /**
     * 아이템 선택시 스크롤을 해당위치로 이동합니다.
     */
    scrollViewOnSelect: boolean;
    /**
     * 아이템의 최소 크기를 나타냅니다. 값은 픽셀 단위입니다.
     */
    minItemSize: number;
    /**
     * 아이템 드래그시 보여주는 메시지를 호출하는 함수를 정의합니다.
     */
    hookDragMessage: (event: ListItemDragEventData<T>) => string;
    constructor();
    protected get selectorFactory(): SelectorCtor<T>;
    protected get dragDropFactory(): Constructor<DragDropBase<List, ListDropLocation>>;
    protected get layout(): Layout;
    protected set layout(value: Layout);
    get contentLayer(): HTMLElement;
    /**
     * 배열 타입의 데이터를 관리하는 `ArrayList` 인스턴스를 반환합니다.
     * 반환형은 `IList<T>` 인터페이스이지만, 실제로는 `ArrayList`를 반환합니다.
     */
    get collection(): IList<T>;
    /**
     * 표시되는 아이템의 배열입니다.
     * @return {Array}
     */
    get items(): Array<T>;
    set items(value: Array<T>);
    /**
     * 스크롤을 가지고 있는 HTMLElement 객체입니다.
     */
    get scroller(): HTMLElement;
    /**
     * 외부스크롤 사용했는지 여부를 나타냅니다.
     */
    get isExternalScroller(): boolean;
    /**
     * 아이템 목록의 외부 스크롤을 지정합니다. 아이템 목록을 포함하는 부모노드만 가능합니다.
     */
    get scrollTarget(): DomSelector;
    set scrollTarget(target: DomSelector);
    /**
     * 수직 스크롤 최대 값입니다.
     */
    get maxScrollTop(): number;
    /**
     * 수평 스크롤 최대 값입니다.
     */
    get maxScrollLeft(): number;
    /**
     * 스크롤의 상단 위치를 반환합니다.
     */
    get scrollTop(): number;
    set scrollTop(value: number);
    /**
     * 스크롤의 좌측 위치를 반환합니다.
     */
    get scrollLeft(): number;
    set scrollLeft(value: number);
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
    get itemTemplate(): ElementTemplate<ItemState<T>>;
    set itemTemplate(value: ElementTemplate<ItemState<T>>);
    get groupTemplate(): ElementTemplate;
    set groupTemplate(value: ElementTemplate);
    /**
     * 아이템 목록에 표시되는 최대 아이템 개수입니다.
     */
    get rowCount(): number;
    set rowCount(value: number);
    /**
     * 커서 인덱스입니다.
     */
    get caretIndex(): number;
    set caretIndex(index: number);
    /**
     * 아이템 렌더링 갱신 시 호출되는 함수를 정의합니다.
     * 이 콜백은 아이템이 재렌더링될 때마다 호출되며, 커스텀 처리나 추가적인 로직을 수행할 수 있습니다.
     */
    get hookRenderElement(): ItemStateHook<T>;
    set hookRenderElement(callback: ItemStateHook<T>);
    /**
     * 아이템이 삭제될 때 호출되는 함수를 정의합니다.
     * 이 콜백은 아이템이 메모리에서 해제되기 바로 직전에 호출되며,
     * 아이템의 마지막 상태를 처리하거나 필요한 정리 작업을 수행할 수 있습니다.
     */
    get hookFreeElement(): ItemStateHook<T>;
    set hookFreeElement(callback: ItemStateHook<T>);
    /**
     * List 아이템이 드래그 가능한지 여부를 나타냅니다.
     */
    get draggable(): boolean;
    set draggable(value: boolean);
    /**
     * List 내부의 아이템 또는 다른 List 아이템이 해당 List 위에 드롭 가능한지 여부를 나타냅니다.
     */
    get droppable(): boolean;
    set droppable(value: boolean);
    /**
     * 리스트에 보여지는 첫번째 인덱스를 반환합니다.
     */
    get firstVisibleIndex(): number;
    /**
     * 리스트에 보여지는 마지막 인덱스를 반환합니다.
     */
    get lastVisibleIndex(): number;
    private get isMouseDown();
    protected createCollection(source?: Array<T>): IList<T>;
    protected setCollection(items: Array<T>): void;
    protected doLayout(): void;
    private startLayout;
    private endLayout;
    protected measureSize(): void;
    protected updateTypicalSize(item?: T): Size;
    protected getGroupKey(item: T): any;
    protected createGroup(parent: Group<T>, key: any): Group<T>;
    protected getGroup(item: GroupItem<T>): Group<T>;
    private addElementInGroup;
    private removeElementInGroup;
    protected removeElementAll(): void;
    /**
     * 해당 인덱스의 엘리먼트 생성합니다.
     * @param index
     */
    createElement(index: number): HTMLElement | Promise<HTMLElement>;
    /**
     * 해당 아이템 목록의 자원을 해제합니다.
     */
    freeElements(items: Array<T>): void;
    /**
     * 해당 엘리먼트 자원을 해제하고 보모 엘리먼트로부터 제거합니다.
     */
    freeElement(element: HTMLElement): void;
    /**
     * 해당 인덱스 아이템을 갱신합니다.
     */
    invalidateAt(index: number): void;
    /**
     * 해당 인덱스의 위치로 스크롤합니다. 이미 표시되어 있는 경우 스크롤 되지 않습니다.
     */
    scrollToIndex(index: number): void;
    /**
     * 해당 아이템 위치로 스크롤합니다. 이미 표시되어 있는 경우 스크롤 되지 않습니다.
     */
    scrollToItem(item: T): void;
    /**
     * 해당 인덱스의 엘리먼트를 반환합니다.
     * @param index
     */
    getElementAt(index: number): HTMLElement;
    /**
     * 해당 위치의 아이템 인덱스를 반환합니다.
     * @param globalX 글로벌 좌표 X
     * @param globalY 글로벌 좌표 Y
     */
    getItemIndexByPosition(globalX: number, globalY: number): number;
    /**
     * 해당 위치의 아이템을 반환합니다.
     * @param globalX 글로벌 좌표 X
     * @param globalY 글로벌 좌표 Y
     * @return T
     */
    getItemByPosition(globalX: number, globalY: number): T;
    /**
     * 해당 index 아이템 위치를 반환합니다.
     * @param index 아이템 인덱스
     * @return 아이템 위치
     */
    getItemStart(index: number): number;
    /**
     * 해당 index 아이템 크기를 반환합니다.
     * @param index 아이템 인덱스
     * @returns 아이템 크기
     */
    getItemSize(index: number): number;
    protected doSelectionUpdate(data: SelectionEventData<T>): void;
    protected getItemState(index: number): ItemState<T>;
    protected updateElementState(element: HTMLElement, state: ItemState<T>): void;
    private calculateContentLayerPosition;
    /**
     * 아이템, 선택 목록, 커서 및 스크롤 위치 초기화합니다.
     */
    clear(): void;
    protected commitSelection(index: number, multiple: boolean): void;
    protected commitCaret(index: number): boolean;
    protected moveArrow(event: KeyboardEvent): boolean;
    protected dispatchItemEvent(type: string, item: T, trigger: Event, cancelable?: boolean): boolean;
    private templateToElement;
    /**
     * 해당 이벤트에 위치한 아이템 인덱스를 반환합니다.
     * @param event
     * @protected
     */
    protected mouseEventToIndex(event: MouseEvent): number;
    /**
     * Collection reset event
     * @private
     */
    protected collectionReset(): void;
    /**
     * @private
     */
    protected collectionRefresh(): void;
    protected collectionSet(data: ArrayListEventData<T>): void;
    protected collectionAdd(data: ArrayListEventData<T>): void;
    protected collectionRemove(data: ArrayListEventData<T>): void;
    protected collectionMove(data: ArrayListEventData<T>): void;
    protected onCollectionChange(event: CustomEvent<ArrayListEventData<T>>): void;
    private onScrollerScroll;
    protected onMouseDown(event: MouseEvent): void;
    protected onMouseUp(event: MouseEvent): void;
    protected onKeyDown(event: KeyboardEvent): void;
}

export declare type ListDragEvent<T = any> = DragEvent_2<ListDragSource<T>>;

export declare type ListDragSource<T> = {
    element: HTMLElement;
    item: T;
};

export declare type ListDropLocation<T = any> = {
    dragIndex: number;
    dragItem: T;
    overIndex: number;
    overItem: T;
    overPosition: 'top' | 'middle' | 'bottom';
    dropIndex: number;
};

export declare type ListEventData = {
    kind: 'reset' | 'refresh' | string;
};

export declare type ListEventMap<T> = ArrayListEventMap<T> & SelectionEventMap<T> & ItemDragEventMap<T> & {
    /**
     * 커서 인덱스가 변경되었을때 발생합니다.
     */
    'caret-change': CustomEvent<{
        value: number;
        oldValue: number;
    }>;
    /**
     * 스크롤이 변경되었을때 발생합니다.
     */
    scroll: CustomEvent<{
        oldLeft: number;
        oldTop: number;
        scrollLeft: number;
        scrollTop: number;
        trigger: Event;
    }>;
    /**
     * 아이템에 마우스 다운했을때 발생합니다.
     */
    'item-down': ItemEvent<T>;
    /**
     * 아이템에 마우스 업 했을때 발생합니다.
     */
    'item-up': ItemEvent<T>;
    /**
     * 아이템에 마우스 클릭 했을때 발생합니다.
     */
    'item-click': ItemEvent<T>;
};

declare type ListEvents<T = any> = SelectionEvents<T> & {
    /**
     * 컬렉션 내부의 아이템이 변경되었을 때 발생합니다.
     * - set - 다른 아이템으로 변경
     * - add - 아이템 추가
     * - remove - 아이템 삭제
     * - move - 아이템 이동
     * - update - 아이템 특정 필드 값 변경
     * - reset - 컬렉션 소스 변경
     * - refresh - 컬렉션 필터등 재 갱신
     */
    'collection-change': (event: ArrayListEvent<T>) => void;
    /**
     * 커서 인덱스가 변경되었을때 발생합니다.
     */
    'caret-change': (event: CustomEvent<{
        value: number;
        oldValue: number;
    }>) => void;
    /**
     * 스크롤이 변경되었을때 발생합니다.
     */
    scroll: (event: CustomEvent<{
        oldLeft: number;
        oldTop: number;
        scrollLeft: number;
        scrollTop: number;
        trigger: Event;
    }>) => void;
    /**
     * 아이템에 마우스 다운했을때 발생합니다.
     */
    'item-down': (event: ItemEvent<T>) => void;
    /**
     * 아이템에 마우스 업 했을때 발생합니다.
     */
    'item-up': (event: ItemEvent<T>) => void;
    /**
     * 아이템에 마우스 클릭 했을때 발생합니다.
     */
    'item-click': (event: ItemEvent<T>) => void;
    /**
     * 드래그 준비 되었을때 발생합니다.
     * 드래그를 시작하려는 요소를 사용자가 처음 클릭했을 때 발생합니다.
     */
    'item-drag-ready': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 시작 되었을때 발생합니다.
     */
    'item-drag-start': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 중일 때, 움직임이 감지될 때마다 발생합니다.
     */
    'item-drag-move': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 중인 요소가 특정 영역 위에 이동했을 때 발생합니다.
     */
    'item-drag-over': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 중인 요소가 특정 영역에서 벗어 났을 때 발생합니다.
     */
    'item-drag-out': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 중인 요소가 드랍 가능한 영역 들어 갔을 때 발생합니다.
     */
    'item-drag-enter': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 중인 요소가 드랍 가능 영역에서 밖으로 나갔을 때 발생합니다.
     */
    'item-drag-leave': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 종료되었을 때 발생합니다.
     */
    'item-drag-end': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 취소되었을 때 발생합니다.
     */
    'item-drag-cancel': (event: ListItemDragEvent<T>) => void;
    /**
     * 드래그 중인 요소가 드랍되었을때 발생합니다.
     */
    'item-drop': (event: ListItemDragEvent<T>) => void;
};

export declare type ListEventUpdateData<T> = ListEventData & {
    kind: 'update';
    item: T;
    index: number;
    property: string;
    newValue: any;
    oldValue: any;
};

export declare type ListFindFn<T> = (item: T, index?: number, array?: Array<T>) => boolean;

declare type ListGetters = {
    /**
     * `VxList` 감싸고 있는 List 인스턴스입니다.
     */
    nativeInstance: List;
    /**
     * 배열 타입의 데이터를 관리하는 `ArrayList` 인스턴스를 반환합니다.
     */
    get collection(): ArrayList;
};

export declare type ListItemDragEvent<T = any> = CustomEvent<ListItemDragEventData<T>>;

export declare type ListItemDragEventData<T = any> = DragEventData<ListDragSource<T>> & {
    dropLocation: ListDropLocation<T>;
};

declare interface ListMethods extends MethodOptions {
    [key: string]: any;
    /**
     * 해당 인덱스의 위치로 스크롤합니다. 이미 표시되어 있는 경우 스크롤 되지 않습니다.
     */
    scrollToIndex(index: number): void;
    /**
     * 해당 아이템 위치로 스크롤합니다. 이미 표시되어 있는 경우 스크롤 되지 않습니다.
     */
    scrollToItem(item: ItemResult): void;
    /**
     * 표시 목록을 갱신을 요청합니다.
     */
    invalidate(): void;
    /**
     * 대기중인 표시 목록 갱신을 바로 실행합니다.
     */
    flush(): void;
}

declare type ListPropsType = typeof defaultSelectableProps & typeof defaultListProps;

declare interface ListProvider<T = any> {
    readonly list: List;
    itemToLabel(item: T): string;
}

declare type ListSlot = {
    /**
     * List 기본 슬롯
     */
    default?: ItemState_2;
};

declare class MirrorElement extends Element_2 {
    private readonly debounceUpdate;
    private contentElement;
    private _content;
    private _message;
    private _state;
    constructor(content: ElementTemplate);
    private get contentContainer();
    private get messageContainer();
    /**
     * 드래그 미러 대상
     */
    get content(): ElementTemplate;
    set content(content: ElementTemplate);
    /**
     * 드래그 메세지
     */
    get message(): string;
    set message(value: string);
    /**
     * 드래그 상태
     */
    get state(): DragState;
    set state(value: DragState);
    setContent(content: ElementTemplate): this;
    setMessage(value: string): this;
    setState(value: DragState): this;
    move(x: number, y: number): this;
    protected update(): void;
}

/**
 * @hidden
 */
export declare class MonthTable extends DateTable {
    constructor();
    protected isExtraDate(date: Date): boolean;
    protected updateCurrent(): void;
    protected getPreviousScrollIndex(): number;
    protected getNextScrollIndex(): number;
}

declare type Mounted = {
    refs: {
        [id: string]: HTMLElement;
    };
    root: HTMLElementEx;
};

export declare type NestedNode = {
    popup: Popup;
    parent?: NestedNode;
    children: NestedNode[];
};

declare const otherSuggestProps: {
    suggestCount: {
        type: PropType<number>;
        default: number;
    };
    hookSuggestItems: {
        type: FunctionConstructor;
        default: (items: any) => any;
    };
};

export declare const Parser: {
    build(ctor: ElementCtor, html: string): ElementCtor;
    mount(instance: Element_2): Mounted;
};

export declare type Point = {
    x: number;
    y: number;
};

declare type Policy = 'NONE' | 'ABOVE' | 'BELOW';

/**
 * `Popup`은 화면의 지정된 위치에 콘텐츠를 동적으로 표시하는 컴포넌트입니다.
 * 지정된 타겟 위치에 모달, 툴팁, 드롭다운 메뉴 등의 다양한 팝업 형태로 콘텐츠를 생성하고 표시하는 데 사용됩니다.
 */
export declare class Popup<EventTypes extends PopupEventMap = PopupEventMap> extends Base<EventTypes> {
    private readonly callbackArray;
    private readonly overlay;
    private readonly manager;
    private anchorWatcher;
    private _state;
    private _content;
    private _contentElement;
    private _contentGroup;
    private _anchor;
    private _anchorElement;
    private _oldFocusedElement;
    private _timeoutId;
    backdropTemplate: ElementTemplate;
    /**
     * 팝업 외부 영역에서 마우스 다운 이벤트가 발생했을 때 팝업을 닫을 것인지 결정합니다.
     * 이 속성이 `true`로 설정되면, 팝업 외부에서 마우스 다운 이벤트를 감지하면 팝업이 자동으로 닫힙니다.
     */
    closeOnOutsideDown: boolean;
    /**
     * ESC 키 입력을 감지하여 팝업을 닫을 것인지 결정합니다.
     * 이 속성이 `true`로 설정되면, 사용자가 ESC 키를 눌렀을 때 팝업이 자동으로 닫힙니다.
     */
    closeOnEscape: boolean;
    /**
     * 팝업 컨텐츠 조상엘리먼트에 스크롤 가능할때 스크롤시 해당 팝업 위치를 갱신합니다.
     */
    updateOnScroll: boolean;
    /**
     * 앵커 엘리먼트의 'click' 또는 'over' 이벤트 발생시 자동으로 팝업 엽니다.
     */
    openOnTrigger: AnchorTrigger;
    /**
     * 팝업 컨텐츠 영역에 정의된 이벤트 발생시 팝업을 닫습니다.
     */
    closeOnEvents: any;
    /**
     * 팝업 열릴때 지연 시간(ms)입니다.
     */
    openDelay: number;
    /**
     * 팝업 닫힐때 지연 시간(ms)입니다.
     */
    closeDelay: number;
    /**
     * 모달 팝업 표시 여부입니다.
     */
    modal: boolean;
    /**
     * z-index 항상 최상위 위치에 팝업을 배치합니다.
     */
    alwaysOnTop: boolean;
    /**
     * 다중 팝업이 열려있을때  z-index 우선순위를 정의합니다. 큰 수일수록 최상대에 배치합니다.
     */
    priority: number;
    /**
     * 중첩된 팝업 구조를 관리합니다.
     *
     * - 일반적인 경우, 팝업이 닫히면 연관된(자식) 팝업도 함께 닫힙니다.
     * - 단, `coordinateMode` 값이 `relative` 인 경우에는 값이 `false`여도 해당 팝업은 중첩된 팝업으로 처리됩니다.
     */
    nest: boolean;
    /**
     * 팝업 열릴때 자동으로 팝업 컨텐츠에 포커스를 설정합니다.
     */
    autoFocus: boolean;
    /**
     * 외부 영역 클릭시 자동 닫기 방지위한 유효영역 설정합니다.
     */
    hitAreas: Array<HTMLElement>;
    private readonly debounceUpdateLayout;
    constructor();
    get state(): PopupState;
    get contentElement(): HTMLElement;
    get contentGroup(): HTMLElement;
    get anchorElement(): HTMLElement;
    /**
     * 팝업이 실제로 중첩되어 있는지를 결정합니다.
     * `nest`와 `coordinateMode`의 값을 고려하여 팝업이 실제로 중첩되는지를 나타냅니다.
     */
    get isNested(): Boolean;
    /**
     * 팝업이 열렸는지 닫혔는지를 나타냅니다.
     */
    get isOpened(): boolean;
    set isOpened(value: boolean);
    get isOpenReady(): boolean;
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
    get content(): ContentTemplate;
    set content(content: ContentTemplate);
    /**
     * content 기준으로 정렬할 방향을 지정합니다.
     * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center', 'center' 입니다.
     * @return {AnchorAlign} The content alignment of the overlay.
     */
    get contentAlign(): AnchorAlign;
    set contentAlign(align: AnchorAlign);
    /**
     * 팝업의 좌표 시스템을 설정합니다.
     * - 'global' 팝업을 전역 좌표계에 배치합니다.
     * - 'relative' 팝업을 상대적인 위치에 배치합니다('anchor' 속성이 지정되어 있을때만 가능합니다.).
     * - 'none' 팝업을 상대적인 위치에 배치합니다('fixed' 적용됩니다.)
     * 기본 값은 'relative' 입니다.
     */
    get coordinateMode(): CoordinateMode;
    set coordinateMode(value: CoordinateMode);
    /**
     * 팝업이 열릴 상대적 위치(HTMLElement, DomSelector)를 지정합니다.
     * 설정하지 않으면 기본적으로 최상위 노드(body)가 됩니다.
     */
    get anchor(): DomSelector;
    set anchor(anchor: DomSelector);
    /**
     * anchor 기준으로 정렬할 방향을 지정합니다.
     * 가능한 값은 'left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center', 'center' 입니다
     */
    get anchorAlign(): AnchorAlign;
    set anchorAlign(align: AnchorAlign);
    /**
     * 해당 크기 만큼 팝업 X 위치가 변경됩니다. 단위는 픽셀입니다.
     */
    get offsetX(): number;
    set offsetX(value: number);
    /**
     * 해당 크기만큼 팝업 Y 위치가 변경됩니다. 단위는 픽셀입니다.
     */
    get offsetY(): number;
    set offsetY(value: number);
    /**
     * 컨텐츠가 뷰포트 바깥 영역으로 나감을 방지합니다.
     * 만일 화면크기가 뷰표트 크기보다 클땐 왼쪽상단을 기준으로 맞춥니다.
     */
    get lockOutside(): boolean;
    set lockOutside(value: boolean);
    /**
     * 중첩된 팝업목록을 반환합니다.
     */
    get nestedPopups(): Popup[];
    /**
     * 최상위에 배치 되어있는지 여부입니다.
     */
    get includedOnStage(): boolean;
    setOptions(options?: {}): this;
    setAnchor(anchor: DomSelector): this;
    setContent(content: ContentTemplate): this;
    /**
     * 팝업이 열리고 컨텐츠가 렌더링 되기 전 호출
     * @param callback
     * @returns {Popup}
     */
    opening(callback: Callback<boolean | Promise<boolean> | void>): this;
    /**
     * 팝업이 열리고 컨텐트가 렌더링 후 호출됩니다.
     * @param callback
     * @returns {Popup}
     */
    opened(callback: Callback): this;
    /**
     * 팝업이 닫히기 전에 호출됩니다.
     * @param callback - 팝업이 닫히기 전에 호출되는 콜백 함수입니다. 콜백 함수의 반환 값이 `false`면 팝업의 닫힘이 취소됩니다. 함수의 매개변수 `reason`은 'Popup.close(reason)' 메서드에 전달된 데이터입니다.
     * @returns {Popup}
     */
    closing(callback: (reason: any) => void): this;
    /**
     * 팝업이 닫힐 때 호출됩니다.
     * @param callback - 팝업이 닫힐때 호출되는 콜백 함수입니다. 함수의 매개변수 `reason`은 'Popup.close(reason)' 메서드에 전달된 데이터입니다.
     * @returns {Popup}
     */
    closed(callback: (reason: any) => void): this;
    /**
     * 중첩되어있는 팝업인지 확인합니다.
     * @param popup
     */
    contains(popup: Popup): boolean;
    /**
     * 팝업을 엽니다.
     * @param data
     */
    open(data?: any): this;
    /**
     * 팝업을 닫습니다.
     * @param reason
     * @returns {Popup}
     */
    close(reason?: any): this;
    /**
     * 팝업을 열거나 닫습니다.
     * @param data
     */
    toggle(data?: any): this;
    /**
     * 팝업을 위치를 갱신합니다.
     */
    invalidate(): void;
    /**
     * 팝업 인스턴스가 삭제됩니다.
     * - 팝업이 닫히고 팝업과 연결된 이벤트가 해제됩니다.
     */
    destroy(): void;
    private setState;
    private callbackState;
    private internalSetAnchor;
    private internalOpen;
    private internalClose;
    private closeNestedPopups;
    /**
     *
     * @param template
     * @param data
     * @private
     */
    private templateToHTMLElement;
    /**
     *
     * @private
     */
    private forceBuildContent;
    /**
     * 돔에 팝업 컨텐츠를 마운트합니다.
     * @private
     */
    private mountContent;
    /**
     * 돔에 팝업 컨텐츠를 언마운트합니다.
     * @private
     */
    private unmountContent;
    private destroyContent;
    private watchEvents;
    private setContentFocus;
    /**
     *  팝업 레이아웃 갱신
     * @returns {Popup}
     */
    private updateLayout;
    /**
     * @private
     */
    private watchAnchor;
    private unwatchAnchor;
    static create(options?: PopupOptions): Popup;
}

export declare function popup(content: ContentTemplate, options?: PopupOptions, isOpened?: boolean): Popup;

export declare type PopupEventMap = {};

declare type PopupEvents = {
    /**
     * 팝업이 열릴 때 호출됩니다.
     */
    open: (event: Event) => void;
    /**
     * 팝업이 닫힐 때 호출됩니다.
     */
    close: (event: Event) => void;
    /**
     * 팝업 열기를 취소할 때 호출됩니다.
     */
    'cancel-open': (event: Event) => void;
    /**
     * 팝업 닫기를 취소할 때 호출됩니다.
     */
    'cancel-close': (event: Event) => void;
    /**
     * 팝업의 열림/닫힘 상태가 변경될 때 호출됩니다.
     */
    'update:modelValue': (isOpened: boolean) => void;
};

declare type PopupGetters = {
    /**
     * `VxPopup` 감싸고 있는  Popup 인스턴스입니다.
     */
    nativeInstance: Popup;
    /**
     * 팝업이 열렸는지 닫혔는지를 나타냅니다.
     */
    get isOpened(): boolean;
};

declare interface PopupMethods extends MethodOptions {
    [key: string]: any;
    /**
     * 팝업을 엽니다.
     * @param data `opening`과 `opened` 콜백 함수의 인자로 사용됩니다.
     */
    open(data?: any): PopupMethods;
    /**
     * 팝업을 닫습니다.
     * @param reason `closing`과 `closed` 콜백 함수의 인자로 사용됩니다.
     */
    close(reason?: any): PopupMethods;
    /**
     * 팝업이 열리기 전에 호출됩니다.
     */
    opening(callback: (content: HTMLElement, data: any) => void): PopupMethods;
    /**
     * 팝업이 완전히 열린 후에 호출됩니다.
     * 팝업이 열릴 때, `open` 메소드에 입력된 데이터는 콜백 함수의 인자가 됩니다.
     */
    opened(callback: (content: HTMLElement, data: any) => void): PopupMethods;
    /**
     * 팝업이 닫히기 직전에 호출됩니다.
     * 팝업이 닫힐 때, `close` 메소드에 입력된 데이터는 `reason` 값이 됩니다.
     */
    closing(callback: (reason: any) => void): PopupMethods;
    /**
     * 팝업이 닫히는 인스턴스를 처리합니다.
     * 팝업이 닫길 때, `close` 메소드에 입력된 데이터가 `reason` 값이 됩니다.
     */
    closed(callback: (reason: any) => void): PopupMethods;
    /**
     * 팝업의 열림/닫힘 상태를 전환(toggle)합니다.
     */
    toggle(data?: any): PopupMethods;
    /**
     * 팝업의 위치를 갱신합니다.
     */
    invalidate(): void;
    /**
     * 이 인스턴스와 관련된 모든 구성요소를 제거합니다.
     */
    destroy(): void;
}

export declare type PopupOptions = Partial<typeof Popup.prototype>;

declare type PopupProps = ExtractPropTypes<{}> & typeof defaultPopupProps;

declare type PopupSlot = {
    /**
     * Popup 기본 슬롯
     */
    default?: void;
};

/**
 * @hidden
 */
export declare const enum PopupState {
    ready = "ready",
    opening = "opening",
    opened = "opened",
    closing = "closing",
    closed = "closed"
}

declare type ProgressFn = (...args: any[]) => any;

export declare class ProgressPromise<T = void> {
    private readonly initialized;
    private promise;
    private pendingProgresses;
    private finished;
    protected onProgresses: any[];
    private resolveFn;
    private rejectFn;
    constructor(executor: (resolve: ResolveFn<T>, reject: ReasonFn, progress?: ProgressFn) => void);
    then(onfulfilled?: ((value: T) => any | PromiseLike<any>) | undefined | null, onrejected?: ((reason: any) => any | PromiseLike<any>) | undefined | null): ProgressPromise<T>;
    catch(onrejected?: ((reason: any) => any | PromiseLike<any>) | undefined | null): ProgressPromise<T>;
    finally(onfinally?: (() => void) | undefined | null): ProgressPromise<T>;
    /**
     * 프로미스가 진행될 때 호출되는 콜백 함수를 등록합니다.
     */
    progress(onProgress: ProgressFn | undefined | null): ProgressPromise<T>;
    /**
     * 완료되지 않은 프로미스를 취소합니다.
     */
    cancel(reason?: string): void;
    /**
     * @private
     */
    private clear;
}

declare const Reason: {
    NONE: number;
    RESET: number;
    RESIZE: number;
    SELECT: number;
    SCROLL: number;
    CARET: number;
    ITEM_ADD: number;
    ITEM_REMOVE: number;
    ITEM_UPDATE: number;
    ITEM_MOVE: number;
    FOCUS_IN: number;
    FOCUS_OUT: number;
    LABEL: number;
    VALUE: number;
    PLACEHOLDER: number;
    ATTRIBUTES: number;
    REFRESH: number;
    STATE: number;
    TITLE: number;
    MIN: number;
    MAX: number;
    ALL: number;
};

declare type ReasonFn = (reason?: any) => void;

declare type ReasonType = ValuesType<typeof Reason>;

export declare type Rect = {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
};

declare abstract class Renderer<H, T> extends EventTarget implements IElement {
    readonly root: HTMLElement;
    readonly host: H;
    readonly data: T;
    protected constructor(host: H, root: HTMLElement, data: T);
    abstract created(): void;
    abstract destroy(): void;
    mount(container: DomSelector, options: {}): this;
    unmount(): this;
    setOptions(options: {}): this;
}

declare class RendererFactory<H, R extends Renderer<H, T>, T> {
    readonly factory: Constructor<R>;
    readonly host: H;
    template: ElementTemplate;
    constructor(host: H, factory: Constructor<R>);
    create(item: T, ...args: any[]): R;
}

declare type ResolveFn<T> = (value: T | PromiseLike<T>) => any;

/**
 * @hidden
 */
export declare class SelectableElement<T = any, EventTypes extends EventMap = SelectionEventMap<T>> extends Element_2<EventTypes> {
    protected selector: Selector<T>;
    /**
     * 선택된 아이템의 값을 결정하는 필드의 이름을 정의합니다.
     */
    valueField: string;
    useLazyValue: boolean;
    private pendingFn;
    constructor();
    protected get selectorFactory(): SelectorCtor<T>;
    /**
     * 최소 선택 아이템 개수입니다.
     */
    get minSelection(): number;
    set minSelection(value: number);
    /**
     * 최대 선택 아이템 개수입니다.
     */
    get maxSelection(): number;
    set maxSelection(value: number);
    /**
     * 적어도 하나의 아이템이 항상 선택되어야 하는 여부입니다.
     */
    get requireSelection(): boolean;
    set requireSelection(value: boolean);
    /**
     * 사용자가 여러 항목을 선택할 수 있는지 여부입니다.
     */
    get allowMultiple(): boolean;
    set allowMultiple(value: boolean);
    /**
     * 선택된 아이템을 정의합니다.
     */
    get selectedItem(): T;
    set selectedItem(item: T);
    /**
     * 복수 선택된 아이템을 정의합니다.
     */
    get selectedItems(): Array<T>;
    set selectedItems(items: Array<T>);
    /**
     * 선택된 아이템의 `valueField` 속성 값을 정의합니다
     */
    get selectedValue(): any;
    set selectedValue(value: any);
    /**
     * 선택된 아이템들의 `valueField` 속성 값들로 구성된 배열을 정의합니다.
     */
    get selectedValues(): Array<any>;
    set selectedValues(values: Array<any>);
    protected setSelectedItem(item: T): void;
    protected setSelectedItems(items: Array<T>): void;
    protected setSelectedValues(values: Array<number | string>): void;
    hasSelectedItem(item: T): boolean;
    addSelectedItem(item: T): boolean;
    removeSelectedItem(item: T): boolean;
    toggleSelectedItem(item: T): boolean;
    clearSelection(): void;
    protected dispatchSelectionEvent(type: string, data: SelectionEventData<T>, cancelable?: boolean): boolean;
    protected doSelectionUpdate(data: SelectionEventData<T>): void;
}

export declare type SelectionEvent<T> = CustomEvent<SelectionEventData<T>>;

export declare type SelectionEventData<T> = {
    kind: SelectionKind;
    /**
     * Set, Add, Remove 되는 대상 아이템 목록입니다.
     */
    source: Array<T>;
    /**
     * set, Add, Remove 후 선택된 아이템 목록입니다.
     */
    items: Array<T>;
    /**
     * 이전 선택된 아이템 목록입니다.
     */
    oldItems: Array<T>;
};

export declare type SelectionEventMap<T> = {
    /**
     * 아이템이 선택되기 전에 발생합니다.
     * 이벤트 핸들러에서 이벤트의 `preventDefault` 메소드를 호출하여 선택 작업을 취소할 수 있습니다.
     */
    'selection-changing': SelectionEvent<T>;
    /**
     * 아이템이 선택된 후에 발생합니다.
     */
    'selection-change': SelectionEvent<T>;
    /**
     * @private
     * This event is PRIVATE.
     * 'maxSelection' 프로퍼티가 변경되었을때 호출됩니다.
     */
    'max-selection-change': CustomEvent<number>;
};

declare type SelectionEvents<T = any> = {
    /**
     * 아이템이 선택되기 전에 발생합니다.
     * 이벤트 핸들러에서 이벤트의 `preventDefault` 메소드를 호출하여 선택 작업을 취소할 수 있습니다.
     */
    'selection-changing': (event: SelectionEvent<T>) => void;
    /**
     * 아이템이 선택된 후에 발생합니다.
     */
    'selection-change': (event: SelectionEvent<T>) => void;
};

export declare type SelectionKind = 'set' | 'add' | 'remove' | 'reset';

/**
 * `Selector`는 `ArrayList`와 같은 컬렉션에서 아이템 선택을 관리하는 데 사용되는 클래스입니다.
 * 이 클래스는 컬렉션에서 선택한 아이템을 관리하고, 선택 아이템을 추가, 제거하거나 전체 선택 아이템을 초기화하는 기능을 제공합니다.
 * @hidden
 */
export declare class Selector<T, Collection extends IList<T> = IList<T>> {
    private readonly boundCollectionChange;
    protected _items: Array<T>;
    protected _source: Collection;
    min: number;
    max: number;
    hookChange: Callback;
    hookChanging: Callback<boolean>;
    hookSourceUpdate: Callback;
    constructor(hookChanging?: Callback<boolean>, hookChange?: Callback, hookSourceUpdate?: Callback);
    get items(): Array<T>;
    get source(): Collection;
    set source(source: Collection);
    protected setSource(source: Collection): void;
    indexOf(item: T): number;
    has(item: T): boolean;
    set(items: Array<T>): boolean;
    add(item: T): boolean;
    remove(item: T): boolean;
    toggle(item: T): boolean;
    find(key: string, value: any): T;
    clear(): void;
    private setItems;
    protected onCollectionChange(event: ArrayListEvent<T>): void;
}

export declare type SelectorCtor<T> = Constructor<Selector<T>>;

export declare type Size = {
    width?: number;
    height?: number;
};

declare type SortCompareFn = CompareFn<number | string>;

export declare type SortField = {
    name: string;
    descending?: boolean;
    compare?: SortCompareFn;
    numeric?: boolean;
    ignoreCase?: boolean;
};

export declare type SuggestEvent<T> = CustomEvent<SuggestEventData<T>>;

export declare type SuggestEventData<T> = {
    items?: Array<T>;
    item?: T;
    reason?: any;
};

export declare type SuggestItemState<T = any> = ItemState<T> & {
    text: string;
    html: string;
};

declare class SuggestList<T = any> extends List<T> {
    typicalItemHook: (items: Array<T>) => T;
    constructor();
    protected measureSize(): void;
}

declare type SuggestSource<T> = Array<T> | Callback<Array<T> | Promise<Array<T>>> | Promise<Array<T>> | ProgressPromise<Array<T>>;

export declare type SuggestStateHook = (state: SuggestItemState) => Promise<HTMLElement> | void;

export declare type SuggestTrigger = 'input' | 'list' | null;

/**
 * `Tokenizer`는 `Autocomplete`컴포넌트를 확장하여 사용자가 여러 아이템을 선택하고 관리할 수 있게 하는 UI 컴포넌트입니다.
 * 입력이나 제안 목록에서 선택된 아이템은 '토큰' 형태로 화면에 표시되며 사용자는 이를 개별적으로 삭제할 수 있습니다.
 */
export declare class Tokenizer<T = any, EventTypes extends TokenizerEventMap<T> = TokenizerEventMap<T>> extends Autocomplete<T, EventTypes> {
    private readonly inputSizer;
    private chipMap;
    private typicalChip;
    private doLayouting;
    private _caretSelectedIndex;
    protected chipFactory: RendererFactory<Tokenizer<T>, Chip<T>, T>;
    /**
     * 사용자는 제안 목록에서 값을 선택해서 추가하는 것 외에도,
     * 입력 필드에 직접 값을 입력하여 속성 `delimiterOnKeys` 따라 값을 추가할 수 있습니다.
     * `delimiterOnKeys`의 기본 키코드는 [9, 13]으로, 이는 각각 "Tab", "Enter" 입니다.
     */
    allowInputValue: boolean;
    keyField: string | Callback<string>;
    /**
     * 표시된 아이템의 삭제버튼 활성화 여부입니다.
     */
    chipRemovable: boolean;
    chipTemplate: ElementTemplate;
    constructor();
    get selectedItem(): T;
    set selectedItem(item: T);
    protected doLayout(): void;
    protected internalOpenSuggest(items: Array<T>): void;
    /**
     * 제안목록에 선택된 아이템 갱신
     * @private
     */
    private updateSuggestSelectedItems;
    protected changeInputValue(value: string): boolean;
    protected selectSuggestItem(item: T, trigger?: SuggestTrigger): void;
    protected commitSuggestItem(trigger: SuggestTrigger): boolean;
    /**
     * 지정된 아이템의 'keyField' 속성의 값 반환.
     *  @returns {String}
     */
    protected itemToKey(item: T): string | T;
    protected doSelectionUpdate(data: SelectionEventData<T>): void;
    private generateSelectedItem;
    private startLayout;
    private endLayout;
    private measureInputElement;
    protected updateChipFactory(): boolean;
    protected createChips(): void;
    protected createChip(item: T, index: number): Chip<T>;
    private freeChip;
    private setActiveSelectedElements;
    private commitCaretIndex;
    private moveLeft;
    private moveRight;
    private backspace;
    private delete;
    /**
     *
     * @param event
     * @override
     */
    protected adjustNavigation(event: KeyboardEvent): void;
    protected onInputChanged(): void;
    private onChipRemove;
}

export declare type TokenizerEventMap<T> = AutocompleteEventMap<T> & {
    /**
     * 토큰 아이템 추가시 발생합니다.
     */
    'suggest-add': SuggestEvent<T>;
    /**
     * 토큰 아이템 삭제시 발생합니다.
     */
    'suggest-remove': SuggestEvent<T>;
    /**
     * 토큰 아이템 추가시 중복된 아이템이 있을때 발생합니다.
     */
    'suggest-duplicate': SuggestEvent<T>;
};

declare type TokenizerEvents<T = any> = AutocompleteEvents<T> & {
    /**
     * 토큰 아이템 추가시 발생합니다.
     */
    'suggest-add': (event: SuggestEvent<T>) => void;
    /**
     * 토큰 아이템 삭제시 발생합니다.
     */
    'suggest-remove': (event: SuggestEvent<T>) => void;
    /**
     * 토큰 아이템 추가시 중복된 아이템이 있을때 발생합니다.
     */
    'suggest-duplicate': (event: SuggestEvent<T>) => void;
};

declare type TokenizerGetters = {
    /**
     * `VxTokenizer` 감싸고 있는 Tokenizer 인스턴스입니다.
     */
    nativeInstance: Tokenizer;
};

declare interface TokenizerMethods extends AutocompleteMethods {
}

declare type TokenizerPropsType = typeof defaultInputProps & typeof defaultSuggestProps & typeof defaultSelectableProps & typeof defaultTokenizerProps;

declare interface TokenizerProvider extends AutocompleteProvider {
}

declare type TokenizerSlots = AutocompleteSlot & {
    /**
     * 칩 슬롯
     */
    chip?: {
        item: any;
        label: string;
        remove: () => void;
    };
};

export declare function toSortPriorityKeys(options?: {}, map?: {
    items: number;
    suggestSource: number;
    selectedItem: number;
    selectedItems: number;
    selectedValue: number;
    selectedValues: number;
}): Array<string>;

/**
 * `Tree`는 계층형 데이타를 보여주며 `List`컴포넌트 특성을 상속하는 UI 컴포넌트입니다.
 */
export declare class Tree<T = any, EventTypes extends TreeEventMap<T> = TreeEventMap<T>> extends List<T, EventTypes> {
    private readonly boundOnNodeChange;
    private _childrenField;
    /**
     * `items`가 갱신될 때 자동으로 확장될 아이템의 레벨을 지정합니다.
     * 예를 들어, 이 속성의 값이 2인 경우, `items`가 갱신될 때 2번째 레벨까지 모든 아이템이 자동으로 확장됩니다.
     */
    autoExpandLevel: number;
    constructor();
    protected get selectorFactory(): SelectorCtor<T>;
    protected get dragDropFactory(): Constructor<DragDropBase<Tree, TreeDropLocation>>;
    /**
     * 계층 구조를 가진 아이템 배열을 관리하는 `HierarchyList` 인스턴스를 반환합니다.
     */
    get collection(): HierarchyList<T>;
    /**
     * 트리 구조에서 아이템의 자식 목록을 포함하는 필드의 이름을 정의합니다.
     */
    get childrenField(): string;
    set childrenField(value: string);
    protected createCollection(source?: Array<T>): IList<T>;
    protected setCollection(items: Array<T>): void;
    protected getItemState(index: number): TreeItemState<T>;
    protected updateElementState(element: HTMLElement, state: TreeItemState<T>): void;
    protected getGroupKey(item: T): any;
    protected createGroup(parent: Group<T>, key: any): Group<T>;
    /**
     * 지정된 노드의 부모 노드를 반환합니다.
     */
    getParentNode(node: T): T;
    /**
     * 해당 노드의 조상 노드 목록을 반환합니다.
     * @param node
     * @returns {Array}
     */
    getAncestorNodes(node: T): Array<T>;
    /**
     * 해당 노드의 후손 노드 목록을 반환합니다. null 이면 전체 노드를 반환합니다.
     * @param node
     * @returns {Array}
     */
    getDescendantNodes(node: T): Array<T>;
    /**
     * 해당노드의 형제노드들을 반환합니다.
     * @returns {Array} 형제노드 배열입니다.
     */
    getSiblingNodes(node: T): Array<T>;
    /**
     * 지정된 노드의 자식노드들을 반환합니다.
     * @param node 부모 노드입니다.
     */
    getChildren(node: T): Array<T>;
    /**
     * 해당 노드에 자식이 있는지 여부입니다.
     * @param node
     */
    hasChildren(node: T): boolean;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 `null`이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param node 추가할 자식 노드
     *
     */
    addNode(parent: T, node: T): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
     * 부모 노드가 `null`이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param node 추가할 자식 노드.
     * @param index 자식 노드 삽입 위치의 인덱스.
     */
    addNodeAt(parent: T, node: T, index: number): boolean;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 `null`이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param nodes 추가할 자식 노드 목록
     *
     */
    addNodes(parent: T, nodes: Array<T>): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
     * 부모 노드가 null 이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param nodes 추가할 자식 노드 목록
     * @param index 자식 노드 삽입 위치의 인덱스.
     */
    addNodesAt(parent: T, nodes: Array<T>, index: number): boolean;
    /**
     * 부모 노드에서 자식 노드를 삭제합니다.
     * @param node 삭제할 자식 노드 입니다.
     */
    removeNode(node: T): boolean;
    /**
     * 해당 노드가 있는지 확인합니다.
     * @param node
     * @return 있으면 true,
     */
    contains(node: T): boolean;
    /**
     * 해당 노드가 확장되어 있는지 여부입니다.
     */
    isExpandedNode(node: T): boolean;
    /**
     * 지정된 노드를 확장합니다.
     */
    expandNode(node: T): boolean;
    /**
     * 전체 노드를 확장합니다.
     */
    expandAll(): void;
    /**
     * 지정된 노드를 축소합니다.
     */
    collapseNode(node: T): boolean;
    /**
     * 전체 노드를 축소합니다.
     */
    collapseAll(): void;
    /**
     * 주어진 노드의 확장 상태를 확장 또는 축소합니다.
     * @param node
     */
    toggleNode(node: T): void;
    /**
     * 확장된 노드를 설정합니다.
     * @param nodes
     */
    setExpandedNodes(nodes: Array<T>): void;
    /**
     * 확장된 노드목록을 반환합니다.
     * @returns {Array}
     */
    getExpandedNodes(): Array<T>;
    /**
     * 지정된 노드의 레벨을 반환합니다.
     */
    getNodeLevel(node: T): number;
    /**
     * 해당 노드가 가지노드(자식 노드를 가진 노드)인지 확인합니다.
     * @param node
     */
    isBranchNode(node: T): boolean;
    /**
     * 주어진 노드가 마지막노드(자식 노드를 가지지 않는 노드)인지 확인합니다.
     * @param node
     */
    isLeafNode(node: T): boolean;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 `true`를 반환하는 모든 항목이 포함된 새 배열을 만듭니다
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return true 를 반환하는 항목의 배열입니다.
     */
    find(callback: HierarchyFindFn<T>, prefetchNode?: T, postOrder?: boolean): Array<T>;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 처음으로 `true`를 반환하는 항목을 반환하고 탐색을 중지합니다.
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return 처음으로 `true` 반환하는 아이템입니다.
     */
    findOne(callback: HierarchyFindFn<T>, prefetchNode?: T, postOrder?: boolean): T;
    protected collectionReset(): void;
    protected onNodeChange(event: CustomEvent<HierarchyListEventData<T>>): void;
}

export declare class TreeDragDrop<T = any> extends DragDropBase<Tree<T>, TreeDropLocation<T>, T> {
    private expandId;
    constructor(target: Tree);
    onDragOver(event: ListDragEvent<T>): void;
    protected calculateDropLocation(event: ListDragEvent<T>): TreeDropLocation;
    protected validDropLocation(dropLocation: TreeDropLocation): boolean;
    protected showDropIndicator(dropLocation: TreeDropLocation): HTMLElement;
    protected applyDrop(dropLocation: TreeDropLocation): void;
    private startExpandNode;
}

export declare type TreeDropLocation<T = any> = ListDropLocation<T> & {
    dropParentItem: T;
};

export declare type TreeEventMap<T> = ListEventMap<T> & HierarchyListEventMap<T> & {};

declare type TreeEvents<T = any> = ListEvents<T> & {
    /**
     * 컬렉션 내부의 노드 변경되었을 때  발생합니다.
     * - collapsing - 노드 접혀지기 전
     * - collapse - 노드 접혀진 후
     * - expanding - 노드 확장되기 전
     * - expand - 노드 확장된 후
     * - add - 노드 추가
     * - remove - 노드 삭제
     * - move - 노드 이동
     */
    'node-change': (event: HierarchyListEvent<T>) => void;
};

declare type TreeGetters = {
    /**
     * `VxTree` 감싸고 있는 Tree 인스턴스입니다.
     */
    nativeInstance: Tree;
    /**
     * 계층 구조를 가진 아이템 배열을 관리하는 `HierarchyList` 인스턴스를 반환합니다.
     */
    get collection(): HierarchyList<any>;
};

declare type TreeItem = {
    [key: string]: any;
    children?: Array<TreeItem>;
};

export declare type TreeItemDragEventData<T = any> = ListItemDragEventData<T> & {
    dropLocation: TreeDropLocation<T>;
};

/**
 * 'Tree' 컴포넌트의 각각의 아이템(노드)의 상태를 나타냅니다.
 */
export declare type TreeItemState<T = any> = ItemState<T> & {
    /**
     * 해당 노드의 트리에서의 레벨(깊이)를 나타냅니다. 트리의 최상단 노드는 레벨 0 입니다.
     */
    level?: number;
    /**
     * 해당 노드가 자식 노드를 가지고 있는지를 나타냅니다.
     */
    hasChildren?: boolean;
    /**
     * 트리 구조에서 해당 노드가 확장되어 있는지를 나타냅니다.
     */
    isExpanded?: boolean;
    /**
     * 해당 노드가 가지를 나타내는 노드인지를 나타냅니다.
     */
    isBranch?: boolean;
    /**
     * 해당 노드가 마지막(Leaf) 노드인지를 나타냅니다.
     */
    isLeaf?: boolean;
};

declare type TreeItemState_2 = TreeItemState & {
    label: string;
    /**
     * 해당노드를 쉽게 확장/축소을 변경하기 위한 훅입니다.
     * @param item
     */
    hookToggle: (item: ItemResult) => void;
};

declare interface TreeMethods extends ListMethods {
    /**
     * 지정된 노드의 부모 노드를 반환합니다.
     */
    getParentNode(node: TreeItem): TreeItem;
    /**
     * 해당 노드의 조상 노드 목록을 반환합니다.
     * @param node
     * @returns {Array}
     */
    getAncestorNodes(node: TreeItem): Array<TreeItem>;
    /**
     * 해당 노드의 후손 노드 목록을 반환합니다. `null` 이면 전체 노드를 반환합니다.
     * @param node
     * @returns {Array}
     */
    getDescendantNodes(node: TreeItem): Array<TreeItem>;
    /**
     * 해당노드의 형제노드들을 반환합니다.
     * @returns {Array} 형제노드 배열입니다.
     */
    getSiblingNodes(node: TreeItem): Array<TreeItem>;
    /**
     * 지정된 노드의 자식노드들을 반환합니다.
     * @param node 부모 노드입니다.
     */
    getChildren(node: TreeItem): Array<TreeItem>;
    /**
     * 해당 노드에 자식이 있는지 여부입니다.
     * @param node
     */
    hasChildren(node: TreeItem): boolean;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param node 추가할 자식 노드
     *
     */
    addNode(parent: TreeItem, node: TreeItem): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param node 추가할 자식 노드.
     * @param index 자식 노드 삽입 위치의 인덱스.
     */
    addNodeAt(parent: TreeItem, node: TreeItem, index: number): boolean;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param nodes 추가할 자식 노드 목록
     *
     */
    addNodes(parent: TreeItem, nodes: Array<TreeItem>): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
     * 부모 노드가 `null` 이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param nodes 추가할 자식 노드 목록
     * @param index 자식 노드 삽입 위치의 인덱스.
     */
    addNodesAt(parent: TreeItem, nodes: Array<TreeItem>, index: number): boolean;
    /**
     * 부모 노드에서 자식 노드를 삭제합니다.
     * @param node 삭제할 자식 노드 입니다.
     */
    removeNode(node: TreeItem): boolean;
    /**
     * 해당 node가 있는지 확인합니다.
     * @param node
     * @return 있으면 true,
     */
    contains(node: TreeItem): boolean;
    /**
     * 해당 노드가 확장되어 있는지 여부입니다.
     */
    isExpandedNode(node: TreeItem): boolean;
    /**
     * 지정된 노드를 확장합니다.
     */
    expandNode(node: TreeItem): boolean;
    /**
     * 전체 노드를 확장합니다.
     */
    expandAll(): void;
    /**
     * 지정된 노드를 축소합니다.
     */
    collapseNode(node: TreeItem): boolean;
    /**
     * 전체 노드를 축소합니다.
     */
    collapseAll(): void;
    /**
     * 주어진 노드의 확장 상태를 확장 또는 축소합니다.
     * @param node
     */
    toggleNode(node: TreeItem): void;
    /**
     * 확장된 노드를 설정합니다.
     * @param nodes
     */
    setExpandedNodes(nodes: Array<TreeItem>): void;
    /**
     * 확장된 노드목록을 반환합니다.
     * @returns {Array}
     */
    getExpandedNodes(): Array<TreeItem>;
    /**
     * 지정된 노드의 레벨을 반환합니다.
     */
    getNodeLevel(node: TreeItem): number;
    /**
     * 해당 노드가 가지노드(자식 노드를 가진 노드)인지 확인합니다.
     * @param node
     */
    isBranchNode(node: TreeItem): boolean;
    /**
     * 주어진 노드가 마지막노드(자식 노드를 가지지 않는 노드)인지 확인합니다.
     * @param node
     */
    isLeafNode(node: TreeItem): boolean;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 `true` 반환하는 모든 항목이 포함된 새 배열을 만듭니다
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return true 반환하는 항목의 배열입니다.
     */
    find(callback: HierarchyFindFn<TreeItem>, prefetchNode?: TreeItem, postOrder?: boolean): Array<TreeItem>;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 처음으로 `true` 반환하는 항목을 반환하고 탐색을 중지합니다.
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return 처음으로 true 반환하는 아이템입니다.
     */
    findOne(callback: HierarchyFindFn<TreeItem>, prefetchNode?: TreeItem, postOrder?: boolean): TreeItem;
}

declare type TreePropsType = typeof defaultSelectableProps & typeof defaultListProps & typeof defaultTreeProps;

declare interface TreeProvider<TreeItem = any> extends ListProvider<TreeItem> {
    readonly list: Tree;
}

declare type TreeSlot = {
    /**
     * Tree 기본 슬롯
     */
    default?: TreeItemState_2;
};

export declare const util: {
    delayTime(delay: number): ProgressPromise<void>;
    delayFrame(count: number): ProgressPromise<void>;
    escapeRegExp(text?: string): string;
    cache<T>(fn: Callback<T>): Callback<T>;
    debounce(fn: Callback, context?: any, delay?: number): CancelableCallback;
    throttle(func: Callback, context?: any, delay?: number): CancelableCallback;
    getValue<T_1, V>(item: T_1, path: string | string[]): V;
    setValue<T_2 extends Object, V_1 = any>(item: T_2, path: string | string[], value: V_1): boolean;
    includesArray<T_3>(source: T_3[], target: T_3[], isStrict?: boolean): boolean;
    treeSearchOnce<T_4>(items: T_4[], callback: Callback<boolean>, childField?: string): T_4;
    watchEvent(target: EventTarget, type: string, listener: Callback, options?: boolean | AddEventListenerOptions): Callback;
    watchEventOnce(target: EventTarget, type: string, listener: Callback, options?: boolean | AddEventListenerOptions): Callback;
    highlight(text: string, search: string, tagTemplate: string): string;
    treeSearch: <T_5>(items: T_5[], callback: Callback<boolean>, childField?: string, once?: boolean) => T_5[];
    isBrowser: {
        ie: boolean;
    };
    buildHTML(value: ElementTemplate, ...args: any[]): HTMLElement;
    ready(context?: Document): Promise<Document>;
    findElement(selector: DomSelector, context?: Document): HTMLElement;
    addClass(element: HTMLElement, ...name: string[]): boolean;
    removeClass(element: HTMLElement, name: string): boolean;
    toggleClass(element: HTMLElement, name: string, bool: boolean): boolean;
    setAttribute(element: HTMLElement, name: string, value?: string): boolean;
    removeAttribute(element: HTMLElement, name: string): boolean;
    toggleAttribute(element: HTMLElement, name: string, value: string | boolean): boolean;
    isEditableElement(element: HTMLElement): boolean;
    isScrollableX(element: HTMLElement): boolean;
    isScrollableY(element: HTMLElement): boolean;
    findScroller(element: HTMLElement): HTMLElement;
    setX(element: HTMLElement, value: number): boolean;
    setY(element: HTMLElement, value: number): boolean;
    setWidth(element: HTMLElement, value: number): boolean;
    setHeight(element: HTMLElement, value: number): boolean;
    setSize(element: HTMLElement, width: number, height: number): boolean;
    HIDDEN_CSS: "width: auto; height: auto; overflow: hidden; position: fixed;visibility: hidden; top: -99999px; left: -99999px;";
};

declare type VAlign = (typeof VAlignArray)[number];

declare const VAlignArray: readonly ["top", "center", "bottom"];

export declare const VxAutocomplete: DefineComponent<AutocompletePropsType, {}, AutocompleteGetters, {}, AutocompleteMethods, {}, {}, AutocompleteEvents<any>, string, PublicProps, ExtractPropTypes<AutocompletePropsType>, ExtractPropTypes<AutocompletePropsType>, SlotsType<AutocompleteSlot>>;

export declare const VxAutocompleteSymbol: InjectionKey<AutocompleteProvider>;

export declare const VxCombobox: DefineComponent<ComboboxPropsType, {}, ComboboxGetters, {}, ComboboxMethods, {}, {}, ComboboxEvents<any>, string, PublicProps, ExtractPropTypes<ComboboxPropsType>, ExtractPropTypes<ComboboxPropsType>, SlotsType<ComboboxSlots>>;

export declare const VxComboboxSymbol: InjectionKey<ComboboxProvider>;

export declare const VxDateChooser: DefineComponent<DateChooserPropsType, {}, DateChooserGetters, {}, DateChooserMethods, {}, {}, DateChooserEvents, string, PublicProps, ExtractPropTypes<DateChooserPropsType>, ExtractPropTypes<DateChooserPropsType>, SlotsType<DateChooserSlot>>;

export declare const VxDateChooserSymbol: InjectionKey<DateChooserProvider>;

export declare const VxDatePicker: DefineComponent<DatePickerPropsType, {}, DatePickerGetters, {}, DatePickerMethods, {}, {}, DatePickerEvents, string, PublicProps, ExtractPropTypes<DatePickerPropsType>, ExtractPropTypes<DatePickerPropsType>, SlotsType<DateChooserSlot>>;

export declare const VxDatePickerSymbol: InjectionKey<DatePickerProvider>;

export declare const VxList: DefineComponent<ListPropsType, {}, ListGetters, {}, ListMethods, {}, {}, ListEvents<any>, string, PublicProps, ExtractPropTypes<ListPropsType>, ExtractPropTypes<ListPropsType>, SlotsType<ListSlot>>;

export declare const VxListSymbol: InjectionKey<ListProvider>;

export declare const VxPopup: DefineComponent<PopupProps, {}, PopupGetters, {}, PopupMethods, {}, {}, PopupEvents, string, PublicProps, ExtractPropTypes<PopupProps>, ExtractPropTypes<PopupProps>, SlotsType<PopupSlot>>;

export declare const VxPopupSymbol: InjectionKey<Popup>;

export declare const VxTokenizer: DefineComponent<TokenizerPropsType, {}, TokenizerGetters, {}, TokenizerMethods, {}, {}, TokenizerEvents<any>, string, PublicProps, ExtractPropTypes<TokenizerPropsType>, ExtractPropTypes<TokenizerPropsType>, SlotsType<TokenizerSlots>>;

export declare const VxTokenizerSymbol: InjectionKey<TokenizerProvider>;

export declare const VxTree: DefineComponent<TreePropsType, {}, TreeGetters, {}, TreeMethods, {}, {}, TreeEvents<any>, string, PublicProps, ExtractPropTypes<TreePropsType>, ExtractPropTypes<TreePropsType>, SlotsType<TreeSlot>>;

export declare const VxTreeSymbol: InjectionKey<TreeProvider>;

declare type WeekLabels = typeof DEFAULT_WEEK_LABELS;

/**
 * @hidden
 */
export declare class YearTable extends DateTable {
    constructor();
    protected isExtraDate(date: Date): boolean;
    protected updateCurrent(): void;
    protected getPreviousScrollIndex(): number;
    protected getNextScrollIndex(): number;
}

export { }


declare module '@vue/runtime-core' {
    interface ComponentCustomOptions {
        prepare?(state: ItemState): void;
    }
    interface ComponentCustomProperties {
    }
    interface GlobalComponents {
        VxList: typeof VxList;
        VxTree: typeof VxTree;
        VxPopup: typeof VxPopup;
        VxAutocomplete: typeof VxAutocomplete;
        VxTokenizer: typeof VxTokenizer;
        VxCombobox: typeof VxCombobox;
        VxDateChooser: typeof VxDateChooser;
        VxDatePicker: typeof VxDatePicker;
    }
}

