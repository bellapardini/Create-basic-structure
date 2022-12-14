interface IModel<T> {
  create(obj: T): Promise<T>;
  findOneByEmail(email: string): Promise<T | null>;
  findOneById(_id: string): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  updateScore(_id: string, score: number): Promise<void>;
}

export default IModel;
