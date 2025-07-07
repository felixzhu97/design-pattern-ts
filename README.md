# TypeScript 设计模式实现集合

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

这是一个完整的设计模式实现集合，包含了所有 23 种经典设计模式的 TypeScript 实现。每个模式都包含详细的中文注释说明和丰富的实际应用示例。

## 📋 项目概述

本项目旨在提供一个全面、易懂的设计模式学习资源，帮助开发者深入理解和掌握设计模式的核心概念和实际应用。

### 🎯 特性

- ✅ **完整性**：涵盖所有 23 种 GoF 设计模式
- ✅ **实用性**：每个模式都有多个真实场景的应用示例
- ✅ **可读性**：详细的中文注释和清晰的代码结构
- ✅ **类型安全**：使用 TypeScript 提供完整的类型定义
- ✅ **演示功能**：每个模式都有独立的演示函数

## 📊 模式统计

### 创建型模式 (Creational Patterns) - 5 种

1. **单例模式** (Singleton) - 确保一个类只有一个实例
2. **工厂方法模式** (Factory Method) - 创建对象的接口，让子类决定实例化哪个类
3. **抽象工厂模式** (Abstract Factory) - 提供一个创建相关对象家族的接口
4. **建造者模式** (Builder) - 构建复杂对象的过程与表示分离
5. **原型模式** (Prototype) - 通过复制现有实例来创建新实例

### 结构型模式 (Structural Patterns) - 7 种

1. **适配器模式** (Adapter) - 使接口不兼容的类可以一起工作
2. **桥接模式** (Bridge) - 将抽象部分与实现部分分离
3. **组合模式** (Composite) - 将对象组合成树形结构以表示"部分-整体"的层次结构
4. **装饰器模式** (Decorator) - 动态地给对象添加一些额外的职责
5. **外观模式** (Facade) - 为复杂子系统提供一个简单的接口
6. **享元模式** (Flyweight) - 运用共享技术来有效支持大量细粒度的对象
7. **代理模式** (Proxy) - 为其他对象提供一种代理以控制对这个对象的访问

### 行为型模式 (Behavioral Patterns) - 11 种

1. **职责链模式** (Chain of Responsibility) - 将请求沿着处理者链传递
2. **命令模式** (Command) - 将请求封装成一个对象
3. **解释器模式** (Interpreter) - 定义语言的文法表示
4. **迭代器模式** (Iterator) - 提供一种方法顺序访问聚合对象中的各个元素
5. **中介者模式** (Mediator) - 定义一系列对象之间的交互方式
6. **备忘录模式** (Memento) - 在不破坏封装性的前提下捕获一个对象的内部状态
7. **观察者模式** (Observer) - 定义对象间的一对多依赖关系
8. **状态模式** (State) - 允许对象在内部状态改变时改变它的行为
9. **策略模式** (Strategy) - 定义一系列算法，把它们一个个封装起来
10. **模板方法模式** (Template Method) - 定义一个算法的骨架
11. **访问者模式** (Visitor) - 表示一个作用于某对象结构中的各元素的操作

## 🚀 快速开始

### 环境要求

- Node.js 14.x 或更高版本
- npm 6.x 或更高版本

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd design-pattern-ts

# 安装依赖
npm install

# 编译TypeScript
npm run build

# 运行演示
npm start
```

### 使用方法

#### 1. 运行所有模式演示

```typescript
import { demonstrateAllDesignPatterns } from "./src";

demonstrateAllDesignPatterns();
```

#### 2. 运行特定类型的模式

```typescript
import {
  demonstrateAllCreationalPatterns,
  demonstrateAllStructuralPatterns,
  demonstrateAllBehavioralPatterns,
} from "./src";

// 演示创建型模式
demonstrateAllCreationalPatterns();

// 演示结构型模式
demonstrateAllStructuralPatterns();

// 演示行为型模式
demonstrateAllBehavioralPatterns();
```

#### 3. 使用具体的模式

```typescript
// 使用单例模式
import { DatabaseConnection } from "./src/Creational/Singleton";

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true

// 使用工厂方法模式
import { VehicleFactory } from "./src/Creational/FactoryMethod";

const factory = new VehicleFactory();
const car = factory.createVehicle("car");
const bike = factory.createVehicle("bike");

// 使用观察者模式
import { Subject, ConcreteObserver } from "./src/Behavioral/Observer";

const subject = new Subject();
const observer1 = new ConcreteObserver("Observer 1");
const observer2 = new ConcreteObserver("Observer 2");

subject.attach(observer1);
subject.attach(observer2);
subject.notify("Hello World!");
```

## 📁 项目结构

```
design-pattern-ts/
├── src/
│   ├── Creational/          # 创建型模式
│   │   ├── Singleton.ts
│   │   ├── FactoryMethod.ts
│   │   ├── AbstractFactory.ts
│   │   ├── Builder.ts
│   │   ├── Prototype.ts
│   │   └── index.ts
│   ├── Structural/          # 结构型模式
│   │   ├── Adapter.ts
│   │   ├── Bridge.ts
│   │   ├── Composite.ts
│   │   ├── Decorator.ts
│   │   ├── Facade.ts
│   │   ├── Flyweight.ts
│   │   ├── Proxy.ts
│   │   └── index.ts
│   ├── Behavioral/          # 行为型模式
│   │   ├── ChainOfResponsibility.ts
│   │   ├── Command.ts
│   │   ├── Interpreter.ts
│   │   ├── Iterator.ts
│   │   ├── Mediator.ts
│   │   ├── Memento.ts
│   │   ├── Observer.ts
│   │   ├── State.ts
│   │   ├── Strategy.ts
│   │   ├── TemplateMethod.ts
│   │   ├── Visitor.ts
│   │   └── index.ts
│   └── index.ts             # 主入口文件
├── dist/                    # 编译输出目录
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## 🛠️ 开发命令

```bash
# 编译项目
npm run build

# 开发模式运行
npm run dev

# 清理构建目录
npm run clean

# 类型检查
npm run type-check

# 格式化代码
npm run format

# 代码检查
npm run lint
```

## 📖 学习指南

### 推荐学习顺序

1. **从简单到复杂**：先学习创建型模式，再学习结构型模式，最后学习行为型模式
2. **理论与实践结合**：阅读代码注释理解概念，运行演示程序观察效果
3. **关注应用场景**：每个模式都有多个实际应用示例，重点理解使用场景
4. **动手实践**：尝试修改示例代码，加深理解

### 每个模式的学习内容

- **定义和目的**：模式要解决什么问题
- **结构组成**：模式的组成部分和它们的关系
- **实现方式**：如何用代码实现这个模式
- **应用场景**：在什么情况下使用这个模式
- **优缺点**：使用这个模式的好处和限制
- **相关模式**：与其他模式的关系和区别

## 🤝 贡献指南

欢迎提交问题和改进建议！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 感谢 GoF（Gang of Four）提出的经典设计模式理论
- 感谢所有为开源软件做出贡献的开发者
- 感谢 TypeScript 团队提供的强大类型系统

## 📞 联系方式

如果您有任何问题或建议，请随时联系我们：

- 创建 Issue：[GitHub Issues](https://github.com/your-repo/design-pattern-ts/issues)
- 邮件：your-email@example.com

---

**⭐ 如果这个项目对您有帮助，请给它一个星星！**
