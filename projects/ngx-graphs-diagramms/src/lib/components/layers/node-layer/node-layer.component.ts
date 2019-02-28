import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NodeMap } from '../../../interfaces/node-map';
import { DraggableEntityClicked } from '../../../interfaces/draggable-entity-clicked';
import { KeyValue } from '@angular/common';
import { NodeModel } from '../../../models/node.model';
import { LinkMap } from '../../../interfaces/link-map';
import { PortCoords } from '../../../interfaces/port-coords';
import { PointMap } from '../../../interfaces/point-map';
import { LinkClickedEvent } from '../../../interfaces/link-clicked-event';
import { ModelMap } from '../../../interfaces/model-map';
import { PortModel } from '../../../models/port.model';
import { LinkModel } from '../../../models/link.model';

@Component({
  selector: 'ngx-node-layer',
  templateUrl: './node-layer.component.html',
  styleUrls: ['./node-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeLayerComponent {
  @Input()
  nodes: ModelMap<NodeModel> = {};

  @Input()
  selectedId: number = null;

  @Input()
  showLinks = false;

  @Input()
  links: ModelMap<LinkModel> = {};

  @Input()
  points: ModelMap<PortModel> = {};

  @Input()
  portCoords: PortCoords = {};

  @Output()
  draggableEntityClicked = new EventEmitter<DraggableEntityClicked>();

  @Output()
  linkClicked = new EventEmitter<LinkClickedEvent>();

  onDraggableEntityClickedHandler(event: DraggableEntityClicked): void {
    this.draggableEntityClicked.emit(event);
  }

  onLinkMouseDownHandler(event: LinkClickedEvent): void {
    this.linkClicked.emit(event);
  }

  trackByFn(item: KeyValue<number, NodeModel>): number {
    return item.key;
  }
}
