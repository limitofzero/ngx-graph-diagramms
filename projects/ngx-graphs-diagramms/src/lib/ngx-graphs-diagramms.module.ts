import { ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { DiagrammWidgetComponent } from './components/widgets/diagramm-widget/diagramm-widget.component';
import { NodeLayerComponent } from './components/node-layer/node-layer.component';
import { DefaultNodeWidgetComponent } from './components/default-widgets/default-node-widget/default-node-widget.component';
import { NodeWidgetComponent } from './components/widgets/node-widget/node-widget.component';
import { PortWidgetComponent } from './components/widgets/port-widget/port-widget.component';
import { DefaultPortWidgetComponent } from './components/default-widgets/default-port-widget/default-port-widget.component';
import { LinkWidgetComponent } from './components/widgets/link-widget/link-widget.component';
import { PointWidgetComponent } from './components/widgets/point-widget/point-widget.component';
import { LinkToCoordsPipe } from './pipes/link-to-coords.pipe';
import { COMPONENT_MAP, WidgetFactoryService } from './services/widget-factory/widget-factory.service';

// todo вынести все дефолтные компоненты в отдельный модуль
@NgModule({
  declarations: [
    DiagrammWidgetComponent,
    NodeLayerComponent,
    DefaultNodeWidgetComponent,
    NodeWidgetComponent,
    PortWidgetComponent,
    DefaultPortWidgetComponent,
    LinkWidgetComponent,
    PointWidgetComponent,
    LinkToCoordsPipe
  ],
  entryComponents: [
    DefaultNodeWidgetComponent,
    DefaultPortWidgetComponent
  ],
  providers: [
    WidgetFactoryService,
  ],
  exports: [DiagrammWidgetComponent]
})
export class NgxGraphsDiagrammsModule {
  static forRoot(componentMap: { [s: string]: Type<any> }): ModuleWithProviders {
    const componentTypes = Object.keys(componentMap)
      .map(key => componentMap[key]);

    return {
      ngModule: NgxGraphsDiagrammsModule,
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: componentTypes,
          multi: true,
        },
        {
          provide: COMPONENT_MAP,
          useValue: componentMap
        }
      ]
    };
  }
}
