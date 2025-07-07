/**
 * 抽象工厂模式 (Abstract Factory Pattern)
 * 提供一个接口，用于创建相关或相互依赖的对象族
 */

// 抽象产品A
export interface AbstractProductA {
  usefulFunctionA(): string;
}

// 抽象产品B
export interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

// 具体产品A1
export class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA(): string {
    return "The result of the product A1.";
  }
}

// 具体产品A2
export class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA(): string {
    return "The result of the product A2.";
  }
}

// 具体产品B1
export class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB(): string {
    return "The result of the product B1.";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with (${result})`;
  }
}

// 具体产品B2
export class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB(): string {
    return "The result of the product B2.";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with (${result})`;
  }
}

// 抽象工厂接口
export interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

// 具体工厂1
export class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

// 具体工厂2
export class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

// 实际应用示例：GUI组件工厂
export interface Button {
  render(): string;
  click(): void;
}

export interface Checkbox {
  render(): string;
  toggle(): void;
}

// Windows样式组件
export class WindowsButton implements Button {
  render(): string {
    return "Windows Button rendered";
  }

  click(): void {
    console.log("Windows Button clicked");
  }
}

export class WindowsCheckbox implements Checkbox {
  render(): string {
    return "Windows Checkbox rendered";
  }

  toggle(): void {
    console.log("Windows Checkbox toggled");
  }
}

// macOS样式组件
export class MacOSButton implements Button {
  render(): string {
    return "macOS Button rendered";
  }

  click(): void {
    console.log("macOS Button clicked");
  }
}

export class MacOSCheckbox implements Checkbox {
  render(): string {
    return "macOS Checkbox rendered";
  }

  toggle(): void {
    console.log("macOS Checkbox toggled");
  }
}

// GUI工厂接口
export interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Windows GUI工厂
export class WindowsGUIFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

// macOS GUI工厂
export class MacOSGUIFactory implements GUIFactory {
  createButton(): Button {
    return new MacOSButton();
  }

  createCheckbox(): Checkbox {
    return new MacOSCheckbox();
  }
}

// 客户端代码
export class Application {
  private factory: GUIFactory;
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.factory = factory;
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  public render(): string {
    return `${this.button.render()}, ${this.checkbox.render()}`;
  }

  public interact(): void {
    this.button.click();
    this.checkbox.toggle();
  }
}

// 使用示例
export function demonstrateAbstractFactory(): void {
  console.log("=== 抽象工厂模式示例 ===");

  // 基本示例
  const factory1 = new ConcreteFactory1();
  const factory2 = new ConcreteFactory2();

  const productA1 = factory1.createProductA();
  const productB1 = factory1.createProductB();

  console.log(productA1.usefulFunctionA());
  console.log(productB1.usefulFunctionB());
  console.log(productB1.anotherUsefulFunctionB(productA1));

  // GUI示例
  const windowsFactory = new WindowsGUIFactory();
  const macOSFactory = new MacOSGUIFactory();

  const windowsApp = new Application(windowsFactory);
  const macOSApp = new Application(macOSFactory);

  console.log("Windows App:", windowsApp.render());
  console.log("macOS App:", macOSApp.render());

  windowsApp.interact();
  macOSApp.interact();
}
