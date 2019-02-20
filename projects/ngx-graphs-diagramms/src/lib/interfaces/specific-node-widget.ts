import { ElementRef } from '@angular/core';
import { NodeModel } from '../models/node.model';

export interface SpecificNodeWidget {
  positionedContainer: ElementRef;
  selected: boolean;
  nodeModel: NodeModel;
}
