import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { DiagrammWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/diagramm-widget/diagramm-widget.component';
import { NodeLayerComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/node-layer/node-layer.component';
import {
  DefaultNodeWidgetComponent,
} from '../../projects/ngx-graphs-diagramms/src/lib/components/default-widgets/default-node-widget/default-node-widget.component';
import { NodeWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/node-widget/node-widget.component';
import { WidgetFactoryService } from '../../projects/ngx-graphs-diagramms/src/lib/services/widget-factory/widget-factory.service';
import { PortWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/port-widget/port-widget.component';
import { DefaultPortWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/default-widgets/default-port-widget/default-port-widget.component';
import { DefaultNodeModel } from '../../projects/ngx-graphs-diagramms/src/lib/default-models/default-node.model';
import { DefaultPortModel } from '../../projects/ngx-graphs-diagramms/src/lib/default-models/default-port.model';

storiesOf('Diagramm widget', module).add('widget', () => {
  const nodes = [ new DefaultNodeModel(), new DefaultNodeModel() ];
  nodes[0].x = 200;
  nodes[0].y = 100;
  nodes[0].description = 'node1';

  nodes[1].x = 10;
  nodes[1].description = 'node2';

  const ports = {
    0: new DefaultPortModel(),
    1: new DefaultPortModel()
  };
  ports[0].positionClass = 'left-center';
  ports[1].positionClass = 'right-center';

  nodes[0].ports = ports;
  nodes[1].ports = ports;

  const nodeMap = nodes.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {});

  return {
    component: DiagrammWidgetComponent,
    props: {
      nodes: nodeMap
    },
    moduleMetadata: {
      declarations: [
        NodeWidgetComponent,
        DefaultNodeWidgetComponent,
        DefaultPortWidgetComponent,
        NodeLayerComponent,
        PortWidgetComponent
      ],
      entryComponents: [
        DefaultNodeWidgetComponent,
        DefaultPortWidgetComponent
      ],
      providers: [
        WidgetFactoryService,
      ]
    }
  };
});
