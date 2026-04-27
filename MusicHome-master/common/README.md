# 公共能力层 (Common)

公共能力层是整个应用的基础层，提供通用的常量定义、工具类和数据模型，供上层模块复用。

## 模块组成

```
common/
├── constantscommon/     # 公共常量模块
└── mediacommon/         # 公共媒体模块
```

---

## 1. constantscommon - 公共常量模块

### 概述
提供全局统一的常量定义，确保各模块使用一致的配置值，便于维护和修改。

### 模块导出
```typescript
// index.ets
export * from './src/main/ets/constants/BreakpointConstants';
export * from './src/main/ets/constants/GridConstants';
export * from './src/main/ets/constants/RouterUrlConstants';
export * from './src/main/ets/constants/SongConstants';
export * from './src/main/ets/constants/StyleConstants';
```

### 常量文件详解

#### BreakpointConstants.ets - 断点常量

定义响应式布局的断点值，用于适配不同尺寸的设备。

```typescript
export class BreakpointConstants {
  // 断点类型
  static readonly BREAKPOINT_SM: string = 'sm';  // 小设备（手机）
  static readonly BREAKPOINT_MD: string = 'md';  // 中设备（折叠）
  static readonly BREAKPOINT_LG: string = 'lg';  // 大设备（平板）

  // 断点值（vp）
  static readonly BREAKPOINT_VALUE: Array<string> = ['320vp', '600vp', '840vp'];
  static readonly BREAKPOINT_VALUE_NUMBER: Array<number> = [320, 600, 840];

  // 栅格列数
  static readonly COLUMN_SM: number = 4;   // 小设备列数
  static readonly COLUMN_MD: number = 8;   // 中设备列数
  static readonly COLUMN_LG: number = 12;  // 大设备列数

  // 栅格间距
  static readonly GUTTER_X: number = 24;   // 水平间距
  static readonly GUTTER_Y: number = 0;    // 垂直间距

  // 栅格偏移
  static readonly SPAN_SM: number = 4;
  static readonly SPAN_MD: number = 8;
  static readonly SPAN_LG: number = 8;
  static readonly OFFSET_MD: number = 0;
  static readonly OFFSET_LG: number = 2;
}
```

**使用示例：**
```typescript
import { BreakpointConstants } from 'constantscommon';

GridRow({
  breakpoints: {
    value: BreakpointConstants.BREAKPOINT_VALUE,
    reference: BreakpointsReference.WindowSize
  },
  columns: {
    sm: BreakpointConstants.COLUMN_SM,
    md: BreakpointConstants.COLUMN_MD,
    lg: BreakpointConstants.COLUMN_LG
  }
}) {
  // 内容
}
```

---

#### GridConstants.ets - 栅格布局常量

定义栅格布局相关的配置常量。

```typescript
export class GridConstants {
  // 列数配置
  static readonly COLUMN_FOUR: number = 4;
  static readonly COLUMN_EIGHT: number = 8;
  static readonly COLUMN_TWELVE: number = 12;
  
  // 间距配置
  static readonly GUTTER_TWELVE: number = 12;
  static readonly GUTTER_TWENTY_FOUR: number = 24;
}
```

---

#### RouterUrlConstants.ets - 路由URL常量

定义页面路由的URL路径，统一管理页面跳转。

```typescript
export class RouterUrlConstants {
  static readonly LIVE: string = 'Live';           // 直播页
  static readonly MUSIC_LIST: string = 'MusicList'; // 音乐列表页
  static readonly MUSIC_COMMENT: string = 'MusicComment'; // 音乐评论页
}
```

**使用示例：**
```typescript
import { RouterUrlConstants } from 'constantscommon';

// 页面跳转
this.pageIndexInfos.pushPathByName(RouterUrlConstants.MUSIC_LIST, null);
```

---

#### SongConstants.ets - 歌曲相关常量

定义歌曲播放相关的常量配置。

```typescript
export class SongConstants {
  // 播放状态
  static readonly PLAY_STATE: string = 'play';
  static readonly PAUSE_STATE: string = 'pause';
  
  // 过渡动画时长
  static readonly TRANSITION_DURATION: number = 300;
  
  // 默认歌曲索引
  static readonly DEFAULT_INDEX: number = 0;
}
```

---

#### StyleConstants.ets - 样式常量

定义通用的样式常量。

```typescript
export class StyleConstants {
  // 尺寸
  static readonly FULL_WIDTH: string = '100%';
  static readonly FULL_HEIGHT: string = '100%';
  static readonly FULL_WIDTH_PERCENT: number = 1;
  static readonly FULL_HEIGHT_PERCENT: number = 1;
  
  // 透明度
  static readonly OPACITY_FULL: number = 1;
  static readonly OPACITY_HALF: number = 0.5;
}
```

---

## 2. mediacommon - 公共媒体模块

### 概述
提供媒体播放、数据处理、断点系统等核心功能，是应用的业务基础层。

### 模块导出
```typescript
// index.ets
export { MediaService } from './src/main/ets/utils/MediaService';
export { BreakpointSystem } from './src/main/ets/utils/BreakpointSystem';
export { PreferencesUtil } from './src/main/ets/utils/PreferencesUtil';
export { Logger } from './src/main/ets/utils/Logger';
export { MediaTools } from './src/main/ets/utils/MediaTools';
export * from './src/main/ets/viewmodel/MusicData';
export * from './src/main/ets/viewmodel/SongData';
```

### 工具类详解

#### MediaService.ets - 媒体播放服务

核心媒体播放服务，封装 HarmonyOS AVPlayer，提供完整的播放控制能力。

**类定义：**
```typescript
export class MediaService {
  private static instance?: MediaService;
  private avPlayer?: media.AVPlayer;
  private session?: avSession.AVSession;
  private playMode: MusicPlayMode = MusicPlayMode.ORDER;
  private state: AudioPlayerState = AudioPlayerState.IDLE;
  
  // 单例获取
  static getInstance(): MediaService;
  
  // 播放控制
  play(): void;           // 播放
  pause(): void;          // 暂停
  stop(): void;           // 停止
  previous(): void;       // 上一首
  next(): void;           // 下一首
  seek(time: number): void; // 跳转
  
  // 模式切换
  changePlayMode(): void; // 切换播放模式
  
  // 状态获取
  getCurrentTime(): number;  // 当前播放时间
  getDuration(): number;     // 总时长
  isPlaying(): boolean;      // 是否正在播放
}
```

**播放模式枚举：**
```typescript
enum MusicPlayMode {
  SINGLE_CYCLE = 0,  // 单曲循环
  ORDER = 1,         // 顺序播放
  RANDOM = 2         // 随机播放
}
```

**播放状态枚举：**
```typescript
enum AudioPlayerState {
  IDLE,         // 空闲
  INITIALIZED,  // 已初始化
  LOAD,         // 加载中
  PREPARED,     // 已准备
  PLAY,         // 播放中
  PAUSE,        // 已暂停
  STOP,         // 已停止
  ERROR,        // 错误
  COMPLETED,    // 播放完成
  RELEASED      // 已释放
}
```

**使用示例：**
```typescript
import { MediaService } from 'mediacommon';

// 获取实例
const mediaService = MediaService.getInstance();

// 播放控制
mediaService.play();
mediaService.pause();
mediaService.next();
mediaService.previous();
mediaService.seek(30000); // 跳转到30秒
```

---

#### BreakpointSystem.ets - 断点系统

监听设备尺寸变化，实现响应式布局。

**类定义：**
```typescript
export class BreakpointSystem {
  private currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
  
  // 注册监听
  register(): void;
  
  // 注销监听
  unregister(): void;
  
  // 获取当前断点
  getCurrentBreakpoint(): string;
}
```

**使用示例：**
```typescript
import { BreakpointSystem } from 'mediacommon';

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
  
  build() {
    if (this.currentBreakpoint === 'sm') {
      // 小设备布局
    } else {
      // 大设备布局
    }
  }
}
```

---

#### PreferencesUtil.ets - 偏好设置工具

封装用户偏好设置的读写操作。

**类定义：**
```typescript
export class PreferencesUtil {
  // 保存数据
  static put(key: string, value: string | number | boolean): Promise<void>;
  
  // 获取数据
  static get(key: string, defaultValue: string | number | boolean): Promise<string | number | boolean>;
  
  // 删除数据
  static delete(key: string): Promise<void>;
  
  // 清空所有数据
  static clear(): Promise<void>;
}
```

---

#### Logger.ets - 日志工具

统一的日志输出工具，支持不同级别的日志输出。

**类定义：**
```typescript
export class Logger {
  static info(tag: string, message: string): void;
  static debug(tag: string, message: string): void;
  static warn(tag: string, message: string): void;
  static error(tag: string, message: string): void;
}
```

**使用示例：**
```typescript
import { Logger } from 'mediacommon';

const TAG = 'MyComponent';

Logger.info(TAG, 'Component initialized');
Logger.error(TAG, 'Failed to load data');
```

---

#### MediaTools.ets - 媒体工具

提供媒体相关的辅助方法。

**类定义：**
```typescript
export class MediaTools {
  // 毫秒转倒计时格式 (mm:ss)
  static msToCountdownTime(ms: number): string;
  
  // 毫秒转时间格式 (mm:ss)
  static msToTime(ms: number): string;
  
  // 格式化时长
  static formatDuration(seconds: number): string;
}
```

**使用示例：**
```typescript
import { MediaTools } from 'mediacommon';

const time = MediaTools.msToCountdownTime(185000); // "03:05"
```

---

#### ColorConversion.ets - 颜色转换工具

提供颜色格式转换功能。

```typescript
export class ColorConversion {
  // RGB转十六进制
  static rgbToHex(r: number, g: number, b: number): string;
  
  // 十六进制转RGB
  static hexToRgb(hex: string): { r: number, g: number, b: number };
}
```

---

#### BackgroundUtil.ets - 背景处理工具

处理界面背景效果。

```typescript
export class BackgroundUtil {
  // 模糊背景
  static blur(radius: number): BlurOptions;
  
  // 渐变背景
  static gradient(colors: string[]): LinearGradient;
}
```

---

### 数据模型详解

#### MusicData.ets - 音乐数据模型

```typescript
// 播放模式
enum MusicPlayMode {
  SINGLE_CYCLE = 0,  // 单曲循环
  ORDER = 1,         // 顺序播放
  RANDOM = 2         // 随机播放
}

// 播放状态
enum AudioPlayerState {
  IDLE,
  INITIALIZED,
  LOAD,
  PREPARED,
  PLAY,
  PAUSE,
  STOP,
  ERROR,
  COMPLETED,
  RELEASED,
  PROGRESS_SPEED,
  TIME_UPDATE,
  VOLUME_CHANGE,
  UNKNOWN
}
```

---

#### SongData.ets - 歌曲数据模型

```typescript
export class SongItem {
  id: number = 0;           // 歌曲ID
  name: string = '';        // 歌曲名称
  singer: string = '';      // 歌手
  album: string = '';       // 专辑
  duration: number = 0;     // 时长（毫秒）
  cover: string = '';       // 封面图片路径
  url: string = '';         // 音频文件路径
  lrc: string = '';         // 歌词文件路径
}

export class SongList {
  songs: SongItem[] = [];   // 歌曲列表
  currentIndex: number = 0; // 当前播放索引
}
```

---

#### CardData.ets - 卡片数据模型

```typescript
export class CardData {
  id: number = 0;
  title: string = '';
  description: string = '';
  image: string = '';
  action: string = '';
}
```

---

#### MenuData.ets - 菜单数据模型

```typescript
export class MenuData {
  id: number = 0;
  name: string = '';
  icon: string = '';
  action: () => void = () => {};
}
```

---

## 依赖关系

```
mediacommon
    │
    ├── @kit.MediaKit (媒体播放)
    ├── @kit.AVSessionKit (音频会话)
    ├── @kit.AbilityKit (应用能力)
    ├── @kit.FormKit (卡片)
    ├── @kit.LocalizationKit (资源管理)
    ├── @kit.BasicServicesKit (基础服务)
    │
    └── constantscommon (公共常量)
```

---

## 使用方式

在其他模块的 `oh-package.json5` 中添加依赖：

```json
{
  "dependencies": {
    "constantscommon": "file:../../common/constantscommon",
    "mediacommon": "file:../../common/mediacommon"
  }
}
```

在代码中导入使用：

```typescript
import { BreakpointConstants, StyleConstants } from 'constantscommon';
import { MediaService, Logger, MediaTools } from 'mediacommon';
```
