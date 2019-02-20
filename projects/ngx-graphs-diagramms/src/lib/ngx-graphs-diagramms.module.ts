import { NgModule } from '@angular/core';
import { DiagrammWidgetComponent } from './components/diagramm-widget/diagramm-widget.component';
import { NodeLayerComponent } from './components/node-layer/node-layer.component';
import { DefaultNodeWidgetComponent } from './components/default-widgets/default-node-widget/default-node-widget.component';
import { NodeWidgetComponent } from './components/node-widget/node-widget.component';
import { PortWidgetComponent } from './components/port-widget/port-widget.component';
import { DefaultPortWidgetComponent } from './components/default-widgets/default-port-widget/default-port-widget.component';
import { LinkWidgetComponent } from './components/link-widget/link-widget.component';

// todo вынести все дефолтные компоненты в отдельный модуль
@NgModule({
  declarations: [
    DiagrammWidgetComponent,
    NodeLayerComponent,
    DefaultNodeWidgetComponent,
    NodeWidgetComponent,
    PortWidgetComponent,
    DefaultPortWidgetComponent,
    LinkWidgetComponent
  ],
  imports: [],
  exports: [DiagrammWidgetComponent]
})
export class NgxGraphsDiagrammsModule { }
