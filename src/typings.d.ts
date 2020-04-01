// tslint:disable-next-line
interface Window {
  readonly require: NodeRequire;
}

// tslint:disable-next-line
interface NodeModule {
  id: string;
}

// declare var window: Window;
declare var module: NodeModule;
declare var require: NodeRequire;
