import { BaseModel } from './base.model';
import { PortModel } from './port.model';

export class LinkModel extends BaseModel {
  source: PortModel | null;
  target: PortModel | null;
  points: string[] = [];

  constructor(id?: string) {
    super(id);
  }

  addPoint(pointId: string, index: number): void {
    const points = this.points;
    this.points = points.slice(0, index)
      .concat(pointId)
      .concat(points.slice(index, points.length));
  }

  clone(): LinkModel {
    const cloned = new LinkModel(this.id);
    cloned.source = this.source;
    cloned.target = this.target;
    cloned.points = this.points;

    return cloned;
  }

  isValid(): boolean {
    if (!this.source) {
      return false;
    }

    return this.hasFewPoints();
  }

  private hasFewPoints(): boolean {
    return this.points.length > 0 || !!this.target;
  }
}
