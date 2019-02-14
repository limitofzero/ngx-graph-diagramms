export class BaseModel {
  private static nextId = 1;

  id: number;

  private static getIdAndIncrementNext(): number {
    return BaseModel.nextId++;
  }

  constructor(id?: number) {
    this.id = id ? id : BaseModel.getIdAndIncrementNext();
  }
}
