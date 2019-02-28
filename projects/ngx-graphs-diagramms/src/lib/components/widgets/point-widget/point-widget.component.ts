import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PointModel } from '../../../models/point.model';
import { DraggableEntityClicked } from '../../../interfaces/draggable-entity-clicked';

@Component({
  selector: 'ngx-point-widget',
  templateUrl: './point-widget.component.html',
  styleUrls: ['./point-widget.component.scss']
})
export class PointWidgetComponent {
  @Input()
  pointModel: PointModel = null;

  @Output()
  portClicked = new EventEmitter<DraggableEntityClicked>();

  onMouseDownHandler(event: MouseEvent): void {
    this.portClicked.emit({ entity: this.pointModel, event });
  }
}
