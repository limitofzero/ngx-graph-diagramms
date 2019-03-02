import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { NodeLayerComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/layers/node-layer/node-layer.component';
import {
  DefaultNodeWidgetComponent,
} from '../../projects/ngx-graphs-diagramms/src/lib/components/default-widgets/default-node-widget/default-node-widget.component';
import { NodeWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/widgets/node-widget/node-widget.component';
import { WidgetFactoryService } from '../../projects/ngx-graphs-diagramms/src/lib/services/widget-factory/widget-factory.service';
import { PortWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/widgets/port-widget/port-widget.component';
import { DefaultNodeModel } from '../../projects/ngx-graphs-diagramms/src/lib/default-models/default-node.model';
import { DefaultPortModel } from '../../projects/ngx-graphs-diagramms/src/lib/default-models/default-port.model';
import { LinkWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/widgets/link-widget/link-widget.component';
import { PointWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/widgets/point-widget/point-widget.component';
import { LinkToCoordsPipe } from '../../projects/ngx-graphs-diagramms/src/lib/pipes/link-to-coords.pipe';
import { LinkModel } from '../../projects/ngx-graphs-diagramms/src/lib/models/link.model';
import { BaseModel } from '../../projects/ngx-graphs-diagramms/src/lib/models/base.model';
import { NgxGraphsDiagrammsModule } from '../../projects/ngx-graphs-diagramms/src/lib/ngx-graphs-diagramms.module';
import { DefaultPortWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/default-widgets/default-port-widget/default-port-widget.component';
import { DiagramWidgetComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/widgets/diagramm-widget/diagram-widget.component';
import { LinkLayerComponent } from '../../projects/ngx-graphs-diagramms/src/lib/components/layers/link-layer/link-layer.component';
import { DiagramModel } from '../../projects/ngx-graphs-diagramms/src/lib/models/diagram.model';

function arrayToMap<T extends BaseModel>(entities: T[]): Map<string, T> {
  const keyValues = entities.map((entity: T): [string, T] => [entity.id, entity]);
  return new Map(keyValues);
}

storiesOf('Diagramm widget', module).add('widget', () => {
  const nodeData = { type: 'defaultNode', width: 50, height: 50 };

  const nodes = [
    new DefaultNodeModel(nodeData),
    new DefaultNodeModel(nodeData),
    new DefaultNodeModel(nodeData)
  ];

  const ports = [
    new DefaultPortModel({ type: 'defaultPort', positionClass: 'bottom-center' }),
    new DefaultPortModel({ type: 'defaultPort', positionClass: 'top-center' }),
    new DefaultPortModel({ type: 'defaultPort', positionClass: 'right-center' }),
    new DefaultPortModel({ type: 'defaultPort', positionClass: 'left-center' })
  ];

  const links = [ new LinkModel(), new LinkModel(), new LinkModel() ];

  nodes[0].x = 10;
  nodes[0].y = 10;
  nodes[0].description = 'test1';
  nodes[0].ports = new Set([ ports[0].id ]);

  nodes[1].x = 10;
  nodes[1].y = 200;
  nodes[1].description = 'test2';
  nodes[1].ports = new Set([ports[1].id, ports[2].id ]);

  nodes[2].x = 300;
  nodes[2].y = 200;
  nodes[2].description = 'test3';
  nodes[2].ports = new Set([ ports[3].id ] );

  links[0].sourceId = ports[0].id;
  links[0].targetId = ports[1].id;
  links[1].sourceId = ports[2].id;
  links[1].targetId = ports[3].id;

  const nodeMap = arrayToMap(nodes);
  const portMap = arrayToMap(ports);
  const linkMap = arrayToMap(links);

  const diagramModel = new DiagramModel({
    nodes: nodeMap,
    links: linkMap,
    ports: portMap
  });

  return {
    component: DiagramWidgetComponent,
    props: {
      diagramModel
    },
    moduleMetadata: {
      declarations: [
        NodeWidgetComponent,
        NodeLayerComponent,
        PortWidgetComponent,
        LinkWidgetComponent,
        PointWidgetComponent,
        LinkToCoordsPipe,
        DefaultNodeWidgetComponent,
        DefaultPortWidgetComponent,
        LinkLayerComponent
      ],
      providers: [
        WidgetFactoryService,
        ...NgxGraphsDiagrammsModule.forRoot({
          defaultNode: DefaultNodeWidgetComponent,
          defaultPort: DefaultPortWidgetComponent
        }).providers
      ]
    }
  };
});
