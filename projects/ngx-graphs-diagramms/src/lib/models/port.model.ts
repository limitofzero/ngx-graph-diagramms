import { BaseModel } from './base.model';

export class PortModel extends BaseModel {
  x: number;
  y: number;
  positionClass: string;

  constructor(id?: number) {
    super(id);
  }

  clone(): PortModel {
    const newModel = new PortModel(this.id);
    newModel.x = this.x;
    newModel.y = this.y;

    return newModel;
  }
}
