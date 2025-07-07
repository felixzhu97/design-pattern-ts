/**
 * TypeScript 设计模式实现
 *
 * 这是一个完整的设计模式实现集合，包含了所有23种经典设计模式的TypeScript实现。
 * 每个模式都包含详细的注释说明和实际应用示例。
 *
 * 设计模式分为三大类：
 * 1. 创建型模式 (Creational Patterns) - 5种
 * 2. 结构型模式 (Structural Patterns) - 7种
 * 3. 行为型模式 (Behavioral Patterns) - 11种
 *
 * 作者：设计模式学习项目
 * 版本：1.0.0
 * 创建时间：2024年
 */

console.log("==========================================");
console.log("    TypeScript 设计模式实现集合");
console.log("==========================================\n");

// 导出所有设计模式
export * from "./Creational";
export * from "./Structural";
export * from "./Behavioral";

// 导入演示函数
import { demonstrateAllCreationalPatterns } from "./Creational";
import { demonstrateAllStructuralPatterns } from "./Structural";
import { demonstrateAllBehavioralPatterns } from "./Behavioral";

/**
 * 演示所有设计模式
 */
export function demonstrateAllDesignPatterns(): void {
  console.log("🎯 开始演示所有设计模式\n");

  console.log("📦 创建型模式演示");
  console.log("==========================================");
  demonstrateAllCreationalPatterns();

  console.log("\n🏗️ 结构型模式演示");
  console.log("==========================================");
  demonstrateAllStructuralPatterns();

  console.log("\n🔄 行为型模式演示");
  console.log("==========================================");
  demonstrateAllBehavioralPatterns();

  console.log("\n🎉 所有设计模式演示完成！");
  console.log("==========================================");
}

/**
 * 显示项目信息
 */
export function showProjectInfo(): void {
  console.log("==========================================");
  console.log("    TypeScript 设计模式实现集合");
  console.log("==========================================");
  console.log("📝 项目描述：");
  console.log("   完整的23种设计模式TypeScript实现");
  console.log("   包含详细注释和实际应用示例");
  console.log("");
  console.log("📊 模式统计：");
  console.log("   创建型模式：5种");
  console.log("   结构型模式：7种");
  console.log("   行为型模式：11种");
  console.log("   总计：23种");
  console.log("");
  console.log("🎯 使用方法：");
  console.log('   import { demonstrateAllDesignPatterns } from "./src"');
  console.log("   demonstrateAllDesignPatterns()");
  console.log("==========================================");
}

/**
 * 主函数 - 如果直接运行此文件
 */
declare const require: any;
declare const module: any;

if (typeof require !== "undefined" && require.main === module) {
  showProjectInfo();
  console.log("\n🚀 开始演示所有设计模式...\n");
  demonstrateAllDesignPatterns();
}
