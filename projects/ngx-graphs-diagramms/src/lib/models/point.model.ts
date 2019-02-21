import { BaseModel } from './base.model';

export class PointModel extends BaseModel {
  x = 0;
  y = 0;

  constructor(id?: string) {
    super(id);
  }

  clone(): PointModel {
    const cloned = new PointModel(this.id);
    cloned.x = this.x;
    cloned.y = this.y;

    return cloned;
  }
}
