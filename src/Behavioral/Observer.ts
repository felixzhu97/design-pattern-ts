/**
 * 观察者模式 (Observer Pattern)
 * 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新
 */

// 观察者接口
export interface Observer {
  update(subject: Subject): void;
}

// 主题接口
export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// 具体主题
export class ConcreteSubject implements Subject {
  private state: number = 0;
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log("Subject: Observer has been attached already.");
      return;
    }

    console.log("Subject: Attached an observer.");
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      console.log("Subject: Nonexistent observer.");
      return;
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  public notify(): void {
    console.log("Subject: Notifying observers...");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public someBusinessLogic(): void {
    console.log("\nSubject: I'm doing something important.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: My state has just changed to: ${this.state}`);
    this.notify();
  }

  public getState(): number {
    return this.state;
  }
}

// 具体观察者A
export class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.getState() < 3) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}

// 具体观察者B
export class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.getState() === 0 || subject.getState() >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

// 实际应用示例：新闻发布系统
export interface NewsObserver {
  update(news: string, category: string): void;
}

export class NewsAgency {
  private news: string = "";
  private category: string = "";
  private observers: NewsObserver[] = [];

  public addObserver(observer: NewsObserver): void {
    this.observers.push(observer);
    console.log("NewsAgency: Observer added");
  }

  public removeObserver(observer: NewsObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log("NewsAgency: Observer removed");
    }
  }

  public setNews(news: string, category: string): void {
    this.news = news;
    this.category = category;
    this.notifyObservers();
  }

  private notifyObservers(): void {
    console.log(`NewsAgency: Broadcasting news in ${this.category} category`);
    for (const observer of this.observers) {
      observer.update(this.news, this.category);
    }
  }
}

export class NewsChannel implements NewsObserver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(news: string, category: string): void {
    console.log(`${this.name}: Breaking news in ${category} - ${news}`);
  }
}

export class NewspaperOffice implements NewsObserver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(news: string, category: string): void {
    console.log(`${this.name}: Will publish tomorrow - [${category}] ${news}`);
  }
}

// 股票价格监控示例
export interface StockObserver {
  update(symbol: string, price: number): void;
}

export class Stock {
  private symbol: string;
  private price: number;
  private observers: StockObserver[] = [];

  constructor(symbol: string, price: number) {
    this.symbol = symbol;
    this.price = price;
  }

  public addObserver(observer: StockObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: StockObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public setPrice(price: number): void {
    console.log(
      `Stock ${this.symbol}: Price changed from $${this.price} to $${price}`
    );
    this.price = price;
    this.notifyObservers();
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.symbol, this.price);
    }
  }

  public getSymbol(): string {
    return this.symbol;
  }

  public getPrice(): number {
    return this.price;
  }
}

export class StockTrader implements StockObserver {
  private name: string;
  private buyThreshold: number;
  private sellThreshold: number;

  constructor(name: string, buyThreshold: number, sellThreshold: number) {
    this.name = name;
    this.buyThreshold = buyThreshold;
    this.sellThreshold = sellThreshold;
  }

  public update(symbol: string, price: number): void {
    if (price <= this.buyThreshold) {
      console.log(`${this.name}: BUY signal for ${symbol} at $${price}`);
    } else if (price >= this.sellThreshold) {
      console.log(`${this.name}: SELL signal for ${symbol} at $${price}`);
    } else {
      console.log(`${this.name}: HOLD for ${symbol} at $${price}`);
    }
  }
}

export class StockDisplay implements StockObserver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(symbol: string, price: number): void {
    console.log(`${this.name}: ${symbol} is now trading at $${price}`);
  }
}

// 天气预报系统示例
export interface WeatherObserver {
  update(temperature: number, humidity: number, pressure: number): void;
}

export class WeatherStation {
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;
  private observers: WeatherObserver[] = [];

  public addObserver(observer: WeatherObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: WeatherObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }

  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }
}

export class CurrentConditionsDisplay implements WeatherObserver {
  public update(temperature: number, humidity: number, pressure: number): void {
    console.log(
      `Current conditions: ${temperature}°C, ${humidity}% humidity, ${pressure} hPa`
    );
  }
}

export class StatisticsDisplay implements WeatherObserver {
  private temperatures: number[] = [];

  public update(temperature: number, humidity: number, pressure: number): void {
    this.temperatures.push(temperature);
    const avg =
      this.temperatures.reduce((a, b) => a + b, 0) / this.temperatures.length;
    const max = Math.max(...this.temperatures);
    const min = Math.min(...this.temperatures);

    console.log(
      `Temperature stats: Avg=${avg.toFixed(1)}°C, Max=${max}°C, Min=${min}°C`
    );
  }
}

export class ForecastDisplay implements WeatherObserver {
  private lastPressure: number = 0;

  public update(temperature: number, humidity: number, pressure: number): void {
    let forecast = "";

    if (pressure > this.lastPressure) {
      forecast = "Improving weather on the way!";
    } else if (pressure === this.lastPressure) {
      forecast = "More of the same";
    } else {
      forecast = "Watch out for cooler, rainy weather";
    }

    console.log(`Forecast: ${forecast}`);
    this.lastPressure = pressure;
  }
}

// EventEmitter 示例
export class EventEmitter {
  private events: Map<string, Function[]> = new Map();

  public on(event: string, listener: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(listener);
  }

  public off(event: string, listener: Function): void {
    const listeners = this.events.get(event);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  public emit(event: string, ...args: any[]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }

  public once(event: string, listener: Function): void {
    const onceWrapper = (...args: any[]) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

// 使用示例
export function demonstrateObserver(): void {
  console.log("=== 观察者模式示例 ===");

  // 基本观察者示例
  const subject = new ConcreteSubject();

  const observer1 = new ConcreteObserverA();
  subject.attach(observer1);

  const observer2 = new ConcreteObserverB();
  subject.attach(observer2);

  subject.someBusinessLogic();
  subject.someBusinessLogic();

  subject.detach(observer2);
  subject.someBusinessLogic();

  // 新闻发布系统示例
  console.log("\n--- 新闻发布系统示例 ---");
  const newsAgency = new NewsAgency();

  const cnn = new NewsChannel("CNN");
  const bbc = new NewsChannel("BBC");
  const nytimes = new NewspaperOffice("NY Times");

  newsAgency.addObserver(cnn);
  newsAgency.addObserver(bbc);
  newsAgency.addObserver(nytimes);

  newsAgency.setNews("Market hits new high", "Finance");
  newsAgency.setNews("New technology breakthrough", "Technology");

  // 股票价格监控示例
  console.log("\n--- 股票价格监控示例 ---");
  const appleStock = new Stock("AAPL", 150);

  const trader1 = new StockTrader("John", 140, 160);
  const trader2 = new StockTrader("Jane", 145, 155);
  const display = new StockDisplay("Market Display");

  appleStock.addObserver(trader1);
  appleStock.addObserver(trader2);
  appleStock.addObserver(display);

  appleStock.setPrice(142);
  appleStock.setPrice(138);
  appleStock.setPrice(162);

  // 天气预报系统示例
  console.log("\n--- 天气预报系统示例 ---");
  const weatherStation = new WeatherStation();

  const currentDisplay = new CurrentConditionsDisplay();
  const statsDisplay = new StatisticsDisplay();
  const forecastDisplay = new ForecastDisplay();

  weatherStation.addObserver(currentDisplay);
  weatherStation.addObserver(statsDisplay);
  weatherStation.addObserver(forecastDisplay);

  weatherStation.setMeasurements(25, 65, 1013);
  weatherStation.setMeasurements(27, 60, 1015);
  weatherStation.setMeasurements(22, 70, 1010);

  // EventEmitter 示例
  console.log("\n--- EventEmitter 示例 ---");
  const emitter = new EventEmitter();

  const listener1 = (data: string) => console.log(`Listener 1: ${data}`);
  const listener2 = (data: string) => console.log(`Listener 2: ${data}`);
  const onceListener = (data: string) => console.log(`Once listener: ${data}`);

  emitter.on("test", listener1);
  emitter.on("test", listener2);
  emitter.once("test", onceListener);

  console.log("Emitting first event:");
  emitter.emit("test", "Hello World");

  console.log("Emitting second event:");
  emitter.emit("test", "Hello Again");

  emitter.off("test", listener1);
  console.log("Emitting third event (after removing listener1):");
  emitter.emit("test", "Final message");
}
