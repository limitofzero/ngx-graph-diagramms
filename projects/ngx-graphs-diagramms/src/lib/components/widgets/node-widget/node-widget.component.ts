import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, OnChanges,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { WidgetFactoryService } from '../../../services/widget-factory/widget-factory.service';
import { NodeModel } from '../../../models/node.model';
import { DefaultNodeWidgetComponent } from '../../default-widgets/default-node-widget/default-node-widget.component';
import { DraggableEntityClicked } from '../../../interfaces/draggable-entity-clicked';

@Component({
  selector: 'ngx-node-widget',
  templateUrl: './node-widget.component.html',
  styleUrls: ['./node-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeWidgetComponent implements OnInit, OnChanges {
  private instance: DefaultNodeWidgetComponent;

  @Input()
  selected = false;

  @Input()
  nodeModel: NodeModel = null;

  @ViewChild('nodeWidget', { read: ViewContainerRef })
  nodeWidget: ViewContainerRef;

  @Output()
  onNodeClicked = new EventEmitter<DraggableEntityClicked>();

  constructor(private widgetFactory: WidgetFactoryService) {}

  mouseDownHandler(event: MouseEvent): void {
    const clickedEvent = { entity: this.nodeModel, event };
    this.onNodeClicked.emit(clickedEvent);
  }

  ngOnInit(): void {
    if (this.nodeModel) {
      const componentType = this.nodeModel.type;
      this.createComponentInstance(componentType);
    }
  }

  private createComponentInstance(componentType: string): void {
    const factory = this.widgetFactory.getComponentFactoryByName(componentType);
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
