# 多设备音乐界面 - 项目架构文档

## 目录
- [概述](#概述)
- [架构设计](#架构设计)
- [模块划分](#模块划分)
- [技术栈](#技术栈)
- [目录结构](#目录结构)
- [设计模式](#设计模式)

---

## 概述

本项目是一个基于 HarmonyOS 的多设备音乐播放应用，采用**一次开发、多端部署**的设计理念，通过自适应和响应式布局，实现直板机、双折叠设备、平板和智能穿戴设备的统一界面适配。

### 核心特性
- 🎵 音乐播放控制（播放/暂停、上一首/下一首、播放模式切换）
- 📱 多设备自适应布局
- 💬 音乐评论功能
- 📺 直播列表展示
- 🎤 歌词同步显示
- ⌚ 智能穿戴设备圆形表盘适配

---

## 架构设计

本项目采用**三层架构**设计，遵循 HarmonyOS 推荐的应用架构模式：

```
┌─────────────────────────────────────────────────────────────┐
│                    产品定制层 (Products)                      │
│         phone (手机/折叠/平板)  │  watch (智能穿戴)            │
├─────────────────────────────────────────────────────────────┤
│                    基础特性层 (Features)                      │
│      musiclist  │  musiccomment  │  live                     │
├─────────────────────────────────────────────────────────────┤
│                    公共能力层 (Common)                        │
│           constantsCommon  │  mediaCommon                   │
└─────────────────────────────────────────────────────────────┘
```

### 层级职责

| 层级 | 目录 | 职责 |
|------|------|------|
| **产品定制层** | `products/` | 针对不同设备类型的入口和定制化配置 |
| **基礎特性层** | `features/` | 可复用的业务功能模块 |
| **公共能力层** | `common/` | 通用的常量、工具类和数据模型 |

---

## 模块划分

### 1. 公共能力层 (Common)

#### 1.1 constantsCommon - 公共常量模块
提供全局统一的常量定义，确保各模块使用一致的配置值。

| 文件 | 说明 |
|------|------|
| `BreakpointConstants.ets` | 断点常量，定义 sm/md/lg 三种设备尺寸断点 |
| `GridConstants.ets` | 栅格布局常量，定义列数、间距等 |
| `RouterUrlConstants.ets` | 路由URL常量，定义页面跳转路径 |
| `SongConstants.ets` | 歌曲相关常量 |
| `StyleConstants.ets` | 样式常量，如全宽、全高等 |

#### 1.2 mediaCommon - 公共媒体模块
提供媒体播放、数据处理等核心功能。

| 目录/文件 | 说明 |
|-----------|------|
| `utils/MediaService.ets` | 媒体播放服务核心类，封装 AVPlayer |
| `utils/BreakpointSystem.ets` | 断点系统，监听设备尺寸变化 |
| `utils/PreferencesUtil.ets` | 偏好设置工具类 |
| `utils/Logger.ets` | 日志工具类 |
| `utils/MediaTools.ets` | 媒体工具类（时间格式化等） |
| `utils/ColorConversion.ets` | 颜色转换工具 |
| `utils/BackgroundUtil.ets` | 背景处理工具 |
| `viewmodel/MusicData.ets` | 音乐数据模型（播放状态、播放模式） |
| `viewmodel/SongData.ets` | 歌曲数据模型 |
| `viewmodel/CardData.ets` | 卡片数据模型 |
| `viewmodel/MenuData.ets` | 菜单数据模型 |

---

### 2. 基础特性层 (Features)

#### 2.1 musiclist - 音乐列表模块
核心音乐播放功能模块。

| 目录/文件 | 说明 |
|-----------|------|
| `view/MusicListPage.ets` | 音乐列表主页面 |
| `components/Header.ets` | 页面头部组件 |
| `components/Player.ets` | 播放器组件 |
| `components/PlayList.ets` | 播放列表组件 |
| `components/AlbumComponent.ets` | 专辑组件 |
| `components/AlbumCover.ets` | 专辑封面组件 |
| `components/ControlAreaComponent.ets` | 控制区域组件 |
| `components/MusicControlComponent.ets` | 音乐控制组件 |
| `components/MusicInfoComponent.ets` | 音乐信息组件 |
| `components/LyricsComponent.ets` | 歌词组件 |
| `components/TopAreaComponent.ets` | 顶部区域组件 |
| `lyric/LrcView.ets` | 歌词视图 |
| `lyric/LrcUtils.ets` | 歌词解析工具 |
| `viewmodel/SongDataSource.ets` | 歌曲数据源 |
| `viewmodel/SongListData.ets` | 歌曲列表数据 |

#### 2.2 musiccomment - 音乐评论模块
音乐评论展示功能模块。

| 目录/文件 | 说明 |
|-----------|------|
| `view/MusicCommentPage.ets` | 评论主页面 |
| `view/HeadComponent.ets` | 头部组件 |
| `view/ListItemComponent.ets` | 列表项组件 |
| `view/MusicInfoComponent.ets` | 音乐信息组件 |
| `viewmodel/Comment.ets` | 评论数据模型 |
| `viewmodel/CommentViewModel.ets` | 评论视图模型 |

#### 2.3 live - 直播模块
直播列表展示功能模块。

| 目录/文件 | 说明 |
|-----------|------|
| `view/LivePage.ets` | 直播主页面 |
| `view/Header.ets` | 头部组件 |
| `view/LiveList.ets` | 直播列表组件 |
| `viewmodel/LiveStream.ets` | 直播数据模型 |
| `viewmodel/LiveStreamViewModel.ets` | 直播视图模型 |

---

### 3. 产品定制层 (Products)

#### 3.1 phone - 手机/折叠/平板产品
支持直板机、双折叠设备和平板的产品定制。

| 目录/文件 | 说明 |
|-----------|------|
| `pages/Index.ets` | 主入口页面 |
| `entryability/EntryAbility.ets` | 应用入口能力 |
| `viewmodel/IndexItem.ets` | 首页项数据模型 |
| `viewmodel/IndexViewModel.ets` | 首页视图模型 |
| `common/constants/HomeConstants.ets` | 首页常量 |

#### 3.2 watch - 智能穿戴产品
支持智能手表的产品定制，适配圆形表盘。

| 目录/文件 | 说明 |
|-----------|------|
| `pages/Index.ets` | 主入口页面 |
| `view/Home.ets` | 首页视图 |
| `view/PlayList.ets` | 播放列表视图 |
| `view/SongList.ets` | 歌曲列表视图 |

---

## 技术栈

### 开发框架
- **HarmonyOS SDK**: 6.0.2 Release 及以上
- **DevEco Studio**: 6.0.2 Release 及以上
- **开发语言**: ArkTS (TypeScript 扩展)

### 核心Kit
| Kit | 用途 |
|-----|------|
| `@kit.MediaKit` | 媒体播放 (AVPlayer) |
| `@kit.AVSessionKit` | 音频会话管理 |
| `@kit.AbilityKit` | 应用能力框架 |
| `@kit.FormKit` | 卡片框架 |
| `@kit.LocalizationKit` | 资源管理 |
| `@kit.BasicServicesKit` | 基础服务 |

### UI组件
- **GridRow / GridCol**: 栅格布局系统
- **Navigation / NavDestination**: 导航系统
- **List / ListItem**: 列表组件
- **Swiper**: 滑动视图
- **Tabs**: 标签页

---

## 目录结构

```
MusicHome-master/
├── common/                          # 公共能力层
│   ├── constantscommon/             # 公共常量模块
│   │   ├── index.ets                # 模块导出
│   │   └── src/main/ets/
│   │       └── constants/           # 常量定义
│   │           ├── BreakpointConstants.ets
│   │           ├── GridConstants.ets
│   │           ├── RouterUrlConstants.ets
│   │           ├── SongConstants.ets
│   │           └── StyleConstants.ets
│   └── mediacommon/                 # 公共媒体模块
│       ├── index.ets                # 模块导出
│       └── src/main/ets/
│           ├── utils/               # 工具类
│           │   ├── MediaService.ets
│           │   ├── BreakpointSystem.ets
│           │   ├── PreferencesUtil.ets
│           │   ├── Logger.ets
│           │   ├── MediaTools.ets
│           │   ├── ColorConversion.ets
│           │   ├── BackgroundUtil.ets
│           │   └── SongItemBuilder.ets
│           └── viewmodel/           # 数据模型
│               ├── MusicData.ets
│               ├── SongData.ets
│               ├── CardData.ets
│               └── MenuData.ets
│
├── features/                        # 基础特性层
│   ├── musiclist/                   # 音乐列表模块
│   │   ├── Index.ets                # 模块导出
│   │   └── src/main/ets/
│   │       ├── view/                # 页面
│   │       │   └── MusicListPage.ets
│   │       ├── components/          # 组件
│   │       │   ├── Header.ets
│   │       │   ├── Player.ets
│   │       │   ├── PlayList.ets
│   │       │   └── ...
│   │       ├── lyric/               # 歌词
│   │       │   ├── LrcView.ets
│   │       │   ├── LrcUtils.ets
│   │       │   └── ...
│   │       ├── constants/           # 常量
│   │       └── viewmodel/           # 视图模型
│   │
│   ├── musiccomment/                # 音乐评论模块
│   │   ├── Index.ets
│   │   └── src/main/ets/
│   │       ├── view/
│   │       ├── constants/
│   │       └── viewmodel/
│   │
│   └── live/                        # 直播模块
│       ├── Index.ets
│       └── src/main/ets/
│           ├── view/
│           ├── constants/
│           └── viewmodel/
│
├── products/                        # 产品定制层
│   ├── phone/                       # 手机/折叠/平板
│   │   └── src/main/ets/
│   │       ├── pages/
│   │       │   └── Index.ets
│   │       ├── entryability/
│   │       ├── viewmodel/
│   │       └── common/
│   │
│   └── watch/                       # 智能穿戴
│       └── src/main/ets/
│           ├── pages/
│           ├── view/
│           └── constants/
│
├── screenshots/                     # 效果截图
├── docs/                            # 文档目录
├── build-profile.json5              # 构建配置
├── hvigorfile.ts                    # 构建脚本
├── oh-package.json5                 # 依赖配置
└── README.md                        # 项目说明
```

---

## 设计模式

### 1. 单例模式
`MediaService` 采用单例模式，确保全局只有一个媒体播放实例：

```typescript
export class MediaService {
  private static instance?: MediaService;
  
  static getInstance(): MediaService {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService();
    }
    return MediaService.instance;
  }
}
```

### 2. 观察者模式
通过 `AppStorage` 和 `@StorageLink`/`@StorageProp` 装饰器实现状态共享：

```typescript
// 设置共享状态
AppStorage.setOrCreate('currentTime', time);

// 组件中监听
@StorageLink('currentTime') currentTime: string = '';
```

### 3. 策略模式
断点系统根据不同设备尺寸应用不同的布局策略：

```typescript
static readonly BREAKPOINT_VALUE: Array<string> = ['320vp', '600vp', '840vp'];
// sm: < 600vp (手机)
// md: 600vp - 840vp (折叠)
// lg: > 840vp (平板)
```

### 4. MVVM 模式
每个特性模块遵循 MVVM 架构：
- **Model**: `viewmodel/` 下的数据模型
- **View**: `view/` 和 `components/` 下的 UI 组件
- **ViewModel**: `viewmodel/` 下的视图模型类

---

## 设备适配策略

| 设备类型 | 断点 | 列数 | 特殊处理 |
|----------|------|------|----------|
| 直板机 | sm | 4 | 单列布局 |
| 双折叠 | md | 8 | 双列布局 |
| 平板 | lg | 12 | 多列布局 |
| 智能穿戴 | - | - | 圆形表盘、简化UI |

---

## 相关链接

- [API参考文档](./API_REFERENCE.md)
- [开发指南](./DEVELOPMENT_GUIDE.md)
- [公共模块文档](../common/README.md)
- [特性模块文档](../features/README.md)
- [产品模块文档](../products/README.md)
