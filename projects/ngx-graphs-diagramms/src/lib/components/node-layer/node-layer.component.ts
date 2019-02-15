import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NodeModel } from '../../models/node.model';

export interface NodeClickedEvent {
  entity: NodeModel;
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
  nodeClicked = new EventEmitter<NodeClickedEvent>();

  onMouseDownHandler(node: NodeModel, event: MouseEvent): void {
    this.nodeClicked.emit({ entity: node, event });
  }
}
