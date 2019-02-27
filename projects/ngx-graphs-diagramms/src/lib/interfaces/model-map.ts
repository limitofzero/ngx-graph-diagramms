import { BaseModel } from '../models/base.model';

export interface ModelMap<T extends BaseModel> {
  [s: string]: T;
}
