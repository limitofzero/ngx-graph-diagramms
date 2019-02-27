import { BaseModel } from './base.model';
import { LinkModel } from './link.model';
import { Coords } from '../interfaces/coords';
import { NodeModel } from './node.model';

export abstract class PortModel extends BaseModel {
  readonly type: string;
  links: Set<string>;

  constructor(data: {
    type: string,
    id?: string,
    links?: Set<string>
  }) {
    super(data.id);
    const { links, type } = data;
    this.type = type;
    this.links = links || new Set<string>();
  }

  abstract clone(): PortModel;

  abstract getConnectPosition(parentNode: NodeModel): Coords;

  addLink(link: LinkModel): void {
    const id = link.id;
    this.addLinkById(id);
  }

  addLinkById(id: string): void {
    this.links.add(id);
  }

  removeLink(link: LinkModel): void {
    const id = link.id;
    this.removeLinkById(id);
  }

  removeLinkById(id: string): void {
    this.links.delete(id);
  }
}
