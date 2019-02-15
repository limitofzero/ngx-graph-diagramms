import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NodeModel } from '../../models/node.model';
import { Subject } from 'rxjs/internal/Subject';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { NodeClickedEvent } from '../node-layer/node-layer.component';

export interface NodeCoords {
  entity: NodeModel;
  startX: number;
  startY: number;
}

@Component({
  selector: 'ngx-diagramm-widget',
  templateUrl: './diagramm-widget.component.html',
  styleUrls: ['./diagramm-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagrammWidgetComponent implements AfterViewInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();

  private selectedEntityId: number = null;
  private entityCoords: NodeCoords = null;

  @Input()
  nodes: NodeModel[] = [];

  @ViewChild('diagramWidget') diagramWidget: ElementRef;

  constructor(private ref: ChangeDetectorRef) {}

  onNodeClicked(entityEvent: NodeClickedEvent): void {
    const { entity, event } = entityEvent;

    if (entity) {
      this.selectedEntityId = entity.id;
      this.setNodePosition(entity, event);
    }
  }

  setNodePosition(entity: NodeModel, event: MouseEvent): void {
    const { pageX, pageY } = event;
    const startX = pageX;
    const startY = pageY;

    this.entityCoords = {
      entity,
      startX,
      startY
    };
  }

  ngAfterViewInit(): void {
    this.initListeningMouseMoveEvent();
    this.initListeningMouseUp();
  }

  private initListeningMouseMoveEvent(): void {
    fromEvent(this.diagramWidget.nativeElement, 'mousemove').pipe(
      takeUntil(this.onDestroy),
      filter(() => !!this.entityCoords)
    ).subscribe({
      next: event => this.onMouseMoveHandler(event as MouseEvent)
    });
  }

  private onMouseMoveHandler(event: MouseEvent): void {
    const { pageX, pageY } = event;
    const { startX, startY, entity } = this.entityCoords;

    const diffX = (pageX - startX);
    const diffY = (pageY - startY);

    const x = entity.x + diffX;
    const y = entity.y + diffY;

    const updatedEntity = (entity as NodeModel).clone();
    updatedEntity.x = x;
    updatedEntity.y = y;

    const nodeIndex = this.nodes.findIndex(node => updatedEntity.id === node.id);
    this.nodes = this.nodes.slice();
    this.nodes[nodeIndex] = updatedEntity;
    this.entityCoords.entity = updatedEntity;
    this.entityCoords.startY = pageY;
    this.entityCoords.startX = pageX;
    this.ref.markForCheck();
  }

  private initListeningMouseUp(): void {
    fromEvent(this.diagramWidget.nativeElement, 'mouseup').pipe(
      takeUntil(this.onDestroy)
    ).subscribe({
      next: () => this.resetClickedEntityId()
    });
  }

  private resetClickedEntityId(): void {
    this.entityCoords = null;
  }

  ngOnDestroy(): void {
    this.onDestroy.complete();
  }
}
