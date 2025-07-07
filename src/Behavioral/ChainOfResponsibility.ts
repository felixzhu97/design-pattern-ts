/**
 * 职责链模式 (Chain of Responsibility Pattern)
 * 避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止
 */

// 抽象处理者
export interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

// 抽象处理者基类
export abstract class AbstractHandler implements Handler {
  private nextHandler?: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// 具体处理者A
export class ConcreteHandlerA extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === "A") {
      return `ConcreteHandlerA: I'll handle the request ${request}`;
    }
    return super.handle(request);
  }
}

// 具体处理者B
export class ConcreteHandlerB extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === "B") {
      return `ConcreteHandlerB: I'll handle the request ${request}`;
    }
    return super.handle(request);
  }
}

// 具体处理者C
export class ConcreteHandlerC extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === "C") {
      return `ConcreteHandlerC: I'll handle the request ${request}`;
    }
    return super.handle(request);
  }
}

// 实际应用示例：技术支持系统
export abstract class SupportHandler {
  protected nextHandler?: SupportHandler;

  public setNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler;
  }

  public abstract canHandle(level: number): boolean;
  public abstract handleRequest(request: string, level: number): string;

  public handle(request: string, level: number): string {
    if (this.canHandle(level)) {
      return this.handleRequest(request, level);
    } else if (this.nextHandler) {
      return this.nextHandler.handle(request, level);
    } else {
      return "Request cannot be handled at any level";
    }
  }
}

// 一级支持
export class Level1Support extends SupportHandler {
  public canHandle(level: number): boolean {
    return level <= 1;
  }

  public handleRequest(request: string, level: number): string {
    return `Level 1 Support: Handling request "${request}" (Level ${level})`;
  }
}

// 二级支持
export class Level2Support extends SupportHandler {
  public canHandle(level: number): boolean {
    return level <= 2;
  }

  public handleRequest(request: string, level: number): string {
    return `Level 2 Support: Handling request "${request}" (Level ${level})`;
  }
}

// 三级支持
export class Level3Support extends SupportHandler {
  public canHandle(level: number): boolean {
    return level <= 3;
  }

  public handleRequest(request: string, level: number): string {
    return `Level 3 Support: Handling request "${request}" (Level ${level})`;
  }
}

// 经理支持
export class ManagerSupport extends SupportHandler {
  public canHandle(level: number): boolean {
    return level <= 4;
  }

  public handleRequest(request: string, level: number): string {
    return `Manager Support: Handling request "${request}" (Level ${level})`;
  }
}

// 请假审批系统示例
export interface LeaveRequest {
  employeeName: string;
  leaveDays: number;
  reason: string;
}

export abstract class Approver {
  protected nextApprover?: Approver;

  public setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  public abstract canApprove(days: number): boolean;
  public abstract processRequest(request: LeaveRequest): string;

  public approve(request: LeaveRequest): string {
    if (this.canApprove(request.leaveDays)) {
      return this.processRequest(request);
    } else if (this.nextApprover) {
      return this.nextApprover.approve(request);
    } else {
      return `Leave request for ${request.employeeName} (${request.leaveDays} days) requires higher approval`;
    }
  }
}

// 主管
export class Supervisor extends Approver {
  public canApprove(days: number): boolean {
    return days <= 2;
  }

  public processRequest(request: LeaveRequest): string {
    return `Supervisor approved ${request.employeeName}'s leave for ${request.leaveDays} days (${request.reason})`;
  }
}

// 经理
export class Manager extends Approver {
  public canApprove(days: number): boolean {
    return days <= 7;
  }

  public processRequest(request: LeaveRequest): string {
    return `Manager approved ${request.employeeName}'s leave for ${request.leaveDays} days (${request.reason})`;
  }
}

// 总监
export class Director extends Approver {
  public canApprove(days: number): boolean {
    return days <= 30;
  }

  public processRequest(request: LeaveRequest): string {
    return `Director approved ${request.employeeName}'s leave for ${request.leaveDays} days (${request.reason})`;
  }
}

// 日志处理系统示例
export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARNING = 3,
  ERROR = 4,
  CRITICAL = 5,
}

export abstract class Logger {
  protected level: LogLevel;
  protected nextLogger?: Logger;

  constructor(level: LogLevel) {
    this.level = level;
  }

  public setNext(logger: Logger): Logger {
    this.nextLogger = logger;
    return logger;
  }

  public log(level: LogLevel, message: string): void {
    if (this.level <= level) {
      this.write(message);
    }
    if (this.nextLogger) {
      this.nextLogger.log(level, message);
    }
  }

  protected abstract write(message: string): void;
}

export class ConsoleLogger extends Logger {
  protected write(message: string): void {
    console.log(`Console Logger: ${message}`);
  }
}

export class FileLogger extends Logger {
  protected write(message: string): void {
    console.log(`File Logger: ${message}`);
  }
}

export class EmailLogger extends Logger {
  protected write(message: string): void {
    console.log(`Email Logger: ${message}`);
  }
}

// 费用审批系统示例
export interface ExpenseRequest {
  employeeName: string;
  amount: number;
  description: string;
}

export abstract class ExpenseApprover {
  protected nextApprover?: ExpenseApprover;

  public setNext(approver: ExpenseApprover): ExpenseApprover {
    this.nextApprover = approver;
    return approver;
  }

  public abstract canApprove(amount: number): boolean;
  public abstract processRequest(request: ExpenseRequest): string;

  public approve(request: ExpenseRequest): string {
    if (this.canApprove(request.amount)) {
      return this.processRequest(request);
    } else if (this.nextApprover) {
      return this.nextApprover.approve(request);
    } else {
      return `Expense request for ${request.employeeName} ($${request.amount}) requires higher approval`;
    }
  }
}

export class TeamLead extends ExpenseApprover {
  public canApprove(amount: number): boolean {
    return amount <= 1000;
  }

  public processRequest(request: ExpenseRequest): string {
    return `Team Lead approved ${request.employeeName}'s expense of $${request.amount} (${request.description})`;
  }
}

export class DepartmentManager extends ExpenseApprover {
  public canApprove(amount: number): boolean {
    return amount <= 5000;
  }

  public processRequest(request: ExpenseRequest): string {
    return `Department Manager approved ${request.employeeName}'s expense of $${request.amount} (${request.description})`;
  }
}

export class CEO extends ExpenseApprover {
  public canApprove(amount: number): boolean {
    return amount <= 100000;
  }

  public processRequest(request: ExpenseRequest): string {
    return `CEO approved ${request.employeeName}'s expense of $${request.amount} (${request.description})`;
  }
}

// 使用示例
export function demonstrateChainOfResponsibility(): void {
  console.log("=== 职责链模式示例 ===");

  // 基本职责链示例
  const handlerA = new ConcreteHandlerA();
  const handlerB = new ConcreteHandlerB();
  const handlerC = new ConcreteHandlerC();

  handlerA.setNext(handlerB).setNext(handlerC);

  const requests = ["A", "B", "C", "D"];
  for (const request of requests) {
    console.log(`Request: ${request}`);
    const result = handlerA.handle(request);
    console.log(`Result: ${result || "No handler found"}`);
  }

  // 技术支持系统示例
  console.log("\n--- 技术支持系统示例 ---");
  const level1 = new Level1Support();
  const level2 = new Level2Support();
  const level3 = new Level3Support();
  const manager = new ManagerSupport();

  level1.setNext(level2).setNext(level3).setNext(manager);

  const supportRequests = [
    { request: "Password reset", level: 1 },
    { request: "Software installation", level: 2 },
    { request: "Server configuration", level: 3 },
    { request: "Budget approval", level: 4 },
    { request: "Strategic decision", level: 5 },
  ];

  for (const req of supportRequests) {
    console.log(level1.handle(req.request, req.level));
  }

  // 请假审批系统示例
  console.log("\n--- 请假审批系统示例 ---");
  const supervisor = new Supervisor();
  const manager1 = new Manager();
  const director = new Director();

  supervisor.setNext(manager1).setNext(director);

  const leaveRequests: LeaveRequest[] = [
    { employeeName: "Alice", leaveDays: 1, reason: "Sick leave" },
    { employeeName: "Bob", leaveDays: 5, reason: "Vacation" },
    { employeeName: "Charlie", leaveDays: 15, reason: "Maternity leave" },
    { employeeName: "Diana", leaveDays: 45, reason: "Sabbatical" },
  ];

  for (const request of leaveRequests) {
    console.log(supervisor.approve(request));
  }

  // 日志处理系统示例
  console.log("\n--- 日志处理系统示例 ---");
  const consoleLogger = new ConsoleLogger(LogLevel.DEBUG);
  const fileLogger = new FileLogger(LogLevel.INFO);
  const emailLogger = new EmailLogger(LogLevel.ERROR);

  consoleLogger.setNext(fileLogger).setNext(emailLogger);

  const logMessages = [
    { level: LogLevel.DEBUG, message: "Debug message" },
    { level: LogLevel.INFO, message: "Info message" },
    { level: LogLevel.WARNING, message: "Warning message" },
    { level: LogLevel.ERROR, message: "Error message" },
    { level: LogLevel.CRITICAL, message: "Critical message" },
  ];

  for (const log of logMessages) {
    console.log(`\nLogging ${LogLevel[log.level]}: ${log.message}`);
    consoleLogger.log(log.level, log.message);
  }

  // 费用审批系统示例
  console.log("\n--- 费用审批系统示例 ---");
  const teamLead = new TeamLead();
  const deptManager = new DepartmentManager();
  const ceo = new CEO();

  teamLead.setNext(deptManager).setNext(ceo);

  const expenseRequests: ExpenseRequest[] = [
    { employeeName: "Alice", amount: 500, description: "Office supplies" },
    { employeeName: "Bob", amount: 2500, description: "Conference attendance" },
    { employeeName: "Charlie", amount: 15000, description: "New equipment" },
    { employeeName: "Diana", amount: 150000, description: "Office renovation" },
  ];

  for (const request of expenseRequests) {
    console.log(teamLead.approve(request));
  }
}
