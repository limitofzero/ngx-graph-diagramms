import { ComponentFactory, ComponentFactoryResolver, Inject, Injectable, InjectionToken, Type } from '@angular/core';

export const COMPONENT_MAP = new InjectionToken<{ [s: string]: Type<any> }>('ComponentMap');

@Injectable()
export class WidgetFactoryService {
  private componentMap: any;

  constructor(@Inject(COMPONENT_MAP) componentMap: any, private componentFactoryResolver: ComponentFactoryResolver) {
    this.componentMap = componentMap;
  }

  getComponentFactoryByName(componentDefinition: string): ComponentFactory<any> {
    const componentToken = this.componentMap[componentDefinition];
    return this.componentFactoryResolver.resolveComponentFactory(componentToken);
  }
}
