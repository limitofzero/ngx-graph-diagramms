import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { NodeMap } from '../../interfaces/node-map';
import { NodeWidgetComponent } from '../node-widget/node-widget.component';
import { NodeClickedEvent } from '../../interfaces/node-clicked-event';
import { KeyValue } from '@angular/common';
import { NodeModel } from '../../models/node.model';
import { SpecificNodeWidget } from '../../interfaces/specific-node-widget';
import { LinkMap } from '../../interfaces/link-map';
import { PortCoords } from '../../interfaces/port-coords';
import { PointMap } from '../../interfaces/point-map';

@Component({
  selector: 'ngx-node-layer',
  templateUrl: './node-layer.component.html',
  styleUrls: ['./node-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeLayerComponent implements AfterViewInit {
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
  nodeClicked = new EventEmitter<NodeClickedEvent>();

  @Output()
  nodesRendered = new EventEmitter<SpecificNodeWidget[]>();

  @ViewChildren(NodeWidgetComponent) widgets: QueryList<NodeWidgetComponent>;

  onMouseDownHandler(event: NodeClickedEvent): void {
    this.nodeClicked.emit(event);
  }

  trackByFn(item: KeyValue<number, NodeModel>): number {
    return item.key;
  }

  ngAfterViewInit(): void {
    const specificWidgets = this.widgets.map(widget => widget.instance);
    this.nodesRendered.emit(specificWidgets);
  }
}
