import { Component, InjectionToken, Input } from '@angular/core';
import { NodeModel } from '../../../models/node.model';

export const nodeWidgetToken = new InjectionToken('nodeWidget');

@Component({
  selector: 'ngx-default-node-widget',
  templateUrl: './default-node-widget.component.html',
  styleUrls: ['./default-node-widget.component.scss']
})
export class DefaultNodeWidgetComponent {
  @Input()
  nodeModel: NodeModel = null;
}
