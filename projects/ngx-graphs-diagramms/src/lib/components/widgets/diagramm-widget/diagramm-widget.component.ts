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
import { ModelMap } from '../../../interfaces/model-map';

export interface DraggableEntity {
  entity: BaseModel;
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

  private selectedEntityId: string = null;
  private entityCoords: DraggableEntity = null;

  nodesRendered = false;
  portCoords: PortCoords = {};

  @Input()
  nodes: ModelMap<NodeModel> = {};

  @Input()
  links: ModelMap<LinkModel> = {};

  @Input()
  points: ModelMap<PointModel> = {};

  @ViewChild('diagramWidget') diagramWidget: ElementRef;

  constructor(private ref: ChangeDetectorRef) {}

  onLinkClicked(clickEvent: LinkClickedEvent): void {
    const { link, event, range } = clickEvent;
    const { pageX, pageY } = event;

    const point = new PointModel();
    const offsets = this.getDiagrammOffsets();
    point.x = pageX - offsets.offsetLeft;
    point.y = pageY - offsets.offsetTop;

    const index = this.getPointIndex(link, range);
    link.addPoint(point.id, index);
    this.links = { ...this.links, [link.id]: link };
    this.points = { ...this.points, [point.id]: point };

    this.setEntityCoords(point, event);
    this.ref.markForCheck();
  }

  private getPointIndex(link: LinkModel, range: LinkCoords): number {
    const { sourceId } = link;
    const sourceCoords = this.portCoords[sourceId];
    const pointCoords = link.points
      .map(id => this.points[id])
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
    this.initListeningMouseUp();
    this.nodesRenderedHandler();
  }

  private initListeningMouseUp(): void {
    fromEvent(this.diagramWidget.nativeElement, 'mouseup').pipe(
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
    }
  }

  private MovePoint(pointModel: PointModel, event: MouseEvent): void {
    const { pageX, pageY } = event;
    const { startX, startY } = this.entityCoords;

    const diffX = (pageX - startX);
    const diffY = (pageY - startY);

    const x = pointModel.x + diffX;
    const y = pointModel.y + diffY;

    const updatedEntity = pointModel.clone();
    updatedEntity.x = x;
    updatedEntity.y = y;

    this.points = { ... this.points };
    this.points[updatedEntity.id] = updatedEntity;
    this.entityCoords.entity = updatedEntity;
    this.entityCoords.startY = pageY;
    this.entityCoords.startX = pageX;
    this.ref.markForCheck();
  }

  private MoveNode(nodeModel: NodeModel, event: MouseEvent): void {
    console.log(nodeModel);
    const { pageX, pageY } = event;
    const { startX, startY } = this.entityCoords;

    const diffX = (pageX - startX);
    const diffY = (pageY - startY);

    const x = nodeModel.x + diffX;
    const y = nodeModel.y + diffY;

    const updatedEntity = nodeModel.clone();
    updatedEntity.x = x;
    updatedEntity.y = y;

    this.nodes = { ... this.nodes };
    this.nodes[updatedEntity.id] = updatedEntity;
    this.entityCoords.entity = updatedEntity;
    this.entityCoords.startY = pageY;
    this.entityCoords.startX = pageX;
    this.updatePorts(nodeModel, diffX, diffY);
    this.ref.markForCheck();
  }

  private updatePorts(node: NodeModel, diffX, diffY): void {
    const portsId = Object.keys(node.ports);
    for (const id of portsId) {
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

    const coords: PortCoords = Object.keys(this.nodes)
        .map(id => this.nodes[id])
        .reduce((coordMap, node) => {
          const ports = node.ports;
          const map = Object.keys(ports)
            .map(id => ports[id])
            .reduce((mp, port) => {
              mp[port.id] = port.getConnectPosition(node);
              return mp;
            }, {});

          return { ...coordMap, ...map };
        }, {});

    this.portCoords = coords;
    console.log(coords);
    this.ref.detectChanges();
  }


  ngOnDestroy(): void {
    this.onDestroy.complete();
  }
}
