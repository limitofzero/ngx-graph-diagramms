import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LinkModel } from '../../../models/link.model';
import { LinkClickedEvent } from '../../../interfaces/link-clicked-event';
import { PortCoords } from '../../../interfaces/port-coords';
import { BaseModel } from '../../../models/base.model';
import { PointModel } from '../../../models/point.model';

@Component({
  selector: 'ngx-link-layer',
  templateUrl: './link-layer.component.html',
  styleUrls: ['./link-layer.component.scss']
})
export class LinkLayerComponent {
  @Input()
  links: Map<string, LinkModel> = new Map();

  @Output()
  linkClicked = new EventEmitter<LinkClickedEvent>();

  @Input()
  portCoords: PortCoords = {};

  @Input()
  points: Map<string, PointModel> = new Map();

  onLinkMouseDownHandler(event: LinkClickedEvent): void {
    this.linkClicked.emit(event);
  }

  trackByFn(model: BaseModel): string {
    return model.id;
  }
}
