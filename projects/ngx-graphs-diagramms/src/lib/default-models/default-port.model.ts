import { PortModel } from '../models/port.model';
import { NodeModel } from '../models/node.model';
import { Coords } from '../interfaces/coords';
import { DefaultNodeModel } from './default-node.model';

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
    const node = parentNode as DefaultNodeModel;
    const { width, height, BORDER_WIDTH } = node;
    const offsetLeft = parentNode.x;
    const offsetTop = parentNode.y;

    let x: number;
    let y: number;
    switch (this.positionClass) {
      case 'left-center':
        x = offsetLeft - BORDER_WIDTH;
        y = offsetTop + height / 2 + BORDER_WIDTH;
        break;
      case 'right-center':
        x = offsetLeft + width + BORDER_WIDTH;
        y = offsetTop + height / 2 + BORDER_WIDTH;
        break;
      case 'top-center':
        x = offsetLeft + width / 2 + BORDER_WIDTH;
        y = offsetTop - BORDER_WIDTH;
        break;
      case 'bottom-center':
        x = offsetLeft + width / 2 + BORDER_WIDTH;
        y = offsetTop + height - BORDER_WIDTH;
        break;
    }

    return { x, y };
  }
}
