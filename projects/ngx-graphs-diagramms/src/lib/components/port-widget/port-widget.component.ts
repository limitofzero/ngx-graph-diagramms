import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PortModel } from '../../models/port.model';
import { WidgetFactoryService } from '../../services/widget-factory/widget-factory.service';

@Component({
  selector: 'ngx-port-widget',
  templateUrl: './port-widget.component.html',
  styleUrls: ['./port-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortWidgetComponent implements OnInit, OnChanges {
  private widgetInstance: any;

  @Input()
  portModel: PortModel = null;

  @ViewChild('portWidget', { read: ViewContainerRef })
  portWidget: ViewContainerRef;

  constructor(private widgetFactory: WidgetFactoryService) {}

  ngOnInit(): void {
    const factory = this.widgetFactory.getPortWidgetFactory();
    const component = this.portWidget.createComponent(factory);
    this.widgetInstance = component.instance;
    this.widgetInstance.portModel = this.portModel;
  }

  ngOnChanges(): void {
    if (this.widgetInstance) {
      this.widgetInstance.portModel = this.portModel;
    }
  }
}
