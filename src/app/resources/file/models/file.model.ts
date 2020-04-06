import * as generateSchema from 'generate-schema';

export class File {
  readonly name: string;
  readonly path: string;

  get text() { return this._text; }
  set text(v) {
    this._text = v;

    try {
      this.json = JSON.parse(v);
    } catch (_) {
      this.json = undefined;
    }
  }
  private _text: string;

  get json() { return this._json; }
  set json(v) {
    this._json = v;

    if (v) {
      this._schema = generateSchema.generic(v);
    } else {
      this._schema = undefined;
    }
  }
  private _json?: any;

  get schema() { return this._schema; }
  private _schema?: any;

  dirty = false;
  tree = false;

  constructor(args?: Partial<File>) {
    Object.assign(this, args);
  }
}
