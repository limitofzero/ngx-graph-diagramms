import { Pipe, PipeTransform } from '@angular/core';
import { LinkModel } from '../models/link.model';
import { Coords } from '../interfaces/coords';
import { PointModel } from '../models/point.model';
import { PortCoords } from '../interfaces/port-coords';

export interface LinkCoords { x1: number; y1: number; x2: number; y2: number; }

@Pipe({
  name: 'linkToCoords'
})
export class LinkToCoordsPipe implements PipeTransform {

  private static getCoords(source: Coords, target: Coords, points: PointModel[]): Coords[] {

    const coords: Coords[] = [];
    coords.push(source);

    for (const point of points) {
      coords.push({ x: point.x, y: point.y });
    }

    if (target) {
      coords.push(target);
    }

    return coords;
  }

  transform(link: LinkModel, ports: PortCoords = {}, points: Map<string, PointModel>): LinkCoords[] {
    if (!link.isValid()) {
      return [];
    }

    const source = ports[link.sourceId];
    const target = ports[link.targetId];
    const pointModels = link.points.map(id => points.get(id));

    const val = LinkToCoordsPipe.getCoords(source, target, pointModels).reduce((acc, coords, index, arr) => {
      if (index !== 0) {
        const start = arr[index - 1];
        const finish = arr[index];

        const result: LinkCoords = {
          x1: start.x,
          y1: start.y,
          x2: finish.x,
          y2: finish.y
        };

        acc.push(result);
      }

      return acc;
    }, []);

    return val;
  }
}
