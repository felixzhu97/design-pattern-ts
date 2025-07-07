/**
 * 代理模式 (Proxy Pattern)
 * 为其他对象提供一个代理以控制对这个对象的访问
 */

// 服务接口
export interface Subject {
  request(): void;
}

// 真实服务
export class RealSubject implements Subject {
  public request(): void {
    console.log("RealSubject: Handling request.");
  }
}

// 代理
export class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("Proxy: Checking access prior to firing a real request.");
    return true;
  }

  private logAccess(): void {
    console.log("Proxy: Logging the time of request.");
  }
}

// 虚拟代理示例：图片加载
export interface Image {
  display(): void;
}

export class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(`Loading image: ${this.filename}`);
  }

  public display(): void {
    console.log(`Displaying image: ${this.filename}`);
  }
}

export class ImageProxy implements Image {
  private realImage?: RealImage;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  public display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// 保护代理示例：权限控制
export interface FileSystem {
  read(filename: string): string;
  write(filename: string, content: string): void;
  delete(filename: string): void;
}

export class RealFileSystem implements FileSystem {
  private files: Map<string, string> = new Map();

  public read(filename: string): string {
    console.log(`Reading file: ${filename}`);
    return this.files.get(filename) || "File not found";
  }

  public write(filename: string, content: string): void {
    console.log(`Writing to file: ${filename}`);
    this.files.set(filename, content);
  }

  public delete(filename: string): void {
    console.log(`Deleting file: ${filename}`);
    this.files.delete(filename);
  }
}

export class FileSystemProxy implements FileSystem {
  private realFileSystem: RealFileSystem;
  private userRole: string;

  constructor(userRole: string) {
    this.realFileSystem = new RealFileSystem();
    this.userRole = userRole;
  }

  public read(filename: string): string {
    if (this.hasReadPermission()) {
      return this.realFileSystem.read(filename);
    } else {
      console.log("Access denied: No read permission");
      return "Access denied";
    }
  }

  public write(filename: string, content: string): void {
    if (this.hasWritePermission()) {
      this.realFileSystem.write(filename, content);
    } else {
      console.log("Access denied: No write permission");
    }
  }

  public delete(filename: string): void {
    if (this.hasDeletePermission()) {
      this.realFileSystem.delete(filename);
    } else {
      console.log("Access denied: No delete permission");
    }
  }

  private hasReadPermission(): boolean {
    return ["admin", "user", "guest"].includes(this.userRole);
  }

  private hasWritePermission(): boolean {
    return ["admin", "user"].includes(this.userRole);
  }

  private hasDeletePermission(): boolean {
    return this.userRole === "admin";
  }
}

// 缓存代理示例
export interface DataService {
  getData(key: string): string;
}

export class RealDataService implements DataService {
  public getData(key: string): string {
    console.log(`Fetching data from database for key: ${key}`);
    // 模拟数据库查询延迟
    return `Data for ${key}`;
  }
}

export class CacheProxy implements DataService {
  private realDataService: RealDataService;
  private cache: Map<string, string> = new Map();

  constructor() {
    this.realDataService = new RealDataService();
  }

  public getData(key: string): string {
    if (this.cache.has(key)) {
      console.log(`Cache hit for key: ${key}`);
      return this.cache.get(key)!;
    }

    console.log(`Cache miss for key: ${key}`);
    const data = this.realDataService.getData(key);
    this.cache.set(key, data);
    return data;
  }

  public clearCache(): void {
    console.log("Clearing cache");
    this.cache.clear();
  }
}

// 远程代理示例：网络服务
export interface NetworkService {
  sendRequest(url: string): string;
}

export class RealNetworkService implements NetworkService {
  public sendRequest(url: string): string {
    console.log(`Sending HTTP request to: ${url}`);
    // 模拟网络请求
    return `Response from ${url}`;
  }
}

export class NetworkProxy implements NetworkService {
  private realNetworkService: RealNetworkService;
  private bannedUrls: Set<string> = new Set([
    "example.com/malicious",
    "badsite.com",
  ]);

  constructor() {
    this.realNetworkService = new RealNetworkService();
  }

  public sendRequest(url: string): string {
    if (this.isUrlBanned(url)) {
      console.log(`Blocked request to banned URL: ${url}`);
      return "Request blocked";
    }

    this.logRequest(url);
    return this.realNetworkService.sendRequest(url);
  }

  private isUrlBanned(url: string): boolean {
    return this.bannedUrls.has(url);
  }

  private logRequest(url: string): void {
    console.log(`Logging request to: ${url}`);
  }
}

// 智能代理示例：数据库连接
export interface DatabaseConnection {
  query(sql: string): string[];
  close(): void;
}

export class RealDatabaseConnection implements DatabaseConnection {
  private isConnected: boolean = false;

  constructor() {
    this.connect();
  }

  private connect(): void {
    console.log("Connecting to database...");
    this.isConnected = true;
  }

  public query(sql: string): string[] {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }
    console.log(`Executing query: ${sql}`);
    return [`Result for: ${sql}`];
  }

  public close(): void {
    console.log("Closing database connection");
    this.isConnected = false;
  }
}

export class DatabaseProxy implements DatabaseConnection {
  private realConnection?: RealDatabaseConnection;
  private connectionCount: number = 0;

  public query(sql: string): string[] {
    this.ensureConnection();
    return this.realConnection!.query(sql);
  }

  public close(): void {
    if (this.realConnection) {
      this.realConnection.close();
      this.realConnection = undefined;
    }
  }

  private ensureConnection(): void {
    if (!this.realConnection) {
      console.log("Creating new database connection");
      this.realConnection = new RealDatabaseConnection();
      this.connectionCount++;
    }
  }

  public getConnectionCount(): number {
    return this.connectionCount;
  }
}

// 日志代理示例
export interface BusinessService {
  performOperation(data: string): string;
}

export class RealBusinessService implements BusinessService {
  public performOperation(data: string): string {
    console.log(`Processing business operation with data: ${data}`);
    return `Processed: ${data}`;
  }
}

export class LoggingProxy implements BusinessService {
  private realService: RealBusinessService;
  private requestCount: number = 0;

  constructor() {
    this.realService = new RealBusinessService();
  }

  public performOperation(data: string): string {
    this.requestCount++;
    this.logBefore(data);

    const startTime = Date.now();
    const result = this.realService.performOperation(data);
    const endTime = Date.now();

    this.logAfter(data, result, endTime - startTime);
    return result;
  }

  private logBefore(data: string): void {
    console.log(`[LOG] Request #${this.requestCount} - Before: ${data}`);
  }

  private logAfter(data: string, result: string, duration: number): void {
    console.log(
      `[LOG] Request #${this.requestCount} - After: ${result} (took ${duration}ms)`
    );
  }

  public getRequestCount(): number {
    return this.requestCount;
  }
}

// 延迟初始化代理示例
export interface ExpensiveService {
  process(): string;
}

export class RealExpensiveService implements ExpensiveService {
  constructor() {
    console.log("RealExpensiveService: Expensive initialization...");
    // 模拟昂贵的初始化过程
  }

  public process(): string {
    console.log("RealExpensiveService: Processing...");
    return "Expensive processing result";
  }
}

export class LazyInitializationProxy implements ExpensiveService {
  private realService?: RealExpensiveService;

  public process(): string {
    if (!this.realService) {
      console.log("LazyInitializationProxy: Creating real service...");
      this.realService = new RealExpensiveService();
    }
    return this.realService.process();
  }
}

// 使用示例
export function demonstrateProxy(): void {
  console.log("=== 代理模式示例 ===");

  // 基本代理示例
  const realSubject = new RealSubject();
  const proxy = new Proxy(realSubject);

  proxy.request();

  // 虚拟代理示例
  console.log("\n--- 虚拟代理示例 ---");
  const image1 = new ImageProxy("photo1.jpg");
  const image2 = new ImageProxy("photo2.jpg");

  console.log("Images created (not loaded yet)");
  image1.display(); // 这时才真正加载
  image1.display(); // 不再重新加载

  // 保护代理示例
  console.log("\n--- 保护代理示例 ---");
  const adminFS = new FileSystemProxy("admin");
  const userFS = new FileSystemProxy("user");
  const guestFS = new FileSystemProxy("guest");

  console.log("Admin operations:");
  adminFS.write("config.txt", "admin config");
  adminFS.read("config.txt");
  adminFS.delete("config.txt");

  console.log("\nUser operations:");
  userFS.write("data.txt", "user data");
  userFS.read("data.txt");
  userFS.delete("data.txt");

  console.log("\nGuest operations:");
  guestFS.read("public.txt");
  guestFS.write("guest.txt", "guest content");
  guestFS.delete("guest.txt");

  // 缓存代理示例
  console.log("\n--- 缓存代理示例 ---");
  const cacheProxy = new CacheProxy();

  console.log("First access:");
  cacheProxy.getData("user123");

  console.log("Second access:");
  cacheProxy.getData("user123");

  console.log("Third access (different key):");
  cacheProxy.getData("user456");

  // 远程代理示例
  console.log("\n--- 远程代理示例 ---");
  const networkProxy = new NetworkProxy();

  networkProxy.sendRequest("example.com/api");
  networkProxy.sendRequest("example.com/malicious");
  networkProxy.sendRequest("google.com");

  // 智能代理示例
  console.log("\n--- 智能代理示例 ---");
  const dbProxy = new DatabaseProxy();

  dbProxy.query("SELECT * FROM users");
  dbProxy.query("SELECT * FROM orders");
  console.log(`Total connections created: ${dbProxy.getConnectionCount()}`);

  // 日志代理示例
  console.log("\n--- 日志代理示例 ---");
  const loggingProxy = new LoggingProxy();

  loggingProxy.performOperation("data1");
  loggingProxy.performOperation("data2");
  console.log(`Total requests: ${loggingProxy.getRequestCount()}`);

  // 延迟初始化代理示例
  console.log("\n--- 延迟初始化代理示例 ---");
  const lazyProxy = new LazyInitializationProxy();

  console.log("Proxy created (service not initialized yet)");
  console.log("First call:");
  lazyProxy.process();
  console.log("Second call:");
  lazyProxy.process();
}
