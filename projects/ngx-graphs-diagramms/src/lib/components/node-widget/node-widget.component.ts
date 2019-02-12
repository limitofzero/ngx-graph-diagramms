import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WidgetFactoryService } from '../../services/widget-factory/widget-factory.service';
import { NodeModel } from '../../models/node.model';
import { DefaultNodeWidgetComponent } from '../default-widgets/default-node-widget/default-node-widget.component';

@Component({
  selector: 'ngx-node-widget',
  templateUrl: './node-widget.component.html',
  styleUrls: ['./node-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWidgetComponent implements OnInit {
  @Input()
  nodeModel: NodeModel = new NodeModel();

  @ViewChild('nodeWidget', { read: ViewContainerRef })
  nodeWidget: ViewContainerRef;

  constructor(private widgetFactory: WidgetFactoryService) {}

  ngOnInit(): void {
    const factory = this.widgetFactory.getNodeWidgetFactory();
    const component = this.nodeWidget.createComponent(factory);
    (component.instance as DefaultNodeWidgetComponent).nodeModel = this.nodeModel;
  }
}
