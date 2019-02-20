import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, OnChanges,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { WidgetFactoryService } from '../../services/widget-factory/widget-factory.service';
import { NodeModel } from '../../models/node.model';
import { DefaultNodeWidgetComponent } from '../default-widgets/default-node-widget/default-node-widget.component';
import { NodeClickedEvent } from '../../interfaces/node-clicked-event';

@Component({
  selector: 'ngx-node-widget',
  templateUrl: './node-widget.component.html',
  styleUrls: ['./node-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWidgetComponent implements OnInit, OnChanges {
  public instance: DefaultNodeWidgetComponent;

  @Input()
  selected = false;

  @Input()
  nodeModel: NodeModel = new NodeModel();

  @ViewChild('nodeWidget', { read: ViewContainerRef })
  nodeWidget: ViewContainerRef;

  @Output()
  onNodeClicked = new EventEmitter<NodeClickedEvent>();

  constructor(private widgetFactory: WidgetFactoryService) {}

  mouseDownHandler(event: MouseEvent): void {
    const clickedEvent = { widget: this.instance, event };
    this.onNodeClicked.emit(clickedEvent);
  }

  ngOnInit(): void {
    const factory = this.widgetFactory.getNodeWidgetFactory();
    const component = this.nodeWidget.createComponent(factory);
    this.instance = component.instance;
    this.instance.nodeModel = this.nodeModel;
    this.instance.selected = this.selected;
  }

  ngOnChanges(): void {
    if (this.instance) {
      this.instance.nodeModel = this.nodeModel;
      this.instance.selected = this.selected;
    }
  }
}
