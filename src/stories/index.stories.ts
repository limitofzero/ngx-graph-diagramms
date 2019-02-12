import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { DiagrammWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/diagramm-widget/diagramm-widget.component';
import { NodeLayerComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/node-layer/node-layer.component';
import {
  DefaultNodeWidgetComponent,
} from '../../projects/ngx-graphs-diagramms/src/lib/components/default-widgets/default-node-widget/default-node-widget.component';
import { NodeModel } from '../../projects/ngx-graphs-diagramms/src/lib/models/node.model';
import { NodeWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/node-widget/node-widget.component';
import { WidgetFactoryService } from '../../projects/ngx-graphs-diagramms/src/lib/services/widget-factory/widget-factory.service';

storiesOf('Diagramm widget', module).add('widget', () => ({
  component: DiagrammWidgetComponent,
  moduleMetadata: {
    imports: []
  }
}));

storiesOf('Node layer widget', module).add('widget', () => ({
  component: NodeLayerComponent,
  props: {
    nodes: [ new NodeModel(10, 10), new NodeModel(50, 40) ]
  },
  moduleMetadata: {
    declarations: [
      NodeWidgetComponent,
      DefaultNodeWidgetComponent
    ],
    entryComponents: [
      DefaultNodeWidgetComponent
    ],
    providers: [
      WidgetFactoryService
    ]
  }
}));
