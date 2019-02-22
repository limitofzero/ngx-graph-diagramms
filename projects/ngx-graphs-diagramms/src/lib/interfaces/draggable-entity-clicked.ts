import { BaseModel } from '../models/base.model';

export interface DraggableEntityClicked {
  entity: BaseModel;
  event: MouseEvent;
}
