# 产品定制层 (Products)

产品定制层是应用的最上层，针对不同设备类型进行定制化配置，是应用的入口点。

## 模块组成

```
products/
├── phone/    # 手机/折叠/平板产品
└── watch/    # 智能穿戴产品
```

---

## 1. phone - 手机/折叠/平板产品

### 概述
支持直板机、双折叠设备（Mate X系列）和平板的产品定制，通过响应式布局实现一套代码多端适配。

### 支持设备
| 设备类型 | 断点 | 屏幕特点 |
|----------|------|----------|
| 直板机 | sm | 窄屏、单手操作 |
| 双折叠 | md | 中等宽度、分屏优化 |
| 平板 | lg | 宽屏、多列布局 |

### 目录结构

```
phone/
├── src/main/ets/
│   ├── pages/
│   │   └── Index.ets              # 主入口页面
│   ├── entryability/
│   │   └── EntryAbility.ets       # 应用入口能力
│   ├── phonebackupextability/
│   │   └── PhoneBackupExtAbility.ets # 备份扩展能力
│   ├── viewmodel/
│   │   ├── IndexItem.ets          # 首页项数据模型
│   │   └── IndexViewModel.ets     # 首页视图模型
│   └── common/constants/
│       └── HomeConstants.ets      # 首页常量
├── src/main/resources/            # 资源文件
│   ├── base/
│   │   ├── element/               # 颜色、字符串等
│   │   ├── media/                 # 图片资源
│   │   └── profile/               # 配置文件
│   └── rawfile/                   # 原始文件（音频等）
└── src/main/module.json5          # 模块配置
```

### 核心文件

#### Index.ets - 主入口页面

应用的主入口，展示功能入口卡片，处理页面路由。

```typescript
@Entry
@Component
struct Index {
  @State indexItemList: IndexItem[] = IndexViewModel.getIndexItemList();
  @StorageLink('pageIndexInfos') pageIndexInfos: NavPathStack = new NavPathStack();
  
  // 页面路由映射
  @Builder
  PagesMap(name: string, param?: object) {
    if (name === RouterUrlConstants.LIVE) {
      NavDestination() {
        LivePage()
      }
    } else if (name === RouterUrlConstants.MUSIC_LIST) {
      NavDestination() {
        MusicListPage()
      }
    } else if (name === RouterUrlConstants.MUSIC_COMMENT) {
      NavDestination() {
        MusicCommentPage()
      }
    }
  }
  
  build() {
    Navigation(this.pageIndexInfos) {
      Scroll() {
        GridRow() {
          GridCol() {
            Column() {
              ForEach(this.indexItemList, (item: IndexItem) => {
                // 功能入口卡片
              })
            }
          }
        }
      }
    }
    .navDestination(this.PagesMap)
  }
}
```

**页面结构：**
```
┌─────────────────────────────┐
│         Navigation          │
│  ┌───────────────────────┐  │
│  │      GridRow          │  │
│  │  ┌─────────────────┐  │  │
│  │  │   GridCol       │  │  │
│  │  │  ┌───────────┐  │  │  │
│  │  │  │ 功能卡片1 │  │  │  │
│  │  │  └───────────┘  │  │  │
│  │  │  ┌───────────┐  │  │  │
│  │  │  │ 功能卡片2 │  │  │  │
│  │  │  └───────────┘  │  │  │
│  │  │  ┌───────────┐  │  │  │
│  │  │  │ 功能卡片3 │  │  │  │
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

#### EntryAbility.ets - 应用入口能力

处理应用生命周期和初始化。

```typescript
export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    // 应用创建时初始化
    AppStorage.setOrCreate('context', this.context);
  }
  
  onForeground() {
    // 应用进入前台
  }
  
  onBackground() {
    // 应用进入后台
  }
  
  onDestroy() {
    // 应用销毁
    MediaService.getInstance().release();
  }
}
```

#### IndexItem.ets - 首页项数据模型

```typescript
export default class IndexItem {
  title: string = '';        // 卡片标题
  description: string = '';  // 卡片描述
  button: string = '';       // 按钮文字
  image: string = '';        // 背景图片
  route: string = '';        // 路由路径
}
```

#### IndexViewModel.ets - 首页视图模型

```typescript
export default class IndexViewModel {
  static getIndexItemList(): IndexItem[] {
    return [
      {
        title: '音乐列表',
        description: '播放音乐、查看歌词',
        button: '立即体验',
        image: 'music_bg.png',
        route: RouterUrlConstants.MUSIC_LIST
      },
      {
        title: '音乐评论',
        description: '查看精彩评论',
        button: '立即体验',
        image: 'comment_bg.png',
        route: RouterUrlConstants.MUSIC_COMMENT
      },
      {
        title: '直播',
        description: '观看精彩直播',
        button: '立即体验',
        image: 'live_bg.png',
        route: RouterUrlConstants.LIVE
      }
    ];
  }
}
```

#### HomeConstants.ets - 首页常量

```typescript
export class HomeConstants {
  // 列间距
  static readonly COLUMN_SPACE: number = 16;
  
  // 文字透明度
  static readonly TEXT_OPACITY: number = 0.8;
  
  // 卡片高度
  static readonly CARD_HEIGHT: number = 200;
  
  // 卡片圆角
  static readonly CARD_BORDER_RADIUS: number = 16;
}
```

### 响应式布局配置

```typescript
GridRow({
  breakpoints: {
    value: BreakpointConstants.BREAKPOINT_VALUE,  // ['320vp', '600vp', '840vp']
    reference: BreakpointsReference.WindowSize
  },
  columns: {
    sm: BreakpointConstants.COLUMN_SM,   // 4列
    md: BreakpointConstants.COLUMN_MD,   // 8列
    lg: BreakpointConstants.COLUMN_LG    // 12列
  },
  gutter: { x: BreakpointConstants.GUTTER_X },  // 24vp间距
  direction: GridRowDirection.Row
}) {
  GridCol({
    span: {
      sm: BreakpointConstants.SPAN_SM,   // 占4列
      md: BreakpointConstants.SPAN_MD,   // 占8列
      lg: BreakpointConstants.SPAN_LG    // 占8列
    },
    offset: {
      md: BreakpointConstants.OFFSET_MD, // 偏移0列
      lg: BreakpointConstants.OFFSET_LG  // 偏移2列
    }
  }) {
    // 内容
  }
}
```

### 模块配置

```json5
// src/main/module.json5
{
  "module": {
    "name": "phone",
    "type": "entry",
    "deviceTypes": [
      "default",
      "tablet"
    ],
    "abilities": [
      {
        "name": "EntryAbility",
        "srcEntry": "./ets/entryability/EntryAbility.ets",
        "launchType": "standard"
      }
    ]
  }
}
```

---

## 2. watch - 智能穿戴产品

### 概述
支持智能手表的产品定制，适配圆形表盘，提供简化的用户界面。

### 设计特点
- ⌚ 圆形表盘适配
- 🎯 简化UI设计
- 👆 大触控区域
- 📱 优化的交互方式

### 目录结构

```
watch/
├── src/main/ets/
│   ├── pages/
│   │   └── Index.ets              # 主入口页面
│   ├── view/
│   │   ├── Home.ets               # 首页视图
│   │   ├── PlayList.ets           # 播放列表视图
│   │   └── SongList.ets           # 歌曲列表视图
│   ├── constants/
│   │   └── StyleConstants.ets     # 样式常量
│   ├── watchability/
│   │   └── WatchAbility.ets       # 手表应用能力
│   └── watchbackupability/
│       └── WatchBackupAbility.ets # 备份扩展能力
├── src/main/resources/            # 资源文件
└── src/main/module.json5          # 模块配置
```

### 核心文件

#### Index.ets - 主入口页面

智能穿戴的主入口，采用圆形布局适配表盘。

```typescript
@Entry
@Component
struct Index {
  build() {
    Stack() {
      Home()
    }
    .width('100%')
    .height('100%')
    .borderRadius('50%')  // 圆形表盘
  }
}
```

#### Home.ets - 首页视图

手表首页，展示功能入口。

```typescript
@Component
export struct Home {
  build() {
    Column() {
      // 时间显示
      Text(this.currentTime)
        .fontSize(32)
      
      // 功能入口
      Row() {
        this.EntryButton('播放列表')
        this.EntryButton('设置')
      }
    }
  }
}
```

#### PlayList.ets - 播放列表视图

简化的播放列表，适配小屏幕。

```typescript
@Component
export struct PlayList {
  @StorageLink('songList') songList: SongItem[] = [];
  
  build() {
    List() {
      ForEach(this.songList, (song: SongItem) => {
        ListItem() {
          this.SongItem(song)
        }
      })
    }
  }
}
```

#### SongList.ets - 歌曲列表视图

歌曲列表展示，支持滑动切换。

```typescript
@Component
export struct SongList {
  build() {
    Swiper() {
      ForEach(this.songs, (song: SongItem) => {
        this.SongCard(song)
      })
    }
    .indicator(false)
    .curve(Curve.Ease)
  }
}
```

#### StyleConstants.ets - 样式常量

```typescript
export class StyleConstants {
  // 圆形表盘半径
  static readonly WATCH_RADIUS: string = '50%';
  
  // 字体大小（适配小屏幕）
  static readonly FONT_SIZE_SMALL: number = 12;
  static readonly FONT_SIZE_MEDIUM: number = 16;
  static readonly FONT_SIZE_LARGE: number = 20;
  
  // 触控区域最小尺寸
  static readonly TOUCH_TARGET_MIN: number = 48;
  
  // 间距
  static readonly PADDING: number = 8;
  static readonly MARGIN: number = 4;
}
```

### 圆形表盘适配

```typescript
// 圆形裁剪
.borderRadius('50%')
.clip(true)

// 圆形进度条
Progress({ value: this.progress, total: 100 })
  .style(ProgressStyle.Ring)

// 圆形按钮
Button()
  .width(60)
  .height(60)
  .borderRadius(30)
```

### 模块配置

```json5
// src/main/module.json5
{
  "module": {
    "name": "watch",
    "type": "entry",
    "deviceTypes": [
      "wearable"
    ],
    "abilities": [
      {
        "name": "WatchAbility",
        "srcEntry": "./ets/watchability/WatchAbility.ets",
        "launchType": "standard"
      }
    ]
  }
}
```

---

## 依赖关系

### phone 依赖

```json
// phone/oh-package.json5
{
  "dependencies": {
    "constantscommon": "file:../../common/constantscommon",
    "mediacommon": "file:../../common/mediacommon",
    "musiclist": "file:../../features/musiclist",
    "musiccomment": "file:../../features/musiccomment",
    "live": "file:../../features/live"
  }
}
```

### watch 依赖

```json
// watch/oh-package.json5
{
  "dependencies": {
    "constantscommon": "file:../../common/constantscommon",
    "mediacommon": "file:../../common/mediacommon",
    "musiclist": "file:../../features/musiclist",
    "musiccomment": "file:../../features/musiccomment",
    "live": "file:../../features/live"
  }
}
```

---

## 设备选择

在 DevEco Studio 中选择运行设备：

1. 打开 **Run > Edit Configurations**
2. 在 **Deployment Target** 中选择设备类型：
   - **phone**: 选择手机、折叠设备或平板
   - **watch**: 选择智能穿戴设备

![设备选择](../screenshots/device/img.png)

---

## 构建配置

### build-profile.json5

```json5
{
  "app": {
    "signingConfigs": [],
    "products": [
      {
        "name": "default",
        "signingConfig": "default"
      }
    ]
  },
  "modules": [
    {
      "name": "phone",
      "srcPath": "./products/phone",
      "targets": [
        {
          "name": "default",
          "applyToProducts": ["default"]
        }
      ]
    },
    {
      "name": "watch",
      "srcPath": "./products/watch",
      "targets": [
        {
          "name": "default",
          "applyToProducts": ["default"]
        }
      ]
    }
  ]
}
```

---

## 对比：phone vs watch

| 特性 | phone | watch |
|------|-------|-------|
| 设备类型 | 手机、折叠、平板 | 智能穿戴 |
| 屏幕形状 | 矩形 | 圆形 |
| 布局方式 | 栅格响应式 | 固定圆形 |
| 功能入口 | 卡片列表 | 简化入口 |
| 播放控制 | 完整控制栏 | 简化控制 |
| 歌词显示 | 同步滚动 | 简化显示 |
| 评论功能 | 完整展示 | 不支持 |

---

## 运行说明

1. **手机/折叠/平板**
   - 选择 `phone` 模块
   - 连接对应设备或模拟器
   - 点击运行

2. **智能穿戴**
   - 选择 `watch` 模块
   - 连接手表设备或模拟器
   - 点击运行

应用会根据设备类型自动加载对应的产品模块。
