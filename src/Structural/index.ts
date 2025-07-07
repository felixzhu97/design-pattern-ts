/**
 * 结构型模式 (Structural Patterns)
 * 这些模式涉及如何组合类和对象以形成更大的结构
 */

// 导入演示函数
import { demonstrateAdapter } from "./Adapter";
import { demonstrateBridge } from "./Bridge";
import { demonstrateComposite } from "./Composite";
import { demonstrateDecorator } from "./Decorator";
import { demonstrateFacade } from "./Facade";
import { demonstrateFlyweight } from "./Flyweight";
import { demonstrateProxy } from "./Proxy";

// 导出演示函数
export { demonstrateAdapter } from "./Adapter";
export { demonstrateBridge } from "./Bridge";
export { demonstrateComposite } from "./Composite";
export { demonstrateDecorator } from "./Decorator";
export { demonstrateFacade } from "./Facade";
export { demonstrateFlyweight } from "./Flyweight";
export { demonstrateProxy } from "./Proxy";

// 演示所有结构型模式
export function demonstrateAllStructuralPatterns(): void {
  console.log("======= 结构型模式演示 =======\n");

  demonstrateAdapter();
  console.log("\n");

  demonstrateBridge();
  console.log("\n");

  demonstrateComposite();
  console.log("\n");

  demonstrateDecorator();
  console.log("\n");

  demonstrateFacade();
  console.log("\n");

  demonstrateFlyweight();
  console.log("\n");

  demonstrateProxy();
  console.log("\n");

  console.log("======= 结构型模式演示完成 =======");
}
