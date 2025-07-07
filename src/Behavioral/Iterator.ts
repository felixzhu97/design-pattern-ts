/**
 * 迭代器模式 (Iterator Pattern)
 *
 * 定义：提供一种方法顺序访问一个聚合对象中各个元素，而又不需要暴露该对象的内部表示
 *
 * 主要角色：
 * 1. Iterator（迭代器）：定义访问和遍历元素的接口
 * 2. ConcreteIterator（具体迭代器）：实现迭代器接口，对聚合对象进行遍历
 * 3. Aggregate（聚合）：定义创建迭代器的接口
 * 4. ConcreteAggregate（具体聚合）：实现聚合接口，返回一个具体迭代器的实例
 */

// =============================================================================
// 基本迭代器实现
// =============================================================================

/**
 * 迭代器接口
 */
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
  current(): T;
}

/**
 * 聚合接口
 */
interface Aggregate<T> {
  createIterator(): Iterator<T>;
}

/**
 * 具体迭代器：数组迭代器
 */
class ArrayIterator<T> implements Iterator<T> {
  private collection: T[];
  private position: number = 0;

  constructor(collection: T[]) {
    this.collection = collection;
  }

  hasNext(): boolean {
    return this.position < this.collection.length;
  }

  next(): T {
    if (this.hasNext()) {
      return this.collection[this.position++];
    }
    throw new Error("没有更多元素");
  }

  current(): T {
    return this.collection[this.position];
  }
}

/**
 * 具体聚合：数组集合
 */
class ArrayCollection<T> implements Aggregate<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  createIterator(): Iterator<T> {
    return new ArrayIterator(this.items);
  }
}

// =============================================================================
// 示例1：书籍集合迭代器
// =============================================================================

/**
 * 书籍类
 */
class Book {
  constructor(
    public title: string,
    public author: string,
    public isbn: string
  ) {}

  toString(): string {
    return `《${this.title}》 - ${this.author}`;
  }
}

/**
 * 书籍集合
 */
class BookCollection implements Aggregate<Book> {
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(isbn: string): void {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }

  createIterator(): Iterator<Book> {
    return new BookIterator(this.books);
  }

  // 创建反向迭代器
  createReverseIterator(): Iterator<Book> {
    return new ReverseBookIterator(this.books);
  }
}

/**
 * 书籍迭代器
 */
class BookIterator implements Iterator<Book> {
  private books: Book[];
  private position: number = 0;

  constructor(books: Book[]) {
    this.books = books;
  }

  hasNext(): boolean {
    return this.position < this.books.length;
  }

  next(): Book {
    if (this.hasNext()) {
      return this.books[this.position++];
    }
    throw new Error("没有更多书籍");
  }

  current(): Book {
    return this.books[this.position];
  }
}

/**
 * 反向书籍迭代器
 */
class ReverseBookIterator implements Iterator<Book> {
  private books: Book[];
  private position: number;

  constructor(books: Book[]) {
    this.books = books;
    this.position = books.length - 1;
  }

  hasNext(): boolean {
    return this.position >= 0;
  }

  next(): Book {
    if (this.hasNext()) {
      return this.books[this.position--];
    }
    throw new Error("没有更多书籍");
  }

  current(): Book {
    return this.books[this.position];
  }
}

// =============================================================================
// 示例2：树形结构迭代器
// =============================================================================

/**
 * 树节点
 */
class TreeNode<T> {
  constructor(public value: T, public children: TreeNode<T>[] = []) {}

  addChild(child: TreeNode<T>): void {
    this.children.push(child);
  }
}

/**
 * 深度优先迭代器
 */
class DepthFirstIterator<T> implements Iterator<T> {
  private stack: TreeNode<T>[] = [];
  private visited: Set<TreeNode<T>> = new Set();

  constructor(root: TreeNode<T>) {
    this.stack.push(root);
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }

  next(): T {
    if (!this.hasNext()) {
      throw new Error("没有更多节点");
    }

    const node = this.stack.pop()!;
    this.visited.add(node);

    // 将子节点逆序添加到栈中，以保证正确的遍历顺序
    for (let i = node.children.length - 1; i >= 0; i--) {
      if (!this.visited.has(node.children[i])) {
        this.stack.push(node.children[i]);
      }
    }

    return node.value;
  }

  current(): T {
    if (this.stack.length === 0) {
      throw new Error("没有当前节点");
    }
    return this.stack[this.stack.length - 1].value;
  }
}

/**
 * 广度优先迭代器
 */
class BreadthFirstIterator<T> implements Iterator<T> {
  private queue: TreeNode<T>[] = [];
  private visited: Set<TreeNode<T>> = new Set();

  constructor(root: TreeNode<T>) {
    this.queue.push(root);
  }

  hasNext(): boolean {
    return this.queue.length > 0;
  }

  next(): T {
    if (!this.hasNext()) {
      throw new Error("没有更多节点");
    }

    const node = this.queue.shift()!;
    this.visited.add(node);

    // 将子节点添加到队列中
    for (const child of node.children) {
      if (!this.visited.has(child)) {
        this.queue.push(child);
      }
    }

    return node.value;
  }

  current(): T {
    if (this.queue.length === 0) {
      throw new Error("没有当前节点");
    }
    return this.queue[0].value;
  }
}

/**
 * 树集合
 */
class TreeCollection<T> implements Aggregate<T> {
  constructor(private root: TreeNode<T>) {}

  createIterator(): Iterator<T> {
    return new DepthFirstIterator(this.root);
  }

  createBreadthFirstIterator(): Iterator<T> {
    return new BreadthFirstIterator(this.root);
  }
}

// =============================================================================
// 示例3：范围迭代器
// =============================================================================

/**
 * 范围迭代器
 */
class RangeIterator implements Iterator<number> {
  private currentValue: number;
  private step: number;
  private end: number;

  constructor(start: number, end: number, step: number = 1) {
    this.currentValue = start;
    this.end = end;
    this.step = step;
  }

  hasNext(): boolean {
    return this.step > 0
      ? this.currentValue < this.end
      : this.currentValue > this.end;
  }

  next(): number {
    if (!this.hasNext()) {
      throw new Error("没有更多数字");
    }
    const value = this.currentValue;
    this.currentValue += this.step;
    return value;
  }

  current(): number {
    return this.currentValue;
  }
}

/**
 * 范围集合
 */
class RangeCollection implements Aggregate<number> {
  constructor(
    private start: number,
    private end: number,
    private step: number = 1
  ) {}

  createIterator(): Iterator<number> {
    return new RangeIterator(this.start, this.end, this.step);
  }
}

// =============================================================================
// 示例4：分页迭代器
// =============================================================================

/**
 * 分页数据
 */
interface PageData<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

/**
 * 异步迭代器接口
 */
interface AsyncIterator<T> {
  hasNext(): boolean;
  next(): Promise<T>;
  current(): T;
}

/**
 * 分页迭代器
 */
class PageIterator<T> implements AsyncIterator<T> {
  private items: T[] = [];
  private position: number = 0;
  private currentPage: number = 1;
  private pageSize: number;
  private totalCount: number;
  private dataFetcher: (page: number, pageSize: number) => Promise<PageData<T>>;

  constructor(
    dataFetcher: (page: number, pageSize: number) => Promise<PageData<T>>,
    pageSize: number = 10
  ) {
    this.dataFetcher = dataFetcher;
    this.pageSize = pageSize;
    this.totalCount = 0;
  }

  async initialize(): Promise<void> {
    const pageData = await this.dataFetcher(this.currentPage, this.pageSize);
    this.items = pageData.items;
    this.totalCount = pageData.totalCount;
  }

  hasNext(): boolean {
    return this.position < this.totalCount;
  }

  async next(): Promise<T> {
    if (!this.hasNext()) {
      throw new Error("没有更多数据");
    }

    // 如果当前页面的数据已经读完，加载下一页
    if (
      this.position >= this.currentPage * this.pageSize &&
      this.position < this.totalCount
    ) {
      this.currentPage++;
      const pageData = await this.dataFetcher(this.currentPage, this.pageSize);
      this.items = [...this.items, ...pageData.items];
    }

    return this.items[this.position++];
  }

  current(): T {
    return this.items[this.position];
  }
}

// =============================================================================
// 演示函数
// =============================================================================

/**
 * 演示迭代器模式的使用
 */
export function demonstrateIteratorPattern(): void {
  console.log("=== 迭代器模式演示 ===\n");

  // 1. 基本迭代器演示
  console.log("1. 基本迭代器：");
  const collection = new ArrayCollection<string>();
  collection.addItem("苹果");
  collection.addItem("香蕉");
  collection.addItem("橙子");

  const iterator = collection.createIterator();
  while (iterator.hasNext()) {
    console.log(`  - ${iterator.next()}`);
  }

  // 2. 书籍集合演示
  console.log("\n2. 书籍集合迭代器：");
  const bookCollection = new BookCollection();
  bookCollection.addBook(new Book("设计模式", "GoF", "978-0201633610"));
  bookCollection.addBook(new Book("重构", "Martin Fowler", "978-0134757599"));
  bookCollection.addBook(
    new Book("代码整洁之道", "Robert C. Martin", "978-0132350884")
  );

  console.log("  正向遍历：");
  const bookIterator = bookCollection.createIterator();
  while (bookIterator.hasNext()) {
    console.log(`    ${bookIterator.next()}`);
  }

  console.log("  反向遍历：");
  const reverseIterator = bookCollection.createReverseIterator();
  while (reverseIterator.hasNext()) {
    console.log(`    ${reverseIterator.next()}`);
  }

  // 3. 树形结构演示
  console.log("\n3. 树形结构迭代器：");
  const root = new TreeNode("根节点");
  const child1 = new TreeNode("子节点1");
  const child2 = new TreeNode("子节点2");
  const grandChild1 = new TreeNode("孙节点1");
  const grandChild2 = new TreeNode("孙节点2");

  child1.addChild(grandChild1);
  child2.addChild(grandChild2);
  root.addChild(child1);
  root.addChild(child2);

  const treeCollection = new TreeCollection(root);

  console.log("  深度优先遍历：");
  const depthFirstIterator = treeCollection.createIterator();
  while (depthFirstIterator.hasNext()) {
    console.log(`    ${depthFirstIterator.next()}`);
  }

  console.log("  广度优先遍历：");
  const breadthFirstIterator = treeCollection.createBreadthFirstIterator();
  while (breadthFirstIterator.hasNext()) {
    console.log(`    ${breadthFirstIterator.next()}`);
  }

  // 4. 范围迭代器演示
  console.log("\n4. 范围迭代器：");
  const rangeCollection = new RangeCollection(1, 10, 2);
  const rangeIterator = rangeCollection.createIterator();

  console.log("  数字序列（1到10，步长2）：");
  while (rangeIterator.hasNext()) {
    console.log(`    ${rangeIterator.next()}`);
  }

  console.log("\n=== 迭代器模式演示完成 ===");
}

// 导出所有类和接口
export {
  Iterator,
  Aggregate,
  ArrayIterator,
  ArrayCollection,
  Book,
  BookCollection,
  BookIterator,
  ReverseBookIterator,
  TreeNode,
  DepthFirstIterator,
  BreadthFirstIterator,
  TreeCollection,
  RangeIterator,
  RangeCollection,
  PageIterator,
  PageData,
};
