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
import { LinkModel } from '../../projects/ngx-graphs-diagramms/src/lib/models/link.model';
import { LinkWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/link-widget/link-widget.component';

storiesOf('Diagramm widget', module).add('widget', () => {
  const nodes = [ new DefaultNodeModel(), new DefaultNodeModel(), new DefaultNodeModel() ];
  nodes[0].x = 200;
  nodes[0].y = 100;
  nodes[0].description = 'node1';

  nodes[1].x = 10;
  nodes[1].description = 'node2';

  nodes[2].x = 600;
  nodes[2].y = 400;
  nodes[2].description = 'node3';

  const ports = [
    new DefaultPortModel(),
    new DefaultPortModel(),
    new DefaultPortModel(),
    new DefaultPortModel(),
  ];
  ports[0].positionClass = 'left-center';
  ports[1].positionClass = 'right-center';
  ports[2].positionClass = 'left-center';
  ports[3].positionClass = 'right-center';

  const portMap1 = ports.reduce((acc, value, index) => {
    if (index < 2) {
      acc[value.id] = value;
    }

    return acc;
  }, {});

  const portMap2 = ports.reduce((acc, value, index) => {
    if (index >= 2) {
      acc[value.id] = value;
    }

    return acc;
  }, {});

  nodes[0].ports = portMap1;
  nodes[1].ports = portMap2;

  const link = new LinkModel();
  link.source = ports[0];
  link.target = ports[2];

  const link2 = new LinkModel();
  link2.source = ports[1];
  link2.target = ports[3];

  const links = {
    [link.id]: link,
    [link2.id]: link2
  };

  ports[0].addLink(link);
  ports[2].addLink(link);
  ports[1].addLink(link2);
  ports[3].addLink(link2);

  console.log(ports);

  const nodeMap = nodes.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {});

  return {
    component: DiagrammWidgetComponent,
    props: {
      nodes: nodeMap,
      links
    },
    moduleMetadata: {
      declarations: [
        NodeWidgetComponent,
        DefaultNodeWidgetComponent,
        DefaultPortWidgetComponent,
        NodeLayerComponent,
        PortWidgetComponent,
        LinkWidgetComponent,
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
