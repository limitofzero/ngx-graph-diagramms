import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DraggableEntityClicked } from '../../../interfaces/draggable-entity-clicked';
import { NodeModel } from '../../../models/node.model';
import { PointModel } from '../../../models/point.model';
import { BaseModel } from '../../../models/base.model';

@Component({
  selector: 'ngx-node-layer',
  templateUrl: './node-layer.component.html',
  styleUrls: ['./node-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeLayerComponent {
  @Input()
  nodes: Map<string, NodeModel> = new Map();

  @Input()
  selectedId: string = null;

  @Input()
  showLinks = false;

  @Input()
  points: Map<string, PointModel> = new Map();

  @Output()
  draggableEntityClicked = new EventEmitter<DraggableEntityClicked>();

  onDraggableEntityClickedHandler(event: DraggableEntityClicked): void {
    this.draggableEntityClicked.emit(event);
  }

  trackByFn(item: BaseModel): string {
    return item.id;
  }
}
