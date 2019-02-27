import { BaseModel } from './base.model';
import { LinkModel } from './link.model';

export class PortModel extends BaseModel {
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

  clone(): PortModel {
    return new PortModel(this);
  }

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
