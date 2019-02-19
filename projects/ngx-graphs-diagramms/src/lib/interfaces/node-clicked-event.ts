import { NodeWidget } from './node-widget';

export interface NodeClickedEvent {
  widget: NodeWidget;
  event: MouseEvent;
}
