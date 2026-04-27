import { RouterUrlConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import IndexItem from "@bundle:com.huawei.music.musichome/phone/ets/viewmodel/IndexItem";
/**
 * Home page information data processing class.
 */
class IndexViewModel {
    /**
     * Data information on the home page.
     *
     * @returns IndexItem array.
     */
    getIndexItemList(): IndexItem[] {
        let IndexItemList: IndexItem[] = [];
        IndexItemList.push(new IndexItem({ "id": 100663308, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663307, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663303, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663326, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, RouterUrlConstants.MUSIC_LIST));
        IndexItemList.push(new IndexItem({ "id": 100663305, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663304, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663302, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663325, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, RouterUrlConstants.LIVE));
        return IndexItemList;
    }
}
export default new IndexViewModel();
