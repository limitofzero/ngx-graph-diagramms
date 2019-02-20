export abstract class BaseModel {
  static minRndRange = 1;
  static maxRndRange = 10;

  id: string;

  private static generateId(): string {
    const leftId = BaseModel.getRndValue();
    const rightId = BaseModel.getRndValue();

    const time = Date.now();

    return String(leftId) + String(time) + String(rightId);
  }

  private static getRndValue(): number {
    const min = BaseModel.minRndRange;
    const max = BaseModel.maxRndRange;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  abstract clone(): BaseModel;

  constructor(id?: string) {
    this.id = id ? id : BaseModel.generateId();
  }
}
