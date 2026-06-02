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

import { MediaService } from './MediaService';
import { Logger } from './Logger';

const TAG = 'SleepTimerService';

// 预设的定时器选项（分钟）
export const SLEEP_TIMER_OPTIONS: number[] = [15, 30, 45, 60];

export class SleepTimerService {
  private static instance: SleepTimerService | undefined = undefined;
  private timerId: number = 0;
  private remainingSeconds: number = 0;
  private totalSeconds: number = 0;
  private isActive: boolean = false;

  private constructor() {
    // 初始化 AppStorage 中的状态
    AppStorage.setOrCreate<boolean>('sleepTimerActive', false);
    AppStorage.setOrCreate<number>('sleepTimerRemainingSeconds', 0);
    AppStorage.setOrCreate<string>('sleepTimerDisplayTime', '');
  }

  public static getInstance(): SleepTimerService {
    if (!SleepTimerService.instance) {
      SleepTimerService.instance = new SleepTimerService();
    }
    return SleepTimerService.instance;
  }

  /**
   * 启动睡眠定时器
   * @param minutes 定时分钟数
   */
  public startTimer(minutes: number): void {
    // 如果已有定时器在运行，先停止
    this.stopTimer();

    this.totalSeconds = minutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.isActive = true;

    // 更新状态
    AppStorage.setOrCreate<boolean>('sleepTimerActive', true);
    AppStorage.setOrCreate<number>('sleepTimerRemainingSeconds', this.remainingSeconds);
    this.updateDisplayTime();

    Logger.info(TAG, `Sleep timer started: ${minutes} minutes`);

    // 启动定时器，每秒更新一次
    this.timerId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  /**
   * 停止睡眠定时器
   */
  public stopTimer(): void {
    if (this.timerId !== 0) {
      clearInterval(this.timerId);
      this.timerId = 0;
    }

    this.remainingSeconds = 0;
    this.totalSeconds = 0;
    this.isActive = false;

    // 更新状态
    AppStorage.setOrCreate<boolean>('sleepTimerActive', false);
    AppStorage.setOrCreate<number>('sleepTimerRemainingSeconds', 0);
    AppStorage.setOrCreate<string>('sleepTimerDisplayTime', '');

    Logger.info(TAG, 'Sleep timer stopped');
  }

  /**
   * 定时器滴答，每秒调用一次
   */
  private tick(): void {
    this.remainingSeconds--;

    if (this.remainingSeconds <= 0) {
      // 时间到，停止播放
      this.onTimerComplete();
    } else {
      // 更新剩余时间
      AppStorage.setOrCreate<number>('sleepTimerRemainingSeconds', this.remainingSeconds);
      this.updateDisplayTime();
    }
  }

  /**
   * 定时器完成，暂停播放
   */
  private onTimerComplete(): void {
    Logger.info(TAG, 'Sleep timer completed, pausing music');
    this.stopTimer();
    MediaService.getInstance().pause();
  }

  /**
   * 更新显示时间（格式：MM:SS）
   */
  private updateDisplayTime(): void {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    AppStorage.setOrCreate<string>('sleepTimerDisplayTime', displayTime);
  }

  /**
   * 获取定时器是否激活
   */
  public getIsActive(): boolean {
    return this.isActive;
  }

  /**
   * 获取剩余秒数
   */
  public getRemainingSeconds(): number {
    return this.remainingSeconds;
  }

  /**
   * 获取格式化的剩余时间
   */
  public getDisplayTime(): string {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
