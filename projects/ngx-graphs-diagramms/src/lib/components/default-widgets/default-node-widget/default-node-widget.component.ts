import { Component, Input } from '@angular/core';
import { NodeModel } from '../../../models/node.model';


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
}
