import IUser from "./IUser";

type ITokenData = Omit<IUser, "password">;

export { ITokenData };
