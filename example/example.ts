import { ViGEmClient } from '../src';

const client = new ViGEmClient();

client.connect();

const player1 = client.createX360Controller();

player1.connect();
player1.connect();

setTimeout(() => {
  player1.state.buttons = 0x1000 | 0x4000 | 1024;
  player1.state.leftTrigger = 250;

  setTimeout(() => {
    player1.state.buttons = 0;

    player1.disconnect();
    player1.destroy();

    client.disconnect();
    client.destroy();
  }, 5000);
}, 5000);

setInterval(() => {}, 1000);

// player2.connect();
// player1.notifications.on('largeMotor', (value) => {
//   console.log('Large motor:', value);
// });

// setTimeout(() => {
//   const start = setInterval(() => {
//     const buffer = new Uint8Array(12);

//     player1.update(ptr(buffer));
//   }, 5);

//   setTimeout(() => {
//     clearInterval(start);
//     console.log('switch');

//     setInterval(() => {
//       // const buffer = new Uint8Array([
//       //   0x08, 0x00, 0x00, 0x00, 0x7e, 0x73, 0x9a, 0x67, 0xc0, 0x48, 0x6d, 0x76,
//       // ]);
//       // player1.update(ptr(buffer));
//       player1.update(
//         createXUsbReport(0x2000, 240, 0, 15000, 15000, -2000, -6000)
//       );
//     }, 5);
//   }, 2500);
// }, 5000);
