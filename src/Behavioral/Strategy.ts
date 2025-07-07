/**
 * 策略模式 (Strategy Pattern)
 * 定义一系列算法，把它们一个个封装起来，并且使它们可相互替换
 */

// 策略接口
export interface Strategy {
  doAlgorithm(data: string[]): string[];
}

// 具体策略A
export class ConcreteStrategyA implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}

// 具体策略B
export class ConcreteStrategyB implements Strategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}

// 上下文
export class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  public doSomeBusinessLogic(): void {
    console.log(
      "Context: Sorting data using the strategy (not sure how it'll do it)"
    );
    const data = ["a", "b", "c", "d", "e"];
    const result = this.strategy.doAlgorithm(data);
    console.log(result.join(", "));
  }
}

// 实际应用示例：支付策略
export interface PaymentStrategy {
  pay(amount: number): string;
}

export class CreditCardPayment implements PaymentStrategy {
  private cardNumber: string;
  private name: string;

  constructor(cardNumber: string, name: string) {
    this.cardNumber = cardNumber;
    this.name = name;
  }

  public pay(amount: number): string {
    return `Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(
      -4
    )} (${this.name})`;
  }
}

export class PayPalPayment implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  public pay(amount: number): string {
    return `Paid $${amount} using PayPal account ${this.email}`;
  }
}

export class BitcoinPayment implements PaymentStrategy {
  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  public pay(amount: number): string {
    return `Paid $${amount} using Bitcoin wallet ${this.walletAddress.slice(
      0,
      8
    )}...`;
  }
}

export class ShoppingCart {
  private items: { name: string; price: number }[] = [];
  private paymentStrategy?: PaymentStrategy;

  public addItem(name: string, price: number): void {
    this.items.push({ name, price });
  }

  public setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  public checkout(): string {
    if (!this.paymentStrategy) {
      return "Please select a payment method";
    }

    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    return this.paymentStrategy.pay(total);
  }

  public getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// 排序策略示例
export interface SortStrategy {
  sort(data: number[]): number[];
}

export class BubbleSort implements SortStrategy {
  public sort(data: number[]): number[] {
    console.log("Using Bubble Sort");
    const arr = [...data];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }

    return arr;
  }
}

export class QuickSort implements SortStrategy {
  public sort(data: number[]): number[] {
    console.log("Using Quick Sort");
    return this.quickSort([...data]);
  }

  private quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter((x) => x < pivot);
    const middle = arr.filter((x) => x === pivot);
    const right = arr.filter((x) => x > pivot);

    return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
  }
}

export class MergeSort implements SortStrategy {
  public sort(data: number[]): number[] {
    console.log("Using Merge Sort");
    return this.mergeSort([...data]);
  }

  private mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid));
    const right = this.mergeSort(arr.slice(mid));

    return this.merge(left, right);
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
}

export class Sorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  public sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// 压缩策略示例
export interface CompressionStrategy {
  compress(data: string): string;
  decompress(data: string): string;
}

export class ZipCompression implements CompressionStrategy {
  public compress(data: string): string {
    console.log("Compressing using ZIP algorithm");
    return `ZIP[${data}]`;
  }

  public decompress(data: string): string {
    console.log("Decompressing using ZIP algorithm");
    return data.replace(/^ZIP\[(.+)\]$/, "$1");
  }
}

export class RarCompression implements CompressionStrategy {
  public compress(data: string): string {
    console.log("Compressing using RAR algorithm");
    return `RAR[${data}]`;
  }

  public decompress(data: string): string {
    console.log("Decompressing using RAR algorithm");
    return data.replace(/^RAR\[(.+)\]$/, "$1");
  }
}

export class GzipCompression implements CompressionStrategy {
  public compress(data: string): string {
    console.log("Compressing using GZIP algorithm");
    return `GZIP[${data}]`;
  }

  public decompress(data: string): string {
    console.log("Decompressing using GZIP algorithm");
    return data.replace(/^GZIP\[(.+)\]$/, "$1");
  }
}

export class FileCompressor {
  private strategy: CompressionStrategy;

  constructor(strategy: CompressionStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: CompressionStrategy): void {
    this.strategy = strategy;
  }

  public compressFile(data: string): string {
    return this.strategy.compress(data);
  }

  public decompressFile(data: string): string {
    return this.strategy.decompress(data);
  }
}

// 游戏角色攻击策略示例
export interface AttackStrategy {
  attack(): string;
}

export class SwordAttack implements AttackStrategy {
  public attack(): string {
    return "Swinging sword for 20 damage!";
  }
}

export class BowAttack implements AttackStrategy {
  public attack(): string {
    return "Shooting arrow for 15 damage!";
  }
}

export class MagicAttack implements AttackStrategy {
  public attack(): string {
    return "Casting fireball for 30 damage!";
  }
}

export class Character {
  private name: string;
  private attackStrategy: AttackStrategy;

  constructor(name: string, attackStrategy: AttackStrategy) {
    this.name = name;
    this.attackStrategy = attackStrategy;
  }

  public setAttackStrategy(strategy: AttackStrategy): void {
    this.attackStrategy = strategy;
  }

  public performAttack(): string {
    return `${this.name}: ${this.attackStrategy.attack()}`;
  }
}

// 导航策略示例
export interface NavigationStrategy {
  buildRoute(start: string, end: string): string;
}

export class RoadStrategy implements NavigationStrategy {
  public buildRoute(start: string, end: string): string {
    return `Road route from ${start} to ${end}: Take highway, estimated time 2 hours`;
  }
}

export class WalkingStrategy implements NavigationStrategy {
  public buildRoute(start: string, end: string): string {
    return `Walking route from ${start} to ${end}: Use sidewalks and pedestrian paths, estimated time 45 minutes`;
  }
}

export class PublicTransportStrategy implements NavigationStrategy {
  public buildRoute(start: string, end: string): string {
    return `Public transport route from ${start} to ${end}: Take bus #42 and subway line 1, estimated time 1 hour`;
  }
}

export class Navigator {
  private strategy: NavigationStrategy;

  constructor(strategy: NavigationStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: NavigationStrategy): void {
    this.strategy = strategy;
  }

  public getRoute(start: string, end: string): string {
    return this.strategy.buildRoute(start, end);
  }
}

// 使用示例
export function demonstrateStrategy(): void {
  console.log("=== 策略模式示例 ===");

  // 基本策略示例
  const context = new Context(new ConcreteStrategyA());
  console.log("Client: Strategy is set to normal sorting.");
  context.doSomeBusinessLogic();

  console.log("\nClient: Strategy is set to reverse sorting.");
  context.setStrategy(new ConcreteStrategyB());
  context.doSomeBusinessLogic();

  // 支付策略示例
  console.log("\n--- 支付策略示例 ---");
  const cart = new ShoppingCart();
  cart.addItem("Laptop", 1000);
  cart.addItem("Mouse", 25);
  cart.addItem("Keyboard", 75);

  console.log(`Total: $${cart.getTotal()}`);

  // 使用信用卡支付
  cart.setPaymentStrategy(
    new CreditCardPayment("1234567890123456", "John Doe")
  );
  console.log(cart.checkout());

  // 切换到PayPal支付
  cart.setPaymentStrategy(new PayPalPayment("john@example.com"));
  console.log(cart.checkout());

  // 切换到比特币支付
  cart.setPaymentStrategy(
    new BitcoinPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
  );
  console.log(cart.checkout());

  // 排序策略示例
  console.log("\n--- 排序策略示例 ---");
  const data = [64, 34, 25, 12, 22, 11, 90];
  console.log("Original data:", data);

  const sorter = new Sorter(new BubbleSort());
  console.log("Bubble sorted:", sorter.sort(data));

  sorter.setStrategy(new QuickSort());
  console.log("Quick sorted:", sorter.sort(data));

  sorter.setStrategy(new MergeSort());
  console.log("Merge sorted:", sorter.sort(data));

  // 压缩策略示例
  console.log("\n--- 压缩策略示例 ---");
  const compressor = new FileCompressor(new ZipCompression());
  const originalData = "This is some sample data to compress";

  let compressed = compressor.compressFile(originalData);
  console.log("Compressed:", compressed);
  console.log("Decompressed:", compressor.decompressFile(compressed));

  compressor.setStrategy(new RarCompression());
  compressed = compressor.compressFile(originalData);
  console.log("Compressed:", compressed);
  console.log("Decompressed:", compressor.decompressFile(compressed));

  compressor.setStrategy(new GzipCompression());
  compressed = compressor.compressFile(originalData);
  console.log("Compressed:", compressed);
  console.log("Decompressed:", compressor.decompressFile(compressed));

  // 游戏角色攻击策略示例
  console.log("\n--- 游戏角色攻击策略示例 ---");
  const warrior = new Character("Warrior", new SwordAttack());
  console.log(warrior.performAttack());

  const archer = new Character("Archer", new BowAttack());
  console.log(archer.performAttack());

  const mage = new Character("Mage", new MagicAttack());
  console.log(mage.performAttack());

  // 角色可以切换攻击方式
  console.log("\nWarrior picks up a bow:");
  warrior.setAttackStrategy(new BowAttack());
  console.log(warrior.performAttack());

  // 导航策略示例
  console.log("\n--- 导航策略示例 ---");
  const navigator = new Navigator(new RoadStrategy());

  console.log(navigator.getRoute("Home", "Office"));

  navigator.setStrategy(new WalkingStrategy());
  console.log(navigator.getRoute("Home", "Office"));

  navigator.setStrategy(new PublicTransportStrategy());
  console.log(navigator.getRoute("Home", "Office"));
}
