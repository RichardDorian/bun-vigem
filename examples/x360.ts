import { ViGEmClient } from '../src';

const client = new ViGEmClient();

client.connect();

const player1 = client.createX360Controller();

player1.connect();

setTimeout(() => {
  player1.state.buttons = 0x1000 | 0x4000 | 1024;
  player1.state.leftTrigger = 250;

  setInterval(() => {
    player1.state.thumbLX += 25;
    player1.state.thumbLY += 25;
    player1.state.thumbRX += 25;
    player1.state.thumbRY += 25;
  }, 25);

  setTimeout(() => {
    player1.state.buttons = 0;

    player1.disconnect();
    player1.destroy();

    client.disconnect();
    client.destroy();
  }, 5000);
}, 5000);

setInterval(() => {}, 1000);
