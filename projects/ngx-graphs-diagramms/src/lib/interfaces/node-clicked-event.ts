import { SpecificNodeWidget } from './specific-node-widget';

export interface NodeClickedEvent {
  widget: SpecificNodeWidget;
  event: MouseEvent;
}
