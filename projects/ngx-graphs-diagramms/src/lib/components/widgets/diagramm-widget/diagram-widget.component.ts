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
import { combineLatest } from 'rxjs';
import { DiagramModel } from '../../../models/diagram.model';

export type Draggable = NodeModel | PointModel | DiagramModel;

export interface DraggableEntity {
  entity: Draggable;
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

    const point = new PointModel({});
    const offsets = this.getDiagrammOffsets();
    point.x = pageX - offsets.offsetLeft - this.diagramModel.x;
    point.y = pageY - offsets.offsetTop - this.diagramModel.y;

    const index = this.getPointIndex(link, range);
    const cloned = link.addPoint(point.id, index);
    let diagram = this.diagramModel.setEntity(cloned);
    diagram = diagram.addEntity(point);
    this.diagramModel = diagram;

    this.setEntityCoords(point, event.pageX, event.pageY);
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
    const { entity } = entityEvent;

    if (entity) {
      this.selectedEntityId = entity.id;
      const { pageX, pageY } = entityEvent.event;
      this.setEntityCoords(entity, pageX, pageY);
      event.stopPropagation();
    }
  }

  setEntityCoords(entity: Draggable, startX, startY): void {
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
    const { pageX, pageY } = event;
    const { startX, startY } = this.entityCoords;

    const diffX = (pageX - startX);
    const diffY = (pageY - startY);

    let { entity } = this.entityCoords;
    const x = entity.x + diffX;
    const y = entity.y + diffY;

    entity = entity.cloneWithCoords(x, y);

    if (entity instanceof PointModel) {
      this.diagramModel = this.diagramModel.setEntity(entity);
    } else if (entity instanceof DiagramModel) {
      this.diagramModel = entity;
    } else if (entity instanceof NodeModel) {
      this.diagramModel = this.diagramModel.setEntity(entity);
      this.updatePorts(entity as NodeModel, diffX, diffY);
    }

    this.setEntityCoords(entity, pageX, pageY);
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
