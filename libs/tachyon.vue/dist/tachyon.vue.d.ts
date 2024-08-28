import { AnyDefineComponent } from '../../../../src/util/componentWrapper';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { InjectionKey } from 'vue';
import { MethodOptions } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import { SetupContext } from 'vue';
import { ShallowRef } from 'vue';
import { SlotsType } from 'vue';
import { TreeRendererCellState } from '../../../../src/components/defines/state';
import { TreeState as TreeState_2 } from '../../../../src/components/defines/state';

export declare namespace addon {
        { addon_d_IAddon as IAddon, addon_d_add as add, addon_d_createFactory as createFactory, addon_d_get as get, addon_d_getAddons as getAddons, addon_d_remove as remove };
}

declare class AddonHelper {
    constructor(grid: any);
    grid: any;
    _addons: any[];
    getAddons(): any[];
    getAddon(name: any): any;
    addAddon(name: any, scope: any): void;
    /**
     * addon 인스턴스를 생성합니다.
     * @param factory
     * @returns {*}
     * @private
     */
    private _createAddon;
    _onDataGroupRender(event: any): void;
}

/**
 * ArrayList 클래스는 데이터의 소스로 배열을 관리하는 IList를 구현합니다.
 * 내부 배열은 List 인터페이스의 메서드 및 속성을 사용하여 추가, 삭제, 변경 할 수 있습니다.
 */
export declare class ArrayList extends IList {
    constructor(source: any);
    /**
     * 'source' 기준으로 콜백함수를 배열 요소 각각에 대해 실행합니다.
     * @param callback
     */
    forEach(callback: any): void;
    /**
     * 아이템을 맨끝 위치에 추가합니다.
     * @param item
     * @returns {boolean}
     */
    add(item: any): boolean;
    /**
     * 지정된 인덱스에 아이템을 추가합니다.
     * @param index
     * @param item
     * @returns {boolean}
     */
    addAt(index: any, item: any): boolean;
    /**
     * 항목 목록을 맨끝 위치부터 추가합니다.
     * @param items
     */
    addAll(items: any): void;
    /**
     * 항목 목록을 지정된 위치부터 추가합니다.
     * @param index
     * @param items
     */
    addAllAt(index: any, items: any): void;
    /**
     * 아이템을 삭제합니다.
     * @param item
     * @returns {boolean}
     */
    remove(item: any): boolean;
    /**
     * 항목 목록을 삭제합니다.
     * @param items
     * @returns {boolean}
     */
    removeAll(items: any): boolean;
    /**
     * 지정된 위치의 아이템을 삭제합니다.
     * @param index
     * @returns {Array}
     */
    removeAt(index: any): any[];
    /**
     * 지정된 위치에 아이템을 덮어씁니다.
     * @param index
     * @param item
     * @returns {boolean}
     */
    set(index: any, item: any): boolean;
    /**
     * 배열의 'from' 항목을 'to' 위치에 이동합니다.
     * @param from
     * @param to
     * @returns {boolean}
     */
    move(from: any, to: any): boolean;
    /**
     * @private
     */
    private _findInsertIndex;
}

declare type ArrayListEvent = CustomEvent<{
    kind: ArrayListKind;
    items?: Array<object>;
    index?: number;
    oldIndex?: number;
}>;

declare type ArrayListKind = 'reset' | 'refresh' | 'set' | 'add' | 'remove' | 'move' | 'update';

declare class Base {
    static withDom(html: any): typeof Base;
    static withBehavior(...behaviors: any[]): typeof Base;
    get htmlElement(): any;
}

declare class Block {
    constructor(index: any, factory: any);
    _index: any;
    _itemFactory: any;
    _items: any[];
    _total: number;
    _empty: number;
    get empty(): number;
    getTotal(): number;
    getItem(index: any): any;
    addSize(index: any, value: any): void;
    removeSize(index: any): any;
    getSize(index: any): any;
    setSize(index: any, value: any): any;
}

declare class Cell {
    item: any;
    column: any;
    hovered: boolean;
    selected: boolean;
    value: any;
    label: any;
    renderer: any;
    visible: boolean;
}

/**
 * CellPosition 클래스는 데이타 그리드를 구성하는 셀의 위치, 크기를 정의합니다.
 */
export declare class CellPosition extends Rectangle {
    static create(cell: any): CellPosition;
    constructor(rowIndex: any, columnIndex: any, endRowIndex: any, endColumnIndex: any, isCrossed: any);
    set rowIndex(arg: number);
    /**
     * 셀의 상단 행 인덱스입니다.
     * @returns {number}
     */
    get rowIndex(): number;
    set columnIndex(arg: number);
    /**
     * 셀의 좌측 컬럼 인덱스입니다.
     * @returns {number}
     */
    get columnIndex(): number;
    set endRowIndex(arg: number);
    /**
     * 셀의 하단 행 인덱스입니다.
     * @returns {number}
     */
    get endRowIndex(): number;
    set endColumnIndex(arg: number);
    /**
     * 셀의 우측 컬럼 인덱스입니다.
     * @returns {number}
     */
    get endColumnIndex(): number;
    /**
     * 교차 변합된 셀인지 확인합니다.TreeGrid 'box'모드에서 사용됩니다.
     * @returns {boolean}
     */
    isCrossed: boolean;
    /**
     * 셀의 행 개수입니다.
     * @returns {number}
     */
    get rowCount(): number;
    /**
     * 셀의 컬럼 개수입니다.
     * @returns {number}
     */
    get columnCount(): number;
    /**
     * 병합된 셀인지 확인합니다.
     * @returns {boolean}
     */
    get isMerged(): boolean;
    /**
     * 객체의 복사본을 만듭니다.
     * @returns {CellPosition}
     */
    clone(): CellPosition;
    toPosition(): string;
    valueOf(): {
        rowIndex: number;
        columnIndex: number;
        endRowIndex: number;
        endColumnIndex: number;
        rowCount: number;
        columnCount: number;
        isCrossed: boolean;
    };
    toJSON(): {};
}

export declare type CellState = {
    /**
     * 셀 위치(인덱스)
     */
    cellPosition: CellPosition;
    /**
     * 셀의 컬럼
     */
    column: GridColumn;
    /**
     * 마우스 커서 오버 여부
     */
    hovered: boolean;
    /**
     * 선택 여부
     */
    selected: boolean;
    /**
     * 셀의 행 아이템
     */
    item: object;
    /**
     * 셀의 원본데이타
     */
    value: any;
    /**
     * 셀에 표시되는 텍스트
     */
    label: string;
    renderer?: HTMLElement;
};

export declare type ColumnPropsType = typeof defaultColumnProps;

export declare function config(config: any): void;

declare class DataCell extends Cell {
    constructor(item: any, column: any, cellPosition: any);
    cellPosition: any;
    get isMerged(): any;
}

declare class DataDimensions {
    constructor(dataGroup: any);
    dataGroup: any;
    columnLinearVector: LinearVector;
    rowLinearVector: RowLinearVector;
    _columnIndices: any[];
    _columnLayouts: any[];
    _oldColumnIndices: any[];
    _rows: any[];
    _rowIndices: any[];
    _mergeCells: any[];
    _mergeCellPositions: any[];
    _mergeCellLayouts: any[];
    _pendingRows: any[];
    _pendingIndices: any[];
    _pendingMergeCellPositions: any[];
    _visibleFrozenIndexRect: Rectangle;
    _visibleFrozenSizeRect: Rectangle;
    get columnIndices(): any[];
    get columnLayouts(): any[];
    get oldColumnIndices(): any[];
    get mergeCellLayouts(): any[];
    get rows(): any[];
    get rowIndices(): any[];
    get mergeCellPositions(): any[];
    get mergeCells(): any[];
    get cells(): any;
    get visibleFrozenIndexRect(): Rectangle;
    get visibleFrozenSizeRect(): Rectangle;
    get firstColumnIndex(): any;
    get lastColumnIndex(): any;
    get isColumnChanging(): boolean;
    getRowDefaultHeight(): number;
    setRowDefaultHeight(value: any): void;
    setRowSize(value: any): void;
    createRow(index: any): Row;
    /**
     * index 행 반환
     * @param index
     */
    getRow(index: any): any;
    getRowIndexOf(row: any): any;
    setRow(index: any, row: any, height: any): void;
    /**
     * 지정된 인덱스 행정보를 삭제 후 반환합니다. 전체 행의 위치와 개수는 변하지 않습니다.
     * @param index
     * @returns {null|*}
     */
    takeRow(index: any): null | any;
    insertRow(index: any, row: any, height: any): boolean;
    /**
     * 지정된 인덱스 행정보를 삭제 후 반환합니다. 행의 개수와 각 인덱스는 변경됩니다.
     * @param index
     * @returns {null|*}
     */
    removeRow(index: any): null | any;
    insertColumn(index: any): void;
    removeColumn(index: any): any[];
    createCell(item: any, column: any, cellPosition: any): DataCell;
    getCell(rowIndex: any, columnIndex: any): any;
    getMergeCell(cellPosition: any): any;
    removeMergeCellPosition(cellPosition: any): any;
    hasPendingMergeCellPosition(cellPosition: any): boolean;
    setMergeCell(cellPosition: any, cell: any): void;
    /**
     * 지정된 행의 위치 정보를 반환
     * @param rowIndex
     * @returns {*}
     */
    getRowLayout(rowIndex: any): any;
    /**
     * 지정된 컬럼의 위치 정보를 반환
     * @param columnIndex
     * @returns {*}
     */
    getColumnLayout(columnIndex: any): any;
    getColumnLayouts(from: any, to: any): any;
    /**
     * 지정된 셀의 위치 정보 반환
     * @param rowIndex
     * @param columnIndex
     * @returns {{}|null}
     */
    getCellLayout(rowIndex: any, columnIndex: any): {} | null;
    getCellLayoutByCellPosition(cellPosition: any): any;
    calculateCellLayoutByCellPosition(cellPosition: any): {};
    isVisibleRow(rowIndex: any): boolean;
    isVisibleColumn(columnIndex: any): boolean;
    isVisiblePosition(rowIndex: any, columnIndex: any): boolean;
    /**
     *
     */
    isVisibleCell(cellPosition: any): boolean;
    /**
     * 지정된 행을 구성하는 셀 목록을 반환
     * @param index
     * @returns {*}
     */
    getCellsByRow(index: any): any;
    /**
     * 지정된 컬럼을 구성하는 셀 목록을 반환
     * @param index
     * @returns {*}
     */
    getCellsByColumn(index: any): any;
    /**
     * 주어진 callback 함수를 행 위치데이타 각각에 대해 실행합니다.
     * @param callback(layout, rowIndex)
     */
    forEachRowLayouts(callback: any): void;
    /**
     * 주어진 callback 함수를 컬럼 위치데이타 각각에 대해 실행합니다.
     * @param callback(layout, columnIndex)
     */
    forEachColumnLayouts(callback: any): void;
    /**
     * 주어진 callback 함수를 셀 위치데이타 각각에 대해 실행합니다.
     * @param callback(layout, rowIndex, columnIndex, cell)
     */
    forEachCellLayouts(callback: any): void;
    /**
     * 주어진 callback 함수를 셀 위치데이타 각각에 대해 실행합니다.
     * @param callback(layout, rowIndex, columnIndex)
     */
    forEachMergeCellLayouts(callback: any): void;
    updateStart(): void;
    _isUpdating: boolean;
    _pendingMergeCellLayouts: any[];
    _pendingMergeCells: any[];
    updateEnd(): {
        rows: any[];
        mergeCells: any[];
    };
    clear(): void;
    /**
     * 지정된 컬럼인덱스의 x좌표를 반환합니다.
     * @param index
     * @returns {Number}
     */
    getColumnX(index: any): number;
    /**
     * 지정된 x좌표에 해당하는 컬럼 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
     * @param x
     * @returns {Number}
     */
    getColumnIndexByDistance(x: any): number;
    /**
     * 지정된 컬럼 인덱스의 너비를 반환합니다.
     * @param index 컬럼 인덱스
     * @returns {Number}
     */
    getColumnWidth(index: any): number;
    /**
     * 지정된 컬럼 인덱스 너비를 설정합니다.
     * @param index
     * @param size
     */
    setColumnWidth(index: any, size: any): boolean;
    /**
     * from 컬럼부터 to 컬럼까지의 너비의 합을 반환합니다.
     * @param from 시작 컬럼 인덱스
     * @param to 종료 컬럼 인덱스
     * @returns {Number}
     */
    getColumnsWidth(from: any, to: any): number;
    getRowY(index: any): number;
    /**
     * 지정된 y좌표에 해당하는 행 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
     * @param y
     * @returns {Number}
     */
    getRowIndexByDistance(y: any): number;
    /**
     * 지정된 인덱스 행 높이를 반환합니다.
     * @param index
     * @returns {Number}
     */
    getRowHeight(index: any): number;
    /**
     * from 부터 to 높이의 합을 반환합니다.
     * @param from
     * @param to
     * @returns {*}
     */
    getRowsHeight(from: any, to: any): any;
    /**
     * 지정된 인덱스의 행 높이를 설정합니다.
     * @param index
     * @param height
     * @returns {boolean}
     */
    setRowHeight(index: any, height: any): boolean;
    setCellHeight(rowIndex: any, columnIndex: any, height: any): boolean;
    /**
     * 컨텐츠 너비를 반환합니다.
     * @returns {Number}
     */
    getColumnsTotal(): number;
    /**
     * 컨텐츠 높이를 반환합니다.
     * @returns {Number}
     */
    getRowsTotal(): number;
    /**
     *
     */
    updateTypicalColumnSizes(): void;
    /**
     * 고정영역(상, 하, 좌, 우) 인덱스 업데이트
     * @private
     */
    private updateVisibleFrozenIndexRect;
    updateVisibleFrozenSizeRect(): void;
    /**
     *
     * @param isNeed
     * @returns {boolean}
     */
    updateVisibleColumns(isNeed: any): boolean;
    /**
     * 컬럼 위치 정보를 갱신합니다.(절대좌표 및 뷰포트 상대좌표)
     */
    updateVisibleColumnLayouts(): void;
}

export declare class DataGrid extends Element_2 {
    static create(container: any, options: any): DataGrid;
    /**
     * 그리드 셀을 편집할 수 있는지를 나타냅니다
     */
    editable: boolean;
    /**
     * 키 입력시 편집할 수 있는 키 목록입니다.
     */
    editOnKeys: string;
    /**
     * 편집 활성화할수 있는 이벤트 목록입니다.
     */
    editOnEvents: string[];
    /**
     * 아이템 드래그시 항목 선택 여부입니다.
     */
    selectOnDrag: boolean;
    /**
     * 멀티 정렬 여부입니다.
     * @type {boolean}
     */
    multiSortable: boolean;
    pasteFromClipboard: boolean;
    _resizableColumns: boolean;
    _draggableColumns: boolean;
    _sortableColumns: boolean;
    _labelFunction: any;
    _rowCount: number;
    _maxRowCount: number;
    _dragScrollId: number;
    _dragScrollDelta: any;
    _sortColumns: any[];
    _dragColumnInfo: {
        dragElement: RendererLayer;
        renderer: any;
        column: any;
        columnPoint: Point;
        clientPoint: Point;
    };
    _dropColumnInfo: {
        overLeafColumn: any;
        moveIndex: number;
        isNext: boolean;
    };
    _dragCanceled: boolean;
    _theme: any;
    _oldWidth: number;
    _oldHeight: number;
    _gridEditor: DataGridEditor;
    _itemEditor: any;
    _boundDoLayout: any;
    _defaultStyles: any;
    _dataGroup: DataGroup;
    _headerGroup: HeaderGroup;
    _scroller: Base;
    _sizeDetector: ResizeObserver;
    _addonHelper: AddonHelper;
    /**
     * 기본 스타일 정의
     * @returns defaults.styles|{backgroundColor, font, color, textAlign, verticalAlign, rowHeight, headerRowHeight, rowLineColor, rowLineWidth, rowColors, columnLineColor, columnLineWidth, columnLineStyle, frozenLineColor, frozenLineWidth, frozenLineStyle, cellSelectionColor, cellOverColor, textSelectionColor, textOverColor, caretLineColor, caretLineWidth, cellPadding, headerRowLineColor, headerRowLineWidth, headerColumnLineColor, headerColumnLineWidth}}
     * @private
     */
    private get defaultStyles();
    /**
     * 데이타 그리드의 헤더영역 인스턴스입니다.
     * @returns {*}
     */
    get headerGroup(): any;
    /**
     * 데이타 그리드의 데이타 영역 인스턴스입니다.
     * @returns {*}
     */
    get dataGroup(): any;
    get selector(): any;
    /**
     * 그리드의 행에 표시되는 데이터 목록을 관리합니다.
     * 이 속성은 ArrayList 타입입니다.
     * 이를 사용하면 행추가, 삭제, 수정, 이동이 가능합니다.
     * @returns {ArrayList}
     */
    get collection(): ArrayList;
    get columnCollection(): any;
    set items(arg: any[]);
    /**
     * 그리드 행에 표시되는 데이타 목록입니다.
     * @returns {Array}
     */
    get items(): any[];
    set columns(arg: any[]);
    /**
     * 그리드 헤더에 표시되는 컬럼목록입니다.
     * 명시적으로 설정하지 않는 경우 items의 첫번째 항목의 해당 속성들로 표시합니다.
     * @returns {Array}
     */
    get columns(): any[];
    /**
     *
     * @returns {*}
     */
    get normalizedColumns(): any;
    set labelFunction(arg: any);
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
    get labelFunction(): any;
    set headerRenderer(arg: any);
    /**
     * 헤더 셀을 구성하는 클래스 팩토리입니다.
     */
    get headerRenderer(): any;
    set itemRenderer(arg: any);
    /**
     * 데이타 셀을 구성하는 클래스 팩토리입니다.
     * @param Object || Function
     */
    get itemRenderer(): any;
    set mergeItemRenderer(arg: any);
    /**
     * 병합된 셀을 구성하는 클래스 팩토리입니다.
     */
    get mergeItemRenderer(): any;
    set nullItemRenderer(arg: any);
    /**
     * 빈값을 가진(null) 셀을 구성하는 클래스 팩토리입니다.
     */
    get nullItemRenderer(): any;
    set useNullItemRenderer(arg: any);
    /**
     * nullItemRenderer 사용 여부입니다.
     */
    get useNullItemRenderer(): any;
    set itemEditor(arg: any);
    get itemEditor(): any;
    /**
     * `ScrollLeft` 최대값입니다.
     * @returns {number}
     */
    get maxScrollLeft(): number;
    /**
     * `scrollTop` 최대값입니다.
     * @returns {number}
     */
    get maxScrollTop(): number;
    set scrollLeft(arg: number);
    /**
     * 수평 스크롤 위치값입니다.
     * @returns {number}
     */
    get scrollLeft(): number;
    set scrollTop(arg: number);
    /**
     * 수직 스크롤 위치값입니다.
     * @returns {number}
     */
    get scrollTop(): number;
    set autoMerge(arg: any);
    /**
     *  GridColumn.isColumnMerge 및 GridColumn.isRowMerge 설정에 따라 동일한 데이터를 가진 연속적인 셀들을 자동으로 병합하는 기능을 제어합니다.
     */
    get autoMerge(): any;
    set autoGenerateColumns(arg: any);
    /**
     * 컬럼이 정의되지 않았을 때 `items` 첫 번째 아이템 구조를 기준으로 컬럼을 자동으로 생성하는 기능을 제어합니다.
     */
    get autoGenerateColumns(): any;
    set rowHeight(arg: number);
    /**
     * 행의 기본 높이를 지정합니다.
     * autoRowHeight가 `false` 일 경우에 한합니다.
     * @returns {number}
     */
    get rowHeight(): number;
    set headerRowHeight(arg: number);
    /**
     * 헤더 셀의 높이를 지정합니다.
     * 컬럼이 계층구조 일 경우 헤더 높이는 계층 최대 깊이 * headerRowHeight 립니다.
     * @returns {number}
     */
    get headerRowHeight(): number;
    set autoRowHeight(arg: boolean);
    /**
     * 행의 높이를 구하는 기준을 지정합니다.
     * `true` 경우 각 행의 셀 렌더러의 최대 높이가 행의 높이가 됩니다.
     * `false` 경우 rowHeight 속성의 값이 됩니다.
     * @returns {boolean}
     */
    get autoRowHeight(): boolean;
    set maxRowCount(arg: number);
    /**
     * 그리드의 표현되는 최대 행의 수를 설정합니다.
     * @returns {number}
     */
    get maxRowCount(): number;
    set rowCount(arg: number);
    /**
     * 그리드의 표현되는 행의 수를 설정합니다.
     * @returns {number}
     */
    get rowCount(): number;
    set frozenLeft(arg: number);
    /**
     * 좌를 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     * @returns {number}
     */
    get frozenLeft(): number;
    set frozenRight(arg: number);
    /**
     * 우를 기준으로 행을 고정합니다.
     * 수평 스크롤에 영향을 받지 않습니다.
     * @returns {number}
     */
    get frozenRight(): number;
    set frozenTop(arg: number);
    /**
     * 위를 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     * @returns {number}
     */
    get frozenTop(): number;
    set frozenBottom(arg: number);
    /**
     * 아래를 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     * @returns {number}
     */
    get frozenBottom(): number;
    set mergeCompare(arg: Function);
    /**
     * 자동 병합시 병합영역을 체크하는 함수입니다.
     * compareFunction(targetItem, targetColumn, sourceItem, sourceColumn)
     * @returns {function}
     */
    get mergeCompare(): Function;
    set sortableColumns(arg: any);
    /**
     * 컬럼의 정렬기능 사용여부입니다.
     * @returns {*}
     */
    get sortableColumns(): any;
    set resizableColumns(arg: boolean);
    /**
     *  컬럼의 너비를 변경 가능한지 여부입니다.
     *  @returns {boolean}
     */
    get resizableColumns(): boolean;
    set draggableColumns(arg: boolean);
    /**
     * 컬럼의 순서를 변경가능한지 여부입니다.
     * 해당 속성이 true이고 드래그 대상 컬럼의 draggableColumn속성이 true인 경우 컬럼을 드래그하여 이동 할 수 있습니다.
     * @returns {boolean}
     */
    get draggableColumns(): boolean;
    /**
     * 헤더 드래그 중인지 여부입니다.
     */
    get isHeaderDragging(): boolean;
    get hasVerticalScroll(): any;
    get hasHorizontalScroll(): any;
    set hookFreeElement(arg: any);
    /**
     * 아이템렌더러, 헤더 렌더러가 해제(삭제)될 때 콜백됩니다.
     * 반환값이 'false' 이면 해당렌더러는 재사용 되지 않습니다.
     */
    get hookFreeElement(): any;
    _hookFreeElement: any;
    set selectionMode(arg: any);
    get selectionMode(): any;
    set selectedIndex(arg: any);
    /**
     * 선택된 아이템의 인덱스를 설정하거나 가져옵니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 행 인덱스가 반환됩니다.
     */
    get selectedIndex(): any;
    set selectedItem(arg: any);
    /**
     * 선택된 아이템를 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 항목이 반환됩니다.
     */
    get selectedItem(): any;
    set selectedIndices(arg: any);
    /**
     * 복수로 선택된 아이템의 인덱스 목록을 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 인덱스 배열이 반환됩니다.
     */
    get selectedIndices(): any;
    set selectedItems(arg: any);
    /**
     * 복수로 선택된 아이템을 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 항목의 배열이 반환됩니다.
     */
    get selectedItems(): any;
    set selectedCell(arg: any);
    /**
     * 선택된 셀을 설정합니다.
     */
    get selectedCell(): any;
    set selectedCells(arg: any);
    /**
     * 복수로 선택된 셀을 설정합니다.
     */
    get selectedCells(): any;
    set caretRowIndex(arg: any);
    /**
     * caret 행 인덱스입니다.
     */
    get caretRowIndex(): any;
    set caretColumnIndex(arg: any);
    /**
     * caret 컬럼 인덱스입니다.
     */
    get caretColumnIndex(): any;
    set theme(arg: any);
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
    get theme(): any;
    /**
     *
     * @param item
     * @param column
     * @returns {*|*|*|*}
     */
    itemToLabel(item: any, column: any): any | any | any | any;
    /**
     * addons
     * @returns {Array}
     */
    getAddons(): any[];
    /**
     * 지정된 이름에 해당하는 애드온 컴포넌트를 반환합니다.
     */
    getAddon(name: any): any;
    addAddon(name: any, value: any): void;
    /**
     * 부모 컬럼에 자식 컬럼을 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param column 추가할 자식 컬럼
     * @returns {boolean}
     */
    addColumn(parent: any, column: any): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 컬럼을 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param column 추가할 자식 컬럼.
     * @param index 자식 컬럼 삽입 위치의 인덱스.
     * @returns {boolean}
     */
    addColumnAt(parent: any, column: any, index: any): boolean;
    /**
     * 부모 컬럼에 자식 컬럼을 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param columns 추가할 자식 컬럼 목록
     * @returns {boolean}
     */
    addColumns(parent: any, columns: any): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 컬럼목록을 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param columns 추가할 자식 컬럼 목록
     * @param index 자식 컬럼 삽입 위치의 인덱스.
     * @returns {boolean}
     */
    addColumnsAt(parent: any, columns: any, index: any): boolean;
    /**
     * 부모 컬럼에서 자식 컬럼을 삭제합니다.
     * @param parent 부모 노드입니다.
     * @param column 삭제할 자식 컬럼 입니다.
     * @returns {boolean}
     */
    removeColumn(parent: any, column: any): boolean;
    /**
     * 부모 컬럼에서 자식 컬럼을 삭제합니다.
     * @param parent 부모 노드입니다.
     * @param columns 삭제할 컬럼 목록 입니다.
     * @returns {boolean}
     */
    removeColumns(parent: any, columns: any): boolean;
    moveColumn(column: any, toParent: any, toIndex: any): any;
    /**
     * 지정된 컬럼 인덱스의 x 위치를 반환합니다.
     * @param index
     * @returns {Number}
     */
    getColumnX(index: any): number;
    /**
     * 지정된 컬럼 인덱스의 너비를 반환합니다.
     * @param index 컬럼 인덱스
     * @returns {Number}
     */
    getColumnWidth(index: any): number;
    getColumnLayout(index: any): any;
    /**
     * 지정된 컬럼 인덱스 너비를 설정합니다.
     * @param index
     * @param size
     */
    setColumnWidth(index: any, size: any): void;
    /**
     * from 컬럼부터 to 컬럼까지의 너비의 합을 반환합니다.
     * @param from 시작 컬럼 인덱스
     * @param to 종료 컬럼 인덱스
     * @returns {Number}
     */
    getColumnsWidth(from: any, to: any): number;
    /**
     * 지정된 인덱스 행 높이를 반환합니다.
     * @param index
     * @returns {Number}
     */
    getRowHeight(index: any): number;
    /**
     * 지정된 인덱스의 행 높이를 설정합니다.
     * @param index
     * @param height
     * @returns {boolean}
     */
    setRowHeight(index: any, height: any): boolean;
    /**
     * from 행부터 to 행까지의 높이의 합을 반환합니다.
     * @param from 시작행
     * @param to 종료행.
     * @returns {Number}
     */
    getRowsHeight(from: any, to: any): number;
    getCellStyle(rowIndex: any, columnIndex: any, ...props: any[]): any;
    setColumnVisible(column: any, visible: any): any;
    /**
     * 그리드 헤더 높이를 반환합니다.
     * @returns {number}
     */
    getHeaderHeight(): number;
    getMergeCells(): any;
    addMergeCells(cells: any): void;
    addMergeCell(cell: any): void;
    removeMergeCell(cell: any): void;
    removeMergeCells(): void;
    getSortColumns(): any[];
    /**
     * 하나 이상의 컬럼으로 정렬합니다.
     * @param columns
     */
    sortByColumns(columns: any): void;
    /**
     * 편집 가능한 셀인지 확인합니다.
     * @param rowIndex
     * @param columnIndex
     * @returns {boolean}
     */
    isCellEditable(rowIndex: any, columnIndex: any): boolean;
    /**
     * 지정된 셀에서 편집을 시작합니다.
     * 편집이 시작되면 'item-edit-starting', 'item-edit-start' 이벤트가 발생합니다.
     * 'item-edit-starting' 이벤트가 발생할 때, `preventDefault`를 사용하여 편집을 취소할수 있습니다.
     * @param rowIndex
     * @param columnIndex
     * @returns {boolean}
     */
    startEdit(rowIndex: any, columnIndex: any): boolean;
    /**
     * 편집을 종료하고 편집중인 내용이 저장됩니다.
     * 편집이 종료되면 'item-edit-ending', 'item-edit-end' 이벤트가 발생합니다.
     * 'item-edit-ending' 이벤트가 발생할 때, `preventDefault`를 사용하여 편집 종료를 취소할수 있습니다.
     * @returns {boolean}
     */
    endEdit(): boolean;
    /**
     * 편집을 취소합니다. 편집중인 내용은 저장되지 않습니다.
     * 편집이 취소되면 'item-edit-cancel' 이벤트가 발생합니다.
     * @returns {boolean}
     */
    cancelEdit(): boolean;
    /**
     * 편집중인지 확인합니다.
     * @returns {boolean}
     */
    isEditing(): boolean;
    /**
     * 편집중인 에디터 정보를 반환합니다.
     * @returns {HTMLElement|null}
     */
    getEditedCell(): HTMLElement | null;
    analysisMergeAll(): void;
    /**
     * 전체 병합 영역 바로 분석실행
     */
    /**
     * @private
     */
    private createHeaderGroup;
    /**
     * @private
     */
    private createDataGroup;
    /**
     * @private
     */
    private createCollection;
    /**
     * 포커스를 설정합니다.
     */
    focus(): void;
    moveCaretUp(): boolean;
    moveCaretDown(): boolean;
    moveCaretLeft(): boolean;
    moveCaretRight(): boolean;
    /**
     * 지정된 셀 위치로 스크롤을 이동합니다.
     * @param rowIndex {number} - 스크롤을 이동하려는 대상 행의 인덱스입니다.
     * @param columnIndex {number} - 스크롤을 이동하려는 대상 열의 인덱스입니다.
     * @param allowSelection {boolean} - 이 값이 `true` 설정되면, 지정된 셀이 선택되고, 기본값은 `false` 입니다.
     */
    scrollToCell(rowIndex: number, columnIndex: number, allowSelection?: boolean): void;
    /**
     * @private
     */
    private doLayout;
    lockDisplay(): void;
    unlockDisplay(): void;
    validateNow(): void;
    /**
     * 표시 목록을 갱신을 요청합니다.
     */
    invalidate(reason?: number): void;
    /**
     * 대기중인 표시 목록 갱신을 바로 실행합니다.
     */
    flush(): void;
    /**
     * 현재 설정된 테마를 적용합니다.
     */
    applyTheme(): void;
    /**
     * 현재 설정된 테마를 해제합니다.
     */
    releaseTheme(): void;
    /**
     * 해당 인덱스의 앞 컬럼을 반환합니다.
     * @param index
     * @returns {number}
     */
    getPreviousVisibleColumnIndex(index: any): number;
    /**
     * 해당 인덱스의 뒤 컬럼을 반환합니다.
     * @param index
     * @returns {number}
     */
    getNextVisibleColumnIndex(index: any): number;
    clearHeaderRenderers(): void;
    clearItemRenderers(): void;
    mount(container: any, options?: {}): this;
    setOptions(options: any): this;
    destroy(): void;
    _getFirstVisibleRowIndex(): any;
    _styleChanged(): void;
    _getLastVisibleRowIndex(): any;
    _internalMoveCaret(rowIndex: any, columnIndex: any, isExtend: any): boolean;
    _adjustCellNavigation(e: any): void;
    _calculateDragScrollDelta(point: any): Point;
    _startDragScrolling(delta: any, callback: any): void;
    _stopDragScrolling(): void;
    _showOverlay(): void;
    _overlayGroup: HTMLDivElement;
    _hideOverlay(): void;
    _showHeaderDropIndicator(columnIndex: any): void;
    _dropHeaderIndicator: HTMLDivElement;
    _hideHeaderDropIndicator(destroy: any): void;
    _startColumnDragDrop(event: any): {
        dragElement: RendererLayer;
        renderer: any;
        column: any;
        columnPoint: Point;
        clientPoint: Point;
    };
    _updateColumnDragDrop(event: any): {
        overLeafColumn: any;
        moveIndex: number;
        isNext: boolean;
    };
    _cancelColumnDragDrop(): void;
    _destroyColumnDragDrop(): void;
    _dispatchSortEvent(type: any, column: any, trigger: any): any;
    _redispatch(event: any): void;
    _onResize(event: any): void;
    _onHeaderEvents(event: any): void;
    _onHeaderSeparatorEvents(e: any): void;
    _resizeColumn: any;
    _resizeColumnWidth: any;
    _resizeAnchorPoint: Point;
    /**
     * dataGroup item-down 이벤트 핸들러
     * 아이템 드래그 및 아이템 드래그 선택 처리
     * @param event
     * @private
     */
    private _onItemDown;
    _onKeyDown(event: any): void;
}

declare class DataGridEditor {
    constructor(grid: any);
    _grid: any;
    _editedCell: any;
    _lastEditCellPosition: any;
    _boundOnDocumentKeyDown: any;
    _boundOnDocumentMouseEvent: any;
    /**
     * @private
     * @returns {*}
     */
    private get _dataGroup();
    /**
     * 편집중인 렌더러 객체입니다.
     * @returns {*|HTMLElement}
     */
    get editedCell(): any;
    /**
     * 그리드 편집 중인지을 나타냅니다.
     * @returns {boolean}
     */
    isEditing(): boolean;
    /**
     * 편집 가능한 셀인지 확인합니다.
     * @param rowIndex
     * @param columnIndex
     * @returns {boolean}
     */
    isCellEditable(rowIndex: any, columnIndex: any): boolean;
    /**
     * 지정된 셀에 편집을 시작합니다. 편집을 시작하면 'true'를 반환합니다.
     * 'item-edit-starting' 이벤트에서 'preventDefault()'호출시 편집을 취소합니다.
     * @param rowIndex
     * @param columnIndex
     * @param trigger
     * @returns {boolean}
     */
    startEdit(rowIndex: any, columnIndex: any, trigger: any): boolean;
    /**
     * 편집중이면 편집을 종료합니다.
     * 편집중인 내용이 저장됩니다.
     * @param trigger
     * @return {boolean}
     */
    endEdit(trigger?: any): boolean;
    /**
     * 편집을 취소합니다. 편집중인 내용은 저장되지 않습니다.
     * @returns {boolean}
     */
    cancelEdit(): boolean;
    _itemToFactory(item: any, column: any, cellPosition: any): {
        new (grid: any): {
            _grid: any;
            _deferredFuncs: any[];
            readonly grid: any;
            readonly isDomRenderer: boolean;
            created(grid: any): void;
            prepare(grid: any, state: any): void;
            paint(ctx: CanvasRenderingContext2D, state: any, width: any, height: any): number;
            dispose(): void;
            watchEvent(target: any, eventName: any, listener: any, options: any): void;
            readonly htmlElement: any;
        };
        factory(component: any): any;
        withDom(html: any): typeof Base;
        /**
         * 편집을 취소합니다. 편집중인 내용은 저장되지 않습니다.
         * @returns {boolean}
         */
        withBehavior(...behaviors: any[]): typeof Base;
    };
    _dataCellToEditCell(cell: any, inputtedKey: any, trigger: any): any;
    /**
     * 에디터를 생성합니다.
     * @param cellPosition
     * @param trigger
     * @private
     */
    private _createEditor;
    /**
     *
     * @private
     */
    private _destroyEditor;
    _findMergeCellPosition(rowIndex: any, columnIndex: any): any;
    /**
     * 다음 편집위치
     * @param rowIndex
     * @param columnIndex
     * @param isReverse
     * @param isVertical
     * @param trigger
     * @private
     */
    private _startNextEdit;
    _inStartNextEdit: boolean;
    _findNextEditablePosition(rowIndex: any, columnIndex: any, shiftKey: any, isVertical: any): Point;
    _dispatchEditorEvent(type: any, cancelable: any, rowIndex: any, columnIndex: any, oldValue?: any, newValue?: any, trigger?: any): any;
    _getPrintableKey(event: any): any;
    _onGridItemEvent(event: any): void;
    _onGridKeyDown(event: any): void;
    _onGridScroll(event: any): void;
    _onDocumentKeyDown(event: any): void;
    _onDocumentMouseEvent(event: any): void;
}

declare type DataGridEvents = {
    /**
     * 헤더에 마우스 다운했을때 발생합니다.
     */
    'header-down': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더에 마우스 업 했을때 발생합니다.
     */
    'header-up': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더에 마우스 클릭 했을때 발생합니다.
     */
    'header-click': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더에 마우스 더블 클릭했을때 발생합니다.
     */
    'header-double-click': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더에 마우스 드래그 했을때  발생합니다.
     */
    'header-drag': (event: DataGridHeaderEvent) => void;
    /**
     * 마우스가 헤더를 벗어 났을때 발생합니다.
     */
    'header-out': (event: DataGridHeaderEvent) => void;
    /**
     * 마우스가 헤더 위로 이동했을때 발생합니다.
     */
    'header-over': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더 구분선에 마우스 다운했을때 발생합니다.
     */
    'separator-down': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더 구분선에 마우스 업 했을때 발생합니다.
     */
    'separator-up': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더 구분선에 마우스 클릭 했을때 발생합니다.
     */
    'separator-click': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더 구분선에 마우스 더블 클릭했을때 발생합니다.
     */
    'separator-double-click': (event: DataGridHeaderEvent) => void;
    /**
     * 헤더 구분선에 마우스 드래그 했을때  발생합니다.
     */
    'separator-drag': (event: DataGridHeaderEvent) => void;
    /**
     * 마우스가 헤더 구분선에 벗어 났을때 발생합니다.
     */
    'separator-over': (event: DataGridHeaderEvent) => void;
    /**
     * 마우스가 헤더 구분선에 위로 이동했을때 발생합니다.
     */
    'separator-out': (event: DataGridHeaderEvent) => void;
    /**
     * 아이템에 마우스 다운했을때 발생합니다.
     */
    'item-down': (event: DataGridItemEvent) => void;
    /**
     * 아이템에 마우스 업 했을때 발생합니다.
     */
    'item-up': (event: DataGridItemEvent) => void;
    /**
     * 아이템에 마우스 클릭 했을때 발생합니다.
     */
    'item-click': (event: DataGridItemEvent) => void;
    /**
     * 아이템에 마우스 더블 클릭했을때 발생합니다.
     */
    'item-double-click': (event: DataGridItemEvent) => void;
    /**
     * 아이템에 마우스 드래그 했을때  발생합니다.
     */
    'item-drag': (event: DataGridItemEvent) => void;
    /**
     * 마우스가 아이템 벗어 났을때 발생합니다.
     */
    'item-over': (event: DataGridItemEvent) => void;
    /**
     * 마우스가 아이템 위로 이동했을때 발생합니다.
     */
    'item-out': (event: DataGridItemEvent) => void;
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
    'collection-change': (event: ArrayListEvent) => void;
    /**
     * TreeGrid 내부의 아이템이 변경되었을때 발생합니다.
     * 이벤트 종류
     * - collapsing - 노드 접혀지기 전
     * - collapse - 노드 접혀진 후
     * - expanding - 노드 확장되기 전
     * - expand - 노드 확장된 후
     * - add - 노드 추가
     * - remove - 노드 삭제
     * - move - 노드 이동
     */
    'node-change': (event: HierarchyListEvent) => void;
    /**
     * 컬럼 내부의 아이템이 변경되었을 때 발생합니다.
     */
    'column-collection-change': (event: ArrayListEvent) => void;
    /**
     * 컬럼 내부의 노드 상태가 변경 되었을때 발생합니다.
     */
    'column-node-change': (event: HierarchyListEvent) => void;
    /**
     * 그리드에서 내부에서 사용되는 컬럼 목록 변경시 발생합니다.
     */
    'normalized-columns-change': (event: CustomEvent<{
        newValue: Array<GridColumn>;
        oldValue: Array<GridColumn>;
    }>) => void;
    /**
     * 아이템이 선택되기 전에 발생합니다.
     * 이벤트 핸들러에서 이벤트의 `preventDefault` 메소드를 호출하여 선택 작업을 취소할 수 있습니다.
     */
    'selection-changing': (event: SelectionChangeEvent) => void;
    /**
     * 아이템이 선택된 후에 발생합니다.
     */
    'selection-change': (event: SelectionChangeEvent) => void;
    /**
     * 아이템 편집 전에 발생합니다..
     */
    'item-edit-starting': (event: DateGridItemEditEvent) => void;
    /**
     * 아이템 편집 할때 발생합니다.
     */
    'item-edit-start': (event: DateGridItemEditEvent) => void;
    /**
     * 아이템 편집 종료 전에 발생합니다.
     */
    'item-edit-ending': (event: DateGridItemEditEvent) => void;
    /**
     * 아이템 편집 종료 할때 발생합니다.
     */
    'item-edit-end': (event: DateGridItemEditEvent) => void;
    /**
     * 아이템 편집 취소 할때 발생합니다.
     */
    'item-edit-cancel': (event: DateGridItemEditEvent) => void;
    /**
     * 데이타 그리드 내 스크롤 할때 발생합니다.
     */
    scroll: (event: CustomEvent<{
        maxScrollLeft: number;
        maxScrollTop: number;
        scrollLeft: number;
        scrollTop: number;
        trigger: Event;
    }>) => void;
};

declare type DataGridGetters = {
    /**
     * DataGrid 인스턴스입니다.
     */
    nativeInstance: DataGrid;
};

declare type DataGridHeaderEvent = CustomEvent<{
    column: GridColumn;
    trigger: Event;
}>;

declare type DataGridItemEvent = CustomEvent<{
    rowIndex: number;
    columnIndex: number;
    column: GridColumn;
    item: object;
    trigger: Event;
}>;

declare interface DataGridMethods extends MethodOptions {
    [key: string]: any;
    /**
     * 포커스를 설정합니다.
     */
    focus(): void;
    /**
     * 지정된 셀 위치로 스크롤을 이동합니다.
     * @param rowIndex {number} - 스크롤을 이동하려는 대상 행의 인덱스입니다.
     * @param columnIndex {number} - 스크롤을 이동하려는 대상 열의 인덱스입니다.
     * @param allowSelection {boolean} - 이 값이 `true` 설정되면, 지정된 셀이 선택되고, 기본값은 `false` 입니다.
     */
    scrollToCell(rowIndex: number, columnIndex: number, allowSelection: boolean): void;
    /**
     * 표시 목록을 갱신을 요청합니다.
     */
    invalidate(): void;
    /**
     * 대기중인 표시 목록 갱신을 바로 실행합니다.
     */
    flush(): void;
    /**
     * 지정된 셀에서 편집을 시작합니다.
     * 편집이 시작되면 'item-edit-starting', 'item-edit-start' 이벤트가 발생합니다.
     * 'item-edit-starting' 이벤트가 발생할 때, `preventDefault`를 사용하여 편집을 취소할수 있습니다.
     * @param rowIndex
     * @param columnIndex
     * @returns {boolean}
     */
    startEdit(rowIndex: number, columnIndex: number): boolean;
    /**
     * 편집을 종료하고 편집중인 내용이 저장됩니다.
     * 편집이 종료되면 'item-edit-ending', 'item-edit-end' 이벤트가 발생합니다.
     * 'item-edit-ending' 이벤트가 발생할 때, `preventDefault`를 사용하여 편집 종료를 취소할수 있습니다.
     * @returns {boolean}
     */
    endEdit(): boolean;
    /**
     * 편집을 취소합니다. 편집중인 내용은 저장되지 않습니다.
     * 편집이 취소되면 'item-edit-cancel' 이벤트가 발생합니다.
     * @returns {boolean}
     */
    cancelEdit(): boolean;
    /**
     * 지정된 이름에 해당하는 애드온 컴포넌트를 반환합니다.
     */
    getAddon(name: string): any;
    /**
     * items 관리하는 collection 객체를 반환합니다.
     */
    getCollection(): IList;
}

declare type DataGridPropsType = typeof defaultDataGridProps;

declare interface DataGridProvider<Native> {
    readonly grid: Native;
    updateColumns(): void;
}

declare type DataGridSlot = {
    /**
     * 헤더 렌더러 슬롯
     */
    headerRenderer?: CellState;
    /**
     * 아이템 렌더러 슬롯
     */
    itemRenderer?: RendererCellState;
    /**
     * 아이템 에디터 슬롯
     */
    itemEditor?: EditorCellState;
};

export declare const DataGridSymbol: InjectionKey<DataGridProvider<DataGrid>>;

declare class DataGroup extends Group {
    _dimensions: DataDimensions;
    _normalizedColumns: any[];
    _bufferContexts: any[];
    _backgroundLayer: any;
    _selectionLayer: any;
    /**
     * @private
     * @return {RendererLayer}
     */
    private _rendererLayer;
    _separatorLayer: any;
    _needGeneratedColumns: boolean;
    _frozenLeft: number;
    _frozenRight: number;
    _frozenTop: number;
    _frozenBottom: number;
    _itemRenderer: any;
    _nullItemRenderer: any;
    _useNullItemRenderer: boolean;
    _autoRowHeight: boolean;
    _maxRowCount: number;
    _rowCount: number;
    _cacheStyle: any;
    _boundCollectionChange: any;
    _boundColumnCollectionChange: any;
    _boundDocumentMouseMove: any;
    _boundDocumentMouseUp: any;
    set rowHeight(arg: number);
    get rowHeight(): number;
    overRowIndex: number;
    overColumnIndex: number;
    overCell: any;
    anchorRowIndex: number;
    anchorColumnIndex: number;
    autoMerge: boolean;
    autoGenerateColumns: boolean;
    _oldScrollLeft: number;
    _oldScrollTop: number;
    options: {
        clipMode: string;
        hiddenElementMode: string;
        mergeMode: string;
        alwaysShowMergeCell: boolean;
    };
    set columnCollection(arg: any);
    /**
     * 그리드의 컬럼을 관리하는 컬렉션입니다.
     * HierarchyCollection 속성 및 함수수 사용 수 있습니다.
     * @returns {*}
     */
    get columnCollection(): any;
    set collection(arg: any);
    get collection(): any;
    _collection: any;
    get numRows(): any;
    get normalizedColumns(): any[];
    set caretRowIndex(arg: any);
    get caretRowIndex(): any;
    _anchorRowIndex: any;
    set caretColumnIndex(arg: any);
    get caretColumnIndex(): any;
    _anchorColumnIndex: any;
    set autoRowHeight(arg: boolean);
    get autoRowHeight(): boolean;
    set maxRowCount(arg: number);
    get maxRowCount(): number;
    set rowCount(arg: number);
    get rowCount(): number;
    get normalizedRowCount(): number;
    set itemRenderer(arg: any);
    get itemRenderer(): any;
    set nullItemRenderer(arg: any);
    get nullItemRenderer(): any;
    set mergeItemRenderer(arg: any);
    get mergeItemRenderer(): any;
    _mergeItemRenderer: any;
    set frozenLeft(arg: number);
    get frozenLeft(): number;
    set frozenRight(arg: number);
    get frozenRight(): number;
    set frozenTop(arg: number);
    get frozenTop(): number;
    set frozenBottom(arg: number);
    get frozenBottom(): number;
    set mergeCompare(arg: any);
    get mergeCompare(): any;
    _mergeCompare: any;
    set useNullItemRenderer(arg: boolean);
    get useNullItemRenderer(): boolean;
    _itemRendererChanged(): void;
    _frozenCountChanged(v: any): void;
    _setColumnCollection(value: any): void;
    _columnCollection: any;
    clearItemRenderers(): void;
    clearCache(): void;
    _caretColumnIndex: any;
    _caretRowIndex: any;
    _clearCacheForIndicator(): void;
    /**
     * 전체 컬럼 갱신
     * @private
     */
    private _resetColumns;
    _measureSize(): void;
    _oldWidth: any;
    _oldHeight: any;
    _resetCaret(): void;
    _setCaretIndex(rowIndex: any, columnIndex: any): boolean;
    _generateColumns(): void;
    _createGrid(scrollX: any, scrollY: any, width: any, height: any): void;
    _asyncCreateRows(vSectionIndex: any, startRowIndex: any, endRowIndex: any, startRowY: any, width: any, height: any): Promise<any>;
    _createRows(vSectionIndex: any, startRowIndex: any, endRowIndex: any, startRowY: any, startOffsetY: any, width: any, height: any, scrollTop: any): void;
    _createRow(item: any, rowIndex: any, rowY: any, rowHeight: any): any;
    _setupCell(cell: any, item: any, column: any, cellPosition: any): any;
    /**
     * 셀 생성
     */
    _createCell(item: any, column: any, cellPosition: any, x: any, y: any, width: any, height: any, cellCache: any): any;
    /**
     * 병합셀 생성
     * @param cellPosition
     * @param cellCache
     * @returns {*}
     * @private
     */
    private _createMergeCell;
    _paintRow(row: any): void;
    _paintMergeCells(): void;
    _paintCell(context: any, cell: any, layout: any): void;
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
    private _internalPaintCell;
    _freeRows(rows: any): void;
    _freeCells(cells: any): void;
    itemToLabel(item: any, column: any, cellPosition: any): any;
    itemToValue(item: any, column: any): any;
    getViewMinHeight(): any;
    /**
     * TO DO
     */
    _getBufferContext(width: any, height: any): any;
    _paintBackgrounds(scrollX: any, scrollY: any, width: any, height: any): void;
    _paintSelectionIndicators(scrollX: any, scrollY: any, width: any, height: any): void;
    /**
     * 셀 오버시 표시
     * @param scrollX
     * @param scrollY
     * @param width
     * @param height
     * @private
     */
    private _paintHighlightIndicators;
    /**
     * 셀 구분선 그리기
     * @param scrollX
     * @param scrollY
     * @param width
     * @param height
     * @private
     */
    private _paintSeparators;
    _paintCaretIndicators(scrollX: any, scrollY: any, width: any, height: any): void;
    _invalidateOverAndOut(): void;
    _itemToTemplate(item: any, column: any, cellPosition: any): any;
    _calculateViewHeight(height: any): any;
    getVisibleRowIndices(): any[];
    getVisibleColumnIndices(): any[];
    getCellLayout(rowIndex: any, columnIndex: any): {};
    getCellLayoutByCellPosition(position: any): any;
    getVisibleFrozenIndexRect(): Rectangle;
    getVisibleFrozenSizeRect(): Rectangle;
    /**
     * 지정된 행 인덱스의 y 좌표를 반환합니다.
     * @param index
     * @returns {Number}
     */
    getRowY(index: any): number;
    /**
     * 지정된 y좌표에 해당하는 행 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
     * @param y
     * @returns {Number}
     */
    getRowIndexByDistance(y: any): number;
    /**
     * 지정된 인덱스 행 높이를 반환합니다.
     * @param index
     * @returns {Number}
     */
    getRowHeight(index: any): number;
    /**
     * 지정된 인덱스의 행 높이를 설정합니다.
     * @param index
     * @param height
     * @returns {boolean}
     */
    setRowHeight(index: any, height: any): boolean;
    /**
     * from 행부터 to 행까지의 높이의 합을 반환합니다.
     * @param from 시작행
     * @param to 종료행.
     * @returns {Number}
     */
    getRowsHeight(from: any, to: any): number;
    /**
     * 지정된 컬럼인덱스의 x좌표를 반환합니다.
     * @param index
     * @returns {Number}
     */
    getColumnX(index: any): number;
    /**
     * 지정된 컬럼 인덱스의 보여지는 컬럼 레이아웃 정보를 반환합니다.
     * @param index
     * @returns {*}
     */
    getColumnLayout(index: any): any;
    /**
     * 지정된 x좌표에 해당하는 컬럼 인덱스를 반환합니다. 범위 안에 없으면 -1을 반환합니다.
     * @param x
     * @returns {Number}
     */
    getColumnIndexByDistance(x: any): number;
    /**
     * 지정된 컬럼 인덱스의 너비를 반환합니다.
     * @param index 컬럼 인덱스
     * @returns {Number}
     */
    getColumnWidth(index: any): number;
    /**
     * 지정된 컬럼 인덱스 너비를 설정합니다.
     * @param index
     * @param size
     */
    setColumnWidth(index: any, size: any): void;
    /**
     * from 컬럼부터 to 컬럼까지의 너비의 합을 반환합니다.
     * @param from 시작 컬럼 인덱스
     * @param to 종료 컬럼 인덱스
     * @returns {Number}
     */
    getColumnsWidth(from: any, to: any): number;
    /**
     * 컨텐츠 너비를 반환합니다.
     * @returns {Number}
     */
    getContentWidth(): number;
    /**
     * 컨텐츠 높이를 반환합니다.
     * @returns {Number}
     */
    getContentHeight(): number;
    /**
     * 지정된 컬럼을 보이거나 숨기게 합니다.
     * @param column
     * @param {Boolean} visible
     */
    setColumnVisible(column: any, visible: boolean): void;
    getHorizontalSectionIndex(columnIndex: any): any;
    getVerticalSectionIndex(rowIndex: any): any;
    getCell(rowIndex: any, columnIndex: any): any;
    getItemRenderer(rowIndex: any, columnIndex: any): any;
    /**
     * 지정된 행 인덱스가 화면에 표시되는 경우 해당 렌더러를 갱신합니다.
     * @param index
     */
    invalidateRow(index: any): void;
    /**
     * 지정된 컬럼 인덱스가 화면에 표시되는 경우 해당 렌더러를 갱신합니다.
     * @param index 컬럼 인덱스
     */
    invalidateColumn(index: any): void;
    /**
     * 지정된 위치가 화면에 표시되는 경우 해당 렌더러를 갱신합니다.
     * @param rowIndex 행 인덱스
     * @param columnIndex 컬럼 인덱스
     */
    invalidateCell(rowIndex: any, columnIndex: any): void;
    /**
     * 지정된 위치가 화면에 표시되는 경우 true 반환합니다.
     * @param rowIndex
     * @param columnIndex
     * @returns {Boolean}
     */
    isVisiblePosition(rowIndex: any, columnIndex: any): boolean;
    /**
     * 지정된 셀이 화면에 표시되는 경우 true 반환합니다.
     * @param cellPosition
     * @returns {Boolean}
     */
    isVisibleCell(cellPosition: any): boolean;
    isValidPosition(rowIndex: any, columnIndex: any): boolean;
    /**
     * 지정된 행 인덱스의 아이템을 반환합니다.
     * @param index 행 인덱스
     * @returns {Object}
     */
    getItemAt(index: any): any;
    /**
     * 지정된 컬럼 인덱스의 컬럼을 반환합니다.
     * @param index
     * @returns {GridColumn}
     */
    getColumnAt(index: any): GridColumn;
    doLayout(needUpdate: any): void;
    updateScrollRect(): void;
    /**
     * 병합영역 전체 체크
     */
    analysisMergeAll(): void;
    getVerticalScrollPositionDelta(delta: any): number;
    _mouseEventToContent(event: any): Point;
    /**
     * 해당 위치로 스크롤을
     * @param rowIndex
     * @param columnIndex
     * @param allowSelection
     */
    scrollToCell(rowIndex: any, columnIndex: any, allowSelection: any): void;
    /**
     *
     * 지정된 영역을 선택합니다.
     * @param rowIndex
     * @param columnIndex
     * @param shiftKey
     * @param ctrlKey
     */
    updateSelection(rowIndex: any, columnIndex: any, shiftKey: any, ctrlKey: any): boolean;
    getCellStyle(rowIndex: any, columnIndex: any, ...props: any[]): any;
    destroy(): void;
    _internalScrollToCell(rowIndex: any, columnIndex: any, isVertical: any, isHorizontal: any): boolean;
    _calculateScrollPositionDelta(rowIndex: any, columnIndex: any): Point;
    /**
     * 아이템 추가, 뷰포인트 관련 추가된 만큼 데이타 갱신
     * @param rowIndex
     * @param items
     * @private
     */
    private _itemsAdded;
    /**
     * 아이템 삭제, 뷰포인트 관련 삭제된 만큼 데이타 갱신
     * @param rowIndex
     * @param items
     * @private
     */
    private _itemsRemoved;
    _columnsAdded(index: any, columns: any): void;
    /**
     * 컬럼삭제 셀 캐쉬 이동
     * @param index
     * @param columns 순차적인 컬럼 목록
     * @private
     */
    private _columnsRemoved;
    _dispatchDataGroupEvent(type: any, value: any): any;
    _dispatchChangeEvent(type: any, newValue: any, oldValue: any): any;
    _dispatchItemEvent(type: any, rowIndex: any, columnIndex: any, trigger: any, cancelable?: boolean, bubbles?: boolean): any;
    _dispatchCaretChangeEvent(caretRowIndex: any, caretColumnIndex: any): any;
    /**
     * mousedown event handler
     * @param event
     * @private
     */
    private _onMouseDown;
    _mouseDownColumnIndex: number;
    _mouseDownRowIndex: number;
    /**
     * mousemove event handler
     * @param event
     * @private
     */
    private _onMouseMove;
    _boundInvalidateOverAndOut: any;
    /**
     * mouseenter event handler
     * @param event
     * @private
     */
    private _onMouseEnter;
    _hasMouse: boolean;
    /**
     * mouseleave event handler
     * @param event
     * @private
     */
    private _onMouseLeave;
    _onDocumentMouseMove(event: any): void;
    _onDocumentMouseUp(event: any): void;
    _lastClickTime: number;
    _lastMouseClickRowIndex: any;
    _lastMouseClickColumnIndex: any;
    /**
     * ColumnCollection
     * collection-change event handler
     * @param event
     */
    _onColumnCollectionChange(event: any): void;
    /**
     * collection collection-change event handler
     */
    _onCollectionChange(event: any, isDispatch?: boolean): void;
}

declare type DateGridItemEditEvent = CustomEvent<{
    rowIndex: number;
    columnIndex: number;
    item: object;
    column: GridColumn;
    renderer: object;
    editor: object;
    oldValue: any;
    newValue: any;
    trigger: Event;
}>;

export declare const defaultColumnProps: {
    /**
     * 셀에 표시될 텍스트를 결정하는 필드를 정의합니다.
     */
    dataField: {
        type: PropType<string>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 컬럼 헤더의 텍스트입니다. 지정되지 않을시 'dataField' 속성을 사용합니다.
     */
    headerText: {
        type: PropType<string>;
    };
    /**
     * 컬럼의 너비입니다. 지정되지 않을시 그리드 내부에서 자동으로 조절합니다.
     */
    width: {
        type: PropType<number>;
    };
    /**
     * 컬럼의 최소 너비입니다.
     */
    minWidth: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 표시 여부입니다.
     */
    visible: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 해당 컬럼 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 정렬 사용 여부입니다.
     */
    sortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼을 드래그하여 이동하여 순서 변경가능 여부입니다.
     */
    draggable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 정렬이 오름차순인지 아니면 내림차순 인지를 나타냅니다.
     */
    sortDescending: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 정렬 형태(문자열, 숫자, 콜백함수)를 정의합니다.
     */
    sortCompare: {
        type: PropType<(a: any, b: any, column: GridColumn) => number>;
    };
    /**
     * 포멧된 데이타가 아닌 원본 데이타기준으로 정렬 여부입니다.
     */
    isSortOriginal: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 표시 텍스트가 영역을 벗어난 경우 줄바꿈 여부입니다.
     */
    wordWrap: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 행병합 여부입니다.
     */
    isRowMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 컬럼병합 여부입니다.
     */
    isColumnMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 해당 컬럼의 행 병합크기를 다른 컬럼의 행 크기를 종속하게 합니다.
     */
    mergeDependColumns: {
        type: PropType<string[]>;
    };
    /**
     * 해당 컬럼 영역의 스타일을 정의합니다.
     */
    styles: {
        type: PropType<Partial<{
            backgroundColor: string | CanvasGradient | CanvasPattern;
            font: string;
            color: string;
            textAlign: "left" | "center" | "right";
            verticalAlign: "center" | "top" | "bottom";
            cellSelectionColor: string | CanvasGradient | CanvasPattern;
            cellOverColor: string | CanvasGradient | CanvasPattern;
            textSelectionColor: string | CanvasGradient | CanvasPattern;
            textOverColor: string | CanvasGradient | CanvasPattern;
            rowColors: (string | CanvasGradient | CanvasPattern)[];
            cellPadding: {
                left: number;
                right: number;
                top: number;
                bottom: number;
            };
            rowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            }; /**
            *  GridColumn 인스턴스입니다.
            */
            columnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            frozenLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            /**
             * 헤더 렌더러 슬롯
             */
            caretLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerRowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerColumnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            cellBackgroundColor: (rowIndex: number, columnIndex: number) => string | CanvasGradient | CanvasPattern;
        }>>;
    };
    /**
     * 식 컬럼 헤더를 보이거나 숨깁니다.
     */
    collapse: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 이 컬럼의 셀에 라벨에 포멧를 정의합니다.
     * 포멧의 정의 tachyon.formatter.add 사용합니다.
     */
    format: {
        type: PropType<{
            [p: string]: any;
            type: string;
            pattern: string;
        }>;
    };
    /**
     * 해당 컬럼의 필터를 정의합니다.
     */
    filter: {
        type: PropType<{
            type: FilterType;
            condition: FilterCondition;
        }>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
};

declare const defaultDataGridProps: {
    modelValue: {
        type: PropType<object | object[] | CellPosition[]>;
    };
    /**
     * 그리드 표시되는 데이타 목록입니다.
     */
    items: {
        type: PropType<Record<string, any>[]>;
    };
    /**
     * 그리드 헤더에 표시되는 컬럼목록입니다.
     */
    columns: {
        type: PropType<GridColumn[]>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 그리드의 표현되는 행의 수를 설정합니다.
     */
    rowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 그리드의 표현되는 최대 행의 수를 설정합니다.
     */
    maxRowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 데이타 행의 기본 높이를 설정합니다.
     */
    rowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 헤더 행의 기본 높이를 설정합니다.
     */
    headerRowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 좌 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenLeft: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 우 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenRight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 상단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenTop: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 하단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenBottom: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 정렬 사용여부입니다.
     */
    sortableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 멀티 정렬 사용여부입니다.
     */
    multiSortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 순서 변경 사용여부입니다.
     * 각 컬럼의 draggable 속성에 영향을 받습니다.
     */
    draggableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 편집 활성화 하는 이벤트 목록입니다.
     */
    editOnEvents: {
        type: PropType<("click" | "down" | "doubleClick")[]>;
        default: string[];
    };
    /**
     * 그리드 스타일을 정의합니다.
     */
    styles: {
        type: ObjectConstructor;
    };
    /**
     * 아이템 드래그시 항목 선택 여부입니다.
     */
    selectOnDrag: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 클립 보드 붙여넣기 사용 여부입니다.
     */
    pasteFromClipboard: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 자동 병합 사용 여부입니다.
     */
    autoMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 자동 병합시 병합영역을 체크하는 콜백형태의 함수입니다.
     */
    mergeCompare: {
        type: PropType<(t: object, tc: GridColumn, s: object, sc: GridColumn) => boolean>;
    };
    /**
     * 아이템 선택을 정의힙니다.
     */
    selectionMode: {
        type: PropType<SelectionMode_2>;
        default: string;
    };
    /**
     * 선택된 항목를 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 항목이 반환됩니다.
     */
    selectedItem: {
        type: PropType<object>;
    };
    /**
     * 복수 선택된 항목을 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 항목의 배열이 반환됩니다.
     */
    selectedItems: {
        type: PropType<object[]>;
    };
    /**
     * 선택된 셀을 설정합니다.
     */
    selectedCell: {
        type: PropType<CellPosition>;
    };
    /**
     * 복수로 선택된 셀을 설정합니다.
     */
    selectedCells: {
        type: PropType<CellPosition[]>;
    };
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
        type: PropType<string>;
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
};

export declare namespace defaultDomItemRenderer {
    let template: string;
    export function prepare(grid: any, state: any): void;
}

export declare namespace defaultHeaderRenderer {
    let template_1: string;
        { template_1 as template };
    export function prepare(grid: any, state: any): void;
    export function dispose(): void;
}

export declare namespace defaultItemEditor {
    export function created(grid: any): void;
    /**
     * 편집 완료 전 호출.
     */
    export function getSaveValue(): any;
    export function prepare(grid: any, state: any): void;
    export function dispose(): void;
    let template_3: string;
        { template_3 as template };
}

export declare namespace defaultItemRenderer {
    export function created(): void;
    export function prepare(grid: any, state: any): void;
    export function paint(ctx: any, state: any, w: any, h: any): any;
}

export declare const defaultTreeColumnProps: {
    /**
     * 레벨 별 좌측 간격입니다.
     */
    indent: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 노드 모양을 '┌' 보이게 합니다.
     */
    boxMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
        default: () => DefineComponent<{
            slotName: {
                type: StringConstructor;
            };
            initState: {
                type: PropType<TreeState_2>;
            };
        }, {
            state: ShallowRef<TreeState_2>;
            triggerState: () => void;
        }, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<{
            slotName: {
                type: StringConstructor;
            };
            initState: {
                type: PropType<TreeState_2>;
            };
        }>>, {}, {}>;
    };
};

declare const defaultTreeGridProps: {
    /**
     * 트리 구조에서 아이템의 자식 목록을 포함하는 필드의 이름을 정의합니다.
     * @default 'children'
     */
    childrenField: {
        type: StringConstructor;
        default: string;
    };
    /**
     * `items`가 갱신될 때 자동으로 확장될 아이템의 레벨을 지정합니다.
     * 예를 들어, 이 속성의 값이 2인 경우, `items`가 갱신될 때 2번째 레벨까지 모든 아이템이 자동으로 확장됩니다.
     */
    autoExpandLevel: {
        type: NumberConstructor;
        default: number;
    };
};

export declare namespace defaultTreeItemRenderer {
    let template_2: string;
        { template_2 as template };
    export function prepare(grid: any, state: any): void;
    export function onClick(e: any): void;
}

declare type EditorCellState = RendererCellState & {
    /**
     * 커스텀 에디터에서 데이터를 쉽게 변경하기 위한 훅입니다.
     * hookSetValue 함수를 사용하면 그리드 안의 데이터를 변경할 수 있습니다.
     * 편집 모드에서만 가능하고 변경된 값을 저장하고 편집 모드를 종료합니다.
     */
    hookEditEnd: (value: any) => void;
};

declare class Element_2 extends Base {
    get childContainer(): any;
    get style(): any;
    get clientWidth(): any;
    get clientHeight(): any;
    get childElementCount(): any;
    /**
     * 컨테이너에 child 추가.
     * @param child
     */
    appendChild(child: any): any;
    /**
     * 컨테이너에 child 삭제
     * @param child
     * @returns {*|Node}
     */
    removeChild(child: any): any | Node;
    setChildIndex(child: any, newIndex: any): boolean;
    /**
     * x, y만큼 위치를 변경합니다.
     * @param x
     * @param y
     */
    setPosition(x: any, y: any): boolean;
    /**
     * 너비와 높이 크기를 변경합니다.
     * @param width
     * @param height
     */
    setSize(width: any, height: any): boolean;
    setLayout(x: any, y: any, width: any, height: any): boolean;
    addEventListener(type: any, listener: any, useCapture: any, ...args: any[]): void;
    removeEventListener(type: any, listener: any, useCapture: any, ...args: any[]): void;
    dispatchEvent(event: any, ...args: any[]): any;
}

declare class EventCounter {
    constructor(...args: any[]);
    count: number;
    startCallback: any;
    endCallback: any;
    get counting(): boolean;
    start(...args: any[]): any;
    end(...args: any[]): any;
    cancel(): void;
}

declare type FilterCondition = {
    operator: NumberOperator | StringOperator;
    value: string | number | Date;
} | Array<{
    operator: NumberOperator | StringOperator;
    value: string | number | Date;
}>;

declare type FilterType = 'text' | 'number' | 'date' | 'set';

export declare namespace formatter {
        { formatter_d_IFormatter as IFormatter, add$1 as add, formatter_d_createFormatter as createFormatter, get$1 as get, remove$1 as remove };
}

/**
 * GridColumn 클래스는 데이타 그리드의 컬럼을 정의합니다.
 * @param dataField 값이 표시되는 항목의 필드
 * @param headerText 헤더영역에 표시되는 텍스트
 * @constructor
 */
export declare class GridColumn extends EventTarget {
    static create(data: any): GridColumn;
    constructor(dataField?: any, headerText?: string);
    index: number;
    _open: boolean;
    _width: any;
    _visible: boolean;
    _minWidth: number;
    _children: any[];
    _level: number;
    _depth: number;
    _formatter: any;
    _itemRenderer: any;
    _itemEditor: any;
    _headerRenderer: any;
    /**
     * 이 컬럼 영역의 셀을 편집할 수 있는지를 나타냅니다. 'true'면 편집 가능합니다.
     * 단 그리드의 editable 속성이 true 경우만 가능합니다.
     * @type {boolean}
     */
    editable: boolean;
    /**
     * 에디트 활성 마우스 이벤트 타입
     */
    editOnEvents: any;
    /**
     * 컬럼을 드래그하여 이동하여 순서를 변경가능 여부입니다.
     * @type {boolean}
     */
    draggable: boolean;
    /**
     * 컬럼의 너비를 변경 가능한지 여부입니다.
     * @type {boolean}
     */
    resizable: boolean;
    /**
     * 영역을 벗어난 경우 줄바꿈 여부
     * @type {boolean}
     */
    wordWrap: boolean;
    /**
     * 셀 텍스트를 결정하는 콜백 함수입니다.
     * 해당 컬럼의 셀의 텍스트는 `dataField`와 일치하는 아이템 객체의 프로퍼티 값으로 설정됩니다.
     * `labelFunction` 사용시 사용자가 지정한 값으로 설정할 수 있습니다.
     * ```
     * labelFunction (item : Object, column : DataGridColumn) : String{
     *      return item[column.dataField] + '%';
     * }
     * ```
     */
    labelFunction: any;
    /**
     * 해당 컬럼의 정렬를 사용여부입니다.
     * @type {boolean}
     */
    sortable: boolean;
    /**
     * 정렬이 오름차순인지 아니면 내림차순 인지를 나타냅니다.
     */
    sortDescending: boolean;
    /**
     * 정렬시 기준이 되는 데이타 타입니다. 'string', 'number', 커스텀 콜백함수(Function)를 지정합니다.
     * 콜백함수는 function(a, b, column) 형태입니다.
     */
    sortCompare: any;
    /**
     * 데이타 정렬시 원본데이타로 정렬할지 아니면 표시된 데이타로 정렬할지 여부입니다.
     */
    isSortOriginal: boolean;
    /**
     * 그리드 병합모드 사용시 행병합 여부입니다.
     */
    isRowMerge: boolean;
    /**
     * 그리드 병합모드 사용시 컬럼병합 여부입니다.
     */
    isColumnMerge: boolean;
    mergeDependColumns: any;
    height: any;
    set dataField(arg: any);
    /**
     * 셀 라벨이 표시되는 항목의 속성을 정의합니다.
     */
    get dataField(): any;
    set headerText(arg: any);
    /**
     *  컬럼 헤더의 텍스트입니다. 지정되지 않을 시 dataField를 텍스트로 사용합니다.
     */
    get headerText(): any;
    /**
     * 이 컬럼이 있는 그리드객체입니다.
     */
    get grid(): any;
    _dataField: any;
    _dataFieldPath: any;
    get dataFieldPath(): any;
    _headerText: any;
    get offsetWidth(): any;
    set width(arg: any);
    /**
     * 컬럼의 너비입니다. 지정되지 않을시 그리드 내부에서 자동으로 조절합니다.
     */
    get width(): any;
    set minWidth(arg: number);
    /**
     * 컬럼의 최소 너비입니다.
     */
    get minWidth(): number;
    set visible(arg: boolean);
    /**
     * 컬럼의 표시 여부입니다.
     */
    get visible(): boolean;
    set itemRenderer(arg: any);
    /**
     * 셀을 구성하는 클래스 팩토리입니다. 지정되지 않으면 그리드의 기본 itemRenderer 구성합니다.
     */
    get itemRenderer(): any;
    set headerRenderer(arg: any);
    /**
     * 셀을 구성하는 클래스 팩토리입니다. 지정되지 않으면 그리드의 기본 headerRenderer 구성합니다.
     */
    get headerRenderer(): any;
    set itemEditor(arg: any);
    /**
     * 항목을 편집하는데 사용되는 클래스 팩토리입니다.
     * 지정되지 않으면 그리드의 기본 itemEditor로 구성합니다.
     */
    get itemEditor(): any;
    set open(arg: boolean);
    /**
     * 멀티 헤더 구성시 하위 컬럼을 보이거나 숨기게 합니다.
     */
    get open(): boolean;
    /**
     * 이 컬럼의 레벨입니다.
     */
    get level(): number;
    /**
     * 이 컬럼의 깊이입니다.
     * @returns {*|number}
     */
    get depth(): any;
    /**
     * 이 컬럼의 부모 컬럼입니다.
     * @returns {null|*}
     */
    get parent(): any;
    set children(arg: any[]);
    /**
     * 이 컬럼의 자식컬럼목록입니다.
     * @returns {Array}
     */
    get children(): any[];
    get isLeaf(): boolean;
    set format(arg: any);
    /**
     * 컬럼 포멧를 정의합니다.
     * 포멧을 사용하기 위해선 tachyon.formatter 설정 해야 합니다.
     */
    get format(): any;
    _format: any;
    get filterInstance(): any;
    set filter(arg: any);
    /**
     * 이 컬럼의 필터를 지정합니다.
     * {
     *     type:['number','string','date'],
     *     condi
     * }
     */
    get filter(): any;
    _filter: any;
    /**
     * 스타일 부모
     * @private
     */
    private get styleParent();
    get _nonInheritingStyleNames(): string[];
    setGrid(grid: any): void;
    _grid: any;
    setWidth(width: any): void;
    setVisible(visible: any): void;
    /**
     * 지정된 항목에 대해 렌더러가 표시하는 문자열을 반환합니다.
     * dataField, labelFunction, format 영향을 받습니다.
     */
    itemToLabel(item: any): any;
    /**
     * 지정된 항목에 대해 원본 데이타를 반환합니다.
     */
    itemToValue(item: any): any;
    invalidate(): void;
    updateChildren(): void;
    _styleChanged(): void;
    toJSON(): {};
}

export declare type GridColumnGetters = {
    /**
     *  GridColumn 인스턴스입니다.
     */
    nativeInstance: GridColumn;
};

export declare interface GridColumnProvider {
    readonly grid: DataGrid;
    readonly column: GridColumn;
}

export declare type GridColumnSlot = {
    /**
     * 헤더 렌더러 슬롯
     */
    headerRenderer?: CellState;
    /**
     * 아이템 렌더러 슬롯
     */
    itemRenderer?: RendererCellState;
    /**
     * 아이템 에디터 슬롯
     */
    itemEditor?: EditorCellState;
};

export declare const GridColumnSymbol: InjectionKey<GridColumnProvider>;

export declare type GridStyles = Partial<{
    /**
     * 배경 색.
     */
    backgroundColor: string | CanvasGradient | CanvasPattern;
    /**
     * 기본 폰트
     */
    font: string;
    /**
     * 기본 폰트 색
     */
    color: string;
    /**
     * 셀 텍스트 정렬
     */
    textAlign: 'left' | 'center' | 'right';
    /**
     * 셀 수직 정렬
     */
    verticalAlign: 'top' | 'center' | 'bottom';
    /**
     * 셀 선택 배경색
     */
    cellSelectionColor: string | CanvasGradient | CanvasPattern;
    /**
     * 셀 오버 배경색
     */
    cellOverColor: string | CanvasGradient | CanvasPattern;
    /**
     * 셀 선택 텍스트 색
     */
    textSelectionColor: string | CanvasGradient | CanvasPattern;
    /**
     * 셀 오버 텍스트 색
     */
    textOverColor: string | CanvasGradient | CanvasPattern;
    /**
     * 행 배경 색
     */
    rowColors: Array<string | CanvasGradient | CanvasPattern>;
    /**
     * 셀 여백
     */
    cellPadding: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    /**
     * 행 구분선
     */
    rowLine: LineStyle;
    /**
     * 컬럼 구분선
     */
    columnLine: LineStyle;
    /**
     * 고정 구분선
     */
    frozenLine: LineStyle;
    /**
     * 캐럿
     */
    caretLine: LineStyle;
    /**
     * 헤더 행 구분선
     */
    headerRowLine: LineStyle;
    /**
     * 헤더 행 구분선
     */
    headerColumnLine: LineStyle;
    /**
     * 셀 배경색 지정
     */
    cellBackgroundColor: (rowIndex: number, columnIndex: number) => string | CanvasGradient | CanvasPattern;
}>;

declare class Group extends Element_2 {
    constructor(grid: any);
    _grid: any;
    _layers: any[];
    _reasonsMask: number;
    _invalidateFlag: boolean;
    _boundValidateNow: any;
    _freeElementMap: Map<any, any>;
    _factoryMap: Map<any, any>;
    _scrollLeft: number;
    _scrollTop: number;
    _lockedDisplay: boolean;
    hookFreeElement: any;
    get grid(): any;
    /**
     * 컨텐츠의 너비입니다.
     * @returns {number}
     */
    get contentWidth(): number;
    /**
     * 컨텐츠의 높이입니다.
     * @returns {number}
     */
    get contentHeight(): number;
    /**
     * scrollLeft의 최대값입니다.
     * @returns {number}
     */
    get maxScrollLeft(): number;
    /**
     * scrollTop의 최대값입니다.
     * @returns {number}
     */
    get maxScrollTop(): number;
    set scrollLeft(arg: number);
    /**
     * 수평 스크롤 위치값입니다.
     * @returns {number}
     */
    get scrollLeft(): number;
    set scrollTop(arg: number);
    /**
     * 수직 스크롤 위치값입니다.
     * @returns {number}
     */
    get scrollTop(): number;
    /**
     * 컨텐츠 너비와 높이를 설정합니다.
     * @param width
     * @param height
     */
    setContentSize(width: any, height: any): void;
    _contentWidth: any;
    _contentHeight: any;
    getScrollRect(): Rectangle;
    getHorizontalScrollPositionDelta(delta: any): 30 | -30;
    getVerticalScrollPositionDelta(delta: any): 30 | -30;
    lockDisplay(): void;
    unlockDisplay(): void;
    invalidate(reason: any): void;
    validateNow(): void;
    _inUpdateDisplay: boolean;
    clearElementCache(): void;
    invalidateFor(...reasons: any[]): void;
    isInvalidateReason(...args: any[]): boolean;
    _addLayer(layer: any): any;
    _beginLayers(): void;
    _endLayers(): void;
    _prepareLayers(scrollX: any, scrollY: any, width: any, height: any): void;
    _updateLayers(scrollX: any, scrollY: any, width: any, height: any, contentWidth: any, contentHeight: any, frozenRect: any): void;
    _createRenderer(...args: any[]): any;
    _freeRenderer(element: any): boolean;
    _itemToFactory(...args: any[]): any;
    _itemToTemplate(): void;
    _updateScrollRect(): void;
    _updateDisplay(): void;
    _mouseEventToContent(event: any): void;
    _mouseEventToLocal(event: any): Point;
}

declare class HeaderCell extends Cell {
    constructor(column: any);
}

declare class HeaderDimensions {
    constructor(headerGroup: any);
    headerGroup: any;
    _visibleColumns: any[];
    _visibleLayouts: any[];
    _oldVisibleColumns: any[];
    _pendingHeaders: any[];
    _headers: any[];
    _rowCount: number;
    _rowHeight: number;
    get dataGroup(): any;
    get columnCollection(): any;
    get rowCount(): number;
    get headers(): any[];
    get rowHeight(): number;
    get headerHeight(): number;
    setRowDefaultHeight(value: any): void;
    updateStart(): void;
    updateEnd(): {
        headers: any[];
    };
    getHeader(column: any): any;
    setHeader(column: any, header: any): void;
    takeHeader(column: any): any;
    createHeader(column: any): HeaderCell;
    isOpenColumn(column: any): boolean;
    getHeaderLayout(column: any): any;
    /**
     * 헤더 행개수를 갱신합니다.
     */
    updateHeaderRowCount(): void;
    /**
     * 헤더 컬럼 위치정보를 갱신합니다.
     */
    updateHeaderColumnLayouts(): void;
    calculateHeaderLayout(column: any): any;
    forEachHeaderLayouts(callback: any): void;
    clear(): void;
}

declare class HeaderGroup extends Group {
    _headerDimensions: HeaderDimensions;
    _selectionLayer: any;
    _rendererLayer: any;
    _separatorLayer: any;
    _headerRenderer: any;
    set headerRowHeight(arg: number);
    get headerRowHeight(): number;
    _boundDocumentMouseMove: any;
    _boundDocumentMouseUp: any;
    set headerRenderer(arg: any);
    get headerRenderer(): any;
    get headerHeight(): number;
    get dataGroup(): any;
    get normalizedColumns(): any;
    doLayout(needAllUpdate: any): void;
    /**
     * x,y 위치로 컬럼을 반환합니다. x,y는 컨텐츠 좌표입니다.
     * @param x
     * @param y
     * @returns {null}
     */
    getColumnByPosition(x: any, y: any): null;
    /**
     * 지정된 컬럼의 헤더 위치정보를 반환합니다.
     * @param column
     * @returns {*|null}
     */
    getHeaderLayout(column: any): any | null;
    clearHeaderRenderers(): void;
    clearCache(): void;
    destroy(): void;
    _measureSize(): void;
    _createHeaders(scrollX: any, scrollY: any, width: any, height: any): void;
    _createHeader(column: any, layout: any, cacheHeader: any): any;
    _setupHeader(header: any, column: any): any;
    _paintHeader(context: any, header: any, layout: any): void;
    _paintSeparators(scrollX: any, scrollY: any, width: any, height: any): void;
    _freeHeaders(headers: any): void;
    _itemToTemplate(column: any): any;
    _getStyle(key: any): any;
    _dispatchDataGridHeaderEvent(type: any, column: any, trigger: any): any;
    _mouseEventToContent(event: any): Point;
    _getSeparatorColumn(event: any): any;
    _onMouseDown(event: any): void;
    _mouseDownPoint: Point;
    _mouseDownColumn: any;
    _mouseDownSeparatorColumn: any;
    _onMouseMove(event: any): void;
    _overSeparatorColumn: any;
    _overColumn: any;
    _onMouseOut(event: any): void;
    _onDocumentMouseMove(event: any): void;
    _onDocumentMouseUp(event: any): void;
    _lastClickTime: number;
    _onDataGroupEvent(event: any): void;
}

export declare namespace helper {
        { canvas_d_lineTo as lineTo, canvas_d_measureFontHeight as measureFontHeight, canvas_d_measureTextWidth as measureTextWidth, canvas_d_paintMultiLine as paintMultiLine, canvas_d_paintSingleLine as paintSingleLine };
}

export declare class HierarchyList extends IList {
    constructor(source: any);
    nodeEventCounter: EventCounter;
    _rootNode: any;
    _displayableNodes: any[];
    _openNodesMap: Map<any, any>;
    _parentMap: Map<any, any>;
    _childrenMap: Map<any, any>;
    _childrenField: string;
    _displayPolicy: string;
    get displayableNodes(): any[];
    set childrenField(arg: string);
    get childrenField(): string;
    set displayPolicy(arg: string);
    get displayPolicy(): string;
    /**
     * 해당 노드의 부모 노드를 반환합니다.
     * @param node 자식 노드입니다.
     * @returns {*}
     */
    getParentNode(node: any): any;
    /**
     * 해당 노드의 조상 노드 목록을 반환합니다.
     * @param node
     * @returns {Array}
     */
    getAncestorNodes(node: any): any[];
    /**
     * 해당 노드의 후손 노드 목록을 반환합니다.
     * @param node
     * @returns {Array}
     */
    getDescendantNodes(node: any): any[];
    /**
     * @param node
     * @return {null|unknown}
     * @private
     */
    private _internalGetParentNode;
    /**
     * 해당 노드의 자식노드들을 반환합니다.
     * @param node 부모 노드입니다.
     * @returns {Array} 자식노드 배열입니다.
     */
    getChildren(node: any): any[];
    /**
     * 해당 노드의 가공되지 않은 원본 자식노드들을 반환합니다.
     * @param node 부모 노드입니다.
     * @returns {Array} 자식노드 배열입니다.
     */
    getNativeChildren(node: any): any[];
    /**
     * 해당노드 하위의 열린 노드들을 배열형태로 반환합니다.
     * @param node 부모 노드입니다.
     * @returns {Array} 자식노드 배열입니다.
     */
    getDisplayableChildren(node: any): any[];
    /**
     * 해당노드의 형제노드들을 반환합니다.
     * @returns {Array} 형제노드 배열입니다.
     */
    getSiblingNodes(node: any): any[];
    /**
     * 해당 노드 부모의 기준으로 인덱스를 반환합니다.
     * @param node
     * @returns {Number} 형제 노드목록에서의 인덱스.
     */
    getNodeIndex(node: any): number;
    _internalGetDisplayableChildren(node: any, doParentMapping: any): any[];
    /**
     * 해당 노드에 자식이 있는지 확인합니다.
     * @param node
     * @returns {boolean}
     */
    hasChildren(node: any): boolean;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param node 추가할 자식 노드
     * @returns {boolean}
     */
    addNode(parent: any, node: any): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param node 추가할 자식 노드.
     * @param index 자식 노드 삽입 위치의 인덱스.
     * @returns {boolean}
     */
    addNodeAt(parent: any, node: any, index: any): boolean;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param nodes 추가할 자식 노드 목록
     * @returns {boolean}
     */
    addNodes(parent: any, nodes: any): boolean;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param nodes 추가할 자식 노드 목록
     * @param index 자식 노드 삽입 위치의 인덱스.
     * @returns {boolean}
     */
    addNodesAt(parent: any, nodes: any, index: any): boolean;
    /**
     *
     * @param node
     * @param toParent
     * @param toIndex
     * @returns {boolean}
     */
    moveNode(node: any, toParent: any, toIndex: any): boolean;
    /**
     * 부모 노드에서 자식 노드를 삭제합니다.
     * @param parent 부모 노드입니다.
     * @param node 삭제할 자식 노드 입니다.
     * @returns {boolean}
     */
    removeNode(parent: any, node: any): boolean;
    /**
     * 부모 노드에서 자식 노드를 삭제합니다.
     * @param parent 부모 노드입니다.
     * @param nodes 자식 노드 목록입니다.
     * @returns {boolean}
     */
    removeNodes(parent: any, nodes: any): boolean;
    /**
     * 해당 node가 있는지 확인합니다.
     * @param node
     * @return {boolean} 노드가 포함되어 있으면 true.
     */
    contains(node: any): boolean;
    /**
     * 해당 node 목록 있는지 확인합니다.
     * @param nodes {Array}
     * @return {boolean} 노드가 포함되어 있으면 true.
     */
    containsAll(nodes: any[]): boolean;
    /**
     * 해당 노드가 확장되어 있는지 확인합니다.
     * @param node
     * @return {boolean} 노드가 확장되어 있으면 true.
     */
    isOpenNode(node: any): boolean;
    /**
     * 해당 노느가 출력된 노드인지 확인합니다.
     * @param node
     * @return {boolean} 출련된 노드면 true.
     */
    isDisplayableNode(node: any): boolean;
    /**
     * 해당 노드를 확장합니다.
     * @param node
     * @return {boolean} 해당 노드가 확장되면 true.
     */
    openNode(node: any): boolean;
    _internalOpenNode(node: any, dispatch: any): void;
    /**
     * 해당 노드를 축소합니다.
     * @param node
     * @return {boolean} 해당 노드가 축소되면 true.
     */
    closeNode(node: any): boolean;
    _internalCloseNode(node: any): void;
    /**
     * 해당 노드 배열을 확장합니다.
     * @param nodes
     */
    openNodes(nodes: any): void;
    /**
     * 확장되어있는 노드목록을 반환합니다.
     * @returns {Array} 확장된 노드 목록
     */
    getOpenedNodes(): any[];
    /**
     * 해당 노드의 레벨을 반환합니다.
     * @returns {Number} 노드 레벨
     */
    getNodeLevel(node: any): number;
    /**
     * 해당 노드의 깊이를 반환합니다.
     * @param node
     */
    getNodeDepth(node: any): any;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 true를 반환하는 모든 항목이 포함된 새 배열을 만듭니다
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return {Array} callback true 반환하는 항목의 배열입니다.
     */
    find(callback: any, prefetchNode: any, postOrder: any): any[];
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 처음으로 true를 반환하는 항목을 반환하고 탐색을 중지합니다.
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return {*} 처음으로 true 반환하는 항목입니다.
     */
    findOne(callback: any, prefetchNode: any, postOrder: any): any;
    /**
     * 전체 노드를 확장합니다.
     */
    expandAll(): void;
    /**
     * 전체 노드를 축소합니다.
     */
    collapseAll(): void;
    _resetDisplayableNodes(): void;
    _getParentsInNodes(nodes: any): any;
    _addOpenNodeMapping(node: any): void;
    _removeOpenNodeMapping(node: any): void;
    _addAllParentMapping(): void;
    _lockAllParentMapping: boolean;
    _addParentMapping(parent: any, node: any): void;
    _removeParentMapping(node: any): void;
    _addChildrenMapping(node: any, children: any): void;
    _removeChildrenMapping(node: any): void;
    dispatchNodeEvent(kind: any, bubbles: any, cancelable: any, nodes: any, parent: any, optionalParams?: any): boolean;
}

declare type HierarchyListEvent = CustomEvent<{
    kind: HierarchyListKind;
    nodes: Array<object>;
    parent: object;
    toParent?: object;
    toIndex?: number;
}>;

declare type HierarchyListKind = 'collapsing' | 'collapse' | 'expanding' | 'expand' | 'add' | 'remove' | 'move';

export declare class IList extends EventTarget {
    collectionEventCounter: EventCounter;
    _source: any;
    _active: any;
    _sortFunction: any;
    _filterFunction: any;
    set source(arg: any);
    /**
     *
     */
    get source(): any;
    get length(): any;
    get isEmpty(): boolean;
    set filterFunction(arg: any);
    get filterFunction(): any;
    get sortFunction(): any;
    get localItems(): any;
    get(index: any): any;
    indexOf(item: any, fromIndex: any): any;
    lastIndexOf(item: any, fromIndex: any): any;
    contains(item: any): boolean;
    containsAll(items: any): boolean;
    setValue(index: any, property: any, value: any): boolean;
    setItemValue(item: any, property: any, value: any): boolean;
    sort(sortFields: any): void;
    forEach(callback: any): void;
    /**
     * 아이템 목록을 재갱신합니다.
     */
    refresh(): void;
    clear(): void;
    toArray(): any;
    subList(fromIndex: any, toIndex: any): any;
    _reset(): void;
    _internalSetValue(item: any, property: any, value: any): boolean;
    /**
     * @private
     */
    private _internalRefresh;
    dispatchCollectionEvent(kind: any, item: any, index: any, oldIndex: any): boolean;
}

declare const install: Exclude<Plugin_2['install'], undefined>;
export default install;

export declare function internalColumnSetup<Column extends GridColumn>(props: Record<string, any>, context: SetupContext, nativeInstance: Column): {
    nativeInstance: Column;
};

declare class LinearVector {
    _defaultSize: number;
    _blocks: any[];
    _gap: number;
    _maxIndex: number;
    get itemFactory(): () => {
        value: number;
    };
    set gap(arg: number);
    get gap(): number;
    set defaultSize(arg: number);
    get defaultSize(): number;
    /**
     * 사이즈 설정된 최대 인덱스.
     * @returns {number}
     */
    get maxIndex(): number;
    set length(arg: number);
    get length(): number;
    _length: any;
    clear(): void;
    setSize(index: any, value: any): boolean;
    getSize(index: any): any;
    indexOf(size: any): number;
    getTotal(from: any, to: any): number;
    addSize(index: any, value: any): void;
    removeSize(index: any): void;
    getItem(index: any): any;
    getItemValue(item: any): any;
    _createBlock(index: any): Block;
    _getBlock(index: any): any;
    _getBlockTotal(block: any): any;
    _getBlockTotalAt(index: any): any;
}

declare type LineStyle = {
    width?: number;
    color?: string | CanvasGradient | CanvasPattern;
    dashed?: Array<number>;
};

declare type NumberOperator = 'equals' | 'notEqual' | 'lessThan' | 'lessThanOrEqual' | 'greaterThan' | 'greaterThanOrEqual';

/**
 * Point 2차원 좌표계에서의 위치.
 * @param x
 * @param y
 * @constructor
 */
declare class Point {
    /**
     * 두점 사이의 거리를 구합니다.
     * @param p1
     * @param p2
     * @returns {number}
     */
    static distance(p1: any, p2: any): number;
    constructor(x: any, y: any);
    get length(): number;
    /**
     * x, y 좌표를 설정합니다.
     * @param x
     * @param y
     * @returns {Point}
     */
    setValues(x: any, y: any): Point;
    x: any;
    y: any;
    /**
     * 객체의 복사본을 만듭니다.
     * @returns {Point}
     */
    clone(): Point;
    /**
     * x, y좌표를 문자열로 반환합니다.
     * @returns {string}
     */
    toString(): string;
}

/**
 * Rectangle (x,y)를 시작점으로 width, height 크기를 가진 영역.
 * @param x
 * @param y
 * @param width
 * @param height
 * @constructor
 */
declare class Rectangle {
    constructor(x: any, y: any, width: any, height: any);
    set left(arg: number);
    /**
     * 사각형의 왼쪽 x 좌표 입니다.
     * @returns {number}
     */
    get left(): number;
    x: any;
    set right(arg: number);
    /**
     * 사각형의 오른쪽 x 좌표 입니다.
     * @returns {number}
     */
    get right(): number;
    width: any;
    set top(arg: number);
    /**
     * 사각형의 위쪽 y 좌표 입니다.
     * @returns {number}
     */
    get top(): number;
    y: any;
    set bottom(arg: number);
    /**
     * 사각형의 아래쪽 y 좌표 입니다.
     * @returns {number}
     */
    get bottom(): number;
    height: any;
    /**
     * x, y, width, height 속성을 설정합니다.
     * @param x
     * @param y
     * @param width
     * @param height
     * @returns {Rectangle}
     */
    setValues(x: any, y: any, width: any, height: any): Rectangle;
    /**
     *  지정된 rect이 자신의 영역과 같은지 여부입니다.
     * @param rect
     * @returns {boolean}
     */
    equals(rect: any): boolean;
    extend(x: any, y: any, width: any, height: any): this;
    /**
     * 지정된 영역이 자신영역 내에 포함되는지 여부입니다.
     * @param x
     * @param y
     * @param width
     * @param height
     * @returns {boolean}
     */
    contains(x: any, y: any, width: any, height: any): boolean;
    /**
     * 지정된 rect이 자신 영역 내에 포함되는지 여부입니다.
     * @param rect
     * @returns {boolean}
     */
    containsRect(rect: any): boolean;
    /**
     * 지정된 rect과 결합하여 새로운 사각형을 반환합니다.
     * @param rect
     * @returns {Rectangle}
     */
    union(rect: any): Rectangle;
    /**
     * 지정된 rect이 자신과 교차 새로운 사각형을 반환합니다.
     * @param rect
     * @returns {boolean}
     */
    intersection(rect: any): boolean;
    /**
     * 지정된 rect이 자신과 교차하는지 여부입니다.
     * @param rect
     * @returns {boolean}
     */
    intersects(rect: any): boolean;
    /**
     * 모든 속성을 0으로 설정합니다.
     */
    setEmpty(): void;
    /**
     * 객체 영역이 비어있는지 여부입니다.
     * @returns {boolean}
     */
    isEmpty(): boolean;
    /**
     * 객체의 복사본을 만듭니다.
     * @returns {Rectangle}
     */
    clone(): Rectangle;
    toString(): string;
}

declare type RendererCellState = CellState & {
    /**
     * 커스텀 렌더러에서 데이터를 쉽게 변경하기 위한 훅입니다.
     * hookSetValue 함수를 사용하면 그리드 안의 데이터를 변경할 수 있습니다.
     */
    hookSetValue: (value: any) => void;
};

declare class RendererLayer extends RendererLayer_base {
    constructor(name: any);
    /**
     *
     * @type {Array<Section>}
     * @private
     */
    private _sections;
    _overlaySection: Base;
    begin(): void;
    end(): void;
    updateLayout(x: any, y: any, width: any, height: any, contentWidth: any, contentHeight: any, frozenRect: any): void;
    addElement(vIndex: any, hIndex: any, element: any): any;
    addOverlayElement(element: any): void;
    removeElement(element: any): void;
    _getSection(vIndex: any, hIndex: any): typeof Base;
}

declare const RendererLayer_base: typeof Base;

declare class Row {
    constructor(dimension: any, index?: number);
    _dimension: any;
    _cells: any[];
    _layout: any;
    _height: number;
    _index: number;
    get index(): number;
    get columnIndices(): any;
    get cells(): any[];
    get layout(): any;
    get height(): number;
    setIndex(index: any): void;
    setCells(cells: any): this;
    setHeight(value: any): this;
    setLayout(layout: any): this;
    getCellAt(columnIndex: any): any;
    takeCellAt(columnIndex: any): any;
}

declare class RowLinearVector extends LinearVector {
    constructor(index: any);
    get itemFactory(): () => {
        value: number;
        cellHeights: any[];
        maxCellHeight: number;
    };
    getMaxCellHeight(rowIndex: any): any;
    setCellHeight(rowIndex: any, columnIndex: any, height: any): boolean;
    insertColumns(index: any, count: any): void;
    removeColumns(index: any, count: any): void;
    _updateMaxCellHeight(item: any): void;
}

declare type SelectionChangeEvent = CustomEvent<{
    kind: string;
    cell: CellPosition;
    cells: Array<CellPosition>;
}>;

declare type SelectionMode_2 = 'singleRow' | 'multipleRows' | 'singleCell' | 'multipleCells';

declare type StringOperator = 'contains' | 'notContains' | 'startsWith' | 'endsWith';

export declare const TachyonColumn: DefineComponent<{
    /**
     * 셀에 표시될 텍스트를 결정하는 필드를 정의합니다.
     */
    dataField: {
        type: PropType<string>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 컬럼 헤더의 텍스트입니다. 지정되지 않을시 'dataField' 속성을 사용합니다.
     */
    headerText: {
        type: PropType<string>;
    };
    /**
     * 컬럼의 너비입니다. 지정되지 않을시 그리드 내부에서 자동으로 조절합니다.
     */
    width: {
        type: PropType<number>;
    };
    /**
     * 컬럼의 최소 너비입니다.
     */
    minWidth: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 표시 여부입니다.
     */
    visible: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 해당 컬럼 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 정렬 사용 여부입니다.
     */
    sortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼을 드래그하여 이동하여 순서 변경가능 여부입니다.
     */
    draggable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 정렬이 오름차순인지 아니면 내림차순 인지를 나타냅니다.
     */
    sortDescending: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 정렬 형태(문자열, 숫자, 콜백함수)를 정의합니다.
     */
    sortCompare: {
        type: PropType<(a: any, b: any, column: GridColumn) => number>;
    };
    /**
     * 포멧된 데이타가 아닌 원본 데이타기준으로 정렬 여부입니다.
     */
    isSortOriginal: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 표시 텍스트가 영역을 벗어난 경우 줄바꿈 여부입니다.
     */
    wordWrap: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 행병합 여부입니다.
     */
    isRowMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 컬럼병합 여부입니다.
     */
    isColumnMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 해당 컬럼의 행 병합크기를 다른 컬럼의 행 크기를 종속하게 합니다.
     */
    mergeDependColumns: {
        type: PropType<string[]>;
    };
    /**
     * 해당 컬럼 영역의 스타일을 정의합니다.
     */
    styles: {
        type: PropType<Partial<{
            backgroundColor: string | CanvasGradient | CanvasPattern;
            font: string;
            color: string;
            textAlign: "left" | "center" | "right";
            verticalAlign: "center" | "top" | "bottom";
            cellSelectionColor: string | CanvasGradient | CanvasPattern;
            cellOverColor: string | CanvasGradient | CanvasPattern;
            textSelectionColor: string | CanvasGradient | CanvasPattern;
            textOverColor: string | CanvasGradient | CanvasPattern;
            rowColors: (string | CanvasGradient | CanvasPattern)[];
            cellPadding: {
                left: number;
                right: number;
                top: number;
                bottom: number;
            };
            rowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            }; /**
            *  GridColumn 인스턴스입니다.
            */
            columnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            frozenLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            /**
             * 헤더 렌더러 슬롯
             */
            caretLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerRowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerColumnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            cellBackgroundColor: (rowIndex: number, columnIndex: number) => string | CanvasGradient | CanvasPattern;
        }>>;
    };
    /**
     * 식 컬럼 헤더를 보이거나 숨깁니다.
     */
    collapse: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 이 컬럼의 셀에 라벨에 포멧를 정의합니다.
     * 포멧의 정의 tachyon.formatter.add 사용합니다.
     */
    format: {
        type: PropType<{
            [p: string]: any;
            type: string;
            pattern: string;
        }>;
    };
    /**
     * 해당 컬럼의 필터를 정의합니다.
     */
    filter: {
        type: PropType<{
            type: FilterType;
            condition: FilterCondition;
        }>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
}, {}, GridColumnGetters, {}, {}, {}, {}, {}, string, PublicProps, ExtractPropTypes<{
    /**
     * 셀에 표시될 텍스트를 결정하는 필드를 정의합니다.
     */
    dataField: {
        type: PropType<string>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 컬럼 헤더의 텍스트입니다. 지정되지 않을시 'dataField' 속성을 사용합니다.
     */
    headerText: {
        type: PropType<string>;
    };
    /**
     * 컬럼의 너비입니다. 지정되지 않을시 그리드 내부에서 자동으로 조절합니다.
     */
    width: {
        type: PropType<number>;
    };
    /**
     * 컬럼의 최소 너비입니다.
     */
    minWidth: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 표시 여부입니다.
     */
    visible: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 해당 컬럼 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 정렬 사용 여부입니다.
     */
    sortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼을 드래그하여 이동하여 순서 변경가능 여부입니다.
     */
    draggable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 정렬이 오름차순인지 아니면 내림차순 인지를 나타냅니다.
     */
    sortDescending: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 정렬 형태(문자열, 숫자, 콜백함수)를 정의합니다.
     */
    sortCompare: {
        type: PropType<(a: any, b: any, column: GridColumn) => number>;
    };
    /**
     * 포멧된 데이타가 아닌 원본 데이타기준으로 정렬 여부입니다.
     */
    isSortOriginal: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 표시 텍스트가 영역을 벗어난 경우 줄바꿈 여부입니다.
     */
    wordWrap: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 행병합 여부입니다.
     */
    isRowMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 컬럼병합 여부입니다.
     */
    isColumnMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 해당 컬럼의 행 병합크기를 다른 컬럼의 행 크기를 종속하게 합니다.
     */
    mergeDependColumns: {
        type: PropType<string[]>;
    };
    /**
     * 해당 컬럼 영역의 스타일을 정의합니다.
     */
    styles: {
        type: PropType<Partial<{
            backgroundColor: string | CanvasGradient | CanvasPattern;
            font: string;
            color: string;
            textAlign: "left" | "center" | "right";
            verticalAlign: "center" | "top" | "bottom";
            cellSelectionColor: string | CanvasGradient | CanvasPattern;
            cellOverColor: string | CanvasGradient | CanvasPattern;
            textSelectionColor: string | CanvasGradient | CanvasPattern;
            textOverColor: string | CanvasGradient | CanvasPattern;
            rowColors: (string | CanvasGradient | CanvasPattern)[];
            cellPadding: {
                left: number;
                right: number;
                top: number;
                bottom: number;
            };
            rowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            }; /**
            *  GridColumn 인스턴스입니다.
            */
            columnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            frozenLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            /**
             * 헤더 렌더러 슬롯
             */
            caretLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerRowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerColumnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            cellBackgroundColor: (rowIndex: number, columnIndex: number) => string | CanvasGradient | CanvasPattern;
        }>>;
    };
    /**
     * 식 컬럼 헤더를 보이거나 숨깁니다.
     */
    collapse: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 이 컬럼의 셀에 라벨에 포멧를 정의합니다.
     * 포멧의 정의 tachyon.formatter.add 사용합니다.
     */
    format: {
        type: PropType<{
            [p: string]: any;
            type: string;
            pattern: string;
        }>;
    };
    /**
     * 해당 컬럼의 필터를 정의합니다.
     */
    filter: {
        type: PropType<{
            type: FilterType;
            condition: FilterCondition;
        }>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
}>, ExtractPropTypes<{
    /**
     * 셀에 표시될 텍스트를 결정하는 필드를 정의합니다.
     */
    dataField: {
        type: PropType<string>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 컬럼 헤더의 텍스트입니다. 지정되지 않을시 'dataField' 속성을 사용합니다.
     */
    headerText: {
        type: PropType<string>;
    };
    /**
     * 컬럼의 너비입니다. 지정되지 않을시 그리드 내부에서 자동으로 조절합니다.
     */
    width: {
        type: PropType<number>;
    };
    /**
     * 컬럼의 최소 너비입니다.
     */
    minWidth: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 표시 여부입니다.
     */
    visible: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 해당 컬럼 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 정렬 사용 여부입니다.
     */
    sortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼을 드래그하여 이동하여 순서 변경가능 여부입니다.
     */
    draggable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 정렬이 오름차순인지 아니면 내림차순 인지를 나타냅니다.
     */
    sortDescending: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 정렬 형태(문자열, 숫자, 콜백함수)를 정의합니다.
     */
    sortCompare: {
        type: PropType<(a: any, b: any, column: GridColumn) => number>;
    };
    /**
     * 포멧된 데이타가 아닌 원본 데이타기준으로 정렬 여부입니다.
     */
    isSortOriginal: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 표시 텍스트가 영역을 벗어난 경우 줄바꿈 여부입니다.
     */
    wordWrap: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 행병합 여부입니다.
     */
    isRowMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 컬럼병합 여부입니다.
     */
    isColumnMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 그리드 병합모드 사용시 해당 컬럼의 행 병합크기를 다른 컬럼의 행 크기를 종속하게 합니다.
     */
    mergeDependColumns: {
        type: PropType<string[]>;
    };
    /**
     * 해당 컬럼 영역의 스타일을 정의합니다.
     */
    styles: {
        type: PropType<Partial<{
            backgroundColor: string | CanvasGradient | CanvasPattern;
            font: string;
            color: string;
            textAlign: "left" | "center" | "right";
            verticalAlign: "center" | "top" | "bottom";
            cellSelectionColor: string | CanvasGradient | CanvasPattern;
            cellOverColor: string | CanvasGradient | CanvasPattern;
            textSelectionColor: string | CanvasGradient | CanvasPattern;
            textOverColor: string | CanvasGradient | CanvasPattern;
            rowColors: (string | CanvasGradient | CanvasPattern)[];
            cellPadding: {
                left: number;
                right: number;
                top: number;
                bottom: number;
            };
            rowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            }; /**
            *  GridColumn 인스턴스입니다.
            */
            columnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            frozenLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            /**
             * 헤더 렌더러 슬롯
             */
            caretLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerRowLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            headerColumnLine: {
                width?: number;
                color?: string | CanvasGradient | CanvasPattern;
                dashed?: number[];
            };
            cellBackgroundColor: (rowIndex: number, columnIndex: number) => string | CanvasGradient | CanvasPattern;
        }>>;
    };
    /**
     * 식 컬럼 헤더를 보이거나 숨깁니다.
     */
    collapse: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 이 컬럼의 셀에 라벨에 포멧를 정의합니다.
     * 포멧의 정의 tachyon.formatter.add 사용합니다.
     */
    format: {
        type: PropType<{
            [p: string]: any;
            type: string;
            pattern: string;
        }>;
    };
    /**
     * 해당 컬럼의 필터를 정의합니다.
     */
    filter: {
        type: PropType<{
            type: FilterType;
            condition: FilterCondition;
        }>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
}>, SlotsType<GridColumnSlot>>;

export declare const TachyonGrid: DefineComponent<{
    modelValue: {
        type: PropType<object | object[] | CellPosition[]>;
    };
    /**
     * 그리드 표시되는 데이타 목록입니다.
     */
    items: {
        type: PropType<Record<string, any>[]>;
    };
    /**
     * 그리드 헤더에 표시되는 컬럼목록입니다.
     */
    columns: {
        type: PropType<GridColumn[]>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 그리드의 표현되는 행의 수를 설정합니다.
     */
    rowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 그리드의 표현되는 최대 행의 수를 설정합니다.
     */
    maxRowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 데이타 행의 기본 높이를 설정합니다.
     */
    rowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 헤더 행의 기본 높이를 설정합니다.
     */
    headerRowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 좌 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenLeft: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 우 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenRight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 상단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenTop: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 하단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenBottom: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 정렬 사용여부입니다.
     */
    sortableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 멀티 정렬 사용여부입니다.
     */
    multiSortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 순서 변경 사용여부입니다.
     * 각 컬럼의 draggable 속성에 영향을 받습니다.
     */
    draggableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 편집 활성화 하는 이벤트 목록입니다.
     */
    editOnEvents: {
        type: PropType<("click" | "down" | "doubleClick")[]>;
        default: string[];
    };
    /**
     * 그리드 스타일을 정의합니다.
     */
    styles: {
        type: ObjectConstructor;
    };
    /**
     * 아이템 드래그시 항목 선택 여부입니다.
     */
    selectOnDrag: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 클립 보드 붙여넣기 사용 여부입니다.
     */
    pasteFromClipboard: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 자동 병합 사용 여부입니다.
     */
    autoMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 자동 병합시 병합영역을 체크하는 콜백형태의 함수입니다.
     */
    mergeCompare: {
        type: PropType<(t: object, tc: GridColumn, s: object, sc: GridColumn) => boolean>;
    };
    /**
     * 아이템 선택을 정의힙니다.
     */
    selectionMode: {
        type: PropType<SelectionMode_2>;
        default: string;
    };
    /**
     * 선택된 항목를 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 항목이 반환됩니다.
     */
    selectedItem: {
        type: PropType<object>;
    };
    /**
     * 복수 선택된 항목을 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 항목의 배열이 반환됩니다.
     */
    selectedItems: {
        type: PropType<object[]>;
    };
    /**
     * 선택된 셀을 설정합니다.
     */
    selectedCell: {
        type: PropType<CellPosition>;
    };
    /**
     * 복수로 선택된 셀을 설정합니다.
     */
    selectedCells: {
        type: PropType<CellPosition[]>;
    };
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
        type: PropType<string>;
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
}, {}, DataGridGetters, {}, DataGridMethods, {}, {}, DataGridEvents, string, PublicProps, ExtractPropTypes<{
    modelValue: {
        type: PropType<object | object[] | CellPosition[]>;
    };
    /**
     * 그리드 표시되는 데이타 목록입니다.
     */
    items: {
        type: PropType<Record<string, any>[]>;
    };
    /**
     * 그리드 헤더에 표시되는 컬럼목록입니다.
     */
    columns: {
        type: PropType<GridColumn[]>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 그리드의 표현되는 행의 수를 설정합니다.
     */
    rowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 그리드의 표현되는 최대 행의 수를 설정합니다.
     */
    maxRowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 데이타 행의 기본 높이를 설정합니다.
     */
    rowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 헤더 행의 기본 높이를 설정합니다.
     */
    headerRowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 좌 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenLeft: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 우 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenRight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 상단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenTop: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 하단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenBottom: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 정렬 사용여부입니다.
     */
    sortableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 멀티 정렬 사용여부입니다.
     */
    multiSortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 순서 변경 사용여부입니다.
     * 각 컬럼의 draggable 속성에 영향을 받습니다.
     */
    draggableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 편집 활성화 하는 이벤트 목록입니다.
     */
    editOnEvents: {
        type: PropType<("click" | "down" | "doubleClick")[]>;
        default: string[];
    };
    /**
     * 그리드 스타일을 정의합니다.
     */
    styles: {
        type: ObjectConstructor;
    };
    /**
     * 아이템 드래그시 항목 선택 여부입니다.
     */
    selectOnDrag: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 클립 보드 붙여넣기 사용 여부입니다.
     */
    pasteFromClipboard: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 자동 병합 사용 여부입니다.
     */
    autoMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 자동 병합시 병합영역을 체크하는 콜백형태의 함수입니다.
     */
    mergeCompare: {
        type: PropType<(t: object, tc: GridColumn, s: object, sc: GridColumn) => boolean>;
    };
    /**
     * 아이템 선택을 정의힙니다.
     */
    selectionMode: {
        type: PropType<SelectionMode_2>;
        default: string;
    };
    /**
     * 선택된 항목를 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 항목이 반환됩니다.
     */
    selectedItem: {
        type: PropType<object>;
    };
    /**
     * 복수 선택된 항목을 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 항목의 배열이 반환됩니다.
     */
    selectedItems: {
        type: PropType<object[]>;
    };
    /**
     * 선택된 셀을 설정합니다.
     */
    selectedCell: {
        type: PropType<CellPosition>;
    };
    /**
     * 복수로 선택된 셀을 설정합니다.
     */
    selectedCells: {
        type: PropType<CellPosition[]>;
    };
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
        type: PropType<string>;
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
}>, ExtractPropTypes<{
    modelValue: {
        type: PropType<object | object[] | CellPosition[]>;
    };
    /**
     * 그리드 표시되는 데이타 목록입니다.
     */
    items: {
        type: PropType<Record<string, any>[]>;
    };
    /**
     * 그리드 헤더에 표시되는 컬럼목록입니다.
     */
    columns: {
        type: PropType<GridColumn[]>;
    };
    /**
     * 헤더영역을 구성하는 헤더 렌더러입니다.
     */
    headerRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타영역을 구성하는 셀 렌더러입니다
     */
    itemRenderer: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
    /**
     * 데이타편집을 구성하는 셀 렌더러입니다
     */
    itemEditor: {
        type: PropType<AnyDefineComponent | ((item: object, column: GridColumn) => AnyDefineComponent)>;
    };
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
        type: PropType<(item?: object, column?: GridColumn) => string>;
    };
    /**
     * 그리드의 표현되는 행의 수를 설정합니다.
     */
    rowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 그리드의 표현되는 최대 행의 수를 설정합니다.
     */
    maxRowCount: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 데이타 행의 기본 높이를 설정합니다.
     */
    rowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 헤더 행의 기본 높이를 설정합니다.
     */
    headerRowHeight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 좌 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenLeft: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 우 기준으로 행을 고정합니다.
     * 수평스크롤에 영향을 받지 않습니다.
     */
    frozenRight: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 상단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenTop: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 하단 기준으로 행을 고정합니다.
     * 수직스크롤에 영향을 받지 않습니다.
     */
    frozenBottom: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 컬럼의 정렬 사용여부입니다.
     */
    sortableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼 멀티 정렬 사용여부입니다.
     */
    multiSortable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 크기 변경 사용여부입니다.
     */
    resizableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 컬럼의 순서 변경 사용여부입니다.
     * 각 컬럼의 draggable 속성에 영향을 받습니다.
     */
    draggableColumns: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 영역 셀을 편집할 수 있는지 여부입니다.
     */
    editable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 편집 활성화 하는 이벤트 목록입니다.
     */
    editOnEvents: {
        type: PropType<("click" | "down" | "doubleClick")[]>;
        default: string[];
    };
    /**
     * 그리드 스타일을 정의합니다.
     */
    styles: {
        type: ObjectConstructor;
    };
    /**
     * 아이템 드래그시 항목 선택 여부입니다.
     */
    selectOnDrag: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 클립 보드 붙여넣기 사용 여부입니다.
     */
    pasteFromClipboard: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 데이타 자동 병합 사용 여부입니다.
     */
    autoMerge: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 자동 병합시 병합영역을 체크하는 콜백형태의 함수입니다.
     */
    mergeCompare: {
        type: PropType<(t: object, tc: GridColumn, s: object, sc: GridColumn) => boolean>;
    };
    /**
     * 아이템 선택을 정의힙니다.
     */
    selectionMode: {
        type: PropType<SelectionMode_2>;
        default: string;
    };
    /**
     * 선택된 항목를 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 처음 선택된 항목이 반환됩니다.
     */
    selectedItem: {
        type: PropType<object>;
    };
    /**
     * 복수 선택된 항목을 설정합니다.
     * `selectionMode`가 'singleRow' 또는 'multipleRows' 일경우 선택된 항목의 배열이 반환됩니다.
     */
    selectedItems: {
        type: PropType<object[]>;
    };
    /**
     * 선택된 셀을 설정합니다.
     */
    selectedCell: {
        type: PropType<CellPosition>;
    };
    /**
     * 복수로 선택된 셀을 설정합니다.
     */
    selectedCells: {
        type: PropType<CellPosition[]>;
    };
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
        type: PropType<string>;
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
}>, SlotsType<DataGridSlot>>;

export declare const TachyonTreeColumn: DefineComponent<TreeColumnPropsType, {}, GridColumnGetters, {}, {}, {}, {}, {}, string, PublicProps, ExtractPropTypes<TreeColumnPropsType>, ExtractPropTypes<TreeColumnPropsType>, SlotsType<TreeGridColumnSlot>>;

export declare const TachyonTreeGrid: DefineComponent<TreeGridPropsType, {}, DataGridGetters, {}, TreeGridMethods, {}, {}, DataGridEvents, string, PublicProps, ExtractPropTypes<TreeGridPropsType>, ExtractPropTypes<TreeGridPropsType>, SlotsType<TreeDataGridSlot>>;

export declare namespace theme {
        { add$2 as add, get$2 as get, remove$2 as remove };
}

export declare type TreeColumnPropsType = ColumnPropsType & typeof defaultTreeColumnProps;

declare type TreeDataGridSlot = DataGridSlot & {
    itemRenderer?: TreeRendererCellState;
};

export declare class TreeGrid extends DataGrid {
    _childrenField: string;
    set childrenField(arg: string);
    get childrenField(): string;
    set autoExpandLevel(arg: any);
    get autoExpandLevel(): any;
    createDataGroup(): TreeGroup;
    createCollection(items: any): HierarchyList;
    /**
     * 지정된 노드의 부모 노드를 반환합니다.
     */
    getParentNode(node: any): any;
    /**
     * 지정된 노드의 자식노드들을 반환합니다.
     * @param node 부모 노드입니다.
     */
    getChildren(node: any): any;
    getDisplayableChildren(node: any): any;
    /**
     * 해당 노드에 자식이 있는지 여부입니다.
     */
    hasChildren(node: any): any;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param node 추가할 자식 노드
     *
     */
    addNode(parent: any, node: any): any;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param node 추가할 자식 노드.
     * @param index 자식 노드 삽입 위치의 인덱스.
     */
    addNodeAt(parent: any, node: any, index: any): any;
    /**
     * 부모 노드에 자식 노드를 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드
     * @param nodes 추가할 자식 노드 목록
     *
     */
    addNodes(parent: any, nodes: any): any;
    /**
     * 노드의 지정된 인덱스 위치에 자식 노드목록을 추가합니다.
     * 부모 노드가 null이면 최상위 목록에 추가합니다.
     * @param parent 부모 노드.
     * @param nodes 추가할 자식 노드 목록
     * @param index 자식 노드 삽입 위치의 인덱스.
     */
    addNodesAt(parent: any, nodes: any, index: any): any;
    /**
     * 부모 노드에서 자식 노드를 삭제합니다.
     * @param parent 부모 노드입니다.
     * @param node 삭제할 자식 노드 입니다.
     */
    removeNode(parent: any, node: any): any;
    /**
     * 해당 node가 있는지 확인합니다.
     * @param node
     * @return 있으면 true,
     */
    contains(node: any): boolean;
    /**
     *    해당 노드가 확장되어 있는지 여부입니다.
     */
    isOpenNode(node: any): any;
    /**
     * 해당 노느가 출력된 노드인지 확인합니다.
     * @param node
     * @return
     */
    isDisplayableNode(node: any): any;
    /**
     * 지정된 노드를 확장합니다.
     */
    openNode(node: any): any;
    /**
     * 지정된 노드를 축소합니다.
     */
    closeNode(node: any): any;
    /**
     * 노드 배열을 확장합니다.
     * @param nodes
     */
    openNodes(nodes: any): any;
    /**
     * 확장되어있는 노드목록을 반환합니다.
     * @returns {Array}
     */
    getOpenedNodes(): any[];
    /**
     * 지정된 노드의 레벨을 반환합니다.
     */
    getNodeLevel(node: any): any;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 true를 반환하는 모든 항목이 포함된 새 배열을 만듭니다
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return true를 반환하는 항목의 배열입니다.
     */
    find(callback: any, prefetchNode: any, postOrder: any): any;
    /**
     * 전체 노드를 탐색합니다.
     * 지정된 함수(callBack)에 대해 처음으로 true를 반환하는 항목을 반환하고 탐색을 중지합니다.
     * @param callback  function callback(node, parent, children)
     * @param prefetchNode 시작 기준 노드입니다. 지정되지 않으면 루트노드를 기준으로 합니다.
     * @param postOrder true 이면 후위탐색, false 이면 전위탐색
     * @return 처음으로 true를 반환하는 항목입니다.
     */
    findOne(callback: any, prefetchNode: any, postOrder: any): any;
    /**
     * 지정된 노드를 확장합니다.
     */
    expandNode(node: any): any;
    /**
     * 지정된 노드를 축소합니다.
     */
    collapseNode(node: any): any;
    /**
     * 전체 노드를 확장합니다.
     */
    expandAll(): void;
    /**
     * 전체 노드를 축소합니다.
     */
    collapseAll(): void;
    /**
     * 지정된 노드가 확장되어 있으면 축소하고 축소되어 있으면 확장합니다.
     */
    toggleNode(node: any): void;
}

/**
 * TreeGridColumn 클래스는 트리 그리드의 컬럼을 정의합니다.
 */
export declare class TreeGridColumn extends GridColumn {
    _indent: number;
    _boxMode: boolean;
    set indent(arg: number);
    get indent(): number;
    set boxMode(arg: boolean);
    /**
     * 노드 모양을 '┌' 보이게 합니다.
     * @returns {Boolean}
     */
    get boxMode(): boolean;
}

export declare interface TreeGridColumnProvider {
    readonly grid: TreeGrid;
    readonly column: TreeGridColumn;
}

export declare type TreeGridColumnSlot = GridColumnSlot & {
    itemRenderer?: TreeRendererCellState;
};

declare interface TreeGridMethods extends DataGridMethods {
    /**
     * 지정된 노드를 확장합니다.
     * @deprecated
     */
    openNode(node: object): boolean;
    /**
     * 지정된 노드를 축소합니다.
     * @deprecated
     */
    closeNode(node: object): boolean;
    /**
     * 지정된 노드를 확장합니다.
     */
    expandNode(node: object): boolean;
    /**
     * 지정된 노드를 축소합니다.
     */
    collapseNode(node: object): boolean;
    /**
     * 전체 노드를 확장합니다.
     */
    expandAll(): void;
    /**
     * 전체 노드를 축소합니다.
     */
    collapseAll(): void;
    /**
     * 지정된 노드의 확장 상태를 확장 또는 축소합니다.
     */
    toggleNode(node: object): void;
}

declare type TreeGridPropsType = DataGridPropsType & typeof defaultTreeGridProps;

declare interface TreeGridProvider extends DataGridProvider<TreeGrid> {
}

export declare const TreeGridSymbol: InjectionKey<TreeGridProvider>;

declare class TreeGroup extends DataGroup {
    _boundTreeNodeListener: any;
    _crossDimension: any[];
    _maxNodeLevel: any[];
    _treeColumns: any[];
    _autoExpandLevel: number;
    set autoExpandLevel(arg: number);
    get autoExpandLevel(): number;
    /**
     * 교차셀 표현하기 위한  컬럼 생성
     * @private
     */
    private _resetCrossCells;
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
    private _createCrossCellPosition;
    _createChildColumns(column: any, level: any): void;
    /**
     * 해당 items 기준으로 크로스 셀 추가
     * @param index
     * @param items
     * @private
     */
    private _addCrossCells;
    /**
     * 크로셀 삭제
     * @param index
     * @param items
     * @private
     */
    private _removeCrossCells;
    _onColumnCollectionChange(event: any): void;
    _onCollectionChange(event: any): void;
    _isBlockCollectionChange: boolean;
    /**
     * @param event
     * @private
     */
    private _onTreeNodeChange;
}

export declare type TreeState = CellState & {
    /**
     * 노드 레벨
     */
    level: number;
    /**
     * 자식목록 여부
     */
    hasChildren: boolean;
    /**
     * 자식 목록 열림 여부
     */
    isOpened: boolean;
    /**
     * 마지막 노드 여부
     */
    isLeaf: boolean;
};

export declare const version = "__VERSION__";

export { }


declare module '@vue/runtime-core' {
    interface ComponentCustomOptions {
        prepare?(state: CellState): void;
    }
    interface ComponentCustomProperties {
    }
    interface GlobalComponents {
        TachyonGrid: typeof TachyonGrid;
        TachyonColumn: typeof TachyonColumn;
        TachyonTreeGrid: typeof TachyonTreeGrid;
        TachyonTreeColumn: typeof TachyonTreeColumn;
    }
}

