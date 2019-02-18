import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { DefaultNodeWidgetComponent } from '../../components/default-widgets/default-node-widget/default-node-widget.component';
import { DefaultPortWidgetComponent } from '../../components/default-widgets/default-port-widget/default-port-widget.component';

@Injectable()
export class WidgetFactoryService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  getNodeWidgetFactory(): ComponentFactory<DefaultNodeWidgetComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(DefaultNodeWidgetComponent);
  }

  getPortWidgetFactory(): ComponentFactory<DefaultPortWidgetComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(DefaultPortWidgetComponent);
  }
}
