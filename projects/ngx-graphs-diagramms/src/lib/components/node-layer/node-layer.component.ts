import { Component, Input } from '@angular/core';
import { NodeModel } from '../../models/node.model';

@Component({
  selector: 'ngx-node-layer',
  templateUrl: './node-layer.component.html',
  styleUrls: ['./node-layer.component.scss']
})
export class NodeLayerComponent {
  @Input()
  nodes: NodeModel[] = [];
}
