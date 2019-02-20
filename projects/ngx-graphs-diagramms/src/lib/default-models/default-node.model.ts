import { NodeModel } from '../models/node.model';

export class DefaultNodeModel extends NodeModel {
  description: string;

  constructor(id?: string) {
    super(id);
  }

  clone(): DefaultNodeModel {
    const cloned = new DefaultNodeModel(this.id);
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.ports = this.ports;
    cloned.description = this.description;

    return cloned;
  }
}
