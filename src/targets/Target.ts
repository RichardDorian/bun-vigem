import { type Pointer } from 'bun:ffi';

import type ViGEmClient from '../Client';
import { ViGEmError } from '../errors';
import {
  vigem_target_add,
  vigem_target_free,
  vigem_target_get_index,
  vigem_target_get_pid,
  vigem_target_get_type,
  vigem_target_get_vid,
  vigem_target_is_attached,
  vigem_target_remove,
  vigem_target_set_pid,
} from '../ffi';

export abstract class ViGEmTarget {
  private firstConnect = true;

  public constructor(
    protected readonly pointer: Pointer,
    protected readonly client: ViGEmClient
  ) {}

  public get productId() {
    return vigem_target_get_pid(this.pointer);
  }

  public set productId(value: number) {
    vigem_target_set_pid(this.pointer, value);
  }

  public get vendorId() {
    return vigem_target_get_vid(this.pointer);
  }

  public set vendorId(value: number) {
    vigem_target_set_pid(this.pointer, value);
  }

  public get serial() {
    return vigem_target_get_index(this.pointer);
  }

  public get type(): ViGEmTargetType {
    return vigem_target_get_type(this.pointer);
  }

  public get isAttached() {
    return vigem_target_is_attached(this.pointer);
  }

  public connect() {
    const error = vigem_target_add(this.client.pointer, this.pointer);

    console.log(error.toString(16));

    if (
      this.firstConnect &&
      error === ViGEmError.VIGEM_ERROR_ALREADY_CONNECTED
    ) {
      this.firstConnect = false;
      this.connect();
      console.log('second connect');
    }

    switch (error) {
      case ViGEmError.VIGEM_ERROR_NONE:
        break;

      case ViGEmError.VIGEM_ERROR_ALREADY_CONNECTED:
        throw new Error('Controller is already connected to the bus');

      default:
        throw new Error(
          'Failed to add controller to ViGEm client, error code: 0x' +
            error.toString(16)
        );
    }
  }

  public disconnect() {
    const error = vigem_target_remove(this.client.pointer, this.pointer);

    switch (error) {
      case ViGEmError.VIGEM_ERROR_NONE:
        break;

      default:
        throw new Error(
          'Failed to remove controller to ViGEm client, error code: 0x' +
            error.toString(16)
        );
    }
  }

  public destroy() {
    vigem_target_free(this.pointer);
    Object.defineProperty(this, 'pointer', { value: null });
  }
}

export enum ViGEmTargetType {
  XBOX_360_WIRED = 0,
  DUALSHOCK_4_WIRED = 2,
}
