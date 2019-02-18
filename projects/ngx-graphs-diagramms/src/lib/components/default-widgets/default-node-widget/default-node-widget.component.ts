import { Component, Input } from '@angular/core';
import { NodeModel } from '../../../models/node.model';
import { DefaultNodeModel } from '../../../default-models/default-node.model';


@Component({
  selector: 'ngx-default-node-widget',
  templateUrl: './default-node-widget.component.html',
  styleUrls: ['./default-node-widget.component.scss']
})
export class DefaultNodeWidgetComponent {
  @Input()
  selected = false;

  @Input()
  nodeModel: NodeModel = null;

  get defaultNodeModel(): DefaultNodeModel {
    return this.nodeModel as DefaultNodeModel;
  }
}
