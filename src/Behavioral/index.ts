/**
 * 行为型模式 (Behavioral Patterns)
 *
 * 行为型模式关注的是对象之间的通信和职责分配。
 * 这些模式不仅描述对象或类的结构，更描述它们之间的通信模式。
 *
 * 包含的模式：
 * 1. 职责链模式 (Chain of Responsibility) - 将请求沿着处理者链传递
 * 2. 命令模式 (Command) - 将请求封装为对象
 * 3. 解释器模式 (Interpreter) - 定义语言的语法表示
 * 4. 迭代器模式 (Iterator) - 提供遍历聚合对象的方式
 * 5. 中介者模式 (Mediator) - 定义对象间的交互方式
 * 6. 备忘录模式 (Memento) - 保存和恢复对象状态
 * 7. 观察者模式 (Observer) - 定义对象间的依赖关系
 * 8. 状态模式 (State) - 允许对象在状态改变时改变行为
 * 9. 策略模式 (Strategy) - 定义算法族并使它们可以互换
 * 10. 模板方法模式 (Template Method) - 定义算法骨架
 * 11. 访问者模式 (Visitor) - 在不改变元素类的前提下定义新操作
 */

// 导出演示函数
export { demonstrateChainOfResponsibility } from "./ChainOfResponsibility";
export { demonstrateCommand } from "./Command";
export { demonstrateInterpreterPattern } from "./Interpreter";
export { demonstrateIteratorPattern } from "./Iterator";
export { demonstrateMediatorPattern } from "./Mediator";
export { demonstrateMementoPattern } from "./Memento";
export { demonstrateObserver } from "./Observer";
export { demonstrateState } from "./State";
export { demonstrateStrategy } from "./Strategy";
export { demonstrateTemplateMethodPattern } from "./TemplateMethod";
export { demonstrateVisitorPattern } from "./Visitor";

// 注意：由于多个模式中有同名的类（如TextEditor、Calculator、Context等），
// 为避免命名冲突，建议直接从各自的模块导入使用，例如：
// import { TextEditor } from './Behavioral/Command';
// import { Calculator } from './Behavioral/Interpreter';

/**
 * 演示所有行为型模式
 */
export function demonstrateAllBehavioralPatterns(): void {
  console.log("==========================================");
  console.log("           行为型模式演示");
  console.log("==========================================\n");

  // 依次演示各个模式 - 使用动态导入
  import("./ChainOfResponsibility").then(
    ({ demonstrateChainOfResponsibility }) => {
      demonstrateChainOfResponsibility();
      console.log("\n");
    }
  );

  import("./Command").then(({ demonstrateCommand }) => {
    demonstrateCommand();
    console.log("\n");
  });

  import("./Interpreter").then(({ demonstrateInterpreterPattern }) => {
    demonstrateInterpreterPattern();
    console.log("\n");
  });

  import("./Iterator").then(({ demonstrateIteratorPattern }) => {
    demonstrateIteratorPattern();
    console.log("\n");
  });

  import("./Mediator").then(({ demonstrateMediatorPattern }) => {
    demonstrateMediatorPattern();
    console.log("\n");
  });

  import("./Memento").then(({ demonstrateMementoPattern }) => {
    demonstrateMementoPattern();
    console.log("\n");
  });

  import("./Observer").then(({ demonstrateObserver }) => {
    demonstrateObserver();
    console.log("\n");
  });

  import("./State").then(({ demonstrateState }) => {
    demonstrateState();
    console.log("\n");
  });

  import("./Strategy").then(({ demonstrateStrategy }) => {
    demonstrateStrategy();
    console.log("\n");
  });

  import("./TemplateMethod").then(({ demonstrateTemplateMethodPattern }) => {
    demonstrateTemplateMethodPattern();
    console.log("\n");
  });

  import("./Visitor").then(({ demonstrateVisitorPattern }) => {
    demonstrateVisitorPattern();
    console.log("\n==========================================");
    console.log("         行为型模式演示完成");
    console.log("==========================================");
  });
}
