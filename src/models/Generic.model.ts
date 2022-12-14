import { Model, isValidObjectId } from "mongoose";
import IModel from "../interfaces/IModel";

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findOneByEmail(email: string): Promise<T | null> {
    return this._model.findOne({ email });
  }

  public async findOneById(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async findAll(): Promise<T[] | null> {
    return this._model.find({}, { password: 0, __v: 0 });
  }

  public async updateScore(_id: string, score: number) {
    if (!isValidObjectId(_id)) throw Error("InvalidMongoId");
    await this._model.findOneAndUpdate(
      { _id, score: { $lte: score } },
      {
        score: score,
      }
    );
  }
}

export default MongoModel;
