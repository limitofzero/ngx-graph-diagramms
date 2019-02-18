import { BaseModel } from './base.model';
import { LinkMap } from '../interfaces/link-map';

export class PortModel extends BaseModel {
  x: number;
  y: number;
  links: LinkMap = {};

  constructor(id?: number) {
    super(id);
  }

  clone(): PortModel {
    const cloned = new PortModel(this.id);
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.links = this.links;

    return cloned;
  }
}
