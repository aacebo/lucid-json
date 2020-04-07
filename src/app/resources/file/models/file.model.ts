export interface IFile {
  readonly name: string;
  readonly path: string;
  text: string;
  json?: any;
  schema?: any;
  typescript?: string;
  dirty?: boolean;
  tree?: boolean;
}
