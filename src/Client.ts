import { type Pointer } from 'bun:ffi';

import { ViGEmError } from './errors';
import {
  vigem_alloc,
  vigem_connect,
  vigem_disconnect,
  vigem_free,
} from './ffi';
import { ViGEmX360Controller } from './targets/X360/Controller';

export default class ViGEmClient {
  public readonly connected: boolean;
  public readonly pointer: Pointer;

  public constructor() {
    this.connected = false;
    const pointer = vigem_alloc();

    if (pointer === 0 || pointer === null) {
      throw new Error('Failed to allocate ViGEm client');
    }

    this.pointer = pointer;
  }

  public connect() {
    const error = vigem_connect(this.pointer);

    switch (error) {
      case ViGEmError.VIGEM_ERROR_NONE:
        Object.defineProperty(this, 'connected', { value: true });
        break;

      case ViGEmError.VIGEM_ERROR_BUS_ALREADY_CONNECTED:
        throw new Error('ViGEm client is already connected to the bus');

      default:
        throw new Error(
          'Failed to connect to ViGEm bus, error code: 0x' + error.toString(16)
        );
    }
  }

  public disconnect() {
    vigem_disconnect(this.pointer);
    Object.defineProperty(this, 'connected', { value: false });
  }

  public destroy() {
    if (this.connected) this.disconnect();

    vigem_free(this.pointer);
    Object.defineProperty(this, 'pointer', { value: null });
  }

  public createX360Controller() {
    return ViGEmX360Controller.create(this);
  }
}
