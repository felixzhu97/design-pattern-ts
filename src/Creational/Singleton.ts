/**
 * 单例模式 (Singleton Pattern)
 * 确保一个类只有一个实例，并提供全局访问点
 */

export class Singleton {
  private static instance: Singleton;
  private constructor() {
    // 私有构造函数防止外部实例化
    console.log("Singleton instance created");
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod(): string {
    return "Singleton method called";
  }
}

// 懒加载单例模式
export class LazySingleton {
  private static instance: LazySingleton;
  private data: string;

  private constructor() {
    this.data = `Created at ${new Date().toISOString()}`;
  }

  public static getInstance(): LazySingleton {
    if (!LazySingleton.instance) {
      LazySingleton.instance = new LazySingleton();
    }
    return LazySingleton.instance;
  }

  public getData(): string {
    return this.data;
  }
}

// 线程安全的单例模式（模拟）
export class ThreadSafeSingleton {
  private static instance: ThreadSafeSingleton;
  private static isCreating = false;

  private constructor() {
    // 防止多次实例化
    if (ThreadSafeSingleton.isCreating) {
      throw new Error("Cannot create multiple instances");
    }
    ThreadSafeSingleton.isCreating = true;
  }

  public static getInstance(): ThreadSafeSingleton {
    if (!ThreadSafeSingleton.instance) {
      ThreadSafeSingleton.instance = new ThreadSafeSingleton();
    }
    return ThreadSafeSingleton.instance;
  }

  public performAction(): string {
    return "Thread-safe singleton action performed";
  }
}

// 使用示例
export function demonstrateSingleton(): void {
  console.log("=== 单例模式示例 ===");

  const singleton1 = Singleton.getInstance();
  const singleton2 = Singleton.getInstance();

  console.log("Are instances equal?", singleton1 === singleton2);
  console.log("Method result:", singleton1.someMethod());

  // 懒加载单例示例
  const lazySingleton1 = LazySingleton.getInstance();
  const lazySingleton2 = LazySingleton.getInstance();

  console.log("Lazy singleton data:", lazySingleton1.getData());
  console.log("Are lazy instances equal?", lazySingleton1 === lazySingleton2);

  // 线程安全单例示例
  const threadSafeSingleton = ThreadSafeSingleton.getInstance();
  console.log("Thread-safe action:", threadSafeSingleton.performAction());
}
