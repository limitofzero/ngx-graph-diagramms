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
import { LinkWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/link-widget/link-widget.component';
import { PointWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/point-widget/point-widget.component';
import { LinkToCoordsPipe } from '../../projects/ngx-graphs-diagramms/src/lib/pipes/link-to-coords.pipe';
import { LinkModel } from '../../projects/ngx-graphs-diagramms/src/lib/models/link.model';
import { BaseModel } from '../../projects/ngx-graphs-diagramms/src/lib/models/base.model';

const entityArrayToMap = (arr: BaseModel[]) => arr.reduce((map, entity) => {
  map[entity.id] = entity;
  return map;
}, {});

storiesOf('Diagramm widget', module).add('widget', () => {
  const nodes = [ new DefaultNodeModel(), new DefaultNodeModel(), new DefaultNodeModel()];

  const ports = [
    new DefaultPortModel('bottom-center'),
    new DefaultPortModel('top-center'),
    new DefaultPortModel('right-center'),
    new DefaultPortModel('left-center')
  ];

  const links = [ new LinkModel(), new LinkModel(), new LinkModel() ];

  nodes[0].x = 10;
  nodes[0].y = 10;
  nodes[0].description = 'test1';
  nodes[0].ports = entityArrayToMap([ports[0]]);

  nodes[1].x = 10;
  nodes[1].y = 200;
  nodes[1].description = 'test2';
  nodes[1].ports = entityArrayToMap([ports[1], ports[2] ]);

  nodes[2].x = 300;
  nodes[2].y = 200;
  nodes[2].description = 'test3';
  nodes[2].ports = entityArrayToMap([ ports[3] ] );

  links[0].source = ports[0];
  links[0].target = ports[1];
  links[1].source = ports[2];
  links[1].target = ports[3];

  const nodeMap = entityArrayToMap(nodes);
  const portMap = entityArrayToMap(ports);
  const linkMap = entityArrayToMap(links);

  return {
    component: DiagrammWidgetComponent,
    props: {
      nodes: nodeMap,
      ports: portMap,
      links: linkMap
    },
    moduleMetadata: {
      declarations: [
        NodeWidgetComponent,
        DefaultNodeWidgetComponent,
        DefaultPortWidgetComponent,
        NodeLayerComponent,
        PortWidgetComponent,
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
      ]
    }
  };
});
