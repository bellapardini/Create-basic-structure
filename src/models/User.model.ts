import { model as mongooseCreateModel, Schema } from "mongoose";
import IUser from "../interfaces/IUser";
import MongoModel from "./Generic.model";

const userMongooseSchema = new Schema<IUser>({
  email: String,
  name: String,
  password: String,
  score: Number,
});

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel("User", userMongooseSchema)) {
    super(model);
  }
}

export default User;
