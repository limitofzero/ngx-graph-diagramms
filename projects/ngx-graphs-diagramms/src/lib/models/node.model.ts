import { BaseModel } from './base.model';

export class NodeModel extends BaseModel {
  x = 0;
  y = 0;
  width: number;
  height: number;

  constructor(id?: number) {
    super(id);
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  updateDimensions(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}

