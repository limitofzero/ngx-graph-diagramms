import { PortModel } from '../models/port.model';

export class DefaultPortModel extends PortModel {
  positionClass: string;

  constructor(data: { positionClass: string, id?: string }) {
    super(data);
    const { positionClass } = data;
    this.positionClass = positionClass;
  }

  clone(): DefaultPortModel {
    return new DefaultPortModel(this);
  }
}
