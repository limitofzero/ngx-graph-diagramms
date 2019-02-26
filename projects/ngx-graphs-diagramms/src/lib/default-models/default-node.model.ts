import { NodeModel } from '../models/node.model';

export class DefaultNodeModel extends NodeModel {
  description: string;

  constructor(data: { type: string, description?: string, id?: string }) {
    super(data);
    this.description = data.description || '';
  }

  clone(): DefaultNodeModel {
    const cloned = new DefaultNodeModel(this);
    cloned.description = this.description;

    return cloned;
  }
}
