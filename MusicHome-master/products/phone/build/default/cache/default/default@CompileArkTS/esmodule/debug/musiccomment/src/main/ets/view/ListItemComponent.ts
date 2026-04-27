import { StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { Comment } from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/viewmodel/Comment";
import { CommonConstants } from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/constants/CommonConstants";
export function ListItemComponent(item: Comment = new Comment('', '', '', { "id": 100663447, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }), parent = null) {
    const __item__ = item;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Row.create();
        Row.width(StyleConstants.FULL_WIDTH);
        Row.alignItems(VerticalAlign.Top);
        Row.padding({
            top: { "id": 100663423, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Image.create(item.icon);
        Image.width({ "id": 100663422, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.height({ "id": 100663420, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.borderRadius({ "id": 100663419, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.margin({
            right: { "id": 100663421, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Image);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Column.create();
        Column.layoutWeight(1);
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Row.create();
        Row.width(StyleConstants.FULL_WIDTH);
        Row.alignItems(VerticalAlign.Top);
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.layoutWeight(1);
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Text.create(item.nickname);
        Text.fontSize({ "id": 100663430, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontColor({ "id": 100663389, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontWeight(FontWeight.Regular);
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Text.create(item.time);
        Text.fontSize({ "id": 100663438, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontColor({ "id": 100663392, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontWeight(FontWeight.Regular);
        Text.margin({
            top: { "id": 100663439, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Text);
    Text.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Text.create(item.content);
        Text.fontSize({ "id": 100663396, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontColor({ "id": 100663384, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Text.fontWeight(FontWeight.Regular);
        Text.margin({
            top: { "id": 100663397, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Text);
    Text.pop();
    Column.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Blank.create();
    }, Blank);
    Blank.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        Image.create({ "id": 100663456, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.width({ "id": 100663401, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.height({ "id": 100663399, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        Image.margin({
            top: { "id": 100663400, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
        });
    }, Image);
    Row.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
        If.create();
        if (item.commentList && item.commentList.length > 0) {
            (parent ? parent : this).ifElseBranchUpdateFunction(0, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
                    Row.create();
                    Row.margin({
                        top: { "id": 100663432, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                    });
                    Row.width(StyleConstants.FULL_WIDTH);
                    Row.justifyContent(FlexAlign.Start);
                }, Row);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
                    Column.create();
                    Column.backgroundColor({ "id": 100663390, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Column.padding({ "id": 100663433, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                }, Column);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
                    Text.create();
                }, Text);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
                    Span.create(CommonConstants.NICKNAME_PREV + item.commentList[0].nickname +
                        CommonConstants.NICKNAME_SUFFIX);
                    Span.fontSize({ "id": 100663434, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Span.fontColor({ "id": 100663391, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Span.fontWeight(FontWeight.Regular);
                }, Span);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, item = __item__) => {
                    Span.create(item.commentList[0].content);
                    Span.fontSize({ "id": 100663434, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Span.fontColor({ "id": 100663391, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Span.fontWeight(FontWeight.Regular);
                }, Span);
                Text.pop();
                Column.pop();
                Row.pop();
            });
        }
        else {
            this.ifElseBranchUpdateFunction(1, () => {
            });
        }
    }, If);
    If.pop();
    Column.pop();
    Row.pop();
}
