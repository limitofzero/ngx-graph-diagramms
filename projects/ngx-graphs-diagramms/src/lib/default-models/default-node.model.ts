import { NodeModel } from '../models/node.model';

export class DefaultNodeModel extends NodeModel {
  description: string;

  constructor(data: { type: string, id?: string }) {
    super(data);
  }

  clone(): DefaultNodeModel {
    const cloned = new DefaultNodeModel(this);
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.ports = this.ports;
    cloned.description = this.description;

    return cloned;
  }
}
