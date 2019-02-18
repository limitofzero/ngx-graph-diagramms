import { PortModel } from '../models/port.model';

export class DefaultPortModel extends PortModel {
  positionClass: string;

  constructor(id?: number) {
    super(id);
  }

  clone(): PortModel {
    const cloned = new DefaultPortModel(this.id);
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.positionClass = this.positionClass;

    return cloned;
  }
}
