import { BaseModel } from './base.model';

export class PortModel extends BaseModel {
  x: number;
  y: number;
  links: Set<number> = new Set<number>();

  constructor(id?: string) {
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
