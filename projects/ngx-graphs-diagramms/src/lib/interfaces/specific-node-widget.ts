import { ElementRef, QueryList } from '@angular/core';
import { NodeModel } from '../models/node.model';
import { PortWidgetComponent } from '../components/port-widget/port-widget.component';

// todo убрать отсылки к виджетам
export interface SpecificNodeWidget {
  positionedContainer: ElementRef;
  selected: boolean;
  portWidgets: QueryList<PortWidgetComponent>;
  nodeModel: NodeModel;
}
