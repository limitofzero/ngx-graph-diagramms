import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NodeModel } from '../../../models/node.model';
import { DefaultNodeModel } from '../../../default-models/default-node.model';
import { SpecificNodeWidget } from '../../../interfaces/specific-node-widget';
import { PortWidgetComponent } from '../../port-widget/port-widget.component';


@Component({
  selector: 'ngx-default-node-widget',
  templateUrl: './default-node-widget.component.html',
  styleUrls: ['./default-node-widget.component.scss']
})
export class DefaultNodeWidgetComponent implements SpecificNodeWidget {
  @Input()
  selected = false;

  @Input()
  nodeModel: NodeModel = null;

  get defaultNodeModel(): DefaultNodeModel {
    return this.nodeModel as DefaultNodeModel;
  }
}
