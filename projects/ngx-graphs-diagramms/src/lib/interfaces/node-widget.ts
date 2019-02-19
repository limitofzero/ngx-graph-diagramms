import { ElementRef } from '@angular/core';
import { NodeModel } from '../models/node.model';

export interface NodeWidget {
  positionedContainer: ElementRef;
  selected: boolean;
  nodeModel: NodeModel;
}
