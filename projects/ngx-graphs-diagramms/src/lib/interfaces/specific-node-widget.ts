import { ElementRef, QueryList } from '@angular/core';
import { NodeModel } from '../models/node.model';
import { PortWidgetComponent } from '../components/widgets/port-widget/port-widget.component';

// todo убрать отсылки к виджетам
export interface SpecificNodeWidget {
  selected: boolean;
  nodeModel: NodeModel;
}
