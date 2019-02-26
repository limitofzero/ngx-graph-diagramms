import { BaseModel } from './base.model';
import { PortModel } from './port.model';

export class NodeModel extends BaseModel {
  x = 0;
  y = 0;
  type: string;
  width: number;
  height: number;

  ports: { [s: string]: PortModel } = {};

  constructor(data: { type: string, id?: string }) {
    super(data.id);
    this.type = data.type;
  }

  clone(): NodeModel {
    const { type, id } = this;
    const cloned = new NodeModel({ type, id });
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.ports = this.ports;

    return cloned;
  }

  cloneNodeWithPosition(x: number, y: number): NodeModel {
    const cloned = this.clone();
    cloned.x = x;
    cloned.y = y;

    return cloned;
  }

  setDimensionsAndClone(width: number, height: number): NodeModel {
    this.height = height;
    this.width = width;
    return this.clone();
  }
}

