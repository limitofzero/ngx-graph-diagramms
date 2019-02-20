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
import { DefaultPortModel } from '../../default-models/default-port.model';
import { DefaultPortWidgetComponent } from '../default-widgets/default-port-widget/default-port-widget.component';

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

  @ViewChild('portWidget', { read: ViewContainerRef })
  portWidget: ViewContainerRef;

  constructor(private widgetFactory: WidgetFactoryService) {}

  ngOnInit(): void {
    const factory = this.widgetFactory.getPortWidgetFactory();
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
