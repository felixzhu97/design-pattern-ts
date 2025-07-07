/**
 * 享元模式 (Flyweight Pattern)
 * 通过共享有效支持大量细粒度的对象
 */

// 享元接口
export interface Flyweight {
  operation(extrinsicState: string): void;
}

// 具体享元
export class ConcreteFlyweight implements Flyweight {
  private intrinsicState: string;

  constructor(intrinsicState: string) {
    this.intrinsicState = intrinsicState;
  }

  public operation(extrinsicState: string): void {
    console.log(
      `ConcreteFlyweight: Intrinsic[${this.intrinsicState}] Extrinsic[${extrinsicState}]`
    );
  }
}

// 享元工厂
export class FlyweightFactory {
  private flyweights: Map<string, Flyweight> = new Map();

  public getFlyweight(key: string): Flyweight {
    if (!this.flyweights.has(key)) {
      console.log(`Creating new flyweight for key: ${key}`);
      this.flyweights.set(key, new ConcreteFlyweight(key));
    } else {
      console.log(`Reusing existing flyweight for key: ${key}`);
    }
    return this.flyweights.get(key)!;
  }

  public listFlyweights(): void {
    console.log(`FlyweightFactory: ${this.flyweights.size} flyweights created`);
    for (const key of this.flyweights.keys()) {
      console.log(`  - ${key}`);
    }
  }
}

// 上下文类
export class Context {
  private flyweight: Flyweight;
  private extrinsicState: string;

  constructor(flyweight: Flyweight, extrinsicState: string) {
    this.flyweight = flyweight;
    this.extrinsicState = extrinsicState;
  }

  public operation(): void {
    this.flyweight.operation(this.extrinsicState);
  }
}

// 实际应用示例：文本编辑器字符格式化
export interface CharacterFlyweight {
  render(position: number, fontSize: number): void;
}

export class Character implements CharacterFlyweight {
  private char: string;
  private font: string;
  private color: string;

  constructor(char: string, font: string, color: string) {
    this.char = char;
    this.font = font;
    this.color = color;
  }

  public render(position: number, fontSize: number): void {
    console.log(
      `Rendering '${this.char}' at position ${position} with font '${this.font}', color '${this.color}', size ${fontSize}`
    );
  }
}

export class CharacterFactory {
  private characters: Map<string, CharacterFlyweight> = new Map();

  public getCharacter(
    char: string,
    font: string,
    color: string
  ): CharacterFlyweight {
    const key = `${char}_${font}_${color}`;

    if (!this.characters.has(key)) {
      console.log(`Creating new character flyweight: ${key}`);
      this.characters.set(key, new Character(char, font, color));
    }

    return this.characters.get(key)!;
  }

  public getCreatedCharactersCount(): number {
    return this.characters.size;
  }
}

export class TextEditor {
  private characters: {
    flyweight: CharacterFlyweight;
    position: number;
    fontSize: number;
  }[] = [];
  private factory: CharacterFactory;

  constructor() {
    this.factory = new CharacterFactory();
  }

  public addCharacter(
    char: string,
    font: string,
    color: string,
    position: number,
    fontSize: number
  ): void {
    const flyweight = this.factory.getCharacter(char, font, color);
    this.characters.push({ flyweight, position, fontSize });
  }

  public render(): void {
    console.log("Rendering text...");
    for (const char of this.characters) {
      char.flyweight.render(char.position, char.fontSize);
    }
    console.log(`Total characters: ${this.characters.length}`);
    console.log(
      `Character flyweights created: ${this.factory.getCreatedCharactersCount()}`
    );
  }
}

// 粒子系统示例
export interface ParticleFlyweight {
  render(x: number, y: number, velocity: number, angle: number): void;
}

export class ParticleType implements ParticleFlyweight {
  private color: string;
  private shape: string;
  private size: number;

  constructor(color: string, shape: string, size: number) {
    this.color = color;
    this.shape = shape;
    this.size = size;
  }

  public render(x: number, y: number, velocity: number, angle: number): void {
    console.log(
      `Particle[${this.color} ${this.shape} ${this.size}] at (${x}, ${y}) vel=${velocity} angle=${angle}`
    );
  }
}

export class ParticleFactory {
  private particleTypes: Map<string, ParticleFlyweight> = new Map();

  public getParticleType(
    color: string,
    shape: string,
    size: number
  ): ParticleFlyweight {
    const key = `${color}_${shape}_${size}`;

    if (!this.particleTypes.has(key)) {
      console.log(`Creating new particle type: ${key}`);
      this.particleTypes.set(key, new ParticleType(color, shape, size));
    }

    return this.particleTypes.get(key)!;
  }

  public getCreatedTypesCount(): number {
    return this.particleTypes.size;
  }
}

export class Particle {
  private x: number;
  private y: number;
  private velocity: number;
  private angle: number;
  private type: ParticleFlyweight;

  constructor(
    x: number,
    y: number,
    velocity: number,
    angle: number,
    type: ParticleFlyweight
  ) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.angle = angle;
    this.type = type;
  }

  public render(): void {
    this.type.render(this.x, this.y, this.velocity, this.angle);
  }

  public update(): void {
    this.x += Math.cos(this.angle) * this.velocity;
    this.y += Math.sin(this.angle) * this.velocity;
  }
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private factory: ParticleFactory;

  constructor() {
    this.factory = new ParticleFactory();
  }

  public addParticle(
    x: number,
    y: number,
    velocity: number,
    angle: number,
    color: string,
    shape: string,
    size: number
  ): void {
    const type = this.factory.getParticleType(color, shape, size);
    this.particles.push(new Particle(x, y, velocity, angle, type));
  }

  public render(): void {
    console.log("Rendering particle system...");
    for (const particle of this.particles) {
      particle.render();
    }
    console.log(`Total particles: ${this.particles.length}`);
    console.log(
      `Particle types created: ${this.factory.getCreatedTypesCount()}`
    );
  }

  public update(): void {
    for (const particle of this.particles) {
      particle.update();
    }
  }
}

// 网页元素示例
export interface WebElementFlyweight {
  render(x: number, y: number, content: string): void;
}

export class ButtonElement implements WebElementFlyweight {
  private style: string;
  private cssClass: string;

  constructor(style: string, cssClass: string) {
    this.style = style;
    this.cssClass = cssClass;
  }

  public render(x: number, y: number, content: string): void {
    console.log(
      `Button[${this.style} ${this.cssClass}] at (${x}, ${y}): "${content}"`
    );
  }
}

export class InputElement implements WebElementFlyweight {
  private type: string;
  private cssClass: string;

  constructor(type: string, cssClass: string) {
    this.type = type;
    this.cssClass = cssClass;
  }

  public render(x: number, y: number, content: string): void {
    console.log(
      `Input[${this.type} ${this.cssClass}] at (${x}, ${y}): "${content}"`
    );
  }
}

export class WebElementFactory {
  private elements: Map<string, WebElementFlyweight> = new Map();

  public getButton(style: string, cssClass: string): WebElementFlyweight {
    const key = `button_${style}_${cssClass}`;

    if (!this.elements.has(key)) {
      console.log(`Creating new button element: ${key}`);
      this.elements.set(key, new ButtonElement(style, cssClass));
    }

    return this.elements.get(key)!;
  }

  public getInput(type: string, cssClass: string): WebElementFlyweight {
    const key = `input_${type}_${cssClass}`;

    if (!this.elements.has(key)) {
      console.log(`Creating new input element: ${key}`);
      this.elements.set(key, new InputElement(type, cssClass));
    }

    return this.elements.get(key)!;
  }

  public getCreatedElementsCount(): number {
    return this.elements.size;
  }
}

export class WebPage {
  private elements: {
    flyweight: WebElementFlyweight;
    x: number;
    y: number;
    content: string;
  }[] = [];
  private factory: WebElementFactory;

  constructor() {
    this.factory = new WebElementFactory();
  }

  public addButton(
    x: number,
    y: number,
    content: string,
    style: string,
    cssClass: string
  ): void {
    const flyweight = this.factory.getButton(style, cssClass);
    this.elements.push({ flyweight, x, y, content });
  }

  public addInput(
    x: number,
    y: number,
    content: string,
    type: string,
    cssClass: string
  ): void {
    const flyweight = this.factory.getInput(type, cssClass);
    this.elements.push({ flyweight, x, y, content });
  }

  public render(): void {
    console.log("Rendering web page...");
    for (const element of this.elements) {
      element.flyweight.render(element.x, element.y, element.content);
    }
    console.log(`Total elements: ${this.elements.length}`);
    console.log(
      `Element flyweights created: ${this.factory.getCreatedElementsCount()}`
    );
  }
}

// 象棋示例
export interface ChessPieceFlyweight {
  render(x: number, y: number, color: string): void;
  canMove(fromX: number, fromY: number, toX: number, toY: number): boolean;
}

export class PawnPiece implements ChessPieceFlyweight {
  public render(x: number, y: number, color: string): void {
    console.log(`${color} Pawn at (${x}, ${y})`);
  }

  public canMove(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): boolean {
    // 简化的兵走法规则
    return Math.abs(toY - fromY) === 1 && fromX === toX;
  }
}

export class RookPiece implements ChessPieceFlyweight {
  public render(x: number, y: number, color: string): void {
    console.log(`${color} Rook at (${x}, ${y})`);
  }

  public canMove(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): boolean {
    // 简化的车走法规则
    return fromX === toX || fromY === toY;
  }
}

export class ChessPieceFactory {
  private pieces: Map<string, ChessPieceFlyweight> = new Map();

  public getPiece(type: string): ChessPieceFlyweight {
    if (!this.pieces.has(type)) {
      console.log(`Creating new chess piece: ${type}`);
      switch (type) {
        case "pawn":
          this.pieces.set(type, new PawnPiece());
          break;
        case "rook":
          this.pieces.set(type, new RookPiece());
          break;
        default:
          throw new Error(`Unknown piece type: ${type}`);
      }
    }

    return this.pieces.get(type)!;
  }

  public getCreatedPiecesCount(): number {
    return this.pieces.size;
  }
}

export class ChessBoard {
  private pieces: {
    flyweight: ChessPieceFlyweight;
    x: number;
    y: number;
    color: string;
  }[] = [];
  private factory: ChessPieceFactory;

  constructor() {
    this.factory = new ChessPieceFactory();
  }

  public addPiece(type: string, x: number, y: number, color: string): void {
    const flyweight = this.factory.getPiece(type);
    this.pieces.push({ flyweight, x, y, color });
  }

  public render(): void {
    console.log("Chess board:");
    for (const piece of this.pieces) {
      piece.flyweight.render(piece.x, piece.y, piece.color);
    }
    console.log(`Total pieces: ${this.pieces.length}`);
    console.log(`Piece types created: ${this.factory.getCreatedPiecesCount()}`);
  }
}

// 使用示例
export function demonstrateFlyweight(): void {
  console.log("=== 享元模式示例 ===");

  // 基本享元示例
  const factory = new FlyweightFactory();

  const context1 = new Context(factory.getFlyweight("A"), "Context1");
  const context2 = new Context(factory.getFlyweight("B"), "Context2");
  const context3 = new Context(factory.getFlyweight("A"), "Context3");

  context1.operation();
  context2.operation();
  context3.operation();

  factory.listFlyweights();

  // 文本编辑器示例
  console.log("\n--- 文本编辑器示例 ---");
  const editor = new TextEditor();

  editor.addCharacter("H", "Arial", "black", 0, 12);
  editor.addCharacter("e", "Arial", "black", 1, 12);
  editor.addCharacter("l", "Arial", "black", 2, 12);
  editor.addCharacter("l", "Arial", "black", 3, 12);
  editor.addCharacter("o", "Arial", "black", 4, 12);
  editor.addCharacter(" ", "Arial", "black", 5, 12);
  editor.addCharacter("W", "Arial", "red", 6, 14);
  editor.addCharacter("o", "Arial", "red", 7, 14);
  editor.addCharacter("r", "Arial", "red", 8, 14);
  editor.addCharacter("l", "Arial", "red", 9, 14);
  editor.addCharacter("d", "Arial", "red", 10, 14);

  editor.render();

  // 粒子系统示例
  console.log("\n--- 粒子系统示例 ---");
  const particleSystem = new ParticleSystem();

  // 添加多个相同类型的粒子
  for (let i = 0; i < 5; i++) {
    particleSystem.addParticle(
      i * 10,
      i * 10,
      2,
      Math.PI / 4,
      "red",
      "circle",
      5
    );
  }

  for (let i = 0; i < 3; i++) {
    particleSystem.addParticle(
      i * 15,
      i * 15,
      3,
      Math.PI / 2,
      "blue",
      "square",
      3
    );
  }

  particleSystem.render();

  // 网页元素示例
  console.log("\n--- 网页元素示例 ---");
  const webPage = new WebPage();

  webPage.addButton(10, 10, "Submit", "primary", "btn-large");
  webPage.addButton(10, 50, "Cancel", "secondary", "btn-large");
  webPage.addButton(10, 90, "OK", "primary", "btn-large");
  webPage.addInput(10, 130, "Username", "text", "form-control");
  webPage.addInput(10, 170, "Password", "password", "form-control");
  webPage.addInput(10, 210, "Email", "email", "form-control");

  webPage.render();

  // 象棋示例
  console.log("\n--- 象棋示例 ---");
  const chessBoard = new ChessBoard();

  // 添加多个相同类型的棋子
  for (let i = 0; i < 8; i++) {
    chessBoard.addPiece("pawn", i, 1, "white");
    chessBoard.addPiece("pawn", i, 6, "black");
  }

  chessBoard.addPiece("rook", 0, 0, "white");
  chessBoard.addPiece("rook", 7, 0, "white");
  chessBoard.addPiece("rook", 0, 7, "black");
  chessBoard.addPiece("rook", 7, 7, "black");

  chessBoard.render();
}
