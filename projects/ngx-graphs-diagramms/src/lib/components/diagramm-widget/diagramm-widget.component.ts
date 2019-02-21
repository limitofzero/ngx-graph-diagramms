import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy, QueryList,
  ViewChild
} from '@angular/core';
import { NodeModel } from '../../models/node.model';
import { Subject } from 'rxjs/internal/Subject';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, takeUntil } from 'rxjs/operators';
import { NodeMap } from '../../interfaces/node-map';
import { NodeClickedEvent } from '../../interfaces/node-clicked-event';
import { SpecificNodeWidget } from '../../interfaces/specific-node-widget';
import { LinkMap } from '../../interfaces/link-map';
import { Coords } from '../../interfaces/coords';
import { PortCoords } from '../../interfaces/port-coords';

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

  private selectedEntityId: string = null;
  private entityCoords: NodeCoords = null;

  nodesRendered = false;
  portCoords: PortCoords = {};

  @Input()
  nodes: NodeMap = {};

  @Input()
  links: LinkMap = {};

  @ViewChild('diagramWidget') diagramWidget: ElementRef;

  constructor(private ref: ChangeDetectorRef) {}

  onNodeClicked(entityEvent: NodeClickedEvent): void {
    const { widget, event } = entityEvent;

    if (widget) {
      const { nodeModel } = widget;
      this.selectedEntityId = nodeModel.id;
      this.setNodePosition(nodeModel, event);
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

  private initListeningMouseUp(): void {
    fromEvent(this.diagramWidget.nativeElement, 'mouseup').pipe(
      takeUntil(this.onDestroy)
    ).subscribe({
      next: () => this.resetClickedEntityId()
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
    const { startX, startY, entity } = this.entityCoords;

    const diffX = (pageX - startX);
    const diffY = (pageY - startY);

    const x = entity.x + diffX;
    const y = entity.y + diffY;

    const updatedEntity = (entity as NodeModel).clone();
    updatedEntity.x = x;
    updatedEntity.y = y;

    this.nodes = { ... this.nodes };
    this.nodes[updatedEntity.id] = updatedEntity;
    this.entityCoords.entity = updatedEntity;
    this.entityCoords.startY = pageY;
    this.entityCoords.startX = pageX;
    this.updatePorts(entity, diffX, diffY);
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

  private resetClickedEntityId(): void {
    this.entityCoords = null;
  }

  nodesRenderedHandler(nodeWidgets: QueryList<SpecificNodeWidget>): void {
    this.nodesRendered = true;

    const coords: PortCoords = nodeWidgets.reduce((acc, nodeWidget) => {
      const nodeOffsetLeft = nodeWidget.nodeModel.x;
      const nodeOffsetTop = nodeWidget.nodeModel.y;

      const ports: PortCoords = nodeWidget.portWidgets.reduce((acc, portWidget) => {
        const offsetLeft = (portWidget.instance.positionedContainer.nativeElement as any).offsetLeft;
        const offsetTop = (portWidget.instance.positionedContainer.nativeElement as any).offsetTop;

        acc[portWidget.portModel.id] = { x: nodeOffsetLeft + offsetLeft, y: nodeOffsetTop + offsetTop };
        return acc;
      }, {});

      return { ...acc, ...ports };
    }, {});

    this.portCoords = coords;
    console.log(coords);
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy.complete();
  }
}
