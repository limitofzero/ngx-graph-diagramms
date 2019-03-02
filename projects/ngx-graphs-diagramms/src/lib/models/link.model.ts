import { BaseModel } from './base.model';

export class LinkModel extends BaseModel {
  sourceId: string;
  targetId: string;
  points: string[] = [];

  constructor(id?: string) {
    super(id);
  }

  addPoint(pointId: string, index: number): LinkModel {
    const points = this.points;
    const copied = points.slice(0, index)
      .concat(pointId)
      .concat(points.slice(index, points.length));

    const cloned = this.clone();
    cloned.points = copied;
    return cloned;
  }

  clone(): LinkModel {
    const cloned = new LinkModel(this.id);
    cloned.sourceId = this.sourceId;
    cloned.targetId = this.targetId;
    cloned.points = this.points;

    return cloned;
  }

  isValid(): boolean {
    if (!this.sourceId) {
      return false;
    }

    return this.hasFewPoints();
  }

  private hasFewPoints(): boolean {
    return this.points.length > 0 || !!this.targetId;
  }
}
