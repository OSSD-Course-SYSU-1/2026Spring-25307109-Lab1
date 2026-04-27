# 开发指南

本文档提供项目的开发环境配置、开发流程和最佳实践指南。

## 目录
- [环境配置](#环境配置)
- [项目结构](#项目结构)
- [开发流程](#开发流程)
- [响应式布局开发](#响应式布局开发)
- [媒体播放开发](#媒体播放开发)
- [导航与路由](#导航与路由)
- [状态管理](#状态管理)
- [资源管理](#资源管理)
- [调试与测试](#调试与测试)
- [最佳实践](#最佳实践)

---

## 环境配置

### 系统要求

| 项目 | 版本要求 |
|------|----------|
| HarmonyOS 系统 | 5.1.0 Release 及以上 |
| DevEco Studio | 6.0.2 Release 及以上 |
| HarmonyOS SDK | 6.0.2 Release SDK 及以上 |

### 安装 DevEco Studio

1. 下载 DevEco Studio
   - 访问 [HarmonyOS 开发者网站](https://developer.harmonyos.com/)
   - 下载 DevEco Studio 6.0.2 Release 或更高版本

2. 安装 SDK
   - 打开 DevEco Studio
   - 进入 **File > Settings > HarmonyOS SDK**
   - 下载 HarmonyOS SDK 6.0.2 Release

3. 配置开发环境
   - 配置 Node.js 环境
   - 配置 hvigor 构建工具

### 打开项目

```bash
# 克隆或下载项目后
cd MusicHome-master

# 在 DevEco Studio 中打开
# File > Open > 选择项目目录
```

---

## 项目结构

### 三层架构

```
MusicHome-master/
├── common/           # 公共能力层
│   ├── constantscommon/
│   └── mediacommon/
├── features/         # 基础特性层
│   ├── musiclist/
│   ├── musiccomment/
│   └── live/
├── products/         # 产品定制层
│   ├── phone/
│   └── watch/
└── docs/             # 文档目录
```

### 模块依赖关系

```
products/phone  ──┐
products/watch ───┼──> features/* ──> common/mediacommon ──> common/constantscommon
                  │
                  └──> common/mediacommon
```

---

## 开发流程

### 1. 创建新特性模块

#### 步骤一：创建模块目录

```
features/
└── newfeature/
    ├── Index.ets
    ├── src/main/ets/
    │   ├── view/
    │   ├── components/
    │   ├── constants/
    │   └── viewmodel/
    └── src/main/resources/
```

#### 步骤二：创建模块配置

```json5
// features/newfeature/oh-package.json5
{
  "name": "newfeature",
  "version": "1.0.0",
  "description": "新特性模块",
  "main": "Index.ets",
  "author": "",
  "license": "Apache-2.0",
  "dependencies": {
    "constantscommon": "file:../../common/constantscommon",
    "mediacommon": "file:../../common/mediacommon"
  }
}
```

#### 步骤三：创建模块导出

```typescript
// features/newfeature/Index.ets
export { NewFeaturePage } from './src/main/ets/view/NewFeaturePage';
```

#### 步骤四：在产品层添加依赖

```json5
// products/phone/oh-package.json5
{
  "dependencies": {
    // ...其他依赖
    "newfeature": "file:../../features/newfeature"
  }
}
```

---

### 2. 创建新组件

#### 组件模板

```typescript
// components/MyComponent.ets
import { StyleConstants, BreakpointConstants } from 'constantscommon';

@Component
export struct MyComponent {
  // 响应式断点
  @StorageProp('currentBreakpoint') currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
  
  // 组件状态
  @State private data: string = '';
  
  // 组件属性
  @Prop title: string = '';
  
  aboutToAppear(): void {
    // 组件初始化
  }
  
  aboutToDisappear(): void {
    // 组件销毁
  }
  
  build() {
    Column() {
      Text(this.title)
        .fontSize(this.getFontSize())
    }
    .width(StyleConstants.FULL_WIDTH)
  }
  
  // 根据断点获取字体大小
  private getFontSize(): number {
    switch (this.currentBreakpoint) {
      case BreakpointConstants.BREAKPOINT_SM:
        return 14;
      case BreakpointConstants.BREAKPOINT_MD:
        return 16;
      case BreakpointConstants.BREAKPOINT_LG:
        return 18;
      default:
        return 14;
    }
  }
}
```

---

### 3. 创建新页面

#### 页面模板

```typescript
// view/MyPage.ets
import { BreakpointSystem, MediaService } from 'mediacommon';
import { StyleConstants, BreakpointConstants } from 'constantscommon';
import { Header } from '../components/Header';

@Component
export struct MyPage {
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();
  @StorageProp('currentBreakpoint') currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
  
  aboutToAppear() {
    this.breakpointSystem.register();
    // 页面初始化
  }
  
  aboutToDisappear() {
    this.breakpointSystem.unregister();
  }
  
  build() {
    Column() {
      Header()
      
      // 页面内容
      this.Content()
    }
    .width(StyleConstants.FULL_WIDTH)
    .height(StyleConstants.FULL_HEIGHT)
  }
  
  @Builder
  Content() {
    // 内容构建器
  }
}
```

---

## 响应式布局开发

### 断点系统

项目使用三种断点：

| 断点 | 范围 | 设备类型 |
|------|------|----------|
| sm | < 600vp | 手机 |
| md | 600vp - 840vp | 折叠设备 |
| lg | > 840vp | 平板 |

### 使用栅格布局

```typescript
import { BreakpointConstants } from 'constantscommon';

GridRow({
  breakpoints: {
    value: BreakpointConstants.BREAKPOINT_VALUE,
    reference: BreakpointsReference.WindowSize
  },
  columns: {
    sm: BreakpointConstants.COLUMN_SM,  // 4列
    md: BreakpointConstants.COLUMN_MD,  // 8列
    lg: BreakpointConstants.COLUMN_LG   // 12列
  },
  gutter: { x: BreakpointConstants.GUTTER_X }
}) {
  GridCol({
    span: {
      sm: 4,   // 小设备占满行
      md: 4,   // 中设备占半行
      lg: 6    // 大设备占半行
    }
  }) {
    // 内容
  }
}
```

### 响应式样式

```typescript
@Component
struct ResponsiveComponent {
  @StorageProp('currentBreakpoint') currentBreakpoint: string = 'sm';
  
  build() {
    Column() {
      Text('响应式文本')
        .fontSize(this.currentBreakpoint === 'sm' ? 14 : 16)
        .margin({
          left: this.currentBreakpoint === 'sm' ? 16 : 24,
          right: this.currentBreakpoint === 'sm' ? 16 : 24
        })
    }
  }
}
```

### 使用资源限定

在资源文件中定义不同断点的值：

```
resources/
├── base/
│   └── element/
│       └── float.json        # 默认值
└── sm/
    └── element/
        └── float.json        # sm断点值
```

```typescript
Text('标题')
  .fontSize($r('app.float.title_size'))  // 自动根据断点选择
```

---

## 媒体播放开发

### 初始化播放服务

```typescript
import { MediaService } from 'mediacommon';

// 在页面或组件初始化时
aboutToAppear() {
  const mediaService = MediaService.getInstance();
}
```

### 播放控制

```typescript
// 播放
MediaService.getInstance().play();

// 暂停
MediaService.getInstance().pause();

// 上一首
MediaService.getInstance().previous();

// 下一首
MediaService.getInstance().next();

// 跳转
MediaService.getInstance().seek(30000); // 跳转到30秒

// 切换播放模式
MediaService.getInstance().changePlayMode();
```

### 监听播放状态

```typescript
@Component
struct PlayerComponent {
  @StorageLink('currentTime') currentTime: string = '00:00';
  @StorageLink('totalTime') totalTime: string = '00:00';
  @StorageLink('progress') progress: number = 0;
  @StorageLink('progressMax') progressMax: number = 0;
  
  build() {
    Column() {
      // 进度条
      Slider({
        value: this.progress,
        min: 0,
        max: this.progressMax,
        step: 1000
      })
      .onChange((value: number) => {
        MediaService.getInstance().seek(value);
      })
      
      // 时间显示
      Row() {
        Text(this.currentTime)
        Text(this.totalTime)
      }
    }
  }
}
```

---

## 导航与路由

### 定义路由常量

```typescript
// constantscommon/RouterUrlConstants.ets
export class RouterUrlConstants {
  static readonly MY_PAGE: string = 'MyPage';
}
```

### 配置路由映射

```typescript
// products/phone/src/main/ets/pages/Index.ets
@Builder
PagesMap(name: string, param?: object) {
  if (name === RouterUrlConstants.MY_PAGE) {
    NavDestination() {
      MyPage()
    }
    .hideTitleBar(true)
  }
}

build() {
  Navigation(this.pageIndexInfos) {
    // 内容
  }
  .navDestination(this.PagesMap)
}
```

### 页面跳转

```typescript
// 跳转到指定页面
this.pageIndexInfos.pushPathByName(RouterUrlConstants.MY_PAGE, null);

// 带参数跳转
this.pageIndexInfos.pushPathByName(RouterUrlConstants.MY_PAGE, { id: 123 });

// 返回
this.pageIndexInfos.pop();
```

---

## 状态管理

### AppStorage 全局状态

```typescript
// 设置状态
AppStorage.setOrCreate('key', value);

// 双向绑定（可读写）
@StorageLink('key') value: Type = defaultValue;

// 单向绑定（只读）
@StorageProp('key') value: Type = defaultValue;
```

### 组件状态

```typescript
@Component
struct MyComponent {
  // 可变状态（触发UI刷新）
  @State private count: number = 0;
  
  // 属性（父组件传入）
  @Prop title: string = '';
  
  // 双向同步（父子组件双向绑定）
  @Link value: number;
  
  // 观察对象属性变化
  @ObjectLink data: MyData;
}
```

---

## 资源管理

### 资源目录结构

```
resources/
├── base/
│   ├── element/
│   │   ├── color.json       # 颜色资源
│   │   ├── string.json      # 字符串资源
│   │   └── float.json       # 数值资源
│   ├── media/
│   │   ├── icon.png         # 图片资源
│   │   └── background.png
│   └── profile/
│       └── main_pages.json  # 页面配置
├── rawfile/
│   ├── music/               # 音频文件
│   │   ├── song1.mp3
│   │   └── song2.mp3
│   └── lrc/                 # 歌词文件
│       ├── song1.lrc
│       └── song2.lrc
└── sm/                      # sm断点资源
    └── element/
        └── float.json
```

### 使用资源

```typescript
// 字符串资源
Text($r('app.string.title'))

// 颜色资源
.backgroundColor($r('app.color.primary'))

// 数值资源
.fontSize($r('app.float.title_size'))

// 图片资源
Image($r('app.media.icon'))

// 原始文件
const rawFile = getContext().resourceManager.getRawFile('music/song1.mp3');
```

### 资源文件定义

```json
// resources/base/element/color.json
{
  "color": [
    {
      "name": "primary",
      "value": "#007DFF"
    },
    {
      "name": "page_background_sm",
      "value": "#F1F3F5"
    }
  ]
}

// resources/base/element/string.json
{
  "string": [
    {
      "name": "title",
      "value": "音乐播放器"
    }
  ]
}

// resources/base/element/float.json
{
  "float": [
    {
      "name": "title_size",
      "value": "20fp"
    }
  ]
}
```

---

## 调试与测试

### 日志输出

```typescript
import { Logger } from 'mediacommon';

const TAG = 'MyComponent';

// 信息日志
Logger.info(TAG, 'Component initialized');

// 调试日志
Logger.debug(TAG, 'Debug information');

// 警告日志
Logger.warn(TAG, 'Warning message');

// 错误日志
Logger.error(TAG, 'Error occurred');
```

### 断点调试

1. 在代码行号处点击设置断点
2. 点击 **Debug 'phone'** 运行调试
3. 使用调试工具栏控制执行流程

### 查看日志

在 DevEco Studio 底部的 **Log** 面板查看应用日志。

---

## 最佳实践

### 1. 组件拆分

将复杂页面拆分为小组件：

```typescript
// 推荐
@Component
struct ComplexPage {
  build() {
    Column() {
      Header()        // 头部组件
      Content()       // 内容组件
      Footer()        // 底部组件
    }
  }
}

// 不推荐
@Component
struct ComplexPage {
  build() {
    Column() {
      // 所有内容写在一起
    }
  }
}
```

### 2. 使用常量

避免硬编码值：

```typescript
// 推荐
.fontSize($r('app.float.title_size'))
.margin({ left: BreakpointConstants.GUTTER_X })

// 不推荐
.fontSize(20)
.margin({ left: 24 })
```

### 3. 响应式设计

始终考虑多设备适配：

```typescript
// 推荐
.fontSize(this.currentBreakpoint === 'sm' ? 14 : 16)

// 不推荐
.fontSize(14)  // 固定值
```

### 4. 资源释放

及时释放资源：

```typescript
@Component
struct MyComponent {
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();
  
  aboutToAppear() {
    this.breakpointSystem.register();
  }
  
  aboutToDisappear() {
    this.breakpointSystem.unregister();  // 必须注销
  }
}
```

### 5. 错误处理

使用 try-catch 处理可能的错误：

```typescript
try {
  await MediaService.getInstance().play();
} catch (error) {
  Logger.error(TAG, `Play failed: ${error.message}`);
}
```

### 6. 代码注释

为复杂逻辑添加注释：

```typescript
/**
 * 根据当前播放进度更新歌词高亮
 * @param currentTime 当前播放时间（毫秒）
 */
updateLyricHighlight(currentTime: number): void {
  // 二分查找当前歌词索引
  const index = this.binarySearch(this.lyrics, currentTime);
  this.currentLyricIndex = index;
}
```

---

## 常见问题

### Q: 如何添加新的歌曲？

在 `features/musiclist/src/main/ets/viewmodel/SongListData.ets` 中添加：

```typescript
export const songList: SongItem[] = [
  {
    id: 1,
    name: '新歌曲',
    singer: '歌手',
    album: '专辑',
    duration: 180000,
    cover: 'cover.png',
    url: 'song.mp3',
    lrc: 'song.lrc'
  },
  // ...其他歌曲
];
```

### Q: 如何修改断点值？

在 `common/constantscommon/src/main/ets/constants/BreakpointConstants.ets` 中修改：

```typescript
static readonly BREAKPOINT_VALUE: Array<string> = ['320vp', '600vp', '840vp'];
```

### Q: 如何添加新的页面路由？

1. 在 `RouterUrlConstants.ets` 添加路由常量
2. 在 `Index.ets` 的 `PagesMap` 中添加路由映射
3. 创建对应的页面组件

---

## 相关文档

- [项目架构文档](./ARCHITECTURE.md)
- [API参考文档](./API_REFERENCE.md)
- [公共模块文档](../common/README.md)
- [特性模块文档](../features/README.md)
- [产品模块文档](../products/README.md)
