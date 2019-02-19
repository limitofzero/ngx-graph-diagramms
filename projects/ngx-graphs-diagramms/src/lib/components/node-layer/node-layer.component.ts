import {
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

  @Output()
  nodeClicked = new EventEmitter<NodeClickedEvent>();

  @ViewChildren(NodeWidgetComponent) nodeWidget: QueryList<NodeWidgetComponent>;

  onMouseDownHandler(event: NodeClickedEvent): void {
    this.nodeClicked.emit(event);
  }

  trackByFn(item: KeyValue<number, NodeModel>): number {
    return item.key;
  }
}
