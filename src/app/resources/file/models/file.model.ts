export interface IFile {
  readonly name: string;
  readonly path: string;
  readonly visible: {
    tree?: boolean;
    schema?: boolean;
    typescript?: boolean;
  };

  text: string;
  json?: any;
  schema?: any;
  typescript?: string;
  dirty?: boolean;
}
