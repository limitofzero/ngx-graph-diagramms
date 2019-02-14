import { BaseModel } from './base.model';
import { Draggable } from '../interfaces/draggable';

export class NodeModel extends BaseModel implements Draggable {
  x = 0;
  y = 0;
  width: number;
  height: number;

  constructor(id?: number) {
    super(id);
  }

  clone(): NodeModel {
    const clonedNode = new NodeModel(this.id);
    clonedNode.x = this.x;
    clonedNode.y = this.y;
    clonedNode.width = this.width;
    clonedNode.height = this.height;

    return clonedNode;
  }

  getNodeWithPosition(x: number, y: number): NodeModel {
    const newObject = this.clone();
    newObject.x = x;
    newObject.y = y;

    return newObject;
  }

  getNodeWithDimensions(width: number, height: number): NodeModel {
    const newObject = this.clone();
    newObject.width = width;
    newObject.height = height;

    return newObject;
  }
}

