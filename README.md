# bun-vigem

A ViGEm client made using Bun's FFI module.

## Getting Started

```bash
bun add https://github.com/RichardDorian/bun-vigem
```

## Xbox 360 Controller

## State updates

The library automatically sends a state update to the ViGEm driver at the Xbox 360 controller's update rate (125Hz) (around every 8ms).

### Example

Error handling is omitted for brevity.

```ts
import { ViGEmClient } from 'bun-vigem';

const client = new ViGEmClient();
const controller = client.createX360Controller();
controller.connect();

controller.state.buttons = 0x1000 | 0x4000;
controller.state.thumbLX = 32766 / 2;
```
