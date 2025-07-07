/**
 * 中介者模式 (Mediator Pattern)
 *
 * 定义：定义一个中介对象来封装一系列对象之间的交互，使原有对象之间的耦合松散，
 * 且可以独立地改变它们之间的交互。
 *
 * 主要角色：
 * 1. Mediator（中介者）：定义中介者的接口，声明与各同事对象的通信方法
 * 2. ConcreteMediator（具体中介者）：实现中介者接口，协调各同事对象的交互
 * 3. Colleague（同事）：定义同事对象的接口，保存中介者对象引用
 * 4. ConcreteColleague（具体同事）：实现同事接口，通过中介者与其他同事交互
 */

// =============================================================================
// 基本中介者实现
// =============================================================================

/**
 * 中介者接口
 */
interface Mediator {
  notify(sender: Component, event: string, data?: any): void;
}

/**
 * 组件基类
 */
abstract class Component {
  protected mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

/**
 * 具体中介者
 */
class ConcreteMediator implements Mediator {
  private componentA: ComponentA;
  private componentB: ComponentB;

  constructor(componentA: ComponentA, componentB: ComponentB) {
    this.componentA = componentA;
    this.componentB = componentB;
    this.componentA.setMediator(this);
    this.componentB.setMediator(this);
  }

  notify(sender: Component, event: string, data?: any): void {
    console.log(`中介者收到事件：${event}，数据：${data}`);

    if (event === "A") {
      console.log("中介者响应A事件，通知B组件进行协调处理");
      // 不直接调用doB()，而是执行协调逻辑
      console.log("中介者：根据A事件，调整B组件的状态");
      this.componentB.reactToA();
    } else if (event === "B") {
      console.log("中介者响应B事件，通知A组件进行协调处理");
      // 不直接调用doA()，而是执行协调逻辑
      console.log("中介者：根据B事件，调整A组件的状态");
      this.componentA.reactToB();
    }
  }
}

/**
 * 具体组件A
 */
class ComponentA extends Component {
  doA(): void {
    console.log("组件A执行操作A");
    this.mediator.notify(this, "A", "A的数据");
  }

  doSomething(): void {
    console.log("组件A执行某些操作");
    this.mediator.notify(this, "A", "特殊数据");
  }

  reactToB(): void {
    console.log("组件A响应B事件，执行相应处理");
  }
}

/**
 * 具体组件B
 */
class ComponentB extends Component {
  doB(): void {
    console.log("组件B执行操作B");
    this.mediator.notify(this, "B", "B的数据");
  }

  doSomethingElse(): void {
    console.log("组件B执行其他操作");
    this.mediator.notify(this, "B", "其他数据");
  }

  reactToA(): void {
    console.log("组件B响应A事件，执行相应处理");
  }
}

// =============================================================================
// 示例1：聊天室中介者
// =============================================================================

/**
 * 聊天室中介者接口
 */
interface ChatMediator {
  sendMessage(message: string, user: User): void;
  addUser(user: User): void;
  removeUser(user: User): void;
}

/**
 * 用户基类
 */
abstract class User {
  protected name: string;
  protected chatMediator: ChatMediator;

  constructor(name: string, chatMediator: ChatMediator) {
    this.name = name;
    this.chatMediator = chatMediator;
  }

  abstract send(message: string): void;
  abstract receive(message: string, from: string): void;

  getName(): string {
    return this.name;
  }
}

/**
 * 聊天室实现
 */
class ChatRoom implements ChatMediator {
  private users: User[] = [];

  sendMessage(message: string, user: User): void {
    console.log(
      `[${new Date().toLocaleTimeString()}] ${user.getName()}: ${message}`
    );

    // 将消息发送给其他用户
    this.users.forEach((u) => {
      if (u !== user) {
        u.receive(message, user.getName());
      }
    });
  }

  addUser(user: User): void {
    this.users.push(user);
    console.log(`${user.getName()} 加入了聊天室`);
  }

  removeUser(user: User): void {
    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
      console.log(`${user.getName()} 离开了聊天室`);
    }
  }
}

/**
 * 具体用户
 */
class ConcreteUser extends User {
  send(message: string): void {
    this.chatMediator.sendMessage(message, this);
  }

  receive(message: string, from: string): void {
    console.log(`  ${this.name} 收到来自 ${from} 的消息: ${message}`);
  }
}

// =============================================================================
// 示例2：飞行控制塔中介者
// =============================================================================

/**
 * 飞行控制塔接口
 */
interface AirTrafficControlTower {
  requestLanding(aircraft: Aircraft): void;
  requestTakeoff(aircraft: Aircraft): void;
  notifyLanding(aircraft: Aircraft): void;
  notifyTakeoff(aircraft: Aircraft): void;
}

/**
 * 飞机基类
 */
abstract class Aircraft {
  protected id: string;
  protected tower: AirTrafficControlTower;

  constructor(id: string, tower: AirTrafficControlTower) {
    this.id = id;
    this.tower = tower;
  }

  getId(): string {
    return this.id;
  }

  abstract requestLanding(): void;
  abstract requestTakeoff(): void;
  abstract land(): void;
  abstract takeoff(): void;
}

/**
 * 飞行控制塔实现
 */
class ConcreteAirTrafficControlTower implements AirTrafficControlTower {
  private runway: Aircraft | null = null;
  private waitingForLanding: Aircraft[] = [];
  private waitingForTakeoff: Aircraft[] = [];

  requestLanding(aircraft: Aircraft): void {
    console.log(`${aircraft.getId()} 请求着陆`);

    if (this.runway === null) {
      this.allowLanding(aircraft);
    } else {
      this.waitingForLanding.push(aircraft);
      console.log(
        `${aircraft.getId()} 等待着陆，当前排队：${
          this.waitingForLanding.length
        }`
      );
    }
  }

  requestTakeoff(aircraft: Aircraft): void {
    console.log(`${aircraft.getId()} 请求起飞`);

    if (this.runway === null) {
      this.allowTakeoff(aircraft);
    } else {
      this.waitingForTakeoff.push(aircraft);
      console.log(
        `${aircraft.getId()} 等待起飞，当前排队：${
          this.waitingForTakeoff.length
        }`
      );
    }
  }

  notifyLanding(aircraft: Aircraft): void {
    console.log(`${aircraft.getId()} 已着陆`);
    this.runway = null;
    this.processNext();
  }

  notifyTakeoff(aircraft: Aircraft): void {
    console.log(`${aircraft.getId()} 已起飞`);
    this.runway = null;
    this.processNext();
  }

  private allowLanding(aircraft: Aircraft): void {
    this.runway = aircraft;
    console.log(`控制塔：${aircraft.getId()} 可以着陆`);
    aircraft.land();
  }

  private allowTakeoff(aircraft: Aircraft): void {
    this.runway = aircraft;
    console.log(`控制塔：${aircraft.getId()} 可以起飞`);
    aircraft.takeoff();
  }

  private processNext(): void {
    // 优先处理着陆请求
    if (this.waitingForLanding.length > 0) {
      const aircraft = this.waitingForLanding.shift()!;
      this.allowLanding(aircraft);
    } else if (this.waitingForTakeoff.length > 0) {
      const aircraft = this.waitingForTakeoff.shift()!;
      this.allowTakeoff(aircraft);
    }
  }
}

/**
 * 具体飞机
 */
class ConcreteAircraft extends Aircraft {
  requestLanding(): void {
    this.tower.requestLanding(this);
  }

  requestTakeoff(): void {
    this.tower.requestTakeoff(this);
  }

  land(): void {
    console.log(`${this.id} 正在着陆...`);
    // 模拟着陆过程
    setTimeout(() => {
      this.tower.notifyLanding(this);
    }, 1000);
  }

  takeoff(): void {
    console.log(`${this.id} 正在起飞...`);
    // 模拟起飞过程
    setTimeout(() => {
      this.tower.notifyTakeoff(this);
    }, 1000);
  }
}

// =============================================================================
// 示例3：智能家居控制中介者
// =============================================================================

/**
 * 智能家居中介者接口
 */
interface SmartHomeMediator {
  notify(sender: SmartDevice, event: string, data?: any): void;
  addDevice(device: SmartDevice): void;
  removeDevice(device: SmartDevice): void;
}

/**
 * 智能设备基类
 */
abstract class SmartDevice {
  protected name: string;
  protected mediator: SmartHomeMediator;
  protected isOn: boolean = false;

  constructor(name: string, mediator: SmartHomeMediator) {
    this.name = name;
    this.mediator = mediator;
  }

  getName(): string {
    return this.name;
  }

  isDeviceOn(): boolean {
    return this.isOn;
  }

  abstract turnOn(): void;
  abstract turnOff(): void;
}

/**
 * 智能家居控制器
 */
class SmartHomeController implements SmartHomeMediator {
  private devices: SmartDevice[] = [];

  notify(sender: SmartDevice, event: string, data?: any): void {
    console.log(`智能家居控制器收到 ${sender.getName()} 的事件: ${event}`);

    switch (event) {
      case "motion_detected":
        this.handleMotionDetected(sender);
        break;
      case "door_opened":
        this.handleDoorOpened(sender);
        break;
      case "temperature_changed":
        this.handleTemperatureChanged(sender, data);
        break;
      case "light_turned_on":
        this.handleLightTurnedOn(sender);
        break;
      case "security_alarm":
        this.handleSecurityAlarm(sender);
        break;
    }
  }

  addDevice(device: SmartDevice): void {
    this.devices.push(device);
    console.log(`添加设备: ${device.getName()}`);
  }

  removeDevice(device: SmartDevice): void {
    const index = this.devices.indexOf(device);
    if (index > -1) {
      this.devices.splice(index, 1);
      console.log(`移除设备: ${device.getName()}`);
    }
  }

  private handleMotionDetected(sender: SmartDevice): void {
    console.log("检测到运动，自动开启相关设备");
    this.getDevicesByType("SmartLight").forEach((light) => {
      if (!light.isDeviceOn()) {
        light.turnOn();
      }
    });
  }

  private handleDoorOpened(sender: SmartDevice): void {
    console.log("门被打开，执行安全检查");
    this.getDevicesByType("SecurityCamera").forEach((camera) => {
      if (!camera.isDeviceOn()) {
        camera.turnOn();
      }
    });
  }

  private handleTemperatureChanged(
    sender: SmartDevice,
    temperature: number
  ): void {
    console.log(`温度变化: ${temperature}°C`);
    if (temperature > 25) {
      this.getDevicesByType("SmartAirConditioner").forEach((ac) => {
        if (!ac.isDeviceOn()) {
          ac.turnOn();
        }
      });
    }
  }

  private handleLightTurnedOn(sender: SmartDevice): void {
    console.log("灯光开启，调节其他设备");
    // 可以实现更复杂的逻辑
  }

  private handleSecurityAlarm(sender: SmartDevice): void {
    console.log("安全警报！启动所有安全设备");
    this.getDevicesByType("SecurityCamera").forEach((camera) =>
      camera.turnOn()
    );
    this.getDevicesByType("SmartAlarm").forEach((alarm) => alarm.turnOn());
  }

  private getDevicesByType(type: string): SmartDevice[] {
    return this.devices.filter((device) => device.constructor.name === type);
  }
}

/**
 * 智能灯光
 */
class SmartLight extends SmartDevice {
  turnOn(): void {
    this.isOn = true;
    console.log(`${this.name} 灯光已开启`);
    this.mediator.notify(this, "light_turned_on");
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`${this.name} 灯光已关闭`);
  }
}

/**
 * 运动传感器
 */
class MotionSensor extends SmartDevice {
  turnOn(): void {
    this.isOn = true;
    console.log(`${this.name} 运动传感器已激活`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`${this.name} 运动传感器已关闭`);
  }

  detectMotion(): void {
    if (this.isOn) {
      console.log(`${this.name} 检测到运动`);
      this.mediator.notify(this, "motion_detected");
    }
  }
}

/**
 * 智能门锁
 */
class SmartDoorLock extends SmartDevice {
  turnOn(): void {
    this.isOn = true;
    console.log(`${this.name} 门锁已激活`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`${this.name} 门锁已关闭`);
  }

  openDoor(): void {
    console.log(`${this.name} 门已打开`);
    this.mediator.notify(this, "door_opened");
  }
}

/**
 * 安全摄像头
 */
class SecurityCamera extends SmartDevice {
  turnOn(): void {
    this.isOn = true;
    console.log(`${this.name} 摄像头开始录制`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`${this.name} 摄像头停止录制`);
  }
}

/**
 * 智能空调
 */
class SmartAirConditioner extends SmartDevice {
  turnOn(): void {
    this.isOn = true;
    console.log(`${this.name} 空调已开启`);
  }

  turnOff(): void {
    this.isOn = false;
    console.log(`${this.name} 空调已关闭`);
  }
}

// =============================================================================
// 演示函数
// =============================================================================

/**
 * 演示中介者模式的使用
 */
export function demonstrateMediatorPattern(): void {
  console.log("=== 中介者模式演示 ===\n");

  // 1. 基本中介者演示
  console.log("1. 基本中介者：");
  const componentA = new ComponentA(null as any);
  const componentB = new ComponentB(null as any);
  const mediator = new ConcreteMediator(componentA, componentB);

  componentA.doA();
  console.log("---");
  componentB.doSomethingElse();

  // 2. 聊天室演示
  console.log("\n2. 聊天室中介者：");
  const chatRoom = new ChatRoom();
  const user1 = new ConcreteUser("Alice", chatRoom);
  const user2 = new ConcreteUser("Bob", chatRoom);
  const user3 = new ConcreteUser("Charlie", chatRoom);

  chatRoom.addUser(user1);
  chatRoom.addUser(user2);
  chatRoom.addUser(user3);

  user1.send("大家好！");
  user2.send("你好 Alice！");
  user3.send("嗨，大家好！");

  // 3. 飞行控制塔演示
  console.log("\n3. 飞行控制塔中介者：");
  const tower = new ConcreteAirTrafficControlTower();
  const aircraft1 = new ConcreteAircraft("CA001", tower);
  const aircraft2 = new ConcreteAircraft("MU002", tower);
  const aircraft3 = new ConcreteAircraft("CZ003", tower);

  aircraft1.requestLanding();
  aircraft2.requestTakeoff();
  aircraft3.requestLanding();

  // 4. 智能家居演示
  console.log("\n4. 智能家居中介者：");
  const homeController = new SmartHomeController();

  const livingRoomLight = new SmartLight("客厅灯", homeController);
  const motionSensor = new MotionSensor("运动传感器", homeController);
  const doorLock = new SmartDoorLock("智能门锁", homeController);
  const securityCamera = new SecurityCamera("安全摄像头", homeController);
  const airConditioner = new SmartAirConditioner("空调", homeController);

  homeController.addDevice(livingRoomLight);
  homeController.addDevice(motionSensor);
  homeController.addDevice(doorLock);
  homeController.addDevice(securityCamera);
  homeController.addDevice(airConditioner);

  console.log("\n启动运动传感器...");
  motionSensor.turnOn();
  motionSensor.detectMotion();

  console.log("\n开门...");
  doorLock.openDoor();

  console.log("\n=== 中介者模式演示完成 ===");
}

// 导出所有类和接口
export {
  Mediator,
  Component,
  ConcreteMediator,
  ComponentA,
  ComponentB,
  ChatMediator,
  User,
  ChatRoom,
  ConcreteUser,
  AirTrafficControlTower,
  Aircraft,
  ConcreteAirTrafficControlTower,
  ConcreteAircraft,
  SmartHomeMediator,
  SmartDevice,
  SmartHomeController,
  SmartLight,
  MotionSensor,
  SmartDoorLock,
  SecurityCamera,
  SmartAirConditioner,
};
