import UserInterface from "../domain/entities/interfaces/UserInterface";


type CreateNewUserOptions = Pick<UserInterface, 'email' > & {
  admin_secret?: string;
};
export default CreateNewUserOptions;
