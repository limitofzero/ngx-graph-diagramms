import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PortModel } from '../../../models/port.model';
import { WidgetFactoryService } from '../../../services/widget-factory/widget-factory.service';
import { DefaultPortWidgetComponent } from '../../default-widgets/default-port-widget/default-port-widget.component';

@Component({
  selector: 'ngx-port-widget',
  templateUrl: './port-widget.component.html',
  styleUrls: ['./port-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortWidgetComponent implements OnInit, OnChanges {
  private instance: DefaultPortWidgetComponent;

  @Input()
  portModel: PortModel = null;

  @ViewChild('specificWidget', { read: ViewContainerRef })
  portWidget: ViewContainerRef;

  constructor(private widgetFactory: WidgetFactoryService) {}

  ngOnInit(): void {
    if (this.portModel) {
      const componentType = this.portModel.type;
      this.createComponentInstance(componentType);
    }
  }

  private createComponentInstance(componentType: string): void {
    const factory = this.widgetFactory.getComponentFactoryByName(componentType);
    const component = this.portWidget.createComponent(factory);
    this.instance = component.instance;
    this.instance.portModel = this.portModel;
  }

  ngOnChanges(): void {
    if (this.instance) {
      this.instance.portModel = this.portModel;
    }
  }
}
