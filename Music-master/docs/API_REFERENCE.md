# API 参考文档

本文档详细描述了项目中所有公共API的接口定义和使用方法。

## 目录
- [常量API](#常量api)
- [工具类API](#工具类api)
- [数据模型API](#数据模型api)
- [组件API](#组件api)

---

## 常量API

### BreakpointConstants

断点常量类，用于响应式布局的断点判断。

**导入：**
```typescript
import { BreakpointConstants } from 'constantscommon';
```

**属性：**

| 属性名 | 类型 | 值 | 说明 |
|--------|------|-----|------|
| `BREAKPOINT_SM` | `string` | `'sm'` | 小设备断点标识 |
| `BREAKPOINT_MD` | `string` | `'md'` | 中设备断点标识 |
| `BREAKPOINT_LG` | `string` | `'lg'` | 大设备断点标识 |
| `BREAKPOINT_VALUE` | `Array<string>` | `['320vp', '600vp', '840vp']` | 断点值数组 |
| `BREAKPOINT_VALUE_NUMBER` | `Array<number>` | `[320, 600, 840]` | 断点数值数组 |
| `COLUMN_SM` | `number` | `4` | 小设备栅格列数 |
| `COLUMN_MD` | `number` | `8` | 中设备栅格列数 |
| `COLUMN_LG` | `number` | `12` | 大设备栅格列数 |
| `GUTTER_X` | `number` | `24` | 水平间距 |
| `GUTTER_Y` | `number` | `0` | 垂直间距 |
| `SPAN_SM` | `number` | `4` | 小设备跨度 |
| `SPAN_MD` | `number` | `8` | 中设备跨度 |
| `SPAN_LG` | `number` | `8` | 大设备跨度 |
| `OFFSET_MD` | `number` | `0` | 中设备偏移 |
| `OFFSET_LG` | `number` | `2` | 大设备偏移 |

---

### GridConstants

栅格布局常量类。

**导入：**
```typescript
import { GridConstants } from 'constantscommon';
```

**属性：**

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `COLUMN_FOUR` | `number` | 4列配置 |
| `COLUMN_EIGHT` | `number` | 8列配置 |
| `COLUMN_TWELVE` | `number` | 12列配置 |
| `GUTTER_TWELVE` | `number` | 12vp间距 |
| `GUTTER_TWENTY_FOUR` | `number` | 24vp间距 |

---

### RouterUrlConstants

路由URL常量类。

**导入：**
```typescript
import { RouterUrlConstants } from 'constantscommon';
```

**属性：**

| 属性名 | 类型 | 值 | 说明 |
|--------|------|-----|------|
| `LIVE` | `string` | `'Live'` | 直播页路由 |
| `MUSIC_LIST` | `string` | `'MusicList'` | 音乐列表页路由 |
| `MUSIC_COMMENT` | `string` | `'MusicComment'` | 音乐评论页路由 |

---

### SongConstants

歌曲相关常量类。

**导入：**
```typescript
import { SongConstants } from 'constantscommon';
```

**属性：**

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `PLAY_STATE` | `string` | 播放状态标识 |
| `PAUSE_STATE` | `string` | 暂停状态标识 |
| `TRANSITION_DURATION` | `number` | 过渡动画时长（毫秒） |
| `DEFAULT_INDEX` | `number` | 默认歌曲索引 |

---

### StyleConstants

样式常量类。

**导入：**
```typescript
import { StyleConstants } from 'constantscommon';
```

**属性：**

| 属性名 | 类型 | 值 | 说明 |
|--------|------|-----|------|
| `FULL_WIDTH` | `string` | `'100%'` | 全宽 |
| `FULL_HEIGHT` | `string` | `'100%'` | 全高 |
| `FULL_WIDTH_PERCENT` | `number` | `1` | 全宽百分比 |
| `FULL_HEIGHT_PERCENT` | `number` | `1` | 全高百分比 |

---

## 工具类API

### MediaService

媒体播放服务类，核心播放控制API。

**导入：**
```typescript
import { MediaService } from 'mediacommon';
```

**静态方法：**

#### getInstance()
获取单例实例。

```typescript
static getInstance(): MediaService
```

**返回值：** `MediaService` 实例

**示例：**
```typescript
const mediaService = MediaService.getInstance();
```

---

**实例方法：**

#### play()
开始或继续播放。

```typescript
play(): void
```

#### pause()
暂停播放。

```typescript
pause(): void
```

#### stop()
停止播放。

```typescript
stop(): void
```

#### previous()
播放上一首。

```typescript
previous(): void
```

#### next()
播放下一首。

```typescript
next(): void
```

#### seek()
跳转到指定时间点。

```typescript
seek(time: number): void
```

**参数：**
- `time`: 目标时间（毫秒）

#### changePlayMode()
切换播放模式。

```typescript
changePlayMode(): void
```

模式循环：顺序 → 单曲循环 → 随机 → 顺序

#### getCurrentTime()
获取当前播放时间。

```typescript
getCurrentTime(): number
```

**返回值：** 当前时间（毫秒）

#### getDuration()
获取总时长。

```typescript
getDuration(): number
```

**返回值：** 总时长（毫秒）

#### isPlaying()
判断是否正在播放。

```typescript
isPlaying(): boolean
```

**返回值：** 是否播放中

#### release()
释放资源。

```typescript
release(): void
```

---

### BreakpointSystem

断点系统类，监听设备尺寸变化。

**导入：**
```typescript
import { BreakpointSystem } from 'mediacommon';
```

**构造函数：**
```typescript
constructor()
```

**方法：**

#### register()
注册断点监听。

```typescript
register(): void
```

注册后，当前断点会存储到 `AppStorage` 的 `currentBreakpoint` 键中。

#### unregister()
注销断点监听。

```typescript
unregister(): void
```

**使用示例：**
```typescript
@Component
struct MyComponent {
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm';
  
  aboutToAppear() {
    this.breakpointSystem.register();
  }
  
  aboutToDisappear() {
    this.breakpointSystem.unregister();
  }
}
```

---

### PreferencesUtil

偏好设置工具类。

**导入：**
```typescript
import { PreferencesUtil } from 'mediacommon';
```

**静态方法：**

#### put()
保存数据。

```typescript
static put(key: string, value: string | number | boolean): Promise<void>
```

**参数：**
- `key`: 键名
- `value`: 值

#### get()
获取数据。

```typescript
static get(key: string, defaultValue: string | number | boolean): Promise<string | number | boolean>
```

**参数：**
- `key`: 键名
- `defaultValue`: 默认值

**返回值：** 存储的值或默认值

#### delete()
删除数据。

```typescript
static delete(key: string): Promise<void>
```

#### clear()
清空所有数据。

```typescript
static clear(): Promise<void>
```

---

### Logger

日志工具类。

**导入：**
```typescript
import { Logger } from 'mediacommon';
```

**静态方法：**

#### info()
输出信息日志。

```typescript
static info(tag: string, message: string): void
```

#### debug()
输出调试日志。

```typescript
static debug(tag: string, message: string): void
```

#### warn()
输出警告日志。

```typescript
static warn(tag: string, message: string): void
```

#### error()
输出错误日志。

```typescript
static error(tag: string, message: string): void
```

**使用示例：**
```typescript
const TAG = 'MyComponent';
Logger.info(TAG, 'Component initialized');
Logger.error(TAG, 'Failed to load data');
```

---

### MediaTools

媒体工具类。

**导入：**
```typescript
import { MediaTools } from 'mediacommon';
```

**静态方法：**

#### msToCountdownTime()
毫秒转倒计时格式（mm:ss）。

```typescript
static msToCountdownTime(ms: number): string
```

**参数：**
- `ms`: 毫秒数

**返回值：** 格式化时间字符串

**示例：**
```typescript
MediaTools.msToCountdownTime(185000); // "03:05"
MediaTools.msToCountdownTime(3661000); // "61:01"
```

---

### ColorConversion

颜色转换工具类。

**导入：**
```typescript
import { ColorConversion } from 'mediacommon';
```

**静态方法：**

#### rgbToHex()
RGB转十六进制。

```typescript
static rgbToHex(r: number, g: number, b: number): string
```

**参数：**
- `r`: 红色分量 (0-255)
- `g`: 绿色分量 (0-255)
- `b`: 蓝色分量 (0-255)

**返回值：** 十六进制颜色字符串

#### hexToRgb()
十六进制转RGB。

```typescript
static hexToRgb(hex: string): { r: number, g: number, b: number }
```

**参数：**
- `hex`: 十六进制颜色字符串

**返回值：** RGB对象

---

## 数据模型API

### MusicPlayMode

播放模式枚举。

**导入：**
```typescript
import { MusicPlayMode } from 'mediacommon';
```

**枚举值：**

| 值 | 名称 | 说明 |
|----|------|------|
| `0` | `SINGLE_CYCLE` | 单曲循环 |
| `1` | `ORDER` | 顺序播放 |
| `2` | `RANDOM` | 随机播放 |

---

### AudioPlayerState

播放状态枚举。

**导入：**
```typescript
import { AudioPlayerState } from 'mediacommon';
```

**枚举值：**

| 值 | 名称 | 说明 |
|----|------|------|
| `0` | `IDLE` | 空闲 |
| `1` | `INITIALIZED` | 已初始化 |
| `2` | `LOAD` | 加载中 |
| `3` | `PREPARED` | 已准备 |
| `4` | `PLAY` | 播放中 |
| `5` | `PAUSE` | 已暂停 |
| `6` | `STOP` | 已停止 |
| `7` | `ERROR` | 错误 |
| `8` | `COMPLETED` | 播放完成 |
| `9` | `RELEASED` | 已释放 |

---

### SongItem

歌曲数据模型类。

**导入：**
```typescript
import { SongItem } from 'mediacommon';
```

**属性：**

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `id` | `number` | `0` | 歌曲ID |
| `name` | `string` | `''` | 歌曲名称 |
| `singer` | `string` | `''` | 歌手名 |
| `album` | `string` | `''` | 专辑名 |
| `duration` | `number` | `0` | 时长（毫秒） |
| `cover` | `string` | `''` | 封面图片路径 |
| `url` | `string` | `''` | 音频文件路径 |
| `lrc` | `string` | `''` | 歌词文件路径 |

**示例：**
```typescript
const song = new SongItem();
song.id = 1;
song.name = '示例歌曲';
song.singer = '歌手';
song.duration = 180000;
```

---

### Comment

评论数据模型类。

**导入：**
```typescript
import { Comment } from 'musiccomment';
```

**属性：**

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `id` | `number` | `0` | 评论ID |
| `userId` | `number` | `0` | 用户ID |
| `userName` | `string` | `''` | 用户昵称 |
| `userAvatar` | `string` | `''` | 用户头像URL |
| `content` | `string` | `''` | 评论内容 |
| `time` | `string` | `''` | 评论时间 |
| `likes` | `number` | `0` | 点赞数 |

---

### LiveStream

直播数据模型类。

**导入：**
```typescript
import { LiveStream } from 'live';
```

**属性：**

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `id` | `number` | `0` | 直播ID |
| `title` | `string` | `''` | 直播标题 |
| `cover` | `string` | `''` | 封面图片URL |
| `anchor` | `string` | `''` | 主播名称 |
| `anchorAvatar` | `string` | `''` | 主播头像URL |
| `viewers` | `number` | `0` | 观看人数 |
| `status` | `string` | `''` | 直播状态 |

---

### LrcEntry

歌词条目数据模型类。

**导入：**
```typescript
import { LrcEntry } from 'musiclist';
```

**属性：**

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `time` | `number` | `0` | 时间（毫秒） |
| `text` | `string` | `''` | 歌词文本 |

---

## 组件API

### MusicListPage

音乐列表页面组件。

**导入：**
```typescript
import { MusicListPage } from 'musiclist';
```

**使用：**
```typescript
NavDestination() {
  MusicListPage()
}
```

---

### MusicCommentPage

音乐评论页面组件。

**导入：**
```typescript
import { MusicCommentPage } from 'musiccomment';
```

**使用：**
```typescript
NavDestination() {
  MusicCommentPage()
}
```

---

### LivePage

直播页面组件。

**导入：**
```typescript
import { LivePage } from 'live';
```

**使用：**
```typescript
NavDestination() {
  LivePage()
}
```

---

## AppStorage 键值

应用中使用的全局状态键值：

| 键名 | 类型 | 说明 |
|------|------|------|
| `currentBreakpoint` | `string` | 当前断点 (sm/md/lg) |
| `deviceHeight` | `number` | 设备高度 |
| `topRectHeight` | `number` | 顶部安全区域高度 |
| `bottomRectHeight` | `number` | 底部安全区域高度 |
| `songList` | `SongItem[]` | 歌曲列表 |
| `currentTime` | `string` | 当前播放时间（格式化） |
| `totalTime` | `string` | 总时长（格式化） |
| `progress` | `number` | 播放进度（毫秒） |
| `progressMax` | `number` | 进度最大值（总时长） |
| `pageIndexInfos` | `NavPathStack` | 导航栈 |

**使用示例：**
```typescript
// 监听状态
@StorageLink('currentTime') currentTime: string = '00:00';
@StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm';

// 设置状态
AppStorage.setOrCreate('currentTime', '03:05');
```

---

## 完整导入示例

```typescript
// 导入常量
import { 
  BreakpointConstants, 
  GridConstants, 
  RouterUrlConstants, 
  SongConstants, 
  StyleConstants 
} from 'constantscommon';

// 导入工具类
import { 
  MediaService, 
  BreakpointSystem, 
  PreferencesUtil, 
  Logger, 
  MediaTools,
  ColorConversion
} from 'mediacommon';

// 导入数据模型
import { 
  MusicPlayMode, 
  AudioPlayerState, 
  SongItem 
} from 'mediacommon';

// 导入页面组件
import { MusicListPage } from 'musiclist';
import { MusicCommentPage } from 'musiccomment';
import { LivePage } from 'live';
```
