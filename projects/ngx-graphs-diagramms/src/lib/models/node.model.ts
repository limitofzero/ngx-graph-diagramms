export class NodeModel {

  width: number;
  height: number;

  constructor(public x: number = 0, public y: number = 0) {
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  updateDimensions(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}

