import { ptr, type Pointer } from 'bun:ffi';

export class ViGEmX360Report {
  private readonly view: DataView;

  public constructor() {
    const buffer = new ArrayBuffer(12);
    this.view = new DataView(buffer);

    this.view.buffer;
  }

  public get buttons(): number {
    return this.view.getUint16(ViGEmX360Report.offsets.buttons, true);
  }

  public set buttons(value: number) {
    this.view.setUint16(ViGEmX360Report.offsets.buttons, value, true);
  }

  public get leftTrigger(): number {
    return this.view.getUint8(ViGEmX360Report.offsets.leftTrigger);
  }

  public set leftTrigger(value: number) {
    this.view.setUint8(ViGEmX360Report.offsets.leftTrigger, value);
  }

  public get rightTrigger(): number {
    return this.view.getUint8(ViGEmX360Report.offsets.rightTrigger);
  }

  public set rightTrigger(value: number) {
    this.view.setUint8(ViGEmX360Report.offsets.rightTrigger, value);
  }

  public get thumbLX(): number {
    return this.view.getInt16(ViGEmX360Report.offsets.thumbLX, true);
  }

  public set thumbLX(value: number) {
    this.view.setInt16(ViGEmX360Report.offsets.thumbLX, value, true);
  }

  public get thumbLY(): number {
    return this.view.getInt16(ViGEmX360Report.offsets.thumbLY, true);
  }

  public set thumbLY(value: number) {
    this.view.setInt16(ViGEmX360Report.offsets.thumbLY, value, true);
  }

  public get thumbRX(): number {
    return this.view.getInt16(ViGEmX360Report.offsets.thumbRX, true);
  }

  public set thumbRX(value: number) {
    this.view.setInt16(ViGEmX360Report.offsets.thumbRX, value, true);
  }

  public get thumbRY(): number {
    return this.view.getInt16(ViGEmX360Report.offsets.thumbRY, true);
  }

  public set thumbRY(value: number) {
    this.view.setInt16(ViGEmX360Report.offsets.thumbRY, value, true);
  }

  public get ptr(): Pointer {
    return ptr(this.view.buffer);
  }

  private static offsets = {
    buttons: 0,
    leftTrigger: 2,
    rightTrigger: 3,
    thumbLX: 4,
    thumbLY: 6,
    thumbRX: 8,
    thumbRY: 10,
  };
}
