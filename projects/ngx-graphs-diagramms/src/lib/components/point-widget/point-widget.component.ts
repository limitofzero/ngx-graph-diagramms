import { Component, Input } from '@angular/core';
import { PointModel } from '../../models/point.model';

@Component({
  selector: 'ngx-point-widget',
  templateUrl: './point-widget.component.html',
  styleUrls: ['./point-widget.component.scss']
})
export class PointWidgetComponent {
  @Input()
  pointModel: PointModel = null;
}
