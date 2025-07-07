/**
 * 外观模式 (Facade Pattern)
 * 为子系统中的一组接口提供一个统一的接口，使得子系统更容易使用
 */

// 子系统类
export class SubSystemA {
  public operationA(): string {
    return "SubSystemA: Ready!";
  }

  public operationA2(): string {
    return "SubSystemA: Go!";
  }
}

export class SubSystemB {
  public operationB(): string {
    return "SubSystemB: Get ready!";
  }

  public operationB2(): string {
    return "SubSystemB: Fire!";
  }
}

// 外观类
export class Facade {
  private subSystemA: SubSystemA;
  private subSystemB: SubSystemB;

  constructor(subSystemA?: SubSystemA, subSystemB?: SubSystemB) {
    this.subSystemA = subSystemA || new SubSystemA();
    this.subSystemB = subSystemB || new SubSystemB();
  }

  public operation(): string {
    let result = "Facade initializes subsystems:\\n";
    result += this.subSystemA.operationA();
    result += "\\n";
    result += this.subSystemB.operationB();
    result += "\\n";
    result += "Facade orders subsystems to perform the action:\\n";
    result += this.subSystemA.operationA2();
    result += "\\n";
    result += this.subSystemB.operationB2();
    return result;
  }
}

// 实际应用示例：家庭影院系统
export class Amplifier {
  public on(): void {
    console.log("Amplifier on");
  }

  public off(): void {
    console.log("Amplifier off");
  }

  public setVolume(level: number): void {
    console.log(`Amplifier volume set to ${level}`);
  }
}

export class Tuner {
  public on(): void {
    console.log("Tuner on");
  }

  public off(): void {
    console.log("Tuner off");
  }

  public setFrequency(frequency: number): void {
    console.log(`Tuner frequency set to ${frequency}`);
  }
}

export class DVDPlayer {
  public on(): void {
    console.log("DVD Player on");
  }

  public off(): void {
    console.log("DVD Player off");
  }

  public play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }

  public stop(): void {
    console.log("DVD Player stopped");
  }
}

export class Projector {
  public on(): void {
    console.log("Projector on");
  }

  public off(): void {
    console.log("Projector off");
  }

  public wideScreenMode(): void {
    console.log("Projector set to wide screen mode");
  }
}

export class Screen {
  public up(): void {
    console.log("Screen up");
  }

  public down(): void {
    console.log("Screen down");
  }
}

export class PopcornPopper {
  public on(): void {
    console.log("Popcorn popper on");
  }

  public off(): void {
    console.log("Popcorn popper off");
  }

  public pop(): void {
    console.log("Popcorn popper popping popcorn!");
  }
}

export class TheaterLights {
  public on(): void {
    console.log("Theater lights on");
  }

  public off(): void {
    console.log("Theater lights off");
  }

  public dim(level: number): void {
    console.log(`Theater lights dimmed to ${level}%`);
  }
}

// 家庭影院外观
export class HomeTheaterFacade {
  private amplifier: Amplifier;
  private tuner: Tuner;
  private dvdPlayer: DVDPlayer;
  private projector: Projector;
  private screen: Screen;
  private lights: TheaterLights;
  private popper: PopcornPopper;

  constructor(
    amplifier: Amplifier,
    tuner: Tuner,
    dvdPlayer: DVDPlayer,
    projector: Projector,
    screen: Screen,
    lights: TheaterLights,
    popper: PopcornPopper
  ) {
    this.amplifier = amplifier;
    this.tuner = tuner;
    this.dvdPlayer = dvdPlayer;
    this.projector = projector;
    this.screen = screen;
    this.lights = lights;
    this.popper = popper;
  }

  public watchMovie(movie: string): void {
    console.log("Get ready to watch a movie...");
    this.popper.on();
    this.popper.pop();
    this.lights.dim(10);
    this.screen.down();
    this.projector.on();
    this.projector.wideScreenMode();
    this.amplifier.on();
    this.amplifier.setVolume(5);
    this.dvdPlayer.on();
    this.dvdPlayer.play(movie);
  }

  public endMovie(): void {
    console.log("Shutting movie theater down...");
    this.popper.off();
    this.lights.on();
    this.screen.up();
    this.projector.off();
    this.amplifier.off();
    this.dvdPlayer.stop();
    this.dvdPlayer.off();
  }
}

// 计算机系统外观示例
export class CPU {
  public freeze(): void {
    console.log("CPU: Freezing processor");
  }

  public jump(position: number): void {
    console.log(`CPU: Jumping to position ${position}`);
  }

  public execute(): void {
    console.log("CPU: Executing instructions");
  }
}

export class Memory {
  public load(position: number, data: string): void {
    console.log(`Memory: Loading data "${data}" at position ${position}`);
  }
}

export class HardDrive {
  public read(lba: number, size: number): string {
    console.log(`HDD: Reading ${size} bytes from LBA ${lba}`);
    return "Boot data";
  }
}

// 计算机外观
export class ComputerFacade {
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;

  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  public start(): void {
    console.log("Computer is starting...");
    this.cpu.freeze();
    const bootData = this.hardDrive.read(0, 1024);
    this.memory.load(0, bootData);
    this.cpu.jump(0);
    this.cpu.execute();
    console.log("Computer started successfully!");
  }
}

// 银行系统外观示例
export class AccountNumberCheck {
  public checkAccount(accountNumber: string): boolean {
    console.log(`Checking account number: ${accountNumber}`);
    return accountNumber.length === 10;
  }
}

export class SecurityCodeCheck {
  public checkCode(code: string): boolean {
    console.log(`Checking security code: ${code}`);
    return code.length === 3;
  }
}

export class FundsCheck {
  public checkFunds(amount: number): boolean {
    console.log(`Checking funds for amount: $${amount}`);
    return amount <= 1000; // 模拟余额检查
  }
}

export class WelcomeToBank {
  public welcome(): void {
    console.log("Welcome to the bank!");
  }
}

// 银行服务外观
export class BankAccountFacade {
  private accountCheck: AccountNumberCheck;
  private codeCheck: SecurityCodeCheck;
  private fundsCheck: FundsCheck;
  private welcome: WelcomeToBank;

  constructor(accountNumber: string, securityCode: string) {
    this.accountCheck = new AccountNumberCheck();
    this.codeCheck = new SecurityCodeCheck();
    this.fundsCheck = new FundsCheck();
    this.welcome = new WelcomeToBank();

    console.log("Creating bank account facade...");
  }

  public withdrawCash(amount: number): void {
    console.log(`\\nWithdrawing $${amount}...`);

    if (
      this.accountCheck.checkAccount("1234567890") &&
      this.codeCheck.checkCode("123") &&
      this.fundsCheck.checkFunds(amount)
    ) {
      console.log("Transaction approved!");
      console.log(`Dispensing $${amount}...`);
      this.welcome.welcome();
    } else {
      console.log("Transaction denied!");
    }
  }

  public depositCash(amount: number): void {
    console.log(`\\nDepositing $${amount}...`);

    if (
      this.accountCheck.checkAccount("1234567890") &&
      this.codeCheck.checkCode("123")
    ) {
      console.log("Deposit approved!");
      console.log(`Depositing $${amount}...`);
      this.welcome.welcome();
    } else {
      console.log("Deposit denied!");
    }
  }
}

// 网络服务外观示例
export class HTTPService {
  public get(url: string): string {
    console.log(`HTTP GET: ${url}`);
    // 返回模拟的JSON响应
    if (url.includes("/users/")) {
      const userId = url.split("/").pop();
      return `{"id": "${userId}", "name": "用户${userId}", "email": "user${userId}@example.com"}`;
    }
    return '{"message": "HTTP Response"}';
  }

  public post(url: string, data: any): string {
    console.log(`HTTP POST: ${url}`, data);
    return '{"message": "Created successfully", "id": "123"}';
  }
}

export class JSONParser {
  public parse(data: string): any {
    console.log("Parsing JSON data");
    return JSON.parse(data || "{}");
  }

  public stringify(data: any): string {
    console.log("Stringifying JSON data");
    return JSON.stringify(data);
  }
}

export class Logger {
  public log(message: string): void {
    console.log(`[LOG] ${message}`);
  }

  public error(message: string): void {
    console.log(`[ERROR] ${message}`);
  }
}

// API 客户端外观
export class APIClientFacade {
  private httpService: HTTPService;
  private jsonParser: JSONParser;
  private logger: Logger;

  constructor() {
    this.httpService = new HTTPService();
    this.jsonParser = new JSONParser();
    this.logger = new Logger();
  }

  public fetchUser(userId: string): any {
    this.logger.log(`Fetching user ${userId}`);
    const response = this.httpService.get(`/users/${userId}`);
    return this.jsonParser.parse(response);
  }

  public createUser(userData: any): any {
    this.logger.log("Creating new user");
    const jsonData = this.jsonParser.stringify(userData);
    const response = this.httpService.post("/users", jsonData);
    return this.jsonParser.parse(response);
  }
}

// 使用示例
export function demonstrateFacade(): void {
  console.log("=== 外观模式示例 ===");

  // 基本外观示例
  const subSystemA = new SubSystemA();
  const subSystemB = new SubSystemB();
  const facade = new Facade(subSystemA, subSystemB);

  console.log(facade.operation());

  // 家庭影院外观示例
  console.log("\\n--- 家庭影院外观示例 ---");
  const homeTheater = new HomeTheaterFacade(
    new Amplifier(),
    new Tuner(),
    new DVDPlayer(),
    new Projector(),
    new Screen(),
    new TheaterLights(),
    new PopcornPopper()
  );

  homeTheater.watchMovie("The Matrix");
  console.log("\\n--- Intermission ---\\n");
  homeTheater.endMovie();

  // 计算机外观示例
  console.log("\\n--- 计算机外观示例 ---");
  const computer = new ComputerFacade();
  computer.start();

  // 银行外观示例
  console.log("\\n--- 银行外观示例 ---");
  const bankAccount = new BankAccountFacade("1234567890", "123");
  bankAccount.withdrawCash(100);
  bankAccount.depositCash(200);
  bankAccount.withdrawCash(1500); // 应该被拒绝

  // API 客户端外观示例
  console.log("\\n--- API 客户端外观示例 ---");
  const apiClient = new APIClientFacade();
  apiClient.fetchUser("123");
  apiClient.createUser({ name: "John Doe", email: "john@example.com" });
}
