import { BaseModel } from './base.model';

export class PortModel extends BaseModel {
  x: number;
  y: number;

  constructor(id?: number) {
    super(id);
  }

  clone(): PortModel {
    const cloned = new PortModel(this.id);
    cloned.x = this.x;
    cloned.y = this.y;

    return cloned;
  }
}
