import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PortModel } from '../../../models/port.model';
import { DefaultPortModel } from '../../../default-models/default-port.model';

@Component({
  selector: 'ngx-default-port-widget',
  templateUrl: './default-port-widget.component.html',
  styleUrls: ['./default-port-widget.component.scss']
})
export class DefaultPortWidgetComponent {
  @ViewChild('positionedContainer', { read: ElementRef }) positionedContainer: ElementRef;

  @Input()
  portModel: PortModel = null;

  get defaultPortModel(): DefaultPortModel {
    return this.portModel as DefaultPortModel;
  }
}
