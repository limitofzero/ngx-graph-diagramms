import { ComponentFactory, ComponentFactoryResolver, Injectable } from '@angular/core';
import { DefaultNodeWidgetComponent } from '../../components/default-widgets/default-node-widget/default-node-widget.component';

@Injectable()
export class WidgetFactoryService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  getNodeWidgetFactory(): ComponentFactory<any> {
    return this.componentFactoryResolver.resolveComponentFactory(DefaultNodeWidgetComponent);
  }
}
