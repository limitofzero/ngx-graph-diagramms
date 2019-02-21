import { Component, Input } from '@angular/core';
import { LinkModel } from '../../models/link.model';
import { Coords } from '../../interfaces/coords';

@Component({
  selector: 'ngx-link-widget',
  templateUrl: './link-widget.component.html',
  styleUrls: ['./link-widget.component.scss']
})
export class LinkWidgetComponent {
  @Input()
  linkModel: LinkModel = null;

  @Input()
  source: Coords = null;

  @Input()
  target: Coords = null;

  mouseDownHandler(event: MouseEvent): void {
    console.log(event);
  }
}
