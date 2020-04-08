import { IGrid } from './grid.model';

export interface IFile {
  readonly name: string;
  readonly path: string;
  readonly grid: IGrid;
  text: string;
  json?: any;
  schema?: any;
  typescript?: string;
  dirty?: boolean;
}
