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

import { SleepTimerService, SLEEP_TIMER_OPTIONS } from 'mediacommon';

@CustomDialog
export struct SleepTimerDialog {
  controller: CustomDialogController;
  @StorageLink('sleepTimerActive') sleepTimerActive: boolean = false;
  @StorageLink('sleepTimerDisplayTime') sleepTimerDisplayTime: string = '';

  build() {
    Column() {
      // 标题
      Text('睡眠定时器')
        .fontSize(20)
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.song_name'))
        .margin({ top: 20, bottom: 16 })

      // 如果定时器已激活，显示当前倒计时
      if (this.sleepTimerActive) {
        Column() {
          Text('定时器运行中')
            .fontSize(14)
            .fontColor($r('app.color.singer'))
            .margin({ bottom: 8 })
          
          Text(this.sleepTimerDisplayTime)
            .fontSize(36)
            .fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.song_name'))
            .margin({ bottom: 16 })

          // 取消按钮
          Button('取消定时器')
            .width('80%')
            .height(40)
            .fontSize(16)
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
        // 时间选项列表
        Column() {
          ForEach(SLEEP_TIMER_OPTIONS, (minutes: number) => {
            this.TimerOptionItem(minutes)
          }, (minutes: number) => minutes.toString())
        }
        .width('100%')
        .padding({ bottom: 20 })
      }
    }
    .width('80%')
    .backgroundColor($r('app.color.page_background_sm'))
    .borderRadius(16)
    .padding({ left: 16, right: 16 })
  }

  @Builder
  TimerOptionItem(minutes: number) {
    Row() {
      Text(`${minutes} 分钟后停止播放`)
        .fontSize(16)
        .fontColor($r('app.color.song_name'))
    }
    .width('100%')
    .height(50)
    .justifyContent(FlexAlign.Center)
    .borderRadius(8)
    .backgroundColor($r('app.color.slider_track'))
    .margin({ top: 8, bottom: 4 })
    .onClick(() => {
      SleepTimerService.getInstance().startTimer(minutes);
      this.controller.close();
    })
  }
}
