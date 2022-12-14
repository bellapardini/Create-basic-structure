import IService from "../interfaces/IService";
import IUser from "../interfaces/IUser";
import IModel from "../interfaces/IModel";
import { ErrorHandler } from "../utils/Error.class";

import JWT from "../utils/jwt.class";
import bcrypt from "../utils/bcrypt";

class UserService implements IService<IUser> {
  private _model: IModel<IUser>;
  private _jwt: JWT = new JWT();
  constructor(model: IModel<IUser>) {
    this._model = model;
  }

  async create(obj: IUser): Promise<void> {
    const userExists = await this._model.findOneByEmail(obj.email);
    if (userExists) throw new ErrorHandler(409, "User already exists");
    const encryptedPassword = await bcrypt.generatePassword(obj.password);
    await this._model.create({
      ...obj,
      password: encryptedPassword,
    });
  }

  async login(obj: any): Promise<any | null> {
    const userExists = await this.findOneByEmail(obj.email);
    const isPasswordCorrect = await bcrypt.comparePassword(
      obj.password,
      userExists.password
    );
    if (!isPasswordCorrect) {
      throw new ErrorHandler(409, "Email or password is incorrect");
    }
    const token = this._jwt.generateToken({
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      score: userExists.score,
    });

    return {
      token,
      name: userExists.name,
      id: userExists.id
    };
  }

  async findOneByEmail(email: string): Promise<IUser> {
    const user = await this._model.findOneByEmail(email);
    if (!user) throw new ErrorHandler(409, "Email or password is incorrect");
    return user;
  }

  async findOneById(_id: string) {
    const user = await this._model.findOneById(_id);
    if (!user) throw new ErrorHandler(409, "Email or password is incorrect");
    return user;
  }

  async findAll(): Promise<IUser[] | null> {
    const user = await this._model.findAll();
    return user;
  }

  async updateScore(_id: string, score: number) {
    await this._model.updateScore(_id, score);
  }
}

export default UserService;
