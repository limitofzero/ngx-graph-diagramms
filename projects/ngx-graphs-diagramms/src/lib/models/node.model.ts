import { BaseModel } from './base.model';

export class NodeModel extends BaseModel {
  x: number;
  y: number;
  width: number;
  height: number;
  readonly type: string;

  ports: Set<string>;

  constructor(data: {
    type: string,
    id?: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    ports?: Set<string>
  }) {
    super(data.id);
    const { type, x, y, ports, width, height } = data;
    this.type = type;
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.ports = ports || new Set();
  }

  cloneWithCoords(x: number, y: number): NodeModel {
    const cloned = this.clone();
    cloned.x = x;
    cloned.y = y;

    return cloned;
  }

  clone(): NodeModel {
    return new NodeModel(this);
  }
}

