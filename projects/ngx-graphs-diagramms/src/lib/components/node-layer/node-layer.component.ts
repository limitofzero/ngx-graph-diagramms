import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NodeMap } from '../../interfaces/node-map';
import { DraggableEntityClicked } from '../../interfaces/draggable-entity-clicked';
import { KeyValue } from '@angular/common';
import { NodeModel } from '../../models/node.model';
import { LinkMap } from '../../interfaces/link-map';
import { PortCoords } from '../../interfaces/port-coords';
import { PointMap } from '../../interfaces/point-map';
import { LinkModel } from '../../models/link.model';
import { LinkClickedEvent } from '../../interfaces/link-clicked-event';
import { LinkCoords } from '../../pipes/link-to-coords.pipe';

@Component({
  selector: 'ngx-node-layer',
  templateUrl: './node-layer.component.html',
  styleUrls: ['./node-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeLayerComponent {
  @Input()
  nodes: NodeMap = {};

  @Input()
  selectedId: number = null;

  @Input()
  showLinks = false;

  @Input()
  links: LinkMap = {};

  @Input()
  points: PointMap = {};

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

  trackByIndexFn(index: number, item: any): number {
    return index;
  }
}
