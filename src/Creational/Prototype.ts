/**
 * 原型模式 (Prototype Pattern)
 * 通过复制现有实例来创建新实例，而不是新建实例
 */

// 原型接口
export interface Prototype {
  clone(): Prototype;
}

// 具体原型A
export class ConcretePrototypeA implements Prototype {
  private property: string;

  constructor(property: string) {
    this.property = property;
  }

  public clone(): ConcretePrototypeA {
    return new ConcretePrototypeA(this.property);
  }

  public getProperty(): string {
    return this.property;
  }

  public setProperty(property: string): void {
    this.property = property;
  }
}

// 具体原型B
export class ConcretePrototypeB implements Prototype {
  private property: string;

  constructor(property: string) {
    this.property = property;
  }

  public clone(): ConcretePrototypeB {
    return new ConcretePrototypeB(this.property);
  }

  public getProperty(): string {
    return this.property;
  }

  public setProperty(property: string): void {
    this.property = property;
  }
}

// 实际应用示例：形状原型
export abstract class Shape implements Prototype {
  protected x: number;
  protected y: number;
  protected color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  public abstract clone(): Shape;
  public abstract getArea(): number;
  public abstract draw(): string;

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  public getColor(): string {
    return this.color;
  }

  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public setColor(color: string): void {
    this.color = color;
  }
}

// 圆形原型
export class Circle extends Shape {
  private radius: number;

  constructor(x: number, y: number, color: string, radius: number) {
    super(x, y, color);
    this.radius = radius;
  }

  public clone(): Circle {
    return new Circle(this.x, this.y, this.color, this.radius);
  }

  public getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  public draw(): string {
    return `Drawing a ${this.color} circle at (${this.x}, ${this.y}) with radius ${this.radius}`;
  }

  public getRadius(): number {
    return this.radius;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }
}

// 矩形原型
export class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(
    x: number,
    y: number,
    color: string,
    width: number,
    height: number
  ) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  public clone(): Rectangle {
    return new Rectangle(this.x, this.y, this.color, this.width, this.height);
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public draw(): string {
    return `Drawing a ${this.color} rectangle at (${this.x}, ${this.y}) with width ${this.width} and height ${this.height}`;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setDimensions(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}

// 原型管理器
export class PrototypeManager {
  private prototypes: Map<string, Prototype> = new Map();

  public addPrototype(name: string, prototype: Prototype): void {
    this.prototypes.set(name, prototype);
  }

  public getPrototype(name: string): Prototype | undefined {
    const prototype = this.prototypes.get(name);
    return prototype ? prototype.clone() : undefined;
  }

  public removePrototype(name: string): boolean {
    return this.prototypes.delete(name);
  }

  public listPrototypes(): string[] {
    return Array.from(this.prototypes.keys());
  }
}

// 复杂对象原型示例
export class ComplexObject implements Prototype {
  private data: any;
  private nestedObject: any;

  constructor(data: any, nestedObject: any) {
    this.data = data;
    this.nestedObject = nestedObject;
  }

  public clone(): ComplexObject {
    // 深拷贝复杂对象
    const clonedData = JSON.parse(JSON.stringify(this.data));
    const clonedNestedObject = JSON.parse(JSON.stringify(this.nestedObject));
    return new ComplexObject(clonedData, clonedNestedObject);
  }

  public getData(): any {
    return this.data;
  }

  public getNestedObject(): any {
    return this.nestedObject;
  }

  public setData(data: any): void {
    this.data = data;
  }

  public setNestedObject(nestedObject: any): void {
    this.nestedObject = nestedObject;
  }
}

// 使用示例
export function demonstratePrototype(): void {
  console.log("=== 原型模式示例 ===");

  // 基本原型示例
  const prototypeA = new ConcretePrototypeA("Initial A");
  const clonedA = prototypeA.clone();

  console.log("Original A:", prototypeA.getProperty());
  console.log("Cloned A:", clonedA.getProperty());

  clonedA.setProperty("Modified A");
  console.log("Original A after modification:", prototypeA.getProperty());
  console.log("Cloned A after modification:", clonedA.getProperty());

  // 形状原型示例
  const originalCircle = new Circle(10, 20, "red", 5);
  const clonedCircle = originalCircle.clone();

  console.log("Original circle:", originalCircle.draw());
  console.log("Cloned circle:", clonedCircle.draw());

  clonedCircle.setPosition(30, 40);
  clonedCircle.setColor("blue");
  clonedCircle.setRadius(10);

  console.log("Original circle after modification:", originalCircle.draw());
  console.log("Cloned circle after modification:", clonedCircle.draw());

  // 原型管理器示例
  const manager = new PrototypeManager();

  manager.addPrototype("redCircle", new Circle(0, 0, "red", 5));
  manager.addPrototype("blueRectangle", new Rectangle(0, 0, "blue", 10, 20));

  const redCircleClone = manager.getPrototype("redCircle") as Circle;
  const blueRectangleClone = manager.getPrototype("blueRectangle") as Rectangle;

  if (redCircleClone) {
    redCircleClone.setPosition(100, 100);
    console.log("Red circle clone:", redCircleClone.draw());
  }

  if (blueRectangleClone) {
    blueRectangleClone.setPosition(200, 200);
    console.log("Blue rectangle clone:", blueRectangleClone.draw());
  }

  console.log("Available prototypes:", manager.listPrototypes());
}
