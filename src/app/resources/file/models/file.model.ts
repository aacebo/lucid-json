import { IGrid } from './grid.model';

export interface IFile {
  readonly id: string;
  readonly grid: IGrid;
  path: string;
  name?: string;
  text: string;
  json?: any;
  schema?: any;
  ts?: string;
  yml?: string;
  dirty?: boolean;
}
