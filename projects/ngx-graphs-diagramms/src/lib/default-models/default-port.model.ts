import { PortModel } from '../models/port.model';
import { NodeModel } from '../models/node.model';
import { Coords } from '../interfaces/coords';

export class DefaultPortModel extends PortModel {
  positionClass: string;

  constructor(data: {
    type: string,
    positionClass: string,
    id?: string
  }) {
    super(data);
    const { positionClass } = data;
    this.positionClass = positionClass;
  }

  clone(): DefaultPortModel {
    return new DefaultPortModel(this);
  }

  getConnectPosition(parentNode: NodeModel): Coords {
    const { width, height } = parentNode;
    const offsetLeft = parentNode.x;
    const offsetTop = parentNode.y;

    let x: number;
    let y: number;
    switch (this.positionClass) {
      case 'left-center':
        x = offsetLeft;
        y = offsetTop + height / 2;
        break;
      case 'right-center':
        x = offsetLeft + width;
        y = offsetTop + height / 2;
        break;
      case 'top-center':
        x = offsetLeft + width / 2;
        y = offsetTop;
        break;
      case 'bottom-center':
        x = offsetLeft + width / 2;
        y = offsetTop + height;
        break;
    }

    return { x, y };
  }
}
