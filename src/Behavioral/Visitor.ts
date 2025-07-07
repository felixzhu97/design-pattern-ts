/**
 * 访问者模式 (Visitor Pattern)
 *
 * 定义：表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。
 *
 * 主要角色：
 * 1. Visitor（访问者）：定义对每个具体元素的访问操作
 * 2. ConcreteVisitor（具体访问者）：实现访问者接口，定义具体的访问操作
 * 3. Element（元素）：定义一个接受访问者的接口
 * 4. ConcreteElement（具体元素）：实现元素接口，通常包含一个接受访问者的方法
 * 5. ObjectStructure（对象结构）：能枚举它的元素，提供一个高层接口让访问者访问它的元素
 */

// =============================================================================
// 基本访问者实现
// =============================================================================

/**
 * 抽象访问者
 */
interface Visitor {
  visitConcreteElementA(element: ConcreteElementA): void;
  visitConcreteElementB(element: ConcreteElementB): void;
}

/**
 * 抽象元素
 */
interface Element {
  accept(visitor: Visitor): void;
}

/**
 * 具体元素A
 */
class ConcreteElementA implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementA(this);
  }

  operationA(): string {
    return "ConcreteElementA操作";
  }
}

/**
 * 具体元素B
 */
class ConcreteElementB implements Element {
  accept(visitor: Visitor): void {
    visitor.visitConcreteElementB(this);
  }

  operationB(): string {
    return "ConcreteElementB操作";
  }
}

/**
 * 具体访问者1
 */
class ConcreteVisitor1 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log(`ConcreteVisitor1访问 ${element.operationA()}`);
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log(`ConcreteVisitor1访问 ${element.operationB()}`);
  }
}

/**
 * 具体访问者2
 */
class ConcreteVisitor2 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log(`ConcreteVisitor2处理 ${element.operationA()}`);
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log(`ConcreteVisitor2处理 ${element.operationB()}`);
  }
}

/**
 * 对象结构
 */
class ObjectStructure {
  private elements: Element[] = [];

  addElement(element: Element): void {
    this.elements.push(element);
  }

  removeElement(element: Element): void {
    const index = this.elements.indexOf(element);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  }

  accept(visitor: Visitor): void {
    this.elements.forEach((element) => element.accept(visitor));
  }
}

// =============================================================================
// 示例1：图形形状访问者
// =============================================================================

/**
 * 图形访问者接口
 */
interface ShapeVisitor {
  visitCircle(circle: Circle): void;
  visitRectangle(rectangle: Rectangle): void;
  visitTriangle(triangle: Triangle): void;
}

/**
 * 图形抽象类
 */
abstract class Shape {
  constructor(protected x: number, protected y: number) {}

  abstract accept(visitor: ShapeVisitor): void;

  getX(): number {
    return this.x;
  }
  getY(): number {
    return this.y;
  }
}

/**
 * 圆形
 */
class Circle extends Shape {
  constructor(x: number, y: number, private radius: number) {
    super(x, y);
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this);
  }

  getRadius(): number {
    return this.radius;
  }
}

/**
 * 矩形
 */
class Rectangle extends Shape {
  constructor(
    x: number,
    y: number,
    private width: number,
    private height: number
  ) {
    super(x, y);
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitRectangle(this);
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}

/**
 * 三角形
 */
class Triangle extends Shape {
  constructor(
    x: number,
    y: number,
    private base: number,
    private height: number
  ) {
    super(x, y);
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitTriangle(this);
  }

  getBase(): number {
    return this.base;
  }

  getHeight(): number {
    return this.height;
  }
}

/**
 * 面积计算访问者
 */
class AreaCalculator implements ShapeVisitor {
  private totalArea: number = 0;

  visitCircle(circle: Circle): void {
    const area = Math.PI * circle.getRadius() * circle.getRadius();
    console.log(`圆形面积: ${area.toFixed(2)}`);
    this.totalArea += area;
  }

  visitRectangle(rectangle: Rectangle): void {
    const area = rectangle.getWidth() * rectangle.getHeight();
    console.log(`矩形面积: ${area.toFixed(2)}`);
    this.totalArea += area;
  }

  visitTriangle(triangle: Triangle): void {
    const area = 0.5 * triangle.getBase() * triangle.getHeight();
    console.log(`三角形面积: ${area.toFixed(2)}`);
    this.totalArea += area;
  }

  getTotalArea(): number {
    return this.totalArea;
  }

  reset(): void {
    this.totalArea = 0;
  }
}

/**
 * 周长计算访问者
 */
class PerimeterCalculator implements ShapeVisitor {
  private totalPerimeter: number = 0;

  visitCircle(circle: Circle): void {
    const perimeter = 2 * Math.PI * circle.getRadius();
    console.log(`圆形周长: ${perimeter.toFixed(2)}`);
    this.totalPerimeter += perimeter;
  }

  visitRectangle(rectangle: Rectangle): void {
    const perimeter = 2 * (rectangle.getWidth() + rectangle.getHeight());
    console.log(`矩形周长: ${perimeter.toFixed(2)}`);
    this.totalPerimeter += perimeter;
  }

  visitTriangle(triangle: Triangle): void {
    // 假设是直角三角形
    const hypotenuse = Math.sqrt(
      triangle.getBase() * triangle.getBase() +
        triangle.getHeight() * triangle.getHeight()
    );
    const perimeter = triangle.getBase() + triangle.getHeight() + hypotenuse;
    console.log(`三角形周长: ${perimeter.toFixed(2)}`);
    this.totalPerimeter += perimeter;
  }

  getTotalPerimeter(): number {
    return this.totalPerimeter;
  }

  reset(): void {
    this.totalPerimeter = 0;
  }
}

/**
 * 绘制访问者
 */
class DrawingVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    console.log(
      `绘制圆形: 中心(${circle.getX()}, ${circle.getY()}), 半径${circle.getRadius()}`
    );
  }

  visitRectangle(rectangle: Rectangle): void {
    console.log(
      `绘制矩形: 位置(${rectangle.getX()}, ${rectangle.getY()}), ` +
        `尺寸${rectangle.getWidth()}x${rectangle.getHeight()}`
    );
  }

  visitTriangle(triangle: Triangle): void {
    console.log(
      `绘制三角形: 位置(${triangle.getX()}, ${triangle.getY()}), ` +
        `底边${triangle.getBase()}, 高${triangle.getHeight()}`
    );
  }
}

// =============================================================================
// 示例2：文件系统访问者
// =============================================================================

/**
 * 文件系统访问者接口
 */
interface FileSystemVisitor {
  visitFile(file: File): void;
  visitDirectory(directory: Directory): void;
}

/**
 * 文件系统节点抽象类
 */
abstract class FileSystemNode {
  constructor(protected name: string, protected size: number) {}

  abstract accept(visitor: FileSystemVisitor): void;

  getName(): string {
    return this.name;
  }
  getSize(): number {
    return this.size;
  }
}

/**
 * 文件
 */
class File extends FileSystemNode {
  constructor(name: string, size: number, private extension: string) {
    super(name, size);
  }

  accept(visitor: FileSystemVisitor): void {
    visitor.visitFile(this);
  }

  getExtension(): string {
    return this.extension;
  }
}

/**
 * 目录
 */
class Directory extends FileSystemNode {
  private children: FileSystemNode[] = [];

  constructor(name: string) {
    super(name, 0);
  }

  accept(visitor: FileSystemVisitor): void {
    visitor.visitDirectory(this);
    this.children.forEach((child) => child.accept(visitor));
  }

  addChild(child: FileSystemNode): void {
    this.children.push(child);
    this.size += child.getSize();
  }

  getChildren(): FileSystemNode[] {
    return this.children;
  }
}

/**
 * 文件大小统计访问者
 */
class FileSizeCalculator implements FileSystemVisitor {
  private totalSize: number = 0;
  private fileCount: number = 0;
  private directoryCount: number = 0;

  visitFile(file: File): void {
    this.totalSize += file.getSize();
    this.fileCount++;
    console.log(
      `文件: ${file.getName()}.${file.getExtension()} (${file.getSize()} bytes)`
    );
  }

  visitDirectory(directory: Directory): void {
    this.directoryCount++;
    console.log(`目录: ${directory.getName()}/`);
  }

  getTotalSize(): number {
    return this.totalSize;
  }

  getFileCount(): number {
    return this.fileCount;
  }

  getDirectoryCount(): number {
    return this.directoryCount;
  }

  reset(): void {
    this.totalSize = 0;
    this.fileCount = 0;
    this.directoryCount = 0;
  }
}

/**
 * 文件搜索访问者
 */
class FileSearchVisitor implements FileSystemVisitor {
  private searchResults: File[] = [];

  constructor(private searchPattern: string) {}

  visitFile(file: File): void {
    if (
      file.getName().includes(this.searchPattern) ||
      file.getExtension().includes(this.searchPattern)
    ) {
      this.searchResults.push(file);
      console.log(`找到匹配文件: ${file.getName()}.${file.getExtension()}`);
    }
  }

  visitDirectory(directory: Directory): void {
    // 可以在这里添加目录级别的搜索逻辑
  }

  getSearchResults(): File[] {
    return this.searchResults;
  }

  reset(): void {
    this.searchResults = [];
  }
}

/**
 * 文件权限检查访问者
 */
class FilePermissionChecker implements FileSystemVisitor {
  private issues: string[] = [];

  visitFile(file: File): void {
    // 模拟权限检查
    if (file.getExtension() === "exe" && file.getSize() > 10000) {
      this.issues.push(
        `可执行文件过大: ${file.getName()}.${file.getExtension()}`
      );
    }
    if (file.getExtension() === "tmp") {
      this.issues.push(
        `临时文件未清理: ${file.getName()}.${file.getExtension()}`
      );
    }
  }

  visitDirectory(directory: Directory): void {
    // 检查目录权限
    if (directory.getName().startsWith(".")) {
      console.log(`隐藏目录: ${directory.getName()}/`);
    }
  }

  getIssues(): string[] {
    return this.issues;
  }

  reset(): void {
    this.issues = [];
  }
}

// =============================================================================
// 示例3：编译器AST访问者
// =============================================================================

/**
 * AST访问者接口
 */
interface ASTVisitor {
  visitNumber(node: NumberNode): void;
  visitBinaryOp(node: BinaryOpNode): void;
  visitVariable(node: VariableNode): void;
}

/**
 * AST节点抽象类
 */
abstract class ASTNode {
  abstract accept(visitor: ASTVisitor): void;
}

/**
 * 数字节点
 */
class NumberNode extends ASTNode {
  constructor(private value: number) {
    super();
  }

  accept(visitor: ASTVisitor): void {
    visitor.visitNumber(this);
  }

  getValue(): number {
    return this.value;
  }
}

/**
 * 二元操作节点
 */
class BinaryOpNode extends ASTNode {
  constructor(
    private left: ASTNode,
    private operator: string,
    private right: ASTNode
  ) {
    super();
  }

  accept(visitor: ASTVisitor): void {
    visitor.visitBinaryOp(this);
  }

  getLeft(): ASTNode {
    return this.left;
  }

  getOperator(): string {
    return this.operator;
  }

  getRight(): ASTNode {
    return this.right;
  }
}

/**
 * 变量节点
 */
class VariableNode extends ASTNode {
  constructor(private name: string) {
    super();
  }

  accept(visitor: ASTVisitor): void {
    visitor.visitVariable(this);
  }

  getName(): string {
    return this.name;
  }
}

/**
 * 表达式求值访问者
 */
class EvaluationVisitor implements ASTVisitor {
  private stack: number[] = [];
  private variables: Map<string, number> = new Map();

  setVariable(name: string, value: number): void {
    this.variables.set(name, value);
  }

  visitNumber(node: NumberNode): void {
    this.stack.push(node.getValue());
  }

  visitBinaryOp(node: BinaryOpNode): void {
    node.getLeft().accept(this);
    node.getRight().accept(this);

    const right = this.stack.pop()!;
    const left = this.stack.pop()!;

    switch (node.getOperator()) {
      case "+":
        this.stack.push(left + right);
        break;
      case "-":
        this.stack.push(left - right);
        break;
      case "*":
        this.stack.push(left * right);
        break;
      case "/":
        this.stack.push(left / right);
        break;
    }
  }

  visitVariable(node: VariableNode): void {
    const value = this.variables.get(node.getName()) || 0;
    this.stack.push(value);
  }

  getResult(): number {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : 0;
  }

  reset(): void {
    this.stack = [];
  }
}

/**
 * 代码生成访问者
 */
class CodeGenerationVisitor implements ASTVisitor {
  private code: string[] = [];

  visitNumber(node: NumberNode): void {
    this.code.push(`PUSH ${node.getValue()}`);
  }

  visitBinaryOp(node: BinaryOpNode): void {
    node.getLeft().accept(this);
    node.getRight().accept(this);

    switch (node.getOperator()) {
      case "+":
        this.code.push("ADD");
        break;
      case "-":
        this.code.push("SUB");
        break;
      case "*":
        this.code.push("MUL");
        break;
      case "/":
        this.code.push("DIV");
        break;
    }
  }

  visitVariable(node: VariableNode): void {
    this.code.push(`LOAD ${node.getName()}`);
  }

  getCode(): string[] {
    return this.code;
  }

  reset(): void {
    this.code = [];
  }
}

// =============================================================================
// 演示函数
// =============================================================================

/**
 * 演示访问者模式的使用
 */
export function demonstrateVisitorPattern(): void {
  console.log("=== 访问者模式演示 ===\n");

  // 1. 基本访问者演示
  console.log("1. 基本访问者模式：");
  const structure = new ObjectStructure();
  structure.addElement(new ConcreteElementA());
  structure.addElement(new ConcreteElementB());

  const visitor1 = new ConcreteVisitor1();
  const visitor2 = new ConcreteVisitor2();

  console.log("使用访问者1：");
  structure.accept(visitor1);
  console.log("使用访问者2：");
  structure.accept(visitor2);

  // 2. 图形形状访问者演示
  console.log("\n2. 图形形状访问者：");
  const shapes: Shape[] = [
    new Circle(0, 0, 5),
    new Rectangle(10, 10, 4, 6),
    new Triangle(20, 20, 3, 4),
  ];

  console.log("计算面积：");
  const areaCalculator = new AreaCalculator();
  shapes.forEach((shape) => shape.accept(areaCalculator));
  console.log(`总面积: ${areaCalculator.getTotalArea().toFixed(2)}`);

  console.log("\n计算周长：");
  const perimeterCalculator = new PerimeterCalculator();
  shapes.forEach((shape) => shape.accept(perimeterCalculator));
  console.log(`总周长: ${perimeterCalculator.getTotalPerimeter().toFixed(2)}`);

  console.log("\n绘制图形：");
  const drawingVisitor = new DrawingVisitor();
  shapes.forEach((shape) => shape.accept(drawingVisitor));

  // 3. 文件系统访问者演示
  console.log("\n3. 文件系统访问者：");
  const root = new Directory("root");
  const documents = new Directory("documents");
  const photos = new Directory("photos");

  documents.addChild(new File("readme", 1024, "txt"));
  documents.addChild(new File("report", 2048, "pdf"));
  photos.addChild(new File("vacation", 5120, "jpg"));
  photos.addChild(new File("family", 3072, "png"));

  root.addChild(documents);
  root.addChild(photos);
  root.addChild(new File("config", 512, "ini"));
  root.addChild(new File("temp", 256, "tmp"));

  console.log("文件大小统计：");
  const sizeCalculator = new FileSizeCalculator();
  root.accept(sizeCalculator);
  console.log(`总大小: ${sizeCalculator.getTotalSize()} bytes`);
  console.log(`文件数: ${sizeCalculator.getFileCount()}`);
  console.log(`目录数: ${sizeCalculator.getDirectoryCount()}`);

  console.log("\n搜索文件：");
  const searchVisitor = new FileSearchVisitor("tmp");
  root.accept(searchVisitor);
  console.log(`找到 ${searchVisitor.getSearchResults().length} 个匹配文件`);

  // 4. 编译器AST访问者演示
  console.log("\n4. 编译器AST访问者：");
  // 构建AST: (x + 2) * 3
  const ast = new BinaryOpNode(
    new BinaryOpNode(new VariableNode("x"), "+", new NumberNode(2)),
    "*",
    new NumberNode(3)
  );

  console.log("表达式求值：");
  const evaluator = new EvaluationVisitor();
  evaluator.setVariable("x", 5);
  ast.accept(evaluator);
  console.log(`结果: ${evaluator.getResult()}`);

  console.log("\n代码生成：");
  const codeGenerator = new CodeGenerationVisitor();
  ast.accept(codeGenerator);
  console.log("生成的代码：");
  codeGenerator
    .getCode()
    .forEach((instruction) => console.log(`  ${instruction}`));

  console.log("\n=== 访问者模式演示完成 ===");
}

// 导出所有类和接口
export {
  Visitor,
  Element,
  ConcreteElementA,
  ConcreteElementB,
  ConcreteVisitor1,
  ConcreteVisitor2,
  ObjectStructure,
  ShapeVisitor,
  Shape,
  Circle,
  Rectangle,
  Triangle,
  AreaCalculator,
  PerimeterCalculator,
  DrawingVisitor,
  FileSystemVisitor,
  FileSystemNode,
  File,
  Directory,
  FileSizeCalculator,
  FileSearchVisitor,
  FilePermissionChecker,
  ASTVisitor,
  ASTNode,
  NumberNode,
  BinaryOpNode,
  VariableNode,
  EvaluationVisitor,
  CodeGenerationVisitor,
};
