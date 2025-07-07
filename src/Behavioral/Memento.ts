/**
 * 备忘录模式 (Memento Pattern)
 *
 * 定义：在不违背封装原则的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，
 * 以便之后当需要时能将该对象恢复到原先保存的状态。
 *
 * 主要角色：
 * 1. Originator（发起者）：需要保存状态的对象，创建备忘录来记录当前状态
 * 2. Memento（备忘录）：保存发起者的内部状态，防止发起者以外的对象访问备忘录
 * 3. Caretaker（管理者）：负责保存备忘录，但不能对备忘录的内容进行操作或检查
 */

// =============================================================================
// 基本备忘录实现
// =============================================================================

/**
 * 备忘录接口
 */
interface Memento {
  getState(): string;
  getName(): string;
  getDate(): Date;
}

/**
 * 具体备忘录
 */
class ConcreteMemento implements Memento {
  private state: string;
  private name: string;
  private date: Date;

  constructor(state: string, name: string) {
    this.state = state;
    this.name = name;
    this.date = new Date();
  }

  getState(): string {
    return this.state;
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }
}

/**
 * 发起者
 */
class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  setState(state: string): void {
    console.log(`Originator: 设置状态为 ${state}`);
    this.state = state;
  }

  getState(): string {
    return this.state;
  }

  save(): Memento {
    console.log(`Originator: 保存状态 ${this.state}`);
    return new ConcreteMemento(this.state, `状态_${this.state}`);
  }

  restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator: 恢复状态为 ${this.state}`);
  }
}

/**
 * 管理者
 */
class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  backup(): void {
    console.log("Caretaker: 保存发起者状态");
    this.mementos.push(this.originator.save());
  }

  undo(): void {
    if (this.mementos.length === 0) {
      console.log("Caretaker: 没有可恢复的状态");
      return;
    }

    const memento = this.mementos.pop()!;
    console.log(`Caretaker: 恢复状态 ${memento.getName()}`);
    this.originator.restore(memento);
  }

  showHistory(): void {
    console.log("Caretaker: 历史记录：");
    this.mementos.forEach((memento, index) => {
      console.log(
        `  ${index}: ${memento.getName()} (${memento
          .getDate()
          .toLocaleString()})`
      );
    });
  }
}

// =============================================================================
// 示例1：文本编辑器
// =============================================================================

/**
 * 文本编辑器备忘录
 */
class TextEditorMemento implements Memento {
  private content: string;
  private cursorPosition: number;
  private name: string;
  private date: Date;

  constructor(content: string, cursorPosition: number, name: string) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.name = name;
    this.date = new Date();
  }

  getState(): string {
    return JSON.stringify({
      content: this.content,
      cursorPosition: this.cursorPosition,
    });
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }

  getContent(): string {
    return this.content;
  }

  getCursorPosition(): number {
    return this.cursorPosition;
  }
}

/**
 * 文本编辑器
 */
class TextEditor {
  private content: string = "";
  private cursorPosition: number = 0;

  type(text: string): void {
    const before = this.content.substring(0, this.cursorPosition);
    const after = this.content.substring(this.cursorPosition);
    this.content = before + text + after;
    this.cursorPosition += text.length;
    console.log(`输入: "${text}"`);
    console.log(`当前内容: "${this.content}"`);
  }

  delete(length: number): void {
    if (this.cursorPosition >= length) {
      const before = this.content.substring(0, this.cursorPosition - length);
      const after = this.content.substring(this.cursorPosition);
      this.content = before + after;
      this.cursorPosition -= length;
      console.log(`删除 ${length} 个字符`);
      console.log(`当前内容: "${this.content}"`);
    }
  }

  setCursorPosition(position: number): void {
    this.cursorPosition = Math.max(0, Math.min(position, this.content.length));
    console.log(`光标位置: ${this.cursorPosition}`);
  }

  getContent(): string {
    return this.content;
  }

  getCursorPosition(): number {
    return this.cursorPosition;
  }

  save(): TextEditorMemento {
    return new TextEditorMemento(
      this.content,
      this.cursorPosition,
      `编辑状态_${new Date().toLocaleTimeString()}`
    );
  }

  restore(memento: TextEditorMemento): void {
    this.content = memento.getContent();
    this.cursorPosition = memento.getCursorPosition();
    console.log(`恢复编辑器状态`);
    console.log(`内容: "${this.content}"`);
    console.log(`光标位置: ${this.cursorPosition}`);
  }
}

/**
 * 文本编辑器历史管理器
 */
class TextEditorHistory {
  private history: TextEditorMemento[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 10;

  saveState(memento: TextEditorMemento): void {
    // 如果不是在历史记录的末尾，删除后面的记录
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    this.history.push(memento);
    this.currentIndex++;

    // 限制历史记录大小
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.currentIndex--;
    }

    console.log(`保存状态: ${memento.getName()}`);
  }

  undo(): TextEditorMemento | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      console.log(`撤销到: ${this.history[this.currentIndex].getName()}`);
      return this.history[this.currentIndex];
    }
    console.log("无法撤销");
    return null;
  }

  redo(): TextEditorMemento | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      console.log(`重做到: ${this.history[this.currentIndex].getName()}`);
      return this.history[this.currentIndex];
    }
    console.log("无法重做");
    return null;
  }

  showHistory(): void {
    console.log("编辑历史:");
    this.history.forEach((memento, index) => {
      const marker = index === this.currentIndex ? "* " : "  ";
      console.log(`${marker}${index}: ${memento.getName()}`);
    });
  }
}

// =============================================================================
// 示例2：游戏存档系统
// =============================================================================

/**
 * 游戏状态
 */
interface GameState {
  level: number;
  score: number;
  health: number;
  position: { x: number; y: number };
  inventory: string[];
}

/**
 * 游戏存档
 */
class GameSave implements Memento {
  private gameState: GameState;
  private name: string;
  private date: Date;

  constructor(gameState: GameState, name: string) {
    this.gameState = { ...gameState, inventory: [...gameState.inventory] };
    this.name = name;
    this.date = new Date();
  }

  getState(): string {
    return JSON.stringify(this.gameState);
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }

  getGameState(): GameState {
    return { ...this.gameState, inventory: [...this.gameState.inventory] };
  }
}

/**
 * 游戏
 */
class Game {
  private state: GameState;

  constructor() {
    this.state = {
      level: 1,
      score: 0,
      health: 100,
      position: { x: 0, y: 0 },
      inventory: [],
    };
  }

  play(): void {
    console.log("开始游戏...");
    this.showStatus();
  }

  levelUp(): void {
    this.state.level++;
    this.state.score += 1000;
    this.state.health = 100;
    console.log(`升级到第 ${this.state.level} 关！`);
    this.showStatus();
  }

  takeDamage(damage: number): void {
    this.state.health -= damage;
    if (this.state.health < 0) this.state.health = 0;
    console.log(`受到 ${damage} 点伤害，剩余生命值: ${this.state.health}`);
  }

  heal(amount: number): void {
    this.state.health += amount;
    if (this.state.health > 100) this.state.health = 100;
    console.log(`恢复 ${amount} 点生命值，当前生命值: ${this.state.health}`);
  }

  move(x: number, y: number): void {
    this.state.position.x += x;
    this.state.position.y += y;
    console.log(
      `移动到位置 (${this.state.position.x}, ${this.state.position.y})`
    );
  }

  addItem(item: string): void {
    this.state.inventory.push(item);
    console.log(`获得物品: ${item}`);
  }

  gainScore(points: number): void {
    this.state.score += points;
    console.log(`获得 ${points} 分，总分: ${this.state.score}`);
  }

  showStatus(): void {
    console.log(`游戏状态:`);
    console.log(`  关卡: ${this.state.level}`);
    console.log(`  分数: ${this.state.score}`);
    console.log(`  生命值: ${this.state.health}`);
    console.log(`  位置: (${this.state.position.x}, ${this.state.position.y})`);
    console.log(`  物品: [${this.state.inventory.join(", ")}]`);
  }

  save(saveName: string): GameSave {
    console.log(`保存游戏: ${saveName}`);
    return new GameSave(this.state, saveName);
  }

  load(gameSave: GameSave): void {
    this.state = gameSave.getGameState();
    console.log(`加载游戏: ${gameSave.getName()}`);
    this.showStatus();
  }
}

/**
 * 游戏存档管理器
 */
class GameSaveManager {
  private saves: GameSave[] = [];
  private maxSaves: number = 5;

  savegame(gameSave: GameSave): void {
    this.saves.push(gameSave);
    if (this.saves.length > this.maxSaves) {
      this.saves.shift();
    }
    console.log(`存档已保存: ${gameSave.getName()}`);
  }

  loadGame(index: number): GameSave | null {
    if (index >= 0 && index < this.saves.length) {
      return this.saves[index];
    }
    console.log("无效的存档索引");
    return null;
  }

  listSaves(): void {
    console.log("游戏存档列表:");
    this.saves.forEach((save, index) => {
      console.log(
        `  ${index}: ${save.getName()} (${save.getDate().toLocaleString()})`
      );
    });
  }

  deleteSave(index: number): void {
    if (index >= 0 && index < this.saves.length) {
      const deleted = this.saves.splice(index, 1)[0];
      console.log(`删除存档: ${deleted.getName()}`);
    }
  }
}

// =============================================================================
// 示例3：计算器状态管理
// =============================================================================

/**
 * 计算器备忘录
 */
class CalculatorMemento implements Memento {
  private value: number;
  private operation: string;
  private name: string;
  private date: Date;

  constructor(value: number, operation: string, name: string) {
    this.value = value;
    this.operation = operation;
    this.name = name;
    this.date = new Date();
  }

  getState(): string {
    return JSON.stringify({ value: this.value, operation: this.operation });
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }

  getValue(): number {
    return this.value;
  }

  getOperation(): string {
    return this.operation;
  }
}

/**
 * 计算器
 */
class Calculator {
  private currentValue: number = 0;
  private lastOperation: string = "";

  add(value: number): void {
    this.currentValue += value;
    this.lastOperation = `+${value}`;
    console.log(`${this.lastOperation} = ${this.currentValue}`);
  }

  subtract(value: number): void {
    this.currentValue -= value;
    this.lastOperation = `-${value}`;
    console.log(`${this.lastOperation} = ${this.currentValue}`);
  }

  multiply(value: number): void {
    this.currentValue *= value;
    this.lastOperation = `*${value}`;
    console.log(`${this.lastOperation} = ${this.currentValue}`);
  }

  divide(value: number): void {
    if (value !== 0) {
      this.currentValue /= value;
      this.lastOperation = `/${value}`;
      console.log(`${this.lastOperation} = ${this.currentValue}`);
    } else {
      console.log("错误：不能除以零");
    }
  }

  clear(): void {
    this.currentValue = 0;
    this.lastOperation = "clear";
    console.log("清零");
  }

  getCurrentValue(): number {
    return this.currentValue;
  }

  save(): CalculatorMemento {
    return new CalculatorMemento(
      this.currentValue,
      this.lastOperation,
      `计算状态_${this.currentValue}`
    );
  }

  restore(memento: CalculatorMemento): void {
    this.currentValue = memento.getValue();
    this.lastOperation = memento.getOperation();
    console.log(`恢复计算器状态: ${this.currentValue} (${this.lastOperation})`);
  }
}

// =============================================================================
// 演示函数
// =============================================================================

/**
 * 演示备忘录模式的使用
 */
export function demonstrateMementoPattern(): void {
  console.log("=== 备忘录模式演示 ===\n");

  // 1. 基本备忘录演示
  console.log("1. 基本备忘录：");
  const originator = new Originator("状态A");
  const caretaker = new Caretaker(originator);

  caretaker.backup();
  originator.setState("状态B");
  caretaker.backup();
  originator.setState("状态C");
  caretaker.showHistory();
  caretaker.undo();
  caretaker.undo();

  // 2. 文本编辑器演示
  console.log("\n2. 文本编辑器备忘录：");
  const editor = new TextEditor();
  const editorHistory = new TextEditorHistory();

  // 初始状态
  editorHistory.saveState(editor.save());

  editor.type("Hello");
  editorHistory.saveState(editor.save());

  editor.type(" World");
  editorHistory.saveState(editor.save());

  editor.type("!");
  editorHistory.saveState(editor.save());

  console.log("\n撤销操作：");
  let memento = editorHistory.undo();
  if (memento) editor.restore(memento);

  memento = editorHistory.undo();
  if (memento) editor.restore(memento);

  console.log("\n重做操作：");
  memento = editorHistory.redo();
  if (memento) editor.restore(memento);

  // 3. 游戏存档演示
  console.log("\n3. 游戏存档系统：");
  const game = new Game();
  const saveManager = new GameSaveManager();

  game.play();
  saveManager.savegame(game.save("初始存档"));

  game.levelUp();
  game.addItem("剑");
  game.move(10, 5);
  saveManager.savegame(game.save("第2关开始"));

  game.gainScore(500);
  game.takeDamage(30);
  game.addItem("盾牌");
  saveManager.savegame(game.save("获得盾牌"));

  console.log("\n存档列表：");
  saveManager.listSaves();

  console.log("\n加载之前的存档：");
  const loadedSave = saveManager.loadGame(1);
  if (loadedSave) {
    game.load(loadedSave);
  }

  // 4. 计算器演示
  console.log("\n4. 计算器备忘录：");
  const calculator = new Calculator();
  const calcHistory: CalculatorMemento[] = [];

  calculator.add(10);
  calcHistory.push(calculator.save());

  calculator.multiply(2);
  calcHistory.push(calculator.save());

  calculator.subtract(5);
  calcHistory.push(calculator.save());

  console.log("\n恢复到之前的状态：");
  calculator.restore(calcHistory[1]);

  console.log("\n=== 备忘录模式演示完成 ===");
}

// 导出所有类和接口
export {
  Memento,
  ConcreteMemento,
  Originator,
  Caretaker,
  TextEditorMemento,
  TextEditor,
  TextEditorHistory,
  GameState,
  GameSave,
  Game,
  GameSaveManager,
  CalculatorMemento,
  Calculator,
};
