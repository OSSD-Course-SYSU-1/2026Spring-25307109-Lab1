# 基础特性层 (Features)

基础特性层包含可复用的业务功能模块，每个模块独立封装，可被不同产品层调用。

## 模块组成

```
features/
├── musiclist/      # 音乐列表模块
├── musiccomment/   # 音乐评论模块
└── live/           # 直播模块
```

---

## 1. musiclist - 音乐列表模块

### 概述
核心音乐播放功能模块，提供完整的音乐播放体验，包括播放控制、歌词显示、播放列表等功能。

### 功能特性
- 🎵 音乐播放控制（播放/暂停、上一首/下一首）
- 🔄 播放模式切换（顺序、单曲循环、随机）
- 📝 歌词同步显示
- 📋 播放列表管理
- 🎨 专辑封面展示
- 📱 多设备自适应布局

### 目录结构

```
musiclist/
├── Index.ets                    # 模块导出
├── src/main/ets/
│   ├── view/
│   │   └── MusicListPage.ets    # 主页面
│   ├── components/
│   │   ├── Header.ets           # 页面头部
│   │   ├── Player.ets           # 播放器组件
│   │   ├── PlayList.ets         # 播放列表
│   │   ├── ListContent.ets      # 列表内容
│   │   ├── AlbumComponent.ets   # 专辑组件
│   │   ├── AlbumCover.ets       # 专辑封面
│   │   ├── ControlAreaComponent.ets    # 控制区域
│   │   ├── MusicControlComponent.ets   # 音乐控制
│   │   ├── MusicInfoComponent.ets      # 音乐信息
│   │   ├── LyricsComponent.ets         # 歌词组件
│   │   └── TopAreaComponent.ets        # 顶部区域
│   ├── lyric/
│   │   ├── LrcView.ets          # 歌词视图
│   │   ├── LrcUtils.ets         # 歌词解析工具
│   │   ├── LrcEntry.ets         # 歌词条目模型
│   │   └── LyricConst.ets       # 歌词常量
│   ├── constants/
│   │   ├── ContentConstants.ets # 内容常量
│   │   ├── HeaderConstants.ets  # 头部常量
│   │   └── PlayerConstants.ets  # 播放器常量
│   └── viewmodel/
│       ├── SongDataSource.ets   # 歌曲数据源
│       └── SongListData.ets     # 歌曲列表数据
└── src/main/resources/          # 资源文件
```

### 核心组件

#### MusicListPage.ets - 主页面

音乐列表模块的入口页面，整合所有子组件。

```typescript
@Component
export struct MusicListPage {
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm';
  
  aboutToAppear() {
    AppStorage.setOrCreate('songList', songList);
    MediaService.getInstance();
    this.breakpointSystem.register();
  }
  
  build() {
    Stack({ alignContent: Alignment.Top }) {
      Header()      // 头部
      Content()     // 内容区
      Player()      // 播放器
    }
  }
}
```

#### Player.ets - 播放器组件

底部播放控制区域，显示当前播放信息和控制按钮。

**功能：**
- 显示当前歌曲信息（封面、名称、歌手）
- 播放/暂停按钮
- 进度条拖动
- 播放模式切换

#### LyricsComponent.ets - 歌词组件

同步显示歌词，支持滚动和高亮当前行。

**功能：**
- 歌词解析和显示
- 自动滚动到当前行
- 点击跳转到指定位置

#### PlayList.ets - 播放列表

显示所有歌曲列表，支持切换播放。

**功能：**
- 歌曲列表展示
- 当前播放高亮
- 点击切换歌曲

### 歌词解析

#### LrcUtils.ets - 歌词解析工具

```typescript
export class LrcUtils {
  // 解析LRC格式歌词
  static parse(lrcContent: string): LrcEntry[];
  
  // 根据时间获取当前歌词索引
  static getCurrentIndex(entries: LrcEntry[], time: number): number;
}
```

**LRC格式示例：**
```
[00:00.00]歌曲名称
[00:05.00]第一句歌词
[00:10.00]第二句歌词
```

#### LrcEntry.ets - 歌词条目模型

```typescript
export class LrcEntry {
  time: number = 0;    // 时间（毫秒）
  text: string = '';   // 歌词文本
}
```

### 常量定义

#### PlayerConstants.ets

```typescript
export class PlayerConstants {
  // 播放器高度
  static readonly PLAYER_HEIGHT: number = 120;
  
  // 进度条高度
  static readonly PROGRESS_HEIGHT: number = 4;
  
  // 控制按钮大小
  static readonly CONTROL_BUTTON_SIZE: number = 48;
}
```

---

## 2. musiccomment - 音乐评论模块

### 概述
音乐评论展示模块，展示歌曲的精彩评论和最新评论。

### 功能特性
- 💬 精彩评论展示
- 🆕 最新评论展示
- 👤 用户头像和昵称
- ❤️ 点赞数展示
- 📱 多设备自适应布局

### 目录结构

```
musiccomment/
├── Index.ets                    # 模块导出
├── src/main/ets/
│   ├── view/
│   │   ├── MusicCommentPage.ets # 主页面
│   │   ├── HeadComponent.ets    # 头部组件
│   │   ├── ListItemComponent.ets # 列表项组件
│   │   └── MusicInfoComponent.ets # 音乐信息组件
│   ├── constants/
│   │   └── CommonConstants.ets  # 公共常量
│   └── viewmodel/
│       ├── Comment.ets          # 评论数据模型
│       └── CommentViewModel.ets # 评论视图模型
└── src/main/resources/          # 资源文件
```

### 核心组件

#### MusicCommentPage.ets - 主页面

评论模块入口页面，展示精彩评论和最新评论。

```typescript
@Component
export struct MusicCommentPage {
  @StorageProp('currentBreakpoint') currentBp: string = 'sm';
  @State wonderfulComment: Comment[] = CommentViewModel.getWonderfulReview();
  @State newComment: Comment[] = CommentViewModel.getNewComment();
  
  build() {
    GridRow() {
      GridCol() {
        Column() {
          HeadComponent()        // 头部
          MusicInfoComponent()   // 音乐信息
          this.ShowTitle('精彩评论')
          // 精彩评论列表
          this.ShowTitle('最新评论')
          // 最新评论列表
        }
      }
    }
  }
}
```

#### ListItemComponent.ets - 评论列表项

单条评论的展示组件。

**显示内容：**
- 用户头像
- 用户昵称
- 评论内容
- 评论时间
- 点赞数

### 数据模型

#### Comment.ets - 评论数据模型

```typescript
export class Comment {
  id: number = 0;           // 评论ID
  userId: number = 0;       // 用户ID
  userName: string = '';    // 用户昵称
  userAvatar: string = '';  // 用户头像
  content: string = '';     // 评论内容
  time: string = '';        // 评论时间
  likes: number = 0;        // 点赞数
}
```

#### CommentViewModel.ets - 评论视图模型

```typescript
export default class CommentViewModel {
  // 获取精彩评论
  static getWonderfulReview(): Comment[];
  
  // 获取最新评论
  static getNewComment(): Comment[];
}
```

### 常量定义

#### CommonConstants.ets

```typescript
export class CommonConstants {
  // 列表显示数量
  static readonly LIST_COUNT: number = 3;
  
  // 头像大小
  static readonly AVATAR_SIZE: number = 40;
  
  // 评论最大行数
  static readonly MAX_LINES: number = 3;
}
```

---

## 3. live - 直播模块

### 概述
直播列表展示模块，展示直播内容列表。

### 功能特性
- 📺 直播列表展示
- 🖼️ 直播封面
- 👁️ 观看人数
- 📱 多设备自适应布局

### 目录结构

```
live/
├── Index.ets                    # 模块导出
├── src/main/ets/
│   ├── view/
│   │   ├── LivePage.ets         # 主页面
│   │   ├── Header.ets           # 头部组件
│   │   └── LiveList.ets         # 直播列表
│   ├── constants/
│   │   └── LiveConstants.ets    # 直播常量
│   └── viewmodel/
│       ├── LiveStream.ets       # 直播数据模型
│       └── LiveStreamViewModel.ets # 直播视图模型
└── src/main/resources/          # 资源文件
```

### 核心组件

#### LivePage.ets - 主页面

直播模块入口页面。

```typescript
@Component
export struct LivePage {
  @StorageLink('topRectHeight') topRectHeight: number = 0;
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm';
  
  build() {
    Column() {
      Header()
      LiveList(this.currentBreakpoint)
    }
  }
}
```

#### LiveList.ets - 直播列表

展示直播内容的列表组件。

**显示内容：**
- 直播封面
- 直播标题
- 主播信息
- 观看人数

### 数据模型

#### LiveStream.ets - 直播数据模型

```typescript
export class LiveStream {
  id: number = 0;           // 直播ID
  title: string = '';       // 直播标题
  cover: string = '';       // 封面图片
  anchor: string = '';      // 主播名称
  anchorAvatar: string = '';// 主播头像
  viewers: number = 0;      // 观看人数
  status: string = '';      // 直播状态
}
```

#### LiveStreamViewModel.ets - 直播视图模型

```typescript
export default class LiveStreamViewModel {
  // 获取直播列表
  static getLiveList(): LiveStream[];
}
```

### 常量定义

#### LiveConstants.ets

```typescript
export class LiveConstants {
  // 默认断点
  static readonly CURRENT_BREAKPOINT: string = 'sm';
  
  // 尺寸常量
  static readonly FULL_WIDTH_PERCENT: number = 1;
  static readonly FULL_HEIGHT_PERCENT: number = 1;
  
  // 列表间距
  static readonly LIST_SPACE: number = 12;
}
```

---

## 模块导出

每个特性模块通过 `Index.ets` 导出主要组件：

### musiclist/Index.ets
```typescript
export { MusicListPage } from './src/main/ets/view/MusicListPage';
```

### musiccomment/Index.ets
```typescript
export { MusicCommentPage } from './src/main/ets/view/MusicCommentPage';
```

### live/Index.ets
```typescript
export { LivePage } from './src/main/ets/view/LivePage';
```

---

## 依赖关系

```
┌─────────────────────────────────────────────┐
│                 Features                     │
├─────────────────────────────────────────────┤
│  musiclist  │  musiccomment  │  live        │
│      │      │       │        │     │        │
│      └──────┴───────┴────────┴─────┘        │
│                   │                          │
│                   ▼                          │
│              mediacommon                     │
│                   │                          │
│                   ▼                          │
│            constantscommon                   │
└─────────────────────────────────────────────┘
```

### 模块依赖配置

```json
// musiclist/oh-package.json5
{
  "dependencies": {
    "constantscommon": "file:../../common/constantscommon",
    "mediacommon": "file:../../common/mediacommon"
  }
}

// musiccomment/oh-package.json5
{
  "dependencies": {
    "constantscommon": "file:../../common/constantscommon",
    "mediacommon": "file:../../common/mediacommon"
  }
}

// live/oh-package.json5
{
  "dependencies": {
    "constantscommon": "file:../../common/constantscommon"
  }
}
```

---

## 使用方式

在产品层模块中导入使用：

```typescript
// 导入页面组件
import { MusicListPage } from 'musiclist';
import { MusicCommentPage } from 'musiccomment';
import { LivePage } from 'live';

// 在路由中使用
@Builder
PagesMap(name: string) {
  if (name === 'MusicList') {
    NavDestination() {
      MusicListPage()
    }
  } else if (name === 'MusicComment') {
    NavDestination() {
      MusicCommentPage()
    }
  } else if (name === 'Live') {
    NavDestination() {
      LivePage()
    }
  }
}
```

---

## 响应式布局

所有特性模块都支持响应式布局，根据断点值自动调整：

| 断点 | 设备 | 布局特点 |
|------|------|----------|
| sm | 手机 | 单列、紧凑间距 |
| md | 折叠 | 双列、适中间距 |
| lg | 平板 | 多列、宽松间距 |

**示例代码：**
```typescript
@Column()
.margin({
  left: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM
    ? $r('app.float.margin_left_sm')
    : $r('app.float.margin_left')
})
```
