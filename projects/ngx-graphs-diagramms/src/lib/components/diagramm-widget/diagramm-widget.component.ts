import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NodeModel } from '../../models/node.model';
import { BaseModel } from '../../models/base.model';
import { Subject } from 'rxjs/internal/Subject';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { filter, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-diagramm-widget',
  templateUrl: './diagramm-widget.component.html',
  styleUrls: ['./diagramm-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiagrammWidgetComponent implements AfterViewInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();

  private selectedEntityId: number = null;
  private clickedEntityId: number = null;

  @Input()
  nodes: NodeModel[] = [];

  @ViewChild('diagramWidget') diagramWidget: ElementRef;

  onEntityMouseDown(entity: BaseModel): void {
    if (entity) {
      this.selectedEntityId = entity.id;
      this.clickedEntityId = entity.id;
    }
  }

  ngAfterViewInit(): void {
    this.initListeningMouseMoveEvent();
    this.initListeningMouseUp();
  }

  private initListeningMouseMoveEvent(): void {
    fromEvent(this.diagramWidget.nativeElement, 'mousemove').pipe(
      takeUntil(this.onDestroy),
      throttleTime(100),
      filter(() => !!this.clickedEntityId)
    ).subscribe({
      next: event => this.onMouseMoveHandler(event)
    });
  }

  private onMouseMoveHandler(event: any): void {
    console.log(event);
  }

  private initListeningMouseUp(): void {
    fromEvent(this.diagramWidget.nativeElement, 'mouseup').pipe(
      takeUntil(this.onDestroy)
    ).subscribe({
      next: () => this.resetClickedEntityId()
    });
  }

  private resetClickedEntityId(): void {
    this.clickedEntityId = null;
  }

  ngOnDestroy(): void {
    this.onDestroy.complete();
  }
}
