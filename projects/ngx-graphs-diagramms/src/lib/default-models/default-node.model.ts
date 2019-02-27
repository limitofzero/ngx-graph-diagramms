import { NodeModel } from '../models/node.model';

export class DefaultNodeModel extends NodeModel {
  readonly BORDER_WIDTH = 2;
  description: string;

  constructor(data: { type: string, description?: string, id?: string }) {
    super(data);
    this.description = data.description || '';
  }

  clone(): DefaultNodeModel {
    return new DefaultNodeModel(this);
  }
}
