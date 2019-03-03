import { Draggable } from '../components/widgets/diagramm-widget/diagram-widget.component';

export interface DraggableEntityClicked {
  entity: Draggable;
  event: MouseEvent;
}
