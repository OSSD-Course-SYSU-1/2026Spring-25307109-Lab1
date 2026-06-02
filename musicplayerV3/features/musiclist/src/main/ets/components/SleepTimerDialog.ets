/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SleepTimerService, SLEEP_TIMER_OPTIONS, BreakpointType } from 'mediacommon';
import { BreakpointConstants } from 'constantscommon';

@CustomDialog
export struct SleepTimerDialog {
  controller: CustomDialogController;
  @StorageLink('sleepTimerActive') sleepTimerActive: boolean = false;
  @StorageLink('sleepTimerDisplayTime') sleepTimerDisplayTime: string = '';
  @StorageProp('currentBreakpoint') currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;

  build() {
    Column() {
      // 标题 - 响应式字体大小
      Text('睡眠定时器')
        .fontSize(new BreakpointType({
          sm: 20,
          md: 22,
          lg: 24
        }).getValue(this.currentBreakpoint))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.song_name'))
        .margin({ top: 20, bottom: 16 })

      // 如果定时器已激活，显示当前倒计时
      if (this.sleepTimerActive) {
        Column() {
          Text('定时器运行中')
            .fontSize(new BreakpointType({
              sm: 14,
              md: 16,
              lg: 18
            }).getValue(this.currentBreakpoint))
            .fontColor($r('app.color.singer'))
            .margin({ bottom: 8 })
          
          Text(this.sleepTimerDisplayTime)
            .fontSize(new BreakpointType({
              sm: 36,
              md: 42,
              lg: 48
            }).getValue(this.currentBreakpoint))
            .fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.song_name'))
            .margin({ bottom: 16 })

          // 取消按钮
          Button('取消定时器')
            .width(new BreakpointType({
              sm: '80%',
              md: '60%',
              lg: '50%'
            }).getValue(this.currentBreakpoint))
            .height(new BreakpointType({
              sm: 40,
              md: 44,
              lg: 48
            }).getValue(this.currentBreakpoint))
            .fontSize(new BreakpointType({
              sm: 16,
              md: 18,
              lg: 20
            }).getValue(this.currentBreakpoint))
            .fontColor(Color.White)
            .backgroundColor('#376668')
            .borderRadius(20)
            .onClick(() => {
              SleepTimerService.getInstance().stopTimer();
              this.controller.close();
            })
        }
        .width('100%')
        .padding({ bottom: 20 })
      } else {
        // 时间选项列表 - 大屏使用网格布局
        if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG) {
          // 大屏：2x2 网格布局
          Grid() {
            ForEach(SLEEP_TIMER_OPTIONS, (minutes: number) => {
              GridItem() {
                this.TimerOptionItemGrid(minutes)
              }
            }, (minutes: number) => minutes.toString())
          }
          .columnsTemplate('1fr 1fr')
          .rowsTemplate('1fr 1fr')
          .width('100%')
          .height(140)
          .columnsGap(12)
          .rowsGap(12)
          .padding({ bottom: 20 })
        } else {
          // 小屏/中屏：列表布局
          Column() {
            ForEach(SLEEP_TIMER_OPTIONS, (minutes: number) => {
              this.TimerOptionItem(minutes)
            }, (minutes: number) => minutes.toString())
          }
          .width('100%')
          .padding({ bottom: 20 })
        }
      }
    }
    .width(new BreakpointType({
      sm: '80%',
      md: '60%',
      lg: '40%'
    }).getValue(this.currentBreakpoint))
    .backgroundColor($r('app.color.page_background_sm'))
    .borderRadius(16)
    .padding({ left: 16, right: 16 })
  }

  @Builder
  TimerOptionItem(minutes: number) {
    Row() {
      Text(`${minutes} 分钟后停止播放`)
        .fontSize(new BreakpointType({
          sm: 16,
          md: 18,
          lg: 20
        }).getValue(this.currentBreakpoint))
        .fontColor($r('app.color.song_name'))
    }
    .width('100%')
    .height(new BreakpointType({
      sm: 50,
      md: 56,
      lg: 60
    }).getValue(this.currentBreakpoint))
    .justifyContent(FlexAlign.Center)
    .borderRadius(8)
    .backgroundColor($r('app.color.slider_track'))
    .margin({ top: 8, bottom: 4 })
    .onClick(() => {
      SleepTimerService.getInstance().startTimer(minutes);
      this.controller.close();
    })
  }

  @Builder
  TimerOptionItemGrid(minutes: number) {
    Column() {
      Text(`${minutes}`)
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.song_name'))
      Text('分钟')
        .fontSize(14)
        .fontColor($r('app.color.singer'))
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .borderRadius(12)
    .backgroundColor($r('app.color.slider_track'))
    .onClick(() => {
      SleepTimerService.getInstance().startTimer(minutes);
      this.controller.close();
    })
  }
}
