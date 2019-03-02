import { NodeModel } from './node.model';
import { PortModel } from './port.model';
import { LinkModel } from './link.model';
import { PointModel } from './point.model';
import { BaseModel } from './base.model';

export class DiagramModel extends BaseModel {
  x: number;
  y: number;

  nodes: Map<string, NodeModel>;
  ports: Map<string, PortModel>;
  links: Map<string, LinkModel>;
  points: Map<string, PointModel>;

  constructor(data: {
    id?: string;
    x?: number,
    y?: number,
    nodes?: Map<string, NodeModel>,
    ports?: Map<string, PortModel>,
    links?: Map<string, LinkModel>,
    points?: Map<string, PointModel>
  }) {
    super(data.id);
    const { x, y } = data;
    this.x = x || 0;
    this.y = y || 0;

    const { nodes, ports, links, points }  = data;
    this.nodes = nodes || new Map();
    this.links = links || new Map();
    this.points = points || new Map();
    this.ports = ports || new Map();
  }

  clone(): DiagramModel {
    return new DiagramModel(this);
  }

  addEntity(model: BaseModel): DiagramModel {
    const getter = this.getEntityMapName(model);
    const cloned = this.clone();
    cloned[getter] = new Map(cloned[getter]);
    (cloned[getter] as Map<string, BaseModel>)
      .set(model.id, model);

    return cloned;
  }

  setEntity(model: BaseModel): DiagramModel {
    return this.addEntity(model);
  }

  removeEntity(model: BaseModel): DiagramModel {
    const getter = this.getEntityMapName(model);
    const cloned = this.clone();
    cloned[getter] = new Map(cloned[getter]);
    (cloned[getter] as Map<string, BaseModel>)
      .delete(model.id);

    return cloned;
  }

  private getEntityMapName(model: BaseModel): string {
    if (model instanceof NodeModel) {
      return 'nodes';
    } else if (model instanceof PortModel) {
      return 'ports';
    } else if (model instanceof LinkModel) {
      return 'links';
    } else if (model instanceof PointModel) {
      return 'points';
    }

    throw new Error('model is not existing');
  }
}
