import { ComponentFactory, ComponentFactoryResolver, Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { DefaultNodeWidgetComponent } from '../../components/default-widgets/default-node-widget/default-node-widget.component';
import { DefaultPortWidgetComponent } from '../../components/default-widgets/default-port-widget/default-port-widget.component';

export const COMPONENT_MAP = new InjectionToken<{ [s: string]: Type<any> }>('ComponentMap');

@Injectable()
export class WidgetFactoryService {
  private componentMap: any;

  constructor(@Inject(COMPONENT_MAP) componentMap: any, private componentFactoryResolver: ComponentFactoryResolver) {
    this.componentMap = componentMap;
  }

  getNodeWidgetFactory(): ComponentFactory<DefaultNodeWidgetComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(this.componentMap.defaultNode);
  }

  getPortWidgetFactory(): ComponentFactory<DefaultPortWidgetComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(this.componentMap.defaultPort);
  }
}
