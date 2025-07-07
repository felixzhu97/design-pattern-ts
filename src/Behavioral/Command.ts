/**
 * 命令模式 (Command Pattern)
 * 将一个请求封装成一个对象，从而使您可以用不同的请求对客户进行参数化
 */

// 命令接口
export interface Command {
  execute(): void;
  undo?(): void;
}

// 接收者
export class Receiver {
  public doSomething(message: string): void {
    console.log(`Receiver: Working on (${message})`);
  }

  public doSomethingElse(message: string): void {
    console.log(`Receiver: Also working on (${message})`);
  }
}

// 简单命令
export class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }

  public execute(): void {
    console.log(
      `SimpleCommand: See, I can do simple things like printing (${this.payload})`
    );
  }
}

// 复杂命令
export class ComplexCommand implements Command {
  private receiver: Receiver;
  private a: string;
  private b: string;

  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }

  public execute(): void {
    console.log(
      "ComplexCommand: Complex stuff should be done by a receiver object"
    );
    this.receiver.doSomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

// 调用者
export class Invoker {
  private onStart?: Command;
  private onFinish?: Command;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log("Invoker: Does anybody want something done before I begin?");
    if (this.onStart) {
      this.onStart.execute();
    }

    console.log("Invoker: ...doing something really important...");

    console.log("Invoker: Does anybody want something done after I finish?");
    if (this.onFinish) {
      this.onFinish.execute();
    }
  }
}

// 实际应用示例：文本编辑器
export interface TextCommand {
  execute(): void;
  undo(): void;
}

export class TextEditor {
  private content: string = "";

  public write(text: string): void {
    this.content += text;
  }

  public delete(length: number): void {
    this.content = this.content.slice(0, -length);
  }

  public getContent(): string {
    return this.content;
  }
}

export class WriteCommand implements TextCommand {
  private editor: TextEditor;
  private text: string;

  constructor(editor: TextEditor, text: string) {
    this.editor = editor;
    this.text = text;
  }

  public execute(): void {
    this.editor.write(this.text);
  }

  public undo(): void {
    this.editor.delete(this.text.length);
  }
}

export class DeleteCommand implements TextCommand {
  private editor: TextEditor;
  private length: number;
  private deletedText: string = "";

  constructor(editor: TextEditor, length: number) {
    this.editor = editor;
    this.length = length;
  }

  public execute(): void {
    const content = this.editor.getContent();
    this.deletedText = content.slice(-this.length);
    this.editor.delete(this.length);
  }

  public undo(): void {
    this.editor.write(this.deletedText);
  }
}

export class EditorInvoker {
  private history: TextCommand[] = [];
  private currentPosition: number = -1;

  public executeCommand(command: TextCommand): void {
    // 删除当前位置之后的历史记录
    this.history = this.history.slice(0, this.currentPosition + 1);

    command.execute();
    this.history.push(command);
    this.currentPosition++;
  }

  public undo(): void {
    if (this.currentPosition >= 0) {
      const command = this.history[this.currentPosition];
      command.undo();
      this.currentPosition--;
    }
  }

  public redo(): void {
    if (this.currentPosition < this.history.length - 1) {
      this.currentPosition++;
      const command = this.history[this.currentPosition];
      command.execute();
    }
  }
}

// 家电控制示例
export interface Device {
  on(): void;
  off(): void;
  getStatus(): string;
}

export class Television implements Device {
  private isOn: boolean = false;

  public on(): void {
    this.isOn = true;
    console.log("Television is ON");
  }

  public off(): void {
    this.isOn = false;
    console.log("Television is OFF");
  }

  public getStatus(): string {
    return this.isOn ? "ON" : "OFF";
  }
}

export class Stereo implements Device {
  private isOn: boolean = false;

  public on(): void {
    this.isOn = true;
    console.log("Stereo is ON");
  }

  public off(): void {
    this.isOn = false;
    console.log("Stereo is OFF");
  }

  public getStatus(): string {
    return this.isOn ? "ON" : "OFF";
  }
}

export class OnCommand implements Command {
  private device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public execute(): void {
    this.device.on();
  }

  public undo(): void {
    this.device.off();
  }
}

export class OffCommand implements Command {
  private device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public execute(): void {
    this.device.off();
  }

  public undo(): void {
    this.device.on();
  }
}

export class NoCommand implements Command {
  public execute(): void {
    // 空实现
  }

  public undo(): void {
    // 空实现
  }
}

export class RemoteControl {
  private onCommands: Command[] = [];
  private offCommands: Command[] = [];
  private undoCommand: Command = new NoCommand();

  constructor() {
    for (let i = 0; i < 7; i++) {
      this.onCommands[i] = new NoCommand();
      this.offCommands[i] = new NoCommand();
    }
  }

  public setCommand(
    slot: number,
    onCommand: Command,
    offCommand: Command
  ): void {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  public onButtonPressed(slot: number): void {
    this.onCommands[slot].execute();
    this.undoCommand = this.onCommands[slot];
  }

  public offButtonPressed(slot: number): void {
    this.offCommands[slot].execute();
    this.undoCommand = this.offCommands[slot];
  }

  public undoButtonPressed(): void {
    this.undoCommand.undo?.();
  }
}

// 宏命令示例
export class MacroCommand implements Command {
  private commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  public execute(): void {
    for (const command of this.commands) {
      command.execute();
    }
  }

  public undo(): void {
    // 反向执行撤销操作
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo?.();
    }
  }
}

// 文件操作命令示例
export interface FileOperation {
  execute(): void;
  undo(): void;
}

export class FileSystem {
  private files: Map<string, string> = new Map();

  public createFile(name: string, content: string): void {
    this.files.set(name, content);
    console.log(`Created file: ${name}`);
  }

  public deleteFile(name: string): string {
    const content = this.files.get(name) || "";
    this.files.delete(name);
    console.log(`Deleted file: ${name}`);
    return content;
  }

  public fileExists(name: string): boolean {
    return this.files.has(name);
  }

  public getFileContent(name: string): string {
    return this.files.get(name) || "";
  }
}

export class CreateFileCommand implements FileOperation {
  private fileSystem: FileSystem;
  private fileName: string;
  private content: string;

  constructor(fileSystem: FileSystem, fileName: string, content: string) {
    this.fileSystem = fileSystem;
    this.fileName = fileName;
    this.content = content;
  }

  public execute(): void {
    this.fileSystem.createFile(this.fileName, this.content);
  }

  public undo(): void {
    this.fileSystem.deleteFile(this.fileName);
  }
}

export class DeleteFileCommand implements FileOperation {
  private fileSystem: FileSystem;
  private fileName: string;
  private deletedContent: string = "";

  constructor(fileSystem: FileSystem, fileName: string) {
    this.fileSystem = fileSystem;
    this.fileName = fileName;
  }

  public execute(): void {
    this.deletedContent = this.fileSystem.deleteFile(this.fileName);
  }

  public undo(): void {
    this.fileSystem.createFile(this.fileName, this.deletedContent);
  }
}

export class FileManager {
  private history: FileOperation[] = [];
  private currentPosition: number = -1;

  public executeOperation(operation: FileOperation): void {
    // 删除当前位置之后的历史记录
    this.history = this.history.slice(0, this.currentPosition + 1);

    operation.execute();
    this.history.push(operation);
    this.currentPosition++;
  }

  public undo(): void {
    if (this.currentPosition >= 0) {
      const operation = this.history[this.currentPosition];
      operation.undo();
      this.currentPosition--;
    } else {
      console.log("Nothing to undo");
    }
  }

  public redo(): void {
    if (this.currentPosition < this.history.length - 1) {
      this.currentPosition++;
      const operation = this.history[this.currentPosition];
      operation.execute();
    } else {
      console.log("Nothing to redo");
    }
  }
}

// 使用示例
export function demonstrateCommand(): void {
  console.log("=== 命令模式示例 ===");

  // 基本命令示例
  const invoker = new Invoker();
  invoker.setOnStart(new SimpleCommand("Say Hi!"));

  const receiver = new Receiver();
  invoker.setOnFinish(
    new ComplexCommand(receiver, "Send email", "Save report")
  );

  invoker.doSomethingImportant();

  // 文本编辑器示例
  console.log("\n--- 文本编辑器示例 ---");
  const editor = new TextEditor();
  const editorInvoker = new EditorInvoker();

  editorInvoker.executeCommand(new WriteCommand(editor, "Hello "));
  console.log("Content:", editor.getContent());

  editorInvoker.executeCommand(new WriteCommand(editor, "World!"));
  console.log("Content:", editor.getContent());

  editorInvoker.executeCommand(new DeleteCommand(editor, 6));
  console.log("Content:", editor.getContent());

  console.log("Undoing...");
  editorInvoker.undo();
  console.log("Content:", editor.getContent());

  console.log("Undoing...");
  editorInvoker.undo();
  console.log("Content:", editor.getContent());

  console.log("Redoing...");
  editorInvoker.redo();
  console.log("Content:", editor.getContent());

  // 遥控器示例
  console.log("\n--- 遥控器示例 ---");
  const remoteControl = new RemoteControl();

  const tv = new Television();
  const stereo = new Stereo();

  const tvOnCommand = new OnCommand(tv);
  const tvOffCommand = new OffCommand(tv);
  const stereoOnCommand = new OnCommand(stereo);
  const stereoOffCommand = new OffCommand(stereo);

  remoteControl.setCommand(0, tvOnCommand, tvOffCommand);
  remoteControl.setCommand(1, stereoOnCommand, stereoOffCommand);

  console.log("Pressing TV ON button...");
  remoteControl.onButtonPressed(0);

  console.log("Pressing Stereo ON button...");
  remoteControl.onButtonPressed(1);

  console.log("Pressing TV OFF button...");
  remoteControl.offButtonPressed(0);

  console.log("Pressing UNDO button...");
  remoteControl.undoButtonPressed();

  // 宏命令示例
  console.log("\n--- 宏命令示例 ---");
  const partyMacro = new MacroCommand([tvOnCommand, stereoOnCommand]);
  const partyOffMacro = new MacroCommand([tvOffCommand, stereoOffCommand]);

  remoteControl.setCommand(2, partyMacro, partyOffMacro);

  console.log("Pressing Party ON macro...");
  remoteControl.onButtonPressed(2);

  console.log("Pressing Party OFF macro...");
  remoteControl.offButtonPressed(2);

  console.log("Pressing UNDO button...");
  remoteControl.undoButtonPressed();

  // 文件操作示例
  console.log("\n--- 文件操作示例 ---");
  const fileSystem = new FileSystem();
  const fileManager = new FileManager();

  fileManager.executeOperation(
    new CreateFileCommand(fileSystem, "document.txt", "Hello World")
  );
  fileManager.executeOperation(
    new CreateFileCommand(fileSystem, "readme.md", "# README")
  );
  fileManager.executeOperation(
    new DeleteFileCommand(fileSystem, "document.txt")
  );

  console.log("Undoing delete...");
  fileManager.undo();

  console.log("Undoing create readme...");
  fileManager.undo();

  console.log("Redoing create readme...");
  fileManager.redo();
}
