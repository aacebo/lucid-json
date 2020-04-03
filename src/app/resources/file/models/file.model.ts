export class File {
  readonly name: string;
  readonly path: string;

  get text() { return this._text; }
  set text(v) {
    this._text = v;
    this._json = JSON.parse(v);
  }
  private _text: string;

  get json() { return this._json; }
  private _json?: any;

  constructor(name: string, path: string, text: string) {
    this.name = name;
    this.path = path;
    this.text = text;
  }
}
