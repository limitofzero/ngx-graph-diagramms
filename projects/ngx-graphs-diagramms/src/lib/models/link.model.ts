import { BaseModel } from './base.model';
import { PortModel } from './port.model';

export class LinkModel extends BaseModel {
  source: PortModel | null;
  target: PortModel | null;
  points: string[] = [];

  constructor(id?: string) {
    super(id);
  }

  clone(): LinkModel {
    const cloned = new LinkModel(this.id);
    cloned.source = this.source;
    cloned.target = this.target;
    cloned.points = this.points;

    return cloned;
  }
}
