interface IService<T> {
  create(obj: T): void;
  findOneByEmail(email: string): Promise<T | null>;
  findOneById(_id: string): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  login(obj: T): Promise<any | null>;
  updateScore(_id: string, score: number): Promise<void>;
}

export default IService;
