/**
 * 适配器模式 (Adapter Pattern)
 * 允许不兼容的接口之间进行协作
 */

// 目标接口
export interface Target {
  request(): string;
}

// 需要适配的类
export class Adaptee {
  public specificRequest(): string {
    return "Special request";
  }
}

// 适配器类
export class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest();
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

// 实际应用示例：媒体播放器适配器
export interface MediaPlayer {
  play(audioType: string, filename: string): void;
}

export interface AdvancedMediaPlayer {
  playVlc(filename: string): void;
  playMp4(filename: string): void;
}

export class VlcPlayer implements AdvancedMediaPlayer {
  public playVlc(filename: string): void {
    console.log(`Playing vlc file: ${filename}`);
  }

  public playMp4(filename: string): void {
    // 空实现
  }
}

export class Mp4Player implements AdvancedMediaPlayer {
  public playVlc(filename: string): void {
    // 空实现
  }

  public playMp4(filename: string): void {
    console.log(`Playing mp4 file: ${filename}`);
  }
}

// 媒体适配器
export class MediaAdapter implements MediaPlayer {
  private advancedMusicPlayer: AdvancedMediaPlayer;

  constructor(audioType: string) {
    if (audioType === "vlc") {
      this.advancedMusicPlayer = new VlcPlayer();
    } else if (audioType === "mp4") {
      this.advancedMusicPlayer = new Mp4Player();
    } else {
      throw new Error(`Unsupported audio type: ${audioType}`);
    }
  }

  public play(audioType: string, filename: string): void {
    if (audioType === "vlc") {
      this.advancedMusicPlayer.playVlc(filename);
    } else if (audioType === "mp4") {
      this.advancedMusicPlayer.playMp4(filename);
    }
  }
}

// 音频播放器
export class AudioPlayer implements MediaPlayer {
  private mediaAdapter?: MediaAdapter;

  public play(audioType: string, filename: string): void {
    // 内置支持 mp3 音乐播放
    if (audioType === "mp3") {
      console.log(`Playing mp3 file: ${filename}`);
    } else if (audioType === "vlc" || audioType === "mp4") {
      // 通过适配器播放其他格式
      this.mediaAdapter = new MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, filename);
    } else {
      console.log(`${audioType} format not supported`);
    }
  }
}

// 电子设备适配器示例
export class OldPrinter {
  public printOldFormat(text: string): void {
    console.log(`Old printer: ${text}`);
  }
}

export interface NewPrinter {
  print(document: { content: string; format: string }): void;
}

export class PrinterAdapter implements NewPrinter {
  private oldPrinter: OldPrinter;

  constructor(oldPrinter: OldPrinter) {
    this.oldPrinter = oldPrinter;
  }

  public print(document: { content: string; format: string }): void {
    // 将新格式转换为旧格式
    const convertedText = `[${document.format}] ${document.content}`;
    this.oldPrinter.printOldFormat(convertedText);
  }
}

// 使用示例
export function demonstrateAdapter(): void {
  console.log("=== 适配器模式示例 ===");

  // 基本适配器示例
  const adaptee = new Adaptee();
  const adapter = new Adapter(adaptee);

  console.log("Adaptee:", adaptee.specificRequest());
  console.log("Adapter:", adapter.request());

  // 媒体播放器适配器示例
  const audioPlayer = new AudioPlayer();

  audioPlayer.play("mp3", "song.mp3");
  audioPlayer.play("mp4", "video.mp4");
  audioPlayer.play("vlc", "movie.vlc");
  audioPlayer.play("avi", "movie.avi");

  // 打印机适配器示例
  const oldPrinter = new OldPrinter();
  const printerAdapter = new PrinterAdapter(oldPrinter);

  printerAdapter.print({ content: "Hello World", format: "PDF" });
  printerAdapter.print({ content: "Test Document", format: "DOCX" });
}
