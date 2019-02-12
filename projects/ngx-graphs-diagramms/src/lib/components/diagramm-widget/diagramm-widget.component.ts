import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NodeModel } from '../../models/node.model';
import { BaseModel } from '../../models/base.model';

@Component({
  selector: 'ngx-diagramm-widget',
  templateUrl: './diagramm-widget.component.html',
  styleUrls: ['./diagramm-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagrammWidgetComponent {
  private selectedEntityId: number = null;

  @Input()
  nodes: NodeModel[] = [];

  onEntityMouseDown(entity: BaseModel): void {
    if (entity) {
      this.selectedEntityId = entity.id;
    }
  }
}
