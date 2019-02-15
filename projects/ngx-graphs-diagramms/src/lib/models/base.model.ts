export abstract class BaseModel {
  private static nextId = 1;

  id: number;
  createdTimestamp: number;

  private static getIdAndIncrementNext(): number {
    return BaseModel.nextId++;
  }

  abstract clone(): BaseModel;

  constructor(id?: number) {
    this.id = id ? id : BaseModel.getIdAndIncrementNext();
    this.createdTimestamp = Date.now();
  }
}
