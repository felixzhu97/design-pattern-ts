/**
 * 模板方法模式 (Template Method Pattern)
 *
 * 定义：定义一个算法的骨架，而将一些步骤延迟到子类中实现。
 * 模板方法使得子类可以在不改变算法结构的情况下，重新定义算法的某些步骤。
 *
 * 主要角色：
 * 1. AbstractClass（抽象类）：定义算法的骨架，包含模板方法和抽象方法
 * 2. ConcreteClass（具体类）：实现抽象类中的抽象方法，完成具体的算法步骤
 */

// =============================================================================
// 基本模板方法实现
// =============================================================================

/**
 * 抽象类：定义算法模板
 */
abstract class AbstractClass {
  // 模板方法：定义算法的骨架
  public templateMethod(): void {
    console.log("开始执行算法模板");
    this.baseOperation1();
    this.requiredOperation1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
    console.log("算法模板执行完成");
  }

  // 基本操作：已经实现的操作
  protected baseOperation1(): void {
    console.log("AbstractClass: 执行基本操作1");
  }

  protected baseOperation2(): void {
    console.log("AbstractClass: 执行基本操作2");
  }

  protected baseOperation3(): void {
    console.log("AbstractClass: 执行基本操作3");
  }

  // 抽象操作：由子类实现
  protected abstract requiredOperation1(): void;
  protected abstract requiredOperation2(): void;

  // 钩子方法：可选的操作，子类可以重写
  protected hook1(): void {
    // 默认为空实现
  }

  protected hook2(): void {
    // 默认为空实现
  }
}

/**
 * 具体类A
 */
class ConcreteClassA extends AbstractClass {
  protected requiredOperation1(): void {
    console.log("ConcreteClassA: 实现必需操作1");
  }

  protected requiredOperation2(): void {
    console.log("ConcreteClassA: 实现必需操作2");
  }

  protected hook1(): void {
    console.log("ConcreteClassA: 重写钩子方法1");
  }
}

/**
 * 具体类B
 */
class ConcreteClassB extends AbstractClass {
  protected requiredOperation1(): void {
    console.log("ConcreteClassB: 实现必需操作1");
  }

  protected requiredOperation2(): void {
    console.log("ConcreteClassB: 实现必需操作2");
  }

  protected hook2(): void {
    console.log("ConcreteClassB: 重写钩子方法2");
  }
}

// =============================================================================
// 示例1：数据挖掘应用
// =============================================================================

/**
 * 数据挖掘算法模板
 */
abstract class DataMiner {
  // 模板方法：数据挖掘算法的骨架
  public mineData(path: string): void {
    console.log(`开始数据挖掘: ${path}`);

    const rawData = this.openFile(path);
    const data = this.extractData(rawData);
    const processedData = this.parseData(data);
    const analysis = this.analyzeData(processedData);
    this.sendReport(analysis);

    if (this.shouldCloseFile()) {
      this.closeFile();
    }

    console.log("数据挖掘完成");
  }

  // 抽象方法：由子类实现
  protected abstract openFile(path: string): string;
  protected abstract extractData(rawData: string): any[];
  protected abstract parseData(data: any[]): any[];

  // 通用实现
  protected analyzeData(data: any[]): string {
    console.log("DataMiner: 分析数据...");
    return `分析结果: 处理了 ${data.length} 条数据`;
  }

  protected sendReport(analysis: string): void {
    console.log(`DataMiner: 发送报告 - ${analysis}`);
  }

  protected closeFile(): void {
    console.log("DataMiner: 关闭文件");
  }

  // 钩子方法：子类可以重写
  protected shouldCloseFile(): boolean {
    return true;
  }
}

/**
 * PDF数据挖掘器
 */
class PDFDataMiner extends DataMiner {
  protected openFile(path: string): string {
    console.log(`PDFDataMiner: 打开PDF文件 ${path}`);
    return `PDF内容：${path}`;
  }

  protected extractData(rawData: string): any[] {
    console.log("PDFDataMiner: 从PDF提取数据");
    return ["PDF数据1", "PDF数据2", "PDF数据3"];
  }

  protected parseData(data: any[]): any[] {
    console.log("PDFDataMiner: 解析PDF数据");
    return data.map((item) => `解析后的${item}`);
  }
}

/**
 * CSV数据挖掘器
 */
class CSVDataMiner extends DataMiner {
  protected openFile(path: string): string {
    console.log(`CSVDataMiner: 打开CSV文件 ${path}`);
    return `CSV内容：${path}`;
  }

  protected extractData(rawData: string): any[] {
    console.log("CSVDataMiner: 从CSV提取数据");
    return [
      { name: "张三", age: 25, city: "北京" },
      { name: "李四", age: 30, city: "上海" },
      { name: "王五", age: 28, city: "广州" },
    ];
  }

  protected parseData(data: any[]): any[] {
    console.log("CSVDataMiner: 解析CSV数据");
    return data.map((item) => ({
      ...item,
      processed: true,
    }));
  }

  protected shouldCloseFile(): boolean {
    console.log("CSVDataMiner: CSV文件保持打开状态");
    return false;
  }
}

// =============================================================================
// 示例2：网络请求处理
// =============================================================================

/**
 * 网络请求处理模板
 */
abstract class NetworkRequestHandler {
  // 模板方法：处理网络请求的流程
  public handleRequest(request: any): any {
    console.log("开始处理网络请求");

    if (!this.validateRequest(request)) {
      throw new Error("请求验证失败");
    }

    this.logRequest(request);
    const processedRequest = this.preprocessRequest(request);
    const response = this.processRequest(processedRequest);
    const finalResponse = this.postprocessResponse(response);
    this.logResponse(finalResponse);

    return finalResponse;
  }

  // 通用实现
  protected validateRequest(request: any): boolean {
    console.log("NetworkRequestHandler: 验证请求");
    return request != null;
  }

  protected logRequest(request: any): void {
    console.log(`NetworkRequestHandler: 记录请求 - ${JSON.stringify(request)}`);
  }

  protected logResponse(response: any): void {
    console.log(
      `NetworkRequestHandler: 记录响应 - ${JSON.stringify(response)}`
    );
  }

  // 抽象方法：由子类实现
  protected abstract preprocessRequest(request: any): any;
  protected abstract processRequest(request: any): any;
  protected abstract postprocessResponse(response: any): any;
}

/**
 * HTTP GET请求处理器
 */
class HTTPGetHandler extends NetworkRequestHandler {
  protected preprocessRequest(request: any): any {
    console.log("HTTPGetHandler: 预处理GET请求");
    return {
      ...request,
      method: "GET",
      timestamp: new Date().toISOString(),
    };
  }

  protected processRequest(request: any): any {
    console.log(`HTTPGetHandler: 处理GET请求到 ${request.url}`);
    return {
      status: 200,
      data: { message: "成功获取数据", url: request.url },
      timestamp: new Date().toISOString(),
    };
  }

  protected postprocessResponse(response: any): any {
    console.log("HTTPGetHandler: 后处理GET响应");
    return {
      ...response,
      processed: true,
      type: "GET",
    };
  }
}

/**
 * HTTP POST请求处理器
 */
class HTTPPostHandler extends NetworkRequestHandler {
  protected preprocessRequest(request: any): any {
    console.log("HTTPPostHandler: 预处理POST请求");
    return {
      ...request,
      method: "POST",
      contentType: "application/json",
      timestamp: new Date().toISOString(),
    };
  }

  protected processRequest(request: any): any {
    console.log(`HTTPPostHandler: 处理POST请求到 ${request.url}`);
    return {
      status: 201,
      data: { message: "成功创建数据", id: Math.random().toString(36) },
      timestamp: new Date().toISOString(),
    };
  }

  protected postprocessResponse(response: any): any {
    console.log("HTTPPostHandler: 后处理POST响应");
    return {
      ...response,
      processed: true,
      type: "POST",
    };
  }
}

// =============================================================================
// 示例3：游戏AI行为
// =============================================================================

/**
 * 游戏AI行为模板
 */
abstract class GameAI {
  // 模板方法：AI的行为流程
  public takeTurn(): void {
    console.log("AI开始行动");

    this.collectResources();
    this.buildStructures();
    this.buildUnits();
    this.sendScouts();
    this.sendWarriors();

    console.log("AI行动结束");
  }

  // 抽象方法：由子类实现
  protected abstract collectResources(): void;
  protected abstract buildStructures(): void;
  protected abstract buildUnits(): void;
  protected abstract sendScouts(): void;
  protected abstract sendWarriors(): void;
}

/**
 * 兽人AI
 */
class OrcsAI extends GameAI {
  protected collectResources(): void {
    console.log("OrcsAI: 收集木材和黄金");
  }

  protected buildStructures(): void {
    console.log("OrcsAI: 建造兽人建筑");
  }

  protected buildUnits(): void {
    console.log("OrcsAI: 训练兽人战士");
  }

  protected sendScouts(): void {
    console.log("OrcsAI: 派遣狼骑兵侦察");
  }

  protected sendWarriors(): void {
    console.log("OrcsAI: 派遣兽人军队进攻");
  }
}

/**
 * 精灵AI
 */
class ElvesAI extends GameAI {
  protected collectResources(): void {
    console.log("ElvesAI: 收集魔法水晶");
  }

  protected buildStructures(): void {
    console.log("ElvesAI: 建造精灵建筑");
  }

  protected buildUnits(): void {
    console.log("ElvesAI: 训练精灵弓箭手");
  }

  protected sendScouts(): void {
    console.log("ElvesAI: 派遣精灵侦察兵");
  }

  protected sendWarriors(): void {
    console.log("ElvesAI: 派遣精灵军队进攻");
  }
}

// =============================================================================
// 示例4：文档生成器
// =============================================================================

/**
 * 文档生成器模板
 */
abstract class DocumentGenerator {
  // 模板方法：生成文档的流程
  public generateDocument(title: string, content: string): string {
    console.log(`开始生成文档: ${title}`);

    let document = this.createDocumentHeader(title);
    document += this.formatContent(content);
    document += this.createDocumentFooter();

    if (this.shouldAddMetadata()) {
      document += this.addMetadata();
    }

    console.log("文档生成完成");
    return document;
  }

  // 抽象方法：由子类实现
  protected abstract createDocumentHeader(title: string): string;
  protected abstract formatContent(content: string): string;
  protected abstract createDocumentFooter(): string;

  // 钩子方法：子类可以重写
  protected shouldAddMetadata(): boolean {
    return false;
  }

  protected addMetadata(): string {
    return "";
  }
}

/**
 * HTML文档生成器
 */
class HTMLDocumentGenerator extends DocumentGenerator {
  protected createDocumentHeader(title: string): string {
    console.log("HTMLDocumentGenerator: 创建HTML头部");
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        p { line-height: 1.6; }
    </style>
</head>
<body>
    <h1>${title}</h1>
`;
  }

  protected formatContent(content: string): string {
    console.log("HTMLDocumentGenerator: 格式化HTML内容");
    return `    <p>${content}</p>\n`;
  }

  protected createDocumentFooter(): string {
    console.log("HTMLDocumentGenerator: 创建HTML尾部");
    return `</body>
</html>`;
  }

  protected shouldAddMetadata(): boolean {
    return true;
  }

  protected addMetadata(): string {
    return `
    <meta name="generator" content="HTMLDocumentGenerator">
    <meta name="created" content="${new Date().toISOString()}">
`;
  }
}

/**
 * Markdown文档生成器
 */
class MarkdownDocumentGenerator extends DocumentGenerator {
  protected createDocumentHeader(title: string): string {
    console.log("MarkdownDocumentGenerator: 创建Markdown头部");
    return `# ${title}\n\n`;
  }

  protected formatContent(content: string): string {
    console.log("MarkdownDocumentGenerator: 格式化Markdown内容");
    return `${content}\n\n`;
  }

  protected createDocumentFooter(): string {
    console.log("MarkdownDocumentGenerator: 创建Markdown尾部");
    return `---\n*Generated by MarkdownDocumentGenerator*\n`;
  }

  protected shouldAddMetadata(): boolean {
    return true;
  }

  protected addMetadata(): string {
    return `**Created:** ${new Date().toISOString()}\n\n`;
  }
}

// =============================================================================
// 演示函数
// =============================================================================

/**
 * 演示模板方法模式的使用
 */
export function demonstrateTemplateMethodPattern(): void {
  console.log("=== 模板方法模式演示 ===\n");

  // 1. 基本模板方法演示
  console.log("1. 基本模板方法：");
  const classA = new ConcreteClassA();
  classA.templateMethod();

  console.log("\n---");
  const classB = new ConcreteClassB();
  classB.templateMethod();

  // 2. 数据挖掘应用演示
  console.log("\n2. 数据挖掘应用：");
  const pdfMiner = new PDFDataMiner();
  pdfMiner.mineData("report.pdf");

  console.log("\n---");
  const csvMiner = new CSVDataMiner();
  csvMiner.mineData("data.csv");

  // 3. 网络请求处理演示
  console.log("\n3. 网络请求处理：");
  const getHandler = new HTTPGetHandler();
  const getRequest = { url: "https://api.example.com/users" };
  const getResponse = getHandler.handleRequest(getRequest);

  console.log("\n---");
  const postHandler = new HTTPPostHandler();
  const postRequest = {
    url: "https://api.example.com/users",
    data: { name: "张三", email: "zhang@example.com" },
  };
  const postResponse = postHandler.handleRequest(postRequest);

  // 4. 游戏AI行为演示
  console.log("\n4. 游戏AI行为：");
  const orcsAI = new OrcsAI();
  orcsAI.takeTurn();

  console.log("\n---");
  const elvesAI = new ElvesAI();
  elvesAI.takeTurn();

  // 5. 文档生成器演示
  console.log("\n5. 文档生成器：");
  const htmlGenerator = new HTMLDocumentGenerator();
  const htmlDoc = htmlGenerator.generateDocument(
    "设计模式指南",
    "模板方法模式是一种行为型设计模式，它定义了算法的骨架。"
  );
  console.log("生成的HTML文档：");
  console.log(htmlDoc);

  console.log("\n---");
  const markdownGenerator = new MarkdownDocumentGenerator();
  const markdownDoc = markdownGenerator.generateDocument(
    "设计模式指南",
    "模板方法模式是一种行为型设计模式，它定义了算法的骨架。"
  );
  console.log("生成的Markdown文档：");
  console.log(markdownDoc);

  console.log("\n=== 模板方法模式演示完成 ===");
}

// 导出所有类和接口
export {
  AbstractClass,
  ConcreteClassA,
  ConcreteClassB,
  DataMiner,
  PDFDataMiner,
  CSVDataMiner,
  NetworkRequestHandler,
  HTTPGetHandler,
  HTTPPostHandler,
  GameAI,
  OrcsAI,
  ElvesAI,
  DocumentGenerator,
  HTMLDocumentGenerator,
  MarkdownDocumentGenerator,
};
