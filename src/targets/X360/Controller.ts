import { JSCallback, type Pointer } from 'bun:ffi';
import { EventEmitter } from 'node:events';

import type TypedEmitter from 'typed-emitter';

import ViGEmClient from '../../Client';
import { ViGEmError } from '../../errors';
import {
  createX360NotificationCallback,
  vigem_target_x360_alloc,
  vigem_target_x360_register_notification,
  vigem_target_x360_unregister_notification,
  vigem_target_x360_update,
} from '../../ffi';
import { ViGEmTarget } from '../Target';
import { ViGEmX360Report } from './Report';

export type ViGEmX360Notification = {
  largeMotor: number;
  smallMotor: number;
  ledNumber: number;
};

export type ViGEmX360ControllerEvents = {
  [key in keyof ViGEmX360Notification]: (
    value: ViGEmX360Notification[key]
  ) => void | Promise<void>;
};

export class ViGEmX360Controller extends ViGEmTarget {
  public readonly notifications: TypedEmitter<ViGEmX360ControllerEvents>;
  public readonly state: ViGEmX360Report;

  private lastNotification: ViGEmX360Notification;
  private readonly callback: JSCallback;

  private updateInterval: Timer | null = null;

  private constructor(pointer: Pointer, client: ViGEmClient) {
    super(pointer, client);

    this.notifications =
      new EventEmitter() as TypedEmitter<ViGEmX360ControllerEvents>;
    this.state = new ViGEmX360Report();

    this.lastNotification = { largeMotor: 0, smallMotor: 0, ledNumber: 0 };

    this.callback = createX360NotificationCallback(
      (largeMotor, smallMotor, ledNumber) => {
        if (largeMotor !== this.lastNotification.largeMotor) {
          this.notifications.emit('largeMotor', largeMotor);
          this.lastNotification.largeMotor = largeMotor;
        }

        if (smallMotor !== this.lastNotification.smallMotor) {
          this.notifications.emit('smallMotor', smallMotor);
          this.lastNotification.smallMotor = smallMotor;
        }

        if (ledNumber !== this.lastNotification.ledNumber) {
          this.notifications.emit('ledNumber', ledNumber);
          this.lastNotification.ledNumber = ledNumber;
        }
      }
    );
  }

  public connect() {
    super.connect();

    const error = vigem_target_x360_register_notification(
      this.client.pointer,
      this.pointer,
      this.callback.ptr,
      null
    );

    switch (error) {
      case ViGEmError.VIGEM_ERROR_NONE:
        break;

      default:
        throw new Error(
          'Failed to register notification for X360 controller, error code: 0x' +
            error.toString(16)
        );
    }

    this.updateInterval = setInterval(
      () => this.update(),
      1000 / ViGEmX360Controller.pollingRate
    );
  }

  public disconnect(): void {
    if (this.updateInterval !== null) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    super.disconnect();
  }

  public update() {
    const error = vigem_target_x360_update(
      this.client.pointer,
      this.pointer,
      this.state.ptr
    );

    switch (error) {
      case ViGEmError.VIGEM_ERROR_NONE:
        return;

      default:
        throw new Error(
          'Failed to update X360 controller, error code: 0x' +
            error.toString(16)
        );
    }
  }

  public destroy() {
    if (this.isAttached) this.disconnect();

    vigem_target_x360_unregister_notification(this.pointer);
    this.callback.close();

    super.destroy();
  }

  public static create(client: ViGEmClient): ViGEmX360Controller {
    const pointer = vigem_target_x360_alloc();

    if (pointer === 0 || pointer === null) {
      throw new Error('Failed to create X360 controller');
    }

    return new ViGEmX360Controller(pointer, client);
  }

  /** Polling rate of an X360 controller, in hertz */
  public static readonly pollingRate = 125;
}
