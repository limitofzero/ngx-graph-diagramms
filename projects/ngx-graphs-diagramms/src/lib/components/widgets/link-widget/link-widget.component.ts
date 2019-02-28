import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LinkModel } from '../../../models/link.model';
import { LinkCoords } from '../../../pipes/link-to-coords.pipe';
import { LinkClickedEvent } from '../../../interfaces/link-clicked-event';

@Component({
  selector: '[ngx-link-widget]',
  templateUrl: './link-widget.component.html',
  styleUrls: ['./link-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkWidgetComponent {
  @Input()
  linkModel: LinkModel = null;

  @Input()
  coords: LinkCoords[] = [];

  @Output()
  clicked = new EventEmitter<LinkClickedEvent>();

  trackByIndexFn(index: number): number {
    return index;
  }

  onMouseDownHandler(coords: LinkCoords, event: MouseEvent): void {
    this.clicked.emit({
      link: this.linkModel,
      range: coords,
      event
    });
  }
}
