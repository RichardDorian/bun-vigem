import { dlopen, FFIType, JSCallback } from 'bun:ffi';
import { join } from 'node:path';

const path = join(__dirname, 'ViGEmClient.dll');

const {
  symbols: {
    vigem_alloc,
    vigem_connect,
    vigem_disconnect,
    vigem_free,
    vigem_target_add,
    vigem_target_ds4_alloc,
    vigem_target_ds4_await_output_report,
    vigem_target_ds4_await_output_report_timeout,
    vigem_target_ds4_get_output,
    vigem_target_x360_register_notification,
    vigem_target_ds4_register_notification,
    vigem_target_ds4_unregister_notification,
    vigem_target_ds4_update,
    vigem_target_ds4_update_ex,
    vigem_target_free,
    vigem_target_get_index,
    vigem_target_get_pid,
    vigem_target_get_type,
    vigem_target_get_vid,
    vigem_target_is_attached,
    vigem_target_is_waitable_add_supported,
    vigem_target_remove,
    vigem_target_set_pid,
    vigem_target_set_vid,
    vigem_target_x360_alloc,
    vigem_target_x360_get_output,
    vigem_target_x360_get_user_index,
    vigem_target_x360_unregister_notification,
    vigem_target_x360_update,
  },
} = dlopen(path, {
  vigem_alloc: {
    args: [],
    returns: FFIType.pointer,
  },
  vigem_free: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  vigem_connect: {
    args: [FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_disconnect: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  vigem_target_is_waitable_add_supported: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  vigem_target_x360_alloc: {
    args: [],
    returns: FFIType.pointer,
  },
  vigem_target_ds4_alloc: {
    args: [],
    returns: FFIType.pointer,
  },
  vigem_target_free: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  vigem_target_add: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  // vigem_target_add_async: {},
  vigem_target_remove: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_x360_register_notification: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_ds4_register_notification: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_x360_unregister_notification: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  vigem_target_ds4_unregister_notification: {
    args: [FFIType.pointer],
    returns: FFIType.void,
  },
  vigem_target_set_vid: {
    args: [FFIType.pointer, FFIType.uint16_t],
    returns: FFIType.void,
  },
  vigem_target_set_pid: {
    args: [FFIType.pointer, FFIType.uint16_t],
    returns: FFIType.void,
  },
  vigem_target_get_vid: {
    args: [FFIType.pointer],
    returns: FFIType.uint16_t,
  },
  vigem_target_get_pid: {
    args: [FFIType.pointer],
    returns: FFIType.uint16_t,
  },
  vigem_target_x360_update: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_ds4_update: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_ds4_update_ex: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_get_index: {
    args: [FFIType.pointer],
    returns: FFIType.uint64_t,
  },
  vigem_target_get_type: {
    args: [FFIType.pointer],
    returns: FFIType.uint8_t,
  },
  vigem_target_is_attached: {
    args: [FFIType.pointer],
    returns: FFIType.bool,
  },
  vigem_target_x360_get_user_index: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_ds4_await_output_report: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_ds4_await_output_report_timeout: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.uint32_t, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_x360_get_output: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
  vigem_target_ds4_get_output: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.pointer],
    returns: FFIType.uint32_t,
  },
});

export {
  vigem_alloc,
  vigem_connect,
  vigem_disconnect,
  vigem_free,
  vigem_target_add,
  vigem_target_ds4_alloc,
  vigem_target_ds4_await_output_report,
  vigem_target_ds4_await_output_report_timeout,
  vigem_target_ds4_get_output,
  vigem_target_ds4_register_notification,
  vigem_target_ds4_unregister_notification,
  vigem_target_ds4_update,
  vigem_target_ds4_update_ex,
  vigem_target_free,
  vigem_target_get_index,
  vigem_target_get_pid,
  vigem_target_get_type,
  vigem_target_get_vid,
  vigem_target_is_attached,
  vigem_target_is_waitable_add_supported,
  vigem_target_remove,
  vigem_target_set_pid,
  vigem_target_set_vid,
  vigem_target_x360_alloc,
  vigem_target_x360_get_output,
  vigem_target_x360_get_user_index,
  vigem_target_x360_register_notification,
  vigem_target_x360_unregister_notification,
  vigem_target_x360_update,
};

export function createX360NotificationCallback(
  fun: (largeMotor: number, smallMotor: number, ledNumber: number) => void
) {
  return new JSCallback(
    (client, target, largeMotor, smallMotor, ledNumber, userData) =>
      fun(largeMotor, smallMotor, ledNumber),
    {
      args: [
        FFIType.pointer,
        FFIType.pointer,
        FFIType.uint8_t,
        FFIType.uint8_t,
        FFIType.uint8_t,
        FFIType.pointer,
      ],
      returns: FFIType.void,
      threadsafe: true,
    }
  );
}
