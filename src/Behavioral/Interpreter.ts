/**
 * 解释器模式 (Interpreter Pattern)
 *
 * 定义：定义语言的文法，并建立一个解释器来解释该语言中的句子。
 *
 * 主要角色：
 * 1. AbstractExpression（抽象表达式）：定义解释器的接口，约定解释器的解释操作
 * 2. TerminalExpression（终结符表达式）：实现语法中与终结符相关的解释操作
 * 3. NonTerminalExpression（非终结符表达式）：实现语法中与非终结符相关的解释操作
 * 4. Context（上下文）：包含解释器之外的一些全局信息
 */

// =============================================================================
// 基本解释器实现
// =============================================================================

/**
 * 上下文类
 */
class Context {
  private variables: Map<string, number> = new Map();

  setVariable(name: string, value: number): void {
    this.variables.set(name, value);
  }

  getVariable(name: string): number {
    return this.variables.get(name) || 0;
  }

  hasVariable(name: string): boolean {
    return this.variables.has(name);
  }

  toString(): string {
    return Array.from(this.variables.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join(", ");
  }
}

/**
 * 抽象表达式
 */
abstract class AbstractExpression {
  abstract interpret(context: Context): number;
}

/**
 * 终结符表达式：数字
 */
class NumberExpression extends AbstractExpression {
  private value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  interpret(context: Context): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}

/**
 * 终结符表达式：变量
 */
class VariableExpression extends AbstractExpression {
  private name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  interpret(context: Context): number {
    return context.getVariable(this.name);
  }

  toString(): string {
    return this.name;
  }
}

/**
 * 非终结符表达式：加法
 */
class AddExpression extends AbstractExpression {
  private left: AbstractExpression;
  private right: AbstractExpression;

  constructor(left: AbstractExpression, right: AbstractExpression) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context: Context): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }

  toString(): string {
    return `(${this.left.toString()} + ${this.right.toString()})`;
  }
}

/**
 * 非终结符表达式：减法
 */
class SubtractExpression extends AbstractExpression {
  private left: AbstractExpression;
  private right: AbstractExpression;

  constructor(left: AbstractExpression, right: AbstractExpression) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context: Context): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }

  toString(): string {
    return `(${this.left.toString()} - ${this.right.toString()})`;
  }
}

/**
 * 非终结符表达式：乘法
 */
class MultiplyExpression extends AbstractExpression {
  private left: AbstractExpression;
  private right: AbstractExpression;

  constructor(left: AbstractExpression, right: AbstractExpression) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context: Context): number {
    return this.left.interpret(context) * this.right.interpret(context);
  }

  toString(): string {
    return `(${this.left.toString()} * ${this.right.toString()})`;
  }
}

/**
 * 非终结符表达式：除法
 */
class DivideExpression extends AbstractExpression {
  private left: AbstractExpression;
  private right: AbstractExpression;

  constructor(left: AbstractExpression, right: AbstractExpression) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context: Context): number {
    const rightValue = this.right.interpret(context);
    if (rightValue === 0) {
      throw new Error("除数不能为零");
    }
    return this.left.interpret(context) / rightValue;
  }

  toString(): string {
    return `(${this.left.toString()} / ${this.right.toString()})`;
  }
}

// =============================================================================
// 示例1：简单计算器解释器
// =============================================================================

/**
 * 计算器解释器
 */
class Calculator {
  private context: Context;

  constructor() {
    this.context = new Context();
  }

  setVariable(name: string, value: number): void {
    this.context.setVariable(name, value);
  }

  evaluate(expression: string): number {
    const tokens = this.tokenize(expression);
    const ast = this.parse(tokens);
    return ast.interpret(this.context);
  }

  private tokenize(expression: string): string[] {
    return expression.match(/\d+|\w+|[+\-*/()]/g) || [];
  }

  private parse(tokens: string[]): AbstractExpression {
    const stack: AbstractExpression[] = [];
    const operators: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (this.isNumber(token)) {
        stack.push(new NumberExpression(parseFloat(token)));
      } else if (this.isVariable(token)) {
        stack.push(new VariableExpression(token));
      } else if (this.isOperator(token)) {
        while (
          operators.length > 0 &&
          this.precedence(operators[operators.length - 1]) >=
            this.precedence(token)
        ) {
          const op = operators.pop()!;
          const right = stack.pop()!;
          const left = stack.pop()!;
          stack.push(this.createExpression(op, left, right));
        }
        operators.push(token);
      } else if (token === "(") {
        operators.push(token);
      } else if (token === ")") {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "("
        ) {
          const op = operators.pop()!;
          const right = stack.pop()!;
          const left = stack.pop()!;
          stack.push(this.createExpression(op, left, right));
        }
        operators.pop(); // 移除左括号
      }
    }

    while (operators.length > 0) {
      const op = operators.pop()!;
      const right = stack.pop()!;
      const left = stack.pop()!;
      stack.push(this.createExpression(op, left, right));
    }

    return stack[0];
  }

  private isNumber(token: string): boolean {
    return /^\d+$/.test(token);
  }

  private isVariable(token: string): boolean {
    return /^[a-zA-Z]\w*$/.test(token);
  }

  private isOperator(token: string): boolean {
    return ["+", "-", "*", "/"].includes(token);
  }

  private precedence(operator: string): number {
    switch (operator) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return 0;
    }
  }

  private createExpression(
    operator: string,
    left: AbstractExpression,
    right: AbstractExpression
  ): AbstractExpression {
    switch (operator) {
      case "+":
        return new AddExpression(left, right);
      case "-":
        return new SubtractExpression(left, right);
      case "*":
        return new MultiplyExpression(left, right);
      case "/":
        return new DivideExpression(left, right);
      default:
        throw new Error(`未知运算符: ${operator}`);
    }
  }
}

// =============================================================================
// 示例2：SQL查询解释器
// =============================================================================

/**
 * SQL上下文
 */
class SQLContext {
  private tables: Map<string, any[]> = new Map();

  addTable(name: string, data: any[]): void {
    this.tables.set(name, data);
  }

  getTable(name: string): any[] {
    return this.tables.get(name) || [];
  }

  hasTable(name: string): boolean {
    return this.tables.has(name);
  }
}

/**
 * SQL抽象表达式
 */
abstract class SQLExpression {
  abstract interpret(context: SQLContext): any[];
}

/**
 * SELECT表达式
 */
class SelectExpression extends SQLExpression {
  private columns: string[];
  private table: string;
  private whereClause?: WhereExpression;

  constructor(columns: string[], table: string, whereClause?: WhereExpression) {
    super();
    this.columns = columns;
    this.table = table;
    this.whereClause = whereClause;
  }

  interpret(context: SQLContext): any[] {
    let data = context.getTable(this.table);

    if (this.whereClause) {
      data = data.filter((row) => this.whereClause!.evaluate(row));
    }

    if (this.columns.includes("*")) {
      return data;
    }

    return data.map((row) => {
      const result: any = {};
      this.columns.forEach((col) => {
        if (row.hasOwnProperty(col)) {
          result[col] = row[col];
        }
      });
      return result;
    });
  }
}

/**
 * WHERE表达式
 */
class WhereExpression {
  private column: string;
  private operator: string;
  private value: any;

  constructor(column: string, operator: string, value: any) {
    this.column = column;
    this.operator = operator;
    this.value = value;
  }

  evaluate(row: any): boolean {
    const columnValue = row[this.column];

    switch (this.operator) {
      case "=":
        return columnValue === this.value;
      case "!=":
        return columnValue !== this.value;
      case ">":
        return columnValue > this.value;
      case "<":
        return columnValue < this.value;
      case ">=":
        return columnValue >= this.value;
      case "<=":
        return columnValue <= this.value;
      case "LIKE":
        return columnValue.toString().includes(this.value.toString());
      default:
        return false;
    }
  }
}

/**
 * 简单SQL解释器
 */
class SQLInterpreter {
  private context: SQLContext;

  constructor() {
    this.context = new SQLContext();
  }

  addTable(name: string, data: any[]): void {
    this.context.addTable(name, data);
  }

  execute(sql: string): any[] {
    const expression = this.parseSQL(sql);
    return expression.interpret(this.context);
  }

  private parseSQL(sql: string): SQLExpression {
    // 简化的SQL解析（仅支持基本的SELECT语句）
    const selectMatch = sql.match(
      /SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i
    );

    if (!selectMatch) {
      throw new Error("不支持的SQL语法");
    }

    const columns = selectMatch[1].split(",").map((col) => col.trim());
    const table = selectMatch[2];
    const whereClause = selectMatch[3];

    let whereExpression: WhereExpression | undefined;
    if (whereClause) {
      const whereMatch = whereClause.match(
        /(\w+)\s*(=|!=|>|<|>=|<=|LIKE)\s*(.+)/i
      );
      if (whereMatch) {
        const column = whereMatch[1];
        const operator = whereMatch[2];
        let value: any = whereMatch[3];

        // 处理字符串值
        if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        } else if (!isNaN(value)) {
          value = parseFloat(value);
        }

        whereExpression = new WhereExpression(column, operator, value);
      }
    }

    return new SelectExpression(columns, table, whereExpression);
  }
}

// =============================================================================
// 示例3：正则表达式解释器
// =============================================================================

/**
 * 正则表达式上下文
 */
class RegexContext {
  private input: string;
  private position: number;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
  }

  getCurrentChar(): string {
    return this.position < this.input.length ? this.input[this.position] : "";
  }

  advance(): void {
    this.position++;
  }

  getPosition(): number {
    return this.position;
  }

  setPosition(position: number): void {
    this.position = position;
  }

  isAtEnd(): boolean {
    return this.position >= this.input.length;
  }

  getInput(): string {
    return this.input;
  }
}

/**
 * 正则表达式抽象表达式
 */
abstract class RegexExpression {
  abstract match(context: RegexContext): boolean;
}

/**
 * 字符匹配表达式
 */
class CharacterExpression extends RegexExpression {
  private char: string;

  constructor(char: string) {
    super();
    this.char = char;
  }

  match(context: RegexContext): boolean {
    if (context.getCurrentChar() === this.char) {
      context.advance();
      return true;
    }
    return false;
  }
}

/**
 * 点号匹配表达式（匹配任意字符）
 */
class DotExpression extends RegexExpression {
  match(context: RegexContext): boolean {
    if (!context.isAtEnd()) {
      context.advance();
      return true;
    }
    return false;
  }
}

/**
 * 序列匹配表达式
 */
class SequenceExpression extends RegexExpression {
  private expressions: RegexExpression[];

  constructor(expressions: RegexExpression[]) {
    super();
    this.expressions = expressions;
  }

  match(context: RegexContext): boolean {
    const startPosition = context.getPosition();

    for (const expr of this.expressions) {
      if (!expr.match(context)) {
        context.setPosition(startPosition);
        return false;
      }
    }

    return true;
  }
}

/**
 * 选择匹配表达式（或）
 */
class AlternationExpression extends RegexExpression {
  private left: RegexExpression;
  private right: RegexExpression;

  constructor(left: RegexExpression, right: RegexExpression) {
    super();
    this.left = left;
    this.right = right;
  }

  match(context: RegexContext): boolean {
    const startPosition = context.getPosition();

    if (this.left.match(context)) {
      return true;
    }

    context.setPosition(startPosition);
    return this.right.match(context);
  }
}

/**
 * 零次或多次匹配表达式（*）
 */
class ZeroOrMoreExpression extends RegexExpression {
  private expression: RegexExpression;

  constructor(expression: RegexExpression) {
    super();
    this.expression = expression;
  }

  match(context: RegexContext): boolean {
    while (this.expression.match(context)) {
      // 继续匹配
    }
    return true; // 零次或多次总是成功
  }
}

/**
 * 简单正则表达式解释器
 */
class SimpleRegexInterpreter {
  test(pattern: string, input: string): boolean {
    const expression = this.parsePattern(pattern);
    const context = new RegexContext(input);
    return expression.match(context) && context.isAtEnd();
  }

  private parsePattern(pattern: string): RegexExpression {
    // 简化的正则表达式解析
    const expressions: RegexExpression[] = [];

    for (let i = 0; i < pattern.length; i++) {
      const char = pattern[i];

      if (char === ".") {
        expressions.push(new DotExpression());
      } else if (char === "*" && expressions.length > 0) {
        const lastExpr = expressions.pop()!;
        expressions.push(new ZeroOrMoreExpression(lastExpr));
      } else if (char === "|") {
        const left = new SequenceExpression(expressions);
        const right = this.parsePattern(pattern.slice(i + 1));
        return new AlternationExpression(left, right);
      } else {
        expressions.push(new CharacterExpression(char));
      }
    }

    return new SequenceExpression(expressions);
  }
}

// =============================================================================
// 演示函数
// =============================================================================

/**
 * 演示解释器模式的使用
 */
export function demonstrateInterpreterPattern(): void {
  console.log("=== 解释器模式演示 ===\n");

  // 1. 基本表达式计算器演示
  console.log("1. 基本表达式计算器：");
  const calculator = new Calculator();
  calculator.setVariable("x", 10);
  calculator.setVariable("y", 5);

  console.log("计算 x + y：", calculator.evaluate("x + y"));
  console.log("计算 x * y - 2：", calculator.evaluate("x * y - 2"));
  console.log("计算 (x + y) * 2：", calculator.evaluate("(x + y) * 2"));

  // 2. SQL查询解释器演示
  console.log("\n2. SQL查询解释器：");
  const sqlInterpreter = new SQLInterpreter();

  // 添加示例数据
  sqlInterpreter.addTable("users", [
    { id: 1, name: "张三", age: 25, city: "北京" },
    { id: 2, name: "李四", age: 30, city: "上海" },
    { id: 3, name: "王五", age: 28, city: "北京" },
    { id: 4, name: "赵六", age: 35, city: "广州" },
  ]);

  console.log("执行 SELECT * FROM users：");
  console.log(sqlInterpreter.execute("SELECT * FROM users"));

  console.log("\n执行 SELECT name, age FROM users WHERE city = '北京'：");
  console.log(
    sqlInterpreter.execute("SELECT name, age FROM users WHERE city = '北京'")
  );

  console.log("\n执行 SELECT * FROM users WHERE age > 28：");
  console.log(sqlInterpreter.execute("SELECT * FROM users WHERE age > 28"));

  // 3. 正则表达式解释器演示
  console.log("\n3. 正则表达式解释器：");
  const regexInterpreter = new SimpleRegexInterpreter();

  console.log('测试 "a*b" 匹配 "aaab"：', regexInterpreter.test("a*b", "aaab"));
  console.log('测试 "a*b" 匹配 "b"：', regexInterpreter.test("a*b", "b"));
  console.log('测试 "a*b" 匹配 "c"：', regexInterpreter.test("a*b", "c"));
  console.log('测试 "a.c" 匹配 "abc"：', regexInterpreter.test("a.c", "abc"));
  console.log('测试 "a|b" 匹配 "a"：', regexInterpreter.test("a|b", "a"));
  console.log('测试 "a|b" 匹配 "b"：', regexInterpreter.test("a|b", "b"));

  console.log("\n=== 解释器模式演示完成 ===");
}

// 导出所有类和接口
export {
  Context,
  AbstractExpression,
  NumberExpression,
  VariableExpression,
  AddExpression,
  SubtractExpression,
  MultiplyExpression,
  DivideExpression,
  Calculator,
  SQLContext,
  SQLExpression,
  SelectExpression,
  WhereExpression,
  SQLInterpreter,
  RegexContext,
  RegexExpression,
  CharacterExpression,
  DotExpression,
  SequenceExpression,
  AlternationExpression,
  ZeroOrMoreExpression,
  SimpleRegexInterpreter,
};
