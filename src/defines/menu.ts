export declare type Menu = {
    children: Array<Menu>;
    enable: boolean;
    groups: string;
    image: string;
    label: string;
    labelEn: string;
    level: number;
    menuId: string;
    module: string;
    ordinal: number;
    parentId: string;
    // parentMenuId: string;
    type: string;
    url: string;
    //[prop: string]: any;
};

export declare type Menus = Array<Menu>;
