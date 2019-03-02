import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NodeModel } from '../../../models/node.model';
import { Subject } from 'rxjs/internal/Subject';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { DraggableEntityClicked } from '../../../interfaces/draggable-entity-clicked';
import { Coords } from '../../../interfaces/coords';
import { PortCoords } from '../../../interfaces/port-coords';
import { LinkClickedEvent } from '../../../interfaces/link-clicked-event';
import { PointModel } from '../../../models/point.model';
import { LinkCoords } from '../../../pipes/link-to-coords.pipe';
import { LinkModel } from '../../../models/link.model';
import { BaseModel } from '../../../models/base.model';
import { combineLatest } from 'rxjs';
import { DiagramModel } from '../../../models/diagram.model';

export interface DraggableEntity {
  entity: BaseModel;
  startX: number;
  startY: number;
}

@Component({
  selector: 'ngx-diagramm-widget',
  templateUrl: './diagram-widget.component.html',
  styleUrls: ['./diagram-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagramWidgetComponent implements AfterViewInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();

  private selectedEntityId: string = null;
  private entityCoords: DraggableEntity = null;

  nodesRendered = false;
  portCoords: PortCoords = {};

  @Input()
  diagramModel = new DiagramModel({});

  @ViewChild('diagramWidget') diagramWidget: ElementRef;

  constructor(private ref: ChangeDetectorRef) {}

  onLinkClicked(clickEvent: LinkClickedEvent): void {
    const { link, event, range } = clickEvent;
    const { pageX, pageY } = event;

    const point = new PointModel();
    const offsets = this.getDiagrammOffsets();
    point.x = pageX - offsets.offsetLeft - this.diagramModel.x;
    point.y = pageY - offsets.offsetTop - this.diagramModel.y;

    const index = this.getPointIndex(link, range);
    const cloned = link.addPoint(point.id, index);
    let diagram = this.diagramModel.setEntity(cloned);
    diagram = diagram.addEntity(point);
    this.diagramModel = diagram;

    this.setEntityCoords(point, event);
    event.stopPropagation();
    this.ref.markForCheck();
  }

  private getPointIndex(link: LinkModel, range: LinkCoords): number {
    const { sourceId } = link;
    const sourceCoords = this.portCoords[sourceId];
    const pointCoords = link.points
      .map(id => this.diagramModel.points.get(id))
      .map(point => ({ x: point.x, y: point.y }));

    const leftRangeCoords = { x: range.x1, y: range.y1 };
    const leftRangeIndex = [ sourceCoords ].concat(pointCoords)
      .findIndex(coords => this.isEqualCoords(coords, leftRangeCoords));

    return leftRangeIndex;
  }

  private getDiagrammOffsets(): { offsetLeft: number; offsetTop: number } {
    const nativeElement = this.diagramWidget.nativeElement;
    const { offsetLeft, offsetTop } = nativeElement;
    return { offsetLeft, offsetTop };
  }

  // todo создать сущность coords и методы для нее
  private isEqualCoords(l: Coords, r: Coords): boolean {
    return l.x === r.x && l.y === r.y;
  }

  onDraggableEntityClickedHandler(entityEvent: DraggableEntityClicked): void {
    const { entity, event } = entityEvent;

    if (entity) {
      this.selectedEntityId = entity.id;
      this.setEntityCoords(entity, event);
      event.stopPropagation();
    }
  }

  setEntityCoords(entity: BaseModel, event: MouseEvent): void {
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
    this.initListeningMouseUpLeave();
    this.nodesRenderedHandler();
  }

  private initListeningMouseUpLeave(): void {
    combineLatest(
      fromEvent(this.diagramWidget.nativeElement, 'mouseup'),
      fromEvent(this.diagramWidget.nativeElement, 'mouseleave')
    ).pipe(
      takeUntil(this.onDestroy)
    ).subscribe({
      next: () => this.resetEntityCoords()
    });
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
    const { entity } = this.entityCoords;
    if (entity instanceof NodeModel) {
      this.MoveNode(entity as NodeModel, event);
    } else if (entity instanceof PointModel) {
      this.MovePoint(entity as PointModel, event);
    } else if (entity instanceof DiagramModel) {
      const { pageX, pageY } = event;
      const { startX, startY } = this.entityCoords;

      const diffX = (pageX - startX);
      const diffY = (pageY - startY);

      const x = this.diagramModel.x + diffX;
      const y = this.diagramModel.y + diffY;

      const cloned = this.diagramModel.clone();
      cloned.x = x;
      cloned.y = y;

      this.diagramModel = cloned;
      this.entityCoords.entity = cloned;
      this.entityCoords.startY = pageY;
      this.entityCoords.startX = pageX;
      console.log(this.diagramModel);
      this.ref.markForCheck();
    }
  }

  private MovePoint(pointModel: PointModel, event: MouseEvent): void {
    const { pageX, pageY } = event;
    const { startX, startY } = this.entityCoords;

    const diffX = (pageX - startX);
    const diffY = (pageY - startY);

    const x = pointModel.x + diffX;
    const y = pointModel.y + diffY;

    const cloned = pointModel.clone();
    cloned.x = x;
    cloned.y = y;

    this.diagramModel = this.diagramModel.setEntity(cloned);
    this.entityCoords.entity = cloned;
    this.entityCoords.startY = pageY;
    this.entityCoords.startX = pageX;
    this.ref.markForCheck();
  }

  private MoveNode(nodeModel: NodeModel, event: MouseEvent): void {
    const { pageX, pageY } = event;
    const { startX, startY } = this.entityCoords;

    const diffX = (pageX - startX);
    const diffY = (pageY - startY);

    const x = nodeModel.x + diffX;
    const y = nodeModel.y + diffY;

    const cloned = nodeModel.clone();
    cloned.x = x;
    cloned.y = y;

    this.diagramModel = this.diagramModel.setEntity(cloned);
    this.entityCoords.entity = cloned;
    this.entityCoords.startY = pageY;
    this.entityCoords.startX = pageX;
    this.updatePorts(nodeModel, diffX, diffY);
    this.ref.markForCheck();
  }

  private updatePorts(node: NodeModel, diffX, diffY): void {
    for (const id of node.ports.values()) {
      const port = this.portCoords[id];
      if (port) {
        const x = port.x + diffX;
        const y = port.y + diffY;

        this.portCoords[id] = { x, y };
      }
    }

    this.portCoords = { ...this.portCoords };
  }

  private resetEntityCoords(): void {
    this.entityCoords = null;
  }

  nodesRenderedHandler(): void {
    this.nodesRendered = true;

    const nodes = this.diagramModel.nodes.values();
    for (const node of nodes) {
      const portIds = node.ports;
      const coords: PortCoords = {};

      for (const portId of portIds) {
        const port = this.diagramModel.ports.get(portId);
        const coord = port.getConnectPosition(node);
        coords[portId] = coord;
      }

      this.portCoords = { ...this.portCoords, ...coords };
    }

    this.ref.detectChanges();
  }


  ngOnDestroy(): void {
    this.onDestroy.complete();
  }
}
