import { LinkModel } from '../models/link.model';
import { LinkCoords } from '../pipes/link-to-coords.pipe';

export interface LinkClickedEvent {
  link: LinkModel;
  range: LinkCoords;
  event: MouseEvent;
}
