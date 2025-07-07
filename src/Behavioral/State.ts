/**
 * 状态模式 (State Pattern)
 * 允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类
 */

// 状态接口
export interface State {
  handle(context: Context): void;
}

// 上下文
export class Context {
  private state: State = new ConcreteStateA();

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${state.constructor.name}`);
    this.state = state;
  }

  public request(): void {
    this.state.handle(this);
  }
}

// 具体状态A
export class ConcreteStateA implements State {
  public handle(context: Context): void {
    console.log("ConcreteStateA handles request");
    console.log("ConcreteStateA wants to change the state of the context");
    context.transitionTo(new ConcreteStateB());
  }
}

// 具体状态B
export class ConcreteStateB implements State {
  public handle(context: Context): void {
    console.log("ConcreteStateB handles request");
    console.log("ConcreteStateB wants to change the state of the context");
    context.transitionTo(new ConcreteStateA());
  }
}

// 实际应用示例：媒体播放器
export interface MediaPlayerState {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
}

export class MediaPlayer {
  private state: MediaPlayerState;
  private currentTrack: string = "";

  constructor() {
    this.state = new StoppedState();
  }

  public setState(state: MediaPlayerState): void {
    console.log(`Player: Changing state to ${state.constructor.name}`);
    this.state = state;
  }

  public getState(): MediaPlayerState {
    return this.state;
  }

  public setTrack(track: string): void {
    this.currentTrack = track;
    console.log(`Player: Loaded track "${track}"`);
  }

  public getCurrentTrack(): string {
    return this.currentTrack;
  }

  public play(): void {
    this.state.play(this);
  }

  public pause(): void {
    this.state.pause(this);
  }

  public stop(): void {
    this.state.stop(this);
  }
}

export class PlayingState implements MediaPlayerState {
  public play(player: MediaPlayer): void {
    console.log("Already playing");
  }

  public pause(player: MediaPlayer): void {
    console.log(`Pausing "${player.getCurrentTrack()}"`);
    player.setState(new PausedState());
  }

  public stop(player: MediaPlayer): void {
    console.log(`Stopping "${player.getCurrentTrack()}"`);
    player.setState(new StoppedState());
  }
}

export class PausedState implements MediaPlayerState {
  public play(player: MediaPlayer): void {
    console.log(`Resuming "${player.getCurrentTrack()}"`);
    player.setState(new PlayingState());
  }

  public pause(player: MediaPlayer): void {
    console.log("Already paused");
  }

  public stop(player: MediaPlayer): void {
    console.log(`Stopping "${player.getCurrentTrack()}"`);
    player.setState(new StoppedState());
  }
}

export class StoppedState implements MediaPlayerState {
  public play(player: MediaPlayer): void {
    if (player.getCurrentTrack()) {
      console.log(`Starting to play "${player.getCurrentTrack()}"`);
      player.setState(new PlayingState());
    } else {
      console.log("No track loaded");
    }
  }

  public pause(player: MediaPlayer): void {
    console.log("Cannot pause when stopped");
  }

  public stop(player: MediaPlayer): void {
    console.log("Already stopped");
  }
}

// 交通灯示例
export interface TrafficLightState {
  change(light: TrafficLight): void;
  getColor(): string;
  getDuration(): number;
}

export class TrafficLight {
  private state: TrafficLightState;

  constructor() {
    this.state = new RedState();
  }

  public setState(state: TrafficLightState): void {
    this.state = state;
    console.log(
      `Traffic Light: Changed to ${this.state.getColor()} (${this.state.getDuration()}s)`
    );
  }

  public change(): void {
    this.state.change(this);
  }

  public getStatus(): string {
    return `Current: ${this.state.getColor()}, Duration: ${this.state.getDuration()}s`;
  }
}

export class RedState implements TrafficLightState {
  public change(light: TrafficLight): void {
    light.setState(new GreenState());
  }

  public getColor(): string {
    return "Red";
  }

  public getDuration(): number {
    return 30;
  }
}

export class YellowState implements TrafficLightState {
  public change(light: TrafficLight): void {
    light.setState(new RedState());
  }

  public getColor(): string {
    return "Yellow";
  }

  public getDuration(): number {
    return 5;
  }
}

export class GreenState implements TrafficLightState {
  public change(light: TrafficLight): void {
    light.setState(new YellowState());
  }

  public getColor(): string {
    return "Green";
  }

  public getDuration(): number {
    return 25;
  }
}

// 订单状态示例
export interface OrderState {
  pay(order: Order): void;
  ship(order: Order): void;
  deliver(order: Order): void;
  cancel(order: Order): void;
  getStatus(): string;
}

export class Order {
  private state: OrderState;
  private orderId: string;
  private items: string[] = [];

  constructor(orderId: string) {
    this.orderId = orderId;
    this.state = new PendingState();
  }

  public setState(state: OrderState): void {
    console.log(
      `Order ${this.orderId}: Status changed to ${state.getStatus()}`
    );
    this.state = state;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getItems(): string[] {
    return [...this.items];
  }

  public getOrderId(): string {
    return this.orderId;
  }

  public pay(): void {
    this.state.pay(this);
  }

  public ship(): void {
    this.state.ship(this);
  }

  public deliver(): void {
    this.state.deliver(this);
  }

  public cancel(): void {
    this.state.cancel(this);
  }

  public getStatus(): string {
    return this.state.getStatus();
  }
}

export class PendingState implements OrderState {
  public pay(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Payment processed`);
    order.setState(new PaidState());
  }

  public ship(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot ship unpaid order`);
  }

  public deliver(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot deliver unpaid order`);
  }

  public cancel(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Order cancelled`);
    order.setState(new CancelledState());
  }

  public getStatus(): string {
    return "Pending Payment";
  }
}

export class PaidState implements OrderState {
  public pay(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Already paid`);
  }

  public ship(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Order shipped`);
    order.setState(new ShippedState());
  }

  public deliver(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot deliver unshipped order`);
  }

  public cancel(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Processing refund...`);
    order.setState(new CancelledState());
  }

  public getStatus(): string {
    return "Paid";
  }
}

export class ShippedState implements OrderState {
  public pay(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Already paid`);
  }

  public ship(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Already shipped`);
  }

  public deliver(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Order delivered`);
    order.setState(new DeliveredState());
  }

  public cancel(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot cancel shipped order`);
  }

  public getStatus(): string {
    return "Shipped";
  }
}

export class DeliveredState implements OrderState {
  public pay(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Already paid`);
  }

  public ship(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Already shipped`);
  }

  public deliver(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Already delivered`);
  }

  public cancel(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot cancel delivered order`);
  }

  public getStatus(): string {
    return "Delivered";
  }
}

export class CancelledState implements OrderState {
  public pay(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot pay cancelled order`);
  }

  public ship(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot ship cancelled order`);
  }

  public deliver(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Cannot deliver cancelled order`);
  }

  public cancel(order: Order): void {
    console.log(`Order ${order.getOrderId()}: Already cancelled`);
  }

  public getStatus(): string {
    return "Cancelled";
  }
}

// 门状态示例
export interface DoorState {
  open(door: Door): void;
  close(door: Door): void;
  lock(door: Door): void;
  unlock(door: Door): void;
  getStatus(): string;
}

export class Door {
  private state: DoorState;

  constructor() {
    this.state = new ClosedState();
  }

  public setState(state: DoorState): void {
    console.log(`Door: State changed to ${state.getStatus()}`);
    this.state = state;
  }

  public open(): void {
    this.state.open(this);
  }

  public close(): void {
    this.state.close(this);
  }

  public lock(): void {
    this.state.lock(this);
  }

  public unlock(): void {
    this.state.unlock(this);
  }

  public getStatus(): string {
    return this.state.getStatus();
  }
}

export class OpenState implements DoorState {
  public open(door: Door): void {
    console.log("Door is already open");
  }

  public close(door: Door): void {
    console.log("Closing the door");
    door.setState(new ClosedState());
  }

  public lock(door: Door): void {
    console.log("Cannot lock an open door");
  }

  public unlock(door: Door): void {
    console.log("Door is open, no need to unlock");
  }

  public getStatus(): string {
    return "Open";
  }
}

export class ClosedState implements DoorState {
  public open(door: Door): void {
    console.log("Opening the door");
    door.setState(new OpenState());
  }

  public close(door: Door): void {
    console.log("Door is already closed");
  }

  public lock(door: Door): void {
    console.log("Locking the door");
    door.setState(new LockedState());
  }

  public unlock(door: Door): void {
    console.log("Door is not locked");
  }

  public getStatus(): string {
    return "Closed";
  }
}

export class LockedState implements DoorState {
  public open(door: Door): void {
    console.log("Cannot open a locked door");
  }

  public close(door: Door): void {
    console.log("Door is already closed and locked");
  }

  public lock(door: Door): void {
    console.log("Door is already locked");
  }

  public unlock(door: Door): void {
    console.log("Unlocking the door");
    door.setState(new ClosedState());
  }

  public getStatus(): string {
    return "Locked";
  }
}

// 使用示例
export function demonstrateState(): void {
  console.log("=== 状态模式示例 ===");

  // 基本状态示例
  const context = new Context(new ConcreteStateA());
  context.request();
  context.request();

  // 媒体播放器示例
  console.log("\n--- 媒体播放器示例 ---");
  const player = new MediaPlayer();
  player.setTrack("Song 1.mp3");

  console.log("Trying to play:");
  player.play();

  console.log("Trying to pause:");
  player.pause();

  console.log("Trying to play again:");
  player.play();

  console.log("Trying to stop:");
  player.stop();

  console.log("Trying to pause when stopped:");
  player.pause();

  // 交通灯示例
  console.log("\n--- 交通灯示例 ---");
  const trafficLight = new TrafficLight();

  for (let i = 0; i < 6; i++) {
    console.log(`Step ${i + 1}: ${trafficLight.getStatus()}`);
    trafficLight.change();
  }

  // 订单状态示例
  console.log("\n--- 订单状态示例 ---");
  const order1 = new Order("ORD-001");
  order1.addItem("Laptop");
  order1.addItem("Mouse");

  console.log(`Initial status: ${order1.getStatus()}`);

  order1.pay();
  order1.ship();
  order1.deliver();

  // 尝试取消已交付的订单
  order1.cancel();

  // 另一个订单取消示例
  console.log("\n--- 订单取消示例 ---");
  const order2 = new Order("ORD-002");
  order2.addItem("Keyboard");

  order2.pay();
  console.log(`Status: ${order2.getStatus()}`);
  order2.cancel();
  console.log(`Final status: ${order2.getStatus()}`);

  // 门状态示例
  console.log("\n--- 门状态示例 ---");
  const door = new Door();

  console.log(`Initial status: ${door.getStatus()}`);

  door.open();
  door.lock(); // 应该失败
  door.close();
  door.lock();
  door.open(); // 应该失败
  door.unlock();
  door.open();

  console.log(`Final status: ${door.getStatus()}`);
}
