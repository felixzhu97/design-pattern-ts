/**
 * 创建型模式 (Creational Patterns)
 * 这些模式提供了各种对象创建机制，增加了代码的灵活性和可重用性
 */

// 导入演示函数
import { demonstrateSingleton } from "./Singleton";
import { demonstrateFactoryMethod } from "./FactoryMethod";
import { demonstrateAbstractFactory } from "./AbstractFactory";
import { demonstrateBuilder } from "./Builder";
import { demonstratePrototype } from "./Prototype";

// 导出演示函数
export { demonstrateSingleton } from "./Singleton";
export { demonstrateFactoryMethod } from "./FactoryMethod";
export { demonstrateAbstractFactory } from "./AbstractFactory";
export { demonstrateBuilder } from "./Builder";
export { demonstratePrototype } from "./Prototype";

// 演示所有创建型模式
export function demonstrateAllCreationalPatterns(): void {
  console.log("======= 创建型模式演示 =======\n");

  demonstrateSingleton();
  console.log("\n");

  demonstrateFactoryMethod();
  console.log("\n");

  demonstrateAbstractFactory();
  console.log("\n");

  demonstrateBuilder();
  console.log("\n");

  demonstratePrototype();
  console.log("\n");

  console.log("======= 创建型模式演示完成 =======");
}
