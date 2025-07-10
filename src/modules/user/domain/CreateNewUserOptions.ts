import e from "express";
import UserInterface from "../domain/entities/interfaces/UserInterface";

type CreateNewUserOptions = Pick<UserInterface, "email"> & {
  admin_secret?: string;
};

type CreateNewUserPhoneOptions = Pick<UserInterface, "phone">;

export default CreateNewUserOptions;
export { CreateNewUserPhoneOptions };
