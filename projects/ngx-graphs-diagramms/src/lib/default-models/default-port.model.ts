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
    const { width, height } = parentNode;
    const offsetLeft = parentNode.x;
    const offsetTop = parentNode.y;

    let x: number;
    let y: number;
    switch (this.positionClass) {
      case 'left-center':
        x = offsetLeft - DefaultNodeModel.BORDER_WIDTH;
        y = offsetTop + height / 2 + DefaultNodeModel.BORDER_WIDTH;
        break;
      case 'right-center':
        x = offsetLeft + width + DefaultNodeModel.BORDER_WIDTH;
        y = offsetTop + height / 2 + DefaultNodeModel.BORDER_WIDTH;
        break;
      case 'top-center':
        x = offsetLeft + width / 2 + DefaultNodeModel.BORDER_WIDTH;
        y = offsetTop - DefaultNodeModel.BORDER_WIDTH;
        break;
      case 'bottom-center':
        x = offsetLeft + width / 2 + DefaultNodeModel.BORDER_WIDTH;
        y = offsetTop + height - DefaultNodeModel.BORDER_WIDTH;
        break;
    }

    return { x, y };
  }
}
