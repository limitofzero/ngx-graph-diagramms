import { BaseModel } from './base.model';

export class PointModel extends BaseModel {
  x = 0;
  y = 0;

  constructor(data: {
    id?: string;
    x?: number;
    y?: number;
  }) {
    super(data.id);
    const { x, y } = data;
    this.x = x || 0;
    this.y = y || 0;
  }

  cloneWithCoords(x: number, y: number): PointModel {
    const cloned = this.clone();
    cloned.x = x;
    cloned.y = y;

    return cloned;
  }

  clone(): PointModel {
    return new PointModel(this);
  }
}
