import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NodeModel } from '../../models/node.model';

@Component({
  selector: 'ngx-node-layer',
  templateUrl: './node-layer.component.html',
  styleUrls: ['./node-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeLayerComponent {
  @Input()
  nodes: NodeModel[] = [];

  @Output()
  nodeClicked = new EventEmitter<NodeModel>();

  onMouseDownHandler(node: NodeModel): void {
    this.nodeClicked.emit(node);
  }
}
