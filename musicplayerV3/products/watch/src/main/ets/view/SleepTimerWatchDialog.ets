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
export struct SleepTimerWatchDialog {
  controller: CustomDialogController;
  @StorageLink('sleepTimerActive') sleepTimerActive: boolean = false;
  @StorageLink('sleepTimerDisplayTime') sleepTimerDisplayTime: string = '';

  build() {
    Column() {
      // 标题
      Text('睡眠定时器')
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor(Color.White)
        .margin({ top: 16, bottom: 12 })

      // 如果定时器已激活，显示当前倒计时
      if (this.sleepTimerActive) {
        Column() {
          Text(this.sleepTimerDisplayTime)
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .margin({ bottom: 12 })

          // 取消按钮
          Button('取消')
            .width('60%')
            .height(32)
            .fontSize(14)
            .fontColor(Color.White)
            .backgroundColor('#376668')
            .borderRadius(16)
            .onClick(() => {
              SleepTimerService.getInstance().stopTimer();
              this.controller.close();
            })
        }
        .width('100%')
        .padding({ bottom: 16 })
      } else {
        // 时间选项列表 - 简化为2列布局
        Grid() {
          ForEach(SLEEP_TIMER_OPTIONS, (minutes: number) => {
            GridItem() {
              Column() {
                Text(`${minutes}`)
                  .fontSize(20)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(Color.White)
                Text('分钟')
                  .fontSize(10)
                  .fontColor(Color.White)
              }
              .width('100%')
              .height('100%')
              .justifyContent(FlexAlign.Center)
              .borderRadius(8)
              .backgroundColor('rgba(255,255,255,0.2)')
              .onClick(() => {
                SleepTimerService.getInstance().startTimer(minutes);
                this.controller.close();
              })
            }
          }, (minutes: number) => minutes.toString())
        }
        .columnsTemplate('1fr 1fr')
        .rowsTemplate('1fr 1fr')
        .width('90%')
        .height(100)
        .columnsGap(8)
        .rowsGap(8)
        .padding({ bottom: 16 })
      }
    }
    .width('85%')
    .backgroundColor('rgba(0,0,0,0.85)')
    .borderRadius(16)
    .padding({ left: 12, right: 12 })
  }
}
