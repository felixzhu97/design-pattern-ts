/**
 * 工厂方法模式 (Factory Method Pattern)
 * 定义一个创建对象的接口，让子类决定实例化哪一个类
 */

// 产品接口
export interface Product {
  operation(): string;
}

// 具体产品A
export class ConcreteProductA implements Product {
  operation(): string {
    return "ConcreteProductA operation";
  }
}

// 具体产品B
export class ConcreteProductB implements Product {
  operation(): string {
    return "ConcreteProductB operation";
  }
}

// 抽象创建者
export abstract class Creator {
  // 工厂方法
  public abstract factoryMethod(): Product;

  // 使用工厂方法的业务逻辑
  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: ${product.operation()}`;
  }
}

// 具体创建者A
export class ConcreteCreatorA extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

// 具体创建者B
export class ConcreteCreatorB extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

// 实际应用示例：不同类型的日志记录器
export interface Logger {
  log(message: string): void;
}

export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[Console] ${message}`);
  }
}

export class FileLogger implements Logger {
  log(message: string): void {
    console.log(`[File] ${message}`);
  }
}

export class DatabaseLogger implements Logger {
  log(message: string): void {
    console.log(`[Database] ${message}`);
  }
}

// 日志记录器工厂
export abstract class LoggerFactory {
  abstract createLogger(): Logger;

  public logMessage(message: string): void {
    const logger = this.createLogger();
    logger.log(message);
  }
}

export class ConsoleLoggerFactory extends LoggerFactory {
  createLogger(): Logger {
    return new ConsoleLogger();
  }
}

export class FileLoggerFactory extends LoggerFactory {
  createLogger(): Logger {
    return new FileLogger();
  }
}

export class DatabaseLoggerFactory extends LoggerFactory {
  createLogger(): Logger {
    return new DatabaseLogger();
  }
}

// 使用示例
export function demonstrateFactoryMethod(): void {
  console.log("=== 工厂方法模式示例 ===");

  // 基本示例
  const creatorA = new ConcreteCreatorA();
  const creatorB = new ConcreteCreatorB();

  console.log(creatorA.someOperation());
  console.log(creatorB.someOperation());

  // 日志记录器示例
  const consoleLoggerFactory = new ConsoleLoggerFactory();
  const fileLoggerFactory = new FileLoggerFactory();
  const databaseLoggerFactory = new DatabaseLoggerFactory();

  consoleLoggerFactory.logMessage("This is a console message");
  fileLoggerFactory.logMessage("This is a file message");
  databaseLoggerFactory.logMessage("This is a database message");
}
