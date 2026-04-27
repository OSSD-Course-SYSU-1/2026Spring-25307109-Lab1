import { LiveStream } from "@bundle:com.huawei.music.musichome/phone@live/ets/viewmodel/LiveStream";
export class LiveStreamViewModel {
    getLiveStreamList(): LiveStream[] {
        let LiveStreamList: Array<LiveStream> = [];
        LiveStreamList.push(new LiveStream({ "id": 100663333, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663334, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663377, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        LiveStreamList.push(new LiveStream({ "id": 100663339, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663340, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663376, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        LiveStreamList.push(new LiveStream({ "id": 100663336, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663337, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, { "id": 100663375, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        return LiveStreamList;
    }
}
