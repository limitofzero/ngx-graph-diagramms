import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModelMap } from '../../../interfaces/model-map';
import { LinkModel } from '../../../models/link.model';
import { LinkClickedEvent } from '../../../interfaces/link-clicked-event';
import { PortCoords } from '../../../interfaces/port-coords';
import { PortModel } from '../../../models/port.model';

@Component({
  selector: 'ngx-link-layer',
  templateUrl: './link-layer.component.html',
  styleUrls: ['./link-layer.component.scss']
})
export class LinkLayerComponent {
  @Input()
  links: ModelMap<LinkModel> = {};

  @Output()
  linkClicked = new EventEmitter<LinkClickedEvent>();

  @Input()
  portCoords: PortCoords = {};

  @Input()
  points: ModelMap<PortModel> = {};

  onLinkMouseDownHandler(event: LinkClickedEvent): void {
    this.linkClicked.emit(event);
  }
}
