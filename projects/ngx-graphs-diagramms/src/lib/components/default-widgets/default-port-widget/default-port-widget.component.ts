import { Component, Input } from '@angular/core';
import { PortModel } from '../../../models/port.model';

@Component({
  selector: 'ngx-default-port-widget',
  templateUrl: './default-port-widget.component.html',
  styleUrls: ['./default-port-widget.component.scss']
})
export class DefaultPortWidgetComponent {
  @Input()
  portModel: PortModel = null;
}
