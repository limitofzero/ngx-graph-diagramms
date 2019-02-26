import { BaseModel } from './base.model';
import { PortModel } from './port.model';

export class NodeModel extends BaseModel {
  x = 0;
  y = 0;
  type: string;
  width: number;
  height: number;

  ports: { [s: string]: PortModel } = {};

  constructor(data: {
    type: string,
    id?: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    ports?: { [s: string]: PortModel }
  }) {
    super(data.id);
    const { type, x, y, width, height, ports } = data;
    this.type = type;
    this.width = width || 0;
    this.height = height || 0;
    this.x = x || 0;
    this.y = y || 0;
    this.ports = ports || {};
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

