import { Comment } from "@bundle:com.huawei.music.musichome/phone@musiccomment/ets/viewmodel/Comment";
/**
 * Review data generation class.
 */
class CommentViewModel {
    /**
     * Get great review data.
     *
     * @returns Comment array.
     */
    getWonderfulReview(): Comment[] {
        let commentList: Comment[] = [];
        commentList.push(new Comment('139******92', '突然发现系统自带的音乐软件那么强大', '2021年9月7日', { "id": 100663444, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('ke歌可Qi', '单曲循环到天明', '2021年9月4日', { "id": 100663448, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('Change', '这里歌曲多，人说话又好听，真的太喜欢这里了', '2021年9月1日', { "id": 100663449, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('可可的家', '真是太好听了', '2021年9月7日', { "id": 100663451, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('Nice', '最爱的歌之一啦，超好听', '2021年9月4日', { "id": 100663452, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('没有的世界', '这里歌曲多，人说话又好听', '2021年9月1日', { "id": 100663453, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('蓝色的大海', '在海边听这首歌有另外一种意境', '2021年9月1日', { "id": 100663454, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, [
            new Comment('不熬夜了', '身临其境', '2021年9月7日', { "id": 100663444, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" })
        ]));
        commentList.push(new Comment('伦本伦', '同听一首歌，我们就是好盆友', '2021年9月1日', { "id": 100663450, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }, [
            new Comment('今夜小雨', '高考一毕业了，我又会在这里还听这首歌，感觉是一样的热血澎湃', '2021年9月7日', { "id": 100663455, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" })
        ]));
        return commentList;
    }
    /**
     * Obtain the latest comment data.
     *
     * @returns Comment array.
     */
    getNewComment(): Comment[] {
        let commentList: Comment[] = [];
        commentList.push(new Comment('139******92', '突然发现系统自带的音乐软件那么强大', '2021年9月7日', { "id": 100663455, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('139******92', '最爱的歌之一啦，超好听', '2021年9月4日', { "id": 100663445, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('159******88', '突然发现音乐的力量太治愈了', '2021年9月1日', { "id": 100663446, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        commentList.push(new Comment('159******88', '在海边听这首歌有另外一种意境', '2021年9月1日', { "id": 100663447, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }));
        return commentList;
    }
}
export default new CommentViewModel();
