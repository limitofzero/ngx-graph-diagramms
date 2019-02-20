import { BaseModel } from './base.model';
import { LinkModel } from './link.model';

export class PortModel extends BaseModel {
  links: Set<string> = new Set<string>();

  constructor(id?: string) {
    super(id);
  }

  clone(): PortModel {
    const cloned = new PortModel(this.id);
    cloned.links = this.links;

    return cloned;
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
