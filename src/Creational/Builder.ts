/**
 * 建造者模式 (Builder Pattern)
 * 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示
 */

// 产品类
export class Product {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public listParts(): string {
    return `Product parts: ${this.parts.join(", ")}`;
  }
}

// 建造者接口
export interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

// 具体建造者
export class ConcreteBuilder implements Builder {
  private product!: Product;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product();
  }

  public producePartA(): void {
    this.product.add("PartA1");
  }

  public producePartB(): void {
    this.product.add("PartB1");
  }

  public producePartC(): void {
    this.product.add("PartC1");
  }

  public getProduct(): Product {
    const result = this.product;
    this.reset();
    return result;
  }
}

// 指导者
export class Director {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

// 实际应用示例：计算机建造者
export class Computer {
  private cpu: string = "";
  private memory: string = "";
  private storage: string = "";
  private gpu: string = "";
  private powerSupply: string = "";

  public setCPU(cpu: string): void {
    this.cpu = cpu;
  }

  public setMemory(memory: string): void {
    this.memory = memory;
  }

  public setStorage(storage: string): void {
    this.storage = storage;
  }

  public setGPU(gpu: string): void {
    this.gpu = gpu;
  }

  public setPowerSupply(powerSupply: string): void {
    this.powerSupply = powerSupply;
  }

  public getSpecs(): string {
    return `Computer specs:
      CPU: ${this.cpu}
      Memory: ${this.memory}
      Storage: ${this.storage}
      GPU: ${this.gpu}
      Power Supply: ${this.powerSupply}`;
  }
}

// 计算机建造者接口
export interface ComputerBuilder {
  setCPU(cpu: string): ComputerBuilder;
  setMemory(memory: string): ComputerBuilder;
  setStorage(storage: string): ComputerBuilder;
  setGPU(gpu: string): ComputerBuilder;
  setPowerSupply(powerSupply: string): ComputerBuilder;
  build(): Computer;
}

// 具体计算机建造者
export class ConcreteComputerBuilder implements ComputerBuilder {
  private computer!: Computer;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.computer = new Computer();
  }

  public setCPU(cpu: string): ComputerBuilder {
    this.computer.setCPU(cpu);
    return this;
  }

  public setMemory(memory: string): ComputerBuilder {
    this.computer.setMemory(memory);
    return this;
  }

  public setStorage(storage: string): ComputerBuilder {
    this.computer.setStorage(storage);
    return this;
  }

  public setGPU(gpu: string): ComputerBuilder {
    this.computer.setGPU(gpu);
    return this;
  }

  public setPowerSupply(powerSupply: string): ComputerBuilder {
    this.computer.setPowerSupply(powerSupply);
    return this;
  }

  public build(): Computer {
    const result = this.computer;
    this.reset();
    return result;
  }
}

// 游戏电脑建造者
export class GamingComputerBuilder implements ComputerBuilder {
  private computer!: Computer;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.computer = new Computer();
  }

  public setCPU(cpu: string = "Intel i9-13900K"): ComputerBuilder {
    this.computer.setCPU(cpu);
    return this;
  }

  public setMemory(memory: string = "32GB DDR5"): ComputerBuilder {
    this.computer.setMemory(memory);
    return this;
  }

  public setStorage(storage: string = "2TB NVMe SSD"): ComputerBuilder {
    this.computer.setStorage(storage);
    return this;
  }

  public setGPU(gpu: string = "RTX 4080"): ComputerBuilder {
    this.computer.setGPU(gpu);
    return this;
  }

  public setPowerSupply(
    powerSupply: string = "850W 80+ Gold"
  ): ComputerBuilder {
    this.computer.setPowerSupply(powerSupply);
    return this;
  }

  public build(): Computer {
    const result = this.computer;
    this.reset();
    return result;
  }
}

// 使用示例
export function demonstrateBuilder(): void {
  console.log("=== 建造者模式示例 ===");

  // 基本建造者示例
  const director = new Director();
  const builder = new ConcreteBuilder();
  director.setBuilder(builder);

  console.log("Basic product:");
  director.buildMinimalViableProduct();
  console.log(builder.getProduct().listParts());

  console.log("Full featured product:");
  director.buildFullFeaturedProduct();
  console.log(builder.getProduct().listParts());

  // 计算机建造者示例
  const computerBuilder = new ConcreteComputerBuilder();

  const officeComputer = computerBuilder
    .setCPU("Intel i5-12400")
    .setMemory("16GB DDR4")
    .setStorage("512GB SSD")
    .setGPU("Integrated Graphics")
    .setPowerSupply("450W")
    .build();

  console.log("Office Computer:");
  console.log(officeComputer.getSpecs());

  // 游戏电脑建造者示例
  const gamingBuilder = new GamingComputerBuilder();

  const gamingComputer = gamingBuilder
    .setCPU("Intel i9-13900K")
    .setMemory("32GB DDR5")
    .setStorage("2TB NVMe SSD")
    .setGPU("RTX 4080")
    .setPowerSupply("850W 80+ Gold")
    .build();

  console.log("Gaming Computer:");
  console.log(gamingComputer.getSpecs());
}
