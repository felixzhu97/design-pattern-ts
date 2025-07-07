/**
 * 组合模式 (Composite Pattern)
 * 将对象组合成树形结构以表示"部分-整体"的层次结构
 */

// 组件接口
export interface Component {
  operation(): string;
  add?(component: Component): void;
  remove?(component: Component): void;
  getChild?(index: number): Component;
}

// 叶子节点
export class Leaf implements Component {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public operation(): string {
    return `Leaf ${this.name}`;
  }
}

// 组合节点
export class Composite implements Component {
  private name: string;
  private children: Component[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public operation(): string {
    const results: string[] = [];
    results.push(`Composite ${this.name}`);

    for (const child of this.children) {
      results.push(`  ${child.operation()}`);
    }

    return results.join("\\n");
  }

  public add(component: Component): void {
    this.children.push(component);
  }

  public remove(component: Component): void {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  public getChild(index: number): Component {
    return this.children[index];
  }

  public getChildren(): Component[] {
    return [...this.children];
  }
}

// 实际应用示例：文件系统
export abstract class FileSystemComponent {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public abstract getSize(): number;
  public abstract display(indent: string): void;
}

// 文件类（叶子）
export class File extends FileSystemComponent {
  private size: number;

  constructor(name: string, size: number) {
    super(name);
    this.size = size;
  }

  public getSize(): number {
    return this.size;
  }

  public display(indent: string = ""): void {
    console.log(`${indent}📄 ${this.name} (${this.size} bytes)`);
  }
}

// 文件夹类（组合）
export class Directory extends FileSystemComponent {
  private children: FileSystemComponent[] = [];

  public getSize(): number {
    let totalSize = 0;
    for (const child of this.children) {
      totalSize += child.getSize();
    }
    return totalSize;
  }

  public display(indent: string = ""): void {
    console.log(`${indent}📁 ${this.name}/`);
    for (const child of this.children) {
      child.display(indent + "  ");
    }
  }

  public add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  public remove(component: FileSystemComponent): void {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  public getChildren(): FileSystemComponent[] {
    return [...this.children];
  }
}

// 企业组织结构示例
export interface Employee {
  getName(): string;
  getPosition(): string;
  getSalary(): number;
  display(indent: string): void;
  add?(employee: Employee): void;
  remove?(employee: Employee): void;
}

// 普通员工（叶子）
export class Developer implements Employee {
  private name: string;
  private position: string;
  private salary: number;

  constructor(name: string, position: string, salary: number) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }

  public getName(): string {
    return this.name;
  }

  public getPosition(): string {
    return this.position;
  }

  public getSalary(): number {
    return this.salary;
  }

  public display(indent: string = ""): void {
    console.log(
      `${indent}👨‍💻 ${this.name} - ${this.position} ($${this.salary})`
    );
  }
}

// 管理者（组合）
export class Manager implements Employee {
  private name: string;
  private position: string;
  private salary: number;
  private subordinates: Employee[] = [];

  constructor(name: string, position: string, salary: number) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }

  public getName(): string {
    return this.name;
  }

  public getPosition(): string {
    return this.position;
  }

  public getSalary(): number {
    return this.salary;
  }

  public display(indent: string = ""): void {
    console.log(
      `${indent}👔 ${this.name} - ${this.position} ($${this.salary})`
    );
    for (const subordinate of this.subordinates) {
      subordinate.display(indent + "  ");
    }
  }

  public add(employee: Employee): void {
    this.subordinates.push(employee);
  }

  public remove(employee: Employee): void {
    const index = this.subordinates.indexOf(employee);
    if (index > -1) {
      this.subordinates.splice(index, 1);
    }
  }

  public getSubordinates(): Employee[] {
    return [...this.subordinates];
  }

  public getTotalSalary(): number {
    let total = this.salary;
    for (const subordinate of this.subordinates) {
      total += subordinate.getSalary();
      if (subordinate instanceof Manager) {
        total += subordinate.getTotalSalary() - subordinate.getSalary();
      }
    }
    return total;
  }
}

// 图形组合示例
export interface Graphic {
  draw(): void;
  move(x: number, y: number): void;
  add?(graphic: Graphic): void;
  remove?(graphic: Graphic): void;
}

export class Dot implements Graphic {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(): void {
    console.log(`Drawing dot at (${this.x}, ${this.y})`);
  }

  public move(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}

export class CompoundGraphic implements Graphic {
  private graphics: Graphic[] = [];

  public draw(): void {
    for (const graphic of this.graphics) {
      graphic.draw();
    }
  }

  public move(x: number, y: number): void {
    for (const graphic of this.graphics) {
      graphic.move(x, y);
    }
  }

  public add(graphic: Graphic): void {
    this.graphics.push(graphic);
  }

  public remove(graphic: Graphic): void {
    const index = this.graphics.indexOf(graphic);
    if (index > -1) {
      this.graphics.splice(index, 1);
    }
  }
}

// 使用示例
export function demonstrateComposite(): void {
  console.log("=== 组合模式示例 ===");

  // 基本组合示例
  const leaf1 = new Leaf("A");
  const leaf2 = new Leaf("B");
  const leaf3 = new Leaf("C");

  const composite1 = new Composite("X");
  composite1.add(leaf1);
  composite1.add(leaf2);

  const composite2 = new Composite("Y");
  composite2.add(leaf3);
  composite2.add(composite1);

  console.log(composite2.operation());

  // 文件系统示例
  console.log("\\n--- 文件系统示例 ---");
  const rootDir = new Directory("root");
  const homeDir = new Directory("home");
  const userDir = new Directory("user");

  const file1 = new File("document.txt", 1024);
  const file2 = new File("image.jpg", 2048);
  const file3 = new File("config.json", 512);

  userDir.add(file1);
  userDir.add(file2);
  homeDir.add(userDir);
  rootDir.add(homeDir);
  rootDir.add(file3);

  rootDir.display();
  console.log(`Total size: ${rootDir.getSize()} bytes`);

  // 企业组织结构示例
  console.log("\\n--- 企业组织结构示例 ---");
  const ceo = new Manager("John", "CEO", 100000);
  const cto = new Manager("Alice", "CTO", 80000);
  const devLead = new Manager("Bob", "Development Lead", 60000);

  const dev1 = new Developer("Charlie", "Senior Developer", 50000);
  const dev2 = new Developer("Diana", "Junior Developer", 35000);
  const dev3 = new Developer("Eve", "Developer", 45000);

  devLead.add(dev1);
  devLead.add(dev2);
  cto.add(devLead);
  cto.add(dev3);
  ceo.add(cto);

  ceo.display();
  console.log(`Total company salary: $${ceo.getTotalSalary()}`);

  // 图形组合示例
  console.log("\\n--- 图形组合示例 ---");
  const dot1 = new Dot(1, 2);
  const dot2 = new Dot(3, 4);
  const dot3 = new Dot(5, 6);

  const compound1 = new CompoundGraphic();
  compound1.add(dot1);
  compound1.add(dot2);

  const compound2 = new CompoundGraphic();
  compound2.add(dot3);
  compound2.add(compound1);

  console.log("Drawing compound graphic:");
  compound2.draw();

  console.log("Moving compound graphic by (10, 10):");
  compound2.move(10, 10);
  compound2.draw();
}
