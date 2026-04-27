if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    indexItemList?: IndexItem[];
    pageIndexInfos?: NavPathStack;
    topRectHeight?: number;
}
import { BreakpointConstants, RouterUrlConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { LivePage } from "@bundle:com.huawei.music.musichome/phone@live/Index";
import { MusicListPage } from "@bundle:com.huawei.music.musichome/phone@musiclist/Index";
import { MusicCommentPage } from "@bundle:com.huawei.music.musichome/phone@musiccomment/Index";
import type IndexItem from '../viewmodel/IndexItem';
import IndexViewModel from "@bundle:com.huawei.music.musichome/phone/ets/viewmodel/IndexViewModel";
import { HomeConstants } from "@bundle:com.huawei.music.musichome/phone/ets/common/constants/HomeConstants";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__indexItemList = new ObservedPropertyObjectPU(IndexViewModel.getIndexItemList(), this, "indexItemList");
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.indexItemList !== undefined) {
            this.indexItemList = params.indexItemList;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__indexItemList.purgeDependencyOnElmtId(rmElmtId);
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__indexItemList.aboutToBeDeleted();
        this.__pageIndexInfos.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __indexItemList: ObservedPropertyObjectPU<IndexItem[]>;
    get indexItemList() {
        return this.__indexItemList.get();
    }
    set indexItemList(newValue: IndexItem[]) {
        this.__indexItemList.set(newValue);
    }
    private __pageIndexInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageIndexInfos() {
        return this.__pageIndexInfos.get();
    }
    set pageIndexInfos(newValue: NavPathStack) {
        this.__pageIndexInfos.set(newValue);
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    PagesMap(name: string, param?: object, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === RouterUrlConstants.LIVE) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LivePage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 35, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "LivePage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else if (name === RouterUrlConstants.MUSIC_LIST) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MusicListPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 40, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "MusicListPage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else if (name === RouterUrlConstants.MUSIC_COMMENT) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MusicCommentPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 45, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "MusicCommentPage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageIndexInfos, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.mode(NavigationMode.Stack);
            Navigation.navDestination({ builder: this.PagesMap.bind(this) });
            Navigation.height(StyleConstants.FULL_HEIGHT);
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                breakpoints: {
                    value: BreakpointConstants.BREAKPOINT_VALUE,
                    reference: BreakpointsReference.WindowSize
                },
                columns: {
                    sm: BreakpointConstants.COLUMN_SM,
                    md: BreakpointConstants.COLUMN_MD,
                    lg: BreakpointConstants.COLUMN_LG
                },
                gutter: { x: BreakpointConstants.GUTTER_X },
                direction: GridRowDirection.Row
            });
            GridRow.padding({
                top: { "id": 100663318, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                left: { "id": 100663316, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: { "id": 100663317, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                bottom: { "id": 100663318, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
            GridRow.margin({ top: this.getUIContext().px2vp(this.topRectHeight) });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: {
                    sm: BreakpointConstants.SPAN_SM,
                    md: BreakpointConstants.SPAN_MD,
                    lg: BreakpointConstants.SPAN_LG
                },
                offset: {
                    md: BreakpointConstants.OFFSET_MD,
                    lg: BreakpointConstants.OFFSET_LG
                }
            });
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: HomeConstants.COLUMN_SPACE });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(StyleConstants.FULL_WIDTH);
                    Column.padding({ "id": 100663323, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Column.alignItems(HorizontalAlign.Start);
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.borderRadius({ "id": 100663321, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Column.backgroundImage(item.icon);
                    Column.backgroundImageSize(ImageSize.Cover);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize({ "id": 100663324, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Text.fontColor(Color.White);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.description);
                    Text.fontSize({ "id": 100663319, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Text.opacity(HomeConstants.TEXT_OPACITY);
                    Text.fontColor(Color.White);
                    Text.margin({
                        top: { "id": 100663320, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                    });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.End);
                    Column.width(StyleConstants.FULL_WIDTH);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithChild();
                    Button.backgroundColor({ "id": 100663310, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Button.borderRadius({ "id": 100663312, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Button.width({ "id": 100663315, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Button.height({ "id": 100663314, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Button.margin({
                        top: { "id": 100663320, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                    });
                    Button.onClick(() => {
                        this.pageIndexInfos.pushPathByName(item.url, null);
                    });
                }, Button);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.button);
                    Text.fontSize({ "id": 100663313, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Text.fontColor(Color.White);
                }, Text);
                Text.pop();
                Button.pop();
                Column.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.indexItemList, forEachItemGenFunction, (item: IndexItem, index?: number) => index + JSON.stringify(item), false, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        GridCol.pop();
        GridRow.pop();
        Scroll.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huawei.music.musichome", moduleName: "phone", pagePath: "pages/Index", pageFullPath: "products/phone/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
