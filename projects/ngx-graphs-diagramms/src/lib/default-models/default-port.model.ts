import { PortModel } from '../models/port.model';

export class DefaultPortModel extends PortModel {
  positionClass: string;

  constructor(positionClass: string, id?: string) {
    super(id);
    this.positionClass = positionClass;
  }

  clone(): PortModel {
    const cloned = new DefaultPortModel(this.id);
    cloned.links = this.links;
    cloned.positionClass = this.positionClass;

    return cloned;
  }
}
