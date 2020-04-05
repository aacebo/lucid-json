export class File {
  readonly name: string;
  readonly path: string;

  get text() { return this._text; }
  set text(v) {
    this._text = v;

    try {
      this._json = JSON.parse(v);
    } catch (_) {
      this._json = undefined;
    }
  }
  private _text: string;

  get json() { return this._json; }
  private _json?: any;

  dirty = false;
  tree = false;

  constructor(name: string, path: string, text: string) {
    this.name = name;
    this.path = path;
    this.text = text;
  }
}
