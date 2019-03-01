import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DraggableEntityClicked } from '../../../interfaces/draggable-entity-clicked';
import { KeyValue } from '@angular/common';
import { NodeModel } from '../../../models/node.model';
import { ModelMap } from '../../../interfaces/model-map';
import { PortModel } from '../../../models/port.model';

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
  points: ModelMap<PortModel> = {};

  @Output()
  draggableEntityClicked = new EventEmitter<DraggableEntityClicked>();

  onDraggableEntityClickedHandler(event: DraggableEntityClicked): void {
    this.draggableEntityClicked.emit(event);
  }

  trackByFn(item: KeyValue<number, NodeModel>): number {
    return item.key;
  }
}
