import { PortModel } from '../models/port.model';

export class DefaultPortModel extends PortModel {
  positionClass: string;

  constructor(id?: string) {
    super(id);
  }

  clone(): PortModel {
    const cloned = new DefaultPortModel(this.id);
    cloned.links = this.links;
    cloned.positionClass = this.positionClass;

    return cloned;
  }
}
