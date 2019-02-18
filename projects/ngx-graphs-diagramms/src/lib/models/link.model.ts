import { BaseModel } from './base.model';
import { PortModel } from './port.model';

export class LinkModel extends BaseModel {
  source: PortModel | null;
  target: PortModel | null;

  constructor(id?: number) {
    super(id);
  }

  clone(): LinkModel {
    const cloned = new LinkModel(this.id);
    cloned.source = this.source;
    cloned.target = this.target;

    return cloned;
  }
}
