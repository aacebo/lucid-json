import * as fs from 'fs';
import * as path from 'path';

export class File {
  static async read(filePath: string) {
    let text = '';
    const name = path.basename(filePath);
    const stream = fs.createReadStream(filePath);

    for await (const chunk of stream) {
      text += chunk;
    }

    return {
      name,
      text,
    };
  }

  static async write(filePath: string, text: string) {
    const name = path.basename(filePath);
    const stream = fs.createWriteStream(filePath);

    stream.write(text);
    return name;
  }
}
