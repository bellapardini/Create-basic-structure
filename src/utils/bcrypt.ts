import bcrypt from "bcrypt";

const saltRounds = 10;

const generatePassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const comparePassword = async (password: string, encrypted: string) => {
  const isPassword = await bcrypt.compare(password, encrypted);
  return isPassword;
};

export = {
  generatePassword,
  comparePassword,
};
