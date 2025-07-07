/**
 * 装饰器模式 (Decorator Pattern)
 * 允许向一个现有的对象添加新的功能，同时又不改变其结构
 */

// 组件接口
export interface Component {
  operation(): string;
}

// 具体组件
export class ConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

// 基础装饰器
export class BaseDecorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}

// 具体装饰器A
export class ConcreteDecoratorA extends BaseDecorator {
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

// 具体装饰器B
export class ConcreteDecoratorB extends BaseDecorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

// 实际应用示例：咖啡装饰器
export interface Coffee {
  cost(): number;
  description(): string;
}

// 基础咖啡
export class SimpleCoffee implements Coffee {
  public cost(): number {
    return 10;
  }

  public description(): string {
    return "Simple coffee";
  }
}

// 咖啡装饰器基类
export abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  public cost(): number {
    return this.coffee.cost();
  }

  public description(): string {
    return this.coffee.description();
  }
}

// 牛奶装饰器
export class MilkDecorator extends CoffeeDecorator {
  public cost(): number {
    return this.coffee.cost() + 2;
  }

  public description(): string {
    return this.coffee.description() + ", milk";
  }
}

// 糖装饰器
export class SugarDecorator extends CoffeeDecorator {
  public cost(): number {
    return this.coffee.cost() + 1;
  }

  public description(): string {
    return this.coffee.description() + ", sugar";
  }
}

// 香草装饰器
export class VanillaDecorator extends CoffeeDecorator {
  public cost(): number {
    return this.coffee.cost() + 3;
  }

  public description(): string {
    return this.coffee.description() + ", vanilla";
  }
}

// 巧克力装饰器
export class ChocolateDecorator extends CoffeeDecorator {
  public cost(): number {
    return this.coffee.cost() + 5;
  }

  public description(): string {
    return this.coffee.description() + ", chocolate";
  }
}

// 文本装饰器示例
export interface TextComponent {
  format(): string;
}

export class PlainText implements TextComponent {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public format(): string {
    return this.text;
  }
}

export abstract class TextDecorator implements TextComponent {
  protected component: TextComponent;

  constructor(component: TextComponent) {
    this.component = component;
  }

  public format(): string {
    return this.component.format();
  }
}

export class BoldDecorator extends TextDecorator {
  public format(): string {
    return `<b>${this.component.format()}</b>`;
  }
}

export class ItalicDecorator extends TextDecorator {
  public format(): string {
    return `<i>${this.component.format()}</i>`;
  }
}

export class UnderlineDecorator extends TextDecorator {
  public format(): string {
    return `<u>${this.component.format()}</u>`;
  }
}

export class ColorDecorator extends TextDecorator {
  private color: string;

  constructor(component: TextComponent, color: string) {
    super(component);
    this.color = color;
  }

  public format(): string {
    return `<span style="color: ${
      this.color
    }">${this.component.format()}</span>`;
  }
}

// 通知装饰器示例
export interface Notification {
  send(message: string): void;
}

export class EmailNotification implements Notification {
  public send(message: string): void {
    console.log(`Email: ${message}`);
  }
}

export abstract class NotificationDecorator implements Notification {
  protected notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  public send(message: string): void {
    this.notification.send(message);
  }
}

export class SMSDecorator extends NotificationDecorator {
  public send(message: string): void {
    super.send(message);
    console.log(`SMS: ${message}`);
  }
}

export class SlackDecorator extends NotificationDecorator {
  public send(message: string): void {
    super.send(message);
    console.log(`Slack: ${message}`);
  }
}

export class FacebookDecorator extends NotificationDecorator {
  public send(message: string): void {
    super.send(message);
    console.log(`Facebook: ${message}`);
  }
}

// 数据源装饰器示例
export interface DataSource {
  writeData(data: string): void;
  readData(): string;
}

export class FileDataSource implements DataSource {
  private filename: string;
  private data: string = "";

  constructor(filename: string) {
    this.filename = filename;
  }

  public writeData(data: string): void {
    this.data = data;
    console.log(`Writing data to file: ${this.filename}`);
  }

  public readData(): string {
    console.log(`Reading data from file: ${this.filename}`);
    return this.data;
  }
}

export class DataSourceDecorator implements DataSource {
  protected dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public writeData(data: string): void {
    this.dataSource.writeData(data);
  }

  public readData(): string {
    return this.dataSource.readData();
  }
}

export class EncryptionDecorator extends DataSourceDecorator {
  public writeData(data: string): void {
    const encryptedData = this.encrypt(data);
    console.log("Encrypting data...");
    super.writeData(encryptedData);
  }

  public readData(): string {
    const data = super.readData();
    console.log("Decrypting data...");
    return this.decrypt(data);
  }

  private encrypt(data: string): string {
    // 简单的加密模拟
    return btoa(data);
  }

  private decrypt(data: string): string {
    // 简单的解密模拟
    try {
      return atob(data);
    } catch {
      return data;
    }
  }
}

export class CompressionDecorator extends DataSourceDecorator {
  public writeData(data: string): void {
    const compressedData = this.compress(data);
    console.log("Compressing data...");
    super.writeData(compressedData);
  }

  public readData(): string {
    const data = super.readData();
    console.log("Decompressing data...");
    return this.decompress(data);
  }

  private compress(data: string): string {
    // 简单的压缩模拟
    return `COMPRESSED[${data}]`;
  }

  private decompress(data: string): string {
    // 简单的解压缩模拟
    return data.startsWith("COMPRESSED[") && data.endsWith("]")
      ? data.slice(11, -1)
      : data;
  }
}

// 使用示例
export function demonstrateDecorator(): void {
  console.log("=== 装饰器模式示例 ===");

  // 基本装饰器示例
  const simple = new ConcreteComponent();
  console.log("Simple:", simple.operation());

  const decorator1 = new ConcreteDecoratorA(simple);
  console.log("Decorator A:", decorator1.operation());

  const decorator2 = new ConcreteDecoratorB(decorator1);
  console.log("Decorator B:", decorator2.operation());

  // 咖啡装饰器示例
  console.log("\n--- 咖啡装饰器示例 ---");
  let coffee: Coffee = new SimpleCoffee();
  console.log(`${coffee.description()} - $${coffee.cost()}`);

  coffee = new MilkDecorator(coffee);
  console.log(`${coffee.description()} - $${coffee.cost()}`);

  coffee = new SugarDecorator(coffee);
  console.log(`${coffee.description()} - $${coffee.cost()}`);

  coffee = new VanillaDecorator(coffee);
  console.log(`${coffee.description()} - $${coffee.cost()}`);

  coffee = new ChocolateDecorator(coffee);
  console.log(`${coffee.description()} - $${coffee.cost()}`);

  // 文本装饰器示例
  console.log("\n--- 文本装饰器示例 ---");
  let text: TextComponent = new PlainText("Hello World");
  console.log(text.format());

  text = new BoldDecorator(text);
  console.log(text.format());

  text = new ItalicDecorator(text);
  console.log(text.format());

  text = new UnderlineDecorator(text);
  console.log(text.format());

  text = new ColorDecorator(text, "red");
  console.log(text.format());

  // 通知装饰器示例
  console.log("\n--- 通知装饰器示例 ---");
  let notification: Notification = new EmailNotification();
  notification.send("Hello!");

  notification = new SMSDecorator(notification);
  notification.send("Hello!");

  notification = new SlackDecorator(notification);
  notification.send("Hello!");

  notification = new FacebookDecorator(notification);
  notification.send("Hello!");

  // 数据源装饰器示例
  console.log("\n--- 数据源装饰器示例 ---");
  let dataSource: DataSource = new FileDataSource("data.txt");
  dataSource.writeData("Hello World");
  console.log("Plain data:", dataSource.readData());

  dataSource = new EncryptionDecorator(dataSource);
  dataSource.writeData("Secret Data");
  console.log("Encrypted data:", dataSource.readData());

  dataSource = new CompressionDecorator(dataSource);
  dataSource.writeData("Large Data Set");
  console.log("Compressed and encrypted data:", dataSource.readData());
}
