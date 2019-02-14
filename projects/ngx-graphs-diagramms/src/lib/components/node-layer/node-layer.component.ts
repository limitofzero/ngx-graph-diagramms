import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NodeModel } from '../../models/node.model';
import { BaseModel } from '../../models/base.model';
import { Draggable } from '../../interfaces/draggable';

export interface DraggableEntityClicked {
  entity: Draggable;
  event: MouseEvent;
}

@Component({
  selector: 'ngx-node-layer',
  templateUrl: './node-layer.component.html',
  styleUrls: ['./node-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeLayerComponent {
  @Input()
  nodes: NodeModel[] = [];

  @Input()
  selectedId: number = null;

  @Output()
  nodeClicked = new EventEmitter<DraggableEntityClicked>();

  onMouseDownHandler(node: NodeModel, event: MouseEvent): void {
    this.nodeClicked.emit({ entity: node, event });
  }
}
