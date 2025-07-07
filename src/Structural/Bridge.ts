/**
 * 桥接模式 (Bridge Pattern)
 * 将抽象部分与实现部分分离，使它们都可以独立地变化
 */

// 实现接口
export interface Implementation {
  operationImplementation(): string;
}

// 具体实现A
export class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

// 具体实现B
export class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform B.";
  }
}

// 抽象类
export class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    return `Abstraction: Base operation with:\n${this.implementation.operationImplementation()}`;
  }
}

// 扩展抽象类
export class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    return `ExtendedAbstraction: Extended operation with:\n${this.implementation.operationImplementation()}`;
  }
}

// 实际应用示例：设备和遥控器
export interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
  printStatus(): void;
}

// 电视设备
export class Television implements Device {
  private on: boolean = false;
  private volume: number = 30;
  private channel: number = 1;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
    console.log("Television is now ON");
  }

  public disable(): void {
    this.on = false;
    console.log("Television is now OFF");
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(percent: number): void {
    this.volume = Math.max(0, Math.min(100, percent));
    console.log(`Television volume set to ${this.volume}%`);
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
    console.log(`Television channel set to ${this.channel}`);
  }

  public printStatus(): void {
    console.log(`Television Status:
      Power: ${this.on ? "ON" : "OFF"}
      Volume: ${this.volume}%
      Channel: ${this.channel}`);
  }
}

// 收音机设备
export class Radio implements Device {
  private on: boolean = false;
  private volume: number = 30;
  private channel: number = 1;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
    console.log("Radio is now ON");
  }

  public disable(): void {
    this.on = false;
    console.log("Radio is now OFF");
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(percent: number): void {
    this.volume = Math.max(0, Math.min(100, percent));
    console.log(`Radio volume set to ${this.volume}%`);
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
    console.log(`Radio station set to ${this.channel}`);
  }

  public printStatus(): void {
    console.log(`Radio Status:
      Power: ${this.on ? "ON" : "OFF"}
      Volume: ${this.volume}%
      Station: ${this.channel}`);
  }
}

// 遥控器抽象类
export class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  public volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  public volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  public channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  public channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

// 高级遥控器
export class AdvancedRemoteControl extends RemoteControl {
  public mute(): void {
    this.device.setVolume(0);
  }

  public setChannel(channel: number): void {
    this.device.setChannel(channel);
  }

  public displayStatus(): void {
    this.device.printStatus();
  }
}

// 形状和颜色桥接示例
export interface Color {
  applyColor(): string;
}

export class RedColor implements Color {
  public applyColor(): string {
    return "red";
  }
}

export class BlueColor implements Color {
  public applyColor(): string {
    return "blue";
  }
}

export class GreenColor implements Color {
  public applyColor(): string {
    return "green";
  }
}

// 抽象形状
export abstract class Shape {
  protected color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public abstract draw(): string;
}

// 具体形状
export class Circle extends Shape {
  public draw(): string {
    return `Drawing a ${this.color.applyColor()} circle`;
  }
}

export class Rectangle extends Shape {
  public draw(): string {
    return `Drawing a ${this.color.applyColor()} rectangle`;
  }
}

export class Triangle extends Shape {
  public draw(): string {
    return `Drawing a ${this.color.applyColor()} triangle`;
  }
}

// 使用示例
export function demonstrateBridge(): void {
  console.log("=== 桥接模式示例 ===");

  // 基本桥接示例
  const implementationA = new ConcreteImplementationA();
  const implementationB = new ConcreteImplementationB();

  const abstraction = new Abstraction(implementationA);
  console.log(abstraction.operation());

  const extendedAbstraction = new ExtendedAbstraction(implementationB);
  console.log(extendedAbstraction.operation());

  // 设备和遥控器示例
  const television = new Television();
  const radio = new Radio();

  const tvRemote = new RemoteControl(television);
  const radioRemote = new AdvancedRemoteControl(radio);

  console.log("\\n--- Television Control ---");
  tvRemote.togglePower();
  tvRemote.volumeUp();
  tvRemote.channelUp();
  television.printStatus();

  console.log("\\n--- Radio Control ---");
  radioRemote.togglePower();
  radioRemote.volumeUp();
  radioRemote.setChannel(105);
  radioRemote.displayStatus();
  radioRemote.mute();

  // 形状和颜色桥接示例
  console.log("\\n--- Shape and Color Bridge ---");
  const redColor = new RedColor();
  const blueColor = new BlueColor();
  const greenColor = new GreenColor();

  const redCircle = new Circle(redColor);
  const blueRectangle = new Rectangle(blueColor);
  const greenTriangle = new Triangle(greenColor);

  console.log(redCircle.draw());
  console.log(blueRectangle.draw());
  console.log(greenTriangle.draw());
}
